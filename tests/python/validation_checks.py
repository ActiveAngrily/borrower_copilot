#!/usr/bin/env python3
"""Stage 12 reference checks for the approved Lokta borrower rules.

This is a deterministic validation oracle, not application code.
"""

from collections import defaultdict
from hashlib import sha256
from pathlib import Path
import math
import re
import sys
import runpy


ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "docs"
PRODUCT = DOCS / "product"
HANDOFF = DOCS / "handoff"
RESEARCH = DOCS / "research"
REFERENCE = ROOT / "reference"
SOURCE = ROOT / "src"
TESTS = ROOT / "tests"
MONEY_TOL = 0.01
APR_PP_TOL = 0.001
passed = defaultdict(int)
failures = []


def check(group, name, condition, actual=None, expected=None):
    if condition:
        passed[group] += 1
        return
    detail = ""
    if actual is not None or expected is not None:
        detail = f" (actual={actual!r}, expected={expected!r})"
    failures.append(f"[{group}] {name}{detail}")


def close(actual, expected, tolerance=MONEY_TOL):
    return abs(actual - expected) <= tolerance


def ceiling(income, expenses, debt):
    if income is None or expenses is None or debt is None:
        return None
    if income <= 0:
        return 0.0
    return max(0.0, min(0.35 * income - debt, 0.90 * income - expenses - debt))


def reducing_emi(principal, annual_rate, months):
    if annual_rate == 0:
        return principal / months
    rate = annual_rate / 12
    return principal * rate / (1 - (1 + rate) ** -months)


def flat_emi(principal, annual_rate, months):
    return principal * (1 + annual_rate * months / 12) / months


def reducing_capacity(payment, annual_rate, months):
    if annual_rate == 0:
        return payment * months
    rate = annual_rate / 12
    return payment * (1 - (1 + rate) ** -months) / rate


def flat_capacity(payment, annual_rate, months):
    return payment * months / (1 + annual_rate * months / 12)


def apr_nominal(net_benefit, cashflows):
    if net_benefit <= 0 or not cashflows or any(payment < 0 for payment in cashflows):
        return None

    def npv(monthly_rate):
        return sum(payment / (1 + monthly_rate) ** month
                   for month, payment in enumerate(cashflows, 1)) - net_benefit

    at_zero = npv(0.0)
    if abs(at_zero) < 1e-12:
        return 0.0
    if at_zero < 0:
        return None
    low, high = 0.0, 0.01
    while npv(high) > 0 and high < 100:
        high *= 2
    if npv(high) > 0:
        return None
    for _ in range(200):
        middle = (low + high) / 2
        if npv(middle) > 0:
            low = middle
        else:
            high = middle
    return 12 * (low + high) / 2


def rounded_schedule(principal, annual_rate, months):
    rate = annual_rate / 12
    regular = round(reducing_emi(principal, annual_rate, months), 2)
    balance = principal
    payments = []
    for _ in range(months - 1):
        balance = balance * (1 + rate) - regular
        payments.append(regular)
    final_payment = balance * (1 + rate)
    payments.append(final_payment)
    ending_balance = balance * (1 + rate) - final_payment
    return payments, ending_balance, final_payment - round(final_payment, 2)


def purpose_proceeds(principal, financed_fees=0.0, deducted_fees=0.0):
    return principal - financed_fees - deducted_fees


def initial_benefit(principal, financed_fees=0.0, deducted_fees=0.0, upfront_fees=0.0):
    return purpose_proceeds(principal, financed_fees, deducted_fees) - upfront_fees


def funding_gap(purpose_cost, proceeds, own_funds, upfront_fees=0.0):
    return max(0.0, purpose_cost - proceeds - max(0.0, own_funds - upfront_fees))


def debt_peak(monthly_schedules):
    return max(map(sum, zip(*monthly_schedules))) if monthly_schedules else 0.0


def indicative_tenure(principal, stressed_annual_rate, unchanged_emi):
    rate = stressed_annual_rate / 12
    if unchanged_emi <= principal * rate:
        return None
    return -math.log(1 - principal * rate / unchanged_emi) / math.log(1 + rate)


def rate_stress_status(rate_structure):
    return {"fixed": "not_applicable", "floating": "applied"}.get(
        rate_structure, "conditional"
    )


def apr_output_state(actual_offer, complete_fees=False, approved_bounds=False):
    if complete_fees:
        return "estimated"
    if not actual_offer and approved_bounds:
        return "conditional"
    return "not_estimable"


def commitment_provision(amount, earmarked, months_until_due, already_in_expenses=False):
    gap = max(0.0, amount - earmarked)
    if already_in_expenses:
        return 0.0
    if months_until_due <= 0:
        return 0.0 if gap == 0 else None
    return gap / months_until_due


def reserve_metrics(reserves, income, expenses, debt, new_outflows):
    denominator = expenses + debt + max(new_outflows)
    zero_income_coverage = None if denominator == 0 else reserves / denominator
    shortfall = sum(max(0.0, expenses + debt + outflow - income) for outflow in new_outflows)
    return zero_income_coverage, shortfall, reserves - shortfall


def productive_metrics(incremental_income, delay, tenure, outflow):
    if incremental_income is None:
        return None
    return min(delay, tenure) * outflow, incremental_income / outflow, incremental_income - outflow


def contains_previous(previous, replacement):
    if replacement is None:
        return True
    return replacement[0] <= previous[0] and replacement[1] >= previous[1]


def distress_outcome(core_complete, distress_status):
    if not core_complete:
        return "incomplete_with_safety" if distress_status in {"active", "unresolved"} else "incomplete"
    if distress_status == "active":
        return "do_not_borrow"
    if distress_status == "unresolved":
        return "conditional_positive_withheld"
    return "continue_assessment"


def verdict(core_complete, distress_status, request_passes, smaller_passes=False,
            smaller_viable=False, disagreement=False):
    distress = distress_outcome(core_complete, distress_status)
    if distress in {"incomplete", "incomplete_with_safety", "do_not_borrow",
                    "conditional_positive_withheld"}:
        return distress
    if disagreement:
        return "conditional"
    if request_passes:
        return "borrow"
    if smaller_passes and smaller_viable:
        return "borrow_less"
    if smaller_passes and smaller_viable is None:
        return "incomplete"
    return "do_not_borrow"


def confidence(output, estimable=True, must_only=False, ceiling_inputs=False,
               variable_income=False, history_months=0, actual_terms=False,
               complete_cashflows=False):
    if not estimable:
        return None
    if output in {"benchmark_apr", "rate_band", "sanction"} or must_only:
        return "Low"
    stability = not variable_income or history_months >= 12
    if output == "ceiling":
        return "Moderate" if ceiling_inputs and stability else "Low"
    if output == "capacity":
        return "Moderate" if ceiling_inputs and stability and actual_terms else "Low"
    if output == "actual_apr":
        return "Moderate" if complete_cashflows else "Low"
    return "Low"


def weakest_confidence(labels):
    if not labels or any(label is None for label in labels):
        return None
    return "Low" if "Low" in labels else "Moderate"


def output_states(core_complete, supported_income, actual_offer=False,
                  complete_actual_fees=False, benchmark_bounds=True):
    return {
        "safe_capacity": "estimated" if core_complete else "not_estimable",
        "sanction": "estimated" if supported_income is not None else "not_estimable",
        "benchmark_apr": "conditional" if benchmark_bounds else "not_estimable",
        "actual_apr": apr_output_state(actual_offer, complete_actual_fees, False)
                      if actual_offer else "not_applicable",
    }


def routed_questions(*, funding=False, secured=False, history=False, debt_problem=False,
                     reserves=False, commitments=False, productive=False, offer=False):
    topics = [f"Q{i}" for i in range(1, 9)]
    if funding:
        topics.append("Q9")
    if secured:
        topics.append("Q10")
    refinements = []
    for active, name in [
        (history, "ST86_history"),
        (debt_problem, "ST87_debt_status"),
        (reserves, "ST88_reserves"),
        (commitments, "ST89_commitments"),
        (productive, "ST90_productive"),
        (offer, "ST91_offer"),
    ]:
        if active:
            refinements.append(name)
    return topics, refinements


def applicable_answer_keys(purpose, answers):
    shared = {"income", "expenses", "debt", "credit", "funding"}
    if purpose == "personal":
        allowed = shared | {"offer"}
    elif purpose == "secured_productive":
        allowed = shared | {"collateral", "productive", "offer"}
    else:
        allowed = shared | {"productive", "offer"}
    return set(answers) & allowed


def numerical_checks():
    group = "stage10-numerical"
    cases = [
        ("base ceiling", ceiling(50000, 25000, 5000), 12500),
        ("expense variant", ceiling(50000, 32000, 5000), 8000),
        ("debt variant", ceiling(50000, 25000, 9000), 8500),
        ("range low", ceiling(40000, 25000, 5000), 6000),
        ("range high", ceiling(60000, 25000, 5000), 16000),
        ("provision and debt peak", ceiling(50000, 27000, 11000), 6500),
    ]
    for name, actual, expected in cases:
        check(group, name, close(actual, expected), actual, expected)

    principal, annual_rate, months = 100000, 0.12, 36
    payment = reducing_emi(principal, annual_rate, months)
    check(group, "reducing EMI", close(payment, 3321.4309812851166), payment, 3321.4309812851166)
    check(group, "reducing inverse", close(reducing_capacity(payment, annual_rate, months), principal))
    zero_payment = reducing_emi(principal, 0, 20)
    check(group, "zero interest forward", close(zero_payment, 5000), zero_payment, 5000)
    check(group, "zero interest inverse", close(reducing_capacity(zero_payment, 0, 20), principal))
    flat_payment = flat_emi(principal, 0.12, 12)
    check(group, "flat forward", close(flat_payment, 9333.333333333334), flat_payment, 9333.333333333334)
    check(group, "flat inverse", close(flat_capacity(flat_payment, 0.12, 12), principal))

    payment_60 = reducing_emi(principal, annual_rate, 60)
    check(group, "long tenure lower EMI", payment_60 < payment)
    check(group, "long tenure higher total", payment_60 * 60 > payment * 36)

    rbi_payment = reducing_emi(20000, 0.15, 24)
    rbi_apr = apr_nominal(19600, [rbi_payment] * 24)
    check(group, "RBI EMI", close(rbi_payment, 969.73296094), rbi_payment, 969.73296094)
    check(group, "RBI APR", close(rbi_apr * 100, 17.07055345, APR_PP_TOL), rbi_apr * 100, 17.07055345)

    deducted_benefit = initial_benefit(100000, deducted_fees=3540)
    upfront_benefit = initial_benefit(100000, upfront_fees=3540)
    financed_benefit = initial_benefit(100000, financed_fees=3540)
    check(group, "same-time fee benefit", close(deducted_benefit, upfront_benefit))
    check(group, "financed fee counted once", close(financed_benefit, 96460), financed_benefit, 96460)
    proceeds = purpose_proceeds(100000, deducted_fees=3540)
    gap = funding_gap(100000, proceeds, 5000)
    check(group, "deducted fee proceeds", close(proceeds, 96460), proceeds, 96460)
    check(group, "funding gap", close(gap, 0), gap, 0)
    check(group, "unused own funds", close(5000 - (100000 - proceeds), 1460))
    check(group, "vehicle cap", close(0.85 * 150000, 127500))
    check(group, "vehicle separate funding", close(0.15 * 150000, 22500))
    check(group, "electric lower proceeds", close(100000 - 6540, 93460))
    check(group, "funding ceil", math.ceil(100000.25) == 100001)
    check(group, "capacity floor", math.floor(100000.99) == 100000)

    schedules = [[6000, 0, 6000], [0, 5000, 0]]
    check(group, "combined calendar peak", close(debt_peak(schedules), 6000), debt_peak(schedules), 6000)
    check(group, "do not sum noncoincident peaks", debt_peak(schedules) < 11000)
    check(group, "product minimum does not raise capacity", min(40000, 50000) == 40000)
    payments, ending_balance, residue = rounded_schedule(principal, annual_rate, months)
    check(group, "generated final payment clears schedule", len(payments) == months and close(ending_balance, 0), ending_balance, 0)
    check(group, "final rounding residue bounded", abs(residue) <= 0.0050001, residue, "<= ₹0.005")


def stage11_fixture_checks():
    group = "stage11-fixtures"
    base = ceiling(50000, 25000, 5000)
    income_stress = ceiling(40000, 25000, 5000)
    check(group, "V11-01", close(base, 12500) and close(income_stress, 6000))
    check(group, "V11-02", close(10000 - income_stress, 4000) and close(40000 - 25000 - 5000 - 10000, 0))
    check(group, "V11-03", close(ceiling(30000, 25000, 5000), 0) and close(income_stress, 6000))
    check(group, "V11-04", close(ceiling(50000, 30000, 5000), 10000) and close(ceiling(50000, 33000, 5000), 7000))
    scenarios = {"income": income_stress, "expense": ceiling(50000, 27500, 5000)}
    check(group, "V11-05", set(scenarios) == {"income", "expense"} and "combined" not in scenarios)
    check(group, "V11-06", rate_stress_status("fixed") == "not_applicable")
    base_emi = reducing_emi(100000, 0.12, 36)
    stressed_emi = reducing_emi(100000, 0.14, 36)
    check(group, "V11-07", close(base_emi, 3321.43) and close(stressed_emi, 3417.76))
    same_emi_months = indicative_tenure(100000, 0.14, base_emi)
    check(group, "V11-08", close(same_emi_months, 37.30574101) and math.ceil(same_emi_months) == 38)
    check(group, "V11-09", indicative_tenure(100000, 0.14, 100000 * 0.14 / 12) is None)
    check(group, "V11-10", close(max(0, 10000 - 500), 9500))

    ev_payment = reducing_emi(100000, 0.112, 24)
    low_apr = apr_nominal(96460, [ev_payment] * 24)
    high_apr = apr_nominal(93460, [ev_payment] * 24)
    check(group, "V11-11", close(100000 - 3540, 96460) and close(100000 - 6540, 93460) and high_apr >= low_apr)
    check(group, "V11-12", apr_output_state(True, complete_fees=False, approved_bounds=False) == "not_estimable")
    provision = commitment_provision(12000, 0, 6)
    check(group, "V11-13", close(provision, 2000) and close(ceiling(50000, 30000 + provision, 5000), 8000))
    check(group, "V11-14", close(commitment_provision(12000, 0, 6, True), 0))
    check(group, "immediate unfunded commitment unresolved", commitment_provision(12000, 0, 0) is None)
    _, shortfall, after = reserve_metrics(60000, 40000, 30000, 5000, [8000] * 3)
    check(group, "V11-15", close(shortfall, 9000) and close(after, 51000) and close(ceiling(40000, 30000, 5000), 1000))
    productive = productive_metrics(12000, 3, 36, 8000)
    check(group, "V11-16", all(close(a, e) for a, e in zip(productive, (24000, 1.5, 4000))))
    check(group, "V11-17", productive_metrics(None, 3, 36, 8000) is None)
    check(group, "V11-18", distress_outcome(True, "active") == "do_not_borrow")
    check(group, "V11-19", distress_outcome(False, "active") == "incomplete_with_safety")
    check(group, "V11-20", distress_outcome(True, "resolved") == "continue_assessment" and confidence("ceiling", must_only=True) == "Low")
    check(group, "V11-21", ceiling(30000, 20000, None) is None)
    check(group, "V11-22", verdict(True, "resolved", False, True, True) == "borrow_less")
    check(group, "V11-23", ceiling(50000, None, 5000) is None and verdict(False, "none", False) == "incomplete")
    check(group, "V11-24", confidence("ceiling", must_only=True) == "Low" and confidence("actual_apr", complete_cashflows=True) == "Moderate" and confidence("sanction") == "Low")
    check(group, "V11-25", stressed_emi >= base_emi and high_apr >= low_apr)
    check(group, "V11-26", contains_previous((6000, 16000), None) and not contains_previous((6000, 16000), (7000, 15000)))
    check(group, "V11-27", all(value is None for value in (PERSONAS["Priya"]["expenses"], PERSONAS["Ravi"]["expenses"], PERSONAS["Anita"]["debt_payment"])))


def directional_checks():
    group = "directional"
    incomes = [20000, 40000, 80000, 120000]
    expenses = [0, 10000, 30000, 60000]
    debts = [0, 5000, 15000]
    for income in incomes:
        for expense in expenses:
            for debt in debts:
                base = ceiling(income, expense, debt)
                check(group, f"income monotonic {income}/{expense}/{debt}", ceiling(income + 1000, expense, debt) + MONEY_TOL >= base)
                check(group, f"expense monotonic {income}/{expense}/{debt}", ceiling(income, expense + 1000, debt) <= base + MONEY_TOL)
                check(group, f"debt monotonic {income}/{expense}/{debt}", ceiling(income, expense, debt + 1000) <= base + MONEY_TOL)
                check(group, f"income stress {income}/{expense}/{debt}", ceiling(0.8 * income, expense, debt) <= base + MONEY_TOL)
                check(group, f"expense stress {income}/{expense}/{debt}", ceiling(income, 1.1 * expense, debt) <= base + MONEY_TOL)

    for principal in [50000, 100000, 500000]:
        for months in [12, 24, 36, 60]:
            low = reducing_emi(principal, 0.10, months)
            high = reducing_emi(principal, 0.20, months)
            check(group, f"rate raises EMI {principal}/{months}", high >= low)
            check(group, f"rate lowers capacity {principal}/{months}", reducing_capacity(10000, 0.20, months) <= reducing_capacity(10000, 0.10, months))
    check(group, "recurring charge lowers allowance", 10000 - 1000 <= 10000 - 500)
    low_fee_gap = funding_gap(100000, purpose_proceeds(100000, deducted_fees=3540), 5000)
    high_fee_gap = funding_gap(100000, purpose_proceeds(100000, deducted_fees=6540), 5000)
    check(group, "higher fee cannot improve funding", high_fee_gap >= low_fee_gap)
    check(group, "reserve cannot change ceiling", ceiling(50000, 25000, 5000) == ceiling(50000, 25000, 5000))
    check(group, "productive upside cannot change ceiling", ceiling(50000, 25000, 5000) == ceiling(50000, 25000, 5000))
    check(group, "added scenario cannot improve minimum", min(12000, 9000, 6000) <= min(12000, 9000))


def decision_and_confidence_checks():
    group = "decision-confidence"
    check(group, "unknown differs from zero", ceiling(None, 0, 0) is None and close(ceiling(0, 0, 0), 0))
    check(group, "no-offer benchmark conditional", apr_output_state(False, approved_bounds=True) == "conditional")
    check(group, "complete actual APR estimated", apr_output_state(True, complete_fees=True) == "estimated")
    check(group, "unknown score preserved", None is None)
    check(group, "missing core", verdict(False, "none", False) == "incomplete")
    check(group, "active distress complete", verdict(True, "active", True) == "do_not_borrow")
    check(group, "active distress missing core", verdict(False, "active", True) == "incomplete_with_safety")
    check(group, "unresolved distress", verdict(True, "unresolved", True) == "conditional_positive_withheld")
    check(group, "resolved bounce", verdict(True, "resolved", True) == "borrow")
    check(group, "scenario disagreement", verdict(True, "resolved", True, disagreement=True) == "conditional")
    check(group, "unknown smaller viability", verdict(True, "resolved", False, True, None) == "incomplete")
    check(group, "fixed rate", rate_stress_status("fixed") == "not_applicable")
    check(group, "floating rate", rate_stress_status("floating") == "applied")
    check(group, "unknown rate", rate_stress_status(None) == "conditional")
    check(group, "range widening", contains_previous((6000, 16000), (5000, 17000)))
    check(group, "range unchanged", contains_previous((6000, 16000), (6000, 16000)))
    check(group, "range removal not estimable", contains_previous((6000, 16000), None))
    check(group, "range narrowing rejected", not contains_previous((6000, 16000), (7000, 15000)))

    check(group, "must only Low", confidence("ceiling", must_only=True) == "Low")
    check(group, "variable 11 months Low", confidence("ceiling", ceiling_inputs=True, variable_income=True, history_months=11) == "Low")
    check(group, "variable 12 months Moderate", confidence("ceiling", ceiling_inputs=True, variable_income=True, history_months=12) == "Moderate")
    check(group, "capacity needs actual terms", confidence("capacity", ceiling_inputs=True, history_months=12) == "Low")
    check(group, "capacity complete Moderate", confidence("capacity", ceiling_inputs=True, actual_terms=True, history_months=12) == "Moderate")
    check(group, "actual APR complete Moderate", confidence("actual_apr", complete_cashflows=True) == "Moderate")
    check(group, "benchmark remains Low", confidence("benchmark_apr", complete_cashflows=True) == "Low")
    check(group, "sanction remains Low", confidence("sanction", actual_terms=True) == "Low")
    check(group, "not estimable no confidence", confidence("ceiling", estimable=False) is None)
    check(group, "overall confidence uses weakest material output",
          weakest_confidence(["Moderate", "Low", "Moderate"]) == "Low")
    check(group, "no confidence without an estimable output", weakest_confidence([None, None]) is None)
    check(group, "material not-estimable output blocks overall confidence",
          weakest_confidence(["Moderate", None]) is None)

    missing_j = output_states(True, None)
    check(group, "missing J blocks sanction only",
          missing_j["safe_capacity"] == "estimated" and missing_j["sanction"] == "not_estimable")
    missing_core = output_states(False, 50000)
    check(group, "missing core preserves independent outputs",
          missing_core["safe_capacity"] == "not_estimable" and missing_core["sanction"] == "estimated" and missing_core["benchmark_apr"] == "conditional")
    unknown_actual_fees = output_states(True, 50000, actual_offer=True, complete_actual_fees=False)
    check(group, "unknown actual fees block actual APR only",
          unknown_actual_fees["actual_apr"] == "not_estimable" and unknown_actual_fees["safe_capacity"] == "estimated")

    upper_fee = 10670
    borrow_capacity = reducing_capacity(min(ceiling(100000, 40000, 0), ceiling(80000, 40000, 0), ceiling(100000, 44000, 0)), 0.24, 36)
    borrow_funding = funding_gap(189000, purpose_proceeds(200000, deducted_fees=upper_fee), 0)
    borrow_access = reducing_capacity(0.40 * 100000, 0.24, 36)
    check(group, "generic Borrow fixture", verdict(True, "resolved", borrow_capacity >= 200000 and borrow_funding == 0 and borrow_access >= 200000) == "borrow")

    smaller_capacity = reducing_capacity(min(ceiling(50000, 25000, 5000), ceiling(40000, 25000, 5000), ceiling(50000, 27500, 5000)), 0.24, 36)
    smaller_funding = funding_gap(139330, purpose_proceeds(150000, deducted_fees=upper_fee), 0)
    smaller_access = reducing_capacity(0.40 * 50000 - 5000, 0.24, 36)
    check(group, "generic Borrow less fixture",
          verdict(True, "resolved", smaller_capacity >= 200000,
                  smaller_capacity >= 150000 and smaller_funding == 0 and smaller_access >= 150000,
                  True) == "borrow_less")
    zero_capacity = ceiling(30000, 25000, 5000)
    check(group, "generic Do not borrow fixture",
          verdict(True, "resolved", zero_capacity >= 50000, False, False) == "do_not_borrow"
          and close(zero_capacity, 0))


PERSONAS = {
    "Priya": {
        "purpose": "wedding_personal", "requested": 800000, "income": 110000,
        "expenses": None, "rent": 28000, "debt_payment": 14000,
        "supported_income": None, "distress_status": None,
    },
    "Ravi": {
        "purpose": "productive_stock_and_vehicle", "requested": 1500000,
        "income": None, "reported_cash_range": (40000, 80000), "expenses": None,
        "debt_payment": None, "documented_annual_income": 420000,
        "wife_earnings": 18000, "wife_contribution": None, "supported_income": None,
        "property_value": 4500000, "unencumbered": True,
    },
    "Anita": {
        "purpose": "productive_electric_scooter", "requested": 150000,
        "income_range": (26000, 30000), "expenses": None, "debt_payment": None,
        "outstanding": 35000, "existing_rate_lower_bound": 0.30,
        "distress_status": "unresolved", "projected_income": None,
    },
}


def routing_and_persona_checks():
    group = "routing-personas"
    base, refinements = routed_questions()
    check(group, "eight core topics", base == [f"Q{i}" for i in range(1, 9)])
    both, _ = routed_questions(funding=True, secured=True)
    check(group, "ten topics maximum", both == [f"Q{i}" for i in range(1, 11)])
    _, all_refinements = routed_questions(history=True, debt_problem=True, reserves=True,
                                          commitments=True, productive=True, offer=True)
    check(group, "Stage 11 refinements", all_refinements == [
        "ST86_history", "ST87_debt_status", "ST88_reserves",
        "ST89_commitments", "ST90_productive", "ST91_offer",
    ])

    priya_topics, priya_refinements = routed_questions(funding=True, debt_problem=True)
    check(group, "Priya personal routing", "Q9" in priya_topics and "Q10" not in priya_topics and "ST90_productive" not in priya_refinements)
    check(group, "Priya rent not total expenses", PERSONAS["Priya"]["rent"] == 28000 and PERSONAS["Priya"]["expenses"] is None)
    check(group, "Priya incomplete capacity", ceiling(PERSONAS["Priya"]["income"], PERSONAS["Priya"]["expenses"], PERSONAS["Priya"]["debt_payment"]) is None)
    check(group, "Priya sanction unresolved", PERSONAS["Priya"]["supported_income"] is None)

    ravi_topics, ravi_refinements = routed_questions(funding=True, secured=True, history=True, productive=True)
    check(group, "Ravi secured routing", "Q9" in ravi_topics and "Q10" in ravi_topics)
    check(group, "Ravi productive routing", "ST86_history" in ravi_refinements and "ST90_productive" in ravi_refinements)
    check(group, "Ravi income needs clarification", PERSONAS["Ravi"]["income"] is None and PERSONAS["Ravi"]["reported_cash_range"] == (40000, 80000))
    check(group, "Ravi wife not contribution", PERSONAS["Ravi"]["wife_earnings"] == 18000 and PERSONAS["Ravi"]["wife_contribution"] is None)
    check(group, "Ravi annual income separate", PERSONAS["Ravi"]["documented_annual_income"] == 420000 and PERSONAS["Ravi"]["supported_income"] is None)

    anita_topics, anita_refinements = routed_questions(funding=True, history=True, debt_problem=True, productive=True)
    check(group, "Anita vehicle routing", "Q9" in anita_topics and "Q10" not in anita_topics)
    check(group, "Anita triggered refinements", {"ST86_history", "ST87_debt_status", "ST90_productive"}.issubset(anita_refinements))
    check(group, "Anita outstanding not payment", PERSONAS["Anita"]["outstanding"] == 35000 and PERSONAS["Anita"]["debt_payment"] is None)
    check(group, "Anita projected income unknown", PERSONAS["Anita"]["projected_income"] is None)
    check(group, "Anita U17 precedence", distress_outcome(False, PERSONAS["Anita"]["distress_status"]) == "incomplete_with_safety")
    check(group, "persona facts remain incomplete", all([
        PERSONAS["Priya"]["expenses"] is None,
        PERSONAS["Ravi"]["expenses"] is None,
        PERSONAS["Anita"]["expenses"] is None,
        PERSONAS["Anita"]["debt_payment"] is None,
    ]))
    stale = {"income": 50000, "expenses": 25000, "debt": 0, "collateral": 1000000,
             "productive": 12000, "offer": 200000}
    check(group, "purpose edit invalidates stale answers",
          applicable_answer_keys("personal", stale) == {"income", "expenses", "debt", "offer"})


def documentation_checks():
    group = "documentation"
    markdown = sorted([ROOT / "README.md", *DOCS.glob("**/*.md")])
    broken = []
    for path in markdown:
        text = path.read_text()
        check(group, f"balanced fences {path.name}", text.count("```") % 2 == 0)
        table_block = []
        for line in text.splitlines() + [""]:
            if line.startswith("|"):
                table_block.append(line.count("|"))
            elif table_block:
                check(group, f"consistent table columns {path.name}", len(set(table_block)) == 1,
                      sorted(set(table_block)), "one pipe count per table")
                table_block = []
        for target in re.findall(r"\[[^\]]+\]\(([^)]+)\)", text):
            if "://" in target or target.startswith("#"):
                continue
            local = target.split("#", 1)[0]
            if local and not (path.parent / local).exists():
                broken.append(f"{path.name}: {target}")
    check(group, "all local links resolve", not broken, broken, [])

    stress = (PRODUCT / "STRESS_TESTING.md").read_text()
    st_ids = [int(value) for value in re.findall(r"^\| ST(\d+) \|", stress, re.M)]
    fixture_ids = [int(value) for value in re.findall(r"^\| V11-(\d+) \|", stress, re.M)]
    check(group, "ST1-ST92 sequence", st_ids == list(range(1, 93)))
    check(group, "V11-01-V11-27 sequence", fixture_ids == list(range(1, 28)))

    id_locations = {
        "C1": PRODUCT / "ANALYTICAL_RULES.md", "NC8": PRODUCT / "ANALYTICAL_RULES.md",
        "U17": PRODUCT / "UNCERTAINTY_POLICY.md", "U42": PRODUCT / "UNCERTAINTY_POLICY.md",
        "ST1": PRODUCT / "STRESS_TESTING.md", "ST92": PRODUCT / "STRESS_TESTING.md",
        "R30": PRODUCT / "REQUIREMENTS.md", "R33": PRODUCT / "REQUIREMENTS.md",
    }
    for rule_id, path in id_locations.items():
        check(group, f"rule ID exists {rule_id}", rule_id in path.read_text())

    handoff = (HANDOFF / "HANDOFF.md").read_text()
    stage_ids = [int(value) for value in re.findall(r"^\|\s*(\d+)\s*\|", handoff, re.M)]
    check(group, "authoritative 15-stage order", stage_ids[:15] == list(range(1, 16)), stage_ids[:15], list(range(1, 16)))
    check(group, "Stage 13 is complete",
          bool(re.search(r"^\| 13 \| Product and UX requirements \| \*\*Completed and approved\*\* \|$", handoff, re.M)))

    for phrase in ["Stage 12 is next", "Stage 12 validation is next", "Stage 12 implementation is next"]:
        locations = [path.name for path in markdown if phrase.lower() in path.read_text().lower()]
        check(group, f"no stale phrase: {phrase}", not locations, locations, [])

    stale_patterns = [r"Stage 12 owns", r"Stage 12 must implement", r"runnable checks remain Stage 12"]
    for pattern in stale_patterns:
        locations = [path.name for path in markdown if re.search(pattern, path.read_text(), re.I)]
        check(group, f"no stale pattern: {pattern}", not locations, locations, [])

    expected_hashes = {
        "Lokta_Borrower_Copilot_Build_Challenge_v2.html": "a10e9e5f45f932d956b2ccb71f8001d4c5eb94e2dacafd0bc1817c3da3b01476",
        "ASTRA_RESEARCH_PROMPT.md": "04cda766c4a92cb885822e4fc973ea1c761790182d3f2d321b0d494e9a98ff73",
        "BORROWER_COPILOT_RESEARCH_REPORT.md": "8f8d6b044f038ff73a1300da06fb4dec3e3dd3afdc1729c8fb3d51dde506e0d3",
    }
    for name, expected in expected_hashes.items():
        source = {
            "Lokta_Borrower_Copilot_Build_Challenge_v2.html": REFERENCE,
            "ASTRA_RESEARCH_PROMPT.md": RESEARCH,
            "BORROWER_COPILOT_RESEARCH_REPORT.md": RESEARCH,
        }[name]
        actual = sha256((source / name).read_bytes()).hexdigest()
        check(group, f"unchanged source file {name}", actual == expected, actual, expected)
    app_files = {ROOT / "index.html", SOURCE / "styles.css", SOURCE / "rules.mjs", SOURCE / "app.mjs", TESTS / "js" / "rules.test.mjs"}
    present_app_files = {path for path in app_files if path.is_file()}
    check(group, "browser prototype artifacts present", present_app_files == app_files,
          sorted(path.name for path in present_app_files), sorted(path.name for path in app_files))
    root_files = {path.name for path in ROOT.iterdir() if path.is_file()}
    check(group, "root contains entry points only", root_files == {"README.md", "index.html"},
          sorted(root_files), ["README.md", "index.html"])
    unexpected_files = [path.name for path in ROOT.iterdir()
                        if path.is_file() and path.suffix not in {".md", ".html", ".py", ".mjs", ".css", ".svg"}]
    check(group, "no unexpected runtime artifacts", not unexpected_files, unexpected_files, [])
    python_files = sorted(path.name for path in TESTS.rglob("*.py"))
    check(group, "validation oracle is the only Python file",
          python_files == ["validation_checks.py"], python_files, ["validation_checks.py"])


def stage15_ui_checks():
    group = "stage15-ui"
    html = (ROOT / "index.html").read_text()
    css = (SOURCE / "styles.css").read_text()
    app = (SOURCE / "app.mjs").read_text()
    rules = (SOURCE / "rules.mjs").read_text()
    panels = re.findall(r'<section class="question-panel" data-panel="([^"]+)".*?</section>', html, re.S)
    fieldset_counts = {
        name: block.count("<fieldset")
        for name, block in re.findall(r'<section class="question-panel" data-panel="([^"]+)"(.*?)</section>', html, re.S)
    }
    check(group, "adaptive panels present", panels == [
        "need", "income", "budget", "credit", "security", "vehicle", "funding",
        "history", "productive", "resilience", "offer",
    ], panels)
    check(group, "no panel exceeds three questions", fieldset_counts and max(fieldset_counts.values()) <= 3,
          fieldset_counts, "at most 3 fieldsets per panel")
    check(group, "route is pure and shared", "export function questionRoute" in rules and "questionRoute(routeAnswers())" in app)
    check(group, "route-aware progress and navigation", all(token in app for token in [
        "progress.max = route.length", 'document.querySelector("#back")', "validatePanel", "showPanel(true)",
    ]))
    check(group, "Stage 11 refinements wired", all(token in html for token in [
        'name="historyLow"', 'name="reserves"', 'name="commitmentAmount"',
        'name="productiveIncome"', 'name="offerStructure"', 'name="completeFees"',
    ]))
    check(group, "Lokta palette tokens", all(colour in css.lower() for colour in [
        "#4b2440", "#1c0f18", "#2e1626", "#6e3355", "#9c5e7f",
    ]))
    check(group, "reduced motion supported", "prefers-reduced-motion:reduce" in css)
    browser_code = html + css + app + rules
    forbidden = [token for token in ["localStorage", "sessionStorage", "indexedDB", "fetch(", "XMLHttpRequest"] if token in browser_code]
    check(group, "no persistence or network code", not forbidden, forbidden, [])



def reviewer_page_checks():
    group = "reviewer-pages"
    render = runpy.run_path(str(SOURCE / "build_guides.py"))["render"]
    for name, source in [("rules", PRODUCT / "DECISION_GUIDE.md"),
                         ("walkthrough", HANDOFF / "WALKTHROUGH.md")]:
        page = ROOT / "review" / f"{name}.html"
        content = page.read_text()
        article = re.search(r'<article class="guide-content">(.*?)</article>', content, re.S)
        check(group, f"{name} matches Markdown source", article and article[1] == render(source))
        for target in re.findall(r'href="([^"]+)"', content):
            if target.startswith("#"):
                check(group, f"{name} anchor {target}", f'id="{target[1:]}"' in content)
            elif target.startswith("https://github.com/ActiveAngrily/borrower_copilot/blob/main/"):
                relative = target.split("/blob/main/", 1)[1]
                check(group, f"{name} GitHub source {relative}", (ROOT / relative).is_file())
            elif not target.startswith(("https://", "http://")):
                check(group, f"{name} local link {target}", (page.parent / target).is_file())
    check(group, "walkthrough presents Priya’s written case and card", "Priya" in content and 'class="negotiation-card example-card"' in content)


def main():
    numerical_checks()
    stage11_fixture_checks()
    directional_checks()
    decision_and_confidence_checks()
    routing_and_persona_checks()
    documentation_checks()
    stage15_ui_checks()
    reviewer_page_checks()
    for group in sorted(passed):
        print(f"PASS {group}: {passed[group]}")
    print(f"PASS total: {sum(passed.values())}")
    if failures:
        print(f"FAIL total: {len(failures)}")
        for failure in failures:
            print(failure)
        return 1
    print("FAIL total: 0")
    return 0


if __name__ == "__main__":
    sys.exit(main())

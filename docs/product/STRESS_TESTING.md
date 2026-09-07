# Stage 11: Stress Testing and Scenario Design

Status: approved specification and calibration. Stage 12 executes V11-01–V11-27 through [validation_checks.py](../../tests/python/validation_checks.py), and Stage 15 implements the supported stress paths in `rules.mjs`.

References: [assignment](../../reference/Lokta_Borrower_Copilot_Build_Challenge_v2.html), [Stage 10 analytical rules](ANALYTICAL_RULES.md), [output definitions](OUTPUT_DEFINITIONS.md), [dependency map](OUTPUT_INPUT_MAP.md), [data dictionary](DATA_DICTIONARY.md), [uncertainty policy](UNCERTAINTY_POLICY.md), [questionnaire](QUESTIONNAIRE_DESIGN.md), [adaptive branching](ADAPTIVE_QUESTIONNAIRE.md), and [rule register](RULES.md).

## Scope and precedence

Stage 11 adds adverse scenarios to the approved Stage 10 baseline. It does not alter lender-sanction formulas, broaden supported products, treat reserves or collateral as income, count projected earnings as current income, or turn missing information into an adverse fact.

U17 continues to take precedence when core income, expenses or household debt outflow cannot be assessed. Known active distress blocks positive ordinary-debt guidance, but it produces a final `Do not borrow` verdict only when core affordability is usable. Otherwise the assessment remains incomplete and shows the separate safety action: do not add ordinary debt before the disclosed distress is stabilized.

All numerical severities and durations selected here are transparent prototype judgements, not Indian statistics, forecasts, lender policies or regulatory limits. E04 supports testing rate headroom for covered floating-rate loans but does not determine the shock size.

## Shared scenario calculation

For each named scenario `s`:

```text
I_s = household resources in scenario s
E_s = household expenses in scenario s
D_s = existing household debt outflow in scenario s
X_s(t) = assessed new-loan EMI + mandatory recurring charges in month t

C_s = max(0, min(
  0.35 * I_s - D_s,
  0.90 * I_s - E_s - D_s
))

Cash remaining_s(t) = I_s - E_s - D_s - X_s(t)
Ceiling margin_s(t) = C_s - X_s(t)
```

A scenario passes borrower affordability only when the new-loan total recurring outflow does not exceed its ceiling using unrounded values. Show cash remaining separately: a positive cash balance can still breach the approved 10% headroom or 35% debt boundary. Apply Stage 10 range compatibility, fee classification, recurring-charge and numerical rules throughout.

## ST1–ST8: Common income stress

| ID | Approved rule | Why / origin |
|---|---|---|
| ST1 | Keep the baseline principal, product, tenure, fees and household boundary unchanged | Isolate the income change and preserve scenario integrity |
| ST2 | Reduce total available household income and confirmed contributions by 20% for three consecutive months beginning with the first repayment month | My judgement: one visible common sensitivity |
| ST3 | Keep expenses and existing debt unchanged; do not assume spending falls with income | Avoid inventing a compensating reduction |
| ST4 | Reapply the approved 35% debt limit and 10% retained headroom | Use the same borrower method under adversity |
| ST5 | Preserve compatible ranges and relationships rather than averaging or mixing endpoints | Maintain the approved uncertainty policy |
| ST6 | Show stressed ceiling, total new-loan outflow, ceiling margin and cash remaining | Distinguish a cautious-ceiling breach from an actual cash deficit |
| ST7 | Reserves do not increase the stressed ceiling or convert a failed recurring payment into a pass | Reserves are not recurring income |
| ST8 | Feed the result into the aggregation and verdict rules ST66–ST76 | Prevent an isolated stress result from becoming an inconsistent verdict |

```text
I_income = 0.80 * I
C_income = ceiling(I_income, E, D)
```

The 20% severity and three-month duration are prototype judgements.

## ST9–ST15: Observed low-income refinement

| ID | Approved rule | Why / origin |
|---|---|---|
| ST9 | Activate the existing history refinement for self-employed, informal or mixed income, and salaried income with disclosed variability or instability | Ask only where a low month can change stress capacity |
| ST10 | Use the lowest compatible net-income month from the latest 12 completed months and preserve actual shorter coverage | Reuse D6 without inventing missing months |
| ST11 | Revenue, turnover, gross income or pre-cost figures cannot substitute for net income | Keep the current-income definition consistent |
| ST12 | Add current confirmed household contributions to the borrower's observed low income and disclose that they are held constant in this scenario | Keep contributor money separate and expose the assumption |
| ST13 | Treat the reported minimum as a one-month scenario | One value does not establish duration |
| ST14 | Do not apply another 20% reduction to the observed low month | Avoid an unexplained stacked shock |
| ST15 | Include the scenario only when it is adverse; a historical value at or above current income cannot improve the assessment | Stress cannot improve capacity |

```text
I_low = borrower_historical_low_net_income
        + confirmed_current_household_contributions

C_low = ceiling(I_low, E, D)
```

Unknown or incompatible history leaves ST1–ST8 unchanged. It does not become stable income or zero income.

## ST16–ST21: Expense stress

| ID | Approved rule | Why / origin |
|---|---|---|
| ST16 | Test a 10% increase in household expenses for three consecutive months | My judgement: a small visible household-cost sensitivity |
| ST17 | Keep income, existing debt and the assessed loan unchanged | Isolate the expense change |
| ST18 | A provided zero remains zero; an unknown expense makes the scenario not estimable | Preserve zero versus unknown |
| ST19 | Apply the increase to each compatible expense range rather than selecting a midpoint | Preserve range meaning |
| ST20 | If expenses have already increased, update the baseline first and stress that updated amount | A changed fact is a new baseline, not a hypothetical shock |
| ST21 | Keep this scenario separate from income stress and upcoming commitments | Avoid unexplained stacking and double counting |

```text
E_expense = 1.10 * E
C_expense = ceiling(I, E_expense, D)
```

The 10% severity and three-month duration are prototype judgements.

## ST22–ST31: Floating-rate stress

| ID | Approved rule | Why / origin |
|---|---|---|
| ST22 | Apply rate stress only to a known floating, reducing-balance loan scenario | Fixed loans and unknown structures cannot be treated as floating |
| ST23 | Increase the current nominal annual rate by 2 percentage points as an immediate-reset sensitivity | My judgement; E04 supports relevance, not severity |
| ST24 | Do not rate-stress a fixed-rate contract | Preserve contract assumptions |
| ST25 | If fixed/floating status is unknown, leave offer-specific rate stress incomplete while retaining independent income and expense stresses | Unknown is not fixed or floating |
| ST26 | Calculate the payment required to retain the original tenure | Show the direct payment consequence |
| ST27 | Also calculate indicative tenure if the borrower kept the original EMI | Show the alternate contractual pressure |
| ST28 | If unchanged EMI does not exceed monthly stressed interest, report possible negative amortisation and no finite indicative tenure | Prevent a misleading extension calculation |
| ST29 | Keep recurring charges outside EMI and include them in total outflow | Reuse Stage 10 fee boundaries |
| ST30 | A stressed rate may exceed the negotiation band; it remains a sensitivity, not a new fair-rate endpoint | Keep pricing and stress concepts separate |
| ST31 | Do not label a stressed schedule as APR unless every resulting cash flow and charge is defined | Preserve the approved APR completeness rule |

```text
a_rate = a + 0.02
r_rate = a_rate / 12

M_rate = P * r_rate / (1 - (1 + r_rate)^(-n))

If M_base > P * r_rate:
  n_at_same_EMI =
    -ln(1 - P * r_rate / M_base) / ln(1 + r_rate)
  displayed indicative duration = ceil(n_at_same_EMI)
Else:
  no finite indicative tenure; possible negative amortisation
```

The generated final payment must clear the rounding residue under NC7; do not represent `ceil(n_at_same_EMI) * M_base` as an exact contractual total.

## ST32–ST38: Repayment-cost and fee shocks

| ID | Approved rule | Why / origin |
|---|---|---|
| ST32 | Use known scheduled or bounded mandatory recurring charges; do not invent a generic increase | No universal charge shock is supported |
| ST33 | Recalculate monthly EMI allowance after the stressed recurring charge | Charges consume total outflow capacity |
| ST34 | For upfront charges, recalculate purpose proceeds, APR benefit, funding gap and APR using the higher known or approved endpoint | Upfront costs affect funding and all-in price |
| ST35 | A no-offer benchmark uses the existing BF upper package; an actual offer uses its disclosed charges | Never substitute a benchmark for an offer |
| ST36 | Material actual charges without a defensible bound make affected actual fee stress and APR not estimable | Unknown is not zero or the benchmark maximum |
| ST37 | Exclude contingent late, bounce or foreclosure charges unless an assessed event triggers them | Do not assume default in the ordinary scenario |
| ST38 | A higher charge cannot improve capacity, funding, APR or verdict | Required monotonic behaviour |

```text
X_fee(t) = EMI + recurring_charge_stress(t)
EMI_allowance(t) = max(0, C_s - recurring_charge_stress(t))

B_fee = P - financed_fees - deducted_fees
N_fee = B_fee - separately_paid_upfront_fees

Funding_gap_fee = max(
  0,
  purpose_cost - B_fee - available_own_funds_after_upfront_fees
)
```

Upfront fees affect funding and APR. They do not become monthly household expenses.

## ST39–ST48: Reserves and upcoming commitments

| ID | Approved rule | Why / origin |
|---|---|---|
| ST39 | Reserves remain liquid assets, never income or collateral value | Preserve C4 and the asset/income boundary |
| ST40 | Numerically assess known commitments due within the next 12 months | My judgement: bounded near-term horizon |
| ST41 | Subtract separately earmarked funds, then provision the remaining amount across the months before it is due | Make the trade-off explicit without assuming funds exist |
| ST42 | Add a provision only if absent from E and sum simultaneous provisions | Prevent omission and duplication |
| ST43 | An immediate unfunded commitment cannot be spread over an invented period; it requires identified funding | Arithmetic cannot manufacture time or money |
| ST44 | Free reserves are measured after the proposed contribution, upfront fees and separately earmarked commitments | Prevent using the same money repeatedly |
| ST45 | Show zero-income coverage, scenario cash-shortfall coverage and reserves remaining | Give reserves a numerical resilience effect |
| ST46 | Reserves cannot increase the recurring ceiling or rescue outflow above it | A temporary asset cannot support permanent overcommitment |
| ST47 | Unknown reserves do not become zero; unknown commitment amount, timing or overlap makes its numerical treatment incomplete | Preserve missing-data policy |
| ST48 | Preserve ranges and prevent the same funds from covering purpose, fees, commitments and emergency protection twice | Maintain range and funding integrity |

For commitment `k`, due in `m_k` months where `1 <= m_k <= 12`:

```text
Commitment_gap_k = max(
  0,
  commitment_amount_k - earmarked_funds_k
)

Monthly_provision_k = Commitment_gap_k / m_k

E_commit = E + sum(
  Monthly_provision_k not already included in E
)

C_commit = ceiling(I, E_commit, D)
```

This is an explicit plan-to-save scenario, not proof that money has accumulated. If the borrower does not confirm that the provision is feasible, the due-date resilience remains conditional.

For free liquid reserves `R`:

```text
Zero_income_coverage_months = R / (E + D + X)

Scenario_cash_shortfall = sum(
  max(0, E_s + D_s + X_s(t) - I_s)
)

Reserves_after_scenario = R - Scenario_cash_shortfall
```

If the zero-income denominator is zero, label coverage not applicable rather than infinite. No universal minimum reserve-month cutoff is adopted.

## ST49–ST56: Productive-income failure and delay

| ID | Approved rule | Why / origin |
|---|---|---|
| ST49 | Activate this block only for a productive purpose | Avoid irrelevant questions |
| ST50 | Current-resource affordability and mandatory stresses must pass without projected income | Future earnings cannot rescue current affordability |
| ST51 | Use incremental net income after added operating costs, downtime, displaced earnings and duplicated cost savings | Revenue or activity is not repayment income |
| ST52 | Test zero incremental earnings throughout the reported start delay | Make the timing risk visible |
| ST53 | After the delay, show incremental coverage and net cash after assessed outflow | Describe whether the project appears self-funding without creating a cutoff |
| ST54 | Do not adopt a universal DSCR or incremental-coverage cutoff | No applicable evidence supports one here |
| ST55 | Unknown projected earnings remain unknown; a visible zero-upside scenario is an assumption, not conversion of the answer to zero | Preserve U24 |
| ST56 | Productive earnings cannot raise safe capacity or recommended principal; they can affect purpose viability and conditionality | Keep base income and productive benefit separate |

```text
G = conservative incremental net income
d = reported start-delay months
X = total new-loan recurring outflow

Payments_before_incremental_income = min(d, n) * X
Incremental_coverage = G / X
Incremental_cash_after_payment = G - X
```

If `G` or its net basis is unresolved, productive benefit is not estimable. If the purpose depends on the projected benefit, the verdict remains conditional until viability is established; current-resource results remain available.

## ST57–ST65: Debt distress and arrears

| ID | Approved rule | Why / origin |
|---|---|---|
| ST57 | Clarify repayment status within Q6 whenever current debt or a repayment problem is disclosed | Keep the safety dependency within the existing core topic |
| ST58 | Active distress means a currently unpaid overdue amount, unresolved bounced payment, required catch-up obligation, current restructuring/settlement arrangement, borrowing to make another repayment, or delaying essential household spending to service debt | Event-based rule without an invented score or count threshold |
| ST59 | Active distress blocks positive ordinary-additional-debt guidance. With usable core affordability it produces `Do not borrow under assessed conditions`; without usable core affordability U17 keeps the overall result incomplete and shows a separate stabilization-first safety action | Reconcile distress safety with approved missing-core precedence |
| ST60 | Independent amounts and APR results may remain incomplete; distress never fabricates missing EMI values | Apply output states separately |
| ST61 | One confirmed resolved bounce does not automatically produce `Do not borrow`; it remains disclosed and keeps the affected recommendation Low confidence | A bounce alone does not establish continuing arrears |
| ST62 | A known agreed catch-up payment enters the debt calendar once and must pass baseline and stress calculations | Reuse ID7 without duplication |
| ST63 | Unknown resolution status withholds positive guidance but is not silently labelled active arrears | Missing status is not an adverse fact |
| ST64 | Outstanding principal cannot substitute for monthly payment, and collateral cannot override distress | Preserve debt and security boundaries |
| ST65 | Do not add refinance or consolidation as a supported product in Stage 11; explain that any such offer needs complete old/new cash flows and closure terms | Preserve the approved limited product scope |

The stabilization action is to identify each lender, amount due, due date, arrears status, KFS and agreed arrangement. The product does not promise settlement savings, contact lenders or provide legal advice.

## ST66–ST76: Stress aggregation and verdict integration

| ID | Approved rule | Why / origin |
|---|---|---|
| ST66 | Keep shocks named and separate; combine only reported or contractually coincident conditions | Avoid an unexplained worst-case stack |
| ST67 | Common income and expense stresses apply to every estimable positive recommendation; history, floating-rate, fee, commitment, productive and distress scenarios apply when triggered | Provide a complete minimum stress set without irrelevant questions |
| ST68 | Use the lowest applicable budget-scenario ceiling as the stress-aware recurring ceiling | A positive result must survive every applicable budget test |
| ST69 | Convert each applicable ceiling/rate combination into principal capacity and use the lowest amount | Rate and cash-flow stresses constrain the same principal |
| ST70 | Deduct mandatory recurring charges once before inverse repayment calculation | Prevent duplicate or omitted charges |
| ST71 | A scenario passes only when total outflow fits its unrounded ceiling | Display rounding cannot authorize excess |
| ST72 | `Borrow` or `Borrow less` must pass baseline funding/product constraints, every mandatory stress and every triggered material scenario, with no active-distress block | Integrate safety without changing lender access |
| ST73 | `Borrow` applies when the request passes the complete stress-aware boundary and fully funds the purpose | Finalize the positive requested case |
| ST74 | `Borrow less` applies only when a strictly smaller viable arrangement passes the same boundary and fully funds the confirmed acceptable plan | Preserve AV4/U25 |
| ST75 | `Do not borrow` applies when known constraints or active distress rule out the request and every confirmed acceptable smaller arrangement, provided U17 does not require an incomplete overall assessment | Preserve missingness precedence |
| ST76 | Missing core data, unresolved material triggered facts or scenario disagreement produces incomplete/conditional guidance rather than silently selecting the favourable case | Preserve U17/U32 |

```text
C_resilient = min(
  C_base,
  C_income,
  C_expense,
  applicable C_low,
  applicable C_commit
)

For each applicable scenario s:
  M_allow_s = max(
    0,
    C_s - mandatory_recurring_charges_s
  )

  P_s = inverse_repayment_capacity(
    M_allow_s,
    applicable_interest_rate_s,
    tenure
  )

S_stress_low = floor(min(P_s))
```

`S_stress_low` becomes the borrower-capacity input to AV. It stays independent of lender capacity. If variable charges differ by month, test every relevant month rather than subtracting both a peak charge and the same charge inside `X_s(t)`.

Merely declining an optional refinement does not block a result. Incompleteness follows only when a disclosed fact activates a material unresolved dependency.

## ST77–ST84: Output-specific confidence

| ID | Approved rule | Why / origin |
|---|---|---|
| ST77 | Low remains the default and every must-only estimate remains Low | Preserve the assignment and U35 |
| ST78 | A monthly ceiling may become Moderate only when I, E and D are usable and reconciled; debt schedules/status are resolved; reserves and commitments are supplied; and applicable income-stability refinement is complete | Tie confidence to decision-driving evidence |
| ST79 | Variable, self-employed, informal or mixed income needs compatible history covering the latest 12 completed months for Moderate stress confidence | Shorter history still informs numbers but does not satisfy the upgrade |
| ST80 | Safe principal capacity may become Moderate only when ST78 passes and actual amount, rate basis, tenure and recurring charges define a supported structure; benchmark capacity remains Low | Separate household evidence from contract completeness |
| ST81 | Actual-offer APR may become Moderate when principal, net benefit, timing, complete mandatory charges and supported repayment cash flows reconcile within NC8 tolerances | Confidence describes calculation support, not fairness or approval |
| ST82 | Benchmark APR, broad fair-rate bands and illustrative likely-sanction estimates remain Low | The prototype lacks verified personalized pricing and underwriting |
| ST83 | Verdict and recommended-amount confidence cannot exceed the weakest material decision-driving output | Avoid an overall upgrade hiding a weak component |
| ST84 | Not-estimable outputs receive no confidence label; no percentage or High label is used | Preserve U34/U37 |

For salaried income without disclosed variability, the income-stability condition is met when identified records support the current monthly net amount. Additional documents do not upgrade confidence by count.

## ST85–ST92: Questions and adaptive routing

No new question topic is added. The approved structure remains eight core topics plus Q9 and Q10 when applicable.

| ID | Approved question/routing rule | Numerical or path effect |
|---|---|---|
| ST85 | Common income and expense stresses use existing answers | Changes stressed ceilings without another question |
| ST86 | Ask applicable history refinement: “Over the latest 12 completed months, what was your lowest monthly income after work or business costs?” Record actual shorter coverage | Changes `I_low`, `C_low` and stress-aware capacity |
| ST87 | Within Q6 ask when debt/problem is disclosed: “Are any payments currently overdue, unpaid after a bounce, being paid with another loan, or causing you to delay essential spending?” Collect amount, timing, resolution and catch-up terms | Can change D, debt calendar and safety path |
| ST88 | Ask: “After this purchase, fees and money set aside for known commitments, how much would remain accessible for emergencies?” | Changes reserve coverage and reserves remaining |
| ST89 | Ask: “During the next 12 months, what known one-time expenses are coming, when are they due, and how much is already set aside?” | Changes commitment provision and ceiling |
| ST90 | For productive purposes ask: “What additional monthly income would remain after all added costs, when would it begin, and what is the estimate based on?” | Changes productive coverage, cash and viability scenario |
| ST91 | Reuse the offer section for fixed/floating status, charges and repayment terms | Activates rate, fee and actual-APR methods without another topic |
| ST92 | Stop refinements when the next answer cannot alter a number, scenario, route or applicable method; unknown remains available | Preserve the approved value-of-information gate |

Routing order:

1. Complete Q1–Q8 and applicable Q9/Q10.
2. Resolve disclosed repayment distress before positive ordinary-debt guidance.
3. Calculate the Stage 10 baseline.
4. Apply common income and expense stresses.
5. Activate applicable history, commitment, productive and offer/rate refinements.
6. Calculate stress-aware capacity and verdict.
7. Show the same assumptions and results in O4 and the Negotiation Card.

## Stage 11 fixtures executed in Stage 12

These fixtures specify expected behaviour. [VALIDATION_STRATEGY.md](../validation/VALIDATION_STRATEGY.md) maps their coverage, and the Stage 12 oracle passes one direct assertion for each V11 fixture as part of its 525-check, zero-failure integrated run. Persona checks preserve supplied facts without inventing supplementary values.

| ID | Fixture | Expected result |
|---|---|---|
| V11-01 | `I=₹50,000, E=₹25,000, D=₹5,000` | Base ceiling ₹12,500; stressed income ₹40,000; stressed ceiling ₹6,000 |
| V11-02 | V11-01 with `X=₹10,000` | Ceiling breach ₹4,000; stressed cash remaining ₹0 |
| V11-03 | Current borrower income ₹50,000, observed low ₹30,000, no contribution, `E=₹25,000, D=₹5,000` | Observed-low ceiling ₹0, separate from three-month common ceiling ₹6,000 |
| V11-04 | `I=₹50,000, E=₹30,000, D=₹5,000` | Base ceiling ₹10,000; expense-stress E ₹33,000; stressed ceiling ₹7,000 |
| V11-05 | Common income and expense shocks without reported overlap | Separate results; no stacked 20%-income/10%-expense default |
| V11-06 | Fixed-rate contract | No rate-rise calculation |
| V11-07 | ₹1,00,000, 12%, 36 months, floating | Baseline EMI ₹3,321.43; 14% same-tenure EMI ₹3,417.76 |
| V11-08 | V11-07 with original EMI retained | About 37.31 months; display 38 scheduled months with a smaller final payment |
| V11-09 | Stressed monthly interest greater than or equal to unchanged EMI | No finite indicative tenure; possible negative amortisation |
| V11-10 | ₹10,000 ceiling and ₹500 mandatory monthly charge | EMI allowance ₹9,500 |
| V11-11 | Existing ₹1 lakh electric benchmark across approved fee endpoints | Purpose proceeds fall from ₹96,460 to ₹93,460; higher fees cannot reduce APR with repayments fixed |
| V11-12 | Unbounded material actual fee | Actual APR and fee stress not estimable |
| V11-13 | `I=₹50,000, E=₹30,000, D=₹5,000`, ₹12,000 due in six months, no earmarked funds | Provision ₹2,000; ceiling falls from ₹10,000 to ₹8,000 |
| V11-14 | Commitment already included in E | No duplicate provision |
| V11-15 | `R=₹60,000`, `I_s=₹40,000`, `E=₹30,000`, `D=₹5,000`, `X=₹8,000`, three months | Cash deficit ₹3,000/month; reserve need ₹9,000; ₹51,000 remains, but ₹1,000 stressed ceiling still fails |
| V11-16 | `G=₹12,000`, delay 3 months, `X=₹8,000` | Pre-income payments ₹24,000; incremental coverage 1.5; incremental cash ₹4,000 |
| V11-17 | Unknown productive earnings | No-upside current-resource stress available; productive benefit not estimable; capacity unchanged |
| V11-18 | Active distress with usable I/E/D | Do not borrow for ordinary additional debt under assessed conditions |
| V11-19 | Active distress with missing E or D | Overall assessment incomplete under U17; positive guidance blocked; stabilization-first action shown |
| V11-20 | One confirmed cured bounce | No automatic Do not borrow; affected recommendation stays Low confidence |
| V11-21 | ₹35,000 outstanding with monthly payment unknown | Never use ₹35,000 as D; affected capacity remains incomplete |
| V11-22 | V11-01 where `X=₹10,000` fails and a confirmed viable smaller plan has `X=₹5,000` | Borrow less only if every funding/product rule also passes |
| V11-23 | Unknown E | Safe capacity and stress not estimable; no zero expense or adverse verdict solely from missingness |
| V11-24 | Must-only versus complete actual offer | Must-only Low; complete supported actual APR may be Moderate; lender sanction and benchmark band stay Low |
| V11-25 | Higher E, D, rate or fees | Affected capacity/verdict cannot improve |
| V11-26 | Removal of usable history or reserve information | Same-scenario range widens, stays unchanged or becomes not estimable; never narrows |
| V11-27 | Priya, Ravi and Anita facts | No missing persona value is filled and no final persona verdict is assigned during Stage 11 |

## Completion boundary

Stage 11 is complete and its fixtures are now executed by Stage 12. Final persona run-throughs remain later deliverables because the assignment facts lack required inputs. Application code, UI, persistence, README and implementation planning remain outside Stage 11–12.

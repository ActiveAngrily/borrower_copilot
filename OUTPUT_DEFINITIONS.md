# Stage 3: Output Definitions

Status: Stage 3 content and implementation accepted by the user. Cross-stage audit corrections were subsequently approved.

Stage 15 update: [analytical rules](ANALYTICAL_RULES.md) and [stress testing](STRESS_TESTING.md) supply the approved methods; the browser app implements the supported outputs and the independent [validation strategy](VALIDATION_STRATEGY.md) checks their numerical, state, confidence and verdict rules.

References: [assignment specification](Lokta_Borrower_Copilot_Build_Challenge_v2.html), [accepted problem framing](PROBLEM_FRAMING.md), and [accepted requirements](REQUIREMENTS.md).

This document defines what each result means and what must accompany it, before deciding how to calculate it. It contains no lending thresholds, formulas, or UI layout. “Proposed judgement” identifies the origin of a decision; the judgements recorded here have been approved for Stage 3.

## Shared meaning and context

| ID | Classification | Approved definition |
|---|---|---|
| O-D1 | Proposed judgement | Every assessment identifies the **borrowing purpose, requested amount, assessed product path, and assessed tenure**. A result applies to that stated scenario, not to every possible loan. |
| O-D2 | Proposed judgement | Distinguish the **requested scenario** from any **recommended alternative**. If the recommendation changes the amount, product, or tenure, name the change explicitly. Do not silently calculate for a different loan. |
| O-D3 | Proposed judgement | Every important numerical result carries its unit, applicable scenario, a short reason, and any material condition or unknown. Shared context may be stated once rather than repeated beside every number. |
| O-D4 | Proposed judgement | Use uncertainty ranges for estimates that depend on uncertain inputs or lending judgements. Describe these as **assessment ranges**, not statistical confidence intervals or approval probabilities. |
| O-D5 | Proposed judgement | Distinguish a **conditional estimate** from **not estimable from the available information**. Neither state means zero. The approved uncertainty policy, U7–U27 and U39, defines when each applies; this does not waive the requirement to produce the four outputs from a sufficiently informative must-question set. |

## O1 — Borrowing verdict

**Requirement from the brief:** The verdict must be Borrow, Borrow less, or Do not borrow, with a reason.

The definitions below establish the labels without deciding their numerical triggers.

| ID | Classification | Approved definition |
|---|---|---|
| O-D6 | Proposed judgement | **Borrow:** The requested borrowing is supported by the assessment under the stated conditions. This is conditional guidance, not lender approval or a guarantee of safety. |
| O-D7 | Proposed judgement | **Borrow less:** The requested amount is not supported, but a smaller amount for a viable version of the stated purpose is supported. Show the smaller recommended amount and the funding gap. A smaller loan is not automatically useful if it cannot accomplish the purpose. |
| O-D8 | Proposed judgement | **Do not borrow:** Taking the assessed loan under current conditions is not supported. State the reason and any condition that would need to change before reassessment. Do not imply a permanent judgement about the borrower. |
| O-D9 | Proposed judgement | **Verdict explanation:** State the main decision driver, any additional material constraint, and what action follows. Missing evidence alone must not be disguised as an adverse financial finding. If evidence prevents a defensible verdict, explicitly mark the assessment incomplete rather than invent one of the three verdicts. Apply the approved uncertainty policy, including U17, U25, and U39. |

## O2 — Borrowing amounts

**Requirement from the brief:** Keep likely lender sanction and safe borrower capacity clearly separate.

| ID | Classification | Approved definition |
|---|---|---|
| O-D10 | Proposed judgement | **Likely lender sanction:** An estimated range for the maximum principal a lender might approve for the stated product and tenure, given the disclosed profile and stated assumptions. It is not an approval probability or a lender commitment. |
| O-D11 | Proposed judgement | **Safe borrower capacity:** An estimated range for the maximum principal the borrower could manage under the approved affordability and applicable stress assumptions, for the stated product and tenure. The conservative endpoint uses `S_stress_low`; it remains independent of whether a lender will approve it. Show the base and binding stress case so the reduction is explainable. |
| O-D12 | Proposed judgement | **Recommended borrowing amount:** A single actionable amount, including zero where justified, within requested principal, conservative lender capacity where estimable, and `S_stress_low`. AV/ST then select the smallest feasible principal funding the agreed purpose; NC6 governs whole-rupee funding. Under AV5, show a supported range and the clarification needed for a single amount rather than fabricate precision. Apply distress and incomplete-assessment precedence before issuing the verdict. |
| O-D13 | Proposed judgement | Explain any conflict between estimated sanction and safe capacity. If lender access appears insufficient for an otherwise manageable amount, say so; do not present the recommended amount as assured financing. Any product alternative must be separately identified under O-D2. |

These separate what a lender might allow, what the borrower might manage, and what the assessment actually recommends.

## O3 — Fair interest and all-in cost

| ID | Classification | Approved definition |
|---|---|---|
| O-D14 | Requirement from the brief | Show a **fair interest-rate band** and **all-in APR including processing fees**, with relevant additional fees handled according to the approved requirements. |
| O-D15 | Proposed judgement | **Fair interest-rate band:** A sourced annual negotiation reference with explicit product/basis and limitations. Stage 10 adopts broad illustrative product bands, not personalized fair-rate guarantees, and no invented credit-score discount. Label flat versus reducing interest; a quote outside the band warrants review, not an automatic unfairness finding. |
| O-D16 | Proposed judgement | **All-in APR:** An annualized borrowing-cost measure for the stated amount, tenure, repayment pattern, and included charges. Identify included charges and material unknown charges. It is separate from the interest-rate band. |
| O-D17 | Proposed judgement | Without a lender offer, show an **estimated APR range** using explicitly identified fee assumptions. If an offer is supplied, distinguish its **offer-specific APR** from the benchmark estimate. Do not claim an exact or complete APR when material costs are unknown. |

**Fact requiring external research:** The relevant rate conventions, APR disclosure method, fee treatment, and market benchmarks require verification before analytical implementation. No research is authorized here.

**Stage 10 resolution:** APR is monthly cash-flow IRR annualized as 12j. FF/BF/NC define charges, conditional benchmark packages and offer consistency. A complete hypothetical package is not a complete actual offer; unbounded material missing actual charges leave actual all-in APR not estimable.

## O4 — Monthly ceiling, tenure, and stress

| ID | Classification | Approved definition |
|---|---|---|
| O-D18 | Proposed judgement | **EMI/outflow ceiling:** The recommended maximum recurring monthly payment for the **new assessed loan**, in INR per month. Existing debt payments must already be accounted for in arriving at it; it is not a ceiling for all debt combined. Any recurring mandatory loan charge must be accounted for or explicitly identified as unresolved. |
| O-D19 | Proposed judgement | Distinguish that ceiling from the **estimated payment for the assessed loan**. The former is a limit; the latter is what a particular amount, rate, and tenure would require. Show when the assessed payment exceeds the ceiling. |
| O-D20 | Proposed judgement | **Tenure trade-off:** Compare at least two feasible tenures using the same principal and the same rate and fee assumptions, unless a product condition requires a disclosed change. Show monthly payment, repayment duration, and total repayment including identified charges. State whether each option respects the ceiling. |
| O-D21 | Proposed judgement | **Stress result:** Identify the baseline, each applicable adverse change, its duration or horizon, the stressed ceiling/payment/cash remaining, and whether total new-loan outflow fits. Always show the separate three-month 20% income-drop and 10% expense-rise cases. Add observed low-income, floating-rate, fee, commitment, productive-income and distress cases only when triggered. Name the binding case; combine shocks only when reported or contractually coincident. Reserves are contextual coverage and never increase recurring capacity. |
| O-D22 | Proposed judgement | A positive mathematical repayment capacity does not override a Do not borrow verdict. If such capacity is displayed for explanation, distinguish it from permission to take the assessed loan. |

## Negotiation Card

**Requirement from the brief:** Provide a one-screen result a borrower can use in a lender conversation.

**O-D23 — Proposed judgement:** The card summarizes the same assessment; it must not calculate separate results. Its content is:

- Verdict and its main reason.
- Requested amount and recommended amount, with the assessed product and tenure.
- Likely sanction range and safe-capacity range, clearly distinguished.
- Fair interest-rate band and estimated or offer-specific APR, with the fee basis.
- New-loan monthly ceiling and estimated payment.
- A compact tenure comparison and stress result.
- Material unknowns and conditions that could change the recommendation.

This approves content only. Exact wording, grouping, and phone layout remain undecided.

## Decisions deliberately left open

| Classification | Item |
|---|---|
| Resolved | NC defines compatible ranges/precision; NC6 corrects funding rounding; ST77–ST84 define output-specific confidence conditions. |
| Resolved | AV defines amount/funding/viability selection; ST66–ST76 define the final stress-aware recommendation and distress precedence. |
| Resolved | U7–U27/U39 define conditional, not-estimable and incomplete results; Stage 11 adds triggered uncertainty rules without bounding actual unknown fees universally. |
| Resolved | RT/PC select products/tenures; AV/ST supply baseline and stress-aware verdict rules. |
| Resolved | Show two feasible tenures, one with explanation, or dependent calculations unavailable if neither; unknown eligibility can make results conditional. |
| Out-of-scope item | Approval probabilities, predicted default probabilities, guaranteed offers, or claims that these ranges have statistically measured coverage. |

These are recorded dependencies for later stages, not permission to choose defaults during implementation.

## Artifact and verification boundary

**Proposed judgement (approved):** Add only this document for Stage 3, linked to the accepted framing and requirements. Check that every required output has an explicit meaning, that requested and recommended scenarios cannot be confused, and that no rate, threshold, formula, or persona verdict has been introduced. Stop for approval of the implementation result before beginning the next stage.

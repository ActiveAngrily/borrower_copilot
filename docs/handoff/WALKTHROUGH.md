# Priya’s ₹8 lakh request — a worked walkthrough

Follow the assignment’s original borrowing request through the app. This example shows the inputs, calculation and Negotiation Card in writing.

**Assignment facts stay fixed.** This example adds only the budget clarifications needed to run the assessment. It does not invent a cheaper wedding, extra savings, a lender offer or income evidence. The [provided-facts-only run](../validation/PERSONA_RUNTHROUGHS.md) remains unchanged and incomplete; this illustrative completion is labelled separately.

## 01 · Keep the original case intact

Priya is 29, salaried, earning ₹1,10,000 net each month. She requests ₹8,00,000 for a wedding, pays ₹28,000 rent and has a ₹14,000 car EMI with two years remaining. Her reported credit score is 780.

The app asks whether the score is known; it does not infer a numerical rate discount from 780. Rent alone is not a complete household budget.

## 02 · Enter these answers

Enter each amount in the lower field and leave the upper field blank. The app treats that as a single amount. The additions below are demonstration assumptions requiring confirmation, not facts supplied by the reviewer.

| Screen / field | Choice or value | Basis |
| --- | --- | --- |
| Purpose / request | Wedding or another personal expense / ₹8,00,000 | Assignment; unchanged |
| Monthly net income / type | ₹1,10,000 / Salaried | Assignment |
| Material income variation? | No | Minor clarification assumed for the stated salary |
| Records support income? | I don’t know | Not supplied; no evidence is invented |
| Household contribution | ₹0 | Assume no additional contribution to the stated budget |
| Total monthly spending | ₹45,000 | Supplied ₹28,000 rent plus an illustrative ₹17,000 for other recurring essentials; excludes the car EMI |
| Monthly debt | ₹14,000 | Supplied car EMI; assume no additional required payments |
| Every applicant/co-borrower debt included? | Yes, same total | Assume the stated EMI is the complete debt total |
| Current repayment problem? | No | Assume the stated car loan is current; the brief reports no distress |
| Age / score availability | 29 / I know my score | Assignment |
| Purpose cost | ₹8,00,000 | Use the stated borrowing need as the amount to fund for this test, not a claim about the total wedding budget |
| Own funds | ₹0 | Credit no unreported own funds; this does not claim Priya has no savings |
| Smaller-plan viability | No | Evaluate the original plan only; no smaller wedding is supplied or invented |
| Emergency reserves | Leave blank | Not supplied; remain unknown |
| Upcoming commitment | Skip this refinement | Not supplied; no “none” assertion is invented |
| Actual lender offer | No—use the benchmark | No actual offer supplied |

The only added spending estimate is ₹17,000 beyond rent. It is not derived from the brief and should be replaced with Priya’s answer in a real assessment. The zero-contribution and complete/current-debt assumptions also need confirmation.

The browser does not collect debt end dates, so it conservatively retains the ₹14,000 payment throughout its 36-month comparison. The assignment’s two-year remaining term is preserved here; no early-release benefit is silently added to current capacity.

The route is Need → Income → Budget → Credit → Funding → Resilience. The personal, stable-salary path skips property, vehicle, productive-income and income-history panels. No offer panel is needed.

## 03 · Test the requested loan

The base monthly new-loan ceiling is:

`min(35% × ₹1,10,000 − ₹14,000, 90% × ₹1,10,000 − ₹45,000 − ₹14,000) = ₹24,500`

The app then runs the income and expense shocks separately. A 20% income drop reduces income to ₹88,000 and the monthly ceiling to ₹16,800. The separate 10% expense rise leaves a ₹24,500 ceiling. The income-drop case binds. These are prototype sensitivities, not predictions.

| Comparison | Monthly amount | Meaning |
| --- | --- | --- |
| Base new-loan ceiling | ₹24,500 | Before stress |
| Income-drop ceiling | ₹16,800 | Binding three-month scenario |
| Expense-rise ceiling | ₹24,500 | Separate three-month scenario |
| ₹8 lakh request at 24%, 36 months | ₹31,386.28 | Exceeds both the base and stress-aware ceilings |

The stress-aware principal range is ₹4,28,212–₹5,20,728 across the benchmark rates. Its lower endpoint governs. That range is a capacity estimate, not a recommendation to shrink the wedding. A smaller loan needs a viable purpose, which the assignment has not supplied.

The funding check also shows a ₹10,670 gap under the conservative benchmark fee deduction: ₹8 lakh principal leaves ₹7,89,330 of proceeds against the ₹8 lakh funding need used in this test. Actual fees and any available own funds remain to be confirmed. Even removing this fee gap would not make the requested payment fit the assessed ceiling.

## 04 · Priya’s Negotiation Card

**Original ₹8 lakh request · Minor illustrative budget clarifications · 36-month benchmark.** These are outputs from the app’s existing engine, not a lender offer or a Key Facts Statement.

| Card field | Example result |
| --- | --- |
| Recommendation | **Do not borrow under assessed conditions** |
| Requested / recommended | ₹8,00,000 / No amount recommended |
| Assessed scenario | Personal loan · 36 months · original wedding request |
| Safe borrower capacity | ₹4,28,212–₹5,20,728 · Low confidence; lower endpoint governs |
| Lender access | Not estimable: income evidence remains unknown |
| Requested-loan payment | ₹31,386.28/month at the upper 24% benchmark rate |
| Binding stress | 20% income drop · ₹16,800/month ceiling |
| Pricing | 9.99%–24% annual reducing interest; 9.99%–25.01% conditional benchmark APR · Low confidence |
| Funding check | ₹10,670 gap under the upper benchmark fee package; no unreported own funds credited |
| Conditions and unknowns | Confirm non-rent spending, contributions, all debt and repayment status. Income evidence, reserves and actual lender terms remain unknown; no smaller wedding is assumed. |

The overall verdict is not “Incomplete assessment,” but some individual outputs correctly remain unknown. In particular, we do not fabricate income records merely to obtain a lender estimate. The app can explain why the requested borrowing fails its household boundary without claiming to know what a lender would approve.

## 05 · What the example demonstrates

- A known score and strong salary do not replace the household cash-flow check.
- The ₹8 lakh request remains unchanged. The engine returns an adverse verdict under the stated assumptions; the walkthrough does not manufacture a positive outcome.
- Unknown optional reserves and income evidence stay unknown. Reserves would not increase recurring capacity anyway.
- If the spending estimate is wrong, replace it and rerun. At ₹55,000 total spending the stressed ceiling falls to ₹10,200 and the same request still fails. This is a sensitivity check, not another invented fact about Priya.
- Removing total spending or the contribution clarification returns the overall assessment to Incomplete assessment. That is the correct treatment of missing core inputs.

The next conversation is to confirm the missing budget facts and request complete lender terms, not to presume Priya will change her wedding. The Negotiation Card makes the assessed boundary and remaining unknowns visible together.

## Go deeper

- [Decision Guide](../product/DECISION_GUIDE.md): essential rules and thresholds.
- [Full rules and source register](../product/RULES.md): rule IDs, rationale and evidence limitations.
- [Provided-facts-only persona runs](../validation/PERSONA_RUNTHROUGHS.md): the original case with no additional assumptions.
- [Exact example inputs](PRIYA_EXAMPLE.json): reproducible engine inputs; assumptions are documented above.
- [Executable example checks](../../tests/js/rules.test.mjs): verify the verdict, card numbers and unknown-data handling.
- [GitHub repository](https://github.com/ActiveAngrily/borrower_copilot): source, README and local startup instructions.

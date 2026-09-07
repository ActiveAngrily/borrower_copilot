# Priya’s ₹8 lakh request — a worked walkthrough

## 01 · The question

**Quick read:** Does Priya’s original ₹8,00,000 wedding-loan request fit her household budget? With the minimal demonstration clarifications below, the app returns **Do not borrow under assessed conditions**: the ₹31,386.28 benchmark payment exceeds the ₹16,800 stressed monthly limit.

Income evidence remains unknown, so lender access stays unresolved. There is no invented smaller wedding, extra savings, lender offer or positive recommendation. The [assignment-only run](../validation/PERSONA_RUNTHROUGHS.md) remains incomplete and unchanged.

## 02 · Priya’s supplied facts

| Assignment fact | Supplied value |
| --- | --- |
| Age and work | 29; salaried |
| Net monthly income | ₹1,10,000 |
| Request and purpose | ₹8,00,000 for a wedding |
| Rent | ₹28,000/month |
| Existing debt | ₹14,000/month car EMI; two years remaining |
| Reported credit score | 780 |

The app records that her score is known; it does not award a numerical rate discount. Rent alone is not total household spending.

## 03 · Minimal additional clarifications

**Demonstration assumption — confirm with the borrower.** Add ₹17,000 of non-rent essentials, giving ₹45,000 total monthly spending. This estimate is not derived from the brief.

**Demonstration assumption — confirm with the borrower.** Treat the stated salary as stable, with no other household contribution; treat the supplied car EMI as the full applicant debt and currently paid without distress.

**Demonstration assumption — confirm with the borrower.** Test the ₹8 lakh stated funding need with no unreported own funds credited and no smaller plan. These entries do not establish the total wedding budget, prove Priya has no savings or claim she would reject alternatives.

**Still unknown:** Income evidence, emergency reserves, additional upcoming commitments and actual lender terms. Leave these unresolved rather than inventing answers.

The app cannot collect the car loan’s end date. It retains the ₹14,000 EMI throughout its 36-month comparison, conservatively omitting the release after the supplied two-year remaining term.

## 04 · Exact app inputs

Enter each amount in the lower field; leave its upper field blank to represent a single value. The basis column distinguishes supplied facts, demonstration entries and unknowns.

| Screen / field | Choice or value | Basis |
| --- | --- | --- |
| Purpose / request | Wedding or another personal expense / ₹8,00,000 | Assignment; unchanged |
| Monthly net income / type | ₹1,10,000 / Salaried | Assignment |
| Material income variation? | No | Demonstration assumption — confirm with the borrower. Minor clarification assumed for the stated salary |
| Records support income? | I don’t know | Not supplied; no evidence is invented |
| Household contribution | ₹0 | Demonstration assumption — confirm with the borrower. Assume no additional contribution to the stated budget |
| Total monthly spending | ₹45,000 | Demonstration assumption — confirm with the borrower. Supplied ₹28,000 rent plus an illustrative ₹17,000 for other recurring essentials; excludes the car EMI |
| Monthly debt | ₹14,000 | Demonstration assumption — confirm with the borrower. Supplied car EMI; assume no additional required payments |
| Every applicant/co-borrower debt included? | Yes, same total | Demonstration assumption — confirm with the borrower. Assume the stated EMI is the complete debt total |
| Current repayment problem? | No | Demonstration assumption — confirm with the borrower. Assume the stated car loan is current; the brief reports no distress |
| Age / score availability | 29 / I know my score | Assignment |
| Purpose cost | ₹8,00,000 | Demonstration assumption — confirm with the borrower. Use the stated borrowing need as the amount to fund for this test, not a claim about the total wedding budget |
| Own funds | ₹0 | Demonstration assumption — confirm with the borrower. Credit no unreported own funds; this does not claim Priya has no savings |
| Smaller-plan viability | No | Demonstration assumption — confirm with the borrower. Evaluate the original plan only; no smaller wedding is supplied or invented |
| Emergency reserves | Leave blank | Not supplied; remain unknown |
| Upcoming commitment | Skip this refinement | Not supplied; no “none” assertion is invented |
| Actual lender offer | No—use the benchmark | No actual offer supplied |

The route is Need → Income → Budget → Credit → Funding → Resilience. The stable-salary personal path skips property, vehicle, productive-income and history panels; no actual-offer panel is needed.

## 05 · How the household limit is calculated

The model uses the lower of its debt-allocation and cash-budget limits:

`min(35% × ₹1,10,000 − ₹14,000, 90% × ₹1,10,000 − ₹45,000 − ₹14,000) = ₹24,500/month`

The 35% allocation and 10% headroom are prototype judgements, not universal lending rules. This is the base new-loan limit before stress.

## 06 · Which stress scenario binds

| Comparison | Monthly amount | Meaning |
| --- | --- | --- |
| Base household limit | ₹24,500 | Before stress |
| Income down 20% | ₹16,800 | Binding three-month scenario |
| Expenses up 10% | ₹24,500 | Separate three-month scenario |
| ₹8 lakh at 24%, 36 months | ₹31,386.28 | Requested payment exceeds both limits |

The income-drop case uses ₹88,000 income. The model tests it separately from the expense rise; these are sensitivities, not forecasts or regulations.

The resulting safe principal range is ₹4,28,212–₹5,20,728. Its lower endpoint governs. It is a capacity estimate, not a recommendation to shrink the wedding: no viable smaller purpose has been supplied.

## 07 · Why lender access remains unresolved

Income records are unknown, so the lender estimate is **Not estimable**. A known score cannot substitute for supported income or lender acceptance. The app can reject the request under its household limit without pretending to know whether a lender would approve it.

## 08 · Funding and fee check

Under the conservative benchmark fee package:

`₹8,00,000 principal − ₹10,670 fees = ₹7,89,330 purpose proceeds`

Against the ₹8 lakh funding need used in this demonstration, with no own funds credited, the gap is **₹10,670**. Actual fees and own funds need confirmation. Closing that gap alone would not make the requested EMI fit the household limit.

## 09 · Priya’s Negotiation Card

**Calculated result · Original request · 36-month benchmark.** The app’s existing engine produces these values from the exact demonstration inputs. This is illustrative guidance, not a lender offer, approval, guarantee or Key Facts Statement.

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

The overall result is a verdict, while individual outputs can remain unknown. Capacity and benchmark pricing remain Low confidence; confidence is not approval probability. Reserves would not increase recurring capacity even if later supplied.

## 10 · What would change the result

- Replace the spending estimate with Priya’s answer. At ₹55,000 total spending, the stressed limit falls to ₹10,200 and the original request still fails; that is a sensitivity example, not another fact about her.
- Remove spending or contribution information and the overall result returns to Incomplete assessment. Unknown core inputs never become zero.
- Confirm income evidence to refine lender access. A larger lender estimate still cannot raise household affordability.
- Enter complete actual offer terms to replace the conditional benchmark. Unknown fees or unsupported repayment structures must remain unresolved, not guessed.

Confirm the budget and funding assumptions before acting. Do not presume Priya will change her wedding to fit a recommendation.

## 11 · Supporting documents

- [Decision Guide](https://github.com/ActiveAngrily/borrower_copilot/blob/main/docs/product/DECISION_GUIDE.md): quick rules and thresholds.
- [Walkthrough on GitHub](https://github.com/ActiveAngrily/borrower_copilot/blob/main/docs/handoff/WALKTHROUGH.md): formatted copy of this worked example.
- [Full rules and source register](https://github.com/ActiveAngrily/borrower_copilot/blob/main/docs/product/RULES.md): detailed logic and external evidence.
- [Provided-facts-only persona runs](../validation/PERSONA_RUNTHROUGHS.md): original facts with no additions.
- [Exact example inputs](PRIYA_EXAMPLE.json): reproduce the calculation.

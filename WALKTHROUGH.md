# Lokta Borrower Copilot — Five-minute Walkthrough

## 1. The decision this product supports

The Borrower Copilot helps an Indian borrower answer a narrower and more useful question than “Will a lender approve me?” It asks whether the proposed borrowing appears manageable for the household, whether a smaller amount is more appropriate, or whether the borrower should avoid the loan under the assessed conditions.

The product keeps two lenses separate throughout. Likely lender sanction is an illustrative access estimate based on record-supported income, applicant obligations, product limits and applicable security. Safe borrower capacity is based on the household budget and adverse scenarios. A lender may allow more than the household should take, so the lender estimate never raises the recommendation.

This is not an application, underwriting model, credit-score predictor, or safety guarantee. It does not collect identity data or contact a lender.

## 2. The adaptive conversation

The first screen asks only the purpose and requested amount. Each later screen contains no more than three related question topics. The route is rebuilt from the answers already given:

- a personal purpose omits property and productive-income questions;
- a property-backed business purpose adds security and productive-use panels;
- an electric income-earning vehicle adds the on-road-price and productive-use panels;
- self-employed, informal, mixed, or materially variable income adds a lowest-income-history panel;
- saying an actual lender offer is available adds an offer and fee panel.

Back navigation keeps answers that still apply. If an earlier answer changes, the app stops using values from panels that no longer belong to the active route. A previous property value, productive-income estimate, or lender quote therefore cannot silently affect a new personal-loan scenario.

Blank values and explicit unknowns remain unknown. A real zero is entered as zero. Ranges retain their lower and upper endpoints; the app does not average them. The active panel receives focus after navigation, errors are announced, controls remain keyboard reachable, and reduced-motion preferences disable the panel movement.

## 3. The calculation boundary

All financial and routing logic lives in the pure `rules.mjs` module. `app.mjs` reads the visible form, manages the current in-memory route, and renders the returned result. The Negotiation Card receives that same result instead of calculating a second answer.

The base monthly new-loan ceiling is the lower of two limits:

- existing debt plus new recurring outflow must stay within 35% of available current income; and
- the budget must retain 10% of current income after household spending, existing debt and the new outflow.

The app always runs separate three-month scenarios for a 20% income drop and a 10% expense rise. It then adds only the adverse refinements activated by the borrower:

- a compatible observed-low-income month;
- a monthly provision for a known expense due within 12 months;
- known recurring offer charges; and
- a two-percentage-point rate increase for a supported floating reducing-balance offer.

The lowest applicable scenario becomes the stress-aware recurring ceiling and safe principal capacity. Emergency reserves show temporary coverage but never increase that ceiling. Projected productive income shows the payments due before it starts, its coverage of the assessed outflow, and cash after payment; it also never increases current safe capacity.

## 4. Funding, lender access, and amount selection

An affordable EMI does not prove that the purchase is funded. The app separately checks purpose cost, own funds, and fees. Deducted and financed fees reduce purpose proceeds; separately paid upfront fees reduce own funds. No fee is counted twice.

The lender estimate uses only the amount of current income the borrower says records support, and the debt total for every loan where the applicant is a borrower or co-borrower. The business path also applies a 50% reported-property cap and requires the stated ownership, encumbrance and participation conditions. The electric-vehicle path applies the repayment result, six-times-income limit, 85% on-road-price limit, and ₹3 lakh cap. These are illustrative model rules, not approval predictions.

`Borrow` is available only when the requested amount survives the borrower boundary, applicable lender constraint, funding check, product rules, triggered stresses and repayment-status rule. `Borrow less` requires a strictly smaller plan the borrower confirms is still useful; the app finds the smallest whole-rupee principal that funds that plan within the applicable limits. Missing facts produce an incomplete result rather than an invented adverse verdict. Active repayment distress blocks positive ordinary-new-debt guidance.

## 5. Price and actual offers

Without an offer, the app shows the approved product-specific rate band and APR range from a fully specified illustrative fee package. It labels that output conditional and Low confidence.

With an offer, the borrower enters contractual principal, quoted monthly repayment, repayment count, reducing or explicit flat structure, fixed or floating status, stated rate, and all mandatory fee categories. Actual APR is calculated from net initial benefit and the complete quoted monthly cash flows. A complete supported offer can receive Moderate calculation confidence, but this does not make it fair or guarantee approval.

Unknown fees never become zero. Revolving credit, multiple disbursements, moratoria, balloons and irregular repayment structures are reported as unsupported. A complete floating reducing-balance offer also shows the payment at a two-percentage-point higher rate and the indicative duration if the borrower tried to keep the original EMI.

## 6. Results and Negotiation Card

The results lead with the current state: `Borrow`, `Borrow less`, `Do not borrow under assessed conditions`, or `Incomplete assessment`. Six compact sections then show:

1. stress-aware safe borrower capacity;
2. likely lender sanction;
3. recommended borrowing amount;
4. benchmark or actual price comparison;
5. payment, tenure and binding stress; and
6. funding, reserve, commitment and productive-use context.

Each amount names its state, confidence where applicable, and reason. The dark one-screen Negotiation Card condenses the same result into the requested and recommended amounts, product and tenure, borrower and lender ranges, payment, binding stress, pricing basis, and unresolved conditions. Print uses the browser print dialog. Share uses the device share control or clipboard only after the borrower chooses it.

## 7. Privacy, verification, and limitations

The app is four static files with no framework, build step, backend, login, upload, analytics, browser storage, or application network call. Answers exist only in the open tab and reset clears them from the interface.

`rules.test.mjs` checks the running JavaScript engine, including all three verdicts, adaptive routes, actual and incomplete offers, floating stress, history, commitments, reserves, productive income, stale irrelevant values, and flat/reducing arithmetic. `validation_checks.py` retains the wider approved specification oracle and adds Stage 15 checks for panel size, route wiring, design tokens, reduced motion, and the absence of persistence or network code. Final browser checks cover the personal path, the full property-backed path with a floating offer, route changes, back navigation, results and the Negotiation Card.

The remaining limits are intentional. Product bands and thresholds are prototype judgements, lender access is illustrative, named-persona gaps remain gaps, and unsupported contracts require a complete external assessment rather than a guessed conversion. The next useful work would be empirical testing with anonymised borrower cases and current lender offers; it should happen only with an explicit privacy and validation plan.

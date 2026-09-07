# Stage 14: Implementation Plan

Status: completed and implemented through Stage 15. `rules.mjs` owns routing, calculations, lender-access, funding, stress, product-state and verdict decisions. This plan introduced no new lending policy, product, threshold, or persona fact.

## Delivery boundary

Keep the existing no-dependency static application. It runs from `index.html` with browser memory only: no login, persistence, URL state, telemetry, backend, upload, bureau pull, or external API. `RULES.md` remains the policy/source register. `validation_checks.py` remains the independent specification oracle, not the UI engine.

Do not build lender matching, applications, document collection, debt settlement, authentication, analytics, localisation, or an offer parser for unsupported repayment structures.

## Implemented boundary

The final browser app presents at most three related topics per panel and rebuilds its route from current answers. It covers the core questionnaire, business security, vehicle pricing, funding, observed-low income, commitments, reserves, productive-income timing, supported actual offers, floating-rate stress, output states, a single-source Negotiation Card, print/share, and reset. Unsupported offers and material unknowns remain explicit rather than being forced through an ordinary EMI calculation.

## Chosen implementation shape

| Concern | Owner | Rule |
|---|---|---|
| Static document and semantic controls | `index.html` | Labels, fieldsets, input constraints, live status, and no personal identifiers. |
| Responsive and print presentation | `styles.css` | One column first; text and state labels never depend on colour alone. |
| Pure calculations and result states | `rules.mjs` | Accept a normalized in-memory assessment and return named outputs, conditions, and UI-safe result states. No DOM access. |
| Input normalization, routing, rendering and reset | `app.mjs` | Preserve provided/zero/unknown/not-applicable; call the pure rules once per assessment; do not select lending policies. |
| Small executable checks | `rules.test.mjs` | Cover every newly wired branch with approved generic fixtures and invariants. |

The first integration step is to move all calculation decisions out of `app.mjs` into `rules.mjs`. This removes duplicated rule wiring without adding a framework or state store.

## Implementation sequence

### 1. Normalize inputs and preserve answer states

- Represent amount/range, provided zero, unknown, and not applicable separately for every relevant field.
- Preserve linked range endpoints: low income with high expenses/debt is the conservative borrower side; never midpoint ranges.
- Keep current household resources `I`, supported lender income `J`, household debt `D`, and applicant debt `D_L` distinct.
- On edit, recompute applicability and clear or explicitly reactivate formerly hidden answers. Do not retain them as silent inputs.

**Acceptance:** unknown income, expenses, debt, fees, credit, contribution, security and future earnings never become zero; an explicit zero still computes as zero.

### 2. Integrate the baseline assessment

- Implement C1–C8, L1–L8, RT, IR, FF, PC, ID, AV, BF and NC through pure rule functions.
- Produce independently labelled results for requested scenario, borrower capacity, lender sanction, recommended amount, rate reference, actual/benchmark APR, ceiling, payment, tenure and funding gap.
- Apply product/age/security/vehicle constraints to lender access only; never turn collateral or lender allowance into household income.
- Require viable smaller-purpose funding before `Borrow less`; a request that fails only because data is unknown remains incomplete or conditional rather than adverse.

**Acceptance:** the browser’s generic fixtures agree with the Stage 12 oracle within NC8 tolerances; no positive ordinary-debt guidance appears if core affordability, required funding, or the applicable safety route is unresolved.

### 3. Integrate stress, distress and confidence

- Always calculate the separate three-month 20% income-drop and 10% expense-rise cases.
- Add observed-low income, floating-rate, fee, commitment, reserve, productive-income and debt-status paths only when their documented triggers are present.
- Apply U17 before the final verdict: missing core I/E/D gives an incomplete overall assessment. Active distress adds the stabilization-first action and blocks positive ordinary-new-debt guidance; unknown resolution status also withholds positive guidance without being labelled active distress.
- Implement per-output `Estimated`, `Conditional estimate`, `Not estimable`, and `Not applicable` states, plus only `Low`/`Moderate` confidence where ST77–ST84 permit them.

**Acceptance:** every V11 generic behaviour remains true in the browser rule layer, including: stress cannot improve capacity, a bounced payment does not prove active arrears, reserves never increase the recurring ceiling, and productive income never increases current safe capacity.

### 4. Complete the result and card contract

- Put the final state and main driver first, followed by safe borrower capacity, lender access, pricing, ceiling/payment, tenure, stress, conditions and next action.
- Name the requested and recommended scenarios separately and explain disagreements instead of selecting a favourable one.
- Keep actual-offer APR not estimable when material actual charges or structure remain unsupported; label benchmark APR as illustrative.
- Generate the Negotiation Card from the same result object used by the page. Print and deliberate share remain user-initiated and current-session only.

**Acceptance:** every displayed figure has a unit, scenario, short explanation and material limitations; the Card adds no calculation or borrower input.

### 5. Verify the implementation

- Keep `node rules.test.mjs` as the small executable check for every new calculation branch; extend it with only approved generic fixtures.
- Run `python3 validation_checks.py` after every rule or documentation change.
- Manually check keyboard-only entry, visible focus, unknown controls, narrow-phone layout, reset, print, conditional visibility, incomplete/conditional/distress states, and all three persona routes without inventing inputs.
- Record the final persona run-throughs and written walkthrough in Stage 15, not in implementation fixtures.

**Acceptance:** both commands exit zero; the UI has no network/persistence calls; every manual check has a recorded result before Stage 15 is marked complete.

## Work order and stop conditions

1. Refactor the pure rule boundary and add its checks.
2. Wire baseline/result states, then stress/distress/confidence.
3. Wire the result/Card contract and complete UI checks.
4. Stop at the approved product scope. Any unsupported repayment schedule, unbounded actual fee, missing core answer, or unapproved product remains visible as unsupported, conditional, or not estimable.

Stage 15 begins only after the browser rule layer passes the approved generic fixtures, the UX/privacy/accessibility checks are recorded, and the final deliverables are prepared. It includes—not assumes—the three persona run-throughs and written walkthrough.

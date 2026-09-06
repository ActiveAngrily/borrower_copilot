# Stage 13: Product and UX Requirements

Status: approved and implemented in Stage 15. This document translates the accepted Stage 1–12 rules into interface requirements; it introduces no lending rule, threshold, or persona fact.

## Product boundary

The app is a mobile-first, borrower-side self-assessment for Indian borrowers. It keeps likely lender sanction, safe borrower capacity, product/funding viability, collateral constraints, and the final recommendation visibly separate. It must not claim approval, safety, personalised pricing, or a bureau result.

Answers stay in browser memory for the active session only. The product must not use login, storage, URLs, analytics, logs, uploads, a backend, or external services.

## Questionnaire flow

Use one short, scrollable mobile flow with the eight approved core topics in order: purpose, requested amount, current income and support, household contributions, household spending, existing debt and repayment status, age, and credit context. Each numbered topic states why it matters.

Each financial input supports a provided amount, a provided range, an explicit zero where applicable, or an explicit `I don't know` state. A blank field is not silently treated as zero. Range inputs label their lower and upper endpoints; the conservative endpoint drives borrower guidance.

Show only applicable conditional sections:

- funding and a viable smaller-purpose plan when assessing purpose funding or `Borrow less`;
- security value, ownership and participation for the property-backed business path;
- vehicle price for the electric two-wheeler path; and
- applicant debt detail only when it differs from the household total.

Refinements remain optional and appear only when they can change a calculation, scenario, or safety route. Editing a response recalculates the current in-memory assessment; it does not retain an inactive answer as a hidden assumption.

## Results and states

The result begins with one clearly labelled state: an incomplete assessment, `Borrow`, `Borrow less`, or `Do not borrow under the assessed conditions`. An incomplete assessment names the missing inputs and does not disguise missing evidence as a financial failure. Active distress is shown as a separate stabilization-first safety action; it blocks positive ordinary-new-debt guidance, while U17 still governs a result with missing core income, expense, or debt information.

The visual hierarchy after the verdict is:

1. safe borrower capacity and its binding stress case;
2. likely lender sanction, separately labelled as illustrative and conditional;
3. the assessed amount, estimated payment, ceiling, and tenure trade-off;
4. rate reference, benchmark APR and fee basis; and
5. assumptions, unknowns, confidence, and next action.

Every important number carries INR/month or INR, the named product and tenure, a one-sentence explanation, and `Low` or `Moderate` confidence only when the approved method permits it. Assessment ranges are never called probabilities or confidence intervals. A result that cannot be responsibly bounded reads `Not estimable`, never zero.

## Stress, pricing, and explanations

Always surface the baseline alongside the separate three-month 20% income-drop and 10% expense-rise cases. Name the binding case. Only surface rate, fee, commitment, history, and productive-income scenarios when their approved triggers are known; do not stack unrelated shocks.

Keep a broad rate reference distinct from APR. A benchmark APR must state that it uses an illustrative complete fee package, while an incomplete actual offer remains not estimable. Collateral and lender capacity must never be phrased as household repayment income.

## Negotiation Card and sharing

The one-screen Negotiation Card reuses exactly the current assessment; it performs no separate calculation. It includes the verdict and main reason, assessed product/tenure, requested and recommended amount, safe capacity, lender estimate, rate/APR fee basis, ceiling/payment, compact tenure and stress results, plus material conditions and unknowns.

Print uses the browser's print action. Share is an explicit user action that shares only the displayed summary through the device's native share control when available. Neither action saves information in the product.

## Accessibility, responsive behaviour, and failure states

Use semantic labels, fieldsets and legends; keyboard-reachable controls; visible focus; text labels in addition to colour; error text near the field; a live result/status region; minimum mobile-friendly tap targets; and a single-column layout before larger-screen enhancement.

The interface must explain unsupported or incomplete conditions rather than substituting a normal loan calculation: unsupported offer structure, missing core inputs, unresolved lender evidence, unknown material fees, unresolved security conditions, and unknown debt-distress status. Reset clears the form and result from memory.

## Persona journey boundary

Priya, Ravi and Anita demonstrate routing only at this stage. Their known facts prefill neither this generic form nor a final assessment. Priya's total expenses and income evidence, Ravi's compatible income/support/security details, and Anita's monthly debt payments and repayment-status resolution must remain unknown until supplied.

## Verification boundary

The product must retain the existing Stage 12 oracle as the rule baseline. Browser behaviour needs separate implementation checks for arithmetic wiring, unknown/zero/range handling, conditional visibility, stress/result states, privacy reset, keyboard use, narrow screens, and the three persona routes. This does not make the browser UI a lender, regulatory, accessibility, or empirical-safety certification.

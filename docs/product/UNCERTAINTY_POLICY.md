# Stage 6: Missing-data and Uncertainty Policy

Status: Stage 6 content and implementation accepted by the user. Cross-stage audit corrections were subsequently approved.

Stage 12 update: [analytical rules](ANALYTICAL_RULES.md) and [stress testing](STRESS_TESTING.md) supply the approved methods; [validation strategy](../validation/VALIDATION_STRATEGY.md) executes unknown/zero, range, output-state, distress and confidence checks. Actual unknown fees and hypothetical benchmark budgets stay separate.

References: [accepted data dictionary](DATA_DICTIONARY.md), [accepted requirements](REQUIREMENTS.md), and [accepted output definitions](OUTPUT_DEFINITIONS.md).

This policy defines how missing, approximate, contradictory, or insufficiently supported information affects an assessment. It distinguishes uncertainty from financial risk and permits useful independent results without inventing critical financial facts. “Proposed judgement” identifies the origin of a decision; the judgements below have been approved for Stage 6. U39 resolves the must-question/unknown-input issue previously left open in R9, R15, and R36.

## Preserve the meaning of answers

| ID | Classification | Approved policy |
|---|---|---|
| U1 | Requirement from the brief | Unknown is never zero. Missing credit information must not become a poor or perfect score. |
| U2 | Proposed judgement | Preserve the dictionary's states: **provided**, **unknown**, **not asked**, and **not applicable**. Unknown and not asked provide no numerical evidence; their explanations differ. |
| U3 | Proposed judgement | Use **not applicable** only when the assessed path makes an input irrelevant. “No existing debt” is a provided zero; it is not missing debt information. |
| U4 | Proposed judgement | Invalid or contradictory answers require clarification. Do not silently repair them, average conflicting values, or treat them as adverse evidence. Withhold only the outputs that depend on the unresolved conflict. |
| U5 | Proposed judgement | Preserve borrower-reported ranges and inequalities. Do not choose a midpoint, close an open-ended range, or turn “30%+” into exactly 30% during missing-data handling. |
| U6 | Proposed judgement | Distinguish missing information from a disclosed adverse circumstance. ST57–ST65 define active distress from disclosed facts. An unanswered or unresolved repayment-history answer must not imply that a problem occurred, and a bounced payment alone is not assumed to be continuing arrears. |

## Three output states

These states describe whether an output can be supported. They are separate from the three borrowing verdicts.

| ID | Classification | State and meaning |
|---|---|---|
| U7 | Proposed judgement | **Estimated:** Required dependencies are available for the approved method. The result remains a self-assessment, not verified eligibility or guaranteed affordability. |
| U8 | Proposed judgement | **Conditional estimate:** A result can be bounded using explicit, approved assumptions or alternative scenarios. State the assumptions and show the resulting range. |
| U9 | Proposed judgement | **Not estimable:** A material dependency lacks both usable information and an approved defensible bound. Do not display zero or a fabricated range in its place. Identify what information would make the result possible. |
| U10 | Proposed judgement | Assign these states **per output**. Missing expenses may prevent safe-capacity assessment while still allowing a product-level pricing benchmark. Do not discard useful independent results. |

## What may—and may not—substitute for missing information

| ID | Classification | Approved policy |
|---|---|---|
| U11 | Proposed judgement | An unknown preference, such as tenure or product preference, may be replaced by an explicitly identified assessed scenario using approved product rules. An unknown financial fact is not merely a preference. |
| U12 | Proposed judgement | Do not invent core repayment facts: net income, household expenses, or existing required debt payments. A borrower-provided usable range can substitute for a single amount; a generic expense ratio cannot silently substitute for missing expenses. |
| U13 | Proposed judgement | Reference assumptions may supply product pricing, standard fee scenarios, and lending-rule ranges only after their sources or judgements and applicability have been approved. Keep them visibly separate from borrower answers. |
| U14 | Proposed judgement | Optional information must refine a baseline that already works. If an additional field is indispensable to the chosen method, either simplify that method or explicitly reconsider the must-question set—do not quietly make the optional field compulsory. |

## Policy by missing dependency

Each row is a **proposed judgement**. No numerical fallback is adopted.

| ID | Missing information | Approved consequence |
|---|---|---|
| U15 | Requested amount | Do not issue a verdict about an unspecified requested loan. Independent capacity estimates may remain possible. |
| U16 | Purpose | Withhold the overall borrowing verdict and purpose-dependent product routing. Explicit product scenarios may still produce independent estimates. |
| U17 | Core income, expenses, or existing debt payments | If a usable value or range is unavailable, withhold the safe monthly ceiling, safe principal capacity, and recommended borrowing amount. Mark the overall assessment incomplete rather than interpreting the missing value as zero. |
| U18 | Credit score or formal credit history | Use an approved broader assessment for missing credit information without assigning a synthetic score. Score availability and reported formal borrowing history are separate facts. Neither establishes existing debt obligations; no formal borrowing history must not be interpreted as no informal debt. |
| U19 | Income documentation or history | IR uses borrower-reported supported monthly net income J, conditional on lender acceptance. Q3 obtains minimum evidence. Unresolved J makes sanction not estimable, not zero; household capacity may remain available. Partial support is not automatically contradictory. No occupation haircut or automatic annual/monthly conversion. |
| U20 | Age | Do not silently confirm age-dependent eligibility or maximum tenure. A calculation may be shown for an explicit tenure condition, with the eligibility limitation disclosed. |
| U21 | Reserves or upcoming commitments | Do not assume zero reserves or no upcoming expenses. Without usable answers, show the common income/expense stresses but mark reserve coverage and commitment resilience incomplete. Do not grant a reserve benefit. A known commitment with unresolved amount/timing leaves its scenario conditional; reserves never raise recurring capacity. |
| U22 | Partner contribution or co-applicant details | Do not count another person's entire earnings automatically. A clearly labelled borrower-only scenario may be assessed where viable; it is not a claim that the other person contributes zero. Use the dictionary's matched budget boundary: contributions are net of commitments paid outside the assessed budget, and lender-side co-applicant income and obligations remain separate. Unresolved overlap in income, spending, or debt must be clarified before calculating affected outputs. |
| U23 | Collateral details or willingness to pledge | Keep the secured path unresolved where those facts matter. Do not treat ownership as consent to pledge, or an unknown encumbrance as no encumbrance. Any unsecured alternative must be assessed separately. |
| U24 | Productive earnings or supporting evidence | Do not add unreported or unsupported future earnings to current repayment resources. Always preserve the no-upside case; where an estimate and timing are supplied, show delayed upside separately. Productive earnings never raise current safe capacity or the recommended amount, and unresolved evidence leaves the productive-benefit outlook incomplete. |
| U25 | Minimum viable purpose cost or own contribution | Do not assert that a smaller loan will solve the borrowing need. A safe-capacity estimate can remain available, but a **Borrow less** verdict requires confirmation that the smaller funding arrangement is viable. When needed for the verdict, this confirmation belongs to the conditional must-set within approximately 8–10 questions. If the required confirmation is unknown, the verdict may remain incomplete; do not hide it as an indispensable optional question. |
| U26 | Lender offer or fees | BF permits a no-offer conditional package with explicit hypothetical budgets/timing, Low confidence. These are not market-wide fee bounds or a replacement for unknown actual charges. Missing actual fees need defensible approved bounds or actual all-in APR is withheld. Removing known fees must not restore a narrower default that excludes previously supported possibilities. |
| U27 | Rate basis or repayment structure | Never assume an unknown rate basis or unsupported structure. Under NC5, a complete supported quoted cash-flow schedule can establish APR independently of advertised rate basis; explain that unresolved basis separately. Unsupported repayment structures remain excluded. Independent benchmarks may remain available. |

**Proposed judgement:** U17 takes precedence over issuing an overall borrowing verdict: without a defensible core affordability assessment, show an incomplete assessment and any known concerns separately. This avoids disguising insufficient evidence as “Do not borrow.”

## Range behaviour and decision uncertainty

| ID | Classification | Approved policy |
|---|---|---|
| U28 | Requirement from the brief | Less information must not produce unjustifiably narrower ranges. Explain why uncertainty increased. |
| U29 | Proposed judgement | For the **same product, tenure, method, and reference rules**, removing an answer while retaining compatible remaining facts must leave the assessment range at least as wide and preserve the previously supported possibilities. If no defensible bound remains, change the result to not estimable rather than fabricate extreme endpoints. Any finite range based on bounded assumptions must state those bounds; it does not cover every possible undisclosed circumstance. Numerical bounds require separate approval. |
| U30 | Proposed judgement | A genuinely informative additional answer may narrow a range. An irrelevant answer must not narrow it. Correcting an answer or disclosing facts incompatible with the prior assessment requires reassessment and an explanation; it is not the pure answer-removal comparison in U29. Unresolved contradictions remain subject to U4. More answers do not automatically mean more certainty. |
| U31 | Proposed judgement | Do not compare range widths across different product paths as though only missingness changed. Show that the assessed scenario changed. |
| U32 | Proposed judgement | When supported scenarios imply different recommendations, disclose that the decision depends on unresolved information. Do not present the most favourable scenario as the unconditional verdict. |
| U33 | Proposed judgement | Maintain the approved conservative boundary for recommended amounts. A wider upper capacity estimate must not itself justify recommending more borrowing. Exact endpoint construction and amount selection remain for analytical-rule approval. |

**Mathematical derivation:** U29 expresses a set-inclusion principle: removing evidence expands, or leaves unchanged, the supported possibilities for a fixed scenario, method, and reference rules with compatible remaining facts. Correcting facts or changing assumptions is a reassessment, not this removal operation. The principle does not establish a statistical confidence interval or a numerical widening factor.

## Communicating confidence

| ID | Classification | Approved policy |
|---|---|---|
| U34 | Proposed judgement | Use **Low confidence** and **Moderate confidence** as qualitative, output-specific labels. Do not use confidence percentages or “High confidence” in this self-reported prototype. |
| U35 | Proposed judgement | Must-question-only numerical estimates remain **Low confidence**, as required by the brief. ST77–ST84 permit Moderate only when that output's specified current inputs, triggered facts and method support are complete. |
| U36 | Proposed judgement | A monthly ceiling may be Moderate when I/E/D, debts/status, reserves/commitments and stability are resolved; variable income additionally requires 12 completed compatible months. Safe principal capacity additionally requires complete supported repayment terms. Actual APR may be Moderate only with complete reconciled actual cash flows. Benchmark APR/rate bands and lender-sanction estimates remain Low. Answer count alone never determines the label. |
| U37 | Proposed judgement | For a not-estimable output, show its status and missing dependency instead of attaching a misleading confidence label to a nonexistent number. |
| U38 | Proposed judgement | Each material limitation explains **what is missing, which result it affects, and what would resolve it**. Exact borrower-facing wording remains for UX approval. |

## Stage 11 triggered uncertainty and distress precedence

| ID | Classification | Approved policy |
|---|---|---|
| U40 | Proposed judgement | Omitting an optional trigger never creates a zero. Run the baseline and universal stresses where possible; mark only the affected refinement or triggered scenario conditional/incomplete. |
| U41 | Proposed judgement | Disclosed but unresolved repayment-problem status blocks a positive borrowing verdict until clarified. It is not automatically classified as active distress or a permanent adverse verdict. |
| U42 | Proposed judgement | Active distress plus usable core I/E/D yields “Do not borrow under assessed conditions” for ordinary new debt and a stabilization-first action. If core I/E/D is missing, U17 takes precedence: the overall assessment stays incomplete, with the safety action shown separately. |
| U43 | Proposed judgement | A disclosed fixed rate makes rate-rise stress not applicable; a disclosed floating rate activates ST22–ST31; unknown structure makes that stress conditional and cannot be silently treated as fixed or floating. |
| U44 | Proposed judgement | Unknown reserve/commitment information prevents a claim about temporary coverage or commitment resilience but does not by itself invalidate a calculable base ceiling or the universal income/expense stresses. |
| U45 | Proposed judgement | Separate scenarios by default. Combine adverse facts only when the borrower reports that they coincide or the contract makes them coincide; never manufacture a compound worst case from unrelated unknowns. |

## Reconciling the short questionnaire with incomplete assessments

**U39 — Proposed judgement:** Interpret “the app works from the must-questions” as follows:

- The must-set must obtain usable core affordability information and enough context to assess a supported loan scenario.
- When a smaller loan is being considered, confirmation that a smaller funding arrangement serves a viable purpose is a conditional part of the approximately 8–10 must-questions. Count it within that total, not as an extra compulsory optional question. Stage 8 approves [question content and an 8–10-topic structure](QUESTIONNAIRE_DESIGN.md), disclosing individual subanswers separately. Exact per-path routing remains for Stage 9.
- “Unknown” remains available; selecting it must never cause fabricated data.
- With usable must-set answers, all four outputs must be produced using approved broad assumptions where needed.
- If a critical answer is unknown and cannot be bounded, the app still completes the interaction, displays independent results, and explicitly identifies the incomplete outputs.
- Optional questions must not become necessary merely to conceal a gap in the baseline method.

This resolves the earlier R9/R15 tension explicitly. It does not promise numerical advice when the necessary financial information is absent.

## Verification examples and remaining boundaries

The examples below are approved policies now covered by Stage 12 validation; they are not persona verdicts.

- Remove a known credit score: do not substitute a low score or narrow the same-scenario pricing range.
- Replace known expenses with unknown: do not increase the EMI recommendation; mark dependent affordability results not estimable.
- Remove fee information: do not retain an apparently complete APR unless an approved conditional fee range supports it.
- Remove Ravi's wife's contribution information: do not count her ₹18,000 earnings automatically.
- Leave Anita's EMI unknown: do not use her ₹35,000 outstanding balance as monthly payment.
- Add an irrelevant answer: do not improve numerical precision or confidence.

| Classification | Deferred item |
|---|---|
| Fact requiring external research | Defensible product, fee, and lender-recognition bounds require verification before adoption. No research is authorized by this stage. |
| Resolved and validated | Stages 10–11 approve baseline ranges, conditional benchmark budgets, scenario disagreement, stress/resilience and confidence rules; Stage 12 executes their checks. |
| Out-of-scope item | Statistical confidence claims, arbitrary default expenses, synthetic credit scores, or implementing a calculation engine during this stage. |

## Artifact and verification boundary

**Proposed judgement (approved):** Add only this document for Stage 6, linked to the accepted dictionary, requirements, and output definitions. Verify coverage of missing dependencies, preservation of unknown versus zero, consistency with the approved incomplete-assessment state, and absence of invented numerical defaults. Stop for approval of the implementation result before beginning the next stage.

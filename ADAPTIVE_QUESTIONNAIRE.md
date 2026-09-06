# Stage 9: Adaptive Questionnaire Branching

Status: approved specification. Stage 12 validates the routing rules, and Stage 15 implements them through `questionRoute()` and the progressive panel controller.

References: [questionnaire design](QUESTIONNAIRE_DESIGN.md), [data dictionary](DATA_DICTIONARY.md), [dependency map](OUTPUT_INPUT_MAP.md), [uncertainty policy](UNCERTAINTY_POLICY.md), [output definitions](OUTPUT_DEFINITIONS.md), [requirements](REQUIREMENTS.md), and [rules and sources](RULES.md).

This stage defines when approved questions appear, how answers affect the conversation, and how edits affect scenario applicability. It implements a branching specification, not a running questionnaire. “Proposed judgement” identifies decision origin; BR1–BR18 below are approved for this stage.

## Purpose and boundary

**Proposed judgement (approved):** Show questions relevant to the borrower's purpose and circumstances. Skipping must not silently mean “no,” and an old answer must not influence a scenario to which it no longer applies. Do not hide financial assumptions inside routing or treat income type as proof of eligibility.

**Requirement from the brief:** The must-only route remains useful with wide ranges and low confidence. Apply the accepted U39 qualification: usable core information supports the required outputs through approved methods; critical unknowns permit completion of the interaction with explicitly incomplete dependent outputs.

## Overall flow

**BR1 — Proposed judgement (approved):** Use this order:

1. Ask Q1–Q8, including relevant clarifications within each topic.
2. Identify candidate product scenarios from the disclosed purpose.
3. Ask Q10 if a candidate secured scenario needs collateral information.
4. Ask the funding portion of Q9 if the candidate funding arrangement requires it.
5. Resolve disclosed repayment distress before positive ordinary-debt guidance.
6. Assess the Stage 10 baseline, then run the universal income and expense stresses.
7. Activate applicable Stage 11 history, reserves/commitments, productive-income and offer/rate refinements, then calculate `S_stress_low`.
8. Ask Q9's smaller-purpose portion if a smaller borrowing arrangement needs assessment.
9. Present supported outputs and their limitations; allow further applicable refinements, then reassess.

Question IDs stay stable even when Q10 precedes Q9. Reusing Q9 does not create another topic; its additional answers remain visible in the burden count. The approved budget is eight core topics plus zero, one or two conditional topics. It is not a promise of at most ten individual answers. See Stage 8 QD1–QD3 and its answer-burden inventory.

**Stages 10–11 resolution:** [PC/FF/BF/AV](ANALYTICAL_RULES.md) supply products, funding and baseline amount rules. [ST1–ST76](STRESS_TESTING.md) supply the stress-aware amount, distress and final-verdict boundary. A candidate amount alone does not justify a smaller-purpose recommendation.

## Core-topic branches

Every row is a **proposed judgement (approved)**.

| ID | Trigger and action | Unknown or unresolved answer |
|---|---|---|
| BR2 — Purpose clarification | Within Q1, clarify vehicle type, electric status and mixed purposes when details distinguish a supported candidate path. A business purpose must allow disclosure that a vehicle is also funded. | Retain unresolved details. Do not assume a vehicle is an electric scooter or route using a persona's name. |
| BR3 — Income clarification | Q3 clarifies income/deductions and asks available records, whether they support entered monthly net income, and period. IR5 reuses confirmed support, collects partial support or clarifies differing definitions/periods. | None/unsure leaves J unresolved, not zero; household capacity may remain estimable. No occupation haircut or silent annualization. |
| BR4 — Budget overlap and distress | Q5 clarifies recurring-cost provisions. Q6 confirms applicant obligations including payments made by others, with separate amount if different; clarifies disclosed non-monthly schedules and agreed arrears payments under ID. If a repayment problem is disclosed, ask ST87 status/timing/catch-up details within Q6. | Unresolved household facts block affected capacity; applicant facts block affected sanction. Unresolved repayment status blocks positive guidance but is not invented distress. U17 takes precedence if core I/E/D is missing. |
| BR5 — Credit details | Q8 treats score availability and formal history as separate answers. Ask for the score only when reported known; provider and date may remain unknown. | Do not infer a score from history. An unresolved provider/basis must not automatically receive CIBIL-specific treatment. |

**BR6 — Proposed judgement (approved):** Continue through remaining core topics after an unknown answer. Unknown expenses do not make age or credit context irrelevant. For invalid or contradictory answers, allow correction or an explicit unknown response. If the conflict remains unresolved, dependent outputs stay incomplete; the interaction need not trap the borrower in a correction loop. This reuses U4, U10 and U17 rather than treating a contradiction as financial adversity.

## Secured-path branching

**BR7 — Proposed judgement (approved):** Ask Q10 only when an explicitly identified candidate scenario uses security and the answer can determine whether it is assessable.

| Answer or circumstance | Approved branch |
|---|---|
| Willing | Ask applicable asset details and relevant owners' participation. Participation does not automatically collect/count extra income. |
| Not willing | Do not pursue that secured scenario. |
| Unsure | Keep that scenario unresolved; do not substitute consent. |
| Unknown asset value, ownership or encumbrance | Preserve uncertainty for affected secured estimates. Do not invent an unencumbered asset. |
| Supported unsecured alternative | Assess separately. Do not silently transfer secured-scenario results. |

**BR8 — Proposed judgement (approved):** Distinguish security involving an existing asset from security involving the asset being purchased. Do not ask a borrower to confirm current ownership of an unpurchased vehicle. Existing-asset ownership and encumbrance questions apply where relevant. Later product rules must identify which Q1/Q9/Q10 information purchase finance actually needs.

**Requirement from the brief:** Ravi's circumstances must lead to consideration of an appropriate secured/productive path.

**Stage 10 resolution:** PC1/PC3/PC5 define supported paths. The property model requires reported unencumbered applicant-owned property and relevant owners willing to participate. A known charge is unsupported; unknown charge/participation unresolved. Vehicle-purchase security differs from existing-asset ownership. Considering a secured path does not establish lender eligibility or recommend pledging it.

## Funding and smaller-purpose branches

**BR9 — Proposed judgement (approved):** Treat Q9 as two separately triggered parts.

| Part | Trigger | Handling |
|---|---|---|
| Funding details | Need purpose cost, contribution and fee allocation. BF's deducted-fee benchmark can trigger Q9 for any of the three products. PC3 needs on-road vehicle price, not a mixed-purpose total. | Ask missing applicable amounts and whether contribution is before/after upfront fees. Unknown is neither zero contribution nor full funding; never subtract fees twice. |
| Smaller-purpose viability | A smaller borrowing arrangement is being considered and needs confirmation that it accomplishes an acceptable purpose. | Ask the approved yes/no/unsure question and any needed minimum acceptable cost and contribution details. |

**BR10 — Proposed judgement (approved):** Interpret smaller-purpose answers narrowly:

- Yes: the borrower considers a smaller arrangement potentially useful; this alone establishes neither affordability nor full funding.
- No: do not issue Borrow less by assuming a smaller version is acceptable.
- Unsure: leave the smaller-purpose conclusion unresolved.
- Missing minimum cost or contribution: do not claim the arrangement works unless the approved method establishes viability from remaining information.

**BR11 — Proposed judgement (approved):** Missing core affordability information alone must not trigger smaller-purpose questions. Missing expenses are not evidence that the loan should be smaller. Whether evidence supports Do not borrow, an incomplete verdict, or further assessment remains governed by the uncertainty policy and later verdict rules. U17 and U25 continue to apply.

## Optional refinement branches

**BR12 — Proposed judgement (approved):** Show an optional candidate only when all three conditions hold:

1. It is relevant to the current scenario.
2. An approved, implemented rule gives it a possible numerical effect.
3. The baseline does not depend on answering it.

A hypothetical future effect is insufficient. Stage 11 activates the stress-related branches below when their conditions apply; inactive candidates remain omitted. R12, U14, Stage 8 QD7 and ST85–ST92 govern this gate. A change to confidence wording alone does not qualify.

Every row below is a **proposed judgement (approved as a conditional branch)**. BR12 applies to every row.

| Optional candidate | Additional eligibility condition |
|---|---|
| Income history | Income is variable/self-employed/informal/mixed, disclosed as unstable, or the borrower requests a refined stress result. Use the compatible observed low in a separate scenario; 12 months are needed for a variable-income Moderate condition. |
| Variable income and source duration | Each field has an effect; do not show both merely because one is useful. |
| Additional income evidence | Q3 obtains the IR5 minimum dependency. Offer extra evidence only when it numerically refines supported amount/range; preserve annual/monthly meaning under IR6. |
| Co-applicant details | A supported co-applicant scenario exists. Do not require a reported household contribution as a prerequisite: contribution and application participation differ. |
| Emergency reserves | Temporary coverage is being assessed. Ask for funds remaining after purchase, fees and earmarks; never use reserves to raise recurring capacity. |
| Upcoming commitments | Ask about known expenses within the next 12 months and collect amount, due month and earmarked funds. |
| Repayment problems | Ask status details within Q6 when a missed/overdue/bounced payment or another repayment problem is disclosed. Skipping or reporting no current debt does not establish no prior problem. |
| Productive earnings | Purpose includes earning income. Run delayed-upside and no-upside cases without increasing current safe capacity. |
| Lender quote | The borrower has a quote and chooses assessment. Collect fixed/floating status and charges for rate/fee stress; unsupported terms follow BR16. |

**BR13 — Proposed judgement (approved):** Keep refinements in Stage 8 candidate-bank order, omitting inapplicable or inactive entries. The borrower may stop refining at any point and retain the current assessment. Do not introduce an automatic ranking system that guesses which answer is most valuable.

## Unknowns, unsupported terms and edits

**BR14 — Proposed judgement (approved):** Distinguish answer history from current applicability:

| Situation | Meaning |
|---|---|
| Never asked | Not asked. |
| Asked but unknown | Unknown. |
| Explicit none | Provided answer, including zero where appropriate. |
| Irrelevant to current scenario | Exclude from that scenario. Do not rewrite a previously provided answer as zero. |

This preserves the dictionary's knowledge states and the uncertainty policy; it does not create a new storage schema.

**BR15 — Proposed judgement (approved):** When an earlier answer changes:

1. Reevaluate affected branches.
2. Stop using answers that no longer apply.
3. Invalidate affected results and recompute them.
4. Retain prior answers only in session memory.
5. If a previously inactive answer becomes relevant again, show it for confirmation before reuse.

An old property value or loan quote must not silently influence a different assessment. No persistent storage or answer transmission is authorized; R22 and RULES.md P16 still apply.

**BR16 — Proposed judgement (approved):** Do not silently map unsupported purpose/repayment terms to a supported structure. Stage 10 excludes revolving new credit, multiple disbursements, moratoria, irregular instalments and balloons. Existing-debt calendars do not expand new-offer scope. NC5 permits APR from a complete supported quoted schedule despite unclear advertised rate basis; it does not assume a rate basis or repair an unsupported structure. Retain independent supported results.

**Mathematical derivation:** Branching creates no new uncertainty formula. U29's range-containment rule applies when information is removed under the same scenario, method and reference rules with compatible remaining facts. Changing product paths requires reassessment, not a misleading comparison of range widths.

## Verification examples

**BR17 — Proposed judgement (approved):** Check the documented flow with the following cases without producing financial outcomes:

| Case | Expected branching property |
|---|---|
| Priya | No irrelevant business or productive-income refinements. |
| Ravi | Can disclose combined stock-and-vehicle purpose and consider an existing-property secured path. |
| Anita | Vehicle can be identified as electric; missing monthly debt payments remain a critical unknown. |
| Both conditional topics needed | Q9 and Q10 remain within ten topics; subanswer burden is still disclosed. |
| Security declined | That secured scenario is not treated as accepted. |
| Unknown income or expenses | Missingness does not trigger a smaller-loan conclusion. |
| Purpose changed | Irrelevant collateral or quote answers stop affecting results. |
| Optional question affects only confidence wording | The question is not activated. |
| Floating-rate quote | Apply the +2 percentage-point case; fixed is not applicable and unknown structure stays conditional. |
| Active distress with usable core data | Block positive guidance and route to Do not borrow under assessed conditions for ordinary new debt. |
| Active distress with missing core data | Keep the overall assessment incomplete under U17 and show the stabilization-first safety action separately. |

**Fact requiring external research:** Product eligibility and accepted repayment structures must use applicable registered evidence when selected. No new research is proposed or performed for this document.

**Out-of-scope item:** Application code, UI layout and persona verdicts. Product bands, calculations and stress severity are now supplied by Stages 10–11.

## Implementation and handoff

**BR18 — Proposed judgement (approved):** Add only ADAPTIVE_QUESTIONNAIRE.md. Check BR1–BR18 coverage, topic counts, missing-data behaviour, answer-edit handling, and separation from pending numerical rules. Then stop for implementation review.

Verification remains a routing-oracle check rather than execution of a questionnaire UI. [Stage 12](VALIDATION_STRATEGY.md) now runs the approved routing fixtures. Stage 13 defines the product and UX requirements.

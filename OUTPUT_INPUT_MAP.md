# Stage 4: Output-to-input Dependency Mapping

Status: Stage 4 content and implementation accepted by the user. Cross-stage audit corrections were subsequently approved.

Stage 15 update: [analytical rules](ANALYTICAL_RULES.md) and [stress testing](STRESS_TESTING.md) resolve the dependency chain; the browser engine implements the supported paths and the independent [validation strategy](VALIDATION_STRATEGY.md) continues to check their states, routing and formulas.

References: [assignment specification](Lokta_Borrower_Copilot_Build_Challenge_v2.html), [accepted requirements](REQUIREMENTS.md), and [accepted output definitions](OUTPUT_DEFINITIONS.md).

This stage works backward from the approved outputs to the information needed to produce them. It separates borrower information, reference information and judgements, and derived results. These are information needs, not questionnaire questions or must-question assignments. “Proposed judgement” identifies the origin of a decision; the judgements below have been approved for Stage 4.

## Mapping principles

| ID | Classification | Approved content |
|---|---|---|
| M1 | Proposed judgement | Separate borrower-provided information, external/reference rules, and derived results in the map. An assumed rate or expense is never represented as an answer the borrower supplied. |
| M2 | Proposed judgement | Map information to a specific output effect. An input with no defensible effect is excluded from the proposed input set. |
| M3 | Requirement from the brief | Additional questions must affect an output. Under approved R12, a confidence-only or explanation-only effect does not justify an additional question. |
| M4 | Proposed judgement | Mark dependencies as generally relevant, path-specific, or offer-specific. Do not interpret every mapped dependency as a mandatory question. |
| M5 | Proposed judgement | Keep lender-recognized income and borrower repayment resources conceptually separate. They may originate from the same answers but need not have the same assessed value. |
| M6 | Proposed judgement | Missing dependencies remain visible. This map does not authorize default values, automatic exclusions, or rules for withholding results. |

## Output-to-input dependency map

Each row is a **proposed judgement** about the information needed. The outputs themselves were approved in Stage 3. The stated applicability of individual dependencies does not make them mandatory questions.

| ID / output | Borrower information | Reference rules or approved judgements needed | Derived results feeding the output |
|---|---|---|---|
| M7 — Assessed scenario | Purpose, requested amount, product preference if known, tenure preference if any; relevant asset or productive-use details | Supported product paths, eligibility conditions, feasible tenures, and how to select an assessed tenure when none is supplied | Explicit product and tenure for the requested scenario; separately identified alternatives |
| M8 — Likely lender sanction | Q3 supported monthly net income, evidence/period; applicant obligations including payments made by others; age/credit and applicable security/participation | L/IR/PC define conditional J, separate D_L, ratios and product limits. Optional co-applicant income needs its own applicable method | Conditional lender capacity at consistent pricing/tenure; unresolved J or D_L is not zero |
| M9 — Safe borrower capacity | Current I/E/D, compatible income history, recurring charges, and triggered facts about rate structure, reserves and commitments | C/NC plus ST1–ST76; unknowns follow U17/U21/U27; reserves never raise recurring capacity | Base and per-scenario ceilings, per-scenario principal capacities, `C_resilient`, and conservative `S_stress_low` |
| M10 — Recommended amount and verdict | Requested amount, purpose, smaller-purpose viability, own funds, and any disclosed active repayment distress | AV plus ST57–ST76; apply U17 before an adverse verdict when core I/E/D is missing | Stress-aware capacity, funding and product feasibility, purpose viability, lender-access limitation, distress route, and final verdict or incomplete state |
| M11 — Fair interest-rate band | Assessed product; income type and relevant evidence; known credit information; collateral details where applicable; amount and tenure if pricing depends on them | Sourced product rate bands and explicitly justified profile adjustments; treatment of unknown information | Profile-appropriate benchmark band with a reason for its width and position |
| M12 — All-in APR | Loan amount and tenure; lender-offer details if supplied, including rate basis, fees, repayment structure, and charge timing | Approved APR convention and fee treatment; explicit fee assumptions when no offer is supplied | Borrowing cash flows: funds received and required payments, including identified charges |
| M13 — New-loan monthly ceiling | Current I/E/D and triggered historical income, recurring-charge and commitment facts | C plus ST1–ST48; reserve amounts affect coverage context only | Base and stressed affordable recurring outflow for the new loan, distinct from total household debt payments, plus the binding `C_resilient` |
| M14 — Estimated loan payment | Amount, tenure, and offer terms if available | Assessed interest terms, repayment structure, and recurring mandatory charges | Estimated recurring payment for the stated loan scenario |
| M15 — Tenure comparison | Assessed principal and any relevant tenure constraints | At least two feasible tenures; consistent rate and fee assumptions unless a disclosed product condition changes them | Monthly payment, repayment duration, total repayment including identified charges, and comparison with the monthly ceiling |
| M16 — Stress result | Baseline I/E/D and assessed new-loan outflow; compatible income history; offer rate structure/terms; charges; after-purpose liquid reserves; 12-month commitments; productive-income timing; repayment-problem status | ST1–ST65 define always-on and triggered cases; ST66–ST76 define aggregation and verdict effects | Named scenario inputs, ceiling/payment/cash remaining, reserve coverage where available, binding case, `S_stress_low`, and distress/incomplete route |
| M17 — Negotiation Card and explanations | No additional borrower information solely for presentation | Approved output definitions and explanation requirements | Existing results, their principal drivers, assumptions, material unknowns, and scenario context |

**Stage 10 resolution:** M12 uses FF/BF/NC. Upfront, deducted and financed charges retain distinct funding effects, even where same-time upfront/deducted fees give equal APR benefit. Recurring charges enter both outflow and APR. Hypothetical benchmark packages never resolve unknown actual charges automatically.

## Conditional information: what earns its place

These are candidate dependencies, not approved questionnaire wording or a commitment to ask every item. Every row is a **proposed judgement**.

| ID | Information and applicability | Output effect that would justify collecting it |
|---|---|---|
| M18 | Income evidence, when lender treatment depends on documentation | Changes the likely-sanction estimate or range. It does not automatically replace the borrower's actual available-income estimate. |
| M19 | Income variability, stability, and compatible history, especially for variable earnings | Lowest observed compatible monthly net income creates a separate historical-low scenario; 12 completed months are required for Moderate confidence on a variable-income ceiling. Shorter history remains usable at Low confidence. |
| M20 | Collateral value, ownership, encumbrance, and willingness to pledge, for a secured path | Determines whether that path is an assessable alternative and affects its sanction constraints and pricing. Collateral does not itself increase repayment resources. |
| M21 | Partner contribution or co-applicant income and obligations, when relevant | Safe capacity uses contributions actually available to the assessed household budget, matched to the spending and debt paid from that budget. Contributions are net of commitments paid outside it. Lender-recognized co-applicant income and obligations are assessed separately for sanction; neither full earnings nor unrelated debts are imported into borrower affordability automatically. |
| M22 | Productive-use costs, expected incremental net earnings, and when earnings begin, for productive borrowing | Creates delayed-upside and no-upside cases and changes productive-purpose viability/outlook. It never raises current safe capacity or the recommendation; gross revenue or more activity is not net income. |
| M23 | Minimum viable funding and borrower contribution, when assessing Borrow less | Determines whether a smaller loan can fund a viable version of the purpose and explains the remaining funding gap. Viability confirmation is a conditional part of the approximately 8–10 must-questions when needed for the verdict, not an indispensable optional question. Stage 8 Q9 defines the wording and also collects purpose cost and own contribution when needed for requested-loan funding, not only Borrow less; exact routing remains for Stage 9. |
| M24 | Liquid emergency reserves remaining after purchase/fees/earmarks, and known commitments within 12 months | Changes temporary coverage context and, for unearmarked commitments, the commitment-month provision and stress-aware capacity. Reserves never raise the recurring ceiling. |
| M25 | Debt schedules and whether a missed/overdue/bounced payment is resolved, under a plan, restructured/settled, or still causing shortfall | Refines D/D_L and activates the Stage 11 distress route. A bounced payment alone is not continuing arrears; unknown status blocks positive guidance but is not invented distress. |
| M26 | Existing debt end dates, only if the assessment models commitments over time | Can change a future repayment scenario. Otherwise do not collect them merely because a persona supplies them. |
| M27 | An actual lender offer, if the borrower has one, including fixed/floating structure and complete charges | Replaces hypothetical terms in an explicitly identified offer scenario, enabling offer-specific payment/APR and the applicable +2 percentage-point floating-rate and fee stresses. Unknown structure keeps rate stress conditional. |

## Data flow and separation

**M28 — Proposed judgement:** Use this conceptual order:

1. Establish the borrowing need and candidate product scenario.
2. Assess borrower repayment resources and lender-recognized income separately.
3. Establish the scenario's pricing, fee assumptions, and feasible tenure.
4. Estimate baseline payments, monthly ceiling, sanction and capacity; then run every applicable Stage 11 scenario separately.
5. Use `S_stress_low`, funding, product and purpose viability, lender access, and distress precedence to determine the supported amount and verdict or incomplete state.
6. Summarize those same results in explanations and the Negotiation Card.

**M29 — Proposed judgement:** An alternative amount, product, or tenure must have its own internally consistent assessment. Do not combine a sanction estimate from one product with a rate or repayment schedule from another.

**M30 — Stage 10 resolution:** FF2/BF define fixed or principal-based benchmark fees. AV3 selects minimum funding principal within the candidate boundary; NC6 rechecks principal-dependent charges at the selected whole-rupee amount. Unsupported actual charge arrangements cannot be silently approximated. Algorithm/code choices remain implementation planning.

## Persona-specific dependency checks

Each row is a **proposed judgement** about information gaps, not a persona verdict.

| Persona | What the map must preserve |
|---|---|
| Priya | Rent is known, but total household expenses are not. Her income, score, and car EMI do not remove the need to assess other commitments. A Borrow less recommendation also requires knowing whether a smaller wedding budget or other funding is viable. |
| Ravi | Cash income and ITR income must remain distinguishable. His wife's earnings are not automatically available for repayment or lender recognition. Property ownership does not establish willingness to pledge. Productive borrowing needs information about costs, net benefit, and timing before projected earnings can support a scenario. |
| Anita | Outstanding loan principal is not monthly EMI. Doubling delivery runs does not establish incremental net income. A bounced payment is relevant information, but its analytical consequence requires an approved rule. Scooter-related operating costs must not be omitted or counted twice. |

## Deferred decisions and boundaries

| Classification | Item |
|---|---|
| Fact requiring external research | Product-specific income recognition, eligibility restrictions, collateral constraints, pricing, and APR conventions need verified sources before adoption. No external research is authorized in this stage. |
| Mathematical derivation | None adopted. Identifying that capacity depends on monthly outflow, pricing, and tenure does not select a formula. |
| Resolved | Dictionary and ID define budgets, recurring provisions and separate household/applicant debt peaks; ST39–ST48 define reserve and commitment resilience. |
| Resolved for baseline | Stages 8/9 incorporate IR5 evidence, applicant debt, funding and participation dependencies from Stage 10. |
| Resolved and validated | Stage 6 missingness remains authoritative; Stages 10–11 supply baseline, productive-income, distress and stress methods; Stage 12 executes their checks. |
| Out-of-scope item | Collecting borrower information merely for completeness, storing answers, or implementing the questionnaire or calculation engine during this stage. |

## Artifact and verification boundary

**Proposed judgement (approved):** Add only this document for Stage 4, linked to the accepted requirements and output definitions. Verify that every approved output has mapped dependencies, conditional information has a stated output effect, lender access remains separate from safe affordability, and no missing persona information has been invented. Stop for approval of the implementation result before beginning the next stage.

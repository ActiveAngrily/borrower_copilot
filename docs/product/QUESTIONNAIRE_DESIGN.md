# Stage 8: Questionnaire Design

Status: approved specification, validated in Stage 12 and implemented as the adaptive Stage 15 browser questionnaire.

References: [requirements](REQUIREMENTS.md), [output definitions](OUTPUT_DEFINITIONS.md), [dependency map](OUTPUT_INPUT_MAP.md), [data dictionary](DATA_DICTIONARY.md), [uncertainty policy](UNCERTAINTY_POLICY.md), and [rules and source register](RULES.md).

This stage translates defined information into understandable borrower questions. It specifies wording, answer meanings, must-topic membership, and candidate refinements. It does not implement screens, routing, or analytical rules. “Proposed judgement” records the origin of a decision; the QD1–QD14 judgements below were approved for this stage.

## Purpose and principal risk

**Proposed judgement (approved):** Collect enough information to support the required outputs without confusing income with revenue, outstanding balances with monthly payments, or another household member's earnings with available contributions. Keep the questionnaire short without hiding compulsory information in an optional section.

**Requirement from the brief:** Use approximately 8–10 adaptive must-questions. Additional questions must earn their place by changing an output. Approved R12 requires a possible numerical effect, directly or through a product-path change; confidence or explanation alone is insufficient.

## Questionnaire structure

| ID | Classification | Approved decision |
|---|---|---|
| QD1 | Proposed judgement | Use eight core question topics, plus up to two conditional must-topics: funding and purpose viability, and secured borrowing. |
| QD2 | Proposed judgement | Count and disclose both topics and individual answer fields. The approved interpretation is 8–10 topics, not necessarily ten individual answers. Related subanswers create real effort and must remain visible. Assess usability later rather than claiming that grouping eliminates this burden. |
| QD3 | Proposed judgement | A must-question is presented when applicable and allows “I don't know.” It never requires an invented value. Apply U7–U27 and U39 when an unknown makes dependent outputs incomplete. |

## Eight core topics

All wording, choices, grouping and mappings in this table are **proposed judgements (approved)**. Numeric answers preserve an amount or a borrower-reported range where specified; unknown remains available.

| Topic | Borrower wording and explicit answer content | Dictionary mapping | Output purpose |
|---|---|---|---|
| Q1 — Purpose | **“What would this loan pay for?”** Choices: wedding or another personal expense; business investment or expansion; vehicle for earning income; vehicle for personal use; another purpose; unsure. Another purpose permits a short description without identity details. Where details distinguish a supported path, clarify what vehicle is involved, whether it is electric, and whether the loan also funds something else. Preserve unknowns and mixed purposes; never infer these details from a persona name. | `purpose` | Purpose and candidate product context; another purpose does not promise supported product coverage. M7, M10. |
| Q2 — Requested principal | **“How much do you want to borrow?”** Amount or lower–upper range in INR. Help: “Enter the loan amount you want, not the total purchase cost or the money left after lender deductions.” | `requested_loan_amount` | Requested scenario, payment and verdict. Preserve a range rather than selecting its midpoint. M7, M10, M14. |
| Q3 — Current income and supporting records | **“What do you currently earn per month, and how do you earn it?”** Income type: salaried; self-employed; informal or casual; mixed; unsure. Earnings: amount/range/unknown. Then **“What records could you show a lender to support these earnings?”** and **“Do those records support the monthly net-income amount you entered?”** See IR handling below. | `income_type`, `current_net_income_monthly`, `income_evidence_type`, `supported_net_income_monthly`, `income_evidence_period`; annual evidence remains separate | Household I and conditional lender J remain distinct. Minimum evidence is a must-topic dependency, not indispensable optional information. IR1–IR8. |
| Q4 — Contributions | **“How much do other household members actually contribute each month to the budget we are assessing?”** Amount, range, “No contribution”, or unknown. No contribution is an explicit zero. | `other_household_contribution_monthly` | Establishes the matched budget; does not import a spouse's full earnings. M9, M13, M21. |
| Q5 — Spending | **“How much does this household budget currently spend each month, excluding debt payments?”** Amount/range/unknown, including monthly provisions for predictable recurring non-monthly costs. Clarify excluded amounts only where needed. | `household_expenses_monthly`, relevant recurring-cost cycle details | ID1–ID3 define provisions without assuming that cash has accumulated. M9, M13. |
| Q6 — Existing debt outflow and repayment status | **“How much must this household budget currently pay each month toward existing debts?”** Amount/range/no payments/unknown. Then **“Does this total also represent all required monthly debt payments on loans where you are a borrower or co-borrower, including payments someone else makes?”** If different, collect applicant amount separately. If a missed, overdue or bounced payment is disclosed, ask whether it is resolved, under a required catch-up plan, restructured/settled, or still causing a repayment shortfall. Clarify disclosed varying schedules and agreed catch-up payments where needed. | `existing_debt_payments_monthly`, `applicant_debt_payments_monthly`, `repayment_problem`, relevant payment-calendar and arrears details | Household D and applicant D_L differ. Outstanding principal cannot substitute. The status activates ST57–ST65; a bounce alone is not continuing arrears. L5–L6; ID4–ID8. |
| Q7 — Age | **“How old are you, in completed years?”** Age or unknown; no date of birth. | `age_years` | Applicable product and tenure conditions without identity details. M8, M15. |
| Q8 — Credit context | **“What do you know about your credit score and formal borrowing history?”** Separate fields: score status and formal history. Score status choices: know my score; don't know my score; have been told no score is available. History choices: have borrowed formally; have not borrowed formally; unsure. If known, record score, provider and date if known. | `credit_score_availability`, `formal_credit_history`, `credit_score` including its provider/date metadata | Sanction and pricing context. Unknown scores receive no synthetic value. No formal history does not mean no informal debt. M8, M11; U18. |

**QD4 — Proposed judgement (approved):** Use these supporting explanations:

- Q3: “Use earnings after work or business costs and taxes, before household spending and debt payments. Do not include expected extra earnings from this new loan.”
- Q3 deduction clarification: “If a loan payment has already been deducted from the income figure you entered, tell us so we do not subtract it twice.”
- Q4: “Include only money actually available to this budget, after commitments the contributor pays separately.”
- Q5: “Include rent, food, utilities, transport and spending for people supported by this budget. Include current purchases paid by card. Exclude business costs already deducted from earnings.”
- Q6: “Include loan instalments, card EMIs, payments toward carried card debt and financing charges. Do not count settlement of current card purchases again if those purchases are already included in spending.”

**QD5 — Proposed judgement (approved):** Deductions and overlapping-payment clarifications are additional answer effort within their topic. They clarify the existing dictionary boundaries, not a new financial default. If an overlap cannot be resolved, affected affordability outputs remain incomplete under U4 and U22; do not silently adjust figures.

**Stages 10–11 resolution:** [ID1–ID8 and C6](ANALYTICAL_RULES.md) define recurring provisions, calendar-month debt peaks and non-positive income. [ST57–ST65](STRESS_TESTING.md) govern disclosed distress and U17 precedence. Exact controls remain for Stage 13.

**Approved Q3 evidence handling (IR5–IR6):** Records: payslips; Form 16; ITR; bank statements; business records; other; none; unsure. Yes, records support entered monthly net income: reuse that amount/range. Part only: collect supported amount/range. Different period or income definition: clarify before use. None/unsure: leave J unresolved, not zero. Record period. Annual values remain annual; division by 12 requires compatible meaning, clear period and confirmation of current representativeness. No document uploads. More evidence is optional only after this minimum dependency is resolved and only when a supported numerical refinement exists.

## Conditional must-topics

Every row is a **proposed judgement (approved)**. These topics belong inside the 8–10 topic budget when applicable, not in an indispensable optional tier. Exact triggers and order remain for Stage 9.

| Topic | Borrower wording and explicit subanswers | Dictionary mapping | Output purpose |
|---|---|---|---|
| Q9 — Funding and purpose viability | Record total purpose cost and money the borrower is willing and able to contribute without borrowing whenever the assessed funding arrangement needs them, including for the requested loan. Only when considering smaller funding, ask **“Could a smaller loan still pay for an acceptable version of your plan?”** Choices: yes; no; unsure. Then record the lowest acceptable purpose cost where needed. Each amount may be unknown. Help: “Do not include emergency money you intend to keep untouched.” | `purpose_cost`, `minimum_viable_purpose_cost`, `available_own_contribution`; the viability response confirms the meaning of these amounts | Supports funding assessment, including purchase contributions and proceeds after deducted fees where applicable, and establishes whether Borrow less serves the purpose. No down-payment or fee rule is selected here. Own contribution is not assumed to equal savings. M10, M23; U25. |
| Q10 — Secured borrowing | **“Would you consider offering an asset as security for this loan?”** Choices: yes; no; unsure. If relevant, record asset type, estimated value, ownership, and existing secured borrowing or charges against it, including the associated amount if known. Unknown is available for each fact. | `willing_to_pledge`, `collateral_type`, `collateral_estimated_value`, `collateral_ownership`, `collateral_encumbrance` | Makes a secured alternative assessable where applicable. Ownership establishes neither willingness nor lender acceptance. M8, M11, M20; U23. |

**QD6 — Proposed judgement (approved):** Proposed Q10 explanation: “Offering security puts that asset at risk if repayments are not made. An asset's value does not replace the need to afford repayments.” Trace the final factual wording to an applicable registered source before app use. The separation of collateral from repayment resources also follows approved P14 in RULES.md.

**Open question:** Stage 9 must establish exact Q9/Q10 triggers and ordering, including paths needing both. This stage approves content and membership, not a routing algorithm.

### Explicit answer burden

**Proposed judgement (approved QD2):** The inventory below makes the approved grouping reviewable. Counts describe the listed content, not a promise that every field appears on every path. A lower–upper range uses two numeric endpoints. Unknown choices can avoid subsequent detail; routing is still pending.

| Topic | Individual answer content before extra clarification |
|---|---|
| Q1 | One purpose selection, plus description for another purpose. Relevant vehicle/mixed-purpose clarification adds vehicle type, electric status, and whether other purposes are included. Unknown remains available. |
| Q2 | One amount, or two range endpoints. |
| Q3 | Income type and amount/range; evidence categories; whether those records support the amount; period; partial support adds its amount/range. Different definitions and debt deductions add clarification where needed. |
| Q4–Q6 | Each has one amount/range or no/unknown response. Q5 may need recurring-cost details. Q6 adds applicant-obligation confirmation and separate amount/schedule if different; irregular payments/arrears and overlaps can add answers. |
| Q7 | One age or unknown response. |
| Q8 | Two independent status/history responses; a known score adds its value, provider and date if known. |
| Q9 | Purpose cost and own contribution; clarify contribution before/after upfront fees. Vehicle price must be distinguished from mixed-purpose cost. Smaller-purpose viability/minimum cost asked only if needed. Amounts may be ranges. |
| Q10 | Willingness and applicable security details; existing-property ownership/encumbrance plus relevant owners' participation. Purchase-vehicle security is distinct from ownership of an existing asset. Participation does not collect extra income automatically. |

The core is eight topics; adding either conditional topic gives nine, and adding both gives ten. Individual answers can exceed ten. This is the explicitly approved interpretation, not a claim that the borrower supplies only eight to ten values.

## Optional refinement candidates

**QD7 — Proposed judgement (approved):** This is the optional bank. Stage 11 activates only the rows whose listed condition applies; no path displays every question. Optional questions refine a working baseline rather than rescue a method that requires them. R12, U14 and ST85–ST92 apply to every row.

Every row below is a **proposed judgement (approved as a candidate only)**.

| Candidate wording and content | Dictionary mapping | Required numerical effect |
|---|---|---|
| “Over the latest 12 completed calendar months, what was your lowest monthly net income, using the same after-cost and tax basis as your current income?” Record actual coverage if shorter. | Lower endpoint of `historical_net_income_range_monthly`, `income_history_coverage_months` | Activates the observed-low-income stress; 12 compatible months can support Moderate confidence for variable-income ceilings. Shorter history remains useful at Low confidence. Do not ask for the historical high merely for this method. |
| “How much of your current monthly income varies, and how long have you had this income source?” Separate variable portion and duration answers. | `variable_income_component`, `income_source_duration_months` | Refines approved stability or lender recognition. Omit either unused field. |
| Additional income evidence beyond Q3's resolved minimum, only where it changes supported income or its range. Preserve record definition and period; no uploads. | `income_evidence_type`, `supported_net_income_monthly`, `documented_annual_income`, `income_evidence_period` | Q3 now collects the minimum dependency under IR5. Optional evidence cannot secretly be required for the baseline or change confidence solely by answer count. |
| “Would someone join the application?” If relevant: willingness, net income, required debt payments and overlap with the assessed budget. | `coapplicant_participation`, `coapplicant_income_monthly`, `coapplicant_debt_payments_monthly` | Refines a separate co-applicant sanction scenario. Full earnings are not automatically added to repayment resources. |
| “After this purchase, its upfront fees, and money already set aside for known commitments, how much would remain readily accessible for emergencies?” Amount/range excluding pledged assets. | `liquid_emergency_reserves` | Calculates temporary stress coverage; never increases the recurring ceiling. |
| “In the next 12 months, do you expect a known one-time expense that this budget must pay?” Record amount, expected month, and money already earmarked. | `upcoming_commitment` | Calculates the unearmarked commitment provision and commitment-month stress without counting funds twice. |
| “Have any repayments been missed, overdue or bounced?” If yes, ask when and whether resolved, under a required catch-up plan, restructured/settled, or still causing a shortfall. | `repayment_problem` | Activates the distress route. A bounce alone does not establish ongoing arrears; unresolved status blocks positive guidance without inventing distress. |
| “What additional monthly net earnings do you expect this investment to produce after extra operating costs and any income it replaces, and how many months after funding would they begin?” Record amount/range, delay and basis. | `productive_incremental_net_income_monthly`, `productive_income_start_delay_months`, `productive_income_basis` | Creates delayed-upside and no-upside cases; never increases current safe capacity or the recommendation. |
| “Do you have a lender quote you want to assess?” Principal, net disbursal, duration, rate and basis, fixed/floating status, payment schedule and charges with timing, tax status and payment method. | `offer_principal`, `offer_net_disbursal`, `offer_tenure_months`, `offer_interest_rate`, `offer_rate_structure`, `offer_repayment_terms`, `offer_charge` | Enables offer-specific payment and APR. This is an optional multi-field section, not a lightweight single question. Charge detail retains the dictionary's amount/percentage basis and mandatory/unknown status. |

**QD8 — Proposed judgement (approved):** Do not initially collect card utilisation, debt end dates, or preferred loan product merely because the dictionary includes them. Admit them only when a selected method uses them. The dictionary is a candidate inventory, not a requirement to collect every field.

**QD9 — Proposed judgement (approved):** Defer tenure preference as a question. The baseline can compare explicitly identified feasible tenures under later approved rules. Add a preference question only if it changes the assessed scenario or numerical comparison.

## Answer handling and explanations

| ID | Classification | Approved decision |
|---|---|---|
| QD10 | Proposed judgement | Reuse provided, unknown, not asked and not applicable. Do not collapse them to blanks or zero. Apply the approved per-output estimated, conditional estimate and not-estimable states. |
| QD11 | Proposed judgement | Preserve reported ranges. Validation wording: “The lower amount must not exceed the upper amount.” Do not reorder answers or select a midpoint. |
| QD12 | Proposed judgement | Provide a short topic-specific reason from its dependency, such as “This helps estimate what remains available for a new EMI.” Exact placement and visual controls remain for UX approval. |

**Fact requiring external research:** Provider-specific score validation and product-specific eligibility questions must use applicable checked evidence. Stage 7 sources are available in RULES.md; this document adopts no new eligibility rule. Final factual wording, including QD6, must have an applicable source before app use.

**Mathematical derivation:** No lending formula is introduced. Monthly net income, annual documented income, principal, monthly debt payments and net disbursal retain their distinct meanings. The topic count is eight core plus zero, one or two conditional topics; it is not the number of scalar answers.

## Persona coverage and boundaries

**QD13 — Proposed judgement (approved):** Review coverage without inventing answers or assigning verdicts:

- Priya: Q5 asks total spending, not just rent; Q9 establishes whether smaller wedding funding is acceptable.
- Ravi: Q1 preserves the combined stock-and-vehicle purpose; Q3 clarifies net cash earnings; Q4 separates his wife's contribution from her earnings; Q10 allows consideration of a secured path without presuming consent. Income evidence and co-applicant refinements remain separate.
- Anita: Q1 clarifies the vehicle and electric status; Q9 can establish purchase funding even without a smaller-loan scenario. Q6 asks monthly debt payments separately from the supplied ₹35,000 outstanding balance. Productive-income refinement does not add hoped-for delivery earnings to current income.

**Out-of-scope item:** Questionnaire screens, persona outcomes and application code. Stage 11 supplies analytical routing and confidence conditions; exact controls remain Stage 13.

## Approved pre-Stage-9 audit corrections

**Proposed judgement (approved):** Broaden Q9 to funding and purpose viability within its existing conditional topic; clarify vehicle and mixed-purpose information within Q1 only when it distinguishes a supported path; keep non-annual evidence amounts out of the annual-income field. These corrections add no topic, product choice, eligibility threshold, fee rule or calculation. Their individual answer burden is recorded above. Exact routing remains for Stage 9.

## Artifact and verification boundary

**QD14 — Proposed judgement (approved):** Add only this document, linking questions to the accepted dictionary, dependency map, uncertainty policy and source register. Verify that every answer has a purpose, core/conditional counts and subanswer burden are explicit, unknowns and overlaps preserve approved behaviour, optional candidates require a numerical effect, and no financial thresholds or persona assumptions are introduced.

This implements documentation only. Stages 9–11 subsequently supply routing, analytical treatment and active numerical effects; final controls/layout remain Stage 13. Individual answer burden still exceeds topic count.

## Approved Stage 10 funding and security amendments

FF5 clarifies within Q9 whether own contribution already allows for separately paid fees. PC3 distinguishes on-road vehicle price from mixed-purpose totals. L7/PC5 put required owners' participation in Q10; optional additional co-applicant income remains separate. A property charge makes the initial secured model unsupported, while unknown charge/participation leaves it unresolved. No blanket spouse requirement is applied to the illustrative model. BF4's deducted-fee benchmark means funding details can be needed for personal loans too; Q9 is not reserved for Borrow less. Exact response controls remain for Stage 13.

## Approved Stage 11 stress amendments

ST85–ST92 activate income history when income varies or the borrower wants a refined stress result; reserves and 12-month commitments when temporary resilience is being assessed; productive-income timing for earning-purpose paths; repayment-status detail within Q6 when a problem is disclosed; and actual-offer rate structure/charges only when the borrower chooses offer assessment. These remain existing topics or optional refinements and do not expand the approved eight-core-plus-two-conditional topic structure. Declining an optional refinement preserves Low confidence or a conditional triggered result; it never supplies zero.

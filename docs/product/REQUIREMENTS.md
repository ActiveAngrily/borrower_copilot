# Stage 2: Requirements and Constraints

Status: Stage 2 content and implementation accepted by the user. Cross-stage audit corrections were subsequently approved.

Stage 15 integration: [analytical rules](ANALYTICAL_RULES.md) and [stress testing](STRESS_TESTING.md) supply the approved methods; the browser app implements the supported assignment scope; and [validation strategy](../validation/VALIDATION_STRATEGY.md) retains the independent oracle. All final assignment artifacts are present at the repository root.

Sources: [assignment specification](../../reference/Lokta_Borrower_Copilot_Build_Challenge_v2.html), [accepted problem framing](PROBLEM_FRAMING.md), and the user's explicit collaboration constraints.

This checklist defines required capabilities, limits, and completion evidence. It does not select formulas, lending thresholds, a framework, or UI components. “Proposed judgement” identifies the origin of a decision; those judgements below are approved for Stage 2. External claims remain unverified and external research is not authorized by this stage.

## Borrower-facing capabilities

| ID | Classification | Approved requirement |
|---|---|---|
| R1 | Requirement from the brief | Produce **Borrow, Borrow less, or Do not borrow**, with an understandable reason. All three outcomes must be reachable. |
| R2 | Requirement from the brief | Present **likely lender sanction** and **safe borrower capacity** separately, with guidance on which should govern borrowing. |
| R3 | Requirement from the brief | Present a **fair interest-rate band**, rather than a single supposedly exact rate. |
| R4 | Requirement from the brief | Present **all-in APR including processing fees**, so advertised interest and borrowing cost can be compared honestly. |
| R5 | Proposed judgement | Include other relevant borrowing charges when applicable. FF/BF/NC define the approved treatment. Unknown actual charges remain incomplete unless defensibly bounded; a hypothetical complete benchmark must not be described as a complete actual offer. |
| R6 | Requirement from the brief | Present a **monthly EMI/outflow ceiling**, explain the **tenure trade-off**, and include **at least one stress case** involving an income drop or rate rise. Stage 11 exceeds the minimum with universal 20% income-drop and 10% expense-rise cases plus triggered rate, fee, commitment, productive-income and distress cases. |
| R7 | Requirement from the brief | Produce a **one-screen Negotiation Card** that a borrower can use in a lender conversation. |
| R8 | Requirement from the brief | Explain every important number in borrower-readable language, including why the recommended ceiling differs from a larger possible amount. |

These establish capabilities, not their formulas, thresholds, wording, or screen layout. The accepted framing still applies: safe capacity constrains borrower guidance, and “Do not borrow” refers to the assessed loan under current conditions.

## Questions, missing information, and uncertainty

| ID | Classification | Approved requirement |
|---|---|---|
| R9 | Requirement from the brief | Use approximately **8–10 must-questions**. Completing only this set must still produce the four outputs, with wide ranges and low confidence. |
| R10 | Requirement from the brief | Adapt the questions to the borrower's circumstances and skip inapplicable questions. |
| R11 | Requirement from the brief | Every additional question must earn its place by changing an output; the brief specifically says to cut a question that never moves a number. |
| R12 | Proposed judgement | Apply the stricter interpretation: each additional question must have a documented possible effect on a numerical output or range, directly or through a product-path change. A confidence-only or explanation-only change does not, by itself, justify adding a question. It need not change a number for every possible answer. |
| R13 | Requirement from the brief | Represent unknown information as unknown. An unknown credit score must not become zero, a poor score, or a perfect score. |
| R14 | Requirement from the brief | Missing information must widen uncertainty, and the app must explain that consequence. It must not narrow a range without supporting information. |
| R15 | Proposed judgement | Required questions may require a response without requiring the borrower to invent a value. Unknown-input consequences are defined in the approved uncertainty policy, U7–U27 and U39. |

R9 and R15 are reconciled by [U39](UNCERTAINTY_POLICY.md): usable must-set answers support all four outputs; unavailable critical information produces explicitly incomplete dependent outputs. Smaller-purpose viability is conditional within the 8–10 must-topics, not hidden in optional questions. [Stage 8](QUESTIONNAIRE_DESIGN.md) discloses individual answer burden, [Stage 9](ADAPTIVE_QUESTIONNAIRE.md) defines routing, and Stage 11 activates only refinements with a numerical or path effect. Evidence remains within Q3, distress detail within Q6, fee allocation within Q9 and security participation within Q10, without another core topic. BF packages give conditional benchmark APR, never fabricated completeness for an actual offer.

## Domain and product scope

| ID | Classification | Approved requirement |
|---|---|---|
| R16 | Requirement from the brief | Serve Indian borrowers using INR, with FOIR-style affordability reasoning, real product bands, and RBI-style all-in APR disclosure. This does not yet adopt a particular ratio or claim regulatory compliance. |
| R17 | Requirement from the brief | Consider an appropriate secured product for Ravi's productive borrowing. Do not restrict his assessment to unsecured personal lending. |
| R18 | Requirement from the brief | Run Priya, Ravi, and Anita through the system. The brief does not score breadth of products beyond what these borrowers need. |
| R19 | Proposed judgement | Limit implemented product coverage to what is necessary to assess the three supplied borrowing needs credibly. Treat home, LAP, personal, gold, two-wheeler, and business loans listed in the brief as domain examples, not a requirement to build all six. Select exact product paths later, with justification and approval. |
| R20 | Fact requiring external research | Current product eligibility practices, pricing bands, fee conventions, and relevant APR disclosure rules require verified sources before being adopted. This stage does not authorize external research. |

## Privacy, engineering, and delivery constraints

| ID | Classification | Approved requirement |
|---|---|---|
| R21 | Requirement from the brief | No login, no bureau pull, and no personal data stored. Assessment information comes from the borrower. |
| R22 | Proposed judgement | Implement the assessment entirely in the browser, with answers retained only in memory for the current session. Do not persist answers in browser storage, URLs, logs, or analytics, or transmit them to an external service. |
| R23 | Requirement from the brief | No backend is required. The app may use any stack and must run locally from README instructions in under five minutes. |
| R24 | Requirement from the brief | Keep analytical rules separate from UI code. Code should be readable and rules practical to change during the follow-up session. |
| R25 | Requirement from the brief | Make the app usable on a phone, show ranges honestly, and disclose where it is guessing. |
| R26 | Requirement from the brief | Deliver within four calendar days and an expected 12–16 hours of work; communicate if more time is needed. |
| R27 | Requirement from the brief | Supply the working app, RULES.md, three persona run-throughs, and a five-minute written or recorded walkthrough. Submit a repository link with deliverables at the root. |
| R28 | Requirement from the brief | Document every rule, threshold, band, and assumption in RULES.md using **what · value · why · source or “my judgement.”** |
| R29 | Proposed judgement | Use a written walkthrough, an option explicitly allowed by the brief, to keep delivery within the time box. It must discuss what to build next and what to cut. |

## Completion evidence and exclusions

| ID | Classification | Approved requirement |
|---|---|---|
| R30 | Proposed judgement | Demonstrate all three verdicts using explicit validation cases. Stage 12 does so with independent generic fixtures and does not force Priya, Ravi, and Anita to produce one verdict each. |
| R31 | Proposed judgement | Validate that higher debt or expenses cannot improve safe capacity; missing data cannot narrow ranges; higher fees increase APR; stress cannot improve the assessed position; and unknown credit receives no synthetic score. Stage 12 executes these properties and V11-01–V11-27. |
| R32 | Requirement from the brief | For each supplied persona, record the questions asked, all four outputs, and the Negotiation Card. |
| R33 | Proposed judgement | Keep supplied persona facts distinct from any supplementary scenario assumptions. Stage 12 validates the three provided-only persona records and uses separate generic fixtures; no missing expenses, EMIs or other persona inputs are filled. |
| R34 | Out-of-scope item | Bureau integration, actual loan applications, lender approval guarantees, a trained machine-learning model, and additional product breadth unsupported by the agreed needs. |
| R35 | Mathematical derivation | None in this stage. Requirements do not establish numerical lending rules. |
| R36 | Resolved and validated | U39 defines the must-set/incomplete-assessment boundary. Stages 10–11 specify the complete method and Stage 12 validates U17, stress/resilience, confidence and final-verdict integration. |

## Artifact and verification boundary

**Proposed judgement (approved):** Add only this document for Stage 2. Verify coverage against the brief and the user's explicit constraints, check that no formulas or thresholds have slipped in, and mark deferred decisions clearly. No application behaviour is implemented in this stage. Stop for approval of the implementation result before beginning the next stage.

# Stage 1: Problem Framing

Status: Stage 1 content and implementation accepted by the user. Cross-stage audit corrections were subsequently approved.

Current integration: all 15 stages are complete. [Stage 10 analytical rules](ANALYTICAL_RULES.md) define the baseline, [Stage 11 stress testing](STRESS_TESTING.md) defines stress-aware recommendations, [Stage 12 validation](VALIDATION_STRATEGY.md) retains the independent oracle, and Stage 15 implements the supported browser experience without changing this framing.

Specification: [Lokta Borrower Copilot challenge](Lokta_Borrower_Copilot_Build_Challenge_v2.html). The brief supplies assignment requirements; the user's collaboration instructions govern stage approvals. Existing research documents are not adopted as evidence or approved rules by this document.

## Purpose of this stage

Problem framing establishes whose decision we are helping, what decision they face, and what counts as useful help before choosing inputs, formulas, thresholds, or screens. The artifact is a statement of purpose and analytical boundaries, not an implementation of the borrowing assessment.

## Approved framing

| ID | Classification | Approved content |
|---|---|---|
| F1 | Requirement from the brief | **Primary audience:** Indian individuals assessing a borrowing decision before approaching or negotiating with a lender, including salaried, self-employed, and informal-income borrowers. |
| F2 | Proposed judgement | **Decision statement:** “Given my borrowing purpose, circumstances, and the uncertainty in what I know, should I take this loan, take a smaller loan, or avoid taking it under the assessed conditions—and what terms should guide my discussion with a lender?” |
| F3 | Requirement from the brief | **Product role:** A self-assessment based on borrower-provided information. It is not a lender credit model and does not use a bureau pull. |
| F4 | Proposed judgement | **Primary objective:** Help the borrower reach an explainable, financially manageable borrowing decision. Maximizing borrowing or securing approval is not the objective. |
| F5 | Requirement from the brief | **Decision outcomes:** Borrow, Borrow less, and Do not borrow must all be reachable and accompanied by reasons. The conditions that produce each outcome remain undecided at this stage. |
| F6 | Requirement from the brief | **Separate perspectives:** Estimate likely lender sanction separately from safe borrower capacity, and tell the borrower which amount should guide their decision. |
| F7 | Proposed judgement | **Borrower guidance:** Safe capacity should constrain the recommendation even when estimated lender sanction is higher. Estimated sanction describes possible access; it does not establish that borrowing is prudent. |
| F8 | Requirement from the brief | **Practical usefulness:** The assessment must connect the decision to fair interest-rate ranges, all-in APR, an EMI ceiling, tenure trade-offs, a stress case, and a one-screen Negotiation Card. Their definitions and mechanics will be settled in their designated stages. |
| F9 | Proposed judgement | **Meaning of “safe”:** A conditional assessment of repayment manageability using disclosed circumstances, explicit assumptions and the applicable Stage 11 stress cases—not a guarantee against hardship. The operational definition is in ANALYTICAL_RULES.md and STRESS_TESTING.md. |
| F10 | Proposed judgement | **Treatment of uncertainty:** Separate what the borrower reports, what we infer, and what remains unknown. An incomplete profile should make the assessment less certain rather than silently become a complete fictional profile. |
| F11 | Proposed judgement | **Productive borrowing:** Assess both the potential benefit and repayment burden. A stated intention to earn more does not establish that the additional earnings will occur. |
| F12 | Requirement from the brief | **Ravi's path:** Consider a secured product for Ravi's productive borrowing need. His lack of a credit score must not automatically funnel him into a personal-loan-only assessment. |
| F13 | Proposed judgement | **Collateral interpretation:** Ownership of an asset can affect the borrowing path, but does not by itself demonstrate repayment capacity or make pledging the asset advisable. |
| F14 | Proposed judgement | **Persona use:** Priya, Ravi, and Anita are validation cases, not a training dataset or a basis for tuning rules to predetermined answers. This also preserves the user's explicit instruction. |
| F15 | Proposed judgement | **Meaning of an actionable result:** The borrower should understand the recommendation, its main reason, the terms to discuss, and the uncertainty that could change the conclusion. This approves an outcome standard, not exact wording or UI. |

“Proposed judgement” identifies the origin of a decision, not its approval status: the judgements recorded here have been approved by the user for Stage 1.

## Persona framing without predetermined answers

| Persona | Classification | Decision the assessment should help resolve |
|---|---|---|
| Priya | Proposed judgement | Whether the requested wedding loan is manageable alongside her existing commitments, and what amount and terms are defensible. Her salary and score should not predetermine a “Borrow” verdict. |
| Ravi | Proposed judgement | Whether business expansion can support repayment, and whether an appropriate secured/productive path is worth considering despite uncertain lender recognition of his income and absent credit history. |
| Anita | Proposed judgement | Whether financing a scooter is manageable given existing debt and repayment difficulty, without assuming that doubling delivery runs will double net income. The verdict remains open. |

## Boundaries and unresolved claims

| ID | Classification | Approved treatment |
|---|---|---|
| B1 | Out-of-scope item | Actual loan approval, guaranteed sanction amounts, guaranteed rates, and verified borrower creditworthiness. |
| B2 | Out-of-scope item | Training a predictive credit or default model. The brief does not require one, and the supplied personas cannot justify one. |
| B3 | Out-of-scope item | Optimizing the product to increase loan uptake or lender revenue. |
| B4 | Fact requiring external research | Applicable Indian lending practices, product pricing, lender treatment of income/collateral, and APR disclosure conventions. These remain unverified for this stage; this stage does not authorize research or adopt specific claims. |
| B5 | Mathematical derivation | None proposed in Stage 1. No formula, numerical threshold, rate band, or confidence calculation is needed to approve the problem framing. |
| B6 | Open question | **Resolved by user approval:** “Do not borrow” means “do not take the assessed loan under current conditions,” leaving reassessment possible if circumstances change. It is not a permanent judgement about the borrower. |

## Stage completion boundary

**Proposed judgement (approved):** This document is the only Stage 1 implementation artifact. It introduces no app code or analytical rules. Verification checks coverage of every approved item, separation of lender sanction from safe capacity, undecided persona outcomes, and absence of unapproved formulas or thresholds. The implementation result must be reviewed before beginning another stage.

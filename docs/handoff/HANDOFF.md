# Lokta Borrower Copilot — Detailed Project Handoff

## Purpose of this handoff

This file is the continuation record for the completed Lokta Borrower Copilot project. It captures the original 15-stage plan, the approved rules, the final implementation, verification evidence, residual limits, and the safe boundary for any later change.

## Continuation update — Stage 15 completed

Stage 15 was completed on 7 September 2026. The dependency-free app is `index.html`, `styles.css`, `app.mjs`, and `rules.mjs`; it has no backend, login, storage, analytics, upload, or application network call. It now presents at most three related topics per panel, rebuilds the route from current answers, excludes inactive answers, and uses a restrained Lokta-inspired purple/ink visual system.

The pure rule engine now covers the remaining approved observed-low-income, commitment, reserve, productive-income, actual-offer, fee-completeness, flat-rate, and floating-rate stress paths. The four primary outputs and Negotiation Card share the same `assess()` result. `rules.test.mjs` checks the integrated JavaScript engine; `validation_checks.py` retains the independent Stage 12 oracle and adds Stage 15 UI/privacy invariants. [PERSONA_RUNTHROUGHS.md](../validation/PERSONA_RUNTHROUGHS.md) records the three provided-only runs, and [WALKTHROUGH.md](WALKTHROUGH.md) is the final written tour.

The project is a borrower-side self-assessment for Indian borrowers. It must help a person decide whether to:

- Borrow
- Borrow less
- Do not borrow under the assessed conditions

It must also estimate, with clear limitations:

- likely lender sanction;
- safe borrower capacity;
- a fair interest-rate reference band;
- all-in APR;
- a new-loan EMI/outflow ceiling;
- tenure trade-offs;
- at least one stress case; and
- a one-screen Negotiation Card.

The work is intentionally explainable, adaptive, privacy-preserving, and honest about missing information. It is not a lender underwriting system, a credit-risk model, a loan application, a lender directory, a debt-settlement service, or a guarantee of approval, affordability, safety, rate, or repayment success.

## Workspace and current artifacts

Project folder:

`/Users/activelymac/Documents/GitHub/lokta_assignment`

Current Markdown artifacts:

- [PROBLEM_FRAMING.md](../product/PROBLEM_FRAMING.md)
- [REQUIREMENTS.md](../product/REQUIREMENTS.md)
- [OUTPUT_DEFINITIONS.md](../product/OUTPUT_DEFINITIONS.md)
- [OUTPUT_INPUT_MAP.md](../product/OUTPUT_INPUT_MAP.md)
- [DATA_DICTIONARY.md](../product/DATA_DICTIONARY.md)
- [UNCERTAINTY_POLICY.md](../product/UNCERTAINTY_POLICY.md)
- [RULES.md](../product/RULES.md)
- [QUESTIONNAIRE_DESIGN.md](../product/QUESTIONNAIRE_DESIGN.md)
- [ADAPTIVE_QUESTIONNAIRE.md](../product/ADAPTIVE_QUESTIONNAIRE.md)
- [ANALYTICAL_RULES.md](../product/ANALYTICAL_RULES.md)
- [STRESS_TESTING.md](../product/STRESS_TESTING.md)
- [VALIDATION_STRATEGY.md](../validation/VALIDATION_STRATEGY.md)
- [validation_checks.py](../../tests/python/validation_checks.py)
- [ASTRA_RESEARCH_PROMPT.md](../research/ASTRA_RESEARCH_PROMPT.md)
- [BORROWER_COPILOT_RESEARCH_REPORT.md](../research/BORROWER_COPILOT_RESEARCH_REPORT.md)
- [STAGE_15_IMPLEMENTATION_PLAN.md](../planning/STAGE_15_IMPLEMENTATION_PLAN.md)
- [PERSONA_RUNTHROUGHS.md](../validation/PERSONA_RUNTHROUGHS.md)
- [WALKTHROUGH.md](WALKTHROUGH.md)
- [HANDOFF.md](HANDOFF.md)

The original assignment brief is [Lokta_Borrower_Copilot_Build_Challenge_v2.html](../../reference/Lokta_Borrower_Copilot_Build_Challenge_v2.html).

The project now has a completed static adaptive questionnaire, pure browser calculation engine, final persona artifact, written walkthrough, and independent validation oracle. It intentionally has no backend or persistence layer.

## Original 15-stage plan

The user explicitly confirmed that this is the original and authoritative roadmap. Do not replace it with an inferred grouping or introduce a different stage count.

| Stage | Name | Status at handoff |
|---:|---|---|
| 1 | Problem framing | Completed and accepted |
| 2 | Requirements and constraints | Completed and accepted |
| 3 | Output definitions | Completed and accepted; Stages 10–11 amendments documented |
| 4 | Output-to-input dependency mapping | Completed and accepted; Stages 10–11 dependencies documented |
| 5 | Data dictionary | Completed and accepted; Stages 10–11 fields and boundaries documented |
| 6 | Missing-data and uncertainty policy | Completed and accepted; Stages 10–11 consequences documented |
| 7 | Assumptions and source register | Completed and accepted; Stages 10–11 rules registered |
| 8 | Questionnaire design | Completed and accepted; Stages 10–11 dependencies documented |
| 9 | Adaptive questionnaire branching | Completed and accepted; Stages 10–11 triggers integrated |
| 10 | Analytical rules and calculations | Completed and approved at specification level |
| 11 | Stress testing and scenario design | **Completed and approved at specification level** |
| 12 | Validation strategy | **Completed, implemented and executed** |
| 13 | Product and UX requirements | **Completed and approved** |
| 14 | Implementation planning | **Completed and approved** |
| 15 | Final integration and documentation | **Completed, implemented and verified** |

Thus, **all 15 stages are complete**. Any later work is a separately scoped enhancement or empirical validation cycle, not an unfinished roadmap stage.

## How the documents relate

The documents form a dependency chain. A later document may add approved operational detail, but it must not erase the principles established earlier.

1. `PROBLEM_FRAMING.md` defines whose decision the product supports and what it is not.
2. `REQUIREMENTS.md` defines assignment obligations and project constraints.
3. `OUTPUT_DEFINITIONS.md` defines what each result means before choosing formulas.
4. `OUTPUT_INPUT_MAP.md` maps each output to required borrower information, rules, and derived values.
5. `DATA_DICTIONARY.md` defines each input's meaning, unit, period, origin, and boundaries.
6. `UNCERTAINTY_POLICY.md` defines how unknown, missing, contradictory, or unsupported information affects each output.
7. `RULES.md` records governance, source evidence, approved policies, pending decisions, and adopted Stage 10 rules.
8. `QUESTIONNAIRE_DESIGN.md` turns the information dependencies into question topics and answer handling.
9. `ADAPTIVE_QUESTIONNAIRE.md` specifies when those topics appear and how edits change applicability.
10. `ANALYTICAL_RULES.md` consolidates the approved Stage 10 formulas, assumptions, conditions, ranges, fee packages, product constraints, amount selection, rounding and numerical fixtures.
11. `STRESS_TESTING.md` adds adverse scenarios, resilience, distress precedence, confidence conditions, adaptive triggers and Stage 12 fixtures to the Stage 10 baseline.
12. `VALIDATION_STRATEGY.md` and `validation_checks.py` define and execute the deterministic validation oracle without choosing the application architecture.

The research files are supporting context only:

- `BORROWER_COPILOT_RESEARCH_REPORT.md` is a research and product-direction report. It is not itself the operational rulebook.
- `ASTRA_RESEARCH_PROMPT.md` is the research prompt. It is not evidence.
- `RULES.md` is the source register and rulebook. A source observation does not automatically become an app rule; adoption requires an explicit, labelled judgement and approval.

## Non-negotiable product principles

These principles were approved through Stage 12 and remain binding during Stage 13 and later implementation.

### Borrower lens and lender lens stay separate

The app must show two different quantities:

- **Likely lender sanction:** an illustrative, conditional estimate of what a lender might approve for the stated product, given supported income, applicant obligations, product constraints, documentation assumptions, age, credit context and security conditions.
- **Safe borrower capacity:** an illustrative estimate of what the borrower can manage under the assessed household budget and approved safety assumptions.

The lender may allow more than the borrower should take. A larger lender estimate does not increase household cash flow. A collateral asset does not create repayment income. A lender estimate is not an approval probability or commitment.

The recommendation must be governed by the conservative borrower-side boundary, not by the lender maximum. If access and affordability disagree, explain the disagreement rather than merging the numbers.

### Unknown is never zero

The project distinguishes:

- provided;
- unknown;
- not asked; and
- not applicable.

A provided zero is a real answer. Unknown income, spending, debt, fees, credit, collateral, contribution, reserves or future earnings must not be changed into zero. If a material dependency cannot be bounded by an approved method, the affected output is conditional, incomplete, or not estimable.

Missing evidence must not be disguised as a negative financial finding. Missing core affordability information normally prevents the safe ceiling and recommended amount, and can make the overall assessment incomplete; it does not automatically mean “Do not borrow.”

### Current income is not hoped-for income

Borrower affordability uses current net earnings and confirmed contributions available to the assessed household budget. It does not automatically add:

- expected business growth;
- extra delivery runs;
- loan proceeds;
- asset sale proceeds;
- emergency savings; or
- another household member's full salary.

Productive income is a separate, conditional scenario. Stage 11 requires delayed-upside and no-upside cases and never allows hoped-for additional income to increase base or stress-aware safe capacity. Ravi's and Anita's hoped-for additional income must not enter the current-income calculation.

### Ranges remain ranges

Borrower-reported ranges are not silently averaged or converted to midpoints. For compatible ranges, the conservative endpoint uses lower income, higher spending and higher existing debt. The favourable endpoint uses the reverse. Keep relationships between inputs; do not combine incompatible endpoints from different circumstances.

An upper capacity endpoint communicates uncertainty. It is not permission to agree to that EMI or borrow that amount.

### Product and scenario integrity

Every result is tied to:

- purpose;
- requested principal;
- product path;
- tenure;
- rate basis;
- fee assumptions;
- funding assumptions; and
- known limitations.

Changing product, amount, tenure, security or fee timing creates a separately identified scenario. Do not take the sanction result from one product and combine it with the rate or EMI from another.

### Privacy

The assignment requires no login, no bureau pull and no personal data stored. The eventual app must keep answers in browser memory for the current session only. Do not put answers in local storage, URLs, logs, analytics, a backend, or an external service. Do not add identity fields, phone/PAN collection, uploads, account creation, lender applications or data integrations without an explicit later decision that changes the scope.

## Assignment constraints that remain binding

The final project must satisfy the original challenge:

- Indian borrowers and INR.
- Borrower-side self-assessment, not lender underwriting.
- No login, bureau pull, or personal-data storage.
- Local startup from README in under five minutes.
- Phone-usable responsive flow.
- Approximately 8–10 must-question topics, adaptive by circumstance.
- Optional questions only where they can change a number, range, product path, or applicable numerical method.
- Unknown answers remain unknown.
- Ranges remain visible as ranges.
- Every important number has a borrower-readable explanation.
- Rules remain separate from UI code.
- All three supplied personas must be run through the final system.
- Final deliverables at the repository root: working app, `RULES.md`, three run-throughs and a five-minute written or recorded walkthrough.
- All three verdict classes must be reachable using validation cases. Priya, Ravi and Anita are not required to produce one different verdict each.
- Directional behaviour must be validated: higher expenses/debt cannot improve safe capacity; missing data cannot narrow a range; higher fees increase APR; stress cannot improve the assessed position; unknown credit information receives no synthetic score.

## Supplied personas and what must remain unknown

The personas are validation fixtures, not training data and not predetermined verdicts.

### Priya

Known from the assignment:

- age 29;
- Bengaluru;
- salaried software engineer at a large MNC;
- five years in the job/business context stated by the brief;
- ₹1,10,000 net income per month;
- car EMI ₹14,000, with two years left;
- reported credit score 780;
- rent ₹28,000;
- requests ₹8,00,000 personal loan for a wedding.

Still unknown unless the user supplies it:

- total household spending beyond rent;
- dependants and transfers;
- other debts, cards, BNPL or guarantees;
- liquid funds and wedding contribution;
- upcoming commitments;
- score provider/date and accuracy;
- variable pay or job-income risk;
- preferred tenure;
- actual offer, fees, KFS and charge timing;
- protected remainder the borrower wants to retain.

Do not assume her score guarantees a rate discount or her salary makes the request affordable.

### Ravi

Known from the assignment:

- age 42;
- Mysuru;
- kirana store operated for 14 years;
- reported cash income ₹40,000–₹80,000 per month;
- ITR income ₹4,20,000 per year;
- owns a shop premises he estimates at ₹45,00,000;
- property reported unencumbered;
- no formal loan history and no credit score;
- wife earns ₹18,000 teaching;
- requests ₹15,00,000 for a second stock line and delivery vehicle.

Still unknown:

- whether cash income is sales, gross margin, business profit or household take-home;
- monthly business withdrawals, purchases, margins and working-capital cycle;
- household spending and debt payments;
- seasonality and low-month earnings;
- ITR income definition and period;
- records that support current net earnings;
- supplier credit and other obligations;
- split between stock and vehicle;
- purpose cost and contribution;
- incremental net earnings and timing;
- property title, co-ownership, independent valuation and willingness to pledge;
- spouse's contribution availability, participation and possible co-applicant income.

Keep his cash range separate from annual ITR income. Do not add his wife's salary automatically. His shop can route to a secured/productive path, but collateral does not establish repayment capacity.

### Anita

Known from the assignment:

- age 35;
- Hubballi;
- delivery-platform rider plus home tailoring;
- ₹26,000–₹30,000 per month reported income;
- two children;
- husband unemployed for eight months;
- three app loans;
- ₹35,000 outstanding at “30%+”;
- one EMI bounced last month;
- requests ₹1,50,000 for an electric scooter to double delivery runs.

Still unknown:

- whether income is net after delivery/tailoring costs;
- household essentials and housing;
- each loan's lender, KFS, EMI, APR, due dates, arrears, fees and term;
- whether “30%+” is a nominal rate or APR;
- collection pressure and borrowing-to-pay behaviour;
- liquid funds/support;
- current rental, fuel, maintenance and downtime costs;
- scooter on-road price, financing, insurance, battery and operating costs;
- measured incremental net income;
- income and repayment trend.

The supplied facts should trigger a debt-stabilization and obligation-mapping path in later stages. Do not interpret ₹35,000 outstanding as a monthly EMI. Do not assume extra delivery runs double net income. Do not give a final persona verdict during calibration.

## Stage 1–9 decisions already accepted

### Stage 1 — Problem framing

The decision statement is effectively:

> Given my borrowing purpose, circumstances and uncertainty in what I know, should I take this loan, take a smaller loan, or avoid taking it under the assessed conditions, and what terms should guide my discussion with a lender?

The app is a borrower self-assessment, not a lender model. Safe affordability and lender sanction are separate. “Do not borrow” applies to the assessed loan under current conditions, not permanently to the person. Ravi must have a suitable secured/productive path considered. Future business income is not guaranteed. The three personas are validation cases.

### Stage 2 — Requirements and constraints

The project uses a small, adaptive, local-only flow. It must show all four required outputs and the Negotiation Card, preserve unknowns, explain numbers, keep rules separate from UI, and fit the four-day / 12–16-hour assignment time box. Product breadth is limited to what is needed for the three personas.

### Stage 3 — Output definitions

The outputs are:

1. Borrowing verdict.
2. Borrowing amounts.
3. Fair interest and all-in cost.
4. Monthly ceiling, tenure comparison and stress result.

The requested scenario and recommended alternative must be named separately. Every numerical output needs units, scenario, reason, assumptions and material unknowns. The three verdict labels are not output-state labels: `Estimated`, `Conditional estimate` and `Not estimable` remain separate.

The Negotiation Card reuses the assessment; it must not compute a second result. It includes the verdict, requested/recommended amount, product/tenure, lender and safe ranges, rate band, APR/fee basis, ceiling, estimated payment, tenure comparison, stress result, conditions and unknowns.

### Stage 4 — Dependency mapping

The mapping keeps borrower information, reference rules and derived results separate. Lender-recognized income and household resources can originate from the same answer but are not the same measure. Conditional information must have a documented output effect. Missing dependencies remain visible.

### Stage 5 — Data dictionary

Important boundaries include:

- INR with explicit monthly, annual and one-time periods.
- Single values and ranges remain distinct.
- Current net income is after work/business costs and applicable deductions, before household spending and debt recorded separately.
- Annual documented income stays annual.
- Outstanding principal is not monthly debt payment.
- Current card purchases are not counted again when their bill is paid.
- Property value is not emergency cash.
- Productive incremental income is separate from current income.
- Household contribution is money actually available to the assessed budget, net of commitments paid outside it.
- Co-applicant income and debt are separate from borrower affordability.

Stage 10 added:

- `supported_net_income_monthly`;
- `applicant_debt_payments_monthly`;
- clarified recurring-cost cycles and debt calendars;
- clarified fee timing, purpose proceeds and APR benefit;
- clarified vehicle on-road price and security participation.

### Stage 6 — Missing-data and uncertainty policy

Output states:

- **Estimated:** required dependencies are available for the approved method.
- **Conditional estimate:** a result can be bounded with explicit approved assumptions or scenarios.
- **Not estimable:** a material dependency cannot be responsibly bounded.

These states apply per output. Core missing income, expenses or debt payments can withhold the safe ceiling, safe capacity and recommended amount. Missing fees can withhold actual all-in APR. Missing credit widens uncertainty rather than creating a synthetic score. Missing partner information does not mean zero contribution. Missing future earnings does not mean guaranteed income.

Must-only estimates remain Low confidence. The project uses Low confidence and Moderate confidence only; no confidence percentages and no “High confidence.” ST77–ST84 define the method-specific Moderate conditions. Benchmark pricing, fair-rate bands and illustrative lender sanction remain Low.

### Stage 7 — Rules and sources

`RULES.md` distinguishes:

- assignment requirements;
- design judgements;
- mathematical derivations;
- checked source observations;
- adopted policies;
- unresolved candidates; and
- scope limitations.

Published lender terms do not automatically become borrower-safe rules. Source dates and scope matter. Conflicting lender pages are preserved rather than averaged. No source establishes a universal Indian safe-EMI ratio, approval probability, occupation haircut or personalized rate discount.

### Stage 8 — Questionnaire design

The approved structure is eight core topics plus zero, one or two conditional topics, with individual answer burden disclosed separately.

Core topics:

1. Purpose.
2. Requested principal.
3. Current income and income type.
4. Household contributions.
5. Household spending.
6. Existing debt outflow.
7. Age.
8. Credit context.

Conditional topics:

9. Funding and purpose viability.
10. Secured borrowing.

Every topic allows “I don't know” where appropriate. Q1 clarifies relevant vehicle/electric/mixed-purpose details. Q3 clarifies net income, debt deductions and now the minimum evidence dependency. Q6 clarifies applicant/co-borrower obligations. Q9 covers funding and smaller-purpose viability. Q10 distinguishes willingness, ownership, encumbrance and participation.

### Stage 9 — Adaptive branching

Approved flow:

1. Ask Q1–Q8 and relevant clarifications.
2. Identify candidate products.
3. Ask Q10 if a secured candidate requires it.
4. Ask the funding portion of Q9 when required.
5. Assess baseline.
6. Ask smaller-purpose viability if Borrow less is being considered.
7. Show outputs and limitations.
8. Offer applicable optional refinements and reassess.

Unknown answers do not silently become “no.” Changing an answer reevaluates branches, invalidates affected results, and asks for confirmation before reusing a previously inactive answer. Unsupported purposes and repayment structures are not silently mapped to supported scenarios.

## Stage 10 approval record

The Stage 10 handoff and subsequent user approvals established the following sequence:

1. Calculation design approved in the handoff.
2. Borrower-side EMI ceiling C1–C8 approved in the handoff.
3. Lender-side modelling L1–L8 approved in the handoff.
4. Interest-rate and tenure block RT1–RT10 approved in the handoff.
5. Income-recognition IR1–IR8 approved in the handoff.
6. Fees and funding FF1–FF8 explicitly approved by the user.
7. Product, collateral and eligibility PC1–PC8 explicitly approved by the user.
8. Irregular spending and debt ID1–ID8 explicitly approved by the user.
9. Amount selection and baseline verdict AV1–AV9 explicitly approved by the user.
10. Conditional benchmark fee packages BF1–BF6 explicitly approved by the user.
11. Numerical conventions and checks NC1–NC8, including the AV8/NC6 rounding correction, explicitly approved by the user.

The complete consolidated specification is [ANALYTICAL_RULES.md](../product/ANALYTICAL_RULES.md). It is the authoritative Stage 10 method document for the next chat.

## Stage 10 calculation design

### Supported new-loan structures

The initial model supports:

- one disbursement;
- monthly repayments;
- reducing-balance monthly repayment;
- explicitly identified annual flat-rate quotes; and
- floating-rate baseline calculations using the current stated rate.

Offer-specific calculations exclude:

- revolving credit;
- multiple disbursements;
- moratoriums;
- irregular instalments;
- balloon repayments; and
- any other unsupported repayment structure unless a later stage explicitly expands the scope.

An unsupported structure may be recorded and explained. It must not be silently processed as an ordinary amortising loan.

### Reducing-balance EMI

For contractual principal (P), monthly rate (r), number of instalments (n), and monthly principal-and-interest payment (M):

\[
M=P\frac{r}{1-(1+r)^{-n}}
\]

For nominal annual rate (a):

\[
r=\frac{a}{12}
\]

At zero interest:

\[
M=\frac{P}{n}
\]

The APR must not be used as the interest input to this formula.

### Explicit flat-rate quote

For an explicitly identified annual flat rate (a):

\[
Interest=P\times a\times\frac{n}{12}
\]

\[
M=\frac{P+Interest}{n}
\]

Flat and reducing-balance rates must not be compared without showing the basis.

### Recurring outflow

Contractual principal-and-interest repayment and mandatory recurring charges remain separate:

\[
Monthly\ outflow_t=M+recurring\ charges_t
\]

A constant monthly charge (q) leaves:

\[
EMI\ allowance=\max(0,C_{base}-q)
\]

Varying charges must be evaluated month by month rather than hidden inside an average.

### APR convention

APR is based on cash flows. Let (N) be the positive net initial borrowing benefit and (C_t) the required repayments and included charges in month (t):

\[
N=\sum_{t=1}^{n}\frac{C_t}{(1+j)^t}
\]

The approved annualization is:

\[
APR=12j
\]

Do not silently substitute effective annual compounding ((1+j)^{12}-1). The handoff reports that the RBI illustration reproduces approximately:

- principal ₹20,000;
- 24 monthly payments;
- 15% annual nominal interest;
- ₹400 charges;
- approximately ₹969.73 payment before display rounding; and
- approximately 17.07055% annualized APR, displayed as 17.07%.

Compounding the monthly rate would produce a different figure, approximately 18.47%, and must not replace the approved convention.

### Borrower-side base monthly ceiling

Let:

- (I) = current net income plus confirmed contributions available to the assessed budget;
- (E) = household spending paid from that budget; and
- (D) = required existing debt payments paid from that budget.

For positive (I):

\[
Debt\text{-}limit\ allowance=0.35I-D
\]

\[
Budget\ allowance=I-E-D-0.10I=0.90I-E-D
\]

\[
C_{base}=\max(0,\min(0.35I-D,\ 0.90I-E-D))
\]

The base ceiling is the new-loan total recurring outflow ceiling, including applicable recurring charges. It is not a ceiling for all household debt combined.

The 35% total debt limit and 10% retained headroom are transparent prototype judgements. They are not RBI rules, lender rules, universal FOIR standards, or validated safety guarantees.

If (I\leq0), current-income new-loan capacity is zero under this base method. If usable (I), (E), or (D) is unavailable, do not replace it with zero.

Synthetic approved fixtures:

| Income | Expenses | Existing debt | Debt-limit allowance | Budget allowance | Base ceiling |
|---:|---:|---:|---:|---:|---:|
| ₹50,000 | ₹25,000 | ₹5,000 | ₹12,500 | ₹15,000 | ₹12,500 |
| ₹50,000 | ₹32,000 | ₹5,000 | ₹12,500 | ₹8,000 | ₹8,000 |
| ₹50,000 | ₹25,000 | ₹9,000 | ₹8,500 | ₹11,000 | ₹8,500 |

### Lender-side modelling

Use three explicitly labelled illustrative scenarios:

1. Salaried personal loan.
2. Property-backed productive/business loan.
3. Electric two-wheeler loan.

Each scenario must have internally consistent income assumptions, debt basis, rate, fee package, tenure and security conditions. Do not assemble the most favourable terms from unrelated products.

Supported lender income (J) is separate from household resources (I). The lender-side new-loan repayment allowance is:

\[
Lender\ allowance=\max(0,\beta J-D_L)
\]

where (D_L) is applicant-relevant debt and β is the scenario ratio:

- personal: 40–45%;
- property-backed productive/business: 40–50%;
- electric two-wheeler: 50%.

These are illustrative lender-side modelling choices, not universal lender rules. The property range is explicitly provisional and least evidence-supported. They must not replace the borrower-side 35% rule.

### Income recognition IR1–IR8

The app must ask in Q3:

> What records could you show a lender to support these earnings?

Possible categories:

- payslips;
- Form 16;
- ITR;
- bank statements;
- business records;
- other;
- none; and
- unsure.

Then ask:

> Do those records support the monthly net-income amount you entered?

Handling:

- Yes: reuse the entered amount or range as candidate (J).
- Only part: ask for the supported net amount or range.
- Different period or income definition: clarify before using it.
- No records or unsure: leave (J) unresolved.

`J` is a candidate supported income basis, not verified lender-recognized income. It may cover only part of actual income. Do not apply an automatic haircut merely because income is cash, informal or self-employed. Do not assume Priya's records support her stated salary. Keep Ravi's cash range and annual ITR amount separate. Do not assume Anita has no records.

Add the dictionary field:

`supported_net_income_monthly`

Annual documented income remains annual. Divide it by 12 only when the income definition is compatible, the period is clear, and the borrower confirms that it remains representative of current earnings. Do not silently average incompatible figures or choose the smaller number.

If (J) cannot be resolved, lender sanction is **not estimable**, not zero. Household affordability can still be estimable.

### Fees and funding FF1–FF8

Every charge is recorded once with:

- name;
- amount or percentage;
- calculation basis;
- tax treatment;
- timing;
- payment method; and
- whether it is mandatory, contingent or unknown.

Categories remain distinct:

- deducted at disbursement;
- paid separately upfront;
- financed into principal;
- mandatory recurring; and
- contingent.

For mutually exclusive financed charges (F_f), deducted charges (F_d), separately paid upfront charges (F_u), contractual principal (P), purpose proceeds (B), and APR benefit (N):

\[
B=P-F_f-F_d
\]

\[
N=B-F_u
\]

These equations assume the charge timing is known and occurs at disbursement. A direct seller payment on the borrower's behalf can count as purpose funding even if it does not reach the borrower's bank account.

For purpose cost (K), own contribution (O), and upfront fees (U) paid from that same pool:

\[
Own\ funds\ remaining=\max(0,O-U)
\]

\[
Funding\ gap=\max(0,K-B-\max(0,O-U))
\]

Also check whether (O<U), because the borrower may not be able to pay the upfront fee itself.

Do not silently increase requested principal to cover a fee-created gap. A larger principal is a separate scenario and remains subject to requested amount, safe capacity and product limits.

Approved processing references before tax:

| Scenario | Processing reference |
|---|---:|
| Salaried personal | ₹0–₹6,500 |
| Property-backed business | 0–3% of contractual principal |
| Electric two-wheeler | 3% of contractual principal |

The personal reference is informed by HDFC, the property reference by Tata's secured-business material, and the vehicle reference by SBI. The ranges are illustrative modelling choices. Zero is a hypothetical endpoint, not a guaranteed waiver.

For ordinary taxable processing services, the approved prototype tax treatment is 18% GST. Do not apply it automatically to every statutory fee, insurance premium, reimbursement or other charge. Do not reapply it when a fee is already tax-inclusive. Ordinary loan interest remains separately treated.

Unknown actual fees have no universal invented upper bound. Complete actual charge information permits offer-specific APR. Explicit defensible bounds permit a conditional APR range. Material unknown actual charges without defensible bounds make actual all-in APR not estimable. A no-offer benchmark package is not an actual offer.

### Product, collateral and eligibility PC1–PC8

Illustrative scenario ranges:

| Scenario | Purpose | Principal model range | Tenure pair |
|---|---|---:|---:|
| Personal | Wedding/other personal expense | ₹50,000–₹25 lakh | 36 / 60 months |
| Property-backed business | Existing business, inventory, related productive use | ₹3–₹25 lakh | 36 / 60 months |
| Electric two-wheeler | New RTO-registered electric two-wheeler | ₹50,000–₹3 lakh | 24 / 36 months |

Personal amount limits are prototype judgements. Tata and SBI product evidence informs the other scenario ranges; the app must not present them as named-lender eligibility.

For electric two-wheeler modelling:

\[
P_{vehicle,max}=\min(P_{repayment},6J,0.85K_{vehicle},₹3,00,000)
\]

where (K_{vehicle}) is the on-road vehicle price, not a mixed stock-and-vehicle total. The 85% cap implies at least 15% separate funding before fees and other constraints. Do not assume the salary-package processing waiver.

For the illustrative property-backed path:

\[
P_{collateral,max}=0.50V
\]

where (V) is the borrower-reported property value/range. The 50% cap is an explicit prototype judgement, not a verified Tata LTV rule or a universal property valuation rule. Unknown property value, encumbrance, ownership or required participation leaves the secured constraint unresolved. A known existing charge makes the initial secured model unsupported; do not simply subtract an outstanding charge from value and continue.

The illustrative property path requires reported applicant ownership, reported unencumbered status and relevant owners willing to participate. It does not impose a blanket spouse requirement. If a named Tata product is shown, preserve its separately published spouse/co-applicant conditions.

Illustrative age boundaries:

| Scenario | Entry age | Maximum age at final repayment |
|---|---:|---:|
| Personal | 21 | 60 |
| Property-backed business | 21 | 65 |
| Electric two-wheeler | 18 | 65 |

These are prototype assessment boundaries informed partly by published lender contexts. They are not universal rules. Unknown birthday details that affect tenure feasibility remain conditional.

### Irregular spending and debt ID1–ID8

Predictable recurring non-monthly costs can be provisioned:

\[
Monthly\ provision=\frac{cost\ per\ cycle}{months\ per\ cycle}
\]

Add the provision only if it is not already included in Q5. It does not prove that cash has accumulated for an imminent bill. ST39–ST48 handle upcoming exceptional expenses and earmarked funds over the approved 12-month horizon.

For usable non-monthly debt schedules, sum required payments by calendar month, then use the combined peak:

\[
D=\max_t\left(\sum required\ household\ debt\ payments\ in\ month\ t\right)
\]

\[
D_L=\max_t\left(\sum required\ applicant\ debt\ payments\ in\ month\ t\right)
\]

Do not sum individual debt peaks that occur in different months. If only a current monthly payment is known, assume it continues throughout the assessed tenure and disclose that assumption. Do not invent an end date.

Household debt (D) and applicant debt (D_L) are calculated separately. The same obligation can appear once in each because the lenses answer different questions. It must not appear twice within either calculation.

Arrears remain separate. Include agreed catch-up payments once. Do not spread an unresolved arrear over an invented term. A bounced payment alone does not establish continuing arrears. A mathematical base ceiling can remain visible with unresolved arrears, but it is not permission for new debt; ST57–ST65 determine the safety consequence and preserve U17 precedence.

The new dictionary field is:

`applicant_debt_payments_monthly`

It is required monthly outflow on obligations where the applicant is borrower or co-borrower, including payments someone else makes. It may differ from the household budget debt amount.

### Amount selection and baseline verdict AV1–AV9

Keep three amounts separate:

1. borrower capacity;
2. illustrative lender capacity; and
3. recommended principal.

When both conservative capacity ranges are estimable:

\[
P_{candidate}=\min(R,S_{low},L_{low})
\]

where (R) is requested principal, (S_{low}) is conservative borrower capacity and (L_{low}) is conservative illustrative lender capacity.

If lender capacity is not estimable:

\[
P_{borrower-only}=\min(R,S_{low})
\]

This is conditional on lender access, not assured funding.

Before recommending a candidate, check product minimum/maximum, security, participation, down payment, net proceeds, fees, own funds and funding gap. If purpose cost and contribution are known, choose the smallest contractual principal that fully funds the agreed purpose within the candidate boundary. Do not recommend surplus debt.

Borrow less requires:

- an amount strictly below the request;
- a confirmed acceptable smaller purpose or a confirmed lower-debt way to fund the original purpose;
- established minimum viable cost and contribution/funding arrangement;
- conservative affordability; and
- product/fee/security feasibility.

A requested amount range is not converted to a midpoint. If only part fits, identify that portion and the dependency. If none fits but a viable smaller plan is confirmed, Borrow less may be supported. If smaller viability is unknown, do not issue Borrow less solely because the request is too high.

Baseline verdict order:

| Condition | Baseline result |
|---|---|
| Critical affordability information unresolved | Incomplete assessment |
| Request fits conservative capacity, funding and constraints | Borrow — baseline supported |
| Request fails but confirmed viable smaller arrangement fits | Borrow less — baseline supported |
| Known constraints rule out request and no acceptable smaller arrangement exists | Do not borrow under assessed conditions |
| Material scenario disagreement prevents a defensible choice | Conditional/incomplete verdict |

These are baseline results only. ST66–ST76 apply `S_stress_low`, applicable stress cases and distress precedence before the final result.

### Conditional benchmark packages BF1–BF6

No-offer benchmark packages use the following additional upfront borrowing-cost budgets, inclusive of their taxes:

| Scenario | Other upfront borrowing charges, tax-inclusive |
|---|---:|
| Salaried personal | ₹0–₹3,000 |
| Property-backed business | ₹10,000–₹25,000 |
| Electric two-wheeler | ₹0–₹3,000 |

These budgets are approved prototype judgements, not market distributions, statutory limits, lender promises or universal bounds for unknown fees. The larger property budget reflects legal/valuation/documentation/registration uncertainty. It must not be added to the same itemised fee twice.

Benchmark conditions:

- all modelled upfront charges deducted at disbursement;
- no additional financed fees;
- no mandatory recurring charges;
- first repayment one month after disbursement;
- no contingent event such as late payment or foreclosure;
- conservative funding uses the larger applicable fee assumptions; and
- benchmark APR is conditional and Low confidence.

Actual offer timing and charges override benchmark assumptions in a separate offer scenario. Unknown actual charges remain unknown.

### Numerical conventions NC1–NC8

Inverse capacity for reducing balance, (r>0):

\[
P=M\frac{1-(1+r)^{-n}}{r}
\]

At zero interest:

\[
P=Mn
\]

For flat rate:

\[
P=\frac{Mn}{1+a(n/12)}
\]

Rounding:

- maximum candidate: floor;
- minimum funding requirement: ceiling;
- recommended principal: whole rupees after both checks;
- monthly ceiling: whole rupees rounded down;
- payments and itemised charges: two decimals where useful;
- rates and APR: two decimals;
- internal calculations: retain precision until display.

The approved AV8 correction is important: a minimum funding requirement must not be rounded down. If minimum need is ₹1,00,000.25 and capacity is ₹1,00,001, choose ₹1,00,001 if every other check passes; ₹1,00,000 would leave a gap.

For an actual offer, reconcile principal, net disbursal, charges, payment schedule and stated rate basis. Do not overwrite a quoted EMI with a calculated EMI and pretend the offer is consistent. A complete supported quoted cash-flow schedule can establish APR even if the advertised rate basis is unclear, but this does not expand the supported repayment-structure scope.

## Stage 10 source and evidence references

The detailed source register is in `RULES.md`. The most relevant checked sources are:

- RBI Key Facts Statement circular: [RBI circular](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0). It supports inclusion of relevant lender and third-party charges in APR for covered loans and provides disclosure requirements.
- RBI microfinance directions and APR illustration: [RBI microfinance directions](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12256). Its official illustration supports the numerical APR fixture; it is not a universal market rate.
- RBI floating-rate reset circular: [RBI reset circular](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12529&Mode=0). It supports the relevance of rate/payment stress for covered floating-rate personal loans but does not set this app's stress severity.
- TransUnion CIBIL: [CIBIL FAQ](https://www.cibil.com/contact-us-faq). It supports distinguishing NA/NH or thin history from a bad score.
- HDFC personal-loan rates and charges: [HDFC](https://www.hdfc.bank.in/personal-loan/interest-rates-and-charges). It informs the salaried personal reference rate and ₹6,500 processing upper reference.
- HDFC personal-loan eligibility: [HDFC eligibility](https://www.hdfc.bank.in/personal-loan/eligibility-criteria). It informs the personal age context; it does not establish app eligibility.
- Tata secured business loan: [Tata product](https://www.tatacapital.com/business-loan/micro-loan-against-property.html). It informs the secured-business product range, purposes, evidence routes and named co-applicant conditions.
- Tata rates and charges: [Tata rates and charges](https://www.tatacapital.com/loan-against-property/rates-and-charges.html). It informs the secured-business processing and other-charge observations, while preserving product-scope conflicts.
- SBI two-wheeler scheme: [SBI scheme](https://sbi.bank.in/web/personal-banking/loans/auto-loans/sbi-two-wheeler-loan-scheme). It informs the illustrative vehicle 85% on-road cap, six-times-income constraint, product range, age context and documentation observations.
- SBI processing fees: [SBI processing-fee schedule](https://sbi.bank.in/web/interest-rates/interest-rates/processing-fees). It informs the 3% two-wheeler processing reference.
- CBIC GST rate schedule and FAQs: [CBIC rates](https://cbic-gst.gov.in/hindi/gst-goods-services-rates.html) and [CBIC banking FAQs](https://cbic-gst.gov.in/sectoral-faq.html). They inform the limited 18% processing-service treatment and the distinction from ordinary loan interest.

The sources were checked during the project research session on 6 September 2026. Product rates, fees, legal rules and pages are time-sensitive. Recheck them before public or transactional use. Do not present a source's starting rate or product slider as a personalized offer.

## Documentation changes made after Stage 10 approvals

The following files were updated to keep the approved later-stage rules aligned with earlier definitions:

- `ANALYTICAL_RULES.md` was created as the consolidated Stage 10 specification.
- `RULES.md` now records Stage 10 status, adopted rules, evidence supplements and the original 15-stage roadmap.
- `DATA_DICTIONARY.md` now documents `supported_net_income_monthly`, `applicant_debt_payments_monthly`, recurring-cost provisions, debt calendars, fee timing, vehicle price and purpose proceeds.
- `QUESTIONNAIRE_DESIGN.md` now places income evidence in Q3, applicant-debt clarification in Q6, fee/funding clarification in Q9 and participation/security details in Q10.
- `ADAPTIVE_QUESTIONNAIRE.md` now uses Stage 10 rules for evidence, funding, security, debt schedules and unsupported structures.
- `OUTPUT_DEFINITIONS.md` now points the recommended amount, APR and tenure definitions to the Stage 10 methods.
- `OUTPUT_INPUT_MAP.md` now maps supported lender income, applicant debt, fees, funding, recurring provisions and principal-dependent constraints to the Stage 10 methods.
- `UNCERTAINTY_POLICY.md` now applies Stage 10 methods to income evidence, actual fees and unsupported repayment structures.
- `REQUIREMENTS.md` now records Stage 10's resolution of fee handling and numerical assumptions while preserving the assignment requirements.
- `PROBLEM_FRAMING.md` now records that Stage 10 does not change the original problem framing.

The Stage 13 specification and a minimal browser prototype were subsequently added by explicit user request. The assignment HTML brief and research files were not converted into implementation code.

## Verification already performed

Documentation checks performed after integration:

- local Markdown links were checked for existing target files;
- code fences were checked for balanced delimiters;
- Markdown table rows were checked for closed row boundaries;
- every individual C/L/IR/FF/PC/ID/AV/BF/NC rule row was checked for exactly one occurrence in `ANALYTICAL_RULES.md`;
- all 15 original stage names and their order were checked;
- the earlier documents were checked for the approved Stage 10 field and dependency updates.

Independent arithmetic checks passed for:

- six base-ceiling fixtures;
- zero-interest forward/inverse relationship;
- reducing-balance forward/inverse relationship;
- RBI APR illustration;
- fee arithmetic;
- electric-vehicle 85% cap arithmetic; and
- the whole-rupee funding correction.

The independent RBI calculation produced approximately:

- EMI ₹969.73296094; and
- APR 17.07055345% using APR = 12j.

These checks are specification and arithmetic checks. They are not application tests, persona run-throughs, regulatory certification, lender validation, usability testing or evidence that the selected prototype judgements are empirically safe.

## Stage 15 verification and residual limits

Completed verification:

- `node rules.test.mjs` covers the integrated decision engine, every verdict class, adaptive routes, flat/reducing arithmetic, complete/incomplete/unsupported offers, floating-rate stress, history, commitments, reserves, productive-use separation, and stale inactive values;
- `python3 validation_checks.py` covers the original specification oracle plus Stage 15 panel, route, refinement, design-token, reduced-motion, and privacy invariants; the final run passed 547 checks with zero failures;
- live browser journeys covered the complete personal route and the full property-backed route with history, commitments, productive income, and a complete floating offer;
- browser checks covered forward/back focus, answer retention, route-length changes, conditional details, result rendering, actual APR, rate stress, the Negotiation Card, and reset; and
- a headless Chrome render at the browser's supported 500 px minimum confirmed the single-column phone layout without clipping or horizontal overflow. The CSS breakpoint applies the same layout below 560 px.

Intentional residual limits:

- the three supplied personas remain incomplete where the brief omits decision-driving facts; their provided-only outcomes are recorded without invented values;
- unsupported or irregular actual offers remain unsupported rather than receiving a fabricated APR;
- there is no universal unknown-fee bound, named-lender eligibility result, approval prediction, regulatory certification, or empirical claim that the prototype thresholds are universally safe; and
- accessibility and usability checks establish the implemented baseline, not third-party certification or research with real borrowers.

## Historical Stage 13 continuation point (superseded)

The following was the approved Stage 13 starting point before the user requested the browser prototype:

> Stages 1–12 are complete. Read HANDOFF.md, VALIDATION_STRATEGY.md, ANALYTICAL_RULES.md and STRESS_TESTING.md, preserve every approved decision, and continue with Stage 13: Product and UX requirements. Plan the complete stage for review before modifying files. Do not begin application implementation.

Stage 13 should define the product and UX requirements for:

1. the mobile-first questionnaire flow and answer-state controls;
2. progressive disclosure for core, conditional and optional questions;
3. result hierarchy across verdict, borrower capacity, lender sanction, pricing/APR, ceiling, tenure and stress;
4. incomplete, conditional, not-estimable and distress states;
5. ranges, assumptions, confidence and one-sentence number explanations;
6. the one-screen Negotiation Card and print/share boundary;
7. accessibility, responsive behavior and browser-memory privacy cues;
8. error, edit/recalculation and unsupported-scenario behavior; and
9. persona journeys without inventing missing facts or assigning final outcomes prematurely.

Continue to preserve the distinction between:

- baseline current-resource affordability;
- stressed affordability;
- likely lender access;
- purpose viability;
- security/collateral constraints; and
- final borrower recommendation.

## Approved analytical guardrails carried into product and UX

These are now approved through ST1–ST92:

- A stress case must not improve the assessed position.
- A positive base residual does not guarantee resilience.
- Stress must be applied to a clearly named baseline scenario.
- Do not apply a rate-rise shock to a fixed-rate contract unless the scenario explicitly changes the contract assumptions.
- Do not apply a floating-rate reset to a product whose rate structure is unknown without labelling it conditional.
- Do not use emergency reserves as recurring income.
- Do not assume reserves exist if they were not reported.
- Do not count future productive income as current income merely because the stress case includes it.
- Do not treat one bounced payment as proof of continuing arrears, but do not erase a disclosed unresolved arrear.
- Do not let collateral remove a repayment shortfall.
- Do not upgrade confidence merely because the borrower answered more questions.
- If scenarios disagree, disclose the dependence rather than selecting the favourable result silently.

## Current response protocol for the next chat

The next agent should:

1. Read this file first.
2. Read `ANALYTICAL_RULES.md` and `STRESS_TESTING.md` fully.
3. Read `PRODUCT_UX_REQUIREMENTS.md`, `README.md`, `rules.mjs` and `app.mjs` before changing the prototype.
4. Treat this handoff and the user's explicit approvals as the current project state.
5. Avoid reopening approved Stage 1–12 choices unless a direct contradiction is discovered.
6. Keep implementation browser-only and in-memory; do not add a backend, storage, analytics or external data collection without explicit approval.
7. Keep any new UX or calculation decision explicit and reviewable.
8. Keep research observations, mathematical derivations and product judgements distinct.
9. Preserve the supplied-only persona outcomes and never supplement them silently.
10. Preserve U17/distress precedence and every validated analytical invariant in the interface requirements.

## One-paragraph project state

All 15 stages are complete. `rules.mjs` contains the pure adaptive and financial engine; `app.mjs` owns only in-memory navigation, form reading and rendering; `index.html` and `styles.css` provide the accessible responsive interface; and the Stage 12 Python oracle remains independent. Missing core I/E/D still takes precedence over an adverse overall verdict, while active distress separately blocks positive ordinary-new-debt guidance. The final README, provided-only persona runs, written walkthrough, implementation plan, tests, and current limitations are all present at the repository root.

## Final reminders

- Do not use the lender maximum as the recommendation.
- Do not use collateral as repayment income.
- Do not count a spouse's or partner's salary automatically.
- Do not count projected business or delivery income as current income.
- Do not turn outstanding debt into an EMI.
- Do not turn an unknown score into a score.
- Do not turn unknown fees into zero.
- Do not use APR inside the normal EMI formula.
- Do not combine terms from unrelated lender products.
- Do not present a benchmark package as an actual offer.
- Do not present an illustrative scenario as named-lender approval.
- Do not issue Borrow less without a viable smaller purpose or lower-debt funding plan.
- Do not issue a final positive recommendation without applying the approved Stage 11 stress/resilience rules.
- Do not add persistent storage or external data collection.

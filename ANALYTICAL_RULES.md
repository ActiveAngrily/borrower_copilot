# Stage 10: Analytical Rules and Calculations

Status: approved specification. Stage 12 retains its independent validation oracle, and Stage 15 implements the supported calculations in `rules.mjs` with integrated checks in `rules.test.mjs`.

References: [assignment](Lokta_Borrower_Copilot_Build_Challenge_v2.html), [problem framing](PROBLEM_FRAMING.md), [requirements](REQUIREMENTS.md), [output definitions](OUTPUT_DEFINITIONS.md), [dependency map](OUTPUT_INPUT_MAP.md), [dictionary](DATA_DICTIONARY.md), [uncertainty policy](UNCERTAINTY_POLICY.md), [rule/source register](RULES.md), [questionnaire](QUESTIONNAIRE_DESIGN.md), and [branching](ADAPTIVE_QUESTIONNAIRE.md).

## Approval record and precedence

The supplied Stage 10 handoff records approval of the calculation design, C1–C8, L1–L8, RT1–RT10 and IR1–IR8. The current conversation explicitly approves FF1–FF8, PC1–PC8, ID1–ID8, AV1–AV9, BF1–BF6 and NC1–NC8. NC6 replaces AV8's original instruction to round a minimum funding requirement down. The handoff groups RT1–RT10 without retaining their individual numbering; the complete approved rate/tenure block is recorded below without inventing a historical ID-to-sentence mapping.

All numerical policies here are approved prototype judgements unless identified as mathematical derivations or published observations. Approval is not empirical validation. Sources establish published terms, not an actual borrower's eligibility or a universal safe limit. Earlier stage-specific statements about pending calculations are historical; this document supplies the later approved methods without changing their fundamental definitions.

## Calculation design

Supported initial calculations use one disbursement and monthly repayments: ordinary reducing-balance loans, explicitly identified flat-rate loans, and floating-rate baselines at the current stated rate. Exclude revolving new credit, multiple disbursements, moratoria, irregular instalments and balloon repayments from offer-specific calculations. Recording unsupported terms does not authorize mapping them to ordinary monthly loans. Varying mandatory charges can be preserved in a monthly schedule; that does not expand support to irregular principal repayment structures.

Existing irregular debts are inputs to the household/applicant budget under ID1–ID8; they are not newly supported offer structures.

For contractual principal P, monthly rate r, integer payment count n > 0, and annual nominal rate a expressed as a fraction:

```text
r = a / 12
Reducing-balance EMI M = P*r / (1 - (1+r)^(-n))
At zero interest: M = P/n
Explicit annual flat-rate interest = P*a*n/12
Flat-rate repayment M = (P + P*a*n/12)/n
Monthly total outflow in month t = M + mandatory recurring charges in month t
```

Flat and reducing rates are not directly comparable. APR is not substituted for interest in the EMI formula. For benchmark schedules, show repayment, total recurring outflow, total repayments, separately paid charges, assumptions and whether the outflow fits the ceiling. Do not count financed or deducted charges again on top of repayments that already recover them; identify their effect on net benefit separately.

APR uses net initial benefit N and the complete included monthly repayment cash flows C_t:

```text
N = sum(C_t / (1+j)^t, for t = 1..n)
APR = 12*j
```

This is nominal annualization of the monthly cash-flow rate, not (1+j)^12 - 1. The handoff reports reproducing the RBI example: ₹20,000 principal, 24 months, 15% nominal interest and ₹400 charges gives approximately 17.07055% APR (displayed 17.07%), versus approximately 18.47% effective annual compounding. See RULES.md E02. Repayment rounding conventions must remain explicit.

## C1–C8: Borrower-side base ceiling

Let I be current net income plus confirmed contributions available to the assessed budget, E be spending from that same budget and D its required existing debt outflow. Projected productive earnings and liquid reserves are not recurring income.

| ID | Approved rule | Why / origin |
|---|---|---|
| C1 | Existing debt plus new recurring outflow limited to 35% of I | My judgement: cautious prototype debt allocation, not RBI or lender policy |
| C2 | Retain 10% of I as unallocated monthly headroom | My judgement: breathing room, not accumulated emergency savings |
| C3 | Apply both the debt limit and actual budget limit; use the smaller | My judgement: a ratio cannot override essential spending |
| C4 | Current resources and confirmed contributions only | Prevent counting reserves or hoped-for earnings as current income |
| C5 | Same base percentages for salaried, self-employed and informal income | No occupation-based affordability penalty; evidence/ranges stay separate |
| C6 | Non-positive assessed I gives zero current-income new-loan capacity | No positive recurring income supports new recurring outflow under this method |
| C7 | Require usable I, E and D | Missing core values are not zero; no ceiling without them |
| C8 | Label this result the base monthly ceiling; must-only estimates remain Low confidence; apply ST77–ST84 for method-specific Moderate conditions | Preserve the unstressed result while the Stage 11 layer determines the stress-aware boundary |

For positive I:

```text
Current surplus = I - E - D
Debt-limit allowance = 0.35*I - D
Budget allowance = 0.90*I - E - D
C_base = max(0, min(0.35*I - D, 0.90*I - E - D))
```

C_base includes applicable new-loan recurring charges. Explain both constraints and identify the binding one. For compatible independent ranges, use lower I/higher E/higher D for the conservative endpoint and the reverse for the favourable endpoint; preserve linked facts. The lower endpoint guides borrowing; the upper communicates uncertainty.

## L1–L8: Lender modelling

| ID | Approved rule | Why / origin |
|---|---|---|
| L1 | Three illustrative scenarios: personal, property-backed productive/business, electric two-wheeler | My judgement: limited scope matching the assignment |
| L2 | Each scenario has internally consistent income, debt, rate, fee, tenure and security assumptions | No selection of favourable terms from unrelated products |
| L3 | Never describe an illustrative calculation as named-lender approval | Published terms do not establish actual eligibility |
| L4 | Keep supported lender income J separate from household I | Contributions are not automatically lender income |
| L5 | Q6 clarifies whether household debt total also covers all applicant/co-borrower obligations, including payments made by others | Avoid understating applicant debt |
| L6 | Add applicant_debt_payments_monthly; collect separately when different | Unresolved applicant debt can block sanction without blocking household capacity |
| L7 | Required secured participation is distinct from optional additional co-applicant income | Participation alone contributes no earnings |
| L8 | No universal spouse requirement; preserve named-product conditions if shown | Ravi's ownership, willingness, participation, wife's contribution and her possible application income stay separate |

Approved lender-scenario ratios beta are 40–45% for personal, 40–50% for property-backed business and 50% for electric two-wheelers. These are illustrative model choices. The handoff describes personal-loan guidance and SBI scheme context; the property range is explicitly the least evidence-supported, provisional judgement. None is the borrower-side 35% limit.

```text
Lender new-loan repayment allowance = max(0, beta*J - D_L)
```

D_L is applicant-relevant required debt, using ID6 where applicable. Convert the allowance using the assessed repayment terms and account for mandatory recurring charges. Apply product constraints under PC8. Optional co-applicant income is not activated merely because its dictionary fields exist: an approved applicable method must define its numerical effect and avoid shared-obligation duplication.

## RT1–RT10: Approved rate and tenure block

| Illustrative scenario | Annual nominal reducing-balance reference | Short / long comparison |
|---|---|---|
| Salaried personal | 9.99%–24.00% | 36 / 60 months |
| Property-backed productive/business | 13.00%–26.00% | 36 / 60 months |
| Electric two-wheeler | 11.20%–15.70% | 24 / 36 months |

Sources: RULES.md E06, E09 and E14 respectively. The vehicle envelope includes the possible 0.50-percentage-point concession at its lower end without asserting eligibility. All bands are broad, Low confidence, illustrative product references, not personalized fair-rate guarantees or named offers. No numerical credit-score discount is adopted, including for Priya's 780. A quote outside a reference band triggers examination of its basis and charges, not an automatic finding of unfairness.

Use the shorter tenure initially when no preference is supplied; identify the longer as a comparison. Do not automatically recommend a longer loan because its EMI is smaller. Compare the same principal/rate/fee assumptions unless a product condition requires a disclosed change. Higher interest reduces capacity at a fixed payment and tenure. Show two feasible tenures, one with an explanation if only one fits, or dependent calculations unavailable if neither fits. Unknown age or eligibility produces a conditional calculation. Actual offers retain their own terms; support for repayment arithmetic does not certify product eligibility.

Borrower wording: “This is a broad reference for the assessed product. Your attainable rate depends on lender assessment and terms we have not verified.” Apply the contract-sensitive rate stress in [ST22–ST31](STRESS_TESTING.md).

## IR1–IR8: Supported lender income

| ID | Approved rule | Why / origin |
|---|---|---|
| IR1 | Separate current household resources I from candidate supported lender income J | Affordability and documentability differ |
| IR2 | J is borrower-reported net earnings supported by identified records for a stated period; may be only part of actual earnings | Records are self-reported, not verified |
| IR3 | Sanction is conditional on lender acceptance of J | J is not accepted or empirically predicted recognized income |
| IR4 | No automatic cash/informal/self-employed haircut | Evidence routes do not establish universal recognition percentages |
| IR5 | Minimum evidence dependency belongs in Q3, with amount/basis/period clarification | Do not hide a mandatory dependency in optional refinements |
| IR6 | Add supported_net_income_monthly; preserve annual evidence separately | Prevent annual/monthly and taxable/net-income confusion |
| IR7 | Unresolved J means sanction not estimable, not zero; clarify same-basis contradictions; other-person income remains separate | Missing records do not trigger Do not borrow or automatic confidence changes |
| IR8 | No assumed salary records for Priya; clarify Ravi's annual ITR definition/period; do not presume Anita has no records | Persona facts do not fill evidence gaps |

Q3 asks what records could support earnings: payslips, Form 16, ITR, bank statements, business records, other, none or unsure. Then ask whether those records support the entered monthly net income. Yes: reuse that amount/range. Part only: collect the supported amount/range. Different period/definition: clarify. None/unsure: leave J unresolved. Record the period; do not upload documents.

Divide annual evidence by 12 only if its definition is compatible, period clear, and borrower confirms it remains representative of current earnings. Never silently average incompatible figures or choose their minimum. A partial supported figure is not automatically contradictory. More records must resolve numerical uncertainty to improve precision; answer count alone changes nothing.

Explanation: “This lender-side estimate assumes the lender accepts the income amount supported by the records you described. Actual underwriting may produce a different result.”

## FF1–FF8: Fees and funding

| ID | Approved rule | Why / origin |
|---|---|---|
| FF1 | Record every charge once with amount/basis, tax, timing and payment method | Prevent duplication; preserve deducted/upfront/financed/recurring distinctions |
| FF2 | Processing before tax: personal ₹0–₹6,500; property 0–3% of contractual P; electric two-wheeler 3% of P | Sources E06/E16/E15; selecting bounds and property principal basis is judgement; zero is a model endpoint, not a promised waiver |
| FF3 | Apply 18% GST to ordinary taxable processing services; do not re-tax inclusive fees or automatically tax every statutory/insurance charge | E17; tax applicability must be resolved; ordinary supported term-loan interest is treated separately |
| FF4 | Distinguish principal, purpose proceeds and initial APR benefit | Financed charges occupy principal but are not purpose funds; seller payment on behalf of borrower is purpose funding |
| FF5 | Test purchase funding and separately payable fees against own funds | Affordable EMI does not mean fully funded purpose |
| FF6 | Never silently increase requested principal to cover fees | Any larger request is a distinct scenario; down payment and fees cannot use the same own funds twice |
| FF7 | Deducted fees reduce proceeds; upfront fees use own funds; financed fees use principal capacity; recurring fees use monthly capacity | Each arrangement affects a different quantity |
| FF8 | No universal invented bound on actual unknown charges | Complete fees permit APR; defensible approved bounds permit conditional APR; otherwise actual all-in APR is not estimable |

For mutually exclusive financed charges F_f (already inside P), deductions F_d and separately paid upfront fees F_u:

```text
B (purpose proceeds) = P - F_f - F_d
N (initial APR benefit) = B - F_u
```

These expressions assume fees at disbursement. Materially different timing cannot silently use this convention. N must be positive for ordinary supported APR. Known net disbursal is reconciled, not reduced by the same fees twice. Contingent charges are disclosed separately and excluded from baseline unless triggered by an explicitly assessed scenario.

For purpose cost K, available own funds O and upfront fees U payable from that same pool:

```text
Own funds remaining for purpose = max(0, O-U)
Funding gap = max(0, K-B-max(0, O-U))
Separately check whether O < U (upfront fees themselves cannot be paid).
```

Q9 clarifies whether contribution is before or after allowing for fees; do not subtract them twice. Never assume all savings are available or import emergency funds. If a constant mandatory monthly charge is q, the principal-and-interest allowance is max(0, C_base-q). Check varying charges month by month, not as an average. Apply the corresponding charge treatment when translating lender repayment allowance.

## PC1–PC8: Product and eligibility constraints

| ID | Approved rule | Why / origin |
|---|---|---|
| PC1 | Personal: salaried personal expenditure, ₹50,000–₹25 lakh. Property-backed: existing-business expansion/inventory/related productive use, ₹3–₹25 lakh. Electric two-wheeler: new RTO-registered vehicle, ₹50,000–₹3 lakh | Personal limits are my judgement; property/vehicle limits informed by E09/E13; tenures remain RT block |
| PC2 | Minimum loan cannot force more borrowing; below-minimum capacity means no feasible amount in that product | Keep independent capacity visible; do not claim rejection by all lenders |
| PC3 | Electric vehicle contractual principal limited by repayment capacity, six times J, 85% of on-road vehicle price and ₹3 lakh | E13-inspired illustrative constraints, not SBI eligibility certification |
| PC4 | Property collateral cap = 50% of reported V or compatible range | My judgement, not verified Tata LTV or an empirical valuation buffer; no extra invented haircut |
| PC5 | Initial property model requires applicant ownership, alone/jointly, reported unencumbered property and relevant owners willing to participate | My judgement: existing-charge/top-up modelling excluded; unknown security facts unresolved |
| PC6 | Entry / maximum age at final repayment: personal 21 / 60; property 21 / 65; vehicle 18 / 65 | My judgement; E18/E13 inform entry context, not maturity limits; birthday-sensitive boundary cases conditional |
| PC7 | No named-lender approval inference, occupation haircut or invented score cutoff | Annual-income/job-history evidence is not made secretly mandatory to imitate a named lender |
| PC8 | Lender maximum is minimum of repayment-based amount and applicable product constraints; household capacity remains separate | Security and product maxima do not create household repayment resources |

```text
Vehicle lender maximum = min(P_repayment, 6*J, 0.85*K_vehicle, 300000)
Property collateral maximum = 0.50*V
```

K_vehicle is the on-road vehicle price, not a mixed project total. At least 15% of that price must be funded separately, potentially more because of fees and other limits. Financed fees occupy the contractual cap. Ravi's stock/vehicle purpose can be assessed as one illustrative business-expansion scenario without asserting named-product acceptance of every component.

Unresolved collateral value leaves secured sanction unresolved; show repayment-based capacity separately only with the missing security constraint explained. Do not simply subtract existing secured debt from V. Required ownership participation does not add income or impose a blanket spouse requirement in our model. A named Tata comparison must preserve its separately published conditions, including its married-applicant spouse requirement (E09 supplement).

Age is collected in completed years, not date of birth. Where the unknown birthday can change maturity feasibility, retain a conditional result. Passing these illustrative boundaries establishes neither lender acceptance nor future income continuity. Unknown product conditions differ from failed conditions; neither alone dictates the overall verdict.

## ID1–ID8: Irregular spending and debt

| ID | Approved rule | Why / origin |
|---|---|---|
| ID1 | Separate ordinary monthly spending, predictable recurring non-monthly costs, exceptional commitments, business costs and debt | Match categories and prevent duplication |
| ID2 | Recurring cost monthly provision = cost per cycle / months per cycle; add only if absent from E | My judgement: provision, not assumed monthly cash payment; preserve ranges |
| ID3 | Provision does not establish money accumulated for an imminent bill | Due date and earmarked funds remain separate; ST39–ST48 handle resilience |
| ID4 | Use required debt payments, never balance/rate alone or merely last month's paid amount | Carried-card required payment supports conditional current-payment baseline, not a guaranteed amortisation schedule |
| ID5 | For usable non-monthly schedules, sum debts per calendar month over assessed tenure, then take the largest month | My judgement: protect peak month, not average; never sum non-coincident individual peaks |
| ID6 | Apply calendar treatment independently to household D and applicant D_L | A debt can appear in both separate lenses, but only once within each |
| ID7 | Keep arrears separate; include agreed catch-up instalments in calendar once; no invented repayment period | Unknown immediate arrears arrangement is not proof it can be cleared; ST57–ST65 govern distress consequences |
| ID8 | Clarify deductions and missing amounts within Q3/Q5/Q6; no new core topic | Reconstruct pre-EMI income only from confirmed amounts; unknown is not zero |

```text
D = max_t(sum(required household debt payments due in month t))
D_L = max_t(sum(required applicant debt payments due in month t))
```

For ordinary monthly debts, Q6's total suffices. If only a current monthly obligation is known, assume it continues over the assessed tenure and disclose that assumption; no invented end date. A materially unresolved required schedule leaves affected debt unresolved. Known excluded recurring expenses without a usable amount/range leave E unresolved. Do not import an exceptional one-time commitment into recurring E or claim that a provision already exists in savings. A bounced EMI alone does not establish continuing arrears. A known baseline can remain visible alongside unresolved arrears, but is not permission for new debt.

## AV1–AV9: Amount and baseline verdict

| ID | Approved rule | Why / origin |
|---|---|---|
| AV1 | Keep borrower capacity, lender capacity and recommendation separate | Assignment's two lenses and purpose-specific decision |
| AV2 | Candidate = min(request R, conservative borrower S_low, conservative lender L_low) where both estimable | My judgement: cautious access/affordability boundary; no assurance of finance |
| AV3 | Check product bounds, security, participation, down payment, fees, own funds and zero funding gap; choose smallest principal funding the agreed purpose within candidate | Avoid surplus borrowing or an unusable amount; product minimum cannot silently force excess debt |
| AV4 | Borrow less requires a strictly smaller, affordable, feasible and confirmed acceptable funding arrangement | Original purpose can also be funded with less debt if confirmed funds suffice; no invented reduced plan |
| AV5 | Evaluate requested ranges without midpoints; do not fabricate one recommended amount when only a range is supported | Show supported portion/conditionality and required clarification |
| AV6 | Critical unknowns → incomplete; requested feasible → baseline Borrow; viable smaller feasible → baseline Borrow less; known constraints rule out assessed/acceptable smaller plan → Do not borrow under assessed conditions | Unknown smaller-purpose viability is not a negative fact |
| AV7 | Show scenario disagreement and every product/amount/tenure change | Favourable-only support is not unconditional; security willingness remains required |
| AV8 | Whole-rupee selection and display, amended by NC6 | Ceil minimum funding requirement; floor maximum candidate; recheck all costs and constraints |
| AV9 | Apply ST66–ST76 before issuing the final recommendation | A positive baseline is not final stress-aware advice |

When L is not estimable, min(R, S_low) may be shown as a borrower-only candidate conditional on lender access, not guaranteed funding. Capacity displays remain independent: do not cap borrower capacity at lender maximum. Candidate alone is not recommendation. If smaller-purpose viability is unknown, state requested amount unsupported where established, but keep the alternative/overall decision incomplete.

For requested ranges: whole range feasible → baseline range supported; only part feasible → identify dependence on selected amount; no part feasible plus acceptable viable smaller plan → Borrow less; unresolved funding/viability across range → conditional/incomplete. A single recommendation must come from established funding need. Baseline support remains conditional on fees, lender acceptance and other unverified material assumptions even where the arithmetic is available.

Do not automatically choose a longer tenure, substitute a secured loan, or display the favourable scenario as unconditional. The Negotiation Card reuses these same results and limitations. The Stage 11 integration below supplies the final stress/resilience and distress boundary.

## Stage 11 integration into AV

Keep every Stage 10 baseline result visible, then apply [ST1–ST76](STRESS_TESTING.md). For each applicable stress scenario `s`:

```text
C_s = max(0, min(0.35*I_s - D_s, 0.90*I_s - E_s - D_s))
M_allow_s = max(0, C_s - recurring_charges_s)
P_s = inverse_repayment_capacity(M_allow_s, rate_s, tenure)
C_resilient = min(C_base, C_income, C_expense, applicable C_low, C_commit)
S_stress_low = floor(min(P_s over every applicable supported scenario))
```

`S_stress_low` replaces `S_low` in AV2 for the final candidate. A rate or fee scenario can reduce principal capacity even when it does not change `C_resilient`. Scenarios remain separate unless the borrower reports that the shocks coincide or the contract makes them coincident. Reserves provide context for temporary coverage but never increase `C_s`, `M_allow_s`, `P_s`, `C_resilient`, or `S_stress_low`. Productive-income upside also cannot increase them.

After the numerical boundary, apply funding, product, lender-access and purpose-viability rules. Active distress follows ST57–ST65 and U17 precedence: usable core I/E/D can support a “Do not borrow under assessed conditions” result; missing core I/E/D keeps the overall assessment incomplete while separately advising against additional ordinary debt until stabilization.

## BF1–BF6: Complete conditional benchmark fee packages

| ID | Approved rule | Why / origin |
|---|---|---|
| BF1 | Separate no-offer benchmark from actual offer; unknown actual charges remain unresolved | An assumed package cannot be substituted silently into an actual offer |
| BF2 | Use processing plus the additional-charge budgets below | Additional budgets are my judgement for bounded prototype scenarios, not market distributions or statutory caps |
| BF3 | Additional-charge allowance is inclusive of its taxes and relevant other borrowing costs, not an extra fee added to the same itemised charges | Replace corresponding assumptions when actual details arrive; prevent purchase/finance duplication |
| BF4 | Benchmark charges all deducted at disbursement; no additional financed/recurring charges; first monthly repayment one month later; no contingent event | Explicit hypothetical cash-flow arrangement, not claimed lender practice |
| BF5 | Lower compatible rate/fee endpoint for lower APR; higher for upper; larger fees for conservative funding | Preserve linked terms; non-positive net benefit makes supported APR unavailable |
| BF6 | APR, proceeds, funding and dependent recommendation remain conditional, Low confidence | Out-of-package facts trigger reassessment; removal cannot exclude previously supported possibilities |

| Scenario | Processing including approved GST | Other upfront borrowing charges, tax-inclusive |
|---|---|---|
| Salaried personal | ₹0–₹7,670 | ₹0–₹3,000 |
| Property-backed business | 0–3.54% of P | ₹10,000–₹25,000 |
| Electric two-wheeler | 3.54% of P | ₹0–₹3,000 |

BF2's other-charge values are approved judgements, not sourced observations, predictions, empirically defensible population bounds or universal unknown-fee caps. The larger property budget reflects extra legal/valuation/documentation/registration work; it does not determine state stamp duty. Zero is a hypothetical endpoint with no other charges, never a conversion of an unknown actual answer to zero. A complete modelled package is not a complete actual offer. Its dependent results expressly assume total charges stay inside the displayed package; approval has not established that condition for a borrower.

Other borrowing charges include relevant taxes in one combined budget. Do not double-add known line items already represented. Vehicle registration/insurance already in on-road price belongs to purpose cost, not another financing fee. Loan-specific mandatory costs belong to borrowing cost; optional add-ons are not presumed mandatory. Clarify ambiguous classification. Real offer timing and mandatory monthly charges override hypothetical benchmark timing in a separate offer assessment; never silently merge them.

Wording: “Estimated APR under the displayed interest and fee assumptions. Actual charges may fall outside these assumptions.” Actual unbounded missing costs still follow FF8. Removing known fees cannot restore a narrower default benchmark excluding known possibilities.

## NC1–NC8: Numerical conventions

| ID | Approved rule | Why / origin |
|---|---|---|
| NC1 | One contractual principal definition, reconcile quoted amounts and preserve discrepancies | No duplicate deducted/financed fee treatment |
| NC2 | Invert the approved repayment formulas for principal capacity | Mathematical derivation, not a new lending threshold |
| NC3 | Evaluate complete compatible scenarios before collecting endpoints | Do not pair incompatible budget states or hide failed feasibility cases |
| NC4 | APR = 12j from complete supported monthly cash flows; positive N, non-negative interest, ordinary repayment flows | Zero APR only if established; failed numerical solution is a limitation, not zero |
| NC5 | Benchmark payments derived; actual APR uses complete quoted supported schedule; compare stated rate separately and explain discrepancies | Do not replace a quoted EMI silently; rate-basis uncertainty alone need not block APR from known cash flows |
| NC6 | Floor candidate maximum, ceil minimum funding need, recheck fees/funding/limits at selected amount | Corrects AV8; rounding must neither create a concealed gap nor exceed capacity |
| NC7 | Whole-rupee recommendation/ceiling; repayment/charges to two decimals where needed; rate/APR to two decimals; retain internal precision | Feasibility uses unrounded results; generated final repayment clears rounding residue; quoted schedules remain authoritative |
| NC8 | Acceptance checks below; ₹0.01 unrounded monetary and 0.001 percentage-point APR tolerance | Numerical tolerances do not authorize exceeding capacity; contract rounding explained separately |

```text
Reducing principal capacity = M*(1-(1+r)^(-n))/r, r > 0
Zero-interest capacity = M*n
Flat-rate capacity = M*n/(1+a*n/12)
Whole-rupee maximum = floor(P_candidate)
Whole-rupee minimum funding requirement = ceil(P_needed)
```

Recheck principal-dependent charges at the selected whole-rupee amount. If minimum funding need exceeds maximum, the arrangement is infeasible. Use the same terms for forward/inverse checks. An actual complete supported repayment schedule can determine APR even when the advertised rate basis needs clarification; this does not permit processing an unsupported structure or missing material charges.

### Numerical acceptance cases

These are specification fixtures, not application tests or persona outcomes. Stage 12 executes them through [validation_checks.py](validation_checks.py), alongside the wider behavioral suite documented in [VALIDATION_STRATEGY.md](VALIDATION_STRATEGY.md).

| Case | Expected result |
|---|---|
| I=₹50,000, E=₹25,000, D=₹5,000 | Base ceiling ₹12,500; debt allowance ₹12,500, budget allowance ₹15,000 |
| Same, E=₹32,000 | Ceiling ₹8,000 |
| Starting case, D=₹9,000 | Ceiling ₹8,500 |
| I=₹40,000–₹60,000, E=₹25,000, D=₹5,000 | Ceiling ₹6,000–₹16,000; conservative endpoint guides |
| I=₹50,000, ordinary E=₹25,000 plus annual ₹24,000, monthly debt ₹5,000 plus quarterly ₹6,000 | E=₹27,000; peak D=₹11,000; ceiling ₹6,500 |
| ₹1 lakh P, ₹3,540 deducted fee, purpose ₹1 lakh, own ₹5,000 | Proceeds ₹96,460, zero gap, ₹1,460 unused |
| Same fee paid upfront from same own funds at disbursement | Proceeds ₹1 lakh, own purpose funds ₹1,460, same N=₹96,460 and APR if repayments unchanged |
| ₹1.5 lakh vehicle price | 85% cap ₹1,27,500; at least ₹22,500 separate funds before fees/other caps |
| Synthetic ₹1 lakh electric loan benchmark | Fees ₹3,540–₹6,540; proceeds ₹93,460–₹96,460 |
| Need ₹1,00,000.25, candidate cap ₹1,00,001 | Select ₹1,00,001 if all recalculated constraints pass |
| RBI E02 illustration | Approximately 17.07% displayed APR under approved annualization |

Executed Stage 12 checks cover zero-interest, flat and ordinary reducing forward/inverse agreement; RBI APR; expense/debt monotonicity; rate/capacity monotonicity; upfront fee/APR direction; range containment or not-estimable removal; same-time upfront/deducted benefit; financed fees counted once; combined debt peaks; product minima; whole-rupee funding; stress, state, confidence, routing and persona provenance. No synthetic example fills a supplied persona's missing facts.

## Documentation verification

The Stage 10 integration checked its ten then-existing stage specifications for local link targets, balanced code fences and closed table rows. It verified exactly one individual row for each of the 71 C/L/IR/FF/PC/ID/AV/BF/NC rule IDs. RT1–RT10 remains grouped as supplied in the handoff, without invented individual historical numbering. The Stage 11 documentation check separately covers all eleven stage specifications and the original 15-stage order.

The persistent Stage 12 oracle reproduces the unrounded RBI fixture at EMI ₹969.73296094 and APR 17.07055345% and passes the complete integrated suite: 525 checks, zero failures. This verifies specification consistency, not a functioning app, regulatory compliance, empirical safety or final persona outcomes.

Reviewed the nine earlier stage documents for the approved Q3 evidence, Q6 applicant-obligation, Q9 funding, Q10 participation, irregular-budget, range, APR and rounding amendments. Their original stage-only boundaries remain historical where expressly identified. The research prompt/report remain background material, not adopted rulebooks. [STRESS_TESTING.md](STRESS_TESTING.md) supplies the approved stress/resilience and confidence conditions.

## Original 15-stage plan and continuation

This is the user's original plan, not a newly inferred implementation roadmap.

| Stage | Name | Current status |
|---|---|---|
| 1 | Problem framing | Accepted |
| 2 | Requirements and constraints | Accepted |
| 3 | Output definitions | Accepted; Stages 10–11 amendments documented |
| 4 | Output-to-input dependency mapping | Accepted; Stages 10–11 amendments documented |
| 5 | Data dictionary | Accepted; Stages 10–11 amendments documented |
| 6 | Missing-data and uncertainty policy | Accepted; Stages 10–11 amendments documented |
| 7 | Assumptions and source register | Accepted; Stages 10–11 entries documented |
| 8 | Questionnaire design | Accepted; Stages 10–11 amendments documented |
| 9 | Adaptive questionnaire branching | Accepted per handoff; Stages 10–11 amendments documented |
| 10 | Analytical rules and calculations | Approved and documented |
| 11 | Stress testing and scenario design | Approved and documented at specification level |
| 12 | Validation strategy | Approved, implemented and executed |
| 13 | Product and UX requirements | Completed and approved |
| 14 | Implementation planning | Completed and approved |
| 15 | Final integration and documentation | Completed, implemented and verified |

Stage 11 settles adverse scenarios and final-verdict integration; Stage 12 validates those rules through the standalone oracle; Stages 13–15 define and deliver the browser experience. Regulatory household scope is not equated with our contribution-based household budget; any future legal applicability claim requires its own checked basis. Optional co-applicant income or other refinements remain inactive unless an approved numerical method supports them.

Stage 10 itself produced documentation only. Stage 15 subsequently delivered the working local app, final RULES.md, supplied-only persona run-throughs with outputs/Card, and the five-minute written walkthrough without adding a framework, persistence, or lender integration.

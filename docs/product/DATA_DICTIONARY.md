# Stage 5: Data Dictionary

Status: Stage 5 content and implementation accepted by the user. Cross-stage audit corrections were subsequently approved.

Stage 12 update: approved extensions below support [analytical rules](ANALYTICAL_RULES.md) and [stress testing](STRESS_TESTING.md); [validation strategy](../validation/VALIDATION_STRATEGY.md) verifies their critical boundaries and persona provenance. They remain documentation identifiers, not an application schema.

References: [accepted dependency map](OUTPUT_INPUT_MAP.md) and [accepted output definitions](OUTPUT_DEFINITIONS.md).

This dictionary defines candidate information already mapped in Stage 4: names, meanings, units, time periods, and boundaries between values. It does not require every field to become a question or introduce analytical defaults. Field names are documentation identifiers, not a programming schema. “Proposed judgement” identifies the origin of a decision; the judgements below have been approved for Stage 5.

## Common conventions

All entries in this table are **proposed judgements**.

| ID | Convention | Approved definition |
|---|---|---|
| D1 | Money | Amounts use INR. Each field explicitly identifies whether it is a one-time amount, monthly amount, or annual amount. No silent mixing of rupees and lakhs. |
| D2 | Numeric answers | Preserve whether an answer is a single amount or a borrower-reported lower–upper range. A reported income range is different from an assessment range calculated by the app. |
| D3 | Knowledge state | Distinguish **provided**, **unknown**, **not asked**, and **not applicable**. A provided zero remains a real answer. The approved Stage 6 uncertainty policy determines the consequences of these states. |
| D4 | Origin | Distinguish **borrower-reported**, **brief-supplied persona fact**, **reference assumption**, and **derived result**. A reported number may itself be an estimate; reporting it does not make it verified. |
| D5 | Current values | “Current monthly” means the borrower's present recurring circumstances, not automatically an average across past months. Identify temporary or recently changed circumstances rather than silently smoothing them away. |
| D6 | Historical income | For income-history information, use the **latest 12 completed calendar months** as the reference window. If less history is available, retain its actual coverage. This does not require collecting 12 separate monthly answers. |
| D7 | Range validity | A reported lower bound cannot exceed its upper bound. An invalid answer needs correction; it is not converted into an unknown or silently reordered. |
| D8 | No automatic midpoint | Do not convert a reported range to its midpoint during collection. Stage 10 C/NC define compatible conservative endpoints; AV5 preserves requested ranges without inventing a representative point. |

**Requirement from the brief:** Unknown must never be treated as zero.

**Open question:** Question content and range-validation wording are approved in [Stage 8](QUESTIONNAIRE_DESIGN.md). Exact input controls, allowed precision and other validation wording remain for UX design.

## Borrowing need and scenario

Every row is a **proposed judgement**.

| Field | Meaning and unit | Boundary |
|---|---|---|
| `purpose` | What the borrowing will fund, including whether it is for personal consumption or a productive activity | A productive purpose does not establish positive earnings. Stage 8 defines answer categories and relevant vehicle type, electric status and mixed-purpose clarifications within this field; unknown details remain unknown. |
| `requested_loan_amount` | INR of new loan principal the borrower wants | Not total project cost or net proceeds after deducted fees. |
| `product_preference` | Loan product the borrower has in mind, if known | Separate from the product the assessment eventually selects. |
| `tenure_preference_months` | Preferred repayment duration, in months, if any | A preference, not evidence that the product permits that tenure. |
| `purpose_cost` | Total INR needed for the stated purchase or activity, excluding financing charges | May differ from requested principal because the borrower has other funds. For a vehicle-only purpose, identify its on-road price; a mixed-purpose total cannot substitute for the vehicle component used by PC3. Registration/insurance already included in purchase price is not a second borrowing charge. |
| `minimum_viable_purpose_cost` | Lowest total INR cost of a smaller version that would still accomplish an acceptable purpose | Not automatically the smallest affordable loan. The borrower must consider that smaller version viable. |
| `available_own_contribution` | INR the borrower is willing and able to contribute to this purpose without borrowing it | Not automatically all savings. Identify overlap with reserves and whether this amount is before or after allowing for separately paid borrowing fees; FF5 subtracts those fees only once. |

## Income and household resources

Every row is a **proposed judgement**.

| Field | Meaning and unit | Boundary |
|---|---|---|
| `age_years` | Borrower's age in completed years | No date of birth is needed. PC6 specifies illustrative entry/maturity boundaries; birthday-sensitive feasibility remains conditional. |
| `income_type` | Nature of the borrower's income: salaried, self-employed, informal, or mixed | Describes earnings, not a credit-quality ranking. |
| `current_net_income_monthly` | Borrower's current monthly earnings in INR after employment/business earning costs and applicable taxes or deductions, but before household spending and debt payments counted separately | Excludes loan proceeds, transfers between own accounts, asset-sale proceeds, and projected income from the proposed loan. |
| `historical_net_income_range_monthly` | Borrower-reported lowest and, only where another approved method uses it, highest compatible monthly net earnings over the stated historical coverage | Stage 11 collects and uses the lowest observed month for ST9–ST15. The historical high is not requested merely for stress. This is an observed value, not a confidence interval, forecast, or substitute for current income; use the same net-income boundary as the current figure. |
| `income_history_coverage_months` | Number of completed months represented by historical income information | Limited to actual available coverage within D6's reference window. Shorter history remains usable at Low confidence; 12 completed months are required for Moderate confidence on a variable-income ceiling. |
| `income_source_duration_months` | Time in the current job, business, or recurring earning activity, in months | Different from historical income coverage. |
| `variable_income_component` | Amount or range of current monthly net income that varies, such as incentives or fluctuating business earnings | Included within current net income, not added to it again. |
| `income_evidence_type` | Evidence the borrower says is available, such as payslips, tax returns, or business records | Q3 now obtains the minimum evidence dependency under IR5. No document upload or verification; evidence alone does not establish the supported amount. |
| `supported_net_income_monthly` | Borrower-reported monthly net earnings in INR, or range, supported by identified records for the stated period | Candidate J for an illustrative lender scenario, conditional on lender acceptance, not verified recognized income. May cover only part of actual income. Clarify different definitions/periods and contradictions; no occupation haircut. |
| `documented_annual_income` | Annual INR income stated by the borrower as shown in the identified evidence | Enter annual amounts only; do not equate taxable income with net earnings or revenue. Monthly records belong in supported_net_income_monthly, never silently annualized. Under IR6, annual evidence may be divided by 12 only with compatible definition, clear period and borrower confirmation that it remains representative of current earnings; preserve the original annual value. |
| `income_evidence_period` | Period to which the documented income relates | An older annual figure is not automatically current income. |
| `other_household_contribution_monthly` | INR another household member actually makes available toward the assessed household budget, net of commitments they pay outside that budget | Record the available contribution, not automatically that person's full earnings. Match it to the spending and debt paid from the assessed budget. |
| `coapplicant_income_monthly` | Proposed co-applicant's reported net monthly income, if a co-applicant path is considered | Used with their separately identified obligations for lender-side assessment. It is not automatically borrower-side repayment income; use their available contribution for that purpose. The same money cannot be counted twice. |
| `coapplicant_debt_payments_monthly` | Proposed co-applicant's required monthly debt outflow in INR, where needed for lender-side assessment | Identify any overlap with debt already recorded in the assessed household budget. Do not import obligations paid outside that budget into borrower affordability or count shared obligations twice. |
| `coapplicant_participation` | Whether that person is willing to participate in the borrowing arrangement | Does not establish lender acceptance or legal eligibility. |

**Proposed judgement:** If income is quoted after a debt deduction—for example, an EMI deducted before salary reaches the account—identify that inclusion so the same obligation is not subtracted twice. The questionnaire must make the chosen income basis understandable.

**Proposed judgement (approved audit correction):** The assessed household budget uses borrower income plus contributions actually available to it, matched to the household spending and debt obligations paid from it. A contributor's commitments paid outside that budget reduce the contribution available; do not subtract those commitments again. Lender-side co-applicant income and obligations remain separate. This is a scope definition, not an affordability formula.

## Spending, existing debt, and reserves

Every row is a **proposed judgement**.

| Field | Meaning and unit | Boundary |
|---|---|---|
| `household_expenses_monthly` | Current recurring household spending paid from the assessed budget, in INR per month, including rent, dependants and monthly provisions for predictable recurring non-monthly costs | ID1–ID3 add a provision only if not already included. Exclude debt and business costs recorded separately. Count card purchases once, not their later settlement again. ST16–ST21 run a separate 10% expense-rise case for three months. Exceptional commitments remain separate. A material known omitted recurring cost without a usable bound leaves E unresolved. |
| `existing_debt_payments_monthly` | Total current required monthly debt outflow paid from the assessed budget in INR, including loan instalments, carried-card payments, card EMIs and financing charges | Not principal balance or last amount voluntarily paid. Exclude current purchases already in expenses. Preserve disclosed non-monthly schedules separately; ID5 derives peak D over assessed tenure. No invented debt end date. |
| `applicant_debt_payments_monthly` | Required monthly debt outflow in INR on obligations where the applicant is borrower or co-borrower, including payments someone else makes | Count each obligation once. May differ from household debt; ID6 derives lender D_L separately where schedules vary. An unresolved amount blocks affected sanction, not necessarily household capacity. |
| `existing_debt_outstanding` | Unpaid principal balance in INR, for a debt or identified group of debts | Does not determine monthly payment without additional terms. |
| `existing_debt_rate` | Reported annual interest rate and its stated basis, if known | A statement such as “30%+” preserves the inequality; it is not converted to exactly 30%. |
| `existing_debt_end_month` | Expected final repayment month, if known | Collected only if an approved scenario uses the change in future commitments. |
| `repayment_problem` | Reported missed, overdue, or bounced payment; timing; whether resolved; any required catch-up plan; restructuring/settlement; and whether current payments still create a shortfall | Active distress under ST57–ST65 requires disclosed unresolved arrears, a required catch-up obligation, restructuring/settlement, or an ongoing repayment shortfall. A bounced payment alone does not establish continuing arrears. Unknown status is not invented distress and blocks positive guidance only as specified by Stage 11. |
| `card_balance_and_limit` | Reported outstanding card balance and sanctioned limit in INR, if relevant | Neither is the monthly repayment amount. Collect only if utilisation has an approved numerical effect. |
| `liquid_emergency_reserves` | INR readily accessible for emergencies after the proposed purchase, separately paid fees, and earmarked commitments | Not recurring income and never raises a monthly ceiling or principal capacity. Property value is not a liquid reserve. Preserve a borrower-reported range and identify overlap with own contribution. |
| `upcoming_commitment` | Known non-recurring expense within the next 12 months: amount in INR, expected month, and any funds already earmarked for it | ST39–ST48 allocate only the unearmarked amount over the remaining months to the due date for the commitment stress. Do not count the same earmarked money as available reserve or the same provision twice. Commitments beyond 12 months are disclosed but excluded from this horizon. |

**Stages 10–11 extension:** ID1–ID8 define recurring provisions, separate exceptional commitments, and calendar-month debt peaks. Where needed within Q5/Q6, retain cost per cycle and cycle length; debt due months/amounts and applicable budget/applicant scope; and arrears amount, resolution and agreed catch-up payments. These are clarifications of existing concepts, not additional core topics. Keep raw schedules separate from derived D/D_L. Agreed arrears payments enter once; unresolved arrears arrangements are not silently amortised. ST39–ST48 use earmarked funds and timing without changing the recurring-spending definition.

## Credit, collateral, and productive borrowing

Every row is a **proposed judgement**.

| Field | Meaning and unit | Boundary |
|---|---|---|
| `credit_score` | Borrower-reported numerical score, with provider and date if known | No bureau pull. Valid score scales depend on the identified provider and require verification. |
| `credit_score_availability` | Whether the borrower reports a known score, does not know their score, or reports that no score is available | Score availability does not establish formal borrowing history or existing debt obligations. No unavailable score receives an invented numerical value. |
| `formal_credit_history` | Whether the borrower reports prior formal borrowing, no prior formal borrowing, or does not know | Separate from score availability. No formal borrowing history does not establish absence of informal debt or current repayment obligations. |
| `collateral_type` | Asset proposed as security | Does not establish that a lender accepts it. |
| `collateral_estimated_value` | Borrower's estimated current asset value in INR | Not a lender valuation or an immediately realizable sale value. |
| `collateral_ownership` | Whether ownership is sole, shared, or otherwise reported | No title verification is performed. |
| `collateral_encumbrance` | Whether an existing charge or borrowing is secured against the asset; associated amount if known | An unknown encumbrance is not an unencumbered asset. |
| `willing_to_pledge` | Borrower's willingness to offer the asset as security | Ownership alone does not imply willingness. |
| `productive_incremental_net_income_monthly` | Expected additional monthly earnings in INR after additional operating costs and displaced earnings, before the proposed loan's debt payment | Separate from current earnings. ST49–ST56 use it only for a labelled upside outlook; it never raises current safe capacity or the recommendation. More revenue or activity is not necessarily more net income. |
| `productive_income_start_delay_months` | Expected months from funding until additional net earnings begin | Activates a delayed-upside case; starting earnings need not immediately reach the full expected amount. A separate no-upside case always keeps the increment at zero. |
| `productive_income_basis` | Borrower's basis for the estimate, such as observed demand or an untested expectation | Describes support for the estimate; it does not verify it or authorize including it in base affordability. |

## Loan offers and charge details

Every row is a **proposed judgement**.

| Field | Meaning and unit | Boundary |
|---|---|---|
| `offer_principal` | Contractual principal the lender proposes to finance, in INR, including any financed charges | Distinguish from purpose proceeds and requested amount. Do not add financed charges again if already included. |
| `offer_net_disbursal` | INR the borrower actually receives after deductions, if stated | Do not assume it equals principal. |
| `offer_tenure_months` | Quoted repayment duration in months | Separate from the borrower's preferred tenure. |
| `offer_interest_rate` | Quoted rate, together with its period and flat/reducing-balance basis | Do not compare or convert an ambiguous quote silently. |
| `offer_rate_structure` | Fixed or floating, as stated | ST22–ST31 apply a +2 percentage-point shock only to an applicable floating rate. Fixed is not applicable; unknown structure leaves the rate stress conditional rather than assuming either. |
| `offer_repayment_terms` | Stated payment amount, frequency, and any irregular structure such as a moratorium or final lump sum | Recording a structure does not mean the prototype will support calculating it. |
| `offer_charge` | Each relevant charge's name, INR amount or percentage and basis, timing, payment method, recurrence, and whether mandatory if known | Distinguish upfront payment, deduction from disbursal, financing into principal, and recurring charges. Preserve whether taxes are included or unknown. ST32–ST38 apply disclosed actual charges or the separately labelled benchmark package without converting unknown actual charges to zero. |

**Stage 10 resolution:** FF/BF/NC specify fee classification, tax assumptions, cash-flow APR and offer consistency; the calculation-design section defines supported structures. Unknown actual fees remain distinct from a hypothetical benchmark package. A complete supported quoted payment schedule can establish APR even if advertised interest basis needs clarification; unsupported repayment structures still cannot be processed as ordinary instalments.

## Derived quantities remain separate

All entries below are **proposed judgements**. Their definitions reuse approved outputs; they introduce no calculation rules.

| Quantity | Definition |
|---|---|
| Lender-recognized income | Conceptual lender-side basis; Stage 10 uses candidate supported J conditionally, never labels it already accepted by a lender. |
| Assessed household / applicant debt | D and D_L derived separately from known recurring amounts or calendar-month schedules under ID5–ID6. |
| Purpose proceeds / initial APR benefit | Separate B and N under FF4; a direct seller payment on the borrower's behalf is purpose funding. |
| Assessed repayment resources | Income and contributions considered available under approved borrower-side rules, without duplication. |
| Assessed product and tenure | The explicit loan scenario selected for calculation, with its origin identified. |
| Monthly ceiling | Base `C_base`, per-scenario `C_s`, and binding `C_resilient`: maximum recommended recurring payment for the new assessed loan before scenario-specific recurring charges. |
| Safe capacity and sanction ranges | Separate principal ranges for that scenario. Final safe capacity uses per-scenario inverse repayment capacity and conservative `S_stress_low`; sanction remains a separate lender-side output. |
| Estimated payment and APR | Results calculated from the scenario's terms and identified charges. |
| Recommended amount and verdict | Decision outputs derived from the approved assessment, not borrower inputs. |

**Unit boundary:** Formulas live in Stage 10, not in field definitions. Converting annual documented income into monthly units does not by itself make it current net earnings; IR6 requires compatible definition, clear period and confirmation of current representativeness.

## Persona interpretation checks

These are **proposed judgements** for preserving supplied facts.

- **Priya:** ₹28,000 rent is only part of household expenses. Her ₹14,000 car EMI is debt outflow.
- **Ravi:** ₹40,000–80,000 cash income and ₹4,20,000 annual ITR income remain separate. The meaning of “cash income” needs clarification before treating it as net earnings. His wife's ₹18,000 earnings are not automatically a contribution or accepted co-applicant income.
- **Anita:** ₹35,000 outstanding is a balance, not EMI. “30%+” is a lower-bound description. Doubling delivery runs remains a claim about activity, not measured incremental net income.

**Out-of-scope item:** Adding borrower identity fields, collecting documents, storing answers, coding data types, or constructing questionnaire screens during this stage.

## Artifact and verification boundary

**Proposed judgement (approved):** Add only this document for Stage 5, linked to the accepted dependency map and output definitions. Check that mapped information has a definition and unit or category, overlapping amounts have explicit boundaries, unknown remains distinct from zero, and no persona gaps are filled with invented values. Stop for approval of the implementation result before beginning the next stage.

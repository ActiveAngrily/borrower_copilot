# Stage 7: Rules, Assumptions, and Source Register

Status: Stages 1–15 are complete. [VALIDATION_STRATEGY.md](../validation/VALIDATION_STRATEGY.md) and [validation_checks.py](../../tests/python/validation_checks.py) retain the deterministic specification oracle; `rules.mjs` implements the browser decision engine, and `rules.test.mjs` checks its integrated paths.

Research access date: **6 September 2026 (Asia/Kolkata)**. Access dates record this research session, not the dates claimed by the earlier local report. This is a bounded primary-source review, not a representative lending-market dataset or a comprehensive legal opinion.

## 1. How to use this register

**Requirement from the brief:** Every rule, threshold, band, and assumption must have a **what · value · why · source or “my judgement”** record. See [the assignment](../../reference/Lokta_Borrower_Copilot_Build_Challenge_v2.html), Deliverables, item 2.

**Proposed judgement (approved):** Published facts, mathematical derivations, and product judgements are different kinds of support. A citation to a lender does not turn our affordability judgement into that lender's policy. Evidence checked here is available for later proposals; its numerical values are **not automatically adopted as app rules**.

### Approved register policies

| ID | Classification | What / value | Why and source or judgement | Applicability / status |
|---|---|---|---|---|
| S1 | Requirement from the brief | Record what, value, why, and source or judgement for every rule | Assignment, Deliverables item 2 | All rules; approved |
| S2 | Proposed judgement | Also record ID, classification, applicability, approval status, and affected outputs | My judgement; prevents an observation being mistaken for an operational rule | All entries; approved |
| S3 | Proposed judgement | Reuse earlier decision IDs; group related policies without duplicating entire documents | My judgement; preserves traceability | Policy register; approved |
| S4 | Proposed judgement | Separate approved policies, researched observations, and unresolved candidates | My judgement; verification is not adoption | All entries; approved |
| S5 | Proposed judgement | Unselected values say “Not selected—requires approval” | My judgement; prevents accidental defaults | Pending analytical rules; approved |
| S6 | Proposed judgement | Each adopted policy points to an existing approval; unsupported policies remain pending | My judgement; collaborative stage boundary | Policy register; approved |
| S7 | Proposed judgement | Source records include publisher, direct link, dates, specific claim, scope, limitations, verification status, and rule links | My judgement; permits claim-level checking | Evidence register; approved |
| S8 | Proposed judgement | Existing research report is a discovery aid, not verified authority | My judgement; its stated cutoff does not verify its claims | Local report; approved |
| S9 | Proposed judgement | Existing research prompt is context, not evidence | My judgement; instructions are not facts | Local prompt; approved |
| S10 | Proposed judgement | Check underlying primary sources; do not inherit report recommendations automatically | My judgement; prevents unapproved thresholds and persona conclusions | Research; approved |
| S11 | Proposed judgement | Research relevant product families without committing to implement every product | My judgement; preserves R19 | Product evidence; approved |
| S12 | Proposed judgement | Seek two independent official lender examples per relevant family where available | My judgement; small comparison sample, not market coverage or an automatic fair-rate band | Personal, secured/productive, vehicle; approved |
| S13 | Proposed judgement | Research only approved topics; no applications, accounts, borrower submissions, lender contact, or broad competitor study | My judgement; bounded scope | Research; approved |
| S14 | Proposed judgement | Regulatory evidence supports applicable obligations; lender evidence supports that lender's terms | My judgement; neither automatically establishes borrower safety | Evidence interpretation; approved |
| S15 | Proposed judgement | Preserve conflicting source terms and scope; do not average them into a universal rule | My judgement; avoids false precision | Conflicts; approved |
| S16 | Proposed judgement | Record unavailable evidence; any later judgement needs rationale, limits, and approval | My judgement; honesty about gaps | Pending rules; approved |
| S17 | Mathematical derivation | Mathematical relationships require separate derivation and validation; no equation adopted at this stage | Correct arithmetic does not justify its empirical inputs | Calculations; deferred to analytical stage |
| S18 | Proposed judgement | Source verification and app-rule approval remain separate | My judgement; research establishes published observations only | Numerical adoption; approved |
| S19 | Status register | Stage 10 selects the baseline methods; Stage 11 ST1–ST92 select the complete stress, resilience, confidence, routing, and fixture specification in STRESS_TESTING.md | Sources and adopted judgements stay distinct | Stages 10–11 approved at specification level |
| S20 | Out-of-scope item | No calculation implementation, persona verdict selection, or approval-probability inference | Approved Stage 7 boundary | This stage |

### Citation contract for the final product

**Proposed judgement (approved through the user's explicit citation request):** Every substantive factual claim and important output number must be traceable. External claims cite a directly supporting checked source and its applicable period. Borrower facts identify the supplied answer; derived values identify the inputs and approved calculation rule; judgements identify this register's rule and say they are assessment assumptions. Do not invent an external citation for our own choice. UI placement and wording remain for the UX stage.

**Proposed judgement (approved):** Pending, unresolved, or superseded evidence cannot support an unconditional product claim. A source's “starting from” rate is not a personalized fair rate. Marketing phrases and calculator slider limits are not eligibility guarantees. Recheck time-sensitive claims before incorporating them into the final product; record the new access date rather than silently replacing observations.

## 2. Approved operational policies

These policies are approved and implemented within the supported Stage 15 browser scope. The linked stage documents retain the full definitions. “My judgement” identifies origin even where the user has approved it. O1 = verdict; O2 = borrowing amounts; O3 = pricing/APR; O4 = EMI, tenure, stress; Card = Negotiation Card.

| Rule ID / what | Classification | Value / behaviour | Why | Source or “my judgement” / approval reference | Applicability |
|---|---|---|---|---|---|
| P01 — Verdicts | Requirement from the brief | Borrow, Borrow less, Do not borrow are reachable with reasons | Support the actual borrowing decision | Assignment O1; [F5](PROBLEM_FRAMING.md), [R1](REQUIREMENTS.md) | O1 |
| P02 — Verdict meaning | Proposed judgement | Do not borrow applies under current assessed conditions; Borrow less needs a viable smaller purpose; insufficient evidence is not an adverse verdict | Avoid permanent labels and unusable smaller-loan advice | My judgement; [B6](PROBLEM_FRAMING.md); [O-D6–O-D9](OUTPUT_DEFINITIONS.md); [U17, U25, U39](UNCERTAINTY_POLICY.md) | O1, Card |
| P03 — Sanction versus safety | Requirement from the brief | Keep lender sanction and safe capacity separate | Access does not establish manageability | Assignment O2; [F6](PROBLEM_FRAMING.md), [R2](REQUIREMENTS.md) | O2 |
| P04 — Recommendation boundary | Proposed judgement | Recommended amount cannot exceed request or conservative capacity. The final safety amount uses the lower endpoint of the approved stress-aware capacity range, `S_stress_low`; NC6 fixes whole-rupee funding | Avoid using lender maximum or an unstressed maximum as the recommendation | My judgement; [F7](PROBLEM_FRAMING.md), [O-D12](OUTPUT_DEFINITIONS.md), [AV/NC](ANALYTICAL_RULES.md), [ST69–ST72](STRESS_TESTING.md) | O1, O2 |
| P05 — Question burden | Requirement from the brief | Approximately 8–10 must-questions; adaptive paths | Minimum useful assessment | Assignment question design; [R9–R10](REQUIREMENTS.md) | Questionnaire |
| P05a — Topic-count interpretation | Proposed judgement | Eight core topics plus up to two conditional topics; disclose individual subanswers separately. Q9 covers funding and purpose viability; Q1 clarifies relevant vehicle/mixed purposes | Make actual answer burden visible; the brief does not itself define questions as topics | My judgement; approved Stage 8 QD1–QD3 and subsequent audit corrections in [questionnaire design](QUESTIONNAIRE_DESIGN.md) | Questionnaire |
| P06 — Question relevance | Proposed judgement | Additional questions need a possible numerical/range effect; conditional purpose-viability confirmation counts within must-set | Prevent hidden compulsory optional questions | My judgement; [R12, R15, R36](REQUIREMENTS.md); [M23](OUTPUT_INPUT_MAP.md); [U14, U25, U39](UNCERTAINTY_POLICY.md) | Questionnaire, O1 |
| P07 — Units and income | Proposed judgement | INR with explicit periods; current net earnings separate from historical ranges, documented annual income, and projections; retain range and origin | Prevent incompatible inputs | My judgement; [D1–D8 and income fields](DATA_DICTIONARY.md) | O2, O3, O4 |
| P08 — Matched budget | Proposed judgement | Contributions net of outside commitments; match income to spending/debt paid from that budget; separate lender co-applicant obligations; count card spending/settlement once | Prevent double counting or mismatched households | My judgement; [M21](OUTPUT_INPUT_MAP.md); [household and debt boundaries](DATA_DICTIONARY.md); [U22](UNCERTAINTY_POLICY.md) | O2, O4 |
| P09 — History window | Proposed judgement | Latest 12 completed calendar months; preserve actual shorter coverage | Explicit common reference period, not a validated predictive window | My judgement; [D6](DATA_DICTIONARY.md). This approval predates research; it is not retrospectively relabelled an RBI requirement | Income history |
| P10 — Credit information | Proposed judgement | Score availability, formal history, and current debt are separate; no synthetic score | Missingness is not a score or absence of debt | My judgement plus brief's unknown rule; [credit fields](DATA_DICTIONARY.md), [U1, U18](UNCERTAINTY_POLICY.md); E05 corroborates the score distinction | O2, O3 |
| P11 — Missing data | Proposed judgement | Provided/unknown/not asked/not applicable remain distinct; per-output estimated/conditional/not estimable states; withhold core affordability if required financial facts cannot be bounded | Useful results without invented facts | My judgement implementing brief's unknown rule; [D3](DATA_DICTIONARY.md); [U1–U27, U39](UNCERTAINTY_POLICY.md) | All outputs |
| P12 — Range containment | Proposed judgement | Removing an answer preserves supported possibilities for the same scenario, method and reference rules with compatible remaining facts; disclose finite assumption bounds | Avoid false narrowing; separate corrections from removal | My judgement implementing brief's uncertainty requirement; [U28–U33](UNCERTAINTY_POLICY.md) | Numerical ranges |
| P13 — Confidence | Proposed judgement | Low/Moderate, per output; must-only estimates Low; no percentage or High; upgrades require approved method-specific conditions | Avoid statistical certainty claims and answer-count scoring | My judgement; [U34–U38](UNCERTAINTY_POLICY.md) | All estimated outputs |
| P14 — Productive and secured paths | Proposed judgement | Consider Ravi's secured/productive path; collateral does not create repayment income; partner/projected earnings are not automatic resources | Preserve purpose and repayment reality | My judgement; brief's Ravi routing requirement; [F11–F13](PROBLEM_FRAMING.md); [M20–M23](OUTPUT_INPUT_MAP.md); [U22–U24](UNCERTAINTY_POLICY.md) | O1–O4 |
| P15 — Cost and scenario integrity | Proposed judgement | Separate interest and APR, identify charge timing, keep requested and alternative scenarios distinct; Card reuses results | Comparable and explainable outputs | My judgement implementing brief O3/O4/Card; [O-D1–O-D5, O-D14–O-D23](OUTPUT_DEFINITIONS.md); [M12, M28–M30](OUTPUT_INPUT_MAP.md) | O3, O4, Card |
| P16 — Privacy | Proposed judgement | Answers only in browser memory; no storage, URLs, logs, analytics, or external transmission of answers | Implement brief's privacy limits | My judgement; [R21–R24](REQUIREMENTS.md) | Entire app |
| P17 — Validation and persona provenance | Proposed judgement | Deterministic numerical, directional, state, routing and documentation checks; supplied personas retain their missing facts; independent generic fixtures establish verdict reachability | Prevent fitting rules to desired persona answers while making the specification executable | My judgement; approved Stage 12; [validation strategy](../validation/VALIDATION_STRATEGY.md), [F14](PROBLEM_FRAMING.md), [R30–R33](REQUIREMENTS.md) | Validation |
| P18 — Stress and resilience | Proposed judgement | Always run separate 20% income-drop and 10% expense-rise cases for three months; run observed-income, floating-rate, fee, commitment, productive-income and distress cases only when their facts apply; combine shocks only when reported or contractually coincident | Provide a conservative, explainable decision without inventing correlation | My judgement; approved Stage 11; [ST1–ST76](STRESS_TESTING.md) | O1, O2, O4, Card |
| P19 — Distress precedence | Proposed judgement | Active repayment distress blocks positive ordinary-new-debt guidance. With usable core I/E/D it yields “Do not borrow under assessed conditions”; with missing core I/E/D, U17 keeps the overall assessment incomplete while a separate stabilization-first safety action says not to add ordinary debt | Preserve the approved unknown-data rule while responding safely to disclosed distress | My judgement; approved Stage 11; [ST57–ST65, ST75](STRESS_TESTING.md), [U17](UNCERTAINTY_POLICY.md) | O1, Card |

**Requirement from the brief:** Local startup under five minutes, phone usability, four days/12–16 expected hours, rules separated from UI, and four final deliverables remain binding through [R23–R29](REQUIREMENTS.md). The chosen written walkthrough is our approved judgement, not the only format permitted by the brief.

## 3. Checked evidence register

All E entries below are **researched observations**. “Checked” means relevant primary-source content was opened and read on **2026-09-06**, not that eligibility or regulatory applicability was certified. Unless stated, effective/update date was not supplied. Earlier “not adopted” notes in E01–E15 describe the original Stage 7 research state; section 6 explicitly records later adoption and limitations. No other observation becomes a rule automatically.

### E01 — RBI: KFS for Loans & Advances

- **Source:** [RBI circular DOR.STR.REC.13/13.03.00/2024-25](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0), paragraphs 2–11.
- **Dates/status:** Issued 15 April 2024; applies to new covered sanctions from 1 October 2024; accessed 2026-09-06; checked.
- **Supported claim:** Covered retail/MSME term loans require a KFS and APR computation with repayment schedule. APR includes lender charges and third-party charges recovered through the lender, including relevant insurance/legal costs. Unlisted charges require explicit consent. Credit-card receivables are excluded from this circular.
- **Limits/use:** Scope is the listed regulated entities and covered products; the prototype's Card is not a lender-issued KFS. This observation does not settle contingent charges, every tax, or annualization details. Linked: P15; A03, A04.

### E02 — RBI: Microfinance Directions, APR illustration

- **Source:** [RBI Microfinance Directions](https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx?id=12256), Annex II, Annex III and footnotes.
- **Dates/status:** Issued 14 March 2022; page identifies update through 17 July 2025; accessed 2026-09-06; checked.
- **Supported claim:** The illustration uses ₹20,000 principal, 24 monthly instalments, fixed 15% interest, ₹400 charges and ₹19,600 net disbursal. It reports ₹969.73 before instalment rounding, ₹970 displayed, and 17.07% APR. The footnote specifies IRR on net disbursal with reducing balance and explains repayment-total rounding differences.
- **Limits/use:** This is a published hypothetical fixture, not a market rate. Reproduce its convention before adopting an APR algorithm; do not infer a compounded-annual-rate formula from the label alone. The original KFS annex PDF endpoints did not return readable PDFs in this session; this official HTML provides the illustration. Linked: P15; A03, A10.

### E03 — RBI: Microfinance FAQ, scope and income

- **Source:** [RBI Microfinance FAQ](https://www.rbi.org.in/Scripts/FAQView.aspx?Id=147), questions 2–7 and 13.
- **Dates/status:** Updated 30 January 2025; accessed 2026-09-06; checked.
- **Supported claim:** The low-income-household definition uses annual household income up to ₹3,00,000. Hypothecated loans are not collateral-free microfinance loans, but the 50% household repayment limit also covers non-microfinance lending to these households by covered entities. The FAQ excludes expected earnings from the financed activity from microfinance household-income estimation. Household assessment does not require every member to be a borrower.
- **Limits/use:** This is not a universal safe-EMI ratio. Regulatory household assessment must not be silently equated to our contribution-based budget. Persona applicability has not been established. Linked: P03, P08, P14; A01, A05, A07, A12.

### E04 — RBI: Floating-rate EMI personal loans

- **Source:** [RBI circular on resetting floating interest rates](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12529&Mode=0), paragraphs 2–4.
- **Dates/status:** Issued 18 August 2023; accessed 2026-09-06; checked.
- **Supported claim:** For covered EMI-based floating-rate personal loans, lenders must consider repayment capacity and headroom for possible payment/tenure increases and communicate reset effects and options.
- **Limits/use:** Supports the relevance of rate stress, not a particular shock size or a rate-rise scenario for a fixed-rate contract. Product/legal scope still matters. Linked: P15; A06.

### E05 — TransUnion CIBIL: score and NA/NH

- **Source:** [CIBIL Contact Us FAQ](https://www.cibil.com/contact-us-faq), Consumer → Score related → NA/NH and new-score sections.
- **Dates/status:** Publication/update date not stated; accessed 2026-09-06; checked.
- **Supported claim:** The consumer score scale is 300–900. NA/NH can reflect insufficient history, inactivity, or add-on-card-only exposure. CIBIL describes these as different from a bad score, while noting some lenders' policies exclude applicants without a credit track record.
- **Limits/use:** Borrower ignorance of a score is not a verified NA/NH result. No approval assurance or universal score cutoff follows. Commercial CIBIL Rank is a different measure. Linked: P10, P11; A02, A05.

### E06 — HDFC Bank: personal-loan rates and charges

- **Source:** [HDFC personal-loan rates and charges](https://www.hdfc.bank.in/personal-loan/interest-rates-and-charges), rack-rate table and April–June 2026 disclosures.
- **Dates/status:** Page title identifies September 2026; no exact effective date for rack table; accessed 2026-09-06; checked.
- **Supported claim:** Salaried rack interest: 9.99%–24.00%; processing up to ₹6,500 plus GST; state-dependent statutory charges. Separately, April–June 2026 reported IRR was 9.97%–24.06%, average 10.89%; APR was 9.99%–33.94%, average 11.18%.
- **Limits/use:** Published rack terms and historical portfolio observations are different datasets. Neither supplies Priya's personalized fair band or matched borrower-level interest/APR pairs. Linked: P15; A02, A04.

### E07 — ICICI Bank: personal-loan rates and charges

- **Source:** [ICICI personal-loan interest rates](https://www.icici.bank.in/personal-banking/loans/personal-loan/personal-loan-interest-rates), latest-rate table, quarterly disclosure, notes.
- **Dates/status:** Page labelled 2026; table effective date not specified; historical period April–June 2026; accessed 2026-09-06; checked.
- **Supported claim:** Published interest range 9.99%–16.50% annually; processing up to 2% plus taxes. Historical quarter shows the same endpoints and mean 11.45%. Notes make pricing customer-dependent and terms revisable.
- **Limits/use:** No app fair-rate band is adopted. A displayed MCLR table is not sufficient to classify an individual contract as floating. Fees may extend beyond the processing entry. Linked: P15; A02, A04.

### E08 — SBI: personal-loan eligibility

- **Source:** [SBI Personal Loan](https://sbi.bank.in/web/personal-banking/loans/personal-loans/sbi-personal-loan), eligibility and documents.
- **Dates/status:** Page last updated 6 May 2026; accessed 2026-09-06; checked.
- **Supported claim:** This scheme requires an SBI salary-package account and specified employment categories. It publishes minimum net monthly salary ₹20,000 for government/defence and ₹25,000 for corporate employees; maximum amount is constrained by ₹50 lakh, 30 times NMI and EMI/NMI up to 65%. It requests salary/account evidence.
- **Limits/use:** These are scheme-specific lender limits, not borrower-safe thresholds, a general FOIR standard, or proof that Priya has the required banking relationship. No exact credit acceptance rule was verified. Linked: P03; A01, A05.

### E09 — Tata Capital: secured business loan

- **Source:** [Secured Business Loan / micro-LAP URL](https://www.tatacapital.com/business-loan/micro-loan-against-property.html), product terms, purposes, evidence and FAQs.
- **Dates/status:** Effective/update date not stated; accessed 2026-09-06; checked with internal presentation conflict.
- **Supported claim:** Product section: ₹3–25 lakh, 12–180 months, ROI 13%–26%, APR 14.25%–36.5%. Purposes include trade, working capital and equipment. Assessment may use bills/registers/notebooks or ITR/GST/bank statements; property papers and co-applicants are required.
- **Limits/use:** Calculator limits differ from the product section; do not use slider endpoints as policy. Advertised APR lacks borrower-specific cash flows; fees remain unverified. Geography, collateral acceptance and Ravi's actual eligibility remain unconfirmed. Linked: P14; A02, A04, A05, A07.

### E10 — Bajaj Finance: loan against property

- **Source:** [Bajaj Finance LAP product page](https://www.bajajfinserv.in/loan-against-property-new), features, eligibility and charges.
- **Dates/status:** Effective/update date not stated; accessed 2026-09-06; checked with internal rate conflict.
- **Supported claim:** Business expansion is an allowed stated use; self-employed applicants are included; tenure up to 15 years. One section states 8%–14% floating interest; another and the fee table state 7.5%–14.25%, fixed or floating. Processing is up to 3.54% and documentation up to ₹2,360, both tax-inclusive. Income, property, business and bank-statement evidence are requested.
- **Limits/use:** Preserve the conflicting rates; do not resolve them by averaging. Flexi variants have additional charges. The page calls 700+ CIBIL “ideal,” not a verified universal rejection boundary. Shop acceptance, location and actual terms remain unconfirmed. Linked: P14, P15; A02, A04, A05, A07.

### E11 — HDFC Bank: EV-bike product page

- **Source:** [HDFC EV Bike Loan](https://www.hdfc.bank.in/ev-bike-loan), benefits, fees, eligibility and income documents.
- **Dates/status:** Effective/update date not stated; accessed 2026-09-06; checked with presentation conflicts.
- **Supported claim:** Advertised interest starts at 14.50% annually; stated tenure 12–48 months. Salaried age 21–60 and self-employed age 21–65; income ₹3 lakh annually; self-employed business duration 2+ years. Processing up to 2.5%, documentation up to 2.25%, RC collection up to ₹850. Listed income evidence includes salary slips/Form 16 and bank statements.
- **Limits/use:** E12 differs on documentation/collection charges; calculator tenure also differs from stated benefits. The page does not establish Anita's acceptance with existing app loans or a bounced EMI. Linked: P15; A02, A04, A05, A07.

### E12 — HDFC Bank: EV-bike fee schedule

- **Source:** [HDFC EV-bike fees and charges](https://www.hdfc.bank.in/ev-bike-loan/fees-and-charges), opening fee table and quarterly disclosure.
- **Dates/status:** Fee effective date not stated; historical period April–June 2026; accessed 2026-09-06; checked with cross-page conflict.
- **Supported claim:** Processing up to 2.5%, documentation up to 2%, PDD collection up to ₹500; state statutory and actual RTO charges. A processing waiver has MSE/URC conditions. The quarterly two-wheeler category reports IRR 9.99%–25.02% and APR 10.46%–34.45%.
- **Limits/use:** Those quarterly figures are not explicitly EV-only or matched to Anita. E11 supplies different fee entries; neither is silently selected. Tax inclusivity and offer-specific charges require confirmation. Linked: P15; A02, A04.

### E13 — SBI: two-wheeler scheme eligibility

- **Source:** [SBI Two-Wheeler Loan Scheme](https://sbi.bank.in/web/personal-banking/loans/auto-loans/sbi-two-wheeler-loan-scheme), Features and Documents.
- **Dates/status:** Page last updated 16 February 2026; accessed 2026-09-06; checked.
- **Supported claim:** Includes RTO-registered electric two-wheelers. Published limits: 85% of on-road price, ₹50,000–₹3 lakh, up to six times net monthly income, up to 60 months; EMI/NMI up to 60% for existing salary-package customers and 50% for others. Non-salaried applicants are asked for 12 months' bank statements and latest one-year ITR/GST returns.
- **Limits/use:** Published constraints do not prove eligibility for an informal borrower or set safe capacity. E14/E15 supply separate rate/fee observations. Linked: P03, P14; A01, A05, A07.

### E14 — SBI: auto-loan interest table

- **Source:** [SBI Auto/Vehicle Loan Interest Rates](https://sbi.bank.in/web/interest-rates/interest-rates/loan-schemes-interest-rates/auto-loans), scheme summary row.
- **Dates/status:** Opened page last updated 18 August 2026; accessed 2026-09-06; checked. Search metadata showed an older July date; the opened page date is recorded here.
- **Supported claim:** Two-wheeler scheme rate 11.70%–15.70%, with a stated 0.50-percentage-point electric-two-wheeler concession.
- **Limits/use:** No individual rate or automatic eligibility follows. The same page contains car-specific score tables: do not reuse them for scooters. No concession-adjusted app band has been adopted. Linked: P15; A02, A07.

### E15 — SBI: processing-fee schedule

- **Source:** [SBI Processing Fees](https://sbi.bank.in/web/interest-rates/interest-rates/processing-fees), Auto Loan Scheme table.
- **Dates/status:** Page last updated 19 August 2026; accessed 2026-09-06; checked.
- **Supported claim:** Two-wheeler processing fee is 3% plus GST, with 50% waiver for salary-package customers.
- **Limits/use:** This is not the complete APR fee set and does not establish Anita's waiver eligibility. An older search result from the legacy domain showed a different fee; it is not the current baseline. Linked: P15; A04.

### Research coverage

**Proposed judgement (approved S12, completed):** The sample contains two independent lender examples for personal-loan pricing (E06/E07), secured/productive paths (E09/E10), and electric/two-wheeler finance (HDFC E11/E12 versus SBI E13–E15). E08 adds an explicit lender-affordability example. E01–E05 cover disclosure, an APR fixture, regulatory scope, rate stress and credit interpretation. This meets the agreed research sample, not a market-coverage or individual-sanction claim.

## 4. Conflicts, access limits, and prohibited inferences

Every entry is an **open question** or explicit evidence-use limitation; none authorizes a new numerical rule.

| ID | Evidence issue | Treatment / resolution needed |
|---|---|---|
| C01 | E11/E12 fee mismatch | Checked but unresolved. Retain each page's own entries; no average or silent preference. Confirm applicable terms before using an offer-specific value. |
| C02 | E09 product terms versus calculator | Slider limits are not eligibility policy. PC1 later adopts the product-text amount limits for an illustrative scenario; this does not establish named-product eligibility. |
| C03 | E10 internally conflicting rate descriptions | Checked but unresolved. Do not choose a fair-rate band from either section without an approved rationale and applicable terms. |
| C04 | Legacy SBI processing-fee search result | [Legacy page](https://sbi.co.in/web/interest-rates/interest-rates/processing-fees) appeared in search with an older update and different fee. Candidate/search evidence only; not opened for full verification and not adopted. E15 is the checked newer observation. |
| C05 | KFS annex PDF access | [Annex A](https://rbidocs.rbi.org.in/rdocs/content/pdfs/CIRCULARKFS1504242_A.pdf) and [Annex B](https://rbidocs.rbi.org.in/rdocs/content/pdfs/CIRCULARKFS1504242_B.pdf) did not yield readable PDF content through the web tool. Do not claim those PDFs were read. E01 establishes circular content; E02 supplies the official HTML illustration. |
| C06 | Historical range versus personalized rate | Portfolio extrema/means do not establish a person's fair rate; neither do product headline minima. No normalization or pooling into app bands has occurred. |
| C07 | No universal safe-affordability threshold established | This bounded review did not establish one. E08/E13 are lender scheme constraints; E03 is scoped regulation. Safe thresholds still require a labelled judgement or appropriate evidence and approval. |
| C08 | Sanction and income-recognition gaps | Published evidence requirements do not reveal all underwriting rules. No universal cash-income haircut, co-applicant acceptance rule, or credit-unknown approval probability was established. |
| C09 | Regulatory applicability | Relevant source sections were checked, but this is not an exhaustive amendment/consolidation review or a certification of the app's legal status. Recheck applicable current instructions when adopting a legal claim. |
| C10 | Persona prerequisites | No source fills missing household expenses, monthly EMIs, willingness to pledge, or productive net-income estimates. Additional persona assumptions remain separately approvable; no persona was run or assigned a verdict. |

**Proposed judgement (approved S8–S10):** [The earlier local report](../research/BORROWER_COPILOT_RESEARCH_REPORT.md) was used to locate candidate sources; its numerical recommendations and conclusions are not adopted. [The research prompt](../research/ASTRA_RESEARCH_PROMPT.md) is context only. Unused search results, old PDFs and third-party summaries are not silently promoted to checked sources.

## 5. Analytical decision status after Stage 10

The A entries below retain the original decision inventory. The following status table supersedes their original blanket “Not selected—requires approval” status. Evidence is not automatically sufficient to justify a value; section 6 records adopted choices and their origin.

| Candidate | Current resolution |
|---|---|
| A01 | C/L/IR/ID/PC approve separate baseline borrower and lender methods; ST1–ST76 approve stress-aware safety |
| A02 | RT approves broad references; no numerical score/occupation pricing adjustment |
| A03 | Calculation design, FF and NC approve monthly repayment/APR conventions, scope and precision |
| A04 | FF and BF approve fee mechanics and explicit conditional no-offer packages; actual unbounded unknown charges remain unresolved, not silently estimated |
| A05 | IR approves supported J and no haircut; Q3 collects minimum evidence, Q6 applicant debt |
| A06 | ST1–ST76 approve the common and triggered shocks, resilience treatment, commitments and verdict effects; Stage 12 executes their fixtures and invariants |
| A07 | PC/RT approve illustrative products, limits, security, age and baseline tenure comparisons; named eligibility is not certified |
| A08 | AV/NC approve baseline candidate, funding, range and disagreement rules; ST66–ST76 approve final stress-aware verdict integration |
| A09 | ST77–ST84 approve output-specific Low/Moderate confidence conditions; no High or percentage confidence |
| A10 | NC8 specifies numerical tolerances; Stage 12 implements and executes the baseline, V11, directional, state, confidence, routing and documentation checks |
| A11 | Stage 12 validates supplied persona provenance/routing without supplementing missing facts; final deliverable run-throughs remain later work |
| A12 | Current income excludes projections; ST49–ST56 approve delayed/no-upside productive cases. Regulatory household applicability is not established and cannot be claimed from the contribution budget |
| A13 | ID settles baseline irregular spending/debt and arrears recording; ST57–ST65 approve distress consequences and U17 precedence |

### Original decision inventory (historical questions)

| Candidate ID / what | Why a decision remains | Evidence / existing policy | Affected output |
|---|---|---|---|
| A01 — Safe ceiling and lender-affordability rules | Separate borrower safety from product-specific sanction constraints; define which obligations each ratio includes | P03, P04, P08; E03, E08, E13 | O1, O2, O4 |
| A02 — Fair-rate bands and profile adjustments | Define comparable product cohorts and how unknown credit changes ranges; no borrowed marketing minima | P10–P12; E05–E07, E09–E14 | O3 and capacity conversion |
| A03 — APR and repayment convention | Reproduce E02, settle annualization, rounding, timing and supported structures; no formula chosen here | P15; E01, E02 | O3, O4 |
| A04 — Fees and unknown-fee bounds | Set applicable taxes, deductions, financed/recurring charges, contingent-cost disclosure and complete fee coverage | E01, E06, E07, E09–E12, E15; C01, C03 | O3, O4, funding gap |
| A05 — Income recognition and credit uncertainty | Documentation-specific lender assumptions need justification; no automatic penalty for unknown data | P07–P11; E05, E08–E10, E13 | O2, O3 |
| A06 — Resilience and stress | ST1–ST76 select the common and triggered scenarios, reserve/commitment treatment, aggregation and verdict effects | P11–P15, P18–P19; E04; [Stage 11](STRESS_TESTING.md) | O1, O2, O4 |
| A07 — Supported product paths and tenure | Select relevant products, collateral/down-payment constraints and eligibility checks; resolve fewer than two feasible tenures | P14, P15; E09–E14 | O1–O4 |
| A08 — Recommended amount and scenario disagreement | Resolved by AV plus ST66–ST76 without overriding the conservative boundary or purpose viability | P02, P04; U25, U32, U33 | O1, O2 |
| A09 — Confidence upgrade conditions | Resolved by ST77–ST84 with method-specific conditions and no answer-count shortcut | P13; U34–U38 | All estimates |
| A10 — Numerical and directional validation | Establish calculation fixtures, tolerances, zero/unknown distinctions and fixed-scenario invariants | P17; E02; R31 | Validation |
| A11 — Persona supplements | Approve additional scenario inputs separately from supplied facts | P17; C10 | Three run-throughs |
| A12 — Productive-income and regulatory household scope | Productive-income stress is resolved by ST49–ST56; regulatory scope remains a claim limitation, and the contribution budget is not equated with regulatory household income | P08, P14; E03 | O1, O2, O4 |
| A13 — Irregular spending/debt and distress | Monthly treatment is resolved by ID; distress consequences and missing-core precedence are resolved by ST57–ST65 and ST75 | P07, P08, P11, P19 | O1, O2, O4 |

## 6. Adopted Stage 10 rules

All rows below are **approved** by the user's Stage 10 handoff or explicit approvals in this continuation. Values are conditional prototype policies, not verified underwriting. The [analytical specification](ANALYTICAL_RULES.md) preserves every individual rule, equations, edge cases, fixtures and the original 15-stage roadmap. O1 = verdict; O2 = amounts; O3 = rates/APR; O4 = monthly ceiling/tenure/stress. Stage 11 applies the additional stress rules in section 7.

| Rule / what | Value or behaviour | Why | Source or “my judgement” | Outputs |
|---|---|---|---|---|
| Calculation design — EMI | M=P*r/(1-(1+r)^(-n)); r=a/12; zero interest P/n; explicit flat interest P*a*n/12 | Match disclosed rate basis | Mathematical derivation; approved handoff | O2–O4 |
| Calculation design / NC4 — APR | N=sum(C_t/(1+j)^t); APR=12j; positive net benefit; complete supported cash flows | Cost includes charge timing; avoid effective-annual substitution | Mathematical derivation and adopted convention; E01/E02 | O3 |
| Calculation design — scope | One disbursement, monthly reducing/explicit flat, current-rate floating baseline; exclude revolving new credit, multiple disbursements, moratoria, irregular instalments, balloons | Prevent silent conversion of unsupported terms | My judgement; handoff | O2–O4 |
| C1–C3 — base ceiling | max(0,min(0.35I-D,0.90I-E-D)) for positive I | Debt allocation plus budget headroom; 10% is not savings | My judgement; no RBI/lender-safe threshold asserted | O1/O2/O4 |
| C4–C8 — resources and status | Confirmed current resources only; same ratios across income types; non-positive I → zero capacity; missing core facts → unavailable; Low confidence | No projections/reserves/occupation penalty | My judgement; approved budget and uncertainty policy | O1/O2/O4 |
| L1–L4 — lender lens | Three internally consistent illustrative scenarios; J separate from household I; no named approval | Lender access differs from affordability | My judgement; approved handoff | O1/O2 |
| L ratios — repayment allowance | max(0,beta*J-D_L); personal beta 40–45%, property 40–50%, vehicle 50% | Illustrative lender constraints; property ratio least supported | My judgement, not universal ratios; handoff notes personal guidance and E13 context | O2 |
| L5–L6 / ID6 — applicant debts | Q6 confirms all applicant/co-borrower obligations including others' payments; separate amount if different | Household outflow can omit applicant obligations | My judgement | O2 |
| L7–L8 — participation | Required security participation separate from optional income; no blanket spouse condition for illustrative model | Avoid importing another person's income or named-product rules | My judgement; E09 conditions only for named comparison | O1/O2 |
| RT — interest references | Personal 9.99–24%; property 13–26%; electric 11.20–15.70%, annual nominal reducing | Broad scenario references, not personalized fair-rate promises | E06/E09/E14 inform approved model choices | O2–O4 |
| RT — rate interpretation | No numerical score discount; review out-of-band basis/fees without declaring unfairness; higher rate lowers fixed-payment capacity | Avoid unsupported personalization | My judgement / mathematical direction | O2/O3 |
| RT — tenure | Personal/property 36 vs 60 months; vehicle 24 vs 36; short baseline absent preference; show 2/1/0 feasible options honestly | Comparable payment/total-cost trade-off, no automatic extension | My judgement | O1–O4 |
| IR1–IR4 — supported income | J = identified-record-supported monthly net income, conditional on lender acceptance; partial support allowed; no cash/informal haircut | Record routes do not establish recognition percentages | My judgement; E08/E09/E13 evidence context | O2 |
| IR5–IR8 — evidence handling | Q3 asks records, amount support, period; unknown J not zero. Annual /12 only with compatible definition/period/current confirmation; no persona assumptions | Baseline dependency explicit; preserve units and uncertainty | My judgement | O2 |
| FF1/FF4 — charge mechanics | B=P-F_f-F_d; N=B-F_u; mutually exclusive fee categories; same-time convention; seller disbursal counts as funding | Count each charge once; distinguish principal/proceeds/benefit | Mathematical derivation, E01; timing assumption is judgement | O2/O3 |
| FF2 — processing before GST | Personal ₹0–₹6,500; property 0–3% of contractual P; vehicle 3% P | Consistent scenario references; lower zero not promised waiver | E06/E16/E15; endpoints and property P basis are my judgement | O2–O4 |
| FF3 — tax | 18% on ordinary taxable processing; no duplicate tax on inclusive fees; do not tax every charge or ordinary term-loan interest automatically | Tax applicability differs by charge | E17; scenario application approved | O2/O3 |
| FF5–FF6 — funding | gap=max(0,K-B-max(0,O-U)); separately check O<U; no automatic request increase | Own funds pay fees and down payment once | Mathematical derivation / my judgement | O1/O2 |
| FF7 — recurring charges | Constant charge q leaves max(0,C_base-q) for EMI; variable charges checked each month | Total outflow, not EMI alone, must fit | Mathematical derivation / my judgement | O2/O4 |
| FF8 — unknown actual fees | No universal invented bound; actual APR incomplete unless complete fees or defensible approved bounds | Do not disguise missing charges as zero | My judgement implementing U26 | O1–O4 |
| PC1–PC2 — product principal limits | Personal ₹50,000–₹25 lakh; property ₹3–₹25 lakh; vehicle ₹50,000–₹3 lakh; never raise capacity to minimum | Limited credible scope; no forced extra debt | Personal limits my judgement; E09/E13 inform other model limits | O1/O2 |
| PC3 — vehicle | min(P_repayment,6J,0.85 on-road price,₹3 lakh); new registered electric vehicle; at least 15% separate funding before fees/other constraints | Apply constraints together; mixed purpose total is not vehicle price | E13-informed model choice; financed fees occupy cap | O1/O2 |
| PC4–PC5 — property | 50% reported V; unencumbered applicant-owned property and relevant owners willing; charged property unsupported, unknowns unresolved | Limit reliance on collateral without treating it as income | My judgement; 50% not sourced Tata LTV or empirical guarantee | O1/O2 |
| PC6 — age | Entry/final repayment: personal 21/60; property 21/65; vehicle 18/65; unknown-birthday boundary conditional | Explicit illustrative maturity constraints | My judgement; E18/E13 inform entry context, not adopted maturity rule | O1/O2/O4 |
| PC7–PC8 — applicability | No occupation/score cutoff or hidden named-lender evidence requirement; lender max=min(repayment and applicable constraints) | Do not certify eligibility or cap displayed household capacity at lender maximum | My judgement | O1/O2 |
| ID1–ID3 — recurring spending | Cost per recurring cycle / months per cycle; no duplicate provision; upcoming exceptional expense/timing separate | Monthly budget does not establish accumulated cash | My judgement / arithmetic | O2/O4 |
| ID4–ID6 — debt calendar | Required payments, not balances; sum by calendar month then max across tenure for D and D_L separately; known current monthly payment assumed to continue if no end known | Avoid hiding peak payments or adding non-coincident individual peaks | My judgement | O2/O4 |
| ID7–ID8 — arrears/clarification | Agreed catch-up payments included once; unresolved arrears not spread over invented term; confirm pre-EMI income reconstruction | Baseline arithmetic does not resolve distress | My judgement | O1/O2/O4 |
| AV1–AV4 — amount | Candidate=min(R,S_low,L_low) if available; borrower-only min(R,S_low) conditional on access; smallest feasible principal funding agreed plan | No surplus borrowing or unusable smaller loan | My judgement | O1/O2 |
| AV5 — requested ranges | No midpoint; assess full/partial/no support; no invented point when only range justified | Preserve input uncertainty | My judgement | O1/O2 |
| AV6–AV7 / AV9 — verdict | Missing core → incomplete; requested/smaller supported → baseline Borrow/Borrow less; known infeasibility → Do not borrow; disclose disagreement; Stage 11 required before final positive advice | Unknown is not adverse; alternatives visible | My judgement | O1/Card |
| BF1–BF3 — complete benchmark package | Additional tax-inclusive upfront budgets: personal ₹0–₹3,000; property ₹10,000–₹25,000; vehicle ₹0–₹3,000, plus FF processing; never double-add represented costs | Explicit fee sensitivity; property needs larger allowance for legal/security work | My judgement only: not market ranges, statistical bounds or statutory caps | O1–O4 |
| BF4–BF6 — benchmark conditions | All fees deducted at disbursement; no financed/recurring fees; first payment after one month; no contingent event; conservative funding uses larger fee; all dependent results conditional/Low | Fully specified model, not actual-offer completeness; removal preserves known possibilities | My judgement | O1–O4 |
| NC1–NC3 — consistency/capacity | Reconcile quote without repair; inverse reducing capacity M*(1-(1+r)^(-n))/r, zero M*n, flat M*n/(1+a*n/12); complete compatible scenarios first | Algebra and range integrity | Mathematical derivation / my judgement | O2–O4 |
| NC5 — quoted schedule | Supported complete quoted schedule can establish APR despite unclear advertised rate basis; do not overwrite EMI | Cash-flow cost differs from rate-label consistency | Mathematical basis / my judgement | O3/O4 |
| AV8 amended by NC6 | floor(candidate maximum), ceil(minimum funding need); recheck fees/gap/limits at selected amount | Flooring a requirement can create an avoidable funding gap | Mathematical rounding / approved correction | O1/O2 |
| NC7–NC8 — precision/checks | Whole-rupee principal/ceiling, repayment/charges 2 decimals where needed, rate/APR 2 decimals; internal precision retained; ₹0.01 monetary and 0.001 pp APR acceptance tolerance | Display must not change feasibility; no tolerance authorizes exceeding cap | My judgement; E02 numerical fixture | All / validation |

### Stage 10 evidence supplements

These source sections were opened during this continuation on **6 September 2026**. They supplement the original observations without replacing conflicts or certifying applicability. No exact effective date was stated for E16/E18 or the E17 webpages. E06/E09/E13/E15 were also revisited during calibration.

| ID | Publisher / direct source | Checked observation and scope | Limitation / adopted use |
|---|---|---|---|
| E16 | Tata Capital, [LAP rates and charges — Secured Business Loan section](https://www.tatacapital.com/loan-against-property/rates-and-charges.html) | Secured-business section lists processing up to 3%, legal/valuation ₹4,000 (additional property extra), documentation up to ₹1,999, registry filings ₹50/₹100 by loan size, and stamp duty at actuals | Do not import general LAP section's different values; not a complete personalized schedule. FF2 adopts processing reference with explicit model basis; BF's combined allowance remains judgement, not these line items added twice |
| E17 | CBIC, [service rate schedule, heading 9971](https://cbic-gst.gov.in/hindi/gst-goods-services-rates.html) and [banking sector FAQs](https://cbic-gst.gov.in/sectoral-faq.html) | General relevant financial-services category lists 18%; FAQs distinguish ordinary loan interest exemption from taxable service fees | FF3 applies to ordinary taxable processing, not every charge; inclusive fees not taxed again; insurance/statutory applicability not inferred |
| E18 | HDFC Bank, [personal-loan eligibility](https://www.hdfc.bank.in/personal-loan/eligibility-criteria) | Published applicant age context 21–60; named eligibility includes employment/income conditions beyond age | PC6's maturity interpretation and property age limits are our judgement; no blanket HDFC approval or undisclosed mandatory job-history fields |
| E09 supplement | Tata Capital, [secured business product](https://www.tatacapital.com/business-loan/micro-loan-against-property.html) | Named product publishes co-applicant requirements, including spouse participation for married applicants | Keep named conditions visible if compared; our illustrative relevant-owner participation rule is different and explicitly labelled |
| E13 supplement | SBI, [two-wheeler scheme](https://sbi.bank.in/web/personal-banking/loans/auto-loans/sbi-two-wheeler-loan-scheme) | Published age 18–65, new registered vehicle, 85% on-road cap, six times monthly income, ₹50,000–₹3 lakh and up to 60 months; additional income/documents apply | Page dated 16 February 2026. PC adopts selected illustrative constraints, not named eligibility; maturity interpretation is judgement; annual evidence remains annual |

## 7. Adopted Stage 11 rules

| Rule / what | Value or behaviour | Why | Source or “my judgement” | Outputs |
|---|---|---|---|---|
| ST1–ST21 — income and expense stress | Always run a 20% income drop and a 10% expense rise, each for three months; if compatible history exists, also run the observed lowest-income month without treating it as a forecast | Cover the assignment's required adverse case and disclosed volatility | My judgement; [full specification](STRESS_TESTING.md) | O1/O2/O4/Card |
| ST22–ST38 — rate and fee stress | For applicable floating rates, add 2 percentage points and show same-tenure EMI plus same-EMI tenure effects; fixed contracts are excluded and unknown structures stay conditional. Apply disclosed/benchmark upfront and recurring fee effects without inventing unknown charges | Show contract-sensitive price risk and cash-flow effects | My judgement; E04 supports relevance only; [full specification](STRESS_TESTING.md) | O1/O2/O3/O4/Card |
| ST39–ST48 — reserves and commitments | Assess liquid reserves remaining after purchase/fees/earmarks and known commitments within 12 months; reserve coverage is contextual and never raises the recurring ceiling | Distinguish a temporary buffer from recurring repayment capacity | My judgement; [full specification](STRESS_TESTING.md) | O1/O2/O4/Card |
| ST49–ST56 — productive income | Run delayed-upside and no-upside cases; projected activity income can improve a separate outlook but never raises current safe capacity or the recommendation | Prevent hoped-for earnings from financing their own debt | My judgement; E03 is relevant scope evidence; [full specification](STRESS_TESTING.md) | O1/O2/O4/Card |
| ST57–ST65 — distress | Disclosed active arrears, required catch-up, restructuring/settlement or ongoing repayment shortfall blocks positive ordinary-new-debt guidance; a bounced payment alone is not assumed to be continuing arrears; U17 governs when core I/E/D is missing | Respond to current repayment harm without inventing distress or converting unknowns into an adverse verdict | My judgement; [full specification](STRESS_TESTING.md) | O1/O2/O4/Card |
| ST66–ST76 — aggregation and verdict | Compute each applicable scenario separately; `C_resilient` and the resulting `S_stress_low` use the lowest supported applicable capacity. Combine shocks only when facts say they coincide; apply purpose viability, lender access, funding and distress conditions after the stress boundary | Keep the result conservative, traceable and non-duplicative | My judgement and mathematical derivation; [full specification](STRESS_TESTING.md) | O1/O2/O4/Card |
| ST77–ST84 — confidence | Confidence is output-specific Low or Moderate only. Moderate requires the method's complete current inputs and, where relevant, 12 months of variable-income evidence or complete reconciled actual offer terms; benchmark and lender-sanction outputs remain Low | Tie confidence to evidence quality rather than answer count | My judgement; [full specification](STRESS_TESTING.md) | All estimated outputs |
| ST85–ST92 — questions and routing | Activate only existing approved topics whose answers can change a number, range, scenario or safety route; omission of an optional trigger leaves that output conditional and does not invent zero | Preserve the 8–10 topic burden and adaptive design | My judgement; [full specification](STRESS_TESTING.md) | Questionnaire/all outputs |

The 20% income severity, 10% expense severity, three-month duration, 2 percentage-point floating-rate shock and 12-month commitment horizon are prototype sensitivities or horizons, not Indian statistics, forecasts, lender rules or regulatory limits.

## 8. Adopted Stage 12 validation rules

| Rule / what | Value or behaviour | Why | Source or “my judgement” | Scope |
|---|---|---|---|---|
| VA1–VA6 — oracle and precision | One deterministic offline Python-standard-library oracle; approved ₹0.01 money and 0.001-percentage-point APR tolerances; direct fixtures plus bounded sweeps | Make rules runnable without choosing the app architecture | My judgement; approved Stage 12; [full strategy](../validation/VALIDATION_STRATEGY.md) | Numerical validation |
| VA7–VA12 — state and routing | Preserve unknown/zero/not-applicable, per-output dependencies, range containment, verdict precedence, confidence conditions and value-of-information routing | Exercise non-numerical rules that can otherwise fail silently | My judgement; approved Stage 12 | Behaviour validation |
| VA13–VA14 — persona provenance | Assignment facts remain immutable; generic complete fixtures remain separate from Priya, Ravi and Anita | Avoid tuning or invented persona facts | My judgement; F14/R30–R33 | Persona validation |
| VA15–VA18 — failure and completion | Identify failed group/check and expected/actual values; no silent policy resolution; no network/dependencies/storage; complete only on zero exit | Keep validation reviewable and reproducible | My judgement; approved Stage 12 | Entire harness |

Run `python3 validation_checks.py` from the repository root. The integrated Stage 12 run passed **525 checks with zero failures** on 6 September 2026; category results and limitations are recorded in [VALIDATION_STRATEGY.md](../validation/VALIDATION_STRATEGY.md).

## 9. Stage 15 implementation traceability

| Implemented area | Rule source | Browser implementation |
|---|---|---|
| Adaptive panels and edit invalidation | P05–P06, ST85–ST92, BR1–BR16 | `questionRoute()` in `rules.mjs`; panel controller in `app.mjs` |
| Borrower and lender capacity | P03–P04, C1–C8, L1–L8, PC1–PC8 | `capacityRange()` and `lenderRange()` in `rules.mjs` |
| Income, expense, history and commitment stress | P18, ST1–ST21, ST39–ST48 | history/commitment scenarios aggregated into the resilient ceiling |
| Productive-purpose separation | P14, ST49–ST56 | productive metrics shown separately and excluded from safe capacity |
| Actual offer, APR, fees and floating-rate stress | P15, FF1–FF8, NC1–NC8, ST22–ST38 | supported quote cash flows, complete-fee gate and +2 percentage-point case |
| Distress and output states | P11, P19, ST57–ST76 | incomplete/distress precedence and per-output explanations |
| Negotiation Card | P15 and approved output definitions | rendered from the same `assess()` result as the detailed view |
| Privacy | P16 | static files, in-memory answers, explicit share/print only; no storage or network code |

`rules.test.mjs` exercises the integrated JavaScript paths. `validation_checks.py` preserves the independent specification oracle and checks the Stage 15 panel limit, route wiring, design tokens, reduced motion, and privacy boundary. The final Stage 15 run passed 547 checks with zero failures.

## 10. Verification and handoff

**Proposed judgement (approved):** Verification checks unique IDs, valid local links/anchors, complete source metadata, evidence-to-rule links, and separation of approved policies from pending values. A semantic review checks published numbers against their source sections and confirms that conflicts and scope limits remain visible. Link validity alone does not establish claim correctness.

Stage 7 and the pre-Stage-9 corrections were subsequently accepted. Stages 10–12 record the approved baseline, stress-aware methods and independent validation; Stages 13–15 define and implement the browser experience. No borrower data was submitted and no lender was contacted.

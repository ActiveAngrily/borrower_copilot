# Borrower Copilot: Research Report and Product Direction

**Research cut-off and source access date:** 5 September 2026  
**Geographic focus:** India, with selected international comparators explicitly identified  
**Purpose:** Evidence base for a no-login, no-bureau-pull, no-backend borrower self-assessment prototype

## How to read this report

This report distinguishes three kinds of statements:

- **Sourced fact** — a statement supported by a linked regulator, official product page, research paper, or other named source.
- **Interpretation** — a conclusion drawn by comparing sources. It is not itself a regulatory rule or a measured market statistic.
- **Design judgment** — a recommended product choice for this assignment. It must be validated before production use.

Product pages and market statistics change. Any rates, fees, product conditions, or ecosystem counts should be rechecked at the point of use. International sources are design comparators, not statements of Indian law.

---

## 1. Executive summary

Borrower Copilot should not try to imitate a lender's underwriting engine. The user is asking a different and more useful question: **“Is this debt likely to help me, can I sustain it when life is less favorable than expected, and what terms should I insist on?”** A lender primarily estimates whether a loan fits its policy and risk appetite. A borrower also needs to preserve rent, food, dependants' needs, emergency resilience, and the ability to absorb income or rate shocks. Those answers can diverge sharply.

The market scan found five recurring patterns:

1. **EMI calculators are ubiquitous but narrow.** Bank and public-interest calculators reliably show instalments and total repayment, but typically do not assess ability to repay. Australia's [Moneysmart calculator](https://moneysmart.gov.au/loans/personal-loan-calculator) states this limitation directly: its calculator excludes fees, does not consider ability to repay, and is not a prediction.
2. **Eligibility tools estimate lender willingness, not borrower safety.** They commonly ask age, income, existing EMIs, employment, credit score, tenure, and sometimes co-applicant details. Outputs are usually an estimated eligible amount, EMI, or acceptance probability. The criteria vary by lender and product, and the tool often also serves a lead-generation funnel.
3. **Secured and productive-purpose lending needs a different path.** A property or vehicle can improve lender comfort, but collateral does not create repayment capacity. Cash-flow evidence, seasonality, household withdrawals, and the economic return from the financed asset matter. This is especially important for informal or thin-file businesses such as Ravi's.
4. **Distress requires a safety override.** Recent missed payments, multiple high-cost short-term loans, or borrowing to repay borrowing should prevent a cheerful “eligible” result. The interface should first organize obligations, surface regulated support and complaint channels, and test any consolidation proposal on full cash flows rather than a lower EMI alone.
5. **Opaque scoring adds false precision in this prototype.** Without verified data, outcome labels, monitoring, and validation, a probability of default or personalized “fair” interest rate would be theatre. The more defensible prototype is a transparent hybrid of arithmetic, ranges, clearly named borrower rules, adaptive questions, and qualitative confidence.

The recommended product has two deliberately separate lenses:

- **Likely lender view:** a coarse, non-guaranteed indication based on product type, documented income, existing obligations, credit-file status if known, employment/business stability, collateral where relevant, and common lender documentation.
- **Borrower-safe view:** a conservative range based on residual cash after essential expenses and all debt payments, liquidity buffer, income variability, stress cases, loan purpose, and the consequences of failure.

The result should never collapse these lenses into one score. It should return one of three plain-language directions—**borrow, borrow less, or do not add debt now**—alongside the likely sanction range, borrower-safe range, all-in price illustration, base and stress repayments, assumptions, confidence, and a Negotiation Card. “Do not borrow now” must be presented as a protective result, not a personal failure.

The regulatory baseline reinforces this direction. The [RBI Digital Lending Directions, 2025](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12848&Mode=0) require regulated entities and their digital channels to disclose lender, amount, tenor, annual percentage rate, monthly obligation, penal charges, and a Key Facts Statement link for displayed offers; prohibit dark patterns; require a cooling-off period; restrict data access; and make the regulated entity responsible for its lending service provider. The [RBI Key Facts Statement circular](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0) defines APR as the annual cost of credit including interest and other charges, requires an amortization schedule, and prevents later charging of fees omitted from the KFS without explicit consent. These are lender duties, but they are excellent interface principles for a borrower tool.

Three cautions are essential:

- The RBI's 50% household repayment cap is specific to qualifying microfinance borrowers and certain low-income household exposures; it is not a universal Indian FOIR rule. The [RBI microfinance FAQ](https://www.rbi.org.in/commonperson/English/Scripts/FAQs.aspx?Id=3366) must not be generalized to Priya, Ravi, or Anita without first establishing scope.
- A missing credit score or “new to credit” status is not the same as bad credit. TransUnion CIBIL's [consumer report guide](https://www.cibil.com/content/dam/cibil/consumer/CIBIL-Report-Understanding.pdf) says NA/NH can simply mean insufficient or no recent credit history.
- Loan-to-value limits are collateral and prudential controls, not affordability findings. A loan can be well secured and still unsafe for the household.

For a 12–16-hour build, the smallest credible scope is one responsive, local-only flow with roughly 8–10 baseline questions and at most three short branches: salaried consumption, self-employed/productive or secured use, and existing-debt distress. It should contain deterministic EMI/APR/residual/stress calculations, explicit unknown states, three persona fixtures, and an exportable Negotiation Card. It should not attempt live lender matching, bureau or Account Aggregator integration, machine learning, an exact interest-rate prediction, user accounts, or storage.

---

## 2. Problem interpretation and research method

### 2.1 The decision being supported

The product is a **borrower-side decision aid before application**, not a loan offer, underwriting decision, financial-advice relationship, debt-settlement service, or regulatory-compliance substitute. It must answer four practical questions:

1. Should the user borrow for this purpose now, borrow less, change product, or pause?
2. What might a lender plausibly sanction, and why can that differ from a borrower-safe amount?
3. What is a defensible, dated price range for the relevant product, and what does the all-in APR become after fees?
4. What repayment structure survives an adverse but plausible month, and what trade-offs come with a longer tenure?

The proposed amount is therefore not the starting truth. It is one scenario to test. The product must also allow zero borrowing, a smaller amount, delay, a secured/productive route, or debt stabilization.

### 2.2 Evidence method

The research used this hierarchy:

1. Indian legislation, gazette notifications, and RBI directions/circulars;
2. official bureau, lender, Account Aggregator, and public-authority material;
3. recognized international public-interest or supervisory sources;
4. empirical and academic research;
5. product pages and vendor claims, used to describe market behavior rather than prove effectiveness;
6. design inference where evidence does not determine a single product choice.

The review covered regulatory disclosure and data rules; eligibility and EMI tools; personal, secured, vehicle, gold, and MSME lending; debt wellness; cash-flow underwriting; credit information; Account Aggregators; financial-well-being instruments; affordability concepts; decision automation; explainability; and model governance.

This was a structured landscape review, not a statistically representative census. “Common” in this report means observed repeatedly across the reviewed product categories and supported by examples; it does not mean measured market share. Product performance claims remain vendor-reported unless a separate evaluation is cited.

### 2.3 Four concepts that must remain separate

| Concept | Question | Primary perspective | Why separation matters |
|---|---|---|---|
| Eligibility | Does the applicant appear to meet stated entry conditions? | Lender/product policy | Passing conditions is not approval and says little about household resilience. |
| Credit risk | Is the borrower likely to repay as agreed? | Lender | Usually needs verified history, bureau or transaction data, outcome labels, and governance. |
| Affordability | Can repayment be made on time while essential commitments are met, without refinancing or harmful sacrifice? | Borrower and responsible lender | Requires expenses, residual cash, volatility, shocks, and household context, not income alone. |
| Suitability | Does this product, amount, purpose, price, and security make sense for this person now? | Borrower | A repayable loan can still be poor value, mistimed, or dangerous because of collateral consequences. |

The distinction between credit risk and affordability is also explicit in the UK's [FCA creditworthiness policy](https://www.fca.org.uk/publications/policy-statements/ps18-19-assessing-creditworthiness-consumer-credit): credit risk concerns the lender's loss; affordability concerns sustainable repayment without failing other reasonable commitments or needing further borrowing. This is a conceptual comparator, not Indian law.

---

## 3. Hard constraints and non-goals

| Constraint or non-goal | Product consequence | Failure if ignored |
|---|---|---|
| No login, backend, bureau pull, or personal-data storage | Calculate in the browser; provide reset/export controls; avoid identity fields | Security/privacy surface grows without improving the prototype's core decision. |
| Self-reported information | Use ranges, “unknown,” source labels, and contradiction checks | Exact-looking outputs imply verification that never occurred. |
| No silent defaults | Every missing input remains visible and changes confidence or blocks a claim | A guessed expense, rate, or score can reverse the recommendation. |
| Every number explained | Show formula, user inputs, assumptions, range/source date, and sensitivity | Users cannot challenge, reproduce, or negotiate from the result. |
| Indian context | Use Indian disclosure terms, RBI safeguards, local product paths, ₹, monthly cash flows | Imported thresholds or terminology mislead. |
| Three distinct personas | Branch only where their decisions genuinely differ | One generic form penalizes informal income and misses distress. |
| Separate likely sanction from safe amount | Two labeled outputs and two explanations | “The bank may lend it” becomes “I can afford it.” |
| No unsupported thresholds | Put thresholds in a transparent rules file with provenance and status | A design constant is mistaken for regulation or empirical truth. |
| No ML or probability theatre | Use deterministic calculations and qualitative evidence confidence | The prototype cannot train, validate, monitor, or fairly govern a model. |
| Not a lender directory or application funnel | Do not collect phone/PAN or rank offers for commission | Commercial incentives distort recommendations and add consent obligations. |
| Not debt settlement or legal advice | Offer neutral next steps and regulated channels, no promised savings | Distressed users may rely on unverified outcomes. |
| Not a production compliance determination | Add jurisdiction/date caveats and retain source references | Legal requirements and product terms evolve. |

---

## 4. Market landscape

### 4.1 Company and product inventory

The following inventory records what each product appears designed to do. It does not endorse products or reproduce time-sensitive rates.

| Category | Company/product | Intended user/problem | Inputs or data | Output/approach | Borrower Copilot lesson and limitation | Direct source |
|---|---|---|---|---|---|---|
| Bank eligibility | ICICI Bank Customer 360 | Cross-product eligibility | Age, employment/profile, net income, existing EMIs, education, co-applicant | Estimated eligibility and maximum tenure across home, land/construction, office, loan against property, top-up, and personal loans | Useful multi-product routing; still a lender-policy view, not a safe amount | [Official calculator](https://www.icici.bank.in/calculator/customer-360-eligibility-calculator) |
| Bank repayment | ICICI Bank personal-loan EMI calculator | Repayment illustration | Amount, interest rate, tenure | EMI and repayment schedule | Transparent arithmetic pattern; it does not ask whether the EMI is sustainable or include all charges | [Official calculator](https://www.icici.bank.in/personal-banking/loans/personal-loan/emi-calculator) |
| Bank pricing | HDFC Bank personal-loan rates and charges | Product price disclosure | Product/profile conditions | Rate information plus processing, stamp, bounce, and prepayment charges | Demonstrates why interest rate alone is insufficient and why official pages need a date stamp | [Official disclosure](https://www.hdfc.bank.in/personal-loan/interest-rates-and-charges) |
| Bank pricing | State Bank of India loan-scheme rates | Category-level current pricing | Product category | Published scheme/rate information | A primary price input, but “from” rates and page labels must not be treated as a universal attainable rate | [Official rate page](https://sbi.bank.in/web/interest-rates/interest-rates/loan-schemes-interest-rates) |
| Secured lending | Bajaj Finserv loan-against-property eligibility | Property-backed borrowing | Employment, income, obligations, property value | Tentative amount; final result subject to other criteria | Collateral and income both matter; a product marketing LTV is not a market rule or affordability result | [Official calculator](https://www.bajajfinserv.in/loan-against-property-eligibility-calculator) |
| Informal MSME/secured | Tata Capital micro loan against property | Small businesses with imperfect formal records | Property, bank/ITR/GST records or bills, registers and notebooks; co-applicant | Product assessment using property and repayment capacity | Strong example of accepting nonstandard evidence; putting livelihood property at risk still requires a severe downside warning | [Official product page](https://www.tatacapital.com/business-loan/micro-loan-against-property.html) |
| Gold-backed | Muthoot Finance gold loan/calculator | Short-term liquidity against gold | Weight, purity, lender assay, scheme | Estimated eligibility and repayment | Fast collateral route; final valuation is lender-controlled and RBI valuation/LTV rules supersede marketing shorthand | [Official product page](https://www.muthootfinance.com/gold-loan) |
| Rural/vehicle/SME | Mahindra Finance | Vehicle, equipment, rural and small-business finance | Product and applicant records | Product journey and standard EMI calculator | Purpose-specific path is useful; an amount/rate/tenure calculator still does not test household resilience | [Official site](https://www.mahindrafinance.com/) |
| Digital personal loan | Fibe personal loan and eligibility tool | Digitally originated unsecured credit, including some new-to-credit users | Age, income, expenses, score, pincode, employment/profile and documents | Estimated eligibility/EMI followed by application | Expense input and NTC access are useful patterns; methodology and performance claims are proprietary/vendor-reported | [Product](https://www.fibe.in/personal-loan/), [eligibility calculator](https://www.fibe.in/personal-loan-eligibility-calculator/) |
| Digital personal loan | Moneyview loans | App-based partner lending | Identity, profile, credit and application data | Digital application and partner offer | Illustrates partner-lender model and deletion/disclosure questions; it is an application funnel, not a private self-check | [Official FAQ](https://moneyview.in/loans-faq-en) |
| Digital personal loan | KreditBee | App-based unsecured credit | Identity, PAN, employment, income, company, address, education, family/reference, bank and document fields | Eligibility/application, KFS and offer | Useful contrast: production origination gathers much more information than the prototype needs; copying it would violate minimization | [Official product page](https://www.kreditbee.in/personal-loan) |
| MSME cash-flow lending | Kinara Capital | Small-business credit, including thin-file borrowers | Initial low-document screen; later KYC, income and bank evidence; alternative business factors | Eligibility followed by verification | Alternative evidence can expand access, but the quick screen is not the full underwriting decision | [Official product page](https://kinaracapital.com/msme-loans/) |
| GST/MSME lending | Lendingkart GST business loan | Formalizing small businesses | GST, financial statements, bank and bureau information with consent | Business-loan assessment | Shows how verified turnover/tax signals supplement self-report; integration and consent are outside prototype scope | [Official product page](https://www.lendingkart.com/gst-business-loan/) |
| Embedded MSME credit | Indifi Pay | Supplier/working-capital finance | Bank, GST, KYC and business access | Credit line/embedded financing | Product-purpose matching is valuable; repayment must be tested against business cash-conversion timing | [Official product page](https://www.indifi.com/indifipay) |
| Marketplace | Paisabazaar personal-loan eligibility | Compare potential lender matches | Age, amount, rate, term, income, existing EMI and profile | Estimated eligible amount, EMI, tenure and partner options | Good comparison vocabulary; results are indicative and the marketplace has lead/commission incentives | [Eligibility calculator](https://www.paisabazaar.com/personal-loan/eligibility-calculator/), [marketplace](https://www.paisabazaar.com/personal-loan/) |
| Marketplace | BankBazaar personal-loan eligibility | Eligibility comparison and application leads | Employment, employer, salary, pincode, phone/OTP and related profile data | Calculator plus lender criteria and offers | Demonstrates lender variation; generic thresholds on a marketplace are not authoritative rules | [Eligibility page](https://www.bankbazaar.com/personal-loan-eligibility.html) |
| Marketplace | Wishfin | Credit and loan comparison | Product/profile and lead information | EMI/score tools and offer comparison | Useful inventory pattern but not a neutral affordability assessment | [Official site](https://www.wishfin.com/) |
| Acceptance matching | MoneySavingExpert Credit Club/Loans Eligibility | Compare likely acceptance without a hard search | Borrower and household details plus soft credit search | Eligibility/acceptance probabilities and affiliate offers | Excellent distinction between acceptance and affordability; UK data/law and commercial affiliate model are not portable to India | [Loans eligibility](https://www.moneysavingexpert.com/eligibility/loans-calculator/search/), [Credit Club](https://www.moneysavingexpert.com/creditclub/) |
| Prequalification infrastructure | Experian prequalification | Lenders matching consumers to offers | Consumer consent and soft-inquiry credit data | Prequalified matching; not a firm offer | Shows what real probability/matching requires: consented bureau data and lender criteria absent from this prototype | [Official product page](https://www.experian.com/business/products/prequalification) |
| Credit education | TransUnion CIBIL report and score | Understand Indian credit-file signals | Bureau file | Score/report, factors and dispute guidance | Use score only when user knows it; make unknown/NA/NH neutral and explain that approval is not guaranteed | [FAQ](https://www.cibil.com/frequent-queries), [report guide](https://www.cibil.com/content/dam/cibil/consumer/CIBIL-Report-Understanding.pdf) |
| Credit improvement | CreditMantri | Report errors and repayment improvement | Credit report and account details | Dispute/repayment coaching | Relevant after rejection or errors; “settled” status can remain adverse, so distress advice must not imply a clean reset | [Official service page](https://www.creditmantri.com/credit-improvement-services/) |
| Score/wellness app | OneScore | Monitor and understand score | Credit/report and app/device data | Score analysis, planner, simulations | Explanations and simulation are useful; broad data processing is unnecessary for an anonymous calculator | [Terms](https://www.onescore.app/legal/cibiltnc/), [privacy policy](https://www.onescore.app/privacy/) |
| Debt relief | FREED | Users with unmanageable unsecured debt | Debts, payments and settlement enrollment data | Settlement/consolidation support for fees | Distress deserves a separate journey; savings are not guaranteed and settlement may damage credit history | [Official site](https://freed.care/), [FAQ](https://freed.care/faq) |
| Public repayment tool | Moneysmart personal-loan calculator | Understand repayment and early payoff | Amount, rate, fees/repayment assumptions | EMI/total repayment illustration | Best-in-class limitation language: not a prediction, excludes some fees, and does not assess ability to repay | [Government calculator](https://moneysmart.gov.au/loans/personal-loan-calculator) |
| Public loan guidance | Moneysmart personal-loan guide | Compare products and consequences | User-led comparison | Total-cost, fee, variable-rate and tenure guidance | Strong borrower perspective and disclosure of comparison-site commercial interests | [Government guide](https://moneysmart.gov.au/loans/personal-loans) |
| Financial well-being | US CFPB Financial Well-Being Scale | Measure control, security and shock resilience | Ten non-identifying questions | Score and contextual comparison; answers are not stored | Strong private, nonjudgmental question pattern; not an underwriting or affordability cutoff | [Official tool](https://www.consumerfinance.gov/consumer-tools/financial-well-being/), [research](https://www.consumerfinance.gov/data-research/research-reports/financial-well-being-scale/) |
| Offer comparison | US CFPB Loan Estimate | Compare mortgage terms | Standardized lender estimate | APR, fees, total interest, penalties and side-by-side checks | Standard labels and consistency checks translate well; US mortgage form/law does not | [Official guide](https://www.consumerfinance.gov/owning-a-home/loan-estimate/) |
| Borrowing guidance | UK MoneyHelper | Pre-application budget and support | Income, spending and credit context | Guidance and eligibility/budget distinction | Explicitly directs users with missed payments toward creditor/debt support before new borrowing | [Official guidance](https://www.moneyhelper.org.uk/en/everyday-money/credit/apply-to-borrow-for-credit-card-or-loan) |
| Decision infrastructure | Taktile | Lender credit-decision workflows | Integrated data, rules and models | Low-code testing, decision flows and oversight | Audit trails and versioned reason codes are useful; enterprise lender infrastructure is excessive here | [Vendor product page](https://taktile.com/credit-decision-automation) |
| Decision infrastructure | Provenir | Lender data/model/decision orchestration | Multi-source data and models | Automated decisioning/governance | Borrow the governance pattern, not the platform or vendor performance claims | [Vendor site](https://www.provenir.com/) |
| ML underwriting | Zest AI | Lender underwriting model | Credit and alternative data plus labeled outcomes | ML risk score, explanations and monitoring | Illustrates production requirements and explainability claims; impossible to reproduce responsibly without data and validation | [Vendor product page](https://www.zest.ai/product/underwriting) |
| Consent infrastructure | Account Aggregator ecosystem/OneMoney | Permissioned transfer of financial data | Explicit consent artefact and linked financial accounts | FIP-to-FIU data sharing via AA | Consent, purpose limitation and revocation are excellent patterns; integration is unnecessary for an anonymous prototype | [RBI AA direction](https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D10598%281%29.html), [OneMoney policies](https://www.onemoney.in/onemoney/policies/) |

### 4.2 What the landscape does well

- **Fast arithmetic:** amount–rate–tenure calculators make instalment trade-offs tangible.
- **Product routing:** multi-product and secured calculators recognize that purpose and collateral change the relevant product.
- **Progressive disclosure:** fast screens precede verification, reducing initial friction.
- **Standardized disclosures:** KFS/APR and public offer-comparison tools support side-by-side comparison.
- **Soft or alternative evidence:** bureau soft searches, cash-flow data, tax records, and business records can serve thin-file users in production systems.
- **Specialized distress paths:** debt-help products recognize that applying for another ordinary loan is not always the next step.

### 4.3 Persistent gaps

The reviewed products rarely combine lender likelihood, household affordability, product suitability, uncertainty, and full-cost negotiation in one neutral flow. Calculators often omit fees and shocks; lender tools optimize for their products; marketplaces optimize for matches and leads; debt services intervene after distress; and sophisticated underwriting tools serve institutions, require data integrations, and are not intelligible borrower tools.

**Interpretation:** Borrower Copilot's credible niche is not a better approval calculator. It is the connective layer that says which question is being answered, shows where the evidence is weak, and makes a safe “less” or “not now” recommendation as usable as an approval-like result.

---

## 5. Comparison of assessment approaches

### 5.1 Rule-based eligibility and ratio screens

**Decision supported:** Does the applicant appear to fit broad lender or product criteria?  
**Typical data:** age, geography, income, employment type/tenure, existing EMI, requested amount/tenure, score band, and sometimes collateral.  
**Logic:** minimum/maximum conditions plus a debt-obligation ratio and product rules.

This is the dominant visible approach in eligibility tools because it is fast, explainable, and easy to implement. Its objectivity is limited by the rule definitions: gross versus net income, whether rent is included, treatment of credit-card minimums, irregular income, household commitments, and what counts as “fixed” all vary. A ratio can be arithmetically exact while its category choices remain policy judgments.

For Borrower Copilot, ratios are useful **descriptors and guardrails**, not universal pass/fail law. Show the numerator and denominator. Never present a market heuristic as “RBI allows this much.” The RBI's 50% limit is binding only in the microfinance scope described in Section 7.

### 5.2 Bureau scores and behavioral scorecards

**Decision supported:** How has the person handled reported credit, and how does that correlate with future delinquency?  
**Typical data:** repayment history, utilization, age of accounts, recent enquiries, account mix, delinquencies, and lender-specific application data.  
**Logic:** bureau score plus lender cutoffs or scorecards trained/constructed for an applicant population.

TransUnion CIBIL describes its consumer score as 300–900 and says payment history, credit utilization, age, and enquiries affect it; a higher score generally improves approval prospects, but no score guarantees approval. CIBIL also states that NA/NH may indicate too little or no recent history rather than poor behavior ([FAQ](https://www.cibil.com/faq/understand-your-credit-score-and-report), [report guide](https://www.cibil.com/content/dam/cibil/consumer/CIBIL-Report-Understanding.pdf)).

A self-reported score band can modestly inform the likely-lender lens, with a visible “as of” date. It cannot produce a reliable probability or substitute for the report. Unknown must remain unknown. Users should also be told that RBI rules provide one free full credit report from each credit information company each calendar year ([RBI notification](https://rbi.org.in/commonperson/English/Scripts/Notification.aspx?Id=1884)) and a compensation framework for delayed correction of credit information ([RBI circular](https://systemhealth.rbi.org.in/Scripts/NotificationUser.aspx_Id%3D12554%26Mode%3D0%281%29.html)).

### 5.3 Cash-flow underwriting

**Decision supported:** Do observed inflows and outflows demonstrate capacity despite thin or imperfect traditional files?  
**Typical data:** bank transactions, sales, deposits, recurring expenses, debt servicing, balance behavior, tax/GST records, and sometimes accounting data.  
**Logic:** engineered cash-flow attributes, rules, or predictive models; often combined with bureau data.

[FinRegLab's empirical cash-flow underwriting study](https://finreglab.org/research/the-use-of-cash-flow-data-in-underwriting-credit-empirical-research-findings/) tested data from six non-bank providers against actual loan performance and examined whether cash-flow variables added predictive value to traditional data. Its [small-business research](https://finreglab.org/wp-content/uploads/2023/12/FinRegLab_2019-09-06_Research-Report_Small-Business-Spotlight_The-Use-of-Cash-Flow-Data-in-Underwriting-Credit.pdf) stresses that business capacity is harder to assess because firms are heterogeneous and future health matters. The IFC's [2026 alternative-data report](https://www.ifc.org/en/insights-reports/2026/cracking-the-credit-code-alternative-data-and-ai-for-financial-inclusion) similarly frames alternative data as an inclusion opportunity that brings transparency and fairness duties.

This approach is particularly relevant to Ravi, whose cash business, ITR, and collateral tell different stories. Yet the prototype has no transaction feed and should not pretend that a self-reported monthly range equals cash-flow underwriting. It can instead borrow the logic: ask for low, typical, and high net months; distinguish turnover from take-home cash; ask what records exist; use the low or conservative scenario for safety; and mark verification confidence separately.

### 5.4 Collateral-based assessment

**Decision supported:** What loss protection and product route does an asset provide?  
**Typical data:** ownership, title/encumbrance, valuation, asset type/condition, requested amount, and repayment capacity.  
**Logic:** eligible collateral value multiplied by an LTV ceiling, with legal/valuation and cash-flow checks.

Collateral can enable a lower-priced or longer-tenure route, but it changes the consequence of failure. The [RBI gold and silver collateral directions](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12859&Mode=0) prescribe valuation and tiered LTV requirements for regulated lenders. RBI's [prudential handbook](https://website.rbi.org.in/documents/d/rbi/handbookg27022025d0f3f53f5d3c4310a6bb2f8ac2175d3a) records housing-loan LTV categories. Neither establishes what a household can safely afford.

The borrower tool should show LTV as a product constraint and loss-severity signal, never as repayment capacity. It should ask whether the asset is a home, livelihood asset, family gold, or surplus asset. That does not alter the mathematical LTV; it changes the suitability warning.

### 5.5 Productive-purpose and business-return assessment

**Decision supported:** Will the financed asset or inventory generate enough conservative incremental cash to service debt?  
**Typical data:** asset quote, working-capital cycle, unit economics, gross margin, current capacity constraints, operating costs, seasonality, and downside estimates.  
**Logic:** incremental net cash-flow coverage, DSCR, payback, and stress scenarios.

This is more suitable for Ravi's inventory and delivery vehicle than treating the entire request as consumption debt. But projected income is easy to inflate and expenses easy to omit. An [SBA audit of weak underwriting](https://legacy.sba.gov/document/report-10-10-report-10-10-audit-premier-certified-lenders-section-504-loan-program) documented failures involving overstated sales forecasts and understated expenses. The lesson is portable even though the program is American: show both the user's estimate and a conservative scenario, and do not count the same cash twice for household and business service.

For low-income microfinance households in India, the RBI FAQ explicitly says expected income from the financed activity is not included when computing present household income for the 50% repayment limit. That specific regulatory treatment should not be silently replaced with optimistic projected earnings.

### 5.6 Alternative-data and machine-learning risk models

**Decision supported:** Predict repayment or automate institutional decisions using large and diverse datasets.  
**Typical data:** bureau, bank transactions, application, business, device or behavioral signals, with labeled outcomes.  
**Logic:** statistical or ML model plus thresholds, adverse-action reasons, monitoring, and governance.

Vendors such as [Zest AI](https://www.zest.ai/product/underwriting), [Provenir](https://www.provenir.com/), and [Taktile](https://taktile.com/credit-decision-automation) market performance, orchestration, testing, fairness, and explanation capabilities to lenders. Their claims describe the category but are not independent proof. Current US supervisory guidance stresses fit-for-use validation, limitations, governance, documentation, and ongoing monitoring ([Federal Reserve model-risk guidance](https://www.federalreserve.gov/frrs/guidance/supervisory-guidance-on-model-risk-management.htm)); the [NIST AI Risk Management Framework](https://airc.nist.gov/airmf-resources/airmf/) supplies a voluntary trustworthiness framework. The US CFPB additionally says complex algorithms do not excuse nonspecific adverse-action reasons ([CFPB circular](https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/)). These are governance benchmarks, not Indian prototype requirements.

Borrower Copilot has none of the prerequisites for a defensible prediction: representative outcomes, verified input data, bias testing, calibration, change monitoring, or an operational owner. ML is therefore out of scope. A transparent calculation is not less sophisticated here; it is more honest.

### 5.7 Expected-loss and risk-based pricing models

**Decision supported:** What loss and return should a lender expect, and what price/capital is required?  
**Typical data:** probability of default (PD), loss given default (LGD), exposure at default (EAD), cost of funds, operating cost, capital, tenure, security, and margin.  
**Logic:** expected loss is commonly expressed as PD × LGD × EAD; pricing then incorporates cost and return components.

The [Basel Framework](https://www.bis.org/baselframework/BaselFramework.pdf) defines the institutional risk components. RBI guidance allows regulated lenders to set pricing within applicable rules and expects NBFC interest models to consider cost of funds, margin, and risk premium with disclosed gradations ([RBI prudential handbook](https://website.rbi.org.in/documents/d/rbi/handbookg27022025d0f3f53f5d3c4310a6bb2f8ac2175d3a)).

This is a poor prototype method. Self-reported profile fields cannot identify PD or LGD, and “fair price = base rate + guessed risk premium” would imply a precision the product cannot defend. The feasible alternative is a **market-observed, product-specific, date-stamped rate band** collected from official lender disclosures, plus a separate APR calculation for an actual offer.

### 5.8 Residual-income, stress, and financial-well-being approaches

**Decision supported:** What remains after debt and essentials, and can the household withstand a shock?  
**Typical data:** take-home or conservative net income, essential expenses, all current obligations, proposed payment, dependants, liquid savings, income variation, and foreseeable shocks.  
**Logic:** residual cash, liquidity runway, adverse scenarios, and qualitative well-being questions.

This is the strongest borrower-safety lens because it recognizes that two households with the same income and EMI can have different essential commitments. The [CFPB Financial Well-Being Scale](https://www.consumerfinance.gov/data-research/research-reports/financial-well-being-scale/) demonstrates short, non-identifying questions about control and shock resilience, while the [OECD/INFE 2026 toolkit](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/oecd-infe-toolkit-for-measuring-financial-literacy-inclusion-and-well-being-2026_6e8d9566/92f2d439-en.pdf) models explicit “don't know,” “not applicable,” and refusal options. Neither instrument is an underwriting cutoff. Their value is question design and respectful uncertainty handling.

Residual income also has limitations: expenses are hard to recall, essentials are household-specific, and one month can be unrepresentative. The prototype should collect ranges or a “tight/typical/comfortable” estimate, expose assumptions, and test a worse month rather than assert an exact safe number.

### 5.9 Recommended hybrid

No one approach answers all four product outputs. The defensible composition is:

1. deterministic repayment and APR arithmetic;
2. product and documentation rules for the likely-lender lens;
3. residual cash, liquidity, variability, and shocks for the safe lens;
4. cash-flow and collateral branches for productive/secured use;
5. a distress override before ordinary eligibility;
6. market-observed, dated price ranges rather than invented personalized rates;
7. qualitative evidence confidence, with no probability language.

---

## 6. Objective-measure catalogue

“Objective” below means reproducible from defined inputs. It does not mean universally decisive or unbiased. A formula can be objective while its input quality, cutoff, or interpretation is not.

| Measure | Definition/calculation | Inputs and decision use | Status and use in prototype | Limitations and source |
|---|---|---|---|---|
| Amortizing EMI | EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is principal, r monthly rate, n payments | Amount, nominal annual rate/12, tenure; repayment illustration | **Hard arithmetic. Use.** Handle zero interest separately and state payment frequency | Assumes fixed rate and regular equal payments; fees are outside EMI unless financed. Compare official bank calculators such as [ICICI](https://www.icici.bank.in/personal-banking/loans/personal-loan/emi-calculator) |
| Total scheduled repayment | EMI × number of payments, plus separately paid charges | Shows tenure and total-cost trade-off | **Hard arithmetic. Use.** Show principal, interest, fees separately | Early repayment, rate resets, delays, taxes, and penalty charges change actual cost |
| APR | Annualized internal rate of return on net amount received versus all scheduled borrower payments and included charges | Disbursal, upfront/deducted fees, payment dates/amounts, third-party charges routed through lender | **Regulatory calculation concept. Use for offer illustration.** Prefer date-specific cash flows | Requires complete charges and timing; not the nominal rate. RBI requires APR and amortization disclosure in the [KFS circular](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0) and provides an [official illustrative annex](https://rbidocs.rbi.org.in/rdocs/content/pdfs/CIRCULARKFS1504242_B.pdf) |
| Debt-to-income ratio (DTI) | Monthly debt payments ÷ gross monthly income | All recurring debt payments and gross income; common lender descriptor | **Soft, context-dependent. Optional label only.** Define gross denominator | Product limits differ and it omits living expenses. [US CFPB definition](https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/) is a comparator, not Indian law |
| Fixed-obligation-to-income ratio (FOIR) | Fixed monthly obligations ÷ defined monthly income | Existing EMIs, proposed EMI, sometimes rent/other commitments; income definition varies | **Soft market heuristic. Use only with displayed definition.** Do not call a cutoff an RBI rule | No universal public definition or cutoff across Indian products; gross/net and included obligations vary |
| Household repayment ratio for microfinance scope | All household monthly loan repayments ÷ monthly household income | Household income and every loan obligation | **Hard regulatory ceiling only if in scope.** Flag scope test | RBI caps at 50% for qualifying low-income household lending; future financed-activity income is excluded. Do not generalize. [RBI FAQ](https://www.rbi.org.in/commonperson/English/Scripts/FAQs.aspx?Id=3366) |
| Current debt-service ratio | Existing monthly debt payments ÷ conservative net monthly inflow | Establishes current pressure before proposed debt | **Descriptive. Use.** No universal pass mark | Omits essentials and can look benign for high-cost, short-tenure debt with upcoming balloon payments |
| Post-loan committed-outflow ratio | (existing debt + proposed payment + rent + user-identified fixed commitments) ÷ conservative net inflow | Borrower-side “how much is already spoken for?” lens | **Design measure. Use with explicit label, not as industry FOIR.** | Category selection is subjective and may double-count items; the tool must show included rows |
| Residual monthly cash | Conservative net inflow − essential spending − current debt payments − proposed payment | Core borrower-safe amount and stress result | **Hard arithmetic on soft inputs. Use.** Show rupee result, not only ratio | Expense recall and income volatility dominate precision; zero/positive residual alone does not prove safety |
| Liquid-buffer months | Liquid, accessible savings ÷ monthly essentials and debt commitments | Shock resilience; distinguishes affordable-on-paper from resilient | **Descriptive. Use as range.** Exclude pledged/illiquid assets | Does not capture insurance, family support reliability, near-term lump-sum costs, or asset-sale friction |
| Income range/volatility | Low, typical, high net month; with records, variability such as standard deviation or coefficient of variation | Choose conservative inflow and expose unstable cases | **Self-report range. Use.** Avoid computed volatility without enough observations | Three recalled values are not a time series; salary bonuses and business turnover must not be confused with recurring net cash |
| Income/documentation confidence | Evidence ladder: recalled only; recent records; multiple consistent records; verified source | Likely-lender documentation and output confidence | **Design classification. Use.** Keep separate from ability and worthiness | More documents do not make an unaffordable loan safe; informal evidence may still be credible |
| Credit score/band | Bureau-supplied score, commonly 300–900 for CIBIL | Lender-likelihood context when user knows a recent score | **Soft signal. Optional.** Ask band/date/source and allow unknown/NA/NH | Not a guarantee; user can misremember; lender models differ. [CIBIL FAQ](https://www.cibil.com/frequent-queries) |
| Adverse repayment signals | Recent missed/bounced payment, overdue balance, repeated rollovers, utilization or many recent enquiries | Safety triage and lender-likelihood warning | **Event-based signal. Use carefully.** Ask facts, not moralized labels | Self-report may be incomplete; one event needs context. Recent distress should trigger help, not an opaque penalty score |
| Loan-to-value (LTV) | Loan exposure ÷ eligible collateral value | Product eligibility, lender loss protection, downside severity | **Hard arithmetic under product-specific valuation rules. Use only in secured branch.** | Market value, eligible value and distress-sale value differ; it is not affordability. See [RBI gold directions](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12859&Mode=0) |
| Debt-service coverage ratio (DSCR) | Net operating cash/income available for debt service ÷ total debt service over same period | Productive-purpose/business capacity | **Contextual. Use as explained scenario, not generic cutoff.** | “Available cash” definitions and suitable cushion depend on volatility and sector. An [OCC commercial-lending handbook](https://www.occ.treas.gov/publications-and-resources/publications/comptrollers-handbook/files/commercial-real-estate-lending/pub-ch-commercial-real-estate-previous.pdf) illustrates the concept, not an Indian consumer rule |
| Incremental cash coverage | Conservative incremental net cash from financed use ÷ incremental loan payment | Whether inventory/vehicle/business asset supports itself | **Design scenario. Use for Ravi branch.** Also test without projected upside | Forecasts are uncertain and may cannibalize existing sales; include operating, maintenance, tax, downtime and working-capital timing |
| Age at maturity | Current age + loan tenure | Product eligibility and retirement/income-transition conversation | **Simple descriptor. Use only where relevant.** | Age cutoffs are lender/product-specific; age alone is a poor borrower-safety proxy |
| Expected loss | PD × LGD × EAD | Institutional credit risk and pricing | **Industry measure. Exclude from prototype output.** | Needs calibrated models, outcomes, security recovery and exposure behavior. See [Basel Framework](https://www.bis.org/baselframework/BaselFramework.pdf) |
| Stress residual | Residual cash recalculated under explicit adverse inputs: lower income, higher essential costs, rate reset, or business downtime | Tests “survives a bad month,” not only average month | **Scenario arithmetic. Use.** Let user see/change shock | Shock sizes require a sourced product rule or transparent design assumption; do not silently stack implausible stresses |
| Refinance/consolidation net benefit | Present and nominal comparison of old scheduled cash flows against new cash flows, including all fees, closure charges and tenure | Determines whether replacing debt improves cost and pressure | **Hard comparison if all debts known. Use only in distress branch.** | Lower EMI may come solely from longer tenure; benefit fails if old facilities remain usable/open or arrears/fees omitted |
| Evidence confidence | Separate ratings for input completeness, evidence quality, and scenario stability | Calibrates language and identifies next best question/document | **Design judgment. Use qualitative High/Medium/Low dimensions, never probability.** | Not validated against outcomes and must not be presented as creditworthiness |

### 6.1 Why no single score should be shown

A combined score would mix incompatible concepts: lender policy, payment history, household resilience, collateral, purpose value, and input confidence. Weighting them requires normative choices and validation data. Worse, a high salary or valuable property could numerically cancel recent distress even though the correct product action is to pause. Separate measures preserve the causal explanation and allow safety rules to override an otherwise favorable profile.

---

## 7. Indian lending and regulatory context

### 7.1 Roles and boundaries

- A **regulated entity (RE)** such as a bank or NBFC owns the credit decision and remains responsible for outsourced digital-lending activity.
- A **lending service provider (LSP)** may acquire customers, support underwriting, service loans, or perform recovery on behalf of an RE.
- A **digital lending app/platform (DLA)** is a borrower-facing digital channel of an RE or LSP. Presence in RBI's repository is based on lender submissions and is not RBI certification.
- A **credit information company (CIC)** maintains reported credit information. Digital loans must be reported under RBI directions.
- An **Account Aggregator (AA)** transports permissioned financial information between providers and users under an explicit consent artefact; it is not a lender or an owner of the financial data.
- Borrower Copilot, as scoped, is none of these. It should avoid language, rankings, data collection, or referral behavior that implies approval, regulated advice, or RBI endorsement.

### 7.2 Digital Lending Directions, 2025

The [RBI Digital Lending Directions, 2025](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12848&Mode=0), issued 8 May 2025, consolidate conduct, disclosure, grievance, data, and reporting controls. The most relevant sourced facts are:

- When an LSP presents offers from more than one lender, it must display all matching offers, identify unmatched lenders, apply a consistent documented matching mechanism, and avoid dark patterns or biased promotion.
- Displayed offers must identify the lender and include amount, tenor, APR, monthly repayment obligation, penal charges, and a link to the KFS.
- Disbursement should generally go directly from the RE to the borrower or end beneficiary, and repayment directly to the RE. LSP fees are paid by the RE rather than separately collected from the borrower.
- A borrower must receive the KFS, sanction terms, account statements, and relevant policies digitally.
- A cooling-off period of at least one day must permit exit by paying principal and proportionate APR; a reasonable one-time processing fee may be retained only if disclosed in the KFS.
- The RE must disclose grievance contacts. If a complaint is unresolved for 30 days, the borrower can use RBI's Complaint Management System.
- Data collection must be need-based, preceded by explicit consent, and auditable. Apps must not access contacts, call logs, files/media or telephony functions; one-time camera, microphone, or location access may be taken only when needed for onboarding/KYC and with consent.
- Consent must be granular, purpose disclosure must occur at each stage, and the borrower must be able to deny specific uses, revoke consent, restrict third-party disclosure, and request deletion where applicable.
- LSPs may retain only minimal basic data necessary for operations; biometric storage is prohibited unless permitted under applicable law. Digital-lending data must be stored in India, and permitted processing abroad is subject to prompt return/deletion requirements.
- All digital loans, including short-tenure or deferred-payment credit products, must be reported to CICs.

**Design implication:** Even though an anonymous prototype does not originate loans, it should mirror the spirit of these protections: no dark patterns, complete offer fields, direct lender identity, clear fee ownership, explicit source/assumption disclosure, and zero unnecessary permissions.

RBI announced a public repository of DLAs to help customers verify claimed lender associations, but described it as relying on RE submissions ([RBI announcement](https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=58449)). The Directions explicitly caution that inclusion is not RBI endorsement or validation. The prototype must use “listed by the lender in RBI's repository,” never “RBI-approved app.”

### 7.3 Key Facts Statement, APR, and charging conduct

The [RBI KFS circular](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0), issued 15 April 2024 and applicable to new retail and MSME term loans from 1 October 2024, requires:

- a standardized KFS in language understood by the borrower, explained with acknowledgment;
- APR as the annual cost of credit including interest and other associated charges;
- an APR computation sheet and amortization schedule;
- lender-recovered third-party charges to be included in APR and separately disclosed with receipts; and
- no later charge of a fee omitted from the KFS without explicit borrower consent.

The KFS has a minimum validity period of three working days for loans of seven days or longer and one working day for shorter loans. This gives a useful product action: tell the user to compare the KFS during its validity rather than deciding from an advertised monthly rate.

RBI has separately instructed lenders not to charge interest from sanction date when disbursal occurs later, for a full month when funds were outstanding only part of it, or on amounts collected in advance ([fair charging circular](https://www.rbi.org.in/scripts/bs_circularindexdisplay.aspx/BS_CircularIndexDisplay.aspx?Id=12678)). Penal charges must be reasonable, disclosed, and not capitalized as extra penal interest or used as a revenue-enhancement device ([penal-charges circular](https://systemhealth.rbi.org.in/Scripts/NotificationUser.aspx_Id%3D12527%26Mode%3D0%281%29.html)).

**Design implication:** The offer comparison needs at least nominal rate type, net amount received, every upfront/recurring charge, taxes where known, EMI schedule, total repayment, APR, late/bounce/penal charges, prepayment conditions, cooling-off terms, and whether any fee is deducted from disbursal. It should flag an offer as incomplete rather than compute APR from guessed fees.

### 7.4 Floating-rate repayment risk

The [RBI floating-rate reset circular](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12529&Mode=0) requires regulated lenders to assess capacity with headroom for rate increases, disclose how benchmark changes affect EMI/tenor, provide choices concerning EMI/tenor or prepayment, avoid negative amortization, and provide quarterly statements including principal and interest recovered, EMIs left, and APR.

**Design implication:** A floating-rate scenario must not show one permanent EMI. It should demonstrate either a higher payment, longer tenure, or both, and identify the benchmark/reset assumption. For a fixed-rate product, the relevant stress is more likely income loss or expense increase.

### 7.5 Microfinance: a scoped rule, not a universal FOIR

Under RBI's [microfinance regulatory framework](https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D12256%282%29.html) and [FAQ](https://www.rbi.org.in/commonperson/English/Scripts/FAQs.aspx?Id=3366), a collateral-free loan to a household with annual household income up to ₹3 lakh is a microfinance loan. Regulated entities must ensure that aggregate monthly loan-repayment obligations of the household do not exceed 50% of monthly household income. This includes repayment obligations on both microfinance and non-microfinance loans for an in-scope household. Non-monthly obligations are normalized, and expected income from the activity financed by the loan is not counted in current household income.

Income may be assessed using CIC information, bank statements, declarations, local enquiry, and other evidence, with documented methodology.

**Critical interpretation:** The 50% figure is a hard rule inside this defined scope. It is not an RBI-sanctioned “safe FOIR” for all salaried, self-employed, secured, or personal-loan borrowers. Anita's stated personal monthly income annualizes to approximately ₹3.12–3.60 lakh before clarifying household income, so the prototype cannot assume she is in scope. It must ask the scope question or avoid invoking the rule.

### 7.6 Collateral, LTV, and valuation

The [RBI Lending Against Gold and Silver Collateral Directions, 2025](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12859&Mode=0), with lender compliance required by 1 April 2026, include a detailed credit assessment where total exposure exceeds ₹2.5 lakh, a maximum 12-month tenor for consumption bullet-repayment loans, and tiered maximum LTVs for consumption loans: 85% up to ₹2.5 lakh, 80% above ₹2.5 lakh through ₹5 lakh, and 75% above ₹5 lakh. LTV must be maintained through the loan. Valuation uses eligible metal content and prescribed reference prices, with a certificate to the borrower. The directions also set collateral-return timelines and compensation for lender-caused delay.

RBI's prudential handbook shows housing-loan LTV categories for banks/HFCs—up to 90% at smaller ticket sizes and lower ceilings at larger amounts, subject to detailed categories and risk weights. These are product/regulatory constraints, not safe borrowing percentages.

**Design implication:** Ask whether the asset is essential to housing or livelihood, show the lender valuation may differ from the user's estimate, and treat a large equity cushion as loss protection rather than spendable income.

### 7.7 Credit information and “unknown”

CIBIL describes the score as one factor among many, not a promise of approval. Its report guide says NA/NH may indicate no or insufficient recent credit information. RBI requires broad credit reporting and provides consumer access, correction, and grievance rights.

**Design implication:** Offer four states—recent score/report known, older estimate, new/no history, and unknown. Do not impute a low score. For the likely-lender lens, explain that uncertainty may reduce the ability to estimate or lead lenders to request other evidence; for the borrower-safe lens, keep the score out of cash-flow arithmetic entirely.

### 7.8 Account Aggregators and data minimization

The [RBI AA Master Direction](https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D10598%281%29.html) requires explicit customer consent and a standardized consent artefact; the AA should not retain customer financial information or authentication credentials. Ecosystem organization Sahamati reports rapid adoption, but its counts are ecosystem-reported rather than an independent performance evaluation ([Sahamati site](https://sahamati.org.in/), [2024 annual report](https://sahamati.org.in/wp-content/uploads/2024/12/Sahamati-Annual-Report-2024.pdf)). OneMoney's [privacy disclosures](https://www.onemoney.in/onemoney/policies/) also show an important nuance: an AA may not retain transported financial information yet its app can still process basic identity, device, browser, location, and analytics data.

**Design implication:** The prototype should borrow AA's consent grammar—purpose, data category, duration, recipient, revocation—not integrate AA. Anonymous self-report is enough to test the product thesis.

### 7.9 Data protection timing

India's [Digital Personal Data Protection Act, 2023](https://www.indiacode.nic.in/indiacode/handle/123456789/22037?view_type=browse) was enacted on 11 August 2023. The [13 November 2025 commencement notification](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf) phases provisions: institutional provisions began immediately, one group begins after one year, and many substantive processing obligations begin 18 months after publication, on 13 May 2027. The [DPDP Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf) are likewise phased.

**As-of-date conclusion:** On this report's cut-off, many processing obligations are enacted but not yet commenced. This is a legal-status observation, not legal advice. Data minimization, security, clear purpose, and deletion remain sound design practice, while RBI's applicable lending data rules already bind regulated lenders.

### 7.10 Borrower safety and complaint routes

RBI's [financial-awareness material](https://www.rbi.org.in/commonperson/images/FAME202426022024.pdf) advises borrowing from regulated entities, evaluating repayment capacity, reviewing charges, and using grievance channels. RBI's older [financial education guide](https://www.rbi.org.in/financialeducation/content/GUIDE310113_F.pdf) warns that repeated borrowing to repay earlier loans can become a debt trap and treats lavish-wedding borrowing as a risky consumption example. This is education, not a prohibition.

**Design implication:** The result should link users to the named lender's grievance contact, then RBI's [Complaint Management System](https://cms.rbi.org.in/) where applicable. It should not display a private DLA as “safe” merely because it has a polished interface or is mentioned in a repository.

---

## 8. Question design and adaptive flow

### 8.1 Question-design principles

The form should ask the smallest number of questions that can change the recommendation, product path, calculation, confidence, or safety action. An adaptive questionnaire study used decision trees to select questions from prior responses and reduce questionnaire length ([Phillips et al., European Journal of Operational Research](https://www.sciencedirect.com/science/article/abs/pii/S0377221706011908)). The exact algorithm is not needed here; the useful principle is **value of information**.

A question has high value when at least one plausible answer would:

- switch from ordinary borrowing to distress support;
- change unsecured versus secured/productive routing;
- materially change the safe-payment interval;
- determine whether a regulatory rule applies;
- reveal a missing fee or obligation that invalidates APR/affordability arithmetic; or
- convert a low-confidence statement into one the user can act on.

A question has low value when it merely personalizes copy, duplicates another input, or collects a lender/application field the prototype does not use. Name, phone, PAN, exact employer, contacts, device data, caste, religion, gender, and precise address do not belong in this prototype. Pincode may matter to lender serviceability in production, but it adds no value to the research prototype unless actual lender matching is implemented.

The [OECD/INFE 2026 questionnaire toolkit](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/oecd-infe-toolkit-for-measuring-financial-literacy-inclusion-and-well-being-2026_6e8d9566/92f2d439-en.pdf) supports neutral wording and explicit “don't know,” “not applicable,” and refusal states. The CFPB's [Financial Well-Being tool](https://www.consumerfinance.gov/consumer-tools/financial-well-being/) shows that a useful assessment can avoid collecting identifying financial data or retaining answers.

### 8.2 Recommended baseline sequence

The wording below is conceptual. Each screen should state why the answer matters before or beside the field.

1. **What would the money pay for, how much, and by when?** Purpose choices should include consumption/event, refinance existing debt, emergency, home/asset, vehicle, business inventory, business equipment, education, and other. Purpose determines whether future cash flow, security, or a distress branch is relevant.
2. **Are any payments already overdue, bounced, or being paid using another loan?** Ask early, privately, and without blame. This can trigger a safety-first path before the rest of the eligibility exercise.
3. **Whose income and obligations support this decision?** Ask household/adult contributors, dependants, and whether another person's income is reliably available and consensually part of repayment. Do not automatically count a spouse's income.
4. **What income actually reaches the household in a low, usual, and high month?** Identify salaried, self-employed/business, gig/casual, pension, or mixed income. Ask net usable cash, not business turnover.
5. **How much must the household spend in a normal month?** Use editable categories—housing, food/utilities, transport, health/education/care, insurance/tax, and other essentials—plus “I only know the total.” Avoid an unrealistically detailed budget.
6. **What debt payments and fixed commitments exist now?** Capture lender/type, outstanding balance if known, EMI/minimum payment, due date, rate/APR if known, remaining months, overdue status, and whether a facility can be redrawn. Also capture rent and user-defined fixed commitments separately.
7. **What liquid money could cover a disrupted month, and what known large expense is coming?** Exclude pledged assets and livelihood property. This establishes buffer and near-term stress.
8. **What monthly cash amount must remain protected after the new payment?** This user-owned reserve prevents the product from inventing one universal lifestyle or safety threshold. Explain that zero leftover is not the goal.
9. **What is known about the credit file and available records?** Recent score/report band and date, new/no history, or unknown; then payslips, bank statements, ITR/GST, sales records, asset papers, or none. This affects lender-likelihood confidence, not personal worth.
10. **What terms or actual offer are being considered?** Amount, tenure, fixed/floating, nominal rate, processing and other fees, net disbursal, repayment schedule, prepayment, security, and KFS availability. If there is no offer, use scenarios and a dated market range, clearly labeled.

The first two questions establish intent and safety. Questions 3–8 establish borrower-side capacity. Question 9 supports only the likely-lender and evidence lenses. Question 10 supports pricing and negotiation. The interface can render these as fewer screens by grouping related fields, without merging their concepts.

### 8.3 Adaptive branches

#### Salaried or stable pension branch

Ask employment tenure, whether the current income is probationary/notice-period/contractual, variable-pay share, retirement or known income-change timing, and the latest three-month take-home range. Avoid employer name unless matching an actual lender policy, which is out of scope.

#### Self-employed, business, or gig branch

Ask whether stated income is turnover, gross profit, or household take-home; low/typical/high net months; business age; seasonal trough; cash versus bank receipts; available ITR/GST/bank/books or informal records; household withdrawals; supplier/customer concentration; and existing business debt. Ask only the evidence categories, not uploads.

If the purpose is productive, ask the purchase split, written quotes, conservative incremental revenue, incremental operating costs, time to first return, asset downtime, and what happens if projected income is zero for an initial period.

#### Secured branch

Ask asset type, ownership and co-owner consent, encumbrance, independent versus owner-estimated value, livelihood/housing importance, and willingness to lose the asset under default. For gold, property, or vehicle, make clear that lender valuation and eligible value can differ.

#### Existing-debt or distress branch

Ask each debt's exact due amount/date, arrears, lender identity and whether it is an RE-linked app, KFS availability, rate/APR, fees, collection contact, and whether the user is considering a settlement, rollover, or consolidation. Ask whether essentials are currently being skipped or borrowing is funding another payment. Do not require the user to finish ordinary eligibility questions before showing immediate next steps.

### 8.4 Question-to-output dependency matrix

| Question/input | Why it is needed | O1 borrow/less/not now | O2 likely lender vs safe | O3 rate/APR | O4 EMI/stress | Negotiation Card | If unknown |
|---|---|:---:|:---:|:---:|:---:|:---:|---|
| Purpose, amount, timing | Product route, benefit and urgency | ✓ | ✓ | ✓ | ✓ | ✓ | Show generic scenario only; do not recommend product |
| Overdue/bounce/borrowing-to-pay | Detect active distress | ✓ decisive | ✓ | ✓ | ✓ | ✓ | Ask once with “prefer not to say”; lower safety confidence and avoid positive recommendation |
| Household contributors/dependants | Define whose cash flow and essentials count | ✓ | ✓ |  | ✓ |  | Do not count other income; state household boundary unknown |
| Low/usual/high net usable income | Conservative and stress inflow | ✓ | ✓ |  | ✓ | ✓ | No safe amount; permit EMI illustration only |
| Essential expenses | Residual-income basis | ✓ | ✓ |  | ✓ | ✓ | No safe amount; invite total estimate/range rather than fill default |
| Existing debts and fixed commitments | Full obligation burden and refinance comparison | ✓ | ✓ | ✓ | ✓ | ✓ | Result is incomplete; do not assume zero debt |
| Liquid buffer/upcoming expense | Shock resilience | ✓ | ✓ safe lens |  | ✓ | ✓ | Mark resilience unknown; do not infer from income |
| Protected monthly remainder | User-owned safety reserve | ✓ | ✓ safe lens |  | ✓ | ✓ | Show residual scenarios but no “safe” label |
| Credit-file state/date | Likely lender friction, not affordability |  | ✓ lender lens | ✓ coarse band |  | ✓ | Keep neutral; recommend free report if useful |
| Income/business evidence | Likely lender documentation and confidence |  | ✓ lender lens | ✓ coarse band |  | ✓ | Explain which evidence could reduce uncertainty |
| Product/security | Route, downside and product pricing | ✓ | ✓ | ✓ | ✓ | ✓ | Do not mix secured and unsecured comparisons |
| Offer terms and complete fees | Full cost and contractual stress | ✓ | ✓ | ✓ decisive | ✓ | ✓ | Show nominal-rate scenario only; APR unavailable |
| Productive-use economics | Does financed activity support repayment? | ✓ | ✓ safe lens |  | ✓ | ✓ | Exclude projected upside from safety case |
| Collateral value/status | LTV and consequence of default | ✓ | ✓ lender lens | ✓ product band | ✓ | ✓ | Do not estimate secured eligibility |

### 8.5 Unknown is a first-class state

Unknown should not be converted to zero, “average,” or adverse. The UI should do one of four things:

- calculate an interval across the plausible range the user supplies;
- omit the affected claim and explain what is missing;
- use a conservative scenario only when the assumption is visible and user-editable; or
- ask the next highest-value question or request the relevant document field.

Examples:

- Unknown credit score → no score penalty; lender-likelihood confidence falls, safe cash-flow result is unchanged.
- Unknown processing fee → nominal EMI remains calculable, APR and net-disbursal comparison are marked unavailable.
- Unknown essential spending → no borrower-safe amount; show only a repayment scenario and offer a short expense-total prompt.
- Unknown collateral value → no LTV or secured amount; still discuss whether losing the asset would be harmful.
- Unknown business upside → set projected incremental cash to zero in the downside scenario, visibly.

### 8.6 Consistency and quality checks

Checks should prompt clarification, not accuse the user. Useful examples include:

- stated net household income lower than listed debt payments and essentials;
- business “income” exactly equal to turnover with no costs entered;
- spouse income counted but marked unavailable for repayment;
- stated liquid savings also pledged as collateral;
- consolidation marked complete while old credit remains open/redrawable;
- “no existing debt” paired with a recent bounced EMI;
- loan fee deducted upfront but APR calculated on the sanctioned rather than received amount;
- proposed productive income included both in current income and incremental benefit;
- variable/floating loan presented with no reset or downside scenario.

### 8.7 Adaptive stopping rule

Stop asking when the next answer cannot alter the route, recommendation class, calculated interval, confidence explanation, or immediate action. For example, once recent arrears plus borrowing-to-pay are disclosed, detailed score optimization has lower value than a complete obligation list and KFS review. Conversely, a stable salaried user with known expenses and no distress need not answer questions about GST or collateral.

---

## 9. Explainability, fairness, and safety

### 9.1 Explanation model: every result has a receipt

Each displayed result should have five layers:

1. **Plain conclusion:** “This looks manageable only at a smaller payment,” not “Score 63.”
2. **Causal reasons:** at most three leading reasons that actually changed the result, such as low-month cash, existing repayments, and insufficient buffer.
3. **Calculation receipt:** formula, exact included inputs, exclusions, and the source/date of any market value.
4. **Uncertainty:** missing inputs and which result they could change.
5. **Action:** the next question, document, offer term, or alternative that would improve the decision.

The reason text must be generated from the same rule that produced the result, not from generic educational copy. This echoes the broader explainability principle in the [CFPB complex-algorithm circular](https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/): explanations should identify actual reasons rather than hide behind model complexity. Again, that circular is US law and only a design comparator here.

### 9.2 How the four outputs should read

#### O1 — Borrow, borrow less, or do not add debt now

This is a route, not a verdict about character. It should state:

- which scenarios were tested;
- whether the proposed purpose produces cash flow or only consumes future income;
- whether essentials and the user's protected remainder survive;
- whether distress or collateral-loss risks override an otherwise acceptable EMI; and
- what would change the direction.

“Borrow” still means compare regulated offers and verify the KFS. “Borrow less” should show a range or user-adjustable amount, not one magic rupee. “Do not add debt now” should offer concrete stabilization actions and allow the user to revisit later.

#### O2 — Likely lender sanction versus borrower-safe amount

Show these side by side, never one above the other without labels:

- **Likely lender range:** based on common product/doc/profile factors and explicitly not an offer. State what a lender would verify and the date/source of any policy evidence.
- **Borrower-safe range:** inverse-amortize a payment capacity derived from conservative income, essentials, current obligations, the user's protected remainder, and the stress case. If any core input is missing, do not call the result safe.

A conceptual payment ceiling is:

**available payment in a scenario = net usable income − essentials − existing obligations − protected remainder.**

The tested ceiling is the lowest non-negative available payment across the named base and stress scenarios. The corresponding principal can be calculated from rate and tenure using the inverse annuity formula. The protected remainder is supplied by the user or clearly identified as an editable design assumption; it is not an invented regulatory percentage. Suitability overrides can still recommend less or zero—for example, active arrears or unacceptable livelihood-collateral risk.

#### O3 — Fair rate band and all-in APR

“Fair” should mean **consistent with current official pricing evidence for a comparable product/profile, with no unexplained fees**, not a claim about the lender's true risk cost.

The defensible method is:

1. define product class, security, amount, tenure, rate type, and broad evidence/score state;
2. collect dated official lender disclosures, including the previous-quarter range and mean that banks publish where applicable under [RBI display guidance](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=9862);
3. keep “starting from,” contracted range, and actual representative rate distinct;
4. present a broad observed band and source list, never an invented personalized point rate;
5. enter the actual offer's net disbursal and complete payments to calculate APR; and
6. label the comparison stale after its review date.

The band is a shopping reference, not a promise. The APR receipt must show why a deducted processing fee raises cost even when nominal interest is unchanged.

#### O4 — EMI/tenure and stress case

Show monthly payment, total interest, total scheduled outflow, fees, and the residual cash under each scenario. When tenure rises, explicitly say: “The monthly payment falls, but total interest usually rises.” For floating rates, show the specified reset effect on payment or tenure. For volatile income, test the user's low month. For productive use, test delayed or zero incremental income. Do not combine all shocks into an unexplained apocalypse scenario.

### 9.3 Confidence without pseudo-probability

Confidence should be three small labels rather than one score:

- **Input completeness:** Are income, essentials, obligations, purpose, and offer charges complete?
- **Evidence quality:** Are values recalled, supported by one recent record, or consistent across several records?
- **Scenario stability:** Does the direction stay the same across the visible low/base/stress cases?

“High” means the dimension is well supported according to published rules in RULES.md; it does not mean a high chance of approval or repayment. The UI should state this adjacent to the label.

### 9.4 Negotiation Card

The final card should be printable/copyable and contain no hidden data:

> **My borrowing brief**  
> Purpose and amount: [user entry]  
> Product route I am comparing: [unsecured / vehicle / working capital / secured / refinance]  
> Payment I tested: [₹, tenure, fixed/floating]  
> Low-month cash remaining after essentials and all debt: [₹ or unknown]  
> Borrower-safe range tested: [range or unavailable, with reason]  
> Lender-likelihood range: [range or unavailable; not an offer]  
> Official market reference: [product, observed range, sources, checked date]  
> Offer: nominal rate [x], fees [itemized], net amount received [x], APR [x or unavailable]  
> Stress case: [assumption] → payment/tenure/residual [result]  
> Security at risk: [asset/none and consequence]  
> Questions for the lender: Is this the final KFS? Which fees are included in APR? Fixed or floating? What changes on reset? Cooling-off, prepayment, penal and bounce terms? Who is the regulated lender?  
> Missing evidence before I decide: [short list]

The card is not a certificate of affordability. It is an evidence-and-question checklist that helps the borrower slow the sales process down.

### 9.5 Fairness and respectful treatment

- Do not use protected or sensitive identity traits. Household role and dependants matter only through explicit cash-flow commitments.
- Do not treat cash income, self-employment, gig work, or NTC status as dishonesty. Separate **documentability** from **capacity**.
- Do not count another adult's income without availability and consent.
- Do not infer expenses from postcode, gender, family status, phone type, or employer prestige.
- Do not reward collateral without naming the loss consequence.
- Do not use red/green alone; pair color with text and accessible icons.
- Do not shame consumption purposes. Explain that they do not generate repayment cash and therefore need a stronger buffer.
- Allow correction of every input and show exactly which result changes.
- Test identical financial facts across persona labels to ensure names, city, occupation wording, or gender do not change arithmetic.

### 9.6 Risk-and-mitigation register

| Risk | Harm | Trigger/detection | Mitigation | Residual limitation |
|---|---|---|---|---|
| Eligibility mistaken for affordability | User borrows to lender maximum | Likely range exceeds safe range | Side-by-side lenses, different colors/labels, explicit “not an offer/not a safe amount” | Users may still anchor on the larger number |
| False precision from self-report | Overconfident amount/rate | Missing or range-based core inputs | Intervals, receipts, qualitative confidence, block safe label | Self-report can be sincerely wrong |
| Unknown treated as bad or zero | Exclusion or unsafe arithmetic | Blank score/income/fees | First-class unknown state and dependency behavior | More uncertainty may make the tool less satisfying |
| Hidden fees | Understated cost | Sanction amount differs from net receipt; no KFS | Itemized fee capture; APR unavailable until complete; KFS prompt | Some contingent charges cannot be annualized in advance |
| Lower EMI hides higher total cost | Harmful refinancing/long tenure | Payment falls while term expands | Show total scheduled outflow and old-versus-new cash flows | Future prepayment behavior is unknown |
| Debt-spiral encouragement | New loan worsens arrears | Bounce, overdue, rollover, borrowing-to-pay | Distress override, obligation map, regulated support/grievance path | Some consolidation can be beneficial and needs case review |
| Optimistic business projection | Productive loan becomes unaffordable | Incremental earnings drive recommendation | Base safety case excludes or discounts projected upside; explicit downside | Genuine growth opportunities may look conservative |
| Collateral mistaken for capacity | Loss of home/shop/gold | Secured eligibility despite weak residual | LTV separated from cash flow; livelihood consequence warning | Valuation and enforcement outcomes vary |
| Rate band goes stale | Misleading negotiation anchor | Review date passed or sources changed | Date stamp, expiry/review rule, official-source links | Lenders personalize actual terms |
| Marketplace/product conflict | Biased ranking | Referral payment or sponsored offer | No paid placement; disclose business model/source | A future commercial model would require governance |
| Sensitive-data overcollection | Privacy/security harm | Identity/upload/permission request | Anonymous local-only fields; no uploads, analytics, or device access | Browser/device environment still has operational privacy considerations |
| Rule mistaken for regulation | User or reviewer over-trusts cutoff | Unsupported threshold language | RULES.md provenance/status field and in-product labels | Product judgment remains contestable |
| Model/fairness claims without validation | Discrimination or misleading probability | Score/approval probability proposed | No ML or PD; deterministic checks; counterfactual persona tests | Rules can still encode unfair category choices |
| User in crisis receives generic copy | Missed urgent help | Essentials skipped, collection threat, severe overdue | Immediate neutral actions, lender grievance, RBI CMS, trusted debt/legal support | Tool cannot assess coercion, self-harm, or legal specifics |
| Accessibility failure | Excludes borrowers who need help | Keyboard/screen-reader/contrast test fails | Semantic inputs, plain language, keyboard path, text alternatives | Local-language and literacy support remain future work |

---

## 10. Approach decision matrix

Ratings are design judgments for this assignment, not empirical performance scores. “Accuracy potential” assumes the method has the data and governance it normally requires.

| Approach | Data burden | Transparency | Accuracy potential | Handles missingness | Indian/persona fit | 12–16h effort | Main risk | Prototype verdict |
|---|---|---|---|---|---|---|---|---|
| EMI and total-cost arithmetic | Low | High | High for stated schedule | High if omissions named | High | Low | Fees/rate changes omitted | **Include** |
| APR from offer cash flows | Medium | High | High if charges/timing complete | Low when fees unknown | High; KFS-aligned | Medium | False APR from incomplete cash flows | **Include as calculator; block when incomplete** |
| Generic FOIR/DTI cutoff | Low | High | Low–medium for lender policy | Medium | Medium | Low | Universalizes variable definitions/cutoffs | **Use ratio descriptively, no universal pass mark** |
| Residual income plus protected remainder | Medium | High | High for borrower decision if inputs sound | Low for safe label | High across personas | Low | Expense recall and chosen reserve | **Core safe lens** |
| Stress/scenario testing | Medium | High | Medium–high for resilience | Medium | High | Low | Arbitrary shocks | **Core with visible editable assumptions** |
| Bureau score/behavioral scorecard | Medium–high | Medium | High for lender risk when verified/validated | Low for NTC/unknown | Useful to Priya; uncertain for Ravi | High if integrated | Exclusion, staleness, approval conflation | **Optional self-reported context only** |
| Verified bank cash-flow analysis | High | Medium | High potential for informal/volatile income | Medium | Strong for Ravi/Anita | Too high | Consent, transaction classification, model validity | **Future research; emulate with ranges only** |
| ITR/GST/business-record analysis | High | Medium–high | Medium–high for business documentation | Medium | Strong for Ravi | Too high | Turnover/net cash confusion | **Ask record availability; no integration** |
| Collateral/LTV route | Medium | High | High for secured product constraint | Low if valuation unknown | Strong for Ravi; situational | Medium | Security mistaken for affordability | **Include only as branch and warning** |
| Incremental business cash/DSCR | Medium | High | Medium, forecast-dependent | Medium | Strong for Ravi | Medium | Optimistic projections | **Include conservative scenario** |
| Microfinance 50% rule | Medium | High | High for scoped compliance | Low if household scope unknown | Possibly relevant only after scope test | Low | Applied outside legal scope | **Include as conditional rule, not global threshold** |
| Marketplace acceptance probability | High | Medium | Potentially high with lender/bureau data | Low | Useful shopping function | Too high | Lead bias and false offer implication | **Exclude** |
| ML/default probability | Very high | Low–medium | Potentially high with representative labels | Model-dependent | Unproven here | Impossible | Bias, calibration, governance, false precision | **Exclude** |
| Expected-loss pricing | Very high | Medium | High for institutional portfolio pricing | Low | Lender-side, not borrower-side | Impossible | Guessed PD/LGD/cost | **Exclude** |
| Market-observed official rate band | Medium/manual | High | Medium for shopping reference | Medium | High | Medium | Staleness and profile mismatch | **Include with date/source/expiry** |
| Financial-well-being scale | Low | High | Valid for measured construct, not repayment | High | Culturally unvalidated for this use | Low | Misused as underwriting cutoff | **Borrow question style only** |
| Distress safety override | Low–medium | High | High for preventing obvious harm; not a credit model | Medium | Essential for Anita | Low | Overly broad exclusion | **Core, with human-support path** |

---

## 11. Three different conclusions: common, defensible, and suitable

### 11.1 Most common in the observed market

The most common visible consumer pattern is an amount/rate/tenure EMI calculator paired with broad eligibility questions: age, employment, monthly income, existing EMI, location, requested amount, and credit score. Banks use it to guide applicants toward their products; marketplaces use it to estimate matches and acquire leads; digital lenders place a fast screen before identity, bureau, bank, and document verification.

This prevalence is understandable. The interaction is short, the arithmetic is stable, and the output is commercially useful. But prevalence does not make it a complete borrower decision. It usually answers “what payment corresponds to these terms?” or “might this product accept this profile?”

### 11.2 Most defensible for borrower protection

The most defensible approach is sustainable-repayment analysis using conservative net income, complete current obligations, essential household expenditure, a protected residual, liquid buffer, and named stress scenarios. It then adds full-cost APR/KFS comparison and treats security as a consequence rather than evidence of comfort.

This conclusion follows from several independent strands:

- the conceptual distinction between credit risk and affordability in FCA material;
- RBI's household-wide repayment concern in the specifically scoped microfinance framework;
- RBI requirements for APR, fees, monthly obligations, capacity headroom, and transparent digital offers;
- public-interest budgeting and well-being tools that ask about shocks and money left after commitments; and
- cash-flow research showing why observed or carefully reconstructed flows matter for thin-file and business borrowers.

No source supplies one universal Indian “safe” threshold. Therefore, the defensible implementation is transparent residual arithmetic plus scenarios, not an unsupported pass line.

### 11.3 Most suitable for this prototype

The most suitable approach is a **transparent adaptive hybrid**:

- common product/documentation rules for a coarse lender-likelihood range;
- residual, buffer, purpose, stress, and distress rules for borrower safety;
- cash-flow and collateral branches where relevant;
- deterministic EMI, total-cost, inverse-payment, LTV, and APR calculations;
- a dated official-market pricing reference;
- qualitative confidence tied to missing evidence; and
- actual reason codes and a Negotiation Card.

It is suitable because it can be implemented and tested locally within 12–16 hours, explains every output, degrades honestly with missing inputs, handles all three personas, and does not claim a statistical prediction it cannot validate.

---

## 12. Recommended research-backed product direction

### 12.1 Decision architecture

The minimal end-to-end flow is:

**Intent and amount → safety triage → household cash-flow baseline → product-specific branch → base and stress calculations → two-lens result → offer/KFS comparison → Negotiation Card.**

The rule order matters:

1. **Safety before optimization.** Active repayment distress changes the next task from maximizing eligibility to stabilizing obligations.
2. **Product before pricing.** Unsecured consumption, secured property, vehicle, working capital, and refinance loans cannot share a meaningful rate band.
3. **Cash flow before collateral.** The ability to pay is tested without relying on sale of the asset.
4. **Safety before lender maximum.** Calculate both, but let the safety direction determine the recommendation language.
5. **Complete cash flows before APR.** Missing fees produce “APR unavailable,” not a guessed figure.
6. **Stress before confidence.** A result that flips under the user's plausible low month is unstable even when all fields are filled.

### 12.2 Conceptual decision rules

These are design judgments, not regulatory rules, unless explicitly marked otherwise.

- If income, essential expenses, or existing obligations are incomplete, show repayment illustrations but withhold a “borrower-safe” amount.
- If recent arrears, bounced payments, or borrowing-to-pay are present, prioritize a full obligation map and stabilization path. A new loan can be considered only as a specifically tested refinance/consolidation scenario, not as extra cash.
- Calculate base and adverse residuals after all current debt, the proposed payment, essentials, and the user's protected remainder. If either is negative, the proposed payment is not supported by the entered scenario.
- Derive a candidate safe-principal interval from the sustainable payment interval, rate band, and tenure. Do not round it up to the request or lender estimate.
- Use credit-file status, formal records, employment/business stability, age/tenure fit, and collateral only for the lender-likelihood explanation. Do not let a score or asset increase cash available for repayment.
- For productive borrowing, show a no-upside/downside case and a conservative incremental-cash case. Do not make a positive recommendation depend solely on projected growth.
- For collateral, require an unencumbered/ownership caveat, lender valuation caveat, LTV, and explicit livelihood/housing-loss warning.
- For refinancing, compare complete old-versus-new schedules. A lower monthly payment is insufficient if total cost rises sharply, fees are omitted, or old facilities remain open and usable.
- If the likely lender range is above the borrower-safe range, explicitly state that lender willingness does not expand household cash flow.
- If the safe range is above the requested amount, never encourage the user to borrow more merely because capacity appears available.

### 12.3 Output composition

The result page should fit on one screen before expansion:

| Result block | Primary statement | Expanded evidence |
|---|---|---|
| Direction | Borrow / borrow less / do not add debt now, with one-sentence reason | Rule triggers, purpose, base/stress residual and what would change the direction |
| Two lenses | Likely lender range and borrower-safe range side by side | Inputs unique to each lens; why they differ; confidence dimensions |
| Cost | EMI, total repayment and observed market rate band | Formula, official sources/date, fixed/floating, amount received, fees and APR |
| Stress | Named shock and resulting payment/tenure/residual | Editable assumptions and base-versus-stress comparison |
| Next action | Three actions in priority order | Documents/questions, regulated lender checks, complaint/support route |
| Negotiation Card | Copy/print | Complete evidence and offer checklist from Section 9.4 |

### 12.4 Persona analysis: Priya

**Known from the assignment:** Priya is 29, a salaried software engineer at a large MNC in Bengaluru with five years' tenure and ₹110,000 net monthly income. She pays a ₹14,000 car EMI with two years remaining and ₹28,000 rent, reports a CIBIL score of 780, and wants an ₹8 lakh personal loan for a wedding.

**What is uncertain:** essential household spending; dependants or transfers; credit-card dues and other obligations; liquid savings and wedding savings already available; near-term large costs; score/report date and accuracy; employment/variable-pay risks; desired term; actual rate, fees and KFS; and the minimum monthly remainder she wants to protect.

**Relevant product paths:** unsecured personal loan, a smaller personal loan combined with savings, or delaying/reducing the event budget. A secured route would usually add asset risk to a consumption purpose and should not be introduced merely to maximize amount.

**Measures that matter most:** base and stress residual, post-loan committed outflow, liquid-buffer months, current and post-loan debt payment, total cost by tenure, APR after fees, and income-change scenario. Her reported score belongs to the likely-lender lens, not the safe calculation.

**Highest-value next questions:**

1. After rent, essentials, transfers and the car EMI, what is left in a normal and unusually expensive month?
2. How much liquid savings will remain after paying the wedding contribution and fees?
3. Are there card balances, BNPL, guarantees, or other EMIs not listed?
4. What is the shortest term that preserves her protected remainder, and what total cost does each longer term create?
5. What actual KFS terms have been offered, if any?

**Primary risks:** a lender may view the stable salary, tenure, and reported score favorably, causing a high sanction estimate to be mistaken for safety; the wedding does not create repayment cash; a long tenure can make the EMI look small while extending cost beyond the car loan; and using most savings can remove resilience.

**Explanation she should see:** “Your employment and reported credit history may make an unsecured loan easier to obtain. That does not determine what is comfortable after rent, your car loan, everyday costs, and the savings you want left. We will show those two amounts separately and compare the total cost, not only the EMI.”

No final amount, rate, or EMI is assigned here because the missing expense, buffer, term, and offer data can materially change the conclusion.

### 12.5 Persona analysis: Ravi

**Known from the assignment:** Ravi is 42 and has operated a kirana in Mysuru for 14 years. He reports cash income varying from ₹40,000 to ₹80,000 per month, ITR income of ₹4.2 lakh per year, an unencumbered shop valued by him at ₹45 lakh, no formal loan history or score, a wife earning ₹18,000 as a teacher, and a ₹15 lakh request for inventory and a delivery vehicle.

**What is uncertain:** whether ₹40,000–₹80,000 means sales, gross margin, business profit, or household take-home; monthly deposits; stock purchases and working-capital cycle; household withdrawals and essentials; seasonality; GST/ITR/bank/informal records; other supplier credit; amount split between inventory and vehicle; written quotes; incremental margin and delivery costs; property title/co-ownership and independent value; spouse's willingness/availability as contributor or co-applicant; and the time until the investment generates cash.

**Relevant product paths:** a working-capital facility for inventory, a commercial-vehicle loan, a secured micro/business loan or loan against property, or a split structure. The shop makes a secured path plausible, as the assignment expects, but not automatically suitable. Tata Capital's product page shows that lenders can consider bills, registers, notebooks, ITR, GST, and bank statements alongside property and repayment capacity. The strongest recommendation is to route Ravi to compare secured/productive products while refusing to equate his owner-estimated property value with affordability.

**Measures that matter most:** conservative net business cash in the weakest recurring month; household residual after withdrawals and spouse-income treatment; DSCR and incremental-cash coverage; evidence consistency across ITR, bank and informal records; LTV using lender valuation; working-capital cycle; vehicle operating costs/downtime; and a zero-upside stress case.

**Highest-value next questions:**

1. Is the ₹40,000–₹80,000 figure sales or cash left after stock, wages, utilities, tax and other business costs?
2. What do the last 12 months show for the weakest three months, using any available bank deposits, ITR/GST, purchase bills, ledgers or notebooks?
3. How much of the ₹15 lakh is inventory versus the vehicle, and what conservative net cash does each component add after costs?
4. How much household spending is currently taken from the shop, and is his wife's income actually available for this loan?
5. Is the shop title clear and independently valued, and would losing or encumbering it threaten the family's core livelihood?

**Primary risks:** documented income and self-reported cash may point to very different lender amounts; new-to-credit can create uncertainty without being bad credit; inventory and vehicle returns can be delayed; one large loan may mismatch two assets with different cash cycles; and using the shop as security can convert a business forecast error into loss of livelihood.

**Explanation he should see:** “A lender may recognize the shop and long operating history even without a score, especially if your records show consistent cash flow. The property supports a secured product; it does not make the repayment affordable. We will base safety on a weak business month, household withdrawals, and the investment's conservative return, then show the shop-at-risk consequence separately.”

No final amount or LTV is assigned because the income definition, records, product split, title, lender valuation, and household cash flow are unresolved.

### 12.6 Persona analysis: Anita

**Known from the assignment:** Anita is 35 in Hubballi, earns ₹26,000–₹30,000 per month from delivery and tailoring, supports two children, and has a husband who has been unemployed for eight months. She has three app loans with ₹35,000 outstanding at rates described as 30%+, a bounced EMI last month, and wants ₹1.5 lakh for an electric scooter.

**What is uncertain:** whether stated income is net after delivery/tailoring costs; household essentials and housing; each loan's regulated lender, balance, EMI, APR, due date, arrears, fees and remaining term; whether the “30%+” figure is nominal rate or APR; collection pressure; liquid savings/support; current vehicle rental/fuel/maintenance cost; scooter quote, subsidy, financing and battery/insurance costs; incremental net income; and whether income or repayments are worsening.

**Relevant product paths:** obligation stabilization first; direct contact with each regulated lender and grievance escalation if needed; a refinance/consolidation comparison only if it reduces all-in cost, closes the old facilities, avoids cash top-up, and improves both stress residual and total cost; then an EV/vehicle-finance assessment after the debt position is stable. A fresh generic app loan is not a suitable default route.

**Measures that matter most:** complete debt calendar, overdue amount, current debt service versus low-month net income, residual after essentials, full old-versus-new APR/cash-flow comparison, active-facility closure, liquid buffer, and conservative scooter net benefit after ownership costs. Her reported monthly income annualizes slightly above ₹3 lakh, so the RBI microfinance rule cannot be assumed without determining household income and loan scope.

**Highest-value next questions:**

1. Who is the regulated lender behind each app, what does each KFS say, and what amount is due on which date?
2. Is she borrowing, delaying essentials, or skipping another bill to make current payments?
3. What remains in her lowest income month after household essentials and the current three payments?
4. Would the scooter replace a known monthly rental/fuel cost or produce reliable additional net income after battery, maintenance, insurance and downtime?
5. If consolidation is offered, are all fees included, will each old account be closed, and what are total payment and tenure—not just the new EMI?

**Primary risks:** a debt spiral, penal/bounce charges, misidentifying an app rather than its RE, settlement promises that harm the credit file, a longer consolidation term hiding higher total cost, and counting uncertain scooter income before current arrears are stable.

**Explanation she should see:** “A missed payment and several high-cost loans mean the immediate goal is to stop the debt position getting worse, not to judge your worth or maximize another approval. First we will list what is actually due and verify each lender and KFS. A replacement loan is helpful only if it closes the old debts and improves both monthly breathing room and total cost. The scooter can be tested separately once that base is clear.”

On the stated facts, the appropriate **qualitative test outcome** is “do not add ordinary new debt now; stabilize and verify first.” This is a persona-level safety direction, not a real lending decision or a calculation of Anita's final affordable amount.

### 12.7 Smallest credible 12–16-hour implementation

| Work block | Deliverable | Approximate effort |
|---|---|---:|
| 1. Rules and content | One RULES.md with formulas, labels, provenance, scope and three persona fixtures | 2 hours |
| 2. Adaptive form | One responsive flow, 8–10 baseline questions and salaried/business-secured/distress branches | 3–4 hours |
| 3. Calculations | EMI, total repayment, residual, inverse principal, APR from complete cash flows, base/stress scenarios | 3 hours |
| 4. Results | Direction, two lenses, price/cost, stress explanation, confidence dimensions | 2–3 hours |
| 5. Negotiation Card | Browser print/copy view; no account or server | 1 hour |
| 6. Verification | Three persona fixtures, edge cases, accessibility and calculation checks | 2–3 hours |

The build should cover only:

- unsecured consumption/personal lending;
- productive vehicle/working-capital and property-secured routing at a conceptual level;
- existing-debt distress/refinance comparison;
- local in-browser state, reset, and printable/copyable output;
- one manually curated, date-stamped example market band per demonstrated product category; and
- three assignment personas plus a few arithmetic edge cases.

It should deliberately skip live lender matching, applications, phone/PAN, uploads, persistent history, bureau/AA/bank integrations, automated scraping, multilingual content, ML, probability of approval/default, personalized lender ranking, and broad loan-category coverage. Those features do not strengthen the core demo enough to justify their implementation or compliance surface.

### 12.8 What belongs in RULES.md

RULES.md should be a product-governance document that the interface and tests can reference. Each rule needs:

| Field | Purpose |
|---|---|
| Rule ID and short name | Stable reference for UI explanations and tests |
| Output affected | Direction, lender lens, safe lens, APR, stress, confidence, or card |
| Rule type | Formula, binding regulation, sourced market practice, or design judgment |
| Inputs and units | Exact numerator/denominator, gross/net, monthly/annual, inclusive/exclusive categories |
| Condition and consequence | Human-readable logic, including priority/override behavior |
| Hard/soft status | Hard arithmetic/regulation versus heuristic/advisory behavior |
| Rationale | Why the rule exists and what harm it prevents |
| Source/jurisdiction | Direct link and whether India, international comparator, research, or internal design |
| Effective/access/review dates | Prevent stale law, rates, or product evidence |
| Unknown behavior | Omit, range, block, or request more information—never silent default |
| Exceptions/scope | Especially microfinance, product/security and floating-rate boundaries |
| Explanation template | The actual user-facing reason generated when triggered |
| Test examples | Priya, Ravi, Anita, boundary and missing-data cases |
| Version/change note | Auditability when a rule or source changes |

Minimum rule entries should include:

- EMI and zero-interest formulas;
- APR cash-flow completeness and KFS fields;
- residual and inverse-principal calculations;
- distinct lender/safe lenses;
- first-class unknown behavior;
- active-distress routing and refinance comparison;
- low-month and product-specific stress scenarios;
- productive-income double-count prevention;
- collateral/LTV separation from affordability;
- conditional microfinance-scope logic and 50% ceiling;
- rate-band source date and expiry/review behavior;
- confidence-dimension definitions; and
- no-positive-upsell rule when requested amount is already within the safe range.

Example classification: “If active arrears are disclosed, do not issue a positive ordinary-new-debt recommendation until current obligations are mapped” is a **design safety judgment**, not RBI law. “For an in-scope microfinance household, aggregate repayment obligations may not exceed 50% of household monthly income” is a **binding sourced rule** with a narrow scope. Keeping those labels visible is central to honesty.

---

## 13. Open questions and source-and-assumption register

### 13.1 Product questions to resolve before implementation

1. **What does “safe” authorize the product to say?** The team should choose between “supported by your entered scenario,” “appears manageable,” and stronger language, then obtain legal/content review before public release.
2. **How should the protected remainder be elicited?** Direct rupee entry is transparent but unfamiliar. A short guided reflection may improve usability, but any suggested value needs evidence and must remain editable.
3. **Which rate-band product categories are demonstrated?** One band should never mix secured and unsecured loans, salaried and business products, or fixed and floating rates. The demo can credibly maintain only a small set.
4. **When does distress override become advisory rather than blocking?** The prototype can withhold a positive ordinary-loan recommendation, but a production policy needs tested definitions for arrears, bounce recency, rollover, and essential-spending hardship.
5. **Which support destinations are safe to name?** RBI CMS is suitable for eligible complaints after lender grievance handling; financial counseling, legal aid, or debt support should be vetted by geography and service model before linking.
6. **Should spouse/household income ever raise the safe amount?** Only if the user confirms it is reliably available for repayment; co-applicant and ownership consequences need clear copy.
7. **How are mixed business and household finances handled?** A production flow may need a simple separation worksheet before any DSCR-like result.
8. **What expiry applies to market pricing evidence?** A quarterly review is intuitive because RBI disclosure examples use previous-quarter data, but an operational owner and change trigger are needed.
9. **Can the user save locally?** The safest prototype resets on close. Local storage improves continuity but creates privacy and shared-device risks; it should be opt-in, visibly deletable, and omitted unless demonstrated value outweighs risk.
10. **Which languages and literacy level are required?** Kannada and Hindi may be valuable for the named personas, but reliable financial/legal translation and voice/accessibility testing exceed the 12–16-hour scope.

### 13.2 Regulatory and operating questions for any production version

- Would referral links, lender ranking, lead capture, remuneration, or application hand-off make the operator an LSP or otherwise alter its regulatory obligations?
- Which entity owns and maintains legal interpretations, rate evidence, complaints content, and lender identity verification?
- How will DPDP commencement phases and future amendments be tracked before collecting or storing any personal data?
- If transaction, bureau, AA, GST, or document data is added, what consent, retention, deletion, security, localization, vendor, and audit controls apply?
- How will the product avoid implying RBI approval when referencing the public DLA repository?
- When is a result financial advice, and what review, disclaimer, record, and grievance duties follow?
- How will APR be validated for irregular cash flows, moratoria, bullet repayments, financed fees, floating resets, and contingent charges?
- Which human escalation handles coercive recovery, fraud, identity misuse, legal notices, or immediate hardship beyond a calculator's competence?

### 13.3 Source-and-assumption register

| Topic/claim used | Primary evidence | Evidence status | Interpretation or assumption applied | Product use |
|---|---|---|---|---|
| Digital offer fields, cooling-off, conduct, data limits and grievance | [RBI Digital Lending Directions, 2025](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12848&Mode=0), issued 8 May 2025 | Binding Indian direction for covered REs/LSPs | Prototype mirrors disclosure and minimization principles but is not assumed to be an RE/LSP | Offer checklist, privacy, complaint copy |
| KFS and APR include associated charges | [RBI KFS circular](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0), issued 15 April 2024 | Binding for covered retail/MSME term loans from 1 October 2024 | APR calculator requires complete cash flows; no guessed fees | Cost receipt and Negotiation Card |
| Interest charged only for actual outstanding period | [RBI fair-practices circular](https://www.rbi.org.in/scripts/bs_circularindexdisplay.aspx/BS_CircularIndexDisplay.aspx?Id=12678), issued 29 April 2024 | Binding supervisory instruction | Add offer check for sanction/disbursal mismatch and advance instalments | Offer warning |
| Penal charge is disclosed, reasonable and not penal interest | [RBI penal-charges circular](https://systemhealth.rbi.org.in/Scripts/NotificationUser.aspx_Id%3D12527%26Mode%3D0%281%29.html), issued 18 August 2023 | Binding for covered lenders | Show penal/bounce fields separately, do not fold unknown contingent cost into advertised rate | Card and offer comparison |
| Floating loans need rate-change headroom/options | [RBI reset circular](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12529&Mode=0), issued 18 August 2023, updated later | Binding for covered EMI-based personal loans | Use payment/tenure stress only when product is floating | Stress case |
| Household repayment cap of 50% | [RBI microfinance FAQ](https://www.rbi.org.in/commonperson/English/Scripts/FAQs.aspx?Id=3366), updated 30 January 2025 | Binding only within defined low-income household scope | Never use as a universal FOIR; first determine household income/product scope | Conditional compliance rule |
| Gold valuation and tiered LTV | [RBI Gold and Silver Directions, 2025](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12859&Mode=0), issued 6 June 2025 | Binding with compliance timeline | LTV is a maximum product constraint, not borrower capacity | Secured branch |
| Housing LTV categories | [RBI prudential handbook](https://website.rbi.org.in/documents/d/rbi/handbookg27022025d0f3f53f5d3c4310a6bb2f8ac2175d3a) | Official prudential compilation | Do not transpose housing limits to shop property or call them affordable | Methodology boundary |
| DLA repository is not RBI endorsement | [RBI DLA repository announcement](https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=58449) plus Digital Lending Directions | Official statement/direction | Verify association but avoid “RBI-approved” label | Safety copy |
| Credit score range and NA/NH meaning | [CIBIL FAQ](https://www.cibil.com/frequent-queries) and [report guide](https://www.cibil.com/content/dam/cibil/consumer/CIBIL-Report-Understanding.pdf) | Official bureau education | Unknown or thin-file is neutral, not an adverse score | Lender-likelihood input |
| Free annual report and correction compensation | [RBI free-report notification](https://rbi.org.in/commonperson/English/Scripts/Notification.aspx?Id=1884), [correction circular](https://systemhealth.rbi.org.in/Scripts/NotificationUser.aspx_Id%3D12554%26Mode%3D0%281%29.html) | Official consumer rights | Recommend report/correction only when it resolves relevant uncertainty | Next actions |
| AA explicit consent/no retained financial data | [RBI AA Master Direction](https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D10598%281%29.html) | Binding AA framework | Borrow consent grammar; do not implement AA for prototype | Privacy design |
| AA apps can still process other data | [OneMoney policies](https://www.onemoney.in/onemoney/policies/) | Vendor disclosure | “AA does not store financial data” is not equivalent to “app collects nothing” | Evidence caveat |
| DPDP provisions and rules are phased | [Act](https://www.indiacode.nic.in/indiacode/handle/123456789/22037?view_type=browse), [commencement Gazette](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf), [Rules Gazette](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf) | Enacted law with phased commencement | As of 5 September 2026, many substantive processing provisions begin 13 May 2027; obtain counsel for production | Legal status and privacy plan |
| Banks publish product/category price information | [RBI display guidance](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=9862), official lender pages such as [HDFC](https://www.hdfc.bank.in/personal-loan/interest-rates-and-charges) | Official requirement plus changing product evidence | Build broad dated observed bands; never promise an individual's rate | O3 market reference |
| Eligibility tools use profile/income/obligations | [ICICI C360](https://www.icici.bank.in/calculator/customer-360-eligibility-calculator), [Paisabazaar](https://www.paisabazaar.com/personal-loan/eligibility-calculator/) | Official lender and marketplace examples | Repeated pattern, not a complete census or common cutoff | Likely-lender lens |
| Productive/secured MSME can use nonstandard records | [Tata Capital micro LAP](https://www.tatacapital.com/business-loan/micro-loan-against-property.html), [Kinara](https://kinaracapital.com/msme-loans/) | Lender claims/current product conditions | Evidence categories can guide Ravi; actual acceptance remains lender-specific | Business branch |
| Cash-flow data may add underwriting value | [FinRegLab empirical study](https://finreglab.org/research/the-use-of-cash-flow-data-in-underwriting-credit-empirical-research-findings/) | Empirical research on participating providers | Supports cash-flow relevance, not a claim that three self-reported values reproduce a model | Income-range design |
| Credit risk and affordability are different | [FCA policy statement](https://www.fca.org.uk/publications/policy-statements/ps18-19-assessing-creditworthiness-consumer-credit) | UK regulatory framework | Conceptual definition only; not asserted as Indian law | Two-lens architecture |
| Public calculator limitations | [Moneysmart calculator](https://moneysmart.gov.au/loans/personal-loan-calculator) | Australian government consumer tool | Copy its transparent limitation pattern, not its jurisdictional assumptions | Disclaimer/receipt |
| Shock resilience can be asked without identity/storage | [CFPB Financial Well-Being tool](https://www.consumerfinance.gov/consumer-tools/financial-well-being/) | Validated US well-being measure/tool | Borrow question style only; do not reuse score as credit cutoff | Buffer questions |
| Explicit unknown/refusal response design | [OECD/INFE Toolkit 2026](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/oecd-infe-toolkit-for-measuring-financial-literacy-inclusion-and-well-being-2026_6e8d9566/92f2d439-en.pdf) | International measurement toolkit | Supports respectful response options; local usability still untested | Missing-data UX |
| Expected loss uses PD, LGD and EAD | [Basel Framework](https://www.bis.org/baselframework/BaselFramework.pdf) | International bank prudential framework | Demonstrates why a borrower prototype cannot infer risk price | Explicit non-goal |
| Model use requires validation/governance | [Federal Reserve model-risk guidance](https://www.federalreserve.gov/frrs/guidance/supervisory-guidance-on-model-risk-management.htm) | US supervisory benchmark | Used only to identify prerequisites absent here | No-ML decision |
| Vendor automation claims | [Zest AI](https://www.zest.ai/product/underwriting), [Provenir](https://www.provenir.com/), [Taktile](https://taktile.com/credit-decision-automation) | Vendor-reported | Category evidence, not independent accuracy/fairness proof | Landscape only |
| Distress services may involve settlement trade-offs | [FREED FAQ](https://freed.care/faq), [CreditMantri](https://www.creditmantri.com/credit-improvement-services/) | Provider disclosures | Do not promise savings or score repair; vet referrals separately | Anita branch boundary |
| Adaptive questions can reduce burden | [Adaptive loan-questionnaire paper](https://www.sciencedirect.com/science/article/abs/pii/S0377221706011908) | Older academic study, context-specific | Apply value-of-information principle, not its particular model | Form flow |

---

## 14. Evidence gaps and validation plan

### 14.1 Important gaps

| Evidence gap | Why it matters | What this report does instead | Recommended validation |
|---|---|---|---|
| No representative market-share data for calculator/underwriting methods | Cannot rank approaches by true prevalence | Says “commonly observed” and lists examples, not percentages | Sample leading banks/NBFCs by disclosed portfolio and code a reproducible feature audit |
| Proprietary lender thresholds and policies | Likely-sanction amount cannot be precise | Uses broad product/documentation factors and explicit non-offer language | Partner with lenders or test against published eligibility outcomes with consent |
| No validated universal Indian affordability threshold | A single FOIR/residual cutoff could cause harm | Uses user-protected remainder, residual scenarios, and a conditional microfinance rule only | Outcome-linked Indian household study segmented by income type, region, household and product |
| Self-reported expense accuracy | Safe amount is sensitive to omissions | Allows totals/ranges, consistency prompts, and blocks safe label when absent | Cognitive interviews and comparison with consented statements/diaries |
| Informal-income measurement | Ravi-like users may be unfairly downgraded or overestimated | Separates capacity from documentability and asks low/typical/high net cash plus records | Longitudinal bank/cash-book study across seasonal MSMEs and gig workers |
| Rate-band comparability | Advertised, contracted, secured, fixed/floating and fee-inclusive prices differ | Requires narrowly defined product categories, official sources and dates | Quarterly normalized price dataset with KFS-based APR samples and methodology review |
| Stress magnitude evidence | Arbitrary shocks can be too mild or too severe | Uses user-described low month and editable assumptions | Analyze observed income/expense volatility by segment and test comprehension |
| Distress override sensitivity | It may block beneficial consolidation or miss risk | Allows only a full old/new cash-flow test; avoids universal numerical trigger | Expert debt-counsel review plus retrospective case evaluation |
| Collateral consequence comprehension | Users may anchor on eligible amount and discount asset loss | Separates LTV, affordability, and livelihood warning | Usability testing on gold, home, shop and vehicle scenarios |
| Fairness across language, literacy and income formality | Neutral arithmetic can still be inaccessible or biased | Avoids sensitive proxies and proposes counterfactual tests | Kannada/Hindi translation, screen-reader testing, cognitive interviews and subgroup outcome audit |
| Persona representativeness | Three cases cannot establish general policy | Treats them as fixtures, not a population | Add diverse cases only after the core rules are validated |
| Legal classification of a future commercial product | Referrals/data/monetization can change duties | Keeps prototype local, anonymous and non-transactional | Indian regulatory counsel before lender links, leads, storage or advice claims |
| DPDP and RBI changes after cut-off | Compliance and wording can become stale | Dates every legal conclusion and source | Scheduled quarterly legal/source review with named owner |
| Vendor effectiveness/fairness claims | Marketing claims may be selective | Labels them vendor-reported and excludes ML | Seek independent evaluations, model cards and subgroup validation |

### 14.2 Minimum pre-production research

Before a public or transactional release, conduct:

1. **Cognitive interviews** with at least salaried, cash-business, gig/irregular-income, thin-file, secured-loan, and active-distress participants. Focus on the meaning of net income, essential expense, protected remainder, likelihood versus safety, and APR.
2. **Calculation validation** against lender KFS examples and independent spreadsheet implementations for fixed, zero-rate, deducted-fee, irregular-payment, floating, and refinance cases.
3. **Policy review** by Indian lending/compliance counsel, especially LSP classification, comparison/ranking, disclosures, DPDP timing, complaint language, and use of “safe” or “fair.”
4. **Rule back-testing** on consented historical cash flows and outcomes. Measure false reassurance and unnecessary blocking, not only approval agreement.
5. **Fairness testing** that holds financial facts constant while changing names, cities, work labels and household descriptions; then outcome testing across relevant groups where lawful and ethical.
6. **Usability/accessibility testing** in target languages, low-bandwidth/shared-device conditions, keyboard/screen reader, and numeracy levels.
7. **Referral due diligence** for every lender, marketplace, counselor, or support service, including regulated entity identity, incentives, fees, privacy and complaint route.

---

## 15. Source appendix

All web sources below were accessed or checked on 5 September 2026 unless an issue/effective date is stated in the report. Product pages remain time-sensitive. The appendix groups direct links for auditability; the interpretation of each source appears in the relevant section and the register above.

### A. Indian regulation, consumer protection, and policy

- Reserve Bank of India, [Digital Lending Directions, 2025](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12848&Mode=0).
- RBI, [Key Facts Statement for Loans and Advances](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12663&Mode=0) and [official APR/amortization annex](https://rbidocs.rbi.org.in/rdocs/content/pdfs/CIRCULARKFS1504242_B.pdf).
- RBI, [Reset of Floating Interest Rate on EMI-based Personal Loans](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12529&Mode=0).
- RBI, [Fair Practices Code—Charging of Interest](https://www.rbi.org.in/scripts/bs_circularindexdisplay.aspx/BS_CircularIndexDisplay.aspx?Id=12678).
- RBI, [Fair Lending Practice—Penal Charges in Loan Accounts](https://systemhealth.rbi.org.in/Scripts/NotificationUser.aspx_Id%3D12527%26Mode%3D0%281%29.html).
- RBI, [Regulatory Framework for Microfinance Loans](https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D12256%282%29.html) and [FAQ](https://www.rbi.org.in/commonperson/English/Scripts/FAQs.aspx?Id=3366).
- RBI, [Lending Against Gold and Silver Collateral Directions, 2025](https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12859&Mode=0).
- RBI, [Prudential Regulations Handbook](https://website.rbi.org.in/documents/d/rbi/handbookg27022025d0f3f53f5d3c4310a6bb2f8ac2175d3a).
- RBI, [Display of Information by Banks](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=9862).
- RBI, [Interest Rate on Advances directions](https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D10295.html).
- RBI, [Master Direction—Priority Sector Lending/MSME context](https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D11060.html).
- RBI, [Public repository of digital lending apps announcement](https://rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=58449).
- RBI, [Working Group on Digital Lending report](https://systemhealth.rbi.org.in/Scripts/PublicationReportDetails.aspx_UrlPage%3D%26ID%3D1189%281%29.html).
- RBI, [Financial Awareness Messages](https://www.rbi.org.in/commonperson/images/FAME202426022024.pdf), [Financial Education Guide](https://www.rbi.org.in/financialeducation/content/GUIDE310113_F.pdf), and [I Can Do financial education booklet](https://www.rbi.org.in/FinancialEducation/content/I%20Can%20Do_RBI.pdf).
- RBI, [Complaint Management System](https://cms.rbi.org.in/).
- RBI, [Free annual full credit report notification](https://rbi.org.in/commonperson/English/Scripts/Notification.aspx?Id=1884).
- RBI, [Compensation for delayed credit-information correction](https://systemhealth.rbi.org.in/Scripts/NotificationUser.aspx_Id%3D12554%26Mode%3D0%281%29.html).
- RBI, [Account Aggregator Master Direction](https://systemhealth.rbi.org.in/Scripts/BS_ViewMasDirections.aspx_id%3D10598%281%29.html).
- RBI, [Annual Report 2024–25](https://www.rbi.org.in/scripts/AnnualReportPublications.aspx?Id=1436), including Unified Lending Interface context.
- India Code, [Digital Personal Data Protection Act, 2023](https://www.indiacode.nic.in/indiacode/handle/123456789/22037?view_type=browse).
- Ministry of Electronics and Information Technology, [DPDP commencement notification](https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf) and [Digital Personal Data Protection Rules, 2025](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf).

### B. Credit information and consented financial data

- TransUnion CIBIL, [Frequently Asked Questions](https://www.cibil.com/frequent-queries), [understanding score/report FAQ](https://www.cibil.com/faq/understand-your-credit-score-and-report), and [CIBIL report guide](https://www.cibil.com/content/dam/cibil/consumer/CIBIL-Report-Understanding.pdf).
- Experian India, [consumer credit report/score portal](https://consumer.experian.in/ECV-OLN/view/angular/).
- CRIF High Mark, [credit-information products](https://www.crifhighmark.com/products-and-services/credit-information).
- Sahamati, [AA ecosystem site](https://sahamati.org.in/), [2024 annual report](https://sahamati.org.in/wp-content/uploads/2024/12/Sahamati-Annual-Report-2024.pdf), and [fair-use principles](https://sahamati.org.in/fair-use-explained-building-responsible-lending-journeys-on-the-account-aggregator-framework/).
- OneMoney, [policies and privacy disclosures](https://www.onemoney.in/onemoney/policies/).

### C. Indian lender and marketplace examples

- ICICI Bank, [Customer 360 Eligibility Calculator](https://www.icici.bank.in/calculator/customer-360-eligibility-calculator) and [Personal Loan EMI Calculator](https://www.icici.bank.in/personal-banking/loans/personal-loan/emi-calculator).
- HDFC Bank, [Personal Loan Interest Rates and Charges](https://www.hdfc.bank.in/personal-loan/interest-rates-and-charges).
- State Bank of India, [Loan Scheme Interest Rates](https://sbi.bank.in/web/interest-rates/interest-rates/loan-schemes-interest-rates).
- Bajaj Finserv, [Loan Against Property Eligibility Calculator](https://www.bajajfinserv.in/loan-against-property-eligibility-calculator).
- Tata Capital, [Micro Loan Against Property](https://www.tatacapital.com/business-loan/micro-loan-against-property.html) and [Loan Against Property](https://www.tatacapital.com/loan-against-property.html).
- Muthoot Finance, [Gold Loan](https://www.muthootfinance.com/gold-loan) and [Gold Loan Calculator](https://www.muthootfinance.com/gold-loan/calculator).
- Mahindra Finance, [official lending site](https://www.mahindrafinance.com/).
- Fibe, [Personal Loan](https://www.fibe.in/personal-loan/) and [Personal Loan Eligibility Calculator](https://www.fibe.in/personal-loan-eligibility-calculator/).
- Moneyview, [Loans FAQ](https://moneyview.in/loans-faq-en).
- KreditBee, [Personal Loan](https://www.kreditbee.in/personal-loan).
- Kinara Capital, [MSME Loans](https://kinaracapital.com/msme-loans/).
- Lendingkart, [GST Business Loan](https://www.lendingkart.com/gst-business-loan/).
- Indifi, [Indifi Pay](https://www.indifi.com/indifipay).
- Paisabazaar, [Personal Loan Eligibility Calculator](https://www.paisabazaar.com/personal-loan/eligibility-calculator/) and [Personal Loan Marketplace](https://www.paisabazaar.com/personal-loan/).
- BankBazaar, [Personal Loan Eligibility](https://www.bankbazaar.com/personal-loan-eligibility.html).
- Wishfin, [credit and loan marketplace](https://www.wishfin.com/).

### D. Debt wellness and credit improvement

- FREED, [debt-relief service](https://freed.care/) and [FAQ](https://freed.care/faq).
- CreditMantri, [Credit Improvement Services](https://www.creditmantri.com/credit-improvement-services/).
- OneScore, [CIBIL terms](https://www.onescore.app/legal/cibiltnc/) and [privacy policy](https://www.onescore.app/privacy/).

### E. International public-interest and supervisory comparators

- Australian Securities and Investments Commission Moneysmart, [Personal Loan Calculator](https://moneysmart.gov.au/loans/personal-loan-calculator) and [Personal Loans guidance](https://moneysmart.gov.au/loans/personal-loans).
- US Consumer Financial Protection Bureau, [Financial Well-Being tool](https://www.consumerfinance.gov/consumer-tools/financial-well-being/), [scale research](https://www.consumerfinance.gov/data-research/research-reports/financial-well-being-scale/), [Loan Estimate guide](https://www.consumerfinance.gov/owning-a-home/loan-estimate/), [DTI definition](https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/), [ability-to-repay rule](https://www.consumerfinance.gov/rules-policy/regulations/1026/43/), [APR explanation](https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/), and [complex-algorithm adverse-action circular](https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/).
- UK Financial Conduct Authority, [Assessing creditworthiness in consumer credit](https://www.fca.org.uk/publications/policy-statements/ps18-19-assessing-creditworthiness-consumer-credit).
- UK MoneyHelper, [Applying to borrow](https://www.moneyhelper.org.uk/en/everyday-money/credit/apply-to-borrow-for-credit-card-or-loan).
- MoneySavingExpert, [Loans Eligibility Calculator](https://www.moneysavingexpert.com/eligibility/loans-calculator/search/) and [Credit Club](https://www.moneysavingexpert.com/creditclub/).
- OECD/INFE, [Toolkit for Measuring Financial Literacy, Inclusion and Well-Being 2026](https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/01/oecd-infe-toolkit-for-measuring-financial-literacy-inclusion-and-well-being-2026_6e8d9566/92f2d439-en.pdf).
- World Bank, [Financial Capability Surveys Around the World](https://documents.worldbank.org/en/publication/documents-reports/documentdetail/451321468336534492).

### F. Cash flow, risk, explainability, and model governance

- FinRegLab, [The Use of Cash-Flow Data in Underwriting Credit](https://finreglab.org/research/the-use-of-cash-flow-data-in-underwriting-credit-empirical-research-findings/) and [Small Business Spotlight report](https://finreglab.org/wp-content/uploads/2023/12/FinRegLab_2019-09-06_Research-Report_Small-Business-Spotlight_The-Use-of-Cash-Flow-Data-in-Underwriting-Credit.pdf).
- International Finance Corporation, [Cracking the Credit Code: Alternative Data and AI for Financial Inclusion](https://www.ifc.org/en/insights-reports/2026/cracking-the-credit-code-alternative-data-and-ai-for-financial-inclusion) and [India MSME risk-finance assessment](https://www.ifc.org/content/dam/ifc/doc/mgrt/assessment-of-state-of-risk-finance-for-msmes-in-india.pdf).
- Basel Committee on Banking Supervision, [Basel Framework](https://www.bis.org/baselframework/BaselFramework.pdf) and [credit-risk/ECL guidance](https://www.bis.org/committees/bcbs/basel-consolidated-guidelines/module/pap/20).
- World Bank, [Analyzing Banking Risk](https://documents1.worldbank.org/curated/en/403931618461962435/pdf/Analyzing-Banking-Risk-Fourth-Edition-A-Framework-for-Assessing-Corporate-Governance-and-Risk-Management.pdf).
- US Federal Reserve, [Supervisory Guidance on Model Risk Management](https://www.federalreserve.gov/frrs/guidance/supervisory-guidance-on-model-risk-management.htm) and [SR 26-2 revision notice](https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm).
- US National Institute of Standards and Technology, [AI Risk Management Framework resources](https://airc.nist.gov/airmf-resources/airmf/).
- US Office of the Comptroller of the Currency, [Commercial Real Estate Lending handbook](https://www.occ.treas.gov/publications-and-resources/publications/comptrollers-handbook/files/commercial-real-estate-lending/pub-ch-commercial-real-estate-previous.pdf) for DSCR context.
- US Small Business Administration, [SBA Lenders](https://www.sba.gov/sba-lenders/) and Office of Inspector General, [underwriting audit report](https://legacy.sba.gov/document/report-10-10-report-10-10-audit-premier-certified-lenders-section-504-loan-program).
- Phillips et al., [An adaptive questionnaire for loan assessment](https://www.sciencedirect.com/science/article/abs/pii/S0377221706011908).
- Taktile, [Credit Decision Automation](https://taktile.com/credit-decision-automation); Provenir, [Decisioning Platform](https://www.provenir.com/); Zest AI, [Underwriting](https://www.zest.ai/product/underwriting) and [Model Explainability](https://www.zest.ai/learn/resources/model-explainability-reexplained/). These are vendor descriptions, not independent validation.

---

## Final research conclusion

The central product opportunity is a distinction, not an algorithm: **the amount a lender may offer is not the amount a borrower can safely carry**. The strongest prototype makes that distinction visible with simple, inspectable arithmetic; asks fewer but higher-value questions; respects unknown information; routes productive and secured borrowing differently; interrupts debt-spiral behavior; and turns regulatory disclosures into practical negotiating questions.

The research does not support a universal Indian FOIR threshold, an exact approval probability, or a personalized risk-priced rate from anonymous self-report. It does support a useful and buildable alternative: transparent lender-likelihood context, stress-aware household residuals, complete APR math, dated official price evidence, and an auditable explanation for every recommendation.

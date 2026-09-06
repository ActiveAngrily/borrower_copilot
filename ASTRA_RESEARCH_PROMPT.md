# GPT-6 Astra Research Prompt: Borrower Copilot Market and Decision-Science Research

You are GPT-6 Astra. Conduct a rigorous, evidence-backed research project for a four-day take-home build challenge called **Borrower Copilot**.

The proposed product is a borrower-facing self-assessment assistant for Indian borrowers. It should help a person answer four questions before approaching a lender:

1. Should I borrow, borrow less, or not borrow?
2. How much might a lender sanction, and how much can I safely carry?
3. What interest-rate range is fair for my profile, including the all-in APR after fees?
4. What EMI and tenure should I agree to, including a stress case?

The product has no login, no bureau pull, no backend requirement, and should not store personal data. It relies on self-reported borrower information, must handle unknown values honestly, should ask adaptive questions, and must explain every important number in plain language. The three reference borrowers are:

- Priya: salaried software engineer, strong income and credit profile, wants an unsecured personal loan for a wedding.
- Ravi: self-employed kirana owner, variable cash income, low documented income, owns an unencumbered shop property, wants money for inventory and a delivery vehicle.
- Anita: informal delivery-platform and tailoring income, unemployed spouse, existing high-cost app loans, recent bounced EMI, wants an electric scooter.

The goal of this research is **not** to produce a final implementation or pretend to make a real underwriting decision. The goal is to understand the market, available approaches, relevant objective measures, evidence quality, and practical design choices well enough to make a defensible product proposal and later document its assumptions.

## Research questions

Investigate the following questions in depth.

### 1. Market landscape

Identify as many relevant companies, products, tools, and public resources as practical across these categories:

- Indian banks and NBFCs offering personal, home, loan-against-property, gold, vehicle, and business loans;
- Indian fintech lenders and digital lending platforms;
- borrower-facing loan eligibility, affordability, EMI, APR, and comparison calculators;
- financial wellness, debt-management, refinancing, and credit-improvement products;
- loan marketplaces and negotiation/comparison products;
- open-banking, account-aggregation, cash-flow underwriting, and alternative-data platforms;
- credit bureaus and credit-score education products;
- international products that provide borrower self-assessment, affordability, loan comparison, or negotiation support;
- lending decisioning, explainability, fairness, and model-governance platforms;
- public-sector, regulatory, academic, and nonprofit resources relevant to responsible lending.

For each meaningful example, capture:

- company or product name;
- country and target segment;
- borrower problem addressed;
- loan products covered;
- inputs requested;
- outputs produced;
- whether it estimates lender eligibility, borrower affordability, pricing, repayment risk, or something else;
- whether it uses self-reported data, bureau data, bank data, documents, or alternative data;
- whether it shows ranges, confidence, stress tests, explanations, or fee-inclusive cost;
- adaptive-question behavior, if any;
- privacy and data-storage model;
- notable strengths and limitations;
- business model, if discoverable;
- primary source link and date checked.

Do not merely list companies. Group them by actual product approach and explain what each group teaches us.

### 2. Existing analytical approaches

Compare the main approaches already used in lending and borrower tools, including where appropriate:

- rule-based affordability and FOIR-style assessment;
- DTI or debt-service-ratio approaches;
- lender scorecards and credit-risk models;
- income and employment stability assessment;
- cash-flow underwriting for self-employed and informal borrowers;
- secured-loan collateral and loan-to-value assessment;
- bureau-score and repayment-history approaches;
- bank-statement and account-aggregator analysis;
- alternative-data and behavioural models;
- expected-loss, probability-of-default, and risk-based pricing approaches;
- scenario analysis and stress testing;
- affordability-first or financial-wellness approaches;
- hybrid approaches combining rules, scores, ranges, and human judgement.

For each approach, explain:

- what decision it supports;
- required data;
- the core calculation or logic at a conceptual level;
- what makes it objective or subjective;
- where it works well;
- where it fails;
- how it treats missing or unreliable data;
- whether it is understandable to a borrower;
- whether it is appropriate for a small no-backend prototype;
- risks of unfairness, overconfidence, exclusion, or misuse.

Do not jump directly to a preferred solution. First compare the approaches fairly.

### 3. Objective measures used by industry

Explain the objective measures commonly used by lenders, regulators, credit analysts, and consumer-finance tools. At minimum investigate:

- FOIR and related fixed-obligation measures;
- DTI and debt-service ratios;
- loan-to-value;
- income-to-loan and income-to-EMI relationships;
- disposable-income or residual-income methods;
- minimum-surplus or affordability-buffer methods;
- credit-score bands and repayment-history indicators;
- delinquency, bounce, utilization, and recent-enquiry signals;
- income volatility, stability, and documentation quality;
- loan tenure and age-at-maturity limits;
- secured versus unsecured risk differences;
- collateral quality and liquidity;
- interest-rate and fee-inclusive APR calculations;
- total cost of borrowing;
- debt-consolidation and refinance affordability;
- productive-loan cash-flow or return-on-borrowing considerations;
- stress testing for income reduction, expense increases, and rate increases;
- confidence, data completeness, and model uncertainty measures.

For each measure, explain:

- plain-language meaning;
- mathematical definition where authoritative;
- typical inputs;
- how lenders use it;
- limitations and failure modes;
- whether it is a hard cutoff, soft signal, or contextual input;
- whether it can be explained safely to a borrower;
- Indian relevance;
- authoritative source.

Clearly distinguish industry practice from regulatory requirements and from your own inference.

### 4. Indian context and regulatory considerations

Research the Indian context using current, authoritative sources where possible:

- RBI guidance relevant to digital lending, responsible lending, APR or Key Facts Statements, fees, disclosures, and borrower protection;
- treatment of processing fees and other charges in cost disclosure;
- credit-information and consent considerations;
- Account Aggregator and consent-based financial-data access;
- relevant norms for self-employed, informal, secured, and digital borrowers;
- important differences between banks, NBFCs, fintech platforms, and informal lenders;
- risks around high-cost app loans, debt rollover, collections, and borrower over-indebtedness;
- privacy, data minimization, explainability, and adverse-impact concerns;
- any important caveat about describing a prototype as educational/self-assessment rather than credit approval or regulated financial advice.

Prefer RBI, government, official lender disclosures, official bureau documentation, recognized standards, and peer-reviewed research. Do not present legal or regulatory conclusions beyond what the sources support.

### 5. Question design and adaptive assessment

Research how financial products and decision systems design short, adaptive questionnaires.

Determine:

- which questions are essential to estimate affordability, eligibility, pricing, and stress resilience;
- which questions are useful only for particular borrower segments or loan products;
- how systems branch for salaried, self-employed, informal, secured, and debt-distressed borrowers;
- how to offer “I don’t know” without penalizing the borrower unfairly;
- how to measure whether an additional question provides useful information;
- how to reduce user burden while preserving decision quality;
- how to handle inconsistent, implausible, or approximate answers;
- how to separate facts, estimates, and assumptions in the interface.

Use the idea of **value of information** where useful: every optional question should materially change an output, a range, a path, or confidence.

### 6. Explainability and borrower communication

Research practical methods for explaining lending decisions and financial calculations to ordinary borrowers.

Cover:

- reason codes;
- input-to-output traceability;
- plain-language explanations;
- showing ranges instead of false precision;
- communicating confidence and missing information;
- explaining why a lender amount differs from a safe borrower amount;
- explaining APR and processing fees;
- presenting trade-offs between EMI, tenure, and total interest;
- communicating a “do not borrow” result without shame or alarmism;
- formats similar to a Negotiation Card or pre-loan checklist.

Identify good examples and poor patterns. Explain what would be suitable for a mobile-first Indian borrower.

### 7. Fairness, safety, and failure modes

Research risks that matter when giving borrowers financial guidance based on incomplete self-reported data:

- overestimating affordability;
- treating missing credit information as bad credit;
- double-counting household expenses or obligations;
- excluding informal-income borrowers;
- rewarding optimistic or unverifiable future income;
- using collateral to hide repayment stress;
- rate ranges that appear authoritative without evidence;
- false confidence from a clean-looking interface;
- harmful debt-consolidation recommendations;
- discrimination based on proxies;
- privacy and data-retention risks;
- users misunderstanding an estimate as lender approval;
- failure to identify crisis debt or recent payment distress.

For each risk, suggest a practical mitigation suitable for a small prototype.

## Source and research standards

Use web research extensively, but prioritize source quality.

Use this source hierarchy:

1. RBI, government, statutory, and official regulatory sources;
2. official lender, bureau, Account Aggregator, and product documentation;
3. academic papers, central-bank research, and recognized industry research;
4. reputable financial publications and analyst research;
5. company marketing pages, app listings, reviews, and comparison sites only for product discovery or user-experience evidence.

For every important factual claim:

- provide a direct URL;
- provide the publication or update date when available;
- state the date accessed;
- distinguish fact, interpretation, and inference;
- note conflicting sources rather than silently choosing one;
- do not rely on search-result snippets alone;
- do not invent product rates, thresholds, market share, popularity, or regulatory status.

For market popularity, do not equate visibility with popularity. Use measurable evidence where available, such as adoption, loan-book size, disbursements, app usage, traffic, funding, official market reports, or repeated independent references. If no comparable evidence exists, say that popularity cannot be established reliably.

## Required deliverable

Produce a structured research report with the following sections:

1. **Executive summary** — the main conclusions in plain language.
2. **Problem interpretation** — what Borrower Copilot is and is not.
3. **Hard constraints and non-goals** — separated clearly from design choices.
4. **Market landscape** — categorized company and product inventory.
5. **Approach comparison** — rule-based, scorecard, cash-flow, collateral, alternative-data, affordability-first, and hybrid approaches.
6. **Objective-measure catalogue** — definitions, formulas where supported, usage, limitations, and sources.
7. **Indian lending and regulatory context** — with primary-source citations.
8. **Question-design findings** — must-question candidates, adaptive branches, and value-of-information observations.
9. **Explainability and borrower-safety findings**.
10. **Comparison matrix** — compare approaches across data required, transparency, accuracy potential, uncertainty handling, Indian suitability, implementation effort, and risk.
11. **What appears most common, most defensible, and most suitable** — treat these as three separate conclusions; do not assume they are identical.
12. **Recommended research-backed design direction** — conceptual only; no code and no unsupported final thresholds.
13. **Open questions and unresolved assumptions**.
14. **Evidence gaps and limitations**.
15. **Source appendix** — grouped by topic with direct links.

Also provide these compact tables:

- a company/product inventory;
- an objective-measure catalogue;
- a source-and-assumption register;
- a question-to-output dependency matrix;
- a risk-and-mitigation register;
- an approach decision matrix.

## How to reason about the three example borrowers

Use Priya, Ravi, and Anita as analytical test cases, not as proof that the product works.

For each person, identify:

- what information is known;
- what is uncertain;
- which loan-product paths might be relevant;
- which measures are likely to matter;
- which questions would provide the most useful additional information;
- which risks could produce a harmful recommendation;
- what the system would need to explain.

Do not calculate final loan amounts, rates, or EMIs unless clearly labelled as illustrative examples. The purpose here is to understand the decision structure and evidence requirements before implementation.

## Final quality bar

The report should help a small team answer:

- What already exists?
- Which approaches are common in industry?
- Which measures are objective and defensible?
- Which measures are only rough heuristics?
- What can be implemented transparently with self-reported data?
- What should remain uncertain?
- What should be included in `RULES.md`?
- What should be avoided because it creates false precision or borrower harm?
- What is the smallest credible product scope for a 12–16 hour prototype?

Be comprehensive in research but disciplined in conclusions. Separate evidence from judgement. Prefer a smaller number of well-supported recommendations over a long list of unverified claims.

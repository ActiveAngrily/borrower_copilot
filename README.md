<div align="center">

# Lokta Borrower Copilot

### A private, adaptive borrowing self-assessment for Indian borrowers

<p>
  <img src="https://img.shields.io/badge/runtime-browser--only-4B2440?style=flat-square" alt="Browser only" />
  <img src="https://img.shields.io/badge/build-none-1C0F18?style=flat-square" alt="No build step" />
  <img src="https://img.shields.io/badge/dependencies-zero-6E3355?style=flat-square" alt="Zero dependencies" />
</p>

<p>
  <a href="#quick-start">Quick start</a> ·
  <a href="#for-reviewers">For reviewers</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#verification">Verification</a> ·
  <a href="#project-map">Project map</a>
</p>

</div>

Lokta Borrower Copilot helps a borrower prepare for a lending conversation by keeping two questions separate:

- **What might a lender allow?** — an illustrative lender-access estimate.
- **What can the household safely carry?** — a stress-aware borrower boundary.

It adapts the questionnaire to the borrowing path, preserves unknowns instead of guessing, and produces a printable **Negotiation Card** from the same assessment result.

> [!WARNING]
> This is illustrative borrower guidance—not a lender model, loan application, credit check, approval prediction, or guarantee of affordability.

## Quick start

No installation or build step is required. From the repository root:

```bash
python3 -m http.server 8000
```

Live hosted site: [anantjamuar.me/borrower_copilot](https://anantjamuar.me/borrower_copilot/)

For local development, open [http://localhost:8000](http://localhost:8000), then stop the server with `Ctrl+C`.

## For reviewers

This is Anant Jamuar’s submission for the Lokta Borrower Copilot build challenge. The homepage sidebar suggests a review sequence, and the header gives direct access to the written deliverables without interrupting an assessment in progress.

| Deliverable | Where to start |
| --- | --- |
| Working prototype | Open the [live app](https://anantjamuar.me/borrower_copilot/), choose a borrowing purpose and follow the adaptive assessment through to the Negotiation Card. |
| Rules and assumptions | Click **Rules** for the [Decision Guide](docs/product/DECISION_GUIDE.md): a 30-second overview, decision logic, thresholds, exceptions and comparison tables, with expandable technical references on the website. |
| Full evidence | Follow the guide’s link to the [full rules and source register](docs/product/RULES.md) for individual rule IDs, derivations, source context and unresolved evidence. |
| Walkthrough | Click **Walkthrough** for [Priya’s worked example](docs/handoff/WALKTHROUGH.md), with eleven short steps separating supplied facts, labelled demonstration assumptions, exact inputs, calculations and the Negotiation Card. |

The header links open in a new tab so the current assessment keeps its answers. The reviewer pages use the same plum palette, editorial typography and responsive layout as the assessment.

### Walkthrough snapshot · Priya

The worked example preserves Priya’s ₹8 lakh wedding request and all supplied facts. It adds a labelled ₹17,000 estimate for non-rent spending and basic budget/debt clarifications. It invents no smaller wedding, extra savings or lender offer.

| Negotiation Card | Original request with budget clarifications |
| --- | --- |
| Verdict | **Do not borrow under assessed conditions** |
| Requested / recommended | ₹8,00,000 / No amount recommended |
| Safe capacity | ₹4,28,212–₹5,20,728; lower endpoint governs |
| Requested-loan payment | ₹31,386.28/month at 24%, 36 months |
| Binding stress | 20% income drop; ₹16,800/month ceiling |
| Lender access | Not estimable; income records remain unknown |
| Pricing | 9.99%–25.01% conditional benchmark APR; Low confidence |

Read the [full example and exact form choices](docs/handoff/WALKTHROUGH.md) for every clarification and remaining unknown. The assignment-only run remains incomplete. Website document links lead to GitHub’s formatted source views.

## How it works

### 1. Start with the borrowing need

The flow selects one of three supported illustrative paths:

| Path | What it covers |
| --- | --- |
| Personal | Wedding or another personal expense |
| Property-backed business | Productive business borrowing with eligible property context |
| Electric two-wheeler | An electric vehicle intended for income-producing use |

### 2. Answer only relevant questions

The app shows no more than three related question topics at a time. Later questions appear only when the selected path makes them material, including:

- income evidence and variable-income history;
- property ownership, participation, and reported value;
- vehicle price and productive-use income;
- purpose funding, own funds, and viable smaller plans;
- reserves and upcoming commitments; and
- a real lender offer, when one is available.

### 3. Read four separate outputs

The result page keeps these outputs independent so one number does not masquerade as another:

1. **Borrower capacity** — a stress-aware recurring repayment boundary.
2. **Likely lender access** — an illustrative sanction range subject to product and evidence constraints.
3. **Recommended amount** — the amount that fits the assessed conditions and funding plan.
4. **Price and offer comparison** — a benchmark or actual-offer view of rate, fees, repayment, and APR where estimable.

The assessment can end as **Borrow**, **Borrow less**, **Do not borrow under assessed conditions**, or **Incomplete assessment**. Missing facts remain visible as unresolved dependencies rather than becoming invented zeros or automatic negative findings.

## Design principles

| Principle | Behaviour |
| --- | --- |
| Borrower lens first | Household affordability is separate from lender access. |
| Unknown is not zero | Blank, unknown, range, and explicit zero retain different meanings. |
| Stress before optimism | Income drops, expense rises, commitments, fee shocks, and floating-rate exposure can bind the result. |
| Current income stays current | Projected productive income never raises current safe capacity. |
| Unsupported stays unsupported | Revolving credit, moratoria, balloons, irregular instalments, and multiple disbursements are not forced into an EMI calculation. |
| One result, one card | The Negotiation Card is rendered from the same result object as the page. |

## Privacy boundary

The app is deliberately local and session-scoped:

- no login or backend;
- no uploads, bureau pull, analytics, or application network calls;
- no `localStorage`, `sessionStorage`, IndexedDB, URL state, or saved record;
- answers stay in browser memory while the tab is open and reset when the session is cleared.

The **Share summary** and **Print card** actions are explicit, user-initiated browser actions.

## Verification

Run both framework-free checks from the repository root:

```bash
node tests/js/rules.test.mjs
python3 tests/python/validation_checks.py
```

The JavaScript check exercises the running rule engine, adaptive routes, verdict classes, offer calculations, floating-rate stress, and inactive-answer handling. The Python check acts as an independent specification oracle and validates documentation, UI invariants, accessibility-related tokens, and the no-persistence/no-network boundary. It also checks that reviewer pages match their Markdown sources and that their local links and section anchors resolve.

The current validation baseline is **599 checks with zero failures**.

## Project map

```text
index.html                 Semantic questionnaire, results, and Negotiation Card
src/app.mjs                Form state, adaptive navigation, rendering, print/share/reset
src/rules.mjs              Pure calculations, routes, output states, and verdicts
src/styles.css             Responsive Lokta-inspired visual system and print styles
src/build_guides.py        Generates reviewer pages from the Markdown sources
review/                    Static Decision Guide and walkthrough webpages
assets/lokta-monogram.svg  Supplied Lokta mark used in the app
tests/js/                  Small executable checks for the JavaScript rule engine
tests/python/              Independent validation oracle
docs/product/              Requirements, rules, data model, UX, and uncertainty policy
docs/research/             Research prompt and borrower-copilot research report
docs/validation/           Validation strategy and provided-persona run-throughs
docs/handoff/              Implementation handoff and five-minute walkthrough
reference/                 Original build-challenge brief kept as source material
```

## Updating reviewer content

Edit [DECISION_GUIDE.md](docs/product/DECISION_GUIDE.md) for the concise rules or [WALKTHROUGH.md](docs/handoff/WALKTHROUGH.md) for the written tour, then regenerate the checked-in pages:

```bash
python3 src/build_guides.py
python3 tests/python/validation_checks.py
```

No generation step is needed to run the app. The walkthrough is the written Priya case, including its form choices, reasoning and Negotiation Card.

## Scope and limitations

The product and thresholds are prototype judgements, not universal Indian lending rules or personalized lender offers. Published rates, fees, eligibility pages, and regulations are time-sensitive and must be rechecked before public or transactional use.

The supplied persona cases intentionally retain missing facts; see [docs/validation/PERSONA_RUNTHROUGHS.md](docs/validation/PERSONA_RUNTHROUGHS.md). The next useful step is empirical testing with anonymised borrower cases and current lender offers under an explicit privacy and validation plan.

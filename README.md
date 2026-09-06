# Lokta Borrower Copilot

A private, adaptive borrowing self-assessment for Indian borrowers. It separates likely lender access from a stress-aware household limit and keeps every answer in the current browser tab only.

## Run locally

No installation or build is required. From this directory:

```bash
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000), then stop the server with `Ctrl+C`.

## What the app does

- Shows no more than three relevant question topics at a time.
- Adapts the route for personal, property-backed business, and electric two-wheeler borrowing.
- Preserves unknown values and ranges instead of replacing them with zero or a midpoint.
- Separates safe borrower capacity, illustrative lender sanction, recommended amount, and price/offer comparison.
- Runs income, expense, observed-low-income, commitment, fee, and applicable floating-rate stresses.
- Keeps reserves and projected productive income separate from current repayment capacity.
- Calculates actual-offer APR only for complete supported monthly cash flows.
- Produces a printable or explicitly shareable Negotiation Card from the same result.

## Verify

```bash
node rules.test.mjs
python3 validation_checks.py
```

The JavaScript check covers the running decision engine and adaptive route. The Python oracle covers the approved Stage 10–12 specification, documentation, and Stage 15 static UI invariants.

## Project map

- `index.html` — semantic adaptive questionnaire and result structure
- `styles.css` — responsive Lokta-inspired visual system
- `lokta-monogram.svg` — supplied square Lokta mark used in the header
- `app.mjs` — in-memory navigation, form reading, rendering, print/share/reset
- `rules.mjs` — pure routing, calculations, states, stresses, and decision logic
- `RULES.md` — approved rules, assumptions, and source register
- `PERSONA_RUNTHROUGHS.md` — Priya, Ravi, and Anita using supplied facts only
- `WALKTHROUGH.md` — five-minute product and implementation tour

## Boundaries

This is not a lender model, loan application, credit check, approval prediction, or guarantee of affordability. It has no login, backend, analytics, browser storage, uploads, or network calls. Unsupported offers—such as revolving credit, moratoria, balloons, irregular instalments, or multiple disbursements—remain unsupported instead of being forced into a standard EMI calculation.

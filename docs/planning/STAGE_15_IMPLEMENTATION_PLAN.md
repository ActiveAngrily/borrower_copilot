# Stage 15 Implementation Plan

Status: completed on 7 September 2026. The implemented files, verification results, persona runs, and residual limitations are recorded in `HANDOFF.md`.

## Goal

Finish the simple browser app as an adaptive, condition-driven questionnaire; bring it into Lokta's visual language; verify it end to end; and produce the final submission artifacts without adding a backend, persistence, a framework, or new dependencies.

## Scope

Stage 15 will:

1. Replace the long visible form with short, progressive question groups selected from the user's answers.
2. Restyle the app using the visual language of Lokta's Loan Management System page.
3. Complete the approved rule integration still open after Stage 14.
4. Verify every output and user path in the browser.
5. Document the three required persona run-throughs using only supplied facts.
6. Add a short written walkthrough and bring the project documentation up to date.

Anything not required by the assignment remains out of scope.

## Interaction and visual direction

The interaction reference is the existing conditional-question behavior in this app. The visual references are Lokta's [Loan Management System page](https://lokta.ai/products/loan-management-system/) and official [brand page](https://lokta.ai/brand/).

The app will borrow the following design language without copying Lokta's navigation, marketing content, logo, or product animation:

- deep Lokta Purple (`#4B2440`) for primary actions and selected states;
- raw ink (`#1C0F18`) for text, with `#2E1626`, `#6E3355`, and `#9C5E7F` used sparingly as supporting tones;
- white or warm near-white backgrounds, generous whitespace, thin rules, and mostly flat surfaces;
- large editorial headings, concise body copy, compact overlines, numbered stages, and strong information hierarchy;
- restrained motion only where it clarifies the move between question groups, disabled by `prefers-reduced-motion`.

## Implementation order

### 1. Build the adaptive question flow

Reuse the current fieldsets, conditional rules, and `hidden` behavior. Group the questionnaire into short panels of no more than three related questions:

1. borrowing need and purpose;
2. household income and evidence;
3. household expenses, commitments, and repayment history;
4. only the funding, security, vehicle, productive-use, or offer questions triggered by earlier answers;
5. review and results.

Add a small controller in `app.mjs` that derives the applicable panel queue from current answers. `Continue` validates only the visible panel; `Back` retains answers; changing an earlier answer rebuilds the remaining route. Hidden or no-longer-applicable values must not affect `assess()`.

Acceptance gate:

- The first screen and every later panel show at most three primary questions.
- A user sees only questions relevant to the path established so far.
- Progress text reflects the active route rather than a fixed, misleading step total.
- Back navigation preserves still-applicable answers.
- Unknown is a valid answer where the rules allow it; the UI never forces a guessed number.
- Focus moves to the new panel heading, errors are announced, and the flow works by keyboard.

### 2. Apply the Lokta-inspired visual system

Restyle the existing HTML and CSS rather than introducing a component library. Use the palette and editorial cues above for the shell, question panels, controls, progress marker, results, and Negotiation Card. Keep controls familiar, touch targets usable, and contrast accessible.

Acceptance gate:

- The experience visibly reads as one restrained Lokta-inspired system, not a generic form with purple buttons.
- Headings, overlines, numbered progress, thin dividers, spacing, and flat result layouts echo the reference page.
- The mobile version keeps the same hierarchy without horizontal scrolling.
- Visible focus, contrast, error states, and reduced-motion behavior remain accessible.

### 3. Close the remaining rule gaps

Extend the existing pure `assess()` flow in `rules.mjs`; keep `app.mjs` limited to reading form values and rendering results.

Add only the progressive inputs required by an active path:

- observed-low income or income history when income varies;
- reserves and known monthly commitments when capacity needs them;
- productive-use net income and start delay when the loan funds income-producing activity;
- actual-offer structure, rate, tenure, and complete fees when an offer is available.

Actual-offer comparison will support only the structures already covered by the rules: one-disbursement monthly reducing-balance loans and explicitly labelled flat-rate loans. Other structures will return `unsupported` or `not estimable` instead of a guessed comparison.

Acceptance gate:

- Every new field joins the adaptive route only when relevant.
- Missing facts produce the documented unknown/not-estimable state.
- No new business rule is implemented in the DOM layer.
- All data remains in memory and leaves no browser storage.

### 4. Complete the output contract

For each of the four required outputs, render the result, state, confidence, reason, and next action from the rule-engine response:

1. maximum lender sanction;
2. safe repayment capacity;
3. recommended borrowing amount;
4. price/offer comparison.

Update the Negotiation Card from the same result object so the screen and card cannot disagree. Positive guidance must remain withheld when a blocking fact—such as repayment history—is unknown.

Acceptance gate:

- Complete, conditional, not-estimable, and unsupported states are visibly distinct.
- The card contains no stronger conclusion than the detailed results.
- Reset, share, and print continue to work with the completed result model.

### 5. Add the smallest regression coverage and finish browser QA

Extend the existing framework-free checks rather than adding a test dependency.

- Add focused `rules.test.mjs` cases for each newly integrated branch and its missing-input state.
- Add focused route checks for panel order, conditional branches, stale hidden values, back navigation, and the three-question limit.
- Extend `validation_checks.py` only where a static app, design-token, accessibility, or documentation invariant needs coverage.
- Keep the existing generic fixtures that demonstrate verdict classes separate from the named personas.

Check the complete app at desktop and narrow-phone widths:

- keyboard-only completion and visible focus;
- adaptive forward/back navigation and route-aware progress;
- conditional question inclusion, exclusion, and stale-value clearing;
- validation and unknown-state recovery;
- all funding, security, vehicle, and productive-use paths;
- print, share/copy, and reset;
- Lokta-inspired hierarchy, responsive layout, and Negotiation Card;
- reduced-motion behavior;
- no console errors, browser storage, or unintended network requests.

Fix only issues found by these checks. Record the completed checklist in the handoff.

Acceptance gate:

- `node rules.test.mjs` passes with zero failures.
- `python3 validation_checks.py` passes with zero failures.
- Each conditional route has been exercised in the browser in both directions.
- No network, storage, or dependency code is introduced.

### 6. Produce the final submission artifacts

Create only two new documents:

- `PERSONA_RUNTHROUGHS.md` — Priya, Ravi, and Anita, each showing questions asked, all four outputs, and the Negotiation Card.
- `WALKTHROUGH.md` — a five-minute written tour of the problem, flow, rules, outputs, validation, limitations, and next steps.

Update the existing `README.md`, `RULES.md`, and `HANDOFF.md` only where the finished implementation changes their status or traceability.

Persona rule: supplied facts and missing facts must remain explicit. Missing values will not be invented merely to force a numeric result. A persona may therefore end with conditional or not-estimable outputs plus the exact questions needed to complete them.

Acceptance gate:

- Each persona includes the questions asked, all four outputs, and its card.
- Supplied facts are clearly separated from any explicitly approved supplementary assumption.
- The walkthrough can be read in about five minutes.
- The README gives one clear way to run and verify the app.

## Final completion gate

Stage 15 is complete only when:

- the remaining approved Stage 14 rule paths are integrated;
- the questionnaire presents no more than three relevant questions at a time and safely adapts when answers change;
- the finished interface follows the documented Lokta-inspired visual system at desktop and phone widths;
- both automated check commands pass with zero failures;
- final browser QA is recorded;
- the three provided-only persona run-throughs are complete;
- the written walkthrough and root deliverables are present;
- `HANDOFF.md` records Stage 15 as complete and lists any genuine residual limitation.

## Files expected to change

- `rules.mjs`
- `app.mjs`
- `index.html`
- `styles.css`
- `rules.test.mjs`
- `validation_checks.py` only for new static invariants
- `PERSONA_RUNTHROUGHS.md`
- `WALKTHROUGH.md`
- `README.md`
- `RULES.md` only if implementation traceability changes
- `HANDOFF.md`

No additional application files, libraries, build system, backend, or deployment layer are planned.

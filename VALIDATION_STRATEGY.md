# Stage 12: Validation Strategy and Results

Status: Stage 12 is approved and implemented. The dependency-free oracle is [validation_checks.py](validation_checks.py); Stage 15 extends it with static UI/privacy checks and adds [rules.test.mjs](rules.test.mjs) for the running browser engine. Neither suite is empirical evidence that the prototype judgements are universally safe.

References: [assignment](Lokta_Borrower_Copilot_Build_Challenge_v2.html), [requirements](REQUIREMENTS.md), [analytical rules](ANALYTICAL_RULES.md), [stress testing](STRESS_TESTING.md), [uncertainty policy](UNCERTAINTY_POLICY.md), [questionnaire](QUESTIONNAIRE_DESIGN.md), [adaptive routing](ADAPTIVE_QUESTIONNAIRE.md), and [rule register](RULES.md).

## Scope and conflict check

Stage 12 tests the approved Stages 1–11 specification. It does not select new affordability thresholds, stress severities, product bands, questionnaire topics or persona facts. The validation harness is a language-independent calculation oracle written with the Python standard library; it does not choose the eventual application stack or begin Stage 14 implementation.

The approved plan was checked against the assignment and existing decisions before implementation. No direct policy conflict was found. Two boundaries are enforced:

- supplied persona facts remain incomplete rather than being silently supplemented; and
- the three verdict classes are exercised with independent generic fixtures rather than fitted to Priya, Ravi and Anita.

## VA1–VA18: validation policies

| ID | Approved policy |
|---|---|
| VA1 | Treat approved Stages 1–11 as the specification under test. |
| VA2 | Use one standalone standard-library Python oracle; do not establish the app architecture. |
| VA3 | Keep checks deterministic, offline and runnable with one command. |
| VA4 | Apply NC8 tolerances: ₹0.01 for unrounded money and 0.001 percentage point for APR; whole-rupee rules are exact. |
| VA5 | Compare unrounded internal values; display rounding cannot turn failure into success. |
| VA6 | Use direct fixtures and bounded deterministic parameter sweeps. |
| VA7 | Represent unknown, provided zero and not-applicable as different states. |
| VA8 | Validate outputs independently so missing data blocks only dependent results. |
| VA9 | Validate range containment as supported-set containment, including a not-estimable result when no bound remains. |
| VA10 | Validate the complete verdict truth table, including U17 and distress precedence. |
| VA11 | Validate confidence per output rather than by answer count. |
| VA12 | Validate optional routing only when an answer can change a number, scenario or safety route. |
| VA13 | Keep assignment-supplied persona facts immutable. |
| VA14 | Keep generic complete fixtures separate from named personas. |
| VA15 | A failure identifies its validation group, check, expected result and actual result where useful. |
| VA16 | Correct arithmetic/transcription defects consistently; do not silently resolve a genuine policy conflict. |
| VA17 | Use no network, external packages, lender calls, randomness, storage or personal information. |
| VA18 | Complete Stage 12 only when the command exits zero and the documentation records its results and limitations. |

## Runnable oracle

Run from the repository root:

```bash
python3 validation_checks.py
```

The script contains the minimum pure reference functions needed for the approved ceiling, reducing/zero/flat repayment, inverse capacity, monthly cash-flow APR, rounded final payment, fee/funding, debt-calendar peak, floating-rate tenure, commitment, reserve, productive-income, range, verdict, confidence and routing checks. APR uses deterministic bisection and verifies the approved nominal annualization `APR = 12j`.

The harness embeds only public assignment fixtures and synthetic validation values. It reads Markdown and the three immutable source/context files for structural checks, writes nothing, and returns a nonzero exit status on any failure.

## Coverage

| Group | Coverage |
|---|---|
| Stage 10 numerical | Base/range ceilings; recurring provisions; debt peaks; reducing, zero and flat forward/inverse formulas; tenure totals; RBI E02 EMI/APR; fee timing and single-counting; funding; vehicle caps; product minima; whole-rupee boundaries; final-payment residue |
| Stage 11 fixtures | One direct runnable assertion for each V11-01 through V11-27, plus the immediate-unfunded-commitment edge case |
| Directional | Deterministic grids for income, expense, debt and both common stresses; rate/EMI and rate/capacity direction; recurring charges; scenario aggregation; reserve and productive-income non-effects on recurring capacity |
| Decision and confidence | Unknown versus zero; actual/benchmark APR states; U17; active/resolved/unresolved distress; scenario disagreement; smaller-purpose viability; rate applicability; range containment; every ST77–ST84 confidence class; all three verdicts |
| Routing and personas | Eight-core/ten-topic limit; ST86–ST91 activation; purpose-edit invalidation; Priya, Ravi and Anita paths and missing-fact preservation |
| Documentation | Local links, code fences, rule/fixture sequences, selected rule-ID traceability, 15-stage order, stale status text, source/context hashes and absence of application artifacts |

## Generic verdict fixtures

These fixtures prove reachability without assigning target outcomes to the supplied personas.

| Verdict | Fixture and expected reason |
|---|---|
| Borrow | ₹2,00,000 personal scenario; I ₹1,00,000, E ₹40,000, D ₹0, J ₹1,00,000, 36 months at the conservative 24% endpoint, complete upper benchmark fees and a fully funded ₹1,89,000 purpose. The request remains below lender and stress-aware capacity. |
| Borrow less | ₹2,00,000 personal request; I ₹50,000, E ₹25,000, D ₹5,000, J ₹50,000 and 36 months at 24%. The request exceeds stress-aware capacity; a confirmed ₹1,50,000 plan fully funds a ₹1,39,330 minimum viable purpose after ₹10,670 charges and fits lender/stress constraints. |
| Do not borrow | ₹50,000 personal request; I ₹30,000, E ₹25,000 and D ₹5,000 produce zero recurring capacity, with no confirmed acceptable smaller arrangement. |

These are synthetic method fixtures, not lender predictions or facts about a named borrower.

## Persona validation

### Priya

- The personal path and Q9 funding topic apply; Q10 and productive refinements do not.
- The ₹28,000 rent remains one expense component, not total E.
- Missing total E makes safe ceiling, safe capacity and recommended amount not estimable.
- Missing income-evidence answers leave illustrative sanction not estimable.
- Independent personal pricing/payment benchmarks may remain conditional.

### Ravi

- The property-backed productive/business path, Q9 and Q10 must be considered.
- The ₹40,000–₹80,000 cash-income description remains unresolved until confirmed as compatible net income.
- ₹4,20,000 annual ITR income stays separate until definition, period and current relevance are confirmed.
- His wife's ₹18,000 earnings are neither contribution nor co-applicant income without an answer.
- Missing E, D and J prevent complete capacity and sanction results; history and productive refinements apply.

### Anita

- The electric two-wheeler/productive path and Q9 apply; existing-asset Q10 does not.
- ₹35,000 outstanding never becomes D, and the existing `30%+` rate never becomes the new-offer rate.
- Missing E and monthly D invoke U17.
- The bounce status is unresolved rather than invented as active distress; positive guidance remains withheld and the overall result stays incomplete.
- “Double delivery runs” never becomes incremental net income; history, debt-status and productive refinements apply.

These are provenance and routing checks, not the final deliverable run-throughs.

## Results

Executed on **6 September 2026 (Asia/Kolkata)** with Python 3.10.0:

```text
PASS decision-confidence: 36
PASS directional: 269
PASS documentation: 142
PASS routing-personas: 19
PASS stage10-numerical: 31
PASS stage11-fixtures: 28
PASS total: 525
FAIL total: 0
```

The integrated command was repeated after the final confidence-precedence refinement with identical results. A separate AST parse of `validation_checks.py` also passed. No calculation, state, routing, persona-provenance or documentation failure remains.

The final Stage 15 re-run on **7 September 2026 (Asia/Kolkata)** passed **547 checks with zero failures**: decision-confidence 36, directional 269, documentation 156, routing-personas 19, Stage 10 numerical 31, Stage 11 fixtures 28, and Stage 15 UI/privacy 8. `node rules.test.mjs` also passed.

## Limitations

Passing checks establishes internal consistency with the approved prototype specification and implemented supported paths. It does not establish regulatory compliance, named-lender eligibility, market representativeness, borrower safety, statistical calibration, usability research, or accessibility certification. Unsupported repayment structures and unbounded actual fees remain unsupported or not estimable.

## Completion boundary

Stage 12 completed after the integrated command passed and dependent documents pointed to this result. Stages 13–15 subsequently defined, planned, implemented and verified the browser application while retaining this oracle as an independent specification check.

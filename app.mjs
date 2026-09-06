import { SCENARIOS, assess, emi, money, percent, questionRoute } from "./rules.mjs";

const form = document.querySelector("#assessment-form");
const panels = [...document.querySelectorAll("[data-panel]")];
const results = document.querySelector("#results");
const error = document.querySelector("#form-error");
const back = document.querySelector("#back");
const next = document.querySelector("#next");
const submit = document.querySelector("#submit-assessment");
const unknowns = Object.fromEntries([...document.querySelectorAll("[data-unknown]")].map(control => [control.dataset.unknown, control]));
let route = [];
let currentIndex = 0;

const number = name => {
  const value = form.elements[name]?.value?.trim();
  return value === "" || value === undefined ? null : Number(value);
};

function readRange(name) {
  if (unknowns[name]?.checked) return null;
  const low = number(`${name}Low`);
  const high = number(`${name}High`);
  if (low === null || low < 0 || (high !== null && (high < low || high < 0))) return null;
  return { low, high: high ?? low };
}

function scenarioKey() {
  const purpose = form.elements.purpose.value;
  if (purpose === "business" || purpose === "vehicle") return purpose;
  return purpose ? "personal" : null;
}

function routeAnswers() {
  return {
    kind: scenarioKey(),
    incomeType: form.elements.incomeType.value,
    incomeVariable: form.elements.incomeVariable.value,
    hasOffer: form.elements.hasOffer.value
  };
}

function setUnknownFields(control) {
  document.querySelector(`[data-fields="${control.dataset.unknown}"]`)?.querySelectorAll("input").forEach(input => { input.disabled = control.checked; });
}

function toggleDetails() {
  const kind = scenarioKey();
  document.querySelector("#applicant-debt").hidden = form.elements.applicantDebtScope.value !== "different";
  document.querySelector("#supported-income").hidden = form.elements.records.value !== "part";
  document.querySelector("#minimum-purpose-cost").hidden = form.elements.smallPlan.value !== "yes";
  document.querySelector("#commitment-details").hidden = form.elements.commitmentStatus.value !== "yes";
  document.querySelector("#offer-fees").hidden = form.elements.completeFees.value !== "yes";
  document.querySelector("#general-purpose-cost").hidden = kind === "vehicle";
  form.elements.purposeCost.disabled = kind === "vehicle";
}

function showPanel(focus = false) {
  const activeName = route[currentIndex];
  const active = panels.find(panel => panel.dataset.panel === activeName);
  panels.forEach(panel => { panel.hidden = panel !== active; });
  const step = currentIndex + 1;
  document.querySelector("#panel-title").textContent = active?.dataset.title || "Your assessment";
  document.querySelector("#step-label").textContent = `Step ${step}`;
  document.querySelector("#step-count").textContent = `${step} of ${route.length}`;
  const progress = document.querySelector("#step-progress");
  progress.value = step;
  progress.max = route.length;
  back.hidden = currentIndex === 0;
  next.hidden = currentIndex === route.length - 1;
  submit.hidden = currentIndex !== route.length - 1;
  if (focus) {
    active?.querySelector("h3")?.focus({ preventScroll: true });
    form.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }
}

function updateRoute() {
  const currentName = route[currentIndex];
  const nextRoute = questionRoute(routeAnswers());
  const retainedIndex = nextRoute.indexOf(currentName);
  route = nextRoute;
  currentIndex = retainedIndex >= 0 ? retainedIndex : Math.min(currentIndex, route.length - 1);
  showPanel();
}

function validatePanel() {
  error.textContent = "";
  const panel = panels.find(item => item.dataset.panel === route[currentIndex]);
  for (const control of panel.querySelectorAll("input:not(:disabled), select:not(:disabled)")) {
    if (!control.checkValidity()) {
      control.reportValidity();
      return false;
    }
  }
  for (const pair of panel.querySelectorAll(".amount-pair")) {
    const [low, high] = pair.querySelectorAll("input:not(:disabled)");
    if (low && high && low.value !== "" && high.value !== "" && Number(high.value) < Number(low.value)) {
      error.textContent = "An upper amount cannot be lower than its lower amount.";
      high.focus();
      return false;
    }
  }
  return true;
}

function input() {
  const kind = scenarioKey();
  const debt = readRange("debt");
  const applicantDebtScope = form.elements.applicantDebtScope.value;
  const hasOffer = form.elements.hasOffer.value === "yes";
  return {
    kind,
    requested: number("requested"),
    income: readRange("income"),
    contribution: readRange("contribution"),
    incomeType: form.elements.incomeType.value,
    incomeVariable: form.elements.incomeVariable.value,
    records: form.elements.records.value,
    supportedIncome: readRange("supportedIncome"),
    expenses: readRange("expenses"),
    debt,
    applicantDebt: applicantDebtScope === "same" ? debt : applicantDebtScope === "different" ? readRange("applicantDebt") : null,
    distress: form.elements.distress.value,
    age: number("age"),
    credit: form.elements.credit.value,
    security: kind === "business" ? form.elements.security.value : null,
    propertyValue: kind === "business" ? number("propertyValue") : null,
    vehiclePrice: kind === "vehicle" ? number("vehiclePrice") : null,
    purposeCost: kind === "vehicle" ? number("vehiclePrice") : number("purposeCost"),
    ownFunds: number("ownFunds"),
    smallPlan: form.elements.smallPlan.value,
    minimumPurposeCost: form.elements.smallPlan.value === "yes" ? number("minimumPurposeCost") : null,
    historyLow: route.includes("history") ? number("historyLow") : null,
    historyMonths: route.includes("history") ? number("historyMonths") : null,
    productiveIncome: route.includes("productive") ? number("productiveIncome") : null,
    productiveDelay: route.includes("productive") ? number("productiveDelay") : null,
    productiveBasis: route.includes("productive") ? form.elements.productiveBasis.value : null,
    reserves: number("reserves"),
    commitment: {
      status: form.elements.commitmentStatus.value,
      amount: form.elements.commitmentStatus.value === "yes" ? number("commitmentAmount") : null,
      earmarked: form.elements.commitmentStatus.value === "yes" ? number("commitmentEarmarked") : null,
      months: form.elements.commitmentStatus.value === "yes" ? number("commitmentMonths") : null,
      inExpenses: form.elements.commitmentStatus.value === "yes" ? form.elements.commitmentInExpenses.value : null
    },
    offer: hasOffer ? {
      principal: number("offerAmount"),
      payment: number("offerEmi"),
      structure: form.elements.offerStructure.value,
      rateType: form.elements.offerRateType.value,
      annualRate: number("offerRate") === null ? null : number("offerRate") / 100,
      months: number("offerMonths"),
      completeFees: form.elements.completeFees.value,
      fees: {
        financed: number("financedFees"),
        deducted: number("deductedFees"),
        upfront: number("upfrontFees"),
        recurring: number("recurringFees")
      }
    } : null
  };
}

const tile = ({ title, value, description, state = "Estimated", tone = "" }) => `
  <article class="result"><p class="result-label">${title}</p><p class="number">${value}</p><p>${description}</p><span class="state ${tone}">${state}</span></article>`;

function renderCard(data) {
  document.querySelector("#card-content").innerHTML = `
    <div class="card-grid">
      <div class="card-item"><span>Recommendation</span><strong>${data.title}</strong><p>${data.lead}</p></div>
      <div class="card-item"><span>Requested / recommended</span><strong>${data.amounts}</strong><p>${data.scenario}</p></div>
      <div class="card-item"><span>Safe capacity</span><strong>${data.safe}</strong><p>Borrower-side boundary</p></div>
      <div class="card-item"><span>Lender estimate</span><strong>${data.lender}</strong><p>Illustrative, not approval</p></div>
      <div class="card-item"><span>Payment / stress</span><strong>${data.payment}</strong><p>${data.stress}</p></div>
      <div class="card-item"><span>Pricing</span><strong>${data.pricing}</strong><p>${data.priceNote}</p></div>
    </div>
    <div class="card-conditions"><span>Conditions and unknowns</span><p>${data.conditions}</p></div>`;
  const summary = `${data.title}. ${data.scenario}; ${data.amounts}; safe capacity ${data.safe}; lender estimate ${data.lender}; ${data.stress}; ${data.pricing}. Conditions: ${data.conditions}`;
  document.querySelector("#share-card").dataset.summary = summary;
}

function priceView(pricing) {
  const benchmark = `${percent(pricing.apr[0])}–${percent(pricing.apr[1])} benchmark APR`;
  const actual = pricing.actual;
  if (actual.state === "estimated") {
    const relation = actual.apr < pricing.apr[0] ? "below" : actual.apr > pricing.apr[1] ? "above" : "within";
    const mismatch = Number.isFinite(actual.calculatedPayment) && Math.abs(actual.calculatedPayment - actual.payment) > 1
      ? ` The quoted payment differs from the payment implied by the stated rate by ${money(Math.abs(actual.calculatedPayment - actual.payment))} a month.` : "";
    return {
      value: `${percent(actual.apr)} actual APR`,
      description: `Complete stated cash flows place it ${relation} the ${benchmark}. Net initial benefit: ${money(actual.benefit)}.${mismatch}`,
      state: "Estimated · Moderate confidence", tone: relation === "above" ? "warning" : ""
    };
  }
  if (actual.state === "unsupported") return { value: "Offer unsupported", description: `${actual.reason} Independent reference: ${benchmark}.`, state: "Unsupported", tone: "bad" };
  if (actual.state === "not_estimable") return { value: "Actual APR not estimable", description: `${actual.reason} Independent reference: ${benchmark}.`, state: "Incomplete offer", tone: "warning" };
  return { value: benchmark, description: "Illustrative complete fee package—not an actual lender offer.", state: "Conditional · Low confidence", tone: "warning" };
}

function renderCoreIncomplete(result, values) {
  const price = priceView(result.pricing);
  const referencePayment = emi(values.requested, result.scenario.rates[1], result.pricing.term);
  document.querySelector("#result-grid").innerHTML = [
    tile({ title: "Safe borrower capacity", value: "Not estimable", description: "Current income, contributions, spending and required debt payments are all needed.", state: "Incomplete", tone: "warning" }),
    tile({ title: "Likely lender sanction", value: "Not estimable", description: "Supported income and applicant debt are also needed. No synthetic credit score is created.", state: "Not estimable", tone: "warning" }),
    tile({ title: "Recommended borrowing amount", value: "Not estimable", description: result.decision.lead, state: "Action needed", tone: "warning" }),
    tile({ title: "Price and offer comparison", ...price })
  ].join("");
  renderCard({
    title: result.decision.title, lead: result.decision.lead,
    amounts: `Requested ${money(values.requested)} · recommended not estimable`, scenario: result.scenario.label,
    safe: "Not estimable", lender: "Not estimable", payment: `${money(referencePayment)}/month`, stress: `Reference payment at ${result.pricing.term} months; capacity not estimable`,
    pricing: price.value, priceNote: price.description,
    conditions: `Missing: ${result.coreMissing.join(", ")}.`
  });
}

function renderAssessment(result, values) {
  const { scenario, pricing, capacity, lender, funding, decision, history, commitment, productive, reserves } = result;
  const price = priceView(pricing);
  const bindingNames = { base: "baseline", income: "20% income-drop", expense: "10% expense-rise", history: "observed-low income", commitment: "upcoming commitment" };
  const lenderValue = lender.state === "estimated" ? `${money(lender.low)}–${money(lender.high)}` : "Not estimable";
  const recommended = Number.isFinite(decision.recommendedAmount) ? money(decision.recommendedAmount) : decision.state === "do_not_borrow" ? "No amount recommended" : "Not estimable";
  const fundingText = funding.state === "estimated" ? funding.gap === 0 && funding.feesPayable ? `Funded using ${funding.basis}` : `${money(funding.gap)} funding gap` : "Funding not estimable";
  const longTerm = scenario.terms[1];
  const longPayment = emi(values.requested, scenario.rates[1], longTerm);
  const currentPayment = capacity.totalOutflow;
  const rateStress = pricing.actual.rateStress;
  const rateNote = rateStress?.state === "applied"
    ? ` A +2 percentage-point reset gives ${money(rateStress.stressedPayment)}/month; keeping the quoted EMI would take ${rateStress.samePaymentMonths === null ? "no finite supported tenure" : `about ${Math.ceil(rateStress.samePaymentMonths)} months`}.`
    : "";
  const resilience = reserves.state === "estimated"
    ? `${reserves.zeroIncomeMonths === null ? "Not applicable" : reserves.zeroIncomeMonths.toFixed(1)} months of zero-income coverage; ${money(reserves.incomeStressRemaining)} remains after the separate income-drop case.`
    : reserves.reason;
  const commitmentNote = commitment.state === "estimated" ? ` Commitment provision: ${money(commitment.provision)}/month.` : "";
  const productiveNote = productive.state === "estimated"
    ? ` Projected net increase covers ${productive.coverage === null ? "not applicable" : `${productive.coverage.toFixed(2)}×`} the assessed outflow after ${productive.delay} month(s), but does not raise safe capacity.` : productive.reason || "";
  const conditions = [
    lender.state !== "estimated" && lender.reason,
    funding.state !== "estimated" && funding.reason,
    history.state === "not_estimable" && history.reason,
    commitment.state === "not_estimable" && commitment.reason,
    productive.state === "not_estimable" && productive.reason,
    reserves.state === "not_estimable" && reserves.reason,
    pricing.actual.state === "not_estimable" && pricing.actual.reason,
    pricing.actual.state === "unsupported" && pricing.actual.reason
  ].filter(Boolean);

  document.querySelector("#result-grid").innerHTML = [
    tile({ title: "Safe borrower capacity", value: `${money(capacity.safeLow)}–${money(capacity.safeHigh)}`, description: `${money(capacity.lower.resilient)}/month is the binding ${bindingNames[capacity.binding]} ceiling using ${capacity.source} terms. The lower endpoint guides borrowing.`, state: `Estimated · ${capacity.confidence} confidence`, tone: capacity.confidence === "Low" ? "warning" : "" }),
    tile({ title: "Likely lender sanction", value: lenderValue, description: lender.state === "estimated" ? `Illustrative ${lender.term}-month estimate using record-supported income and applicant debt; ${lender.source} terms.` : lender.reason, state: lender.state === "estimated" ? "Illustrative · Low confidence" : "Not estimable", tone: "warning" }),
    tile({ title: "Recommended borrowing amount", value: recommended, description: `${decision.lead} ${fundingText}.`, state: decision.title, tone: decision.tone }),
    tile({ title: "Price and offer comparison", ...price }),
    tile({ title: "Payment, tenure and stress", value: `${money(currentPayment)}/month`, description: `Includes known recurring charges. At the benchmark upper rate, ${longTerm} months would be about ${money(longPayment)}/month but cost more overall.${rateNote}`, state: `${bindingNames[capacity.binding]} binds`, tone: currentPayment <= capacity.lower.resilient ? "" : "bad" }),
    tile({ title: "Resilience and productive use", value: fundingText, description: `${resilience}${commitmentNote}${productiveNote ? ` ${productiveNote}` : ""}`, state: reserves.state === "estimated" ? "Refined" : "Conditional", tone: reserves.state === "estimated" ? "" : "warning" })
  ].join("");

  renderCard({
    title: decision.title, lead: decision.lead,
    amounts: `Requested ${money(values.requested)} · recommended ${recommended}`, scenario: `${scenario.label} · ${capacity.term} months`,
    safe: `${money(capacity.safeLow)}–${money(capacity.safeHigh)}`, lender: lenderValue,
    payment: `${money(currentPayment)}/month`, stress: `${bindingNames[capacity.binding]} binds at ${money(capacity.lower.resilient)}/month`,
    pricing: price.value, priceNote: price.description,
    conditions: conditions.length ? conditions.join(" ") : "No unresolved material input in the assessed path; lender approval and actual future safety remain unverified."
  });
}

function render(result, values) {
  document.querySelector("#results-title").textContent = result.decision.title;
  document.querySelector("#result-lead").textContent = result.decision.lead;
  document.querySelector("#result-banner").dataset.tone = result.decision.tone;
  if (!result.capacity) renderCoreIncomplete(result, values);
  else renderAssessment(result, values);
  results.hidden = false;
  document.querySelector("#results-title").focus({ preventScroll: true });
  results.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

next.addEventListener("click", () => {
  if (!validatePanel()) return;
  updateRoute();
  currentIndex = Math.min(currentIndex + 1, route.length - 1);
  showPanel(true);
});

back.addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 1);
  error.textContent = "";
  showPanel(true);
});

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!validatePanel()) return;
  const values = input();
  if (!values.kind || values.requested === null || values.requested <= 0) {
    error.textContent = "Choose a purpose and enter a requested amount above ₹0.";
    return;
  }
  render(assess(values), values);
});

form.addEventListener("input", () => { results.hidden = true; error.textContent = ""; });
form.addEventListener("change", event => {
  if (event.target.matches("[data-unknown]")) setUnknownFields(event.target);
  toggleDetails();
  if (event.target.matches('[name="purpose"], [name="incomeType"], [name="incomeVariable"], [name="hasOffer"]')) updateRoute();
});

document.querySelector("#print-card").addEventListener("click", () => window.print());
document.querySelector("#share-card").addEventListener("click", async event => {
  const summary = event.currentTarget.dataset.summary;
  try {
    if (navigator.share) await navigator.share({ title: "Lokta Negotiation Card", text: summary });
    else if (navigator.clipboard) await navigator.clipboard.writeText(summary);
    else window.prompt("Copy this summary", summary);
  } catch (shareError) {
    if (shareError.name !== "AbortError") window.prompt("Copy this summary", summary);
  }
});

const submissionCredit = document.querySelector(".submission-credit");
submissionCredit.addEventListener("click", () => {
  const open = submissionCredit.getAttribute("aria-expanded") === "true";
  submissionCredit.setAttribute("aria-expanded", String(!open));
  submissionCredit.closest(".submission-details").classList.toggle("is-open", !open);
});

document.querySelector("#reset").addEventListener("click", () => {
  form.reset();
  Object.values(unknowns).forEach(setUnknownFields);
  toggleDetails();
  route = [];
  currentIndex = 0;
  updateRoute();
  results.hidden = true;
  error.textContent = "";
  showPanel(true);
});

Object.values(unknowns).forEach(setUnknownFields);
toggleDetails();
updateRoute();

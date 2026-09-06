export const SCENARIOS = {
  personal: { label: "Personal loan", rates: [0.0999, 0.24], terms: [36, 60], beta: [0.4, 0.45], minimum: 50000, maximum: 2500000, ages: [21, 60] },
  business: { label: "Property-backed business loan", rates: [0.13, 0.26], terms: [36, 60], beta: [0.4, 0.5], minimum: 300000, maximum: 2500000, ages: [21, 65] },
  vehicle: { label: "Electric two-wheeler loan", rates: [0.112, 0.157], terms: [24, 36], beta: [0.5, 0.5], minimum: 50000, maximum: 300000, ages: [18, 65] }
};

export const money = value => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0
}).format(value);

export const percent = value => `${(value * 100).toFixed(2)}%`;

export function emi(principal, annualRate, months) {
  if (!principal || !months) return 0;
  const rate = annualRate / 12;
  return rate ? principal * rate / (1 - (1 + rate) ** -months) : principal / months;
}

export function flatPayment(principal, annualRate, months) {
  return principal && months ? principal * (1 + annualRate * months / 12) / months : 0;
}

export function inversePrincipal(payment, annualRate, months) {
  if (!payment || !months) return 0;
  const rate = annualRate / 12;
  return rate ? payment * (1 - (1 + rate) ** -months) / rate : payment * months;
}

export function inverseFlatPrincipal(payment, annualRate, months) {
  return payment && months ? payment * months / (1 + annualRate * months / 12) : 0;
}

export function indicativeTenure(principal, annualRate, payment) {
  if (!principal || !payment) return null;
  const rate = annualRate / 12;
  if (!rate) return principal / payment;
  if (payment <= principal * rate) return null;
  return -Math.log(1 - principal * rate / payment) / Math.log(1 + rate);
}

export function ceiling(income, expenses, debt) {
  if (![income, expenses, debt].every(Number.isFinite) || income <= 0) return null;
  return Math.max(0, Math.min(0.35 * income - debt, 0.9 * income - expenses - debt));
}

export function benchmarkFees(kind, principal) {
  if (kind === "business") return [10000, principal * 0.03 * 1.18 + 25000];
  if (kind === "vehicle") return [principal * 0.03 * 1.18, principal * 0.03 * 1.18 + 3000];
  return [0, 6500 * 1.18 + 3000];
}

export function monthlyApr(benefit, payments) {
  if (!benefit || !payments.length || payments.some(value => value < 0)) return null;
  const presentValue = rate => payments.reduce((sum, payment, index) => sum + payment / (1 + rate) ** (index + 1), 0);
  if (presentValue(0) < benefit) return null;
  let low = 0;
  let high = 1;
  for (let index = 0; index < 100; index += 1) {
    const middle = (low + high) / 2;
    if (presentValue(middle) > benefit) low = middle;
    else high = middle;
  }
  return 12 * (low + high) / 2;
}

export function benchmarkApr(kind, principal, months) {
  const scenario = SCENARIOS[kind];
  const [lowFee, highFee] = benchmarkFees(kind, principal);
  return [
    monthlyApr(principal - lowFee, Array(months).fill(emi(principal, scenario.rates[0], months))),
    monthlyApr(principal - highFee, Array(months).fill(emi(principal, scenario.rates[1], months)))
  ];
}

export function historyNeeded(input) {
  return ["self-employed", "informal", "mixed"].includes(input.incomeType) || input.incomeVariable === "yes";
}

export function questionRoute(input = {}) {
  const route = ["need", "income", "budget", "credit"];
  if (input.kind === "business") route.push("security");
  if (input.kind === "vehicle") route.push("vehicle");
  route.push("funding");
  if (historyNeeded(input)) route.push("history");
  if (["business", "vehicle"].includes(input.kind)) route.push("productive");
  route.push("resilience");
  if (input.hasOffer === "yes") route.push("offer");
  return route;
}

const isRange = value => value && Number.isFinite(value.low) && Number.isFinite(value.high) && value.low >= 0 && value.high >= value.low;
const sumRanges = (left, right) => ({ low: left.low + right.low, high: left.high + right.high });
const notEstimable = reason => ({ state: "not_estimable", reason });
const supportedStructure = structure => structure === "reducing" || structure === "flat";
const paymentFor = (principal, structure, annualRate, months) => structure === "flat" ? flatPayment(principal, annualRate, months) : emi(principal, annualRate, months);
const capacityFor = (payment, structure, annualRate, months) => structure === "flat" ? inverseFlatPrincipal(payment, annualRate, months) : inversePrincipal(payment, annualRate, months);

function actualOffer(input) {
  const offer = input.offer;
  if (!offer) return { state: "not_applicable", reason: "No actual lender offer was supplied." };
  if (!supportedStructure(offer.structure)) return { state: "unsupported", reason: "This offer structure is outside the supported one-disbursement monthly-loan scope." };

  const core = [offer.principal, offer.months, offer.payment];
  if (!core.every(Number.isFinite) || offer.principal <= 0 || offer.months <= 0 || offer.payment <= 0) {
    return notEstimable("Add the contractual principal, monthly repayment and repayment count from the offer.");
  }
  if (offer.completeFees !== "yes") return notEstimable("Confirm that every mandatory upfront, deducted, financed and recurring charge is included.");
  const fees = offer.fees || {};
  if (![fees.financed, fees.deducted, fees.upfront, fees.recurring].every(value => Number.isFinite(value) && value >= 0)) {
    return notEstimable("Enter every mandatory fee category, using 0 only when the offer confirms none.");
  }

  const benefit = offer.principal - fees.financed - fees.deducted - fees.upfront;
  const apr = monthlyApr(benefit, Array(Math.trunc(offer.months)).fill(offer.payment + fees.recurring));
  if (!Number.isFinite(apr)) return notEstimable("The stated benefit and repayments do not produce a supported positive APR calculation.");

  let rateStress = { state: "conditional", reason: "Confirm whether the offered rate is fixed or floating." };
  if (offer.rateType === "fixed") rateStress = { state: "not_applicable", reason: "The offered rate is reported fixed, so the floating-rate stress does not apply." };
  if (offer.rateType === "floating" && offer.structure === "flat") rateStress = { state: "unsupported", reason: "Floating-rate stress is supported only for a reducing-balance offer." };
  if (offer.rateType === "floating" && offer.structure === "reducing" && Number.isFinite(offer.annualRate)) {
    const stressedRate = offer.annualRate + 0.02;
    const stressedPayment = emi(offer.principal, stressedRate, offer.months);
    const samePaymentMonths = indicativeTenure(offer.principal, stressedRate, offer.payment);
    rateStress = { state: "applied", stressedRate, stressedPayment, samePaymentMonths };
  }

  const calculatedPayment = Number.isFinite(offer.annualRate) ? paymentFor(offer.principal, offer.structure, offer.annualRate, offer.months) : null;
  return {
    state: "estimated", confidence: "Moderate", apr, benefit, fees, rateStress,
    principal: offer.principal, months: Math.trunc(offer.months), payment: offer.payment,
    structure: offer.structure, annualRate: offer.annualRate, rateType: offer.rateType,
    proceeds: offer.principal - fees.financed - fees.deducted,
    totalOutflow: offer.payment + fees.recurring,
    totalRepayment: (offer.payment + fees.recurring) * offer.months + fees.upfront,
    calculatedPayment,
    appliesToRequest: Math.abs(offer.principal - input.requested) < 0.01
  };
}

function historyScenario(input, contribution, expenses, debt) {
  if (!historyNeeded(input)) return { state: "not_applicable" };
  if (!Number.isFinite(input.historyLow) || input.historyLow < 0 || !Number.isFinite(input.historyMonths) || input.historyMonths < 1 || input.historyMonths > 12) {
    return { ...notEstimable("Add the lowest compatible net-income month and the actual history covered."), materialMissing: true };
  }
  if (input.historyLow >= input.income.low) return { state: "not_adverse", months: input.historyMonths, reason: "The reported low is not below current income, so it cannot improve the stress result." };
  return {
    state: "estimated", months: input.historyMonths, income: input.historyLow,
    lower: ceiling(input.historyLow + contribution.low, expenses.high, debt.high),
    upper: ceiling(input.historyLow + contribution.high, expenses.low, debt.low)
  };
}

function commitmentScenario(input, income, expenses, debt) {
  const commitment = input.commitment;
  if (!commitment || commitment.status === "" || commitment.status === "no") return { state: "not_applicable", supplied: commitment?.status === "no" };
  if (commitment.status === "unknown") return notEstimable("Upcoming commitments were left unknown; the base result remains available at Low confidence.");
  const complete = [commitment.amount, commitment.earmarked, commitment.months].every(value => Number.isFinite(value) && value >= 0)
    && commitment.months >= 1 && commitment.months <= 12 && ["yes", "no"].includes(commitment.inExpenses);
  if (!complete) return { ...notEstimable("Complete the amount, due month, earmarked funds and spending-overlap details."), materialMissing: true };
  const provision = commitment.inExpenses === "yes" ? 0 : Math.max(0, commitment.amount - commitment.earmarked) / commitment.months;
  return {
    state: "estimated", provision,
    lower: ceiling(income.low, expenses.high + provision, debt.high),
    upper: ceiling(income.high, expenses.low + provision, debt.low)
  };
}

function termProfile(input, scenario, offer) {
  const usableOffer = offer.state === "estimated" && offer.appliesToRequest && Number.isFinite(offer.annualRate)
    && (offer.rateType === "fixed" || (offer.rateType === "floating" && offer.structure === "reducing"));
  if (!usableOffer) return { source: "benchmark", structure: "reducing", term: scenario.terms[0], lowRate: scenario.rates[0], highRate: scenario.rates[1], recurring: 0 };
  return {
    source: "actual offer", structure: offer.structure, term: offer.months,
    lowRate: offer.annualRate,
    highRate: offer.rateType === "floating" ? offer.annualRate + 0.02 : offer.annualRate,
    recurring: offer.fees.recurring
  };
}

function capacityRange(input, income, expenses, debt, scenario, history, commitment, offer) {
  const lower = {
    base: ceiling(income.low, expenses.high, debt.high),
    income: ceiling(income.low * 0.8, expenses.high, debt.high),
    expense: ceiling(income.low, expenses.high * 1.1, debt.high)
  };
  const upper = {
    base: ceiling(income.high, expenses.low, debt.low),
    income: ceiling(income.high * 0.8, expenses.low, debt.low),
    expense: ceiling(income.high, expenses.low * 1.1, debt.low)
  };
  if (history.state === "estimated") {
    lower.history = history.lower;
    upper.history = history.upper;
  }
  if (commitment.state === "estimated") {
    lower.commitment = commitment.lower;
    upper.commitment = commitment.upper;
  }
  lower.resilient = Math.min(...Object.values(lower));
  upper.resilient = Math.min(...Object.values(upper));

  const profile = termProfile(input, scenario, offer);
  const safeLow = Math.floor(capacityFor(Math.max(0, lower.resilient - profile.recurring), profile.structure, profile.highRate, profile.term));
  const safeHigh = Math.floor(capacityFor(Math.max(0, upper.resilient - profile.recurring), profile.structure, profile.lowRate, profile.term));
  const historyReady = !historyNeeded(input) || (history.state === "estimated" && history.months >= 12) || history.state === "not_adverse";
  const commitmentReady = commitment.state === "estimated" || commitment.supplied;
  const ceilingConfidence = Number.isFinite(input.reserves) && commitmentReady && historyReady && ["none", "resolved"].includes(input.distress) ? "Moderate" : "Low";
  const confidence = ceilingConfidence === "Moderate" && profile.source === "actual offer" ? "Moderate" : "Low";
  const binding = Object.entries(lower).filter(([name]) => name !== "resilient").sort(([, left], [, right]) => left - right)[0][0];

  return {
    state: "estimated", lower, upper, safeLow, safeHigh, binding,
    term: profile.term, structure: profile.structure, rate: profile.highRate, recurring: profile.recurring,
    source: profile.source, confidence, ceilingConfidence,
    assessedPayment: paymentFor(input.requested, profile.structure, profile.highRate, profile.term),
    totalOutflow: paymentFor(input.requested, profile.structure, profile.highRate, profile.term) + profile.recurring
  };
}

function lenderRange(input, scenario, supportedIncome, offer) {
  if (!isRange(supportedIncome)) return notEstimable("Provide income that records support before estimating lender access.");
  if (!isRange(input.applicantDebt)) return notEstimable("Confirm the debt total for loans where you are a borrower or co-borrower.");
  const profile = termProfile(input, scenario, offer);
  const lowAllowance = Math.max(0, scenario.beta[0] * supportedIncome.low - input.applicantDebt.high - profile.recurring);
  const highAllowance = Math.max(0, scenario.beta[1] * supportedIncome.high - input.applicantDebt.low - profile.recurring);
  const lenderRate = profile.source === "actual offer" ? profile.lowRate : scenario.rates[1];
  const lenderHighRate = profile.source === "actual offer" ? profile.lowRate : scenario.rates[0];
  let low = Math.floor(capacityFor(lowAllowance, profile.structure, lenderRate, profile.term));
  let high = Math.floor(capacityFor(highAllowance, profile.structure, lenderHighRate, profile.term));
  if (input.kind === "business") {
    if (input.security !== "yes" || !Number.isFinite(input.propertyValue)) return notEstimable("Confirm eligible property ownership, participation and value for this secured path.");
    low = Math.min(low, Math.floor(input.propertyValue * 0.5));
    high = Math.min(high, Math.floor(input.propertyValue * 0.5));
  }
  if (input.kind === "vehicle") {
    if (!Number.isFinite(input.vehiclePrice)) return notEstimable("Add the on-road vehicle price for this vehicle path.");
    low = Math.min(low, Math.floor(6 * supportedIncome.low), Math.floor(input.vehiclePrice * 0.85), scenario.maximum);
    high = Math.min(high, Math.floor(6 * supportedIncome.high), Math.floor(input.vehiclePrice * 0.85), scenario.maximum);
  }
  low = Math.min(low, scenario.maximum);
  high = Math.min(high, scenario.maximum);
  if (high < scenario.minimum) return notEstimable(`The illustrative ${scenario.label.toLowerCase()} minimum is ${money(scenario.minimum)}; do not borrow more just to reach it.`);
  return { state: "estimated", low, high: Math.max(low, high), term: profile.term, confidence: "Low", source: profile.source };
}

function fundingAt(input, kind, principal, purposeCost, offer = null) {
  if (!Number.isFinite(purposeCost) || !Number.isFinite(input.ownFunds)) {
    return { state: "incomplete", reason: "Add the purpose cost and own funds to confirm that the loan actually funds the plan." };
  }
  let financed = 0;
  let upfront = 0;
  let deducted = benchmarkFees(kind, principal)[1];
  let basis = "benchmark fee package";
  if (offer?.state === "estimated" && offer.appliesToRequest && Math.abs(principal - input.requested) < 0.01) {
    ({ financed, upfront, deducted } = offer.fees);
    basis = "actual offer fees";
  }
  const proceeds = principal - financed - deducted;
  const ownForPurpose = Math.max(0, input.ownFunds - upfront);
  return {
    state: "estimated", principal, purposeCost, proceeds, ownForPurpose, upfront, basis,
    feesPayable: input.ownFunds >= upfront,
    gap: Math.max(0, purposeCost - proceeds - ownForPurpose)
  };
}

function minimumFundingPrincipal(input, scenario, purposeCost, maximum) {
  let low = scenario.minimum;
  let high = Math.floor(maximum);
  if (high < low || fundingAt(input, input.kind, high, purposeCost).gap > 0) return null;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (fundingAt(input, input.kind, middle, purposeCost).gap === 0) high = middle;
    else low = middle + 1;
  }
  return low;
}

function productStatus(input, scenario) {
  if (input.requested > scenario.maximum) return { state: "blocked", reason: `This illustrative path is capped at ${money(scenario.maximum)}.` };
  if (!Number.isFinite(input.age)) return { state: "conditional", reason: "Age is unknown, so product eligibility remains conditional." };
  const endAge = input.age + scenario.terms[0] / 12;
  if (input.age < scenario.ages[0] || endAge > scenario.ages[1]) {
    return { state: "blocked", reason: `This illustrative ${scenario.label.toLowerCase()} path does not fit its stated age boundary.` };
  }
  if (input.kind === "business" && input.security === "no") return { state: "blocked", reason: "The selected property-backed path requires eligible owners to participate with unencumbered property." };
  if (input.kind === "business" && (input.security !== "yes" || !Number.isFinite(input.propertyValue))) return { state: "conditional", reason: "Property ownership, participation or value is unresolved." };
  if (input.kind === "vehicle" && !Number.isFinite(input.vehiclePrice)) return { state: "conditional", reason: "The on-road vehicle price is unresolved." };
  return { state: "estimated", reason: "Illustrative product constraints fit the assessed facts." };
}

function productiveStatus(input, capacity) {
  if (!["business", "vehicle"].includes(input.kind)) return { state: "not_applicable" };
  if (!Number.isFinite(input.productiveIncome) || input.productiveIncome < 0 || !Number.isFinite(input.productiveDelay) || input.productiveDelay < 0) {
    return { ...notEstimable("Add conservative incremental net income and when it would begin."), materialMissing: true };
  }
  const outflow = capacity.totalOutflow;
  return {
    state: "estimated", income: input.productiveIncome, delay: input.productiveDelay, basis: input.productiveBasis,
    paymentsBeforeIncome: Math.min(input.productiveDelay, capacity.term) * outflow,
    coverage: outflow ? input.productiveIncome / outflow : null,
    cashAfterPayment: input.productiveIncome - outflow
  };
}

function reserveStatus(input, income, expenses, debt, capacity) {
  if (!Number.isFinite(input.reserves)) return { state: "not_estimable", reason: "Emergency reserves were not supplied; they are not treated as zero." };
  const denominator = expenses.high + debt.high + capacity.totalOutflow;
  const incomeShortfall = 3 * Math.max(0, expenses.high + debt.high + capacity.totalOutflow - income.low * 0.8);
  const expenseShortfall = 3 * Math.max(0, expenses.high * 1.1 + debt.high + capacity.totalOutflow - income.low);
  return {
    state: "estimated", amount: input.reserves,
    zeroIncomeMonths: denominator ? input.reserves / denominator : null,
    incomeStressRemaining: input.reserves - incomeShortfall,
    expenseStressRemaining: input.reserves - expenseShortfall
  };
}

function decision(input, scenario, coreMissing, capacity, lender, funding, product, history, commitment, productive, offer) {
  if (coreMissing.length) return { state: "incomplete", title: "Incomplete assessment", tone: "warning", recommendedAmount: null, lead: `Add ${coreMissing.join(", ")} before this app can issue a borrower recommendation.` };
  if (input.distress === "active") return { state: "do_not_borrow", title: "Do not borrow under assessed conditions", tone: "bad", recommendedAmount: null, lead: "Stabilise the disclosed repayment problem before taking ordinary additional debt." };
  if (!input.distress) return { state: "incomplete", title: "Incomplete assessment", tone: "warning", recommendedAmount: null, lead: "Confirm whether any repayment problem is currently unresolved. Positive guidance stays withheld while this is unknown." };
  if (product.state === "blocked") return { state: "do_not_borrow", title: "Do not borrow under assessed conditions", tone: "bad", recommendedAmount: null, lead: product.reason };
  if (product.state === "conditional") return { state: "incomplete", title: "Incomplete assessment", tone: "warning", recommendedAmount: null, lead: product.reason };
  if (history.materialMissing || commitment.materialMissing || productive.materialMissing) {
    const missing = [history.materialMissing && "income history", commitment.materialMissing && "commitment details", productive.materialMissing && "productive-income timing"].filter(Boolean);
    return { state: "incomplete", title: "Incomplete assessment", tone: "warning", recommendedAmount: null, lead: `Complete ${missing.join(", ")} because the disclosed path makes it material.` };
  }
  if (input.offer && (offer.state !== "estimated" || ["conditional", "unsupported"].includes(offer.rateStress?.state))) {
    return { state: "incomplete", title: "Incomplete assessment", tone: "warning", recommendedAmount: null, lead: offer.state === "estimated" ? offer.rateStress.reason : offer.reason };
  }
  if (funding.state !== "estimated") return { state: "incomplete", title: "Incomplete assessment", tone: "warning", recommendedAmount: null, lead: funding.reason };
  if (input.requested < scenario.minimum) return { state: "do_not_borrow", title: "Do not borrow under assessed conditions", tone: "bad", recommendedAmount: null, lead: `This illustrative product starts at ${money(scenario.minimum)}. Do not increase borrowing just to reach a product minimum.` };
  if (capacity.safeLow <= 0) return { state: "do_not_borrow", title: "Do not borrow under assessed conditions", tone: "bad", recommendedAmount: null, lead: "The assessed income, expenses and existing debt leave no recurring room after the required stress cases." };

  const fitsSafe = input.requested <= capacity.safeLow;
  const fitsLender = lender.state !== "estimated" || input.requested <= lender.low;
  const fitsOfferedOutflow = offer.state !== "estimated" || !offer.appliesToRequest || offer.totalOutflow <= capacity.lower.resilient;
  if (fitsSafe && fitsLender && fitsOfferedOutflow && funding.gap === 0 && funding.feesPayable) {
    const condition = lender.state === "estimated" ? "The lender estimate remains illustrative." : "Lender access is not estimable from the available evidence.";
    return { state: "borrow", title: "Borrow", tone: "good", recommendedAmount: input.requested, lead: `The requested amount fits the stress-aware borrower boundary under the stated assumptions. ${condition}` };
  }

  const smallerAnswer = input.smallPlan === true ? "yes" : input.smallPlan;
  if (smallerAnswer === "yes") {
    if (!Number.isFinite(input.minimumPurposeCost) || input.minimumPurposeCost < 0 || input.minimumPurposeCost >= input.purposeCost) {
      return { state: "incomplete", title: "Incomplete assessment", tone: "warning", recommendedAmount: null, lead: "Add the cost of the smaller acceptable plan before a lower amount can be recommended." };
    }
    const maximum = Math.min(input.requested - 1, capacity.safeLow, lender.state === "estimated" ? lender.low : capacity.safeLow, scenario.maximum);
    const amount = minimumFundingPrincipal(input, scenario, input.minimumPurposeCost, maximum);
    if (amount !== null) return { state: "borrow_less", title: "Borrow less", tone: "warning", recommendedAmount: amount, lead: `The smaller confirmed plan can be funded at about ${money(amount)} within the stress-aware boundary. Reconfirm actual lender terms.` };
  }
  if (smallerAnswer === "unknown") return { state: "incomplete", title: "Incomplete assessment", tone: "warning", recommendedAmount: null, lead: "The requested amount does not pass, and whether a smaller useful plan exists is still unknown." };
  return { state: "do_not_borrow", title: "Do not borrow under assessed conditions", tone: "bad", recommendedAmount: null, lead: "The request does not pass the assessed borrowing boundary, funding check, or an applicable product constraint. A viable smaller plan has not been confirmed." };
}

export function assess(input) {
  const scenario = SCENARIOS[input.kind];
  if (!scenario || !Number.isFinite(input.requested) || input.requested <= 0) return null;
  const offer = actualOffer(input);
  const core = [[input.income, "current net income"], [input.contribution, "household contribution"], [input.expenses, "household spending"], [input.debt, "existing debt payments"]];
  const coreMissing = core.filter(([value]) => !isRange(value)).map(([, name]) => name);
  const pricing = {
    state: "conditional", apr: benchmarkApr(input.kind, input.requested, scenario.terms[0]),
    fees: benchmarkFees(input.kind, input.requested), term: scenario.terms[0], confidence: "Low", actual: offer
  };
  if (coreMissing.length) return { scenario, coreMissing, pricing, decision: decision(input, scenario, coreMissing) };

  const income = sumRanges(input.income, input.contribution);
  const history = historyScenario(input, input.contribution, input.expenses, input.debt);
  const commitment = commitmentScenario(input, income, input.expenses, input.debt);
  const capacity = capacityRange(input, income, input.expenses, input.debt, scenario, history, commitment, offer);
  const supportedIncome = input.records === "yes" ? input.income : input.records === "part" ? input.supportedIncome : null;
  const lender = lenderRange(input, scenario, supportedIncome, offer);
  const funding = fundingAt(input, input.kind, input.requested, input.purposeCost, offer);
  const product = productStatus(input, scenario);
  const productive = productiveStatus(input, capacity);
  const reserves = reserveStatus(input, income, input.expenses, input.debt, capacity);
  return {
    scenario, coreMissing, pricing, capacity, lender, funding, product, history, commitment, productive, reserves,
    decision: decision(input, scenario, coreMissing, capacity, lender, funding, product, history, commitment, productive, offer)
  };
}

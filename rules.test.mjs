import assert from "node:assert/strict";
import { assess, ceiling, emi, flatPayment, inverseFlatPrincipal, inversePrincipal, monthlyApr, questionRoute } from "./rules.mjs";

const complete = (overrides = {}) => ({
  kind: "personal", requested: 100000, income: { low: 100000, high: 100000 }, contribution: { low: 0, high: 0 },
  expenses: { low: 40000, high: 40000 }, debt: { low: 0, high: 0 }, applicantDebt: { low: 0, high: 0 },
  incomeType: "salaried", incomeVariable: "no", records: "yes", distress: "none", age: 30,
  purposeCost: 89000, ownFunds: 0, smallPlan: "no", reserves: 100000, commitment: { status: "no" }, ...overrides
});

assert.equal(ceiling(50000, 25000, 5000), 12500);
assert(Math.abs(emi(100000, 0.12, 36) - 3321.43) < 0.01);
assert(Math.abs(inversePrincipal(3321.43, 0.12, 36) - 100000) < 0.2);
assert(Math.abs(flatPayment(100000, 0.12, 12) - 9333.33) < 0.01);
assert(Math.abs(inverseFlatPrincipal(9333.333333, 0.12, 12) - 100000) < 0.01);
assert(Math.abs(monthlyApr(19600, Array(24).fill(emi(20000, 0.15, 24))) - 0.1707055) < 0.000001);

const healthy = assess(complete());
assert.equal(healthy.decision.state, "borrow");
assert(healthy.capacity.lower.income <= healthy.capacity.lower.base);
assert.equal(healthy.lender.state, "estimated");
assert.equal(healthy.pricing.state, "conditional");
assert.equal(assess(complete({ distress: "" })).decision.state, "incomplete");
assert.equal(assess(complete({ distress: "active" })).decision.state, "do_not_borrow");
assert.equal(assess(complete({ income: null })).decision.state, "incomplete");
assert.equal(assess(complete({ records: "part", supportedIncome: null })).lender.state, "not_estimable");
assert(assess(complete({ expenses: { low: 50000, high: 50000 } })).capacity.safeLow <= healthy.capacity.safeLow);

assert.deepEqual(questionRoute({ kind: "personal", incomeType: "salaried", hasOffer: "no" }), ["need", "income", "budget", "credit", "funding", "resilience"]);
assert.deepEqual(questionRoute({ kind: "business", incomeType: "self-employed", hasOffer: "yes" }), ["need", "income", "budget", "credit", "security", "funding", "history", "productive", "resilience", "offer"]);
assert(questionRoute({ kind: "vehicle", incomeVariable: "yes" }).includes("vehicle"));
assert(!questionRoute({ kind: "personal", incomeType: "salaried" }).includes("productive"));

const variable = complete({ incomeType: "self-employed", historyLow: 60000, historyMonths: 12 });
const historyResult = assess(variable);
assert.equal(historyResult.history.state, "estimated");
assert(historyResult.capacity.safeLow < healthy.capacity.safeLow);
assert.equal(assess(complete({ incomeType: "self-employed" })).decision.state, "incomplete");

const commitmentResult = assess(complete({
  commitment: { status: "yes", amount: 360000, earmarked: 0, months: 12, inExpenses: "no" }
}));
assert.equal(commitmentResult.commitment.provision, 30000);
assert(commitmentResult.capacity.safeLow < healthy.capacity.safeLow);
assert.equal(assess(complete({ commitment: { status: "yes" } })).decision.state, "incomplete");
assert.equal(assess(complete({ reserves: 0 })).capacity.safeLow, assess(complete({ reserves: 500000 })).capacity.safeLow);

const business = complete({
  kind: "business", requested: 500000, incomeType: "self-employed", historyLow: 80000, historyMonths: 12,
  security: "yes", propertyValue: 4500000, purposeCost: 450000, ownFunds: 100000,
  productiveIncome: 20000, productiveDelay: 3, productiveBasis: "records"
});
const productive = assess(business);
assert.equal(productive.productive.state, "estimated");
assert.equal(productive.capacity.safeLow, assess({ ...business, productiveIncome: 100000 }).capacity.safeLow);
assert.equal(assess({ ...business, productiveIncome: null }).decision.state, "incomplete");

const offer = {
  principal: 100000, payment: 3321.43, structure: "reducing", rateType: "fixed", annualRate: 0.12, months: 36,
  completeFees: "yes", fees: { financed: 0, deducted: 1000, upfront: 0, recurring: 0 }
};
const offered = assess(complete({ offer }));
assert.equal(offered.pricing.actual.state, "estimated");
assert(offered.pricing.actual.apr > 0.12);
assert.equal(offered.capacity.source, "actual offer");
assert.equal(offered.capacity.confidence, "Moderate");
assert.equal(assess(complete({ offer: { ...offer, completeFees: "no" } })).decision.state, "incomplete");
assert.equal(assess(complete({ offer: { ...offer, structure: "unsupported" } })).pricing.actual.state, "unsupported");

const floating = assess(complete({ offer: { ...offer, rateType: "floating" } }));
assert.equal(floating.pricing.actual.rateStress.state, "applied");
assert(floating.pricing.actual.rateStress.stressedPayment > floating.pricing.actual.payment);
assert(floating.capacity.safeLow < offered.capacity.safeLow);

const smaller = assess(complete({
  requested: 500000, income: { low: 50000, high: 50000 }, expenses: { low: 25000, high: 25000 },
  debt: { low: 5000, high: 5000 }, applicantDebt: { low: 5000, high: 5000 }, purposeCost: 500000,
  ownFunds: 200000, smallPlan: "yes", minimumPurposeCost: 250000
}));
assert.equal(smaller.decision.state, "borrow_less");
assert(smaller.decision.recommendedAmount < smaller.capacity.safeLow);

const stale = assess(complete({ security: "no", propertyValue: 1, productiveIncome: null }));
assert.equal(stale.decision.state, healthy.decision.state);
console.log("rules checks passed");

import React, { useState } from 'react';
import {
  Shield,
  CreditCard,
  Building2,
  Percent,
  Calculator,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const InsuranceClaimEngine: React.FC = () => {
  const [claimType, setClaimType] = useState<'cashless' | 'reimbursement'>('cashless');

  // NCB Calculator State
  const [estimatedRepairCost, setEstimatedRepairCost] = useState<number>(8500);
  const [currentAnnualPremium, setCurrentAnnualPremium] = useState<number>(14000);
  const [currentNcbPercent, setCurrentNcbPercent] = useState<number>(35);
  const [standardDeductible, setStandardDeductible] = useState<number>(1000);

  // Calculation logic
  // If you claim: You lose NCB. Over 2 years, the lost discount equals ~ (currentNcbPercent/100 * premium) + next year increment.
  // Effective payout received = repair cost - deductible - depreciation (~15% average if non-zero-dep).
  const estimatedDepreciationAndDeductible = standardDeductible + estimatedRepairCost * 0.15;
  const netClaimPayout = Math.max(0, estimatedRepairCost - estimatedDepreciationAndDeductible);
  const lostNcbOverTwoYears = (currentNcbPercent / 100) * currentAnnualPremium * 1.8;
  const netAdvantageOfClaiming = netClaimPayout - lostNcbOverTwoYears;
  const shouldClaim = netAdvantageOfClaiming > 500;

  return (
    <div className="space-y-8">
      {/* Insurance Claim Blueprint Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
              <Shield className="w-3.5 h-3.5" />
              <span>Claims Procedure & Compensation Engine</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
              Motor Insurance Claim Procedures & Rules
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Clear pathways for Own Damage (OD) vs Third-Party (TP) claims, cashless settlement vs reimbursement, and avoiding claim rejection.
            </p>
          </div>

          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              onClick={() => setClaimType('cashless')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                claimType === 'cashless'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cashless Garage Claim
            </button>
            <button
              onClick={() => setClaimType('reimbursement')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                claimType === 'reimbursement'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Reimbursement Claim
            </button>
          </div>
        </div>

        {/* Workflow Comparison */}
        <div className="mt-6">
          {claimType === 'cashless' ? (
            <div className="space-y-4">
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950">
                <span className="font-bold text-sm block mb-1">
                  How Cashless Claims Work (Recommended):
                </span>
                You tow your vehicle to an authorized "network garage" affiliated with your insurer. The insurer’s appointed surveyor inspects the car on-site, approves the estimate, and pays the workshop directly upon completion. You only pay the statutory deductible, depreciation (if no Zero-Dep add-on), and salvage.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center mb-1.5">
                    1
                  </span>
                  <h4 className="font-bold text-slate-900">Intimate Claim (0-24h)</h4>
                  <p className="text-slate-600 mt-1">
                    Call toll-free helpline or app. Obtain Claim Reference Number.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center mb-1.5">
                    2
                  </span>
                  <h4 className="font-bold text-slate-900">Tow to Network Garage</h4>
                  <p className="text-slate-600 mt-1">
                    Workshop prepares detailed parts & labor estimate for the surveyor.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center mb-1.5">
                    3
                  </span>
                  <h4 className="font-bold text-slate-900">Surveyor Inspection</h4>
                  <p className="text-slate-600 mt-1">
                    Surveyor matches physical damage with incident narrative.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center mb-1.5">
                    4
                  </span>
                  <h4 className="font-bold text-slate-900">Direct Settlement</h4>
                  <p className="text-slate-600 mt-1">
                    Insurer pays workshop directly; you pay only non-covered items.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950">
                <span className="font-bold text-sm block mb-1">
                  How Reimbursement Claims Work (Non-Network Garages):
                </span>
                Required when your vehicle is repaired at an independent garage not on the insurer's cashless tie-up list. You pay the entire repair bill out of pocket first, submit original tax invoices, payment receipts, old damaged parts, and claim form, and receive reimbursement into your bank account within 15-30 days.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center mb-1.5">
                    1
                  </span>
                  <h4 className="font-bold text-slate-900">Spot Survey First</h4>
                  <p className="text-slate-600 mt-1">
                    Crucial: Never allow mechanic to touch car before surveyor visits.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center mb-1.5">
                    2
                  </span>
                  <h4 className="font-bold text-slate-900">Retain Replaced Parts</h4>
                  <p className="text-slate-600 mt-1">
                    Keep salvage (broken lamps, dented bumper) for final surveyor check.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center mb-1.5">
                    3
                  </span>
                  <h4 className="font-bold text-slate-900">Pay & Collect Invoices</h4>
                  <p className="text-slate-600 mt-1">
                    Gather original GST/tax invoice with matching part numbers.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center mb-1.5">
                    4
                  </span>
                  <h4 className="font-bold text-slate-900">Bank Transfer Payout</h4>
                  <p className="text-slate-600 mt-1">
                    Insurer disburses funds after reviewing invoice authenticity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Depreciation Deductions Reference Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
            <Percent className="w-3.5 h-3.5" />
            <span>Standard Insurance Math</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mt-1">
            Standard Depreciation Deductions on Parts
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Unless you purchased a "Zero-Depreciation / Bumper-to-Bumper" rider, insurers deduct statutory depreciation according to material type:
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-slate-500 block mb-1 font-medium">Rubber, Plastic & Nylon</span>
            <span className="text-lg font-bold text-slate-900">50% Deduction</span>
            <p className="text-[11px] text-slate-500 mt-1">
              Includes bumpers, tires, tubes, battery, airbags, plastic clips.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-slate-500 block mb-1 font-medium">Fiberglass Parts</span>
            <span className="text-lg font-bold text-slate-900">30% Deduction</span>
            <p className="text-[11px] text-slate-500 mt-1">
              Fiber composite spoilers, hoods, reinforced body shells.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-slate-500 block mb-1 font-medium">Glass Components</span>
            <span className="text-lg font-bold text-emerald-700">0% (Nil)</span>
            <p className="text-[11px] text-slate-500 mt-1">
              Windshields, window panes, rear defogger glass have no depreciation.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
            <span className="text-slate-500 block mb-1 font-medium">Metal & Body Panels</span>
            <span className="text-lg font-bold text-slate-900">0% – 50%</span>
            <p className="text-[11px] text-slate-500 mt-1">
              Graduated based on vehicle age (0% under 6 months, up to 50% at 10+ yrs).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive NCB (No-Claim-Bonus) Loss vs Claim Calculator */}
      <div className="bg-slate-900 text-slate-100 rounded-xl p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Decision Calculator</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-1">
            "Should I File a Claim or Pay Out of Pocket?"
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Filing a minor claim resets your accumulated No-Claim Bonus (NCB) to 0%, hiking your renewal premium for the next 2-3 years. Check if claiming makes financial sense:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Inputs */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Estimated Repair Cost ($ or ₹):
              </label>
              <input
                type="number"
                value={estimatedRepairCost}
                onChange={(e) => setEstimatedRepairCost(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Annual Own Damage Premium:
              </label>
              <input
                type="number"
                value={currentAnnualPremium}
                onChange={(e) => setCurrentAnnualPremium(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-hidden focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Current No-Claim Bonus (NCB):
              </label>
              <select
                value={currentNcbPercent}
                onChange={(e) => setCurrentNcbPercent(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-xs focus:outline-hidden focus:border-amber-400"
              >
                <option value={20}>20% (1 Claim-Free Year)</option>
                <option value={25}>25% (2 Claim-Free Years)</option>
                <option value={35}>35% (3 Claim-Free Years)</option>
                <option value={45}>45% (4 Claim-Free Years)</option>
                <option value={50}>50% (5+ Claim-Free Years - Maximum)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Compulsory Policy Deductible:
              </label>
              <input
                type="number"
                value={standardDeductible}
                onChange={(e) => setStandardDeductible(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-hidden focus:border-amber-400"
              />
            </div>
          </div>

          {/* Calculator Verdict Card */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700 rounded-xl p-5 space-y-3">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block">
              Financial Verdict:
            </span>

            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-bold px-3 py-1 rounded-lg ${
                  shouldClaim
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {shouldClaim ? 'CLAIM YOUR INSURANCE' : 'PAY OUT OF POCKET'}
              </span>
            </div>

            <div className="text-xs space-y-1.5 text-slate-300 pt-2 border-t border-slate-700">
              <div className="flex justify-between">
                <span>Estimated Net Insurance Payout:</span>
                <span className="font-mono text-white">~{Math.round(netClaimPayout)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Lost NCB (over 2 yrs):</span>
                <span className="font-mono text-red-400">~{Math.round(lostNcbOverTwoYears)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-slate-700 text-white">
                <span>Net Financial Advantage:</span>
                <span
                  className={`font-mono ${
                    netAdvantageOfClaiming >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {netAdvantageOfClaiming >= 0 ? '+' : ''}
                  {Math.round(netAdvantageOfClaiming)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              {shouldClaim
                ? 'The repair cost significantly exceeds the value of your lost NCB discount and deductible. Proceed with filing the insurance claim.'
                : 'The repair is minor. Claiming will reset your NCB discount and raise your insurance renewals by more than you will receive from this claim.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

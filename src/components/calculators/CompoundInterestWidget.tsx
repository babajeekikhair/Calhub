import React, { useState } from "react";
import { calculateCompoundInterest } from "../../utils/calculations";

export default function CompoundInterestWidget() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [rateAnnual, setRateAnnual] = useState<number>(7.5);
  const [years, setYears] = useState<number>(15);
  const [frequency, setFrequency] = useState<number>(12); // monthly compounding

  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const results = calculateCompoundInterest(
    principal,
    monthlyContribution,
    rateAnnual,
    years,
    frequency
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const totalAddedValue = results.totalContributions;
  const earnedInterest = results.totalInterestEarned;
  const finalValue = results.futureValue;

  const principalPct = finalValue > 0 ? (principal / finalValue) * 100 : 0;
  const contribsPct = finalValue > 0 ? ((totalAddedValue - principal) / finalValue) * 100 : 0;
  const interestPct = finalValue > 0 ? (earnedInterest / finalValue) * 100 : 0;

  const handleReset = () => {
    setPrincipal(10000);
    setMonthlyContribution(200);
    setRateAnnual(7.5);
    setYears(15);
    setFrequency(12);
  };

  return (
    <div id="compound-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT PANEL */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Configure Growth Options
          </h3>

          <div className="space-y-4">
            {/* Starting Principal */}
            <div>
              <label htmlFor="principal-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Initial Investment (Principal)
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-zinc-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="principal-input"
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 pl-8 pr-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                  value={principal || ""}
                  onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                />
              </div>
            </div>

            {/* Monthly Additions */}
            <div>
              <label htmlFor="monthly-contribution-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Monthly Recurring Addition
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-zinc-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="monthly-contribution-input"
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 pl-8 pr-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                  value={monthlyContribution || ""}
                  onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                />
              </div>
            </div>

            {/* Return % & Growth Horizon */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="interest-rate-annual-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Est. Annual Return (%)
                </label>
                <div className="relative rounded-md shadow-xs">
                  <input
                    type="number"
                    step="0.1"
                    id="interest-rate-annual-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm pr-8"
                    value={rateAnnual || ""}
                    onChange={(e) => setRateAnnual(Math.max(0, Number(e.target.value)))}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-zinc-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="years-horizon-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Growth Period (Years)
                </label>
                <input
                  type="number"
                  id="years-horizon-input"
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                  value={years || ""}
                  onChange={(e) => setYears(Math.min(100, Math.max(1, Number(e.target.value))))}
                />
              </div>
            </div>

            {/* Compound Frequency */}
            <div>
              <label htmlFor="compounding-frequency-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Compound Intervalling
              </label>
              <select
                id="compounding-frequency-input"
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
              >
                <option value={1}>Annually (Once a year)</option>
                <option value={12}>Monthly (12 times a year)</option>
                <option value={365}>Daily (Continuous daily compounding)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full text-center py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 active:bg-zinc-100 transition-colors cursor-pointer"
          >
            Reset Form Fields
          </button>
        </div>

        {/* OUTPUT ANALYSIS PANEL */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-zinc-50 dark:bg-zinc-900/40 p-6 md:p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              ESTIMATED PORTFOLIO VALUE
            </h4>
            
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl md:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tracking-tight">
                {formatCurrency(finalValue)}
              </span>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              Based on starting with {formatCurrency(principal)} and saving {formatCurrency(monthlyContribution)} month-by-month for {years} years at {rateAnnual}% annual return compounded {frequency === 1 ? "annually" : frequency === 12 ? "monthly" : "daily"}.
            </p>

            {/* STACKED BAR GRAPH HEIGHT REPRESENTATIVE */}
            <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex mt-6">
              <div 
                style={{ width: `${principalPct}%` }} 
                className="h-full bg-emerald-500/80 transition-all duration-300"
                title={`Starting: ${principalPct.toFixed(1)}%`}
              />
              <div 
                style={{ width: `${contribsPct}%` }} 
                className="h-full bg-emerald-300 dark:bg-emerald-600/60 transition-all duration-300"
                title={`Added contributions: ${contribsPct.toFixed(1)}%`}
              />
              <div 
                style={{ width: `${interestPct}%` }} 
                className="h-full bg-blue-500 transition-all duration-300"
                title={`Compounded Earned Interest: ${interestPct.toFixed(1)}%`}
              />
            </div>

            {/* LEGEND BRACKETS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
                  <span>Initial Principal</span>
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-white pl-5">
                  {formatCurrency(principal)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-emerald-300 dark:bg-emerald-600/60 block" />
                  <span>Total Additions</span>
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-white pl-5">
                  {formatCurrency(totalAddedValue - principal)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-blue-500 block" />
                  <span>Compounded Interest</span>
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-white pl-5 text-blue-600 dark:text-blue-400">
                  {formatCurrency(earnedInterest)}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Cumulative Contributions</p>
                <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{formatCurrency(results.totalContributions)}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Interest Ratio Boost</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {totalAddedValue > 0 ? `${Math.round((earnedInterest / totalAddedValue) * 100)}%` : "0%"}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* DETAILED LEDGER SECTION */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 md:p-8">
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="flex items-center justify-between w-full text-base font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-hidden py-2"
        >
          <span>Year-by-Year Growth Table</span>
          <span className="text-2xl font-normal leading-none">{showSchedule ? "−" : "+"}</span>
        </button>

        {showSchedule && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
              <thead className="text-xs text-zinc-700 dark:text-zinc-300 uppercase bg-zinc-100 dark:bg-zinc-800/50">
                <tr>
                  <th scope="col" className="px-4 py-3 rounded-l-lg">Year</th>
                  <th scope="col" className="px-4 py-3">Contributions</th>
                  <th scope="col" className="px-4 py-3">Accumulated Interest</th>
                  <th scope="col" className="px-4 py-3 rounded-r-lg">Holding Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {results.schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200">Year {row.year}</td>
                    <td className="px-4 py-3 text-zinc-800 dark:text-zinc-300">{formatCurrency(row.contributions)}</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium font-mono">{formatCurrency(row.interest)}</td>
                    <td className="px-4 py-3 font-mono font-bold text-zinc-900 dark:text-white">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

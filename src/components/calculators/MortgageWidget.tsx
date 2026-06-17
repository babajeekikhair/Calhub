import React, { useState } from "react";
import { calculateMortgage } from "../../utils/calculations";

export default function MortgageWidget() {
  const [homeValue, setHomeValue] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [termYears, setTermYears] = useState<number>(30);
  const [propertyTax, setPropertyTax] = useState<number>(4800);
  const [insurance, setInsurance] = useState<number>(1200);
  
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  const results = calculateMortgage(
    homeValue,
    downPayment,
    interestRate,
    termYears,
    propertyTax,
    insurance
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const downPaymentPercent = homeValue > 0 ? Math.round((downPayment / homeValue) * 100) : 0;

  // Pie chart segment computation (using simple SVG circle strokes which is super lightweight and works universally)
  const totalShare = results.monthlyTotal;
  const piShare = results.monthlyPI;
  const taxShare = results.monthlyTax;
  const insShare = results.monthlyInsurance;

  const piPct = totalShare > 0 ? (piShare / totalShare) * 100 : 0;
  const taxPct = totalShare > 0 ? (taxShare / totalShare) * 100 : 0;
  const insPct = totalShare > 0 ? (insShare / totalShare) * 100 : 0;

  const handleReset = () => {
    setHomeValue(400000);
    setDownPayment(80000);
    setInterestRate(6.5);
    setTermYears(30);
    setPropertyTax(4800);
    setInsurance(1200);
  };

  return (
    <div id="mortgage-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Configure Mortgage Inputs
          </h3>

          <div className="space-y-4">
            {/* Home Value */}
            <div>
              <label htmlFor="home-value-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Home Value
              </label>
              <div className="relative rounded-md shadow-xs">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-zinc-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="home-value"
                  id="home-value-input"
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 pl-8 pr-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                  placeholder="400,000"
                  value={homeValue || ""}
                  onChange={(e) => setHomeValue(Math.max(0, Number(e.target.value)))}
                />
              </div>
            </div>

            {/* Down Payment */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="down-payment-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Down Payment ($)
                </label>
                <div className="relative rounded-md shadow-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-zinc-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="down-payment-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 pl-8 pr-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={downPayment || ""}
                    onChange={(e) => {
                      const val = Math.max(0, Number(e.target.value));
                      setDownPayment(val);
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="down-payment-percent-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Down Payment (%)
                </label>
                <div className="relative rounded-md shadow-xs">
                  <input
                    type="number"
                    id="down-payment-percent-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm pr-8"
                    value={downPaymentPercent}
                    onChange={(e) => {
                      const pct = Math.min(100, Math.max(0, Number(e.target.value)));
                      setDownPayment(Math.round((pct / 100) * homeValue));
                    }}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-zinc-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interest Rate & Term */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="interest-rate-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Interest Rate (%)
                </label>
                <div className="relative rounded-md shadow-xs">
                  <input
                    type="number"
                    step="0.01"
                    id="interest-rate-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm pr-8"
                    placeholder="6.5"
                    value={interestRate || ""}
                    onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-zinc-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="loan-term-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Loan Term (Years)
                </label>
                <select
                  id="loan-term-input"
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={30}>30 Years</option>
                </select>
              </div>
            </div>

            {/* Additional Expenses */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800/50">
              <div>
                <label htmlFor="property-tax-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Property Taxes (Yearly)
                </label>
                <div className="relative rounded-md shadow-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-zinc-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="property-tax-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 pl-8 pr-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={propertyTax || ""}
                    onChange={(e) => setPropertyTax(Math.max(0, Number(e.target.value)))}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="insurance-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Home Insurance (Yearly)
                </label>
                <div className="relative rounded-md shadow-xs">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-zinc-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="insurance-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 pl-8 pr-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={insurance || ""}
                    onChange={(e) => setInsurance(Math.max(0, Number(e.target.value)))}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full text-center py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 active:bg-zinc-100 transition-colors cursor-pointer"
          >
            Reset Form Fields
          </button>
        </div>

        {/* RESULTS COLUMN */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-zinc-50 dark:bg-zinc-900/40 p-6 md:p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              ESTIMATED MONTHLY COST
            </h4>
            
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white font-sans tracking-tight">
                {formatCurrency(results.monthlyTotal)}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">/ month</span>
            </div>

            {/* SEGMENTED PROGRESS BAR */}
            <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex mt-6">
              <div 
                style={{ width: `${piPct}%` }} 
                className="h-full bg-emerald-500 transition-all duration-300"
                title={`P&I: ${piPct.toFixed(1)}%`}
              />
              <div 
                style={{ width: `${taxPct}%` }} 
                className="h-full bg-blue-500 transition-all duration-300"
                title={`Taxes: ${taxPct.toFixed(1)}%`}
              />
              <div 
                style={{ width: `${insPct}%` }} 
                className="h-full bg-amber-500 transition-all duration-300"
                title={`Insurance: ${insPct.toFixed(1)}%`}
              />
            </div>

            {/* BREAKDOWN ITEMS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
                  <span>Principal & Interest</span>
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-white pl-5">
                  {formatCurrency(results.monthlyPI)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-blue-500 block" />
                  <span>Property Tax</span>
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-white pl-5">
                  {formatCurrency(results.monthlyTax)}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="w-3 h-3 rounded-full bg-amber-500 block" />
                  <span>Insurance Share</span>
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-white pl-5">
                  {formatCurrency(results.monthlyInsurance)}
                </p>
              </div>
            </div>
          </div>

          {/* CUMULATIVE INFO */}
          <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-800/80 pt-6 mt-6">
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Net Principal Borrowed</p>
              <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{formatCurrency(results.principal)}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Cumulative Interest Paid</p>
              <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{formatCurrency(results.totalInterest)}</p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Term Tax / Insurance</p>
              <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{formatCurrency(results.totalTaxAndInsurance)}</p>
            </div>
            <div className="pt-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Lifetime Payments</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(results.overallTotalPay)}</p>
            </div>
          </div>
        </div>

      </div>

      {/* AMORTIZATION PANEL SECTION */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-6 md:p-8">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="flex items-center justify-between w-full text-base font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-hidden py-2"
        >
          <span>Amortization Schedule (Year-by-Year Breakdown)</span>
          <span className="text-2xl font-normal leading-none">{showAmortization ? "−" : "+"}</span>
        </button>

        {showAmortization && (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
              <thead className="text-xs text-zinc-700 dark:text-zinc-300 uppercase bg-zinc-100 dark:bg-zinc-800/50">
                <tr>
                  <th scope="col" className="px-4 py-3 rounded-l-lg">Year</th>
                  <th scope="col" className="px-4 py-3">Principal Repaid</th>
                  <th scope="col" className="px-4 py-3">Interest Charged</th>
                  <th scope="col" className="px-4 py-3">Total Expense</th>
                  <th scope="col" className="px-4 py-3 rounded-r-lg">Remaining Debt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {results.amortizationSchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-200">Year {row.year}</td>
                    <td className="px-4 py-3 text-zinc-800 dark:text-zinc-300">{formatCurrency(row.principalPaid)}</td>
                    <td className="px-4 py-3 text-zinc-800 dark:text-zinc-300">{formatCurrency(row.interestPaid)}</td>
                    <td className="px-4 py-3 text-zinc-800 dark:text-zinc-300">{formatCurrency(row.totalPaid)}</td>
                    <td className="px-4 py-3 font-mono text-zinc-900 dark:text-white">{formatCurrency(row.remainingBalance)}</td>
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

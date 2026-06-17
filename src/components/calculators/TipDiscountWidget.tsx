import React, { useState } from "react";

export default function TipDiscountWidget() {
  const [activeTab, setActiveTab] = useState<number>(1);

  // Tab 1: Discount Options
  const [price, setPrice] = useState<number>(120);
  const [discountPercent, setDiscountPercent] = useState<number>(20);
  const [taxPercent, setTaxPercent] = useState<number>(8.25);

  // Tab 2: Tip Options
  const [bill, setBill] = useState<number>(75.5);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [splitCount, setSplitCount] = useState<number>(3);

  // Math tab 1
  const savedAmount = price * (discountPercent / 100);
  const subtotal = Math.max(0, price - savedAmount);
  const taxAmount = subtotal * (taxPercent / 100);
  const finalPrice = subtotal + taxAmount;

  // Math tab 2
  const tipAmount = bill * (tipPercent / 100);
  const totalBill = bill + tipAmount;
  const sharePrice = splitCount > 0 ? totalBill / splitCount : totalBill;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val);
  };

  return (
    <div id="tipdiscount-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      
      {/* Sub tabs */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 text-center py-4 px-3 text-xs font-semibold whitespace-nowrap hover:bg-zinc-50 dark:hover:bg-zinc-800/20 border-b-2 transition-all cursor-pointer ${
            activeTab === 1
              ? "border-blue-650 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
          }`}
        >
          🏷️ Shopping Discount & Tax
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`flex-1 text-center py-4 px-3 text-xs font-semibold whitespace-nowrap hover:bg-zinc-50 dark:hover:bg-zinc-800/20 border-b-2 transition-all cursor-pointer ${
            activeTab === 2
              ? "border-blue-650 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
          }`}
        >
          🍽️ Restaurant Tip & Bill Splitter
        </button>
      </div>

      <div className="p-6 md:p-8">
        
        {/* TAB 1: Shopping Discount Solver */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
              Calculate Retail Savings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-zinc-50 dark:bg-zinc-900/20 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800/80">
              
              {/* Form Inputs col */}
              <div className="md:col-span-5 p-6 space-y-4">
                <div>
                  <label htmlFor="price-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Original Retail Price ($)
                  </label>
                  <div className="relative rounded-md shadow-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-zinc-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="price-input"
                      className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-2 pl-8 pr-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:outline-hidden sm:text-sm"
                      value={price || ""}
                      onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="discount-percent-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Discount (%)
                    </label>
                    <div className="relative rounded-md shadow-xs">
                      <input
                        type="number"
                        id="discount-percent-input"
                        className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-2 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:outline-hidden sm:text-sm pr-8"
                        value={discountPercent || ""}
                        onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-zinc-400 sm:text-sm">%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tax-percent-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Sales Tax (%)
                    </label>
                    <div className="relative rounded-md shadow-xs">
                      <input
                        type="number"
                        id="tax-percent-input"
                        className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-2 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:outline-hidden sm:text-sm pr-8"
                        value={taxPercent || ""}
                        onChange={(e) => setTaxPercent(Math.max(0, Number(e.target.value)))}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-zinc-400 sm:text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outputs col */}
              <div className="md:col-span-7 bg-zinc-100/60 dark:bg-zinc-900/50 p-6 flex flex-col justify-between border-l border-zinc-200/50 dark:border-zinc-800/50">
                <div className="space-y-4">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Net Purchase Summary</span>
                  
                  <div>
                    <p className="text-xs text-zinc-500">FINAL TICKET PRICE</p>
                    <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-sans mt-0.5">
                      {formatCurrency(finalPrice)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-850">
                    <div>
                      <p className="text-xs text-zinc-500">Gross savings</p>
                      <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{formatCurrency(savedAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Subtotal after coupon</p>
                      <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{formatCurrency(subtotal)}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-zinc-500">Sales tax charge</p>
                      <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{formatCurrency(taxAmount)}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-zinc-500">Total discount ratio</p>
                      <p className="text-base font-bold text-blue-650 dark:text-blue-400 mt-0.5">{discountPercent}% OFF</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: Restaurant Tip and Splitter */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
              Restaurant Bill split & tip solver
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-zinc-50 dark:bg-zinc-900/20 rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800/80">
              
              {/* Form Inputs col */}
              <div className="md:col-span-5 p-6 space-y-4">
                <div>
                  <label htmlFor="bill-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Enter Subtotal Bill ($)
                  </label>
                  <div className="relative rounded-md shadow-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-zinc-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      id="bill-input"
                      className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-2 pl-8 pr-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:outline-hidden sm:text-sm"
                      value={bill || ""}
                      onChange={(e) => setBill(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                </div>

                {/* Percentage Slider / Quick Picker */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="tip-percent-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Tip Percentage (%)
                    </label>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{tipPercent}%</span>
                  </div>
                  <input
                    type="range"
                    id="tip-percent-input"
                    min="0"
                    max="40"
                    step="1"
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    value={tipPercent}
                    onChange={(e) => setTipPercent(Number(e.target.value))}
                  />
                  {/* Quick percentage badges */}
                  <div className="flex justify-between mt-2 gap-1.5">
                    {[10, 15, 18, 20, 25].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setTipPercent(pct)}
                        className={`flex-1 text-center py-1 rounded-sm text-[10px] font-bold border transition-colors cursor-pointer ${
                          tipPercent === pct
                            ? "bg-blue-600 border-blue-600 text-white font-semibold"
                            : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-350 hover:text-zinc-800 dark:hover:text-zinc-200"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="split-count-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Number of People sharing
                  </label>
                  <input
                    type="number"
                    id="split-count-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-2 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:outline-hidden sm:text-sm"
                    value={splitCount || ""}
                    onChange={(e) => setSplitCount(Math.max(1, Number(e.target.value)))}
                  />
                </div>
              </div>

              {/* Outputs col */}
              <div className="md:col-span-7 bg-zinc-100/60 dark:bg-zinc-900/50 p-6 flex flex-col justify-between border-l border-zinc-200/50 dark:border-zinc-800/50">
                <div className="space-y-4">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Tip Split Outcome</span>
                  
                  <div>
                    <p className="text-xs text-zinc-500">SAILING INDIVIDUAL SHARE</p>
                    <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 font-sans mt-0.5">
                      {formatCurrency(sharePrice)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-855">
                    <div>
                      <p className="text-xs text-zinc-500">Computed Tip Share</p>
                      <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{formatCurrency(tipAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Cumulative Bill (P+T)</p>
                      <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{formatCurrency(totalBill)}</p>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-zinc-500">Individual Base share</p>
                      <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                        {formatCurrency(splitCount > 0 ? bill / splitCount : bill)}
                      </p>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-zinc-500">Individual Tip share</p>
                      <p className="text-base font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                        {formatCurrency(splitCount > 0 ? tipAmount / splitCount : tipAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}

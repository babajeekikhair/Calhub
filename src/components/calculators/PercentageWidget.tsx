import React, { useState } from "react";
import { 
  calculatePercentageOf, 
  calculateWhatPercentValue, 
  calculatePercentageChange 
} from "../../utils/calculations";

export default function PercentageWidget() {
  const [activeTab, setActiveTab] = useState<number>(1);

  // Tab 1: What is X% of Y?
  const [tab1X, setTab1X] = useState<number>(15);
  const [tab1Y, setTab1Y] = useState<number>(250);

  // Tab 2: X is what % of Y?
  const [tab2X, setTab2X] = useState<number>(35);
  const [tab2Y, setTab2Y] = useState<number>(140);

  // Tab 3: % change from X to Y
  const [tab3X, setTab3X] = useState<number>(50); // Original
  const [tab3Y, setTab3Y] = useState<number>(75);  // New

  // Compute values
  const tab1Result = calculatePercentageOf(tab1X, tab1Y);
  const tab2Result = calculateWhatPercentValue(tab2X, tab2Y);
  const tab3ResultObj = calculatePercentageChange(tab3X, tab3Y);

  const formatNum = (val: number) => {
    return Number(val.toFixed(4)).toString();
  };

  return (
    <div id="percentage-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      
      {/* Sub-tab controllers */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 text-center py-4 px-3 text-xs font-semibold whitespace-nowrap hover:bg-zinc-50 dark:hover:bg-zinc-800/20 border-b-2 transition-all cursor-pointer ${
            activeTab === 1
              ? "border-blue-650 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
          }`}
        >
          Find % of Number
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`flex-1 text-center py-4 px-3 text-xs font-semibold whitespace-nowrap hover:bg-zinc-50 dark:hover:bg-zinc-800/20 border-b-2 transition-all cursor-pointer ${
            activeTab === 2
              ? "border-blue-650 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
          }`}
        >
          Find percentage ratio
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`flex-1 text-center py-4 px-3 text-xs font-semibold whitespace-nowrap hover:bg-zinc-50 dark:hover:bg-zinc-800/20 border-b-2 transition-all cursor-pointer ${
            activeTab === 3
              ? "border-blue-650 text-blue-600 dark:text-blue-400"
              : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100"
          }`}
        >
          Increase or Decrease %
        </button>
      </div>

      <div className="p-6 md:p-8">
        
        {/* TAB 1: WHAT IS X% OF Y */}
        {activeTab === 1 && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Calculate X% of Y
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="tab1-x-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    What is (Percentage %)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="tab1-x-input"
                      className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm pr-8"
                      value={tab1X === 0 ? "" : tab1X}
                      onChange={(e) => setTab1X(Number(e.target.value))}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-zinc-400 sm:text-sm">%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="tab1-y-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Of value (Y)
                  </label>
                  <input
                    type="number"
                    id="tab1-y-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={tab1Y === 0 ? "" : tab1Y}
                    onChange={(e) => setTab1Y(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* RESULT DISPLAY */}
              <div className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-center space-y-2">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Calculated Outturn</span>
                <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                  {formatNum(tab1Result)}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                  Formula: ({tab1X} ÷ 100) × {tab1Y} = {formatNum(tab1Result)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: X IS WHAT % OF Y */}
        {activeTab === 2 && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Calculate What Percentage X is of Y
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="tab2-x-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Value (X)
                  </label>
                  <input
                    type="number"
                    id="tab2-x-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={tab2X === 0 ? "" : tab2X}
                    onChange={(e) => setTab2X(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label htmlFor="tab2-y-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Is what percent of total (Y)
                  </label>
                  <input
                    type="number"
                    id="tab2-y-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={tab2Y === 0 ? "" : tab2Y}
                    onChange={(e) => setTab2Y(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* RESULT DISPLAY */}
              <div className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-center space-y-2">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Calculated Percentage Ratio</span>
                <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                  {formatNum(tab2Result)}%
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                  Formula: ({tab2X} ÷ {tab2Y}) × 100 = {formatNum(tab2Result)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PERCENTAGE INCREASE / DECREASE */}
        {activeTab === 3 && (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Calculate Percentage Change (Increase/Decrease)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="tab3-x-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Original Value (Old)
                  </label>
                  <input
                    type="number"
                    id="tab3-x-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={tab3X === 0 ? "" : tab3X}
                    onChange={(e) => setTab3X(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label htmlFor="tab3-y-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    New Value (Current)
                  </label>
                  <input
                    type="number"
                    id="tab3-y-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={tab3Y === 0 ? "" : tab3Y}
                    onChange={(e) => setTab3Y(Number(e.target.value))}
                  />
                </div>
              </div>

              {/* RESULT DISPLAY */}
              <div className="bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 flex flex-col justify-center space-y-2">
                <span className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Calculated Percentage Change</span>
                <p className={`text-4xl font-extrabold flex items-center space-x-2 ${tab3ResultObj.isIncrease ? "text-blue-600 dark:text-blue-400" : "text-amber-600 dark:text-amber-400"}`}>
                  <span>{tab3ResultObj.isIncrease ? "↑" : "↓"}</span>
                  <span>{formatNum(tab3ResultObj.percent)}%</span>
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                  {tab3ResultObj.isIncrease ? "This represents a net increase." : "This represents a net decrease."}
                  <br />
                  Formula: [({tab3Y} − {tab3X}) ÷ {tab3X}] × 100 = {tab3ResultObj.isIncrease ? "" : "-"}{formatNum(tab3ResultObj.percent)}%
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

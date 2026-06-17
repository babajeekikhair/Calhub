import React, { useState } from "react";
import { calculateDateDifference } from "../../utils/calculations";

export default function DateDiffWidget() {
  // Setup sensible initial values: Start = exactly 30 years ago today, End = today
  const today = new Date();
  const yearToday = today.getFullYear();
  const monthToday = String(today.getMonth() + 1).padStart(2, "0");
  const dayToday = String(today.getDate()).padStart(2, "0");

  const initialEndStr = `${yearToday}-${monthToday}-${dayToday}`;
  const initialStartStr = `${yearToday - 25}-${monthToday}-${dayToday}`;

  const [startDateStr, setStartDateStr] = useState<string>(initialStartStr);
  const [endDateStr, setEndDateStr] = useState<string>(initialEndStr);
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(false);

  const results = calculateDateDifference(startDateStr, endDateStr, includeEndDate);

  const handleReset = () => {
    setStartDateStr(initialStartStr);
    setEndDateStr(initialEndStr);
    setIncludeEndDate(false);
  };

  return (
    <div id="datediff-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT PANELS */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Select Calendar Dates
          </h3>

          <div className="space-y-4">
            {/* Start Date */}
            <div>
              <label htmlFor="start-date-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Start Date (or Birthdate)
              </label>
              <input
                type="date"
                id="start-date-input"
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="end-date-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                End Date (Defaults to Today)
              </label>
              <input
                type="date"
                id="end-date-input"
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                value={endDateStr}
                onChange={(e) => setEndDateStr(e.target.value)}
              />
            </div>

            {/* Include end date */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="include-end-date-input"
                className="h-4 w-4 rounded-sm border-zinc-300 dark:border-zinc-700 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                checked={includeEndDate}
                onChange={(e) => setIncludeEndDate(e.target.checked)}
              />
              <label htmlFor="include-end-date-input" className="ml-2 block text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
                Include end date in calculation (adds 1 extra day)
              </label>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                // Set start to today
                const dStr = `${yearToday}-${monthToday}-${dayToday}`;
                setStartDateStr(dStr);
              }}
              className="w-full text-center py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer"
            >
              Set Start Date to Today
            </button>
          </div>

          <button
            onClick={handleReset}
            className="w-full text-center py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 active:bg-zinc-100 transition-colors cursor-pointer"
          >
            Reset Form Fields
          </button>
        </div>

        {/* OUTPUT ANALYSIS BLOCK */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-zinc-50 dark:bg-zinc-900/40 p-6 md:p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
          
          {results ? (
            <div className="space-y-6">
              <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                CALCULATED ELAPSED TIME
              </h4>

              {/* NATURAL HUMAN DIFFERENCE */}
              <div className="space-y-2">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">In Calendar Units</p>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  {results.years > 0 && (
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white font-sans tracking-tight">{results.years}</span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{results.years === 1 ? "year" : "years"}</span>
                    </div>
                  )}

                  {(results.months > 0 || results.years > 0) && (
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white font-sans tracking-tight">{results.months}</span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{results.months === 1 ? "month" : "months"}</span>
                    </div>
                  )}

                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl md:text-5xl font-extrabold text-zinc-950 dark:text-white font-sans tracking-tight">{results.days}</span>
                    <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{results.days === 1 ? "day" : "days"}</span>
                  </div>
                </div>
              </div>

              {/* DOCKET CARD GRID FOR ALTERNATIVE METRICS */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                
                <div className="bg-white dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold">Total Days</span>
                  <p className="text-lg font-extrabold text-zinc-900 dark:text-white mt-1">
                    {results.totalDays.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold">Weeks & Days</span>
                  <p className="text-lg font-extrabold text-zinc-900 dark:text-white mt-1">
                    {results.weeks}w {results.remainingDays}d
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold">Business Days</span>
                  <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                    {results.businessDays.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold">Hours elapsed</span>
                  <p className="text-base font-bold text-zinc-800 dark:text-zinc-200 mt-1 font-mono">
                    {results.totalHours.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 col-span-2">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-semibold">Week Path Sequence</span>
                  <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mt-1">
                    Starts on <span className="text-emerald-600 dark:text-emerald-400">{results.dayOfWeekStart}</span>, ends on <span className="text-emerald-600 dark:text-emerald-400">{results.dayOfWeekEnd}</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-zinc-400 dark:text-zinc-500 py-12">
              Provide valid dates to review differences
            </div>
          )}

          {results && (
            <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-5 mt-5">
              <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>Start: {startDateStr}</span>
                <span>End: {endDateStr}</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

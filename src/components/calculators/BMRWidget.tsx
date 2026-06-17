import React, { useState } from "react";
import { calculateBMR } from "../../utils/calculations";

export default function BMRWidget() {
  const [isMetric, setIsMetric] = useState<boolean>(true);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(28);
  const [activity, setActivity] = useState<string>("moderate");

  // Metric
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);

  // Imperial
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);

  // Conversions for formula
  const finalWeightKg = isMetric ? weightKg : weightLbs * 0.45359237;
  const finalHeightCm = isMetric 
    ? heightCm 
    : ((heightFeet * 12) + heightInches) * 2.54;

  const results = calculateBMR(
    Math.max(1, finalWeightKg),
    Math.max(1, finalHeightCm),
    Math.max(1, age),
    gender,
    activity
  );

  const handleReset = () => {
    setGender("male");
    setAge(28);
    setActivity("moderate");
    if (isMetric) {
      setWeightKg(75);
      setHeightCm(178);
    } else {
      setWeightLbs(165);
      setHeightFeet(5);
      setHeightInches(10);
    }
  };

  return (
    <div id="bmr-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      
      {/* Unit toggles */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setIsMetric(true)}
          className={`flex-1 text-center py-4 text-sm font-medium border-b-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/45 transition-all ${
            isMetric 
              ? "border-blue-600 text-blue-600 dark:text-blue-400" 
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Metric System (kg / cm)
        </button>
        <button
          onClick={() => setIsMetric(false)}
          className={`flex-1 text-center py-4 text-sm font-medium border-b-2 hover:bg-zinc-50 dark:hover:bg-zinc-805/45 transition-all ${
            !isMetric 
              ? "border-blue-600 text-blue-600 dark:text-blue-400" 
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Imperial System (lbs / ft-in)
        </button>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUTS PANEL */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Configure Metabolic Factors
          </h3>

          <div className="space-y-4">
            {/* Gender Switch */}
            <div>
              <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Gender</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className={`py-2 px-4 rounded-lg font-semibold text-sm border text-center transition-all cursor-pointer ${
                    gender === "male"
                      ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400"
                      : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 dark:bg-zinc-850 dark:border-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className={`py-2 px-4 rounded-lg font-semibold text-sm border text-center transition-all cursor-pointer ${
                    gender === "female"
                      ? "bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-400"
                      : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 dark:bg-zinc-850 dark:border-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            {/* Age factor */}
            <div>
              <label htmlFor="age-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                id="age-input"
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                value={age || ""}
                onChange={(e) => setAge(Math.max(1, Number(e.target.value)))}
              />
            </div>

            {/* Physical parameters */}
            {isMetric ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight-kg-bmr-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight-kg-bmr-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={weightKg || ""}
                    onChange={(e) => setWeightKg(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label htmlFor="height-cm-bmr-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height-cm-bmr-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={heightCm || ""}
                    onChange={(e) => setHeightCm(Math.max(0, Number(e.target.value)))}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="weight-lbs-bmr-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    id="weight-lbs-bmr-input"
                    className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                    value={weightLbs || ""}
                    onChange={(e) => setWeightLbs(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Height
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        id="height-feet-bmr-input"
                        aria-label="Height feet"
                        className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white pr-10 focus:outline-hidden sm:text-sm"
                        value={heightFeet || ""}
                        onChange={(e) => setHeightFeet(Math.max(0, Number(e.target.value)))}
                      />
                      <span className="absolute right-3 top-3 text-zinc-400 text-xs font-semibold">ft</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        id="height-inches-bmr-input"
                        aria-label="Height inches"
                        className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white pr-10 focus:outline-hidden sm:text-sm"
                        value={heightInches || ""}
                        onChange={(e) => setHeightInches(Math.min(11, Math.max(0, Number(e.target.value))))}
                      />
                      <span className="absolute right-3 top-3 text-zinc-400 text-xs font-semibold">in</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity parameters dropdown */}
            <div>
              <label htmlFor="activity-selector" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Exercise & Physical Activity Level
              </label>
              <select
                id="activity-selector"
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden sm:text-sm"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="sedentary">Sedentary (Little or no exercise)</option>
                <option value="light">Lightly Active (Exercise 1-3 days/week)</option>
                <option value="moderate">Moderately Active (Exercise 3-5 days/week)</option>
                <option value="active">Very Active (Exercise 6-7 days/week)</option>
                <option value="veryActive">Extra Active (Hard labor or extreme training)</option>
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

        {/* OUTPUT PANEL ANALYSIS */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-slate-50 dark:bg-zinc-900/40 p-6 md:p-8 rounded-xl border border-slate-200">
          
          <div className="space-y-6">
            <h4 className="text-sm font-semibold tracking-wider text-slate-500 dark:text-zinc-400 uppercase font-sans">
              DAILY CALORIC ANALYSIS
            </h4>

            {/* HUGE CALORIE TARGET DISPLAY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white dark:bg-zinc-905 p-6 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-550 dark:text-zinc-500 font-bold uppercase tracking-wider">DAILY TDEE CALORIES</span>
                <p className="text-4xl font-black text-blue-600 dark:text-blue-400 tracking-tight font-sans">
                  {results.tdee.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">To maintain current baseline weight</p>
              </div>

              <div className="space-y-1 sm:border-l sm:border-slate-150 sm:pl-6 dark:border-zinc-800">
                <span className="text-[10px] text-slate-550 dark:text-zinc-500 font-bold uppercase tracking-wider">BASAL METABOLIC RATE</span>
                <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight font-sans mt-1">
                  {results.bmr.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500">Burnt staying in absolute resting rate</p>
              </div>
            </div>

            {/* GOAL-SPECIFIC PATHWAYS */}
            <div className="space-y-3">
              <span className="block text-xs font-bold text-slate-550 dark:text-zinc-400 uppercase tracking-wider">
                Recommended Daily Calorie Budgets
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="p-3 bg-blue-50/40 dark:bg-blue-950/10 rounded-lg border border-blue-100 dark:border-blue-900/30 text-left">
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block">Mild Deficit</span>
                  <p className="text-lg font-bold text-zinc-850 dark:text-zinc-200 mt-1">
                    {results.loseWeightCal.toLocaleString()} <span className="text-xs font-normal text-zinc-500">cal/d</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Healthy fat loss pathway</p>
                </div>

                <div className="p-3 bg-indigo-50/40 dark:bg-indigo-950/10 rounded-lg border border-indigo-100 dark:border-indigo-900/30 text-left">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider block">Maintenance</span>
                  <p className="text-lg font-bold text-zinc-850 dark:text-zinc-200 mt-1">
                    {results.tdee.toLocaleString()} <span className="text-xs font-normal text-zinc-500">cal/d</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Hold exact current weight</p>
                </div>

                <div className="p-3 bg-violet-50/40 dark:bg-violet-950/10 rounded-lg border border-violet-100 dark:border-violet-900/30 text-left">
                  <span className="text-[10px] font-bold text-violet-500 uppercase tracking-wider block">Mild Surplus</span>
                  <p className="text-lg font-bold text-zinc-850 dark:text-zinc-200 mt-1">
                    {results.gainWeightCal.toLocaleString()} <span className="text-xs font-normal text-zinc-500">cal/d</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">Build muscular lean density</p>
                </div>

              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-5 mt-5">
            <div className="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400">
              <span>Metabolism Formula: Mifflin-St Jeor</span>
              <span>Physical parameters: {age}yo Gender {gender}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

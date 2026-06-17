import React, { useState } from "react";
import { calculateBMI } from "../../utils/calculations";

export default function BMIWidget() {
  const [isMetric, setIsMetric] = useState<boolean>(true);
  
  // Metric States
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);

  // Imperial States
  const [weightLbs, setWeightLbs] = useState<number>(150);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);

  // Derive active inputs
  const finalWeight = isMetric ? weightKg : weightLbs;
  const finalHeight = isMetric 
    ? heightCm 
    : (heightFeet * 12) + heightInches;

  const results = calculateBMI(finalWeight, finalHeight, isMetric);

  const handleReset = () => {
    if (isMetric) {
      setWeightKg(70);
      setHeightCm(175);
    } else {
      setWeightLbs(150);
      setHeightFeet(5);
      setHeightInches(9);
    }
  };

  // Compute gauge position percentage (BMI ranges 15 to 35 for scaling)
  const minBmi = 15;
  const maxBmi = 35;
  const gaugePercent = Math.min(100, Math.max(0, ((results.bmi - minBmi) / (maxBmi - minBmi)) * 100));

  // Category advice cards
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case "Underweight":
        return {
          bg: "bg-blue-50 dark:bg-blue-950/20",
          border: "border-blue-200 dark:border-blue-900",
          text: "text-blue-700 dark:text-blue-400",
          desc: "You have a lower body mass ratio. It is recommended to check with a nutritionist to design a progressive, nutrient-dense diet to build a healthy mass level safely.",
        };
      case "Normal Weight":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-950/20",
          border: "border-emerald-200 dark:border-emerald-900",
          text: "text-emerald-700 dark:text-emerald-400",
          desc: "Excellent! You are maintaining a healthy body weight balance with clean muscular and skeletal proportions. Keep up the physical activities and solid nutritional habits.",
        };
      case "Overweight":
        return {
          bg: "bg-amber-50 dark:bg-amber-950/20",
          border: "border-amber-200 dark:border-amber-900",
          text: "text-amber-700 dark:text-amber-400",
          desc: "Your ratio is slightly above weight-to-height benchmarks. Regular cardiovascular conditioning combined with balanced food portions can assist in sliding back into optimal ranges easily.",
        };
      default: // Obese
        return {
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-200 dark:border-red-900",
          text: "text-red-700 dark:text-red-400",
          desc: "Your body mass index represents significantly elevated density, which is linked to cardiovascular hazards. Consult a general physician to outline a safe fitness and health journey.",
        };
    }
  };

  const advice = getCategoryTheme(results.category);

  return (
    <div id="bmi-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      
      {/* Metric/Imperial Selector */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setIsMetric(true)}
          className={`flex-1 text-center py-4 text-sm font-medium border-b-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all ${
            isMetric 
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" 
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Metric System (kg / cm)
        </button>
        <button
          onClick={() => setIsMetric(false)}
          className={`flex-1 text-center py-4 text-sm font-medium border-b-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all ${
            !isMetric 
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400" 
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          Imperial System (lbs / ft-in)
        </button>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUTS PANEL */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
            Input Your Dimensions
          </h3>

          <div className="space-y-5">
            {isMetric ? (
              // METRIC INPUTS
              <>
                <div>
                  <label htmlFor="weight-kg-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Weight (Kilograms)
                  </label>
                  <div className="relative rounded-md shadow-xs">
                    <input
                      type="number"
                      id="weight-kg-input"
                      className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm pr-12"
                      value={weightKg || ""}
                      onChange={(e) => setWeightKg(Math.max(0, Number(e.target.value)))}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-zinc-400 sm:text-sm">kg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="height-cm-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Height (Centimeters)
                  </label>
                  <div className="relative rounded-md shadow-xs">
                    <input
                      type="number"
                      id="height-cm-input"
                      className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm pr-12"
                      value={heightCm || ""}
                      onChange={(e) => setHeightCm(Math.max(0, Number(e.target.value)))}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-zinc-400 sm:text-sm">cm</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // IMPERIAL INPUTS
              <>
                <div>
                  <label htmlFor="weight-lbs-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Weight (Pounds)
                  </label>
                  <div className="relative rounded-md shadow-xs">
                    <input
                      type="number"
                      id="weight-lbs-input"
                      className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm pr-12"
                      value={weightLbs || ""}
                      onChange={(e) => setWeightLbs(Math.max(0, Number(e.target.value)))}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-zinc-400 sm:text-sm">lbs</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Your Height
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative rounded-md shadow-xs">
                      <input
                        type="number"
                        id="height-feet-input"
                        aria-label="Height in feet"
                        className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm pr-12"
                        value={heightFeet || ""}
                        onChange={(e) => setHeightFeet(Math.max(0, Number(e.target.value)))}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-zinc-400 sm:text-sm">ft</span>
                      </div>
                    </div>

                    <div className="relative rounded-md shadow-xs">
                      <input
                        type="number"
                        id="height-inches-input"
                        aria-label="Height in inches"
                        className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm pr-12"
                        value={heightInches || ""}
                        onChange={(e) => setHeightInches(Math.min(11, Math.max(0, Number(e.target.value))))}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-zinc-400 sm:text-sm">in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleReset}
            className="w-full text-center py-2 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 active:bg-zinc-100 transition-colors cursor-pointer"
          >
            Reset Form Fields
          </button>
        </div>

        {/* OUTPUT ANALYSIS GAUGE AND PANEL */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-zinc-50 dark:bg-zinc-900/40 p-6 md:p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
          
          <div className="space-y-6">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              YOUR FITNESS MASS STATUS
            </h4>

            {/* BIG BMI VALUE */}
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">BODY MASS INDEX</p>
                <p className="text-5xl font-extrabold text-zinc-950 dark:text-white mt-1">{results.bmi || "0.0"}</p>
              </div>

              <div className={`px-4 py-2 rounded-lg border text-sm font-bold shadow-xs ${advice.bg} ${advice.border} ${advice.text}`}>
                {results.category}
              </div>
            </div>

            {/* WHO SCALE INDICATOR BAR */}
            <div className="space-y-2 pt-2">
              <div className="relative w-full h-3 rounded-full flex overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <div style={{ width: "17.5%" }} className="h-full bg-blue-400" title="Underweight (<18.5)" />
                <div style={{ width: "32.5%" }} className="h-full bg-emerald-500" title="Normal (18.5 - 24.9)" />
                <div style={{ width: "25%" }} className="h-full bg-amber-400" title="Overweight (25 - 29.9)" />
                <div style={{ width: "25%" }} className="h-full bg-red-500" title="Obese (>=30)" />
              </div>

              {/* Slider cursor aligned with the index percentage */}
              <div className="relative w-full h-4">
                <div 
                  style={{ left: `${gaugePercent}%` }} 
                  className="absolute w-4 h-4 bg-zinc-950 dark:bg-white rounded-full border border-white dark:border-zinc-900 -translate-x-1/2 -top-2 flex items-center justify-center shadow-md transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* WHO text markers */}
              <div className="grid grid-cols-4 text-[10px] text-zinc-400 dark:text-zinc-500">
                <div className="text-left font-sans">Underweight</div>
                <div className="text-center font-sans col-span-2 flex justify-around">
                  <span className="text-emerald-500 font-bold">Healthy (18.5 - 25)</span>
                  <span>Overweight (25)</span>
                </div>
                <div className="text-right font-sans">Obese (30+)</div>
              </div>
            </div>

            {/* ADVICE CHIP */}
            <div className={`p-4 rounded-xl border text-sm leading-relaxed ${advice.bg} ${advice.border} text-zinc-700 dark:text-zinc-300`}>
              {advice.desc}
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-5 mt-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Optimal Weight Range</p>
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                  {results.idealWeightMin} - {results.idealWeightMax} {isMetric ? "kg" : "lbs"}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Height Parameter</p>
                <p className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                  {isMetric ? `${heightCm} cm` : `${heightFeet} ft ${heightInches} in`}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

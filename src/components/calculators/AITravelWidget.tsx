import React, { useState } from "react";
import { Sparkles, MapPin, Calendar, Compass, DollarSign, Clock, Check, HelpCircle, AlertCircle } from "lucide-react";
import { generateAIContent } from "../../utils/gemini";

interface TimelineEvent {
  time: string;
  title: string;
  desc: string;
  estCost: string;
}

interface ItineraryDay {
  dayNum: number;
  theme: string;
  events: TimelineEvent[];
  tip: string;
}

interface TravelReportData {
  destination: string;
  duration: string;
  budgetScale: string;
  style: string;
  executiveSummary: string;
  days: ItineraryDay[];
  estimatedTotalCost: string;
}

const DESTINATION_PRESETS = [
  { name: "Tokyo, Japan", style: "Foodie & Culture", budget: "Mid-range", duration: "5" },
  { name: "Paris, France", style: "Romantic & History", budget: "Luxury", duration: "3" },
  { name: "Bali, Indonesia", style: "Adventure & Relaxation", budget: "Backpacker", duration: "7" },
  { name: "Rome, Italy", style: "Cultural Explorer", budget: "Mid-range", duration: "4" },
];

export default function AITravelWidget() {
  const [destinationInput, setDestinationInput] = useState("");
  const [daysCount, setDaysCount] = useState("3");
  const [styleSelection, setStyleSelection] = useState("Cultural Explorer");
  const [budgetScale, setBudgetScale] = useState("Mid-range");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [planData, setPlanData] = useState<TravelReportData | null>(null);

  const handleApplyPreset = (preset: typeof DESTINATION_PRESETS[number]) => {
    setDestinationInput(preset.name);
    setStyleSelection(preset.style);
    setBudgetScale(preset.budget);
    setDaysCount(preset.duration);
  };

  const handleGenerate = async () => {
    const dest = destinationInput.trim();
    if (!dest) {
      setError("Please specify a target destination.");
      return;
    }

    setLoading(true);
    setError("");
    setPlanData(null);

    try {
      const systemInstruction = 
        "You are CalcHub's AI Tour Planner, an elite global travel designer and concierge. " +
        "You always deliver structured, pristine JSON travel itineraries. Your JSON response must strictly match the specified structural type and contain no conversational padding.";

      const prompt = `Destination: "${dest}"
Duration: ${daysCount} Days
Travel Style: "${styleSelection}"
Budget Level: "${budgetScale}"

Generate a complete daily itinerary travel suite. You must return a single valid JSON object following this exact structure (with no surrounding text or wraps outside the JSON object itself):
{
  "destination": "${dest}",
  "duration": "${daysCount} Days",
  "budgetScale": "${budgetScale}",
  "style": "${styleSelection}",
  "executiveSummary": "Provide an engaging, beautiful overview (2-3 sentences) characterizing the vibe and seasonal conditions of this personalized stay.",
  "days": [
    {
      "dayNum": 1,
      "theme": "Provide a descriptive daily theme name",
      "events": [
        { "time": "Morning (09:00 - 12:00)", "title": "Place to visit / Event", "desc": "Brief 1-sentence descriptive guide.", "estCost": "$20" },
        { "time": "Afternoon (13:00 - 17:00)", "title": "Place to visit / Event", "desc": "Brief 1-sentence descriptive guide.", "estCost": "$15" },
        { "time": "Evening (18:00 - 22:00)", "title": "Place to visit / Event", "desc": "Brief 1-sentence descriptive guide.", "estCost": "$45" }
      ],
      "tip": "Insider local tip for Day 1."
    }
  ],
  "estimatedTotalCost": "Estimated total baseline budget in USD, e.g., $150-$200"
}

Ensure the number of objects in the "days" array matches the duration (${daysCount} days). Only output valid JSON content. Do not write markdown blocks like \`\`\`json.`;

      const responseText = await generateAIContent(prompt, systemInstruction);
      
      // Clean up response if model wraps with markdown block
      let cleanText = responseText.trim();
      if (cleanText.startsWith("```json")) {
        cleanText = cleanText.substring(7);
      }
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.substring(3);
      }
      if (cleanText.endsWith("```")) {
        cleanText = cleanText.substring(0, cleanText.length - 3);
      }
      cleanText = cleanText.trim();

      const parsed: TravelReportData = JSON.parse(cleanText);
      setPlanData(parsed);
    } catch (err: any) {
      console.error(err);
      setError("Failed to compile the custom travel itinerary. Please verify that your destination is spelled correctly and that the GEMINI_API_KEY secret is enabled.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8" id="ai-travel-app">
      {/* Informational Hero Description Banner */}
      <div className="bg-amber-50/50 dark:bg-amber-950/10 border-l-4 border-amber-500 p-4 rounded-r-xl">
        <div className="flex space-x-3">
          <Compass className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-sans">
            <strong>CalcHub AI Tour Concierge:</strong> Instant routing heuristical optimizer. Define destinations, style bounds, and length of days to outline daily meal choices, sightseeing stops, local tips, and accurate cost curves.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left">
          {/* Destination */}
          <div className="md:col-span-6 space-y-2">
            <label htmlFor="travel-dest" className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Where do you want to explore?</span>
            </label>
            <input
              id="travel-dest"
              type="text"
              value={destinationInput}
              onChange={(e) => setDestinationInput(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3 text-xs md:text-sm text-slate-800 dark:text-zinc-200 focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all duration-200 font-sans"
              placeholder="e.g. Kyoto Japan, Reykjavik Iceland, Lisbon Portugal..."
            />
          </div>

          {/* Days Count */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="travel-days" className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Days</span>
            </label>
            <select
              id="travel-days"
              value={daysCount}
              onChange={(e) => setDaysCount(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3 text-xs md:text-sm text-slate-800 dark:text-zinc-200 focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all duration-205 cursor-pointer font-sans"
            >
              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
              <option value="4">4 Days</option>
              <option value="5">5 Days</option>
              <option value="7">7 Days</option>
            </select>
          </div>

          {/* Trip style and Budget */}
          <div className="md:col-span-4 space-y-2">
            <label htmlFor="travel-style" className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-slate-400" />
              <span>Travel Style</span>
            </label>
            <select
              id="travel-style"
              value={styleSelection}
              onChange={(e) => setStyleSelection(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3 text-xs md:text-sm text-slate-800 dark:text-zinc-200 focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all duration-205 cursor-pointer font-sans"
            >
              <option value="Cultural Explorer">Museums, History & Sights</option>
              <option value="Foodie Culinary">Local Food, Cafes & Nightlife</option>
              <option value="Adventure Nature">Hiking, Parks & Outdoor Thrills</option>
              <option value="Laid-back Chill">Beaches, Wellness & Spas</option>
              <option value="Balanced Highlights">General Highlights Package</option>
            </select>
          </div>

          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            {/* Budget options */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
                Budget Allocation Scale
              </span>
              <div className="flex bg-slate-50 dark:bg-zinc-950 p-1 rounded-xl border border-slate-150 dark:border-zinc-850">
                {["Backpacker", "Mid-range", "Luxury"].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setBudgetScale(scale)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      budgetScale === scale
                        ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs"
                        : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

            {/* Form control generation button */}
            <div className="pt-6 md:pt-4">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold py-3.5 px-4 rounded-xl text-xs md:text-sm cursor-pointer transition-all flex items-center justify-center space-x-2 shadow-xs hover:shadow-md active:scale-98"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4.5 w-4.5 border-2 border-white border-t-transparent" />
                    <span>Mapping Day Sequences...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4.5 h-4.5 animate-pulse" />
                    <span>Compile Itinerary Blueprint</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Suggestion Shortcuts */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500">Pick a preset stay:</span>
          {DESTINATION_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleApplyPreset(preset)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/85 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full text-slate-705 dark:text-zinc-295 transition-colors font-medium cursor-pointer"
            >
              📍 {preset.name} ({preset.duration} Days)
            </button>
          ))}
        </div>

        {/* Error reporting states */}
        {error && (
          <p className="text-xs text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30 text-left">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* RENDER PLAN BLUEPRINT REPORT once compiled */}
      {planData && (
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-8 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-150 dark:border-zinc-805 pb-5">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 text-[10px] font-bold font-mono tracking-wider uppercase px-2 py-0.5 rounded-md">
                  Active Stay Guide
                </span>
                <span className="text-xs font-bold font-mono text-slate-400 uppercase">
                  {planData.duration} / {planData.style}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize mt-1.5">
                🗺️ Stay Route: <span className="text-amber-500">{planData.destination}</span>
              </h3>
            </div>

            {/* Cost totals overview */}
            <div className="p-3.5 bg-amber-500/5 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/10 rounded-xl flex items-center space-x-3 text-xs">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                <DollarSign className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-slate-450 dark:text-zinc-400 block font-sans font-medium text-[10px] uppercase">
                  ESTIMATED BASE BUDGET
                </span>
                <span className="text-slate-900 dark:text-white font-extrabold text-sm md:text-base font-mono">
                  {planData.estimatedTotalCost}
                </span>
              </div>
            </div>
          </div>

          {/* Executive Summary paragraph intro */}
          <p className="text-xs md:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-sans italic border-l-4 border-amber-500 pl-4 py-1">
            "{planData.executiveSummary}"
          </p>

          {/* Daily Schedule Breakdown */}
          <div className="space-y-8 pt-4 border-t border-slate-50 dark:border-zinc-850">
            {planData.days.map((dayItem) => (
              <div key={dayItem.dayNum} className="space-y-4">
                <div className="flex items-center space-x-3 bg-slate-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-slate-150 dark:border-zinc-850/60">
                  <span className="bg-amber-500 text-white font-bold text-xs px-2.5 py-1 rounded-md font-mono">
                    DAY {dayItem.dayNum}
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    — {dayItem.theme}
                  </span>
                </div>

                {/* Day events timeline */}
                <div className="relative border-l-2 border-slate-100 dark:border-zinc-800 ml-5.5 pl-6 space-y-6">
                  {dayItem.events.map((event, evIdx) => (
                    <div key={evIdx} className="relative">
                      {/* Timeline clock bullet icon */}
                      <div className="absolute -left-9 top-0.5 bg-white dark:bg-zinc-900 text-slate-400 rounded-full p-0.5 border border-slate-200 dark:border-zinc-805">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                        <div className="md:col-span-3">
                          <span className="font-bold text-slate-900 dark:text-white tracking-tight">
                            {event.time}
                          </span>
                        </div>
                        <div className="md:col-span-7 space-y-1">
                          <h4 className="font-bold text-slate-800 dark:text-zinc-200">
                            {event.title}
                          </h4>
                          <p className="text-slate-500 dark:text-zinc-400 leading-relaxed font-sans">
                            {event.desc}
                          </p>
                        </div>
                        <div className="md:col-span-2 text-right">
                          <span className="font-medium font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded-md border border-emerald-100/10">
                            Est: {event.estCost}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Local tip wrapper */}
                <div className="ml-5.5 p-3.5 bg-amber-500/5 dark:bg-amber-950/10 border border-amber-550/10 rounded-xl text-xs flex items-start space-x-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-slate-650 dark:text-zinc-350 leading-relaxed font-sans">
                    <strong className="text-amber-700 dark:text-amber-400 text-[10px] uppercase font-mono tracking-wider font-extrabold pr-1">Day {dayItem.dayNum} Insider Tip:</strong>
                    {dayItem.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick legal checklist warning for safety */}
          <div className="p-4 bg-slate-50 dark:bg-zinc-950 border border-slate-150 dark:border-zinc-850 rounded-xl text-xs flex items-start space-x-3 mt-6">
            <AlertCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <p className="text-slate-450 dark:text-zinc-500 font-sans leading-relaxed text-[10.5px]">
              <strong>Disclaimer & Planning Advice:</strong> CalcHub travel cost and route planning coordinates are generated via predictive contextual models based on historical local averages. Actual airfares, food prices, and sightseeing entries can vary on seasonality and specific exchange fluctuations. Verify physical sights schedules beforehand.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

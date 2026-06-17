import React, { useState } from "react";
import { Sparkles, Copy, Check, RotateCcw, ArrowRight, BookOpen } from "lucide-react";
import { generateAIContent } from "../../utils/gemini";

const TONES = [
  { id: "professional", name: "Professional & Academic", desc: "Clear, authoritative, and sophisticated text suited for work and reports.", prompt: "Rewrite the text to be highly professional, polished, executive-level, and sophisticated, maintaining extreme clarity and removing slang." },
  { id: "casual", name: "Warm & Friendly", desc: "Approachable, warm, and highly engaging everyday communication.", prompt: "Rewrite the text to be warm, friendly, casual, and conversational, while still maintaining correct grammar and structure." },
  { id: "persuasive", name: "Persuasive & Engaging", desc: "Compelling rhetoric to inspire action or build interest.", prompt: "Rewrite the text to be highly persuasive, compelling, and engaging. Emphasize value propositions and write with an active, lively voice." },
  { id: "direct", name: "Crisp & Concise (TL;DR)", desc: "Shortened, direct, and zero-fluff summary paragraphs.", prompt: "Rewrite the text to be extremely crisp, concise, direct, and bullet-focused. Cut out any excess filler words and deliver the core message directly." },
  { id: "developer", name: "Technical Explainer", desc: "Precise, structured, and logical documentation styling.", prompt: "Rewrite the text to read like professional technical documentation or a logical technical explainer. Use precise vocabulary and clear structured sections." },
];

export default function AIWriterWidget() {
  const [inputText, setInputText] = useState("");
  const [selectedTone, setSelectedTone] = useState("professional");
  const [customInstructions, setCustomInstructions] = useState("");
  const [outputResult, setOutputResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Statistics tracker based on inputs
  const wordCountIn = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const charCountIn = inputText.length;
  const wordCountOut = outputResult.trim() ? outputResult.trim().split(/\s+/).length : 0;
  const charCountOut = outputResult.length;

  const handleRewrite = async () => {
    if (!inputText.trim()) {
      setError("Please input some starting text for the AI to rewrite.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const toneConfig = TONES.find((t) => t.id === selectedTone);
      const instruction = toneConfig ? toneConfig.prompt : TONES[0].prompt;
      
      let fullPrompt = `${instruction}\n\n`;
      if (customInstructions.trim()) {
        fullPrompt += `Additional Custom Instructions to apply strictly:\n- ${customInstructions.trim()}\n\n`;
      }
      fullPrompt += `Original Text to Rewrite / Polish:\n"${inputText.trim()}"\n\n`;
      fullPrompt += `Return ONLY the polished, refined rewritten text output itself. Do not wrap with introductory phrases, conversational comments (like "Sure, here is your text"), or secondary quotes. Keep markdown formatting headers if necessary.`;

      const systemInstruction = "You are CalcHub's AI Smart Writer, an elite modern copyeditor and prose stylist. Your goal is to deliver exceptionally polished, grammatically pristine, and textually elegant output matching the user's selected tone perfectly.";
      
      const response = await generateAIContent(fullPrompt, systemInstruction);
      setOutputResult(response);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred while communicating with the AI. Please verify your internet connection and API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInputText("");
    setOutputResult("");
    setCustomInstructions("");
    setError("");
  };

  return (
    <div className="space-y-8" id="ai-writer-app">
      {/* Dynamic Intro Summary Banner */}
      <div className="bg-amber-50/50 dark:bg-amber-950/10 border-l-4 border-amber-500 p-4 rounded-r-xl">
        <div className="flex space-x-3">
          <Sparkles className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-sans">
            <strong>CalcHub AI Integration:</strong> This suite operates securely client-to-server. Every rewrite requests pristine, real-time context-aware translations via high-speed models, allowing you to instantly align drafts back to perfect metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Input and Settings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <label htmlFor="input-draft" className="text-sm font-bold text-slate-900 dark:text-zinc-100 flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>Paste Your Original Draft / Notes</span>
              </label>
              <div className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 uppercase">
                {wordCountIn} words / {charCountIn} chars
              </div>
            </div>

            <textarea
              id="input-draft"
              className="w-full h-44 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-4 text-xs md:text-sm text-slate-800 dark:text-zinc-200 focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden transition-all duration-200 resize-none font-sans"
              placeholder="Type or paste any draft, email, essay, or raw notes of any length here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            {/* Target Style Presets Selection */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 block">
                Select Your Transformation Goal (AI Presets)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {TONES.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`text-left p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      selectedTone === tone.id
                        ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-500/80 ring-2 ring-amber-500/10 text-amber-900 dark:text-amber-300"
                        : "bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-850 hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-slate-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{tone.name}</span>
                      {selectedTone === tone.id && <span className="text-[10px] text-amber-500 font-mono">● ACTIVE</span>}
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-400 mt-1 leading-normal font-sans">
                      {tone.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Instructions */}
            <div className="space-y-2">
              <label htmlFor="custom-instructions" className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center space-x-1.5">
                <span>⚡ Optional: Specific Custom Guidance</span>
                <span className="text-[10px] text-slate-400 font-normal italic font-sans">(e.g., "make it shorter", "output in bullet points")</span>
              </label>
              <input
                id="custom-instructions"
                type="text"
                className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3 text-xs text-slate-800 dark:text-zinc-200 focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden transition-all duration-200 font-sans"
                placeholder="e.g. Include professional transitions, keep sentence lengths moderate, remove hyperbole..."
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
              />
            </div>

            {/* Error messaging state */}
            {error && (
              <p className="text-xs text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                ⚠️ {error}
              </p>
            )}

            {/* Action Triggers */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleRewrite}
                disabled={loading}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-xl text-xs md:text-sm cursor-pointer transition-all flex items-center justify-center space-x-2 shadow-xs border border-amber-600/30 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-md active:scale-98"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    <span>Processing Smart Edit...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Rewrite & Optimize Draft</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                title="Clear and reset forms"
                className="p-3 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Live Output Reflection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col h-full min-h-[400px] justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-800 pb-3">
                <span className="text-xs font-bold font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  ⚡ Smart Refinement Output
                </span>
                
                {outputResult && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer bg-slate-50 dark:bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-slate-150 dark:border-zinc-800"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy prose</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Loader placeholder or actual display output */}
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent shadow-xs" />
                  <div className="text-center space-y-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-zinc-100 font-sans">
                      Analyzing contextual depth...
                    </p>
                    <p className="text-[10px] text-slate-400 font-sans">
                      Adapting grammar templates securely using Gemini
                    </p>
                  </div>
                </div>
              ) : outputResult ? (
                <div className="space-y-4">
                  <div className="prose prose-slate dark:prose-invert max-w-none text-xs md:text-sm text-slate-800 dark:text-zinc-200 leading-relaxed font-sans whitespace-pre-line bg-amber-50/5 dark:bg-amber-950/2 p-4 rounded-xl border border-amber-100/10 shadow-inner">
                    {outputResult}
                  </div>

                  {/* Comparisons stats */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] border-t border-slate-100 dark:border-zinc-805 font-sans font-medium">
                    <div className="p-2.5 bg-slate-50 dark:bg-zinc-950 rounded-lg">
                      <span className="text-slate-400 block">Original Length:</span>
                      <span className="text-slate-700 dark:text-zinc-350 font-bold">{wordCountIn} words</span>
                    </div>
                    <div className="p-2.5 bg-amber-500/5 dark:bg-amber-950/10 rounded-lg border border-amber-100/5">
                      <span className="text-amber-600 dark:text-amber-400 block">Refined Length:</span>
                      <span className="text-amber-900 dark:text-amber-300 font-bold">{wordCountOut} words</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 dark:text-zinc-500 font-sans space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-zinc-950 flex items-center justify-center mx-auto border border-slate-150 dark:border-zinc-800">
                    <Sparkles className="w-5 h-5 text-slate-300" />
                  </div>
                  <p className="text-xs font-semibold leading-relaxed max-w-xs mx-auto">
                    Your polished output will reflect instantly here once you optimize. No backend database logs configured.
                  </p>
                </div>
              )}
            </div>

            {/* Micro branding tagline */}
            <div className="text-[10px] text-slate-400 dark:text-zinc-500 text-center font-mono font-semibold pt-4 border-t border-slate-100 dark:border-zinc-850 mt-4 select-none">
              CALCHUB AI SMARTER PROSE ENGINE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

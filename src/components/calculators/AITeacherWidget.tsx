import React, { useState } from "react";
import { Sparkles, Brain, Check, X, Award, ListTodo, GraduationCap, ChevronRight, RefreshCw } from "lucide-react";
import { generateAIContent } from "../../utils/gemini";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface StudyPlanDay {
  day: string;
  focus: string;
  tasks: string[];
}

interface StudyGuideData {
  topic: string;
  summary: string;
  takeaways: string[];
  schedule: StudyPlanDay[];
  quiz: QuizQuestion[];
}

const TOPIC_PRESETS = [
  { id: "quantum", name: "Quantum Physics", desc: "Superposition and entanglement concept blocks" },
  { id: "promises", name: "JS Promises & Async", desc: "Microtasks, event loops, and asynchronous states" },
  { id: "photosynthesis", name: "Photosynthesis Cycles", desc: "Light-dependent reactions vs Calvin cycles" },
  { id: "compilers", name: "How Compilers Work", desc: "Lexing, parsing, ASTs, and machine compilation" },
];

export default function AITeacherWidget() {
  const [topicInput, setTopicInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [guideData, setGuideData] = useState<StudyGuideData | null>(null);
  
  // Quiz states
  const [activeTab, setActiveTab] = useState<"summary" | "schedule" | "quiz">("summary");
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [key: number]: boolean }>({});

  const handleSuggest = (topic: string) => {
    setTopicInput(topic);
  };

  const handleGenerate = async () => {
    const topic = topicInput.trim();
    if (!topic) {
      setError("Please specify a topic or choose one of the quick suggestions.");
      return;
    }

    setLoading(true);
    setError("");
    setGuideData(null);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setActiveTab("summary");

    try {
      const systemInstruction = 
        "You are CalcHub's AI Study Mentor, an elite educator and educational designer. " +
        "You always deliver structured, pristine JSON learning data. Your JSON response must strictly match the specified structural type and have no surrounding chat filler.";

      const prompt = `Topic to teach: "${topic}"

Generate a complete study portfolio for this topic. You must return a single valid JSON object following this exact structure (with no surrounding formatting outside the JSON code):
{
  "topic": "${topic}",
  "summary": "Provide a clear, engaging, elegant executive explainer paragraph (3-4 sentences) that breaks down the core concepts visually.",
  "takeaways": [
    "Core takeaway 1: detailed key learning concept.",
    "Core takeaway 2: detailed key learning concept.",
    "Core takeaway 3: detailed key learning concept."
  ],
  "schedule": [
    { "day": "Day 1", "focus": "Initial Core Theory Study", "tasks": ["Task 1", "Task 2"] },
    { "day": "Day 2", "focus": "Deep Concept Mapping", "tasks": ["Task 1", "Task 2"] },
    { "day": "Day 3", "focus": "Practical Recall Drills", "tasks": ["Task 1", "Task 2"] },
    { "day": "Day 4", "focus": "System Integrations", "tasks": ["Task 1", "Task 2"] },
    { "day": "Day 5", "focus": "Synthesized Mastery Review", "tasks": ["Task 1", "Task 2"] }
  ],
  "quiz": [
    {
      "question": "First tricky conceptual multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief explanation of why the correct option is true."
    },
    {
      "question": "Second tricky conceptual multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 1,
      "explanation": "Brief explanation of why the correct option is true."
    },
    {
      "question": "Third tricky conceptual multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 2,
      "explanation": "Brief explanation of why the correct option is true."
    }
  ]
}

Only output valid JSON content. Do not include markdown wraps like \`\`\`json or trailing notes.`;

      const responseText = await generateAIContent(prompt, systemInstruction);
      
      // Clean up responseText if model wraps with markdown block
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

      const parsed: StudyGuideData = JSON.parse(cleanText);
      setGuideData(parsed);
    } catch (err: any) {
      console.error(err);
      setError("Failed to construct the learning guide. Please make sure the input topic is descriptive and check that your GEMINI_API_KEY is configured.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qIdx: number, oIdx: number) => {
    if (submittedAnswers[qIdx]) return; // locked in
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = (qIdx: number) => {
    if (selectedAnswers[qIdx] === undefined) return;
    setSubmittedAnswers(prev => ({ ...prev, [qIdx]: true }));
  };

  return (
    <div className="space-y-8" id="ai-teacher-app">
      {/* Informational Hero Description Banner */}
      <div className="bg-amber-50/50 dark:bg-amber-950/10 border-l-4 border-amber-500 p-4 rounded-r-xl">
        <div className="flex space-x-3">
          <GraduationCap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed font-sans">
            <strong>CalcHub AI Educator:</strong> Instantly map any standard topic across science, code, history, and analytics. Inputs generate custom conceptual hierarchies, interactive self-assessments, and optimized spaced timelines.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="space-y-2">
          <label htmlFor="topic-selector" className="text-sm font-bold text-slate-900 dark:text-zinc-100 block">
            What science, technical theory, or programming library do you want to master?
          </label>
          <div className="flex gap-3">
            <input
              id="topic-selector"
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3.5 text-xs md:text-sm text-slate-800 dark:text-zinc-200 focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-amber-500/20 focus:outline-hidden transition-all duration-200"
              placeholder="e.g., Quantum Computing Basics, Javascript Event Loop, Rust Borrow Checker..."
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-xl text-xs md:text-sm cursor-pointer transition-all flex items-center justify-center space-x-2 shadow-xs hover:shadow-md active:scale-98"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4.5 w-4.5 border-2 border-white border-t-transparent" />
                  <span>Structuring Guide...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4.5 h-4.5" />
                  <span>Generate Master Study Pack</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic selector helper shortcuts */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-slate-400 dark:text-zinc-500">Popular study paths:</span>
          {TOPIC_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSuggest(preset.name)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/85 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full text-slate-700 dark:text-zinc-300 transition-colors font-medium cursor-pointer max-w-full text-ellipsis overflow-hidden whitespace-nowrap"
              title={preset.desc}
            >
              🚀 {preset.name}
            </button>
          ))}
        </div>

        {/* Error message logging */}
        {error && (
          <p className="text-xs text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* RENDER DYNAMIC DASHBOARD once study pack is successfully compiled */}
      {guideData && (
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-zinc-805 pb-4">
            <div>
              <span className="text-[10px] text-amber-500 uppercase tracking-widest font-mono font-bold block">
                COMPUTATIONAL AI MENTOR COMPACT
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white capitalize">
                🎓 Study Portfolio: <span className="text-amber-500">{guideData.topic}</span>
              </h3>
            </div>

            {/* Sub navigation tabs */}
            <div className="flex bg-slate-50 dark:bg-zinc-950 p-1 rounded-xl border border-slate-150 dark:border-zinc-850">
              <button
                onClick={() => setActiveTab("summary")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "summary"
                    ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                1. Concept Master
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "schedule"
                    ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                2. 5-Day Study Path
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "quiz"
                    ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                3. Interactive Review ({guideData.quiz.length} Qs)
              </button>
            </div>
          </div>

          {/* TAB 1 CONTENT: EXPINATORY COGNITIVE BREAKDOWN */}
          {activeTab === "summary" && (
            <div className="space-y-6">
              <div className="space-y-3 font-sans leading-relaxed text-xs md:text-sm text-slate-700 dark:text-zinc-300">
                <p className="text-base text-slate-800 dark:text-zinc-200 border-l-4 border-amber-500/80 pl-4 py-1 italic font-medium">
                  "{guideData.summary}"
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-50 dark:border-zinc-850">
                <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-amber-500 flex items-center space-x-2">
                  <span>⚡ Core Concept Takeaways</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {guideData.takeaways.map((takeaway, idx) => (
                    <div key={idx} className="bg-slate-50/50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-150 dark:border-zinc-850/60 flex items-start space-x-3">
                      <span className="bg-amber-100 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-705 dark:text-zinc-405 leading-relaxed font-sans font-medium">
                        {takeaway}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 CONTENT: SPACED REPETITION STUDY PATHWAY */}
          {activeTab === "schedule" && (
            <div className="space-y-6 leading-relaxed font-sans">
              <div className="flex items-center space-x-2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                <ListTodo className="w-4 h-4" />
                <span>SPACED REPETITION TIMELINE (5-DAY ACCELERATOR)</span>
              </div>

              <div className="relative border-l-2 border-slate-100 dark:border-zinc-800 ml-3.5 space-y-8 pl-5.5 py-2 text-left">
                {guideData.schedule.map((dayItem, idx) => (
                  <div key={idx} className="relative group">
                    {/* Anchor bullet */}
                    <div className="absolute -left-9 top-1 w-5.5 h-5.5 rounded-full bg-amber-500 text-white border-4 border-white dark:border-zinc-900 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </div>

                    <div className="space-y-1.5 pointer-events-none">
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xs font-extrabold text-amber-500 font-mono">
                          {dayItem.day}
                        </span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          — {dayItem.focus}
                        </span>
                      </div>
                      
                      {/* Sub tasks list */}
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs pt-1 text-slate-650 dark:text-zinc-450">
                        {dayItem.tasks.map((task, tIdx) => (
                          <li key={tIdx} className="flex items-center space-x-2">
                            <ChevronRight className="w-3.5 h-3.5 text-slate-350 shrink-0" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3 CONTENT: DYNAMIC CLICKABLE QUIZ MODULE */}
          {activeTab === "quiz" && (
            <div className="space-y-8 leading-relaxed font-sans">
              <div className="flex items-center space-x-2 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                <Award className="w-4 h-4" />
                <span>INTELLIGENT RETRIEVAL QUIZ STUDY ASSESSMENTS</span>
              </div>

              <div className="space-y-8 divide-y divide-slate-100 dark:divide-zinc-805">
                {guideData.quiz.map((qItem, qIdx) => {
                  const selectedIdx = selectedAnswers[qIdx];
                  const isSubmitted = submittedAnswers[qIdx];
                  const isCorrect = selectedIdx === qItem.correctIndex;

                  return (
                    <div key={qIdx} className={`pt-6 ${qIdx === 0 ? "pt-0" : ""} space-y-4 text-left`}>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 block uppercase font-bold">
                          Question {qIdx + 1} of {guideData.quiz.length}
                        </span>
                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                          {qItem.question}
                        </p>
                      </div>

                      {/* Clickable options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {qItem.options.map((opt, oIdx) => {
                          const isSelected = selectedIdx === oIdx;
                          const isOptionCorrect = oIdx === qItem.correctIndex;
                          
                          let optStyle = "bg-slate-50/50 dark:bg-zinc-950/50 border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800/50 text-slate-800 dark:text-zinc-300";
                          if (isSelected) {
                            optStyle = "bg-amber-100/40 dark:bg-amber-950/20 border-amber-500/80 text-amber-900 dark:text-amber-300";
                          }
                          
                          if (isSubmitted) {
                            if (isOptionCorrect) {
                              optStyle = "bg-green-100/40 dark:bg-green-950/20 border-green-500 text-green-900 dark:text-green-300 font-medium";
                            } else if (isSelected) {
                              optStyle = "bg-red-100/40 dark:bg-red-950/20 border-red-500 text-red-900 dark:text-red-300";
                            } else {
                              optStyle = "bg-slate-50/30 dark:bg-zinc-950/20 border-slate-100 dark:border-zinc-850 text-slate-400 dark:text-zinc-500 opacity-60";
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(qIdx, oIdx)}
                              disabled={isSubmitted}
                              className={`text-left p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              {isSelected && !isSubmitted && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
                              {isSubmitted && isOptionCorrect && <Check className="w-4 h-4 text-green-500 shrink-0" />}
                              {isSubmitted && isSelected && !isOptionCorrect && <X className="w-4 h-4 text-red-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Submit / Explanations states */}
                      {!isSubmitted ? (
                        <button
                          onClick={() => handleSubmitQuiz(qIdx)}
                          disabled={selectedIdx === undefined}
                          className="bg-slate-800 dark:bg-zinc-800 hover:bg-slate-900 dark:hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-xl text-xs cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                        >
                          Lock in answer
                        </button>
                      ) : (
                        <div className={`p-4 rounded-xl text-xs space-y-1.5 ${isCorrect ? "bg-green-50/50 dark:bg-green-950/10 border border-green-100/50" : "bg-red-50/50 dark:bg-red-950/10 border border-red-100/50"}`}>
                          <div className="font-bold flex items-center space-x-1.5">
                            {isCorrect ? (
                              <>
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-green-850 dark:text-green-400">Excellent! Correct Answer!</span>
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4 text-red-500" />
                                <span className="text-red-850 dark:text-red-400">Not quite, read details below:</span>
                              </>
                            )}
                          </div>
                          <p className="text-slate-600 dark:text-zinc-400 font-sans leading-relaxed">
                            {qItem.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

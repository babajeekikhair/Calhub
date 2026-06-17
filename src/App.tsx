import React, { useState, useEffect, useMemo } from "react";
import { 
  Calculator, DollarSign, Percent, Activity, Calendar, Scale, Briefcase, 
  Search, ArrowLeft, ArrowRight, HelpCircle, X, ChevronRight, Check,
  Sun, Moon, Sparkles, Menu, ChevronDown, Facebook, Twitter, Github, Linkedin
} from "lucide-react";
import { CATEGORIES, CALCULATORS } from "./data/calculators";
import { RouteState } from "./types";

// Import modules
import MortgageWidget from "./components/calculators/MortgageWidget";
import CompoundInterestWidget from "./components/calculators/CompoundInterestWidget";
import BMIWidget from "./components/calculators/BMIWidget";
import DateDiffWidget from "./components/calculators/DateDiffWidget";
import UnitConverterWidget from "./components/calculators/UnitConverterWidget";
import PercentageWidget from "./components/calculators/PercentageWidget";
import ScientificWidget from "./components/calculators/ScientificWidget";
import TipDiscountWidget from "./components/calculators/TipDiscountWidget";
import BMRWidget from "./components/calculators/BMRWidget";
import GPAWidget from "./components/calculators/GPAWidget";
import AIWriterWidget from "./components/calculators/AIWriterWidget";
import AITeacherWidget from "./components/calculators/AITeacherWidget";
import AITravelWidget from "./components/calculators/AITravelWidget";
import HeroCalculator from "./components/HeroCalculator";
import HalfBirthdayWidget from "./components/calculators/HalfBirthdayWidget";
import CompliancePages from "./components/CompliancePages";

export default function App() {
  // Simple Hash Router Setup
  const [route, setRoute] = useState<RouteState>({ path: "/" });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [isAiDropdownOpen, setIsAiDropdownOpen] = useState<boolean>(false);
  const [isCalcDropdownOpen, setIsCalcDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Persistent structural theme state
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("calchub-theme");
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  });

  // Apply theme to document structure on change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("calchub-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  
  // Accordion faq states
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);

  // Monitor hash parameters
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      
      if (hash === "#/" || hash === "") {
        setRoute({ path: "/" });
        setSearchQuery("");
      } else if (hash.startsWith("#/category/")) {
        const catId = hash.replace("#/category/", "");
        setRoute({ path: "/category", categoryId: catId });
        setSearchQuery("");
      } else if (hash.startsWith("#/calculator/")) {
        const slug = hash.replace("#/calculator/", "");
        setRoute({ path: "/calculator", calcSlug: slug });
        setSearchQuery("");
      }
      
      // Smooth scroll back to top upon navigation
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsCategoryDropdownOpen(false);
      setIsAiDropdownOpen(false);
      setIsCalcDropdownOpen(false);
      setIsMobileMenuOpen(false);
      setExpandedFaqIdx(null);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // trigger initially

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".nav-dropdown-container")) {
        setIsCategoryDropdownOpen(false);
        setIsAiDropdownOpen(false);
        setIsCalcDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  // Update URL hash safely
  const navigate = (path: string) => {
    window.location.hash = path;
  };

  // Find Category helper icon
  const getCategoryIcon = (id: string, className: string = "w-5 h-5") => {
    switch (id) {
      case "financial": return <DollarSign className={className} />;
      case "math": return <Percent className={className} />;
      case "health": return <Activity className={className} />;
      case "date-time": return <Calendar className={className} />;
      case "conversion": return <Scale className={className} />;
      case "everyday": return <Briefcase className={className} />;
      case "ai-tools": return <Sparkles className={className} />;
      default: return <Calculator className={className} />;
    }
  };

  // Dynamic filter lists for searching
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return CALCULATORS.filter(
      (calc) => 
        calc.name.toLowerCase().includes(query) || 
        calc.shortDescription.toLowerCase().includes(query) || 
        calc.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // General popular calculators listing
  const popularCalculators = useMemo(() => {
    return CALCULATORS.filter((calc) => calc.popular);
  }, []);

  // Render specific active calculators
  const renderActiveCalculatorWidget = (slug: string) => {
    switch (slug) {
      case "mortgage-calculator":
        return <MortgageWidget />;
      case "compound-interest":
        return <CompoundInterestWidget />;
      case "bmi-calculator":
        return <BMIWidget />;
      case "date-difference":
        return <DateDiffWidget />;
      case "unit-converter":
        return <UnitConverterWidget />;
      case "percentage-calculator":
        return <PercentageWidget />;
      case "scientific-calculator":
        return <ScientificWidget />;
      case "tip-discount":
        return <TipDiscountWidget />;
      case "bmr-calculator":
        return <BMRWidget />;
      case "gpa-calculator":
        return <GPAWidget />;
      case "ai-writer":
        return <AIWriterWidget />;
      case "ai-teacher":
        return <AITeacherWidget />;
      case "ai-travel":
        return <AITravelWidget />;
      case "half-birthday":
        return <HalfBirthdayWidget />;
      default:
        return (
          <div className="p-8 text-center text-zinc-500 font-sans">
            Calculator utility is undergoing construction.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900 transition-colors duration-200">
      
      {/* HEADER SECTION */}
      <header className="sticky top-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center space-x-2.5 cursor-pointer hover:opacity-90 select-none group"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm ring-4 ring-blue-50 dark:ring-blue-950/20 group-hover:scale-105 transition-all">
              <Calculator className="w-5.5 h-5.5 stroke-[2.25]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-950 dark:text-white font-display block">CalcHub</span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase tracking-widest font-mono font-bold block -mt-1">hub website</span>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => {
                navigate("/");
                setIsCategoryDropdownOpen(false);
                setIsAiDropdownOpen(false);
                setIsCalcDropdownOpen(false);
              }}
              className={`text-sm font-semibold transition-colors hover:text-slate-950 dark:hover:text-white px-1.5 py-1 ${route.path === "/" && !route.categoryId && !route.calcSlug ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400" : "text-slate-600 dark:text-zinc-400"}`}
            >
              Home
            </button>
            
            {/* AI Tools Dropdown */}
            <div className="relative nav-dropdown-container">
              <button
                onClick={() => {
                  setIsAiDropdownOpen(!isAiDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                  setIsCalcDropdownOpen(false);
                }}
                className={`text-sm font-semibold transition-colors hover:text-slate-950 dark:hover:text-white flex items-center space-x-1 cursor-pointer py-1 ${isAiDropdownOpen || (route.calcSlug && ["ai-writer", "ai-teacher", "ai-travel"].includes(route.calcSlug)) ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-zinc-400"}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>AI Tools</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isAiDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isAiDropdownOpen && (
                <div className="absolute left-0 mt-2.5 w-72 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 mb-2">
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider font-mono">Generative Assistants</span>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        navigate("/calculator/ai-writer");
                        setIsAiDropdownOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl text-xs font-semibold hover:bg-amber-50/55 dark:hover:bg-amber-950/20 text-slate-800 dark:text-zinc-200 hover:text-amber-700 dark:hover:text-amber-400 flex items-start space-x-3 transition-all cursor-pointer"
                    >
                      <span className="bg-amber-100 dark:bg-amber-955/30 p-2 rounded-lg text-amber-600 dark:text-amber-400">✍️</span>
                      <div>
                        <div className="font-bold">AI Writer Assistant</div>
                        <div className="text-[10px] text-slate-450 dark:text-zinc-500 font-normal">Generate copy, drafts, emails, and scripts.</div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => {
                        navigate("/calculator/ai-teacher");
                        setIsAiDropdownOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl text-xs font-semibold hover:bg-blue-50/55 dark:hover:bg-blue-950/20 text-slate-800 dark:text-zinc-200 hover:text-blue-700 dark:hover:text-blue-400 flex items-start space-x-3 transition-all cursor-pointer"
                    >
                      <span className="bg-blue-100 dark:bg-blue-955/30 p-2 rounded-lg text-blue-600 dark:text-blue-400">🎓</span>
                      <div>
                        <div className="font-bold">AI Study Buddy</div>
                        <div className="text-[10px] text-slate-450 dark:text-zinc-500 font-normal">Interactive teaching & tailored study plans.</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        navigate("/calculator/ai-travel");
                        setIsAiDropdownOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-xl text-xs font-semibold hover:bg-teal-50/55 dark:hover:bg-teal-950/20 text-slate-800 dark:text-zinc-200 hover:text-teal-700 dark:hover:text-teal-400 flex items-start space-x-3 transition-all cursor-pointer"
                    >
                      <span className="bg-teal-100 dark:bg-teal-910/30 p-2 rounded-lg text-teal-600 dark:text-teal-400">✈️</span>
                      <div>
                        <div className="font-bold">AI Smart Tour Planner</div>
                        <div className="text-[10px] text-slate-450 dark:text-zinc-500 font-normal">Custom travel itineraries and dining tables.</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Popular calculators dropdown */}
            <div className="relative nav-dropdown-container">
              <button
                onClick={() => {
                  setIsCalcDropdownOpen(!isCalcDropdownOpen);
                  setIsAiDropdownOpen(false);
                  setIsCategoryDropdownOpen(false);
                }}
                className={`text-sm font-semibold transition-colors hover:text-slate-950 dark:hover:text-white flex items-center space-x-1 cursor-pointer py-1 ${isCalcDropdownOpen || (route.calcSlug && !["ai-writer", "ai-teacher", "ai-travel"].includes(route.calcSlug)) ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-zinc-400"}`}
              >
                <span>Calculators</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isCalcDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isCalcDropdownOpen && (
                <div className="absolute left-0 mt-2.5 ... w-80 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl py-3.5 px-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2 py-0.5 mb-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-450 dark:text-zinc-500 font-bold uppercase tracking-wider font-mono">Popular Utilities</span>
                    <span className="text-[9px] bg-blue-50 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded-sm">Hot</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <button
                      onClick={() => {
                        navigate("/calculator/mortgage-calculator");
                        setIsCalcDropdownOpen(false);
                      }}
                      className="w-full text-left p-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>🏠 Mortgage Repayment</span>
                      <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-mono">Schedule</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/calculator/compound-interest");
                        setIsCalcDropdownOpen(false);
                      }}
                      className="w-full text-left p-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-slate-705 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>📈 Compound Interest</span>
                      <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-mono">Savings</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/calculator/bmi-calculator");
                        setIsCalcDropdownOpen(false);
                      }}
                      className="w-full text-left p-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-slate-705 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>⚖️ BMI Health Ratio</span>
                      <span className="text-[9px] text-rose-500 font-mono">Health</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/calculator/half-birthday");
                        setIsCalcDropdownOpen(false);
                      }}
                      className="w-full text-left p-1.5 rounded-lg text-xs font-semibold bg-blue-50/40 dark:bg-blue-950/10 hover:bg-blue-50 dark:hover:bg-zinc-800/85 text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>🎂 Half Birthday Milestone</span>
                      <span className="text-[9px] text-blue-600 font-mono font-bold">New</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/calculator/bmr-calculator");
                        setIsCalcDropdownOpen(false);
                      }}
                      className="w-full text-left p-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-slate-705 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>🔥 BMR Calorie Intake</span>
                      <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-mono font-bold">BMR</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate("/calculator/date-difference");
                        setIsCalcDropdownOpen(false);
                      }}
                      className="w-full text-left p-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800/40 text-slate-705 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <span>🗓️ Date difference days</span>
                      <span className="text-[9px] text-slate-400 dark:text-zinc-500 font-mono">Dates</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Category dropdown */}
            <div className="relative nav-dropdown-container">
              <button
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsAiDropdownOpen(false);
                  setIsCalcDropdownOpen(false);
                }}
                className={`text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white flex items-center space-x-1 cursor-pointer py-1 ${isCategoryDropdownOpen || route.categoryId ? "text-blue-600 dark:text-blue-400" : ""}`}
              >
                <span>Category</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isCategoryDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-64 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl py-2.5 px-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 mb-1.5">
                    <span className="text-[9px] text-slate-450 dark:text-zinc-500 font-bold uppercase tracking-wider font-mono">Standard Categories</span>
                  </div>
                  {CATEGORIES.filter(cat => cat.id !== "ai-tools").map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigate(`/category/${cat.id}`);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-705 dark:text-zinc-300 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800/50 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-3 transition-all cursor-pointer"
                    >
                      <span className={`${cat.bgColor} ${cat.color} p-1.5 rounded-lg shrink-0`}>
                        {getCategoryIcon(cat.id, "w-4 h-4")}
                      </span>
                      <span>{cat.name} Suite</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Header search controls and theme toggle */}
          <div className="flex items-center space-x-2.5">
            <div className="relative max-w-xs w-full hidden sm:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 py-1.5 pl-9 pr-4 text-xs text-slate-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden"
                placeholder="Search calculator indices..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (route.path !== "/") {
                    navigate("/");
                  }
                }}
              />
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to Professional Light" : "Switch to High-Contrast Dark"}
              aria-label="Toggle structural theme"
              className="p-2 rounded-lg bg-slate-105 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-705 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white transition-all duration-200 cursor-pointer flex items-center justify-center border border-slate-200 dark:border-zinc-800 shadow-xs hover:shadow-sm active:scale-95"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-500 stroke-[2]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 stroke-[2]" />
              )}
            </button>

            {/* Mobile drawer toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              title="Toggle mobile menu folder"
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-lg bg-slate-105 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-705 dark:text-zinc-300 transition-all border border-slate-200 dark:border-zinc-800 cursor-pointer active:scale-95"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
          
        </div>

        {/* Mobile menu drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-y-auto max-h-[calc(100vh-5rem)] p-4 space-y-5 animate-in fade-in duration-150">
            {/* Search inputs on mobile */}
            <div className="relative w-full sm:hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
              </div>
              <input
                type="text"
                className="block w-full rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/40 py-2 pl-9 pr-4 text-xs text-slate-905 dark:text-zinc-150 focus:border-blue-550 focus:bg-white dark:focus:bg-zinc-900 focus:outline-hidden"
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (route.path !== "/") {
                    navigate("/");
                  }
                }}
              />
            </div>

            {/* 1. AI list */}
            <div className="space-y-1.5">
              <div className="flex items-center space-x-1 px-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest font-mono">AI Tools Suite</span>
              </div>
              <div className="grid grid-cols-1 gap-1 pl-1">
                <button
                  onClick={() => {
                    navigate("/calculator/ai-writer");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-700 dark:text-zinc-300 flex items-start space-x-2.5 transition-all text-left cursor-pointer"
                >
                  <span className="bg-amber-50 dark:bg-amber-955/20 px-2 py-1 rounded-md text-amber-600">✍️</span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">AI Writer Assistant</div>
                    <div className="text-[10px] text-slate-450 dark:text-zinc-500">Draft articles, letters, headlines.</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigate("/calculator/ai-teacher");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-705 dark:text-zinc-300 flex items-start space-x-2.5 transition-all text-left cursor-pointer"
                >
                  <span className="bg-blue-50 dark:bg-blue-955/20 px-2 py-1 rounded-md text-blue-600">🎓</span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">AI Study Companion</div>
                    <div className="text-[10px] text-slate-450 dark:text-zinc-500">Scheduled homework assistant & tutor.</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    navigate("/calculator/ai-travel");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-zinc-800/50 text-slate-705 dark:text-zinc-300 flex items-start space-x-2.5 transition-all text-left cursor-pointer"
                >
                  <span className="bg-teal-50 dark:bg-teal-910/20 px-2 py-1 rounded-md text-teal-600">✈️</span>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-xs">AI Smart Itinerary Planner</div>
                    <div className="text-[10px] text-slate-450 dark:text-zinc-500">Generate trips and schedules.</div>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Popular list */}
            <div className="space-y-1.5">
              <div className="px-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Standard Calculators</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pl-1">
                <button
                  onClick={() => {
                    navigate("/calculator/mortgage-calculator");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left p-2 bg-slate-50 dark:bg-zinc-950 border border-slate-150 dark:border-zinc-850 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-zinc-300 hover:text-blue-550 transition-all flex flex-col justify-between h-14 cursor-pointer"
                >
                  <span>🏠 Mortgage</span>
                  <span className="text-[9px] text-slate-400 font-mono">Schedule</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/calculator/compound-interest");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left p-2 bg-slate-50 dark:bg-zinc-950 border border-slate-150 dark:border-zinc-850 rounded-xl text-[11px] font-semibold text-slate-700 dark:text-zinc-300 hover:text-blue-550 transition-all flex flex-col justify-between h-14 cursor-pointer"
                >
                  <span>📈 Compound Int.</span>
                  <span className="text-[9px] text-slate-400 font-mono">Savings</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/calculator/bmi-calculator");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left p-2 bg-slate-50 dark:bg-zinc-950 border border-slate-150 dark:border-zinc-850 rounded-xl text-[11px] font-semibold text-slate-705 dark:text-zinc-300 hover:text-blue-550 transition-all flex flex-col justify-between h-14 cursor-pointer"
                >
                  <span>⚖️ BMI Ratio</span>
                  <span className="text-[9px] text-rose-500 font-mono">Health</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/calculator/half-birthday");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left p-2 bg-blue-50/45 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 transition-all flex flex-col justify-between h-14 cursor-pointer"
                >
                  <span>🎂 Half Birthday</span>
                  <span className="text-[9px] text-blue-600 font-mono font-bold">Featured</span>
                </button>
              </div>
            </div>

            {/* 3. Categories list */}
            <div className="space-y-1.5">
              <div className="px-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest font-mono">Browse Category list</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pl-1">
                {CATEGORIES.filter(cat => cat.id !== "ai-tools").map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      navigate(`/category/${cat.id}`);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left p-2 rounded-xl text-[11px] font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/40 flex items-center space-x-2 border border-slate-150 dark:border-zinc-850 transition-all cursor-pointer"
                  >
                    <span className={`${cat.bgColor} ${cat.color} p-1.5 rounded-sm shrink-0`}>
                      {getCategoryIcon(cat.id, "w-3.5 h-3.5")}
                    </span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
          </div>
        )}
          
      </header>

      {/* CORE WRAPPERS AND CONTENT */}
      <main className="flex-1">

        {/* 1. HOMEPAGE VIEW */}
        {route.path === "/" && (
          <div>
            {/* Hero search center with integrated Quick Calculator */}
            <section className="bg-gradient-to-b from-white to-slate-50/50 dark:from-zinc-900 dark:to-zinc-950/50 border-b border-slate-200 dark:border-zinc-850 py-12 md:py-20 text-center lg:text-left">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Brand Statement & Search */}
                  <div className="lg:col-span-7 space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight leading-tight">
                      Free, Instant-Result <span className="text-blue-600 dark:text-blue-400">Everyday Calculators</span>
                    </h1>
                    
                    <p className="text-slate-600 dark:text-zinc-400 hover:text-slate-805 dark:hover:text-zinc-350 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Solve mortgage schedules, track investment compound percentages, calculate body mass index ratios, and convert dimension parameters instantly.
                    </p>

                    {/* Hero Primary Search Bar Input */}
                    <div className="max-w-xl mx-auto lg:mx-0 relative pt-2">
                      <div className="relative rounded-full shadow-md">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4.5">
                          <Search className="h-5.5 w-5.5 text-slate-400 dark:text-zinc-500" />
                        </div>
                        <input
                          type="text"
                          className="block w-full rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-3.5 pl-12 pr-12 text-sm text-slate-900 dark:text-zinc-100 placeholder:text-slate-405 dark:placeholder:text-zinc-500 focus:border-blue-500 focus:outline-hidden focus:ring-2 focus:ring-blue-50/50 dark:focus:ring-blue-950/50"
                          placeholder="Search 100+ standard calculators (e.g. mortgage, BMI...)"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                          <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 dark:text-zinc-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {/* Live Search List outputs */}
                      {searchQuery.trim() && (
                        <div className="absolute left-0 right-0 mt-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl py-3 text-left max-h-96 overflow-y-auto z-30">
                          <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800 text-[10px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-bold font-mono">
                            MATCHING CALCULATORS ({searchResults.length})
                          </div>
                          {searchResults.length > 0 ? (
                            searchResults.map((calc) => (
                              <div
                                key={calc.id}
                                onClick={() => {
                                  navigate(`/calculator/${calc.slug}`);
                                }}
                                className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-zinc-800/50 cursor-pointer flex items-start space-x-3 transition-colors border-b border-slate-50 dark:border-zinc-800/50"
                              >
                                <span className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 p-2 rounded-lg mt-0.5">
                                  {getCategoryIcon(calc.category, "w-4 h-4")}
                                </span>
                                <div>
                                  <p className="text-sm font-bold text-slate-900 dark:text-white">{calc.name}</p>
                                  <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-1">{calc.shortDescription}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-6 text-center text-sm text-slate-400 dark:text-zinc-500 font-sans">
                              No matching calculators found for "{searchQuery}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quick links banner */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs">
                      <span className="text-slate-400 dark:text-zinc-500">Quick links:</span>
                      <button
                        onClick={() => navigate("/calculator/half-birthday")}
                        className="px-3 py-1 bg-blue-50 dark:bg-blue-950/35 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-full border border-blue-200/45 dark:border-blue-800/45 text-blue-600 dark:text-blue-400 transition-all font-bold cursor-pointer inline-flex items-center gap-1 hover:scale-105 active:scale-95"
                      >
                        🔥 New: Half Birthday
                      </button>
                      {CATEGORIES.slice(0, 3).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => navigate(`/category/${cat.id}`)}
                          className="px-3 py-1 bg-slate-100 dark:bg-zinc-855 hover:bg-slate-205/80 dark:hover:bg-zinc-800 rounded-full border border-slate-200/20 dark:border-zinc-800/50 text-slate-655 dark:text-zinc-350 transition-colors font-medium cursor-pointer"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Hero Calculator Card Widget */}
                  <div className="lg:col-span-5 flex justify-center w-full">
                    <HeroCalculator />
                  </div>

                </div>
              </div>
            </section>

            {/* Grid of categories cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
              <div className="text-center md:text-left space-y-1">
                <h2 className="text-2xl font-bold font-display tracking-tight text-slate-950 dark:text-white">
                  Browse Free Calculators By Category
                </h2>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  Select a category suite below to view all mathematical and conversion operations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => {
                  const itemsCount = CALCULATORS.filter(c => c.category === cat.id).length;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => navigate(`/category/${cat.id}`)}
                      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-850 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bgColor} ${cat.color} group-hover:scale-105 transition-transform`}>
                          {getCategoryIcon(cat.id, "w-6 h-6")}
                        </div>
                        <div className="space-y-1.5">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-display">
                            {cat.name} Solutions
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex items-center justify-between text-xs font-semibold border-t border-slate-100 dark:border-zinc-850 mt-4 text-slate-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <span>{itemsCount} Active tools loaded</span>
                        <span className="flex items-center space-x-1">
                          <span>Browse</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Popular calculators horizontal cards */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white/40 dark:bg-zinc-900/30 border-t border-slate-200/50 dark:border-zinc-855 space-y-8 rounded-3xl mb-16">
              <div className="text-center md:text-left space-y-1">
                <h2 className="text-xl font-bold font-display tracking-tight text-slate-950 dark:text-white">
                  ⭐ Most Popular Free Utility Toolbags
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Quick metrics used daily by financial, health, and research workers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularCalculators.map((calc) => (
                  <div
                    key={calc.id}
                    onClick={() => navigate(`/calculator/${calc.slug}`)}
                    className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-slate-150 dark:border-zinc-850 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold p-1 px-2 text-[10px] rounded-full uppercase tracking-wider">
                          Popular
                        </span>
                        <span className="text-slate-300 dark:text-zinc-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                          {getCategoryIcon(calc.category, "w-4 h-4")}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {calc.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                        {calc.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-zinc-850 mt-3 flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-zinc-550 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      <span className="uppercase">Launch Tool</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 2. CATEGORY VIEW */}
        {route.path === "/category" && route.categoryId && (() => {
          const catInfo = CATEGORIES.find(c => c.id === route.categoryId);
          const catCalculators = CALCULATORS.filter(c => c.category === route.categoryId);

          if (!catInfo) return <div className="p-8 text-center dark:text-zinc-300">Category not found.</div>;

          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
              
              {/* Breadcrumbs */}
              <div className="flex items-center space-x-2 text-xs text-slate-400 dark:text-zinc-500 font-medium">
                <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer" onClick={() => navigate("/")}>Home</span>
                <span>/</span>
                <span className="text-slate-905 dark:text-zinc-300">{catInfo.name}</span>
              </div>

              {/* Header Title Intro */}
              <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-zinc-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center space-x-3">
                    <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${catInfo.bgColor} ${catInfo.color}`}>
                      {getCategoryIcon(catInfo.id, "w-6 h-6")}
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
                      {catInfo.name} Handbooks
                    </h1>
                  </div>
                  <p className="text-slate-600 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-330 text-sm leading-relaxed">
                    {catInfo.description} All math calculations process securely client-side in instant times. No backend logs captured.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="flex items-center space-x-2 text-xs font-semibold text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-700 py-2.5 px-4 rounded-lg border border-slate-250 dark:border-zinc-700 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return Home</span>
                </button>
              </div>

              {/* Calculator utilities lists in grid */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold font-display text-slate-950 dark:text-white">
                  Select {catInfo.name} Calculator Tool
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catCalculators.map((calc) => (
                    <div
                      key={calc.id}
                      onClick={() => navigate(`/calculator/${calc.slug}`)}
                      className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-850 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xs cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-display">
                          {calc.name}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                          {calc.shortDescription}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-105 dark:border-zinc-850 mt-4 flex justify-between items-center text-[11px] font-bold text-slate-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <span>Open & Operational</span>
                        <span>→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })()}

        {/* 3. CALCULATOR PAGE VIEW */}
        {route.path === "/calculator" && route.calcSlug && (() => {
          const calcInfo = CALCULATORS.find(c => c.slug === route.calcSlug);
          
          if (!calcInfo) {
            return (
              <div className="p-12 text-center text-zinc-500 dark:text-zinc-400">
                Calculator not found or slug broken.
              </div>
            );
          }

          const catInfo = CATEGORIES.find(c => c.id === calcInfo.category);
          const relatedCalcs = CALCULATORS.filter(c => c.category === calcInfo.category && c.slug !== calcInfo.slug).slice(0, 3);

          return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
              
              {/* Back Button and Breadcrumbs navigation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-slate-400 dark:text-zinc-500 font-medium">
                  <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer" onClick={() => navigate("/")}>Home</span>
                  <span>/</span>
                  <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer" onClick={() => navigate(`/category/${calcInfo.category}`)}>{catInfo?.name}</span>
                  <span>/</span>
                  <span className="text-slate-900 dark:text-zinc-300">{calcInfo.name}</span>
                </div>

                <button
                  onClick={() => navigate(`/category/${calcInfo.category}`)}
                  className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 dark:text-zinc-400 hover:text-slate-850 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Other {catInfo?.name} tools</span>
                </button>
              </div>

              {/* Title Section */}
              <div className="space-y-3 text-left">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight leading-tight">
                  {calcInfo.name}
                </h1>
                <p className="text-sm md:text-base text-slate-505 dark:text-zinc-400 leading-relaxed">
                  {calcInfo.description}
                </p>
              </div>

              {/* WIDGET INTERACTION COMPONENT CONTAINER */}
              <div className="relative">
                {renderActiveCalculatorWidget(calcInfo.id)}
              </div>

              {/* HOW IT IS CALCULATED */}
              <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-zinc-850 space-y-6">
                <h2 className="text-xl font-bold font-display text-slate-950 dark:text-white flex items-center space-x-2">
                  <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 p-1.5 rounded-lg">
                    <Calculator className="w-4 h-4" />
                  </span>
                  <span>How it's Calculated</span>
                </h2>

                <div className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  <p>{calcInfo.howItWorks}</p>
                  
                  <div className="bg-slate-50 dark:bg-zinc-950/50 p-5 rounded-xl border border-slate-100 dark:border-zinc-805/80">
                    <p className="font-mono text-slate-600 dark:text-zinc-450 leading-loose whitespace-pre-line text-xs font-medium">
                      {calcInfo.formulaExplanation}
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ ACCORDION PANEL */}
              <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-zinc-850 space-y-6">
                <h2 className="text-xl font-bold font-display text-slate-950 dark:text-white flex items-center space-x-2">
                  <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 p-1.5 rounded-lg">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <span>Frequently Asked Questions (FAQ)</span>
                </h2>

                <div className="divide-y divide-slate-200 dark:divide-zinc-800">
                  {calcInfo.faq.map((item, idx) => {
                    const isOpen = expandedFaqIdx === idx;
                    return (
                      <div key={idx} className="py-4">
                        <button
                          onClick={() => setExpandedFaqIdx(isOpen ? null : idx)}
                          className="w-full text-left font-bold text-sm text-slate-900 dark:text-zinc-200 flex justify-between items-center focus:outline-hidden py-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          <span>{item.question}</span>
                          <span className="text-lg font-normal text-slate-400 dark:text-zinc-650">{isOpen ? "−" : "+"}</span>
                        </button>
                        
                        {isOpen && (
                          <p className="mt-3 text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed pl-1 transition-all">
                            {item.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RELATED CALCULATORS BLOCK */}
              {relatedCalcs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold font-display text-slate-950 dark:text-white">
                    Related {catInfo?.name} Calculators
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedCalcs.map((rCalc) => (
                      <div
                        key={rCalc.id}
                        onClick={() => navigate(`/calculator/${rCalc.slug}`)}
                        className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-850 hover:border-blue-500 dark:hover:border-blue-450 cursor-pointer group transition-all text-left"
                      >
                        <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {rCalc.name}
                        </h4>
                        <p className="text-[10px] text-slate-505 dark:text-zinc-400 line-clamp-2 mt-1 leading-normal">
                          {rCalc.shortDescription}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          );
        })()}

        {/* AdSense Policy and Compliance Pages */}
        {route.path === "/privacy" && (
          <CompliancePages page="privacy" onNavigateHome={() => navigate("/")} />
        )}
        {route.path === "/terms" && (
          <CompliancePages page="terms" onNavigateHome={() => navigate("/")} />
        )}
        {route.path === "/about-us" && (
          <CompliancePages page="about" onNavigateHome={() => navigate("/")} />
        )}
        {route.path === "/contact" && (
          <CompliancePages page="contact" onNavigateHome={() => navigate("/")} />
        )}

      </main>

      {/* FOOTER VIEW */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="space-y-4 md:col-span-4 text-left">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
                <Calculator className="w-4.5 h-4.5" />
              </div>
              <span className="text-base font-bold text-white font-display">CalcHub Library</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Free, modern, offline-first calculations portal. Built with total precision, compliance with standard formulas, utilizing native React and Tailwind layout styling.
            </p>

            {/* Social Link Icons */}
            <div className="flex items-center space-x-3 pt-1">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-805 hover:bg-slate-800 hover:text-white flex items-center justify-center text-slate-400 transition-all border border-slate-800 cursor-pointer hover:scale-110 active:scale-95"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-805 hover:bg-sky-500 hover:text-white flex items-center justify-center text-slate-400 transition-all border border-slate-800 cursor-pointer hover:scale-110 active:scale-95"
                title="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-805 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-400 transition-all border border-slate-800 cursor-pointer hover:scale-110 active:scale-95"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-805 hover:bg-indigo-600 hover:text-white flex items-center justify-center text-slate-400 transition-all border border-slate-800 cursor-pointer hover:scale-110 active:scale-95"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <p className="text-[10px] text-slate-500 font-mono">
              Designed with 100% Client-Side Privacy. No data variables sent backend.
            </p>
          </div>

          <div className="space-y-3 text-left md:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Quick Portals</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => navigate(`/category/${cat.id}`)}
                    className="hover:text-white hover:underline transition-all text-left cursor-pointer text-slate-400"
                  >
                    {cat.name} Suite
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 text-left md:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Legal & Info</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => navigate("/about-us")}
                  className="hover:text-white hover:underline transition-all text-left cursor-pointer text-slate-400"
                >
                  About CalcHub
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/privacy")}
                  className="hover:text-white hover:underline transition-all text-left cursor-pointer text-slate-400 font-semibold text-blue-400"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/terms")}
                  className="hover:text-white hover:underline transition-all text-left cursor-pointer text-slate-400"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate("/contact")}
                  className="hover:text-white hover:underline transition-all text-left cursor-pointer text-slate-400 font-semibold text-blue-400"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-3 text-left md:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Disclaimer</h4>
            <p className="text-[10px] text-slate-500 leading-normal">
              These calculations are prospective estimates purely for educational planning. Consult standard certified personal financial advisors or clinical family physicians prior to making major lifestyle or financial investments.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 mt-8 text-center text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} CalcHub Portal. Independent client calculations. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}

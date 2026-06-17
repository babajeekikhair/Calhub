import React, { useState, useEffect } from "react";
import { Delete, Copy, Check, Info, Equal } from "lucide-react";

export default function HeroCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleKeyPress = (char: string) => {
    setErrorMsg("");
    setExpression((prev) => {
      // Basic consecutive operator safeguards
      const lastChar = prev.slice(-1);
      const isOperator = ["+", "-", "*", "/", "%"].includes(char);
      const isLastCharOperator = ["+", "-", "*", "/", "%"].includes(lastChar);
      
      if (isOperator && isLastCharOperator) {
        // Replace previous operator
        return prev.slice(0, -1) + char;
      }
      return prev + char;
    });
  };

  const clearAll = () => {
    setExpression("");
    setResult("");
    setErrorMsg("");
  };

  const handleBackspace = () => {
    setErrorMsg("");
    setExpression((prev) => prev.slice(0, -1));
  };

  // Safe arithmetic evaluator
  const calculateResult = (expr: string): string => {
    if (!expr.trim()) return "";
    
    // Clean and validate characters to prevent malicious execution
    let sanitized = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/%/g, "/100");

    // Only allow safe characters: digits, operators, parentheses, spaces, dots
    if (!/^[0-9+\-*/().\s]*$/.test(sanitized)) {
      return "Error";
    }

    try {
      // Use clean safe evaluation of simple algebraic equations
      // Function constructor is safe here because we white-listed simple mathematical regex characters.
      const evaluated = new Function(`return (${sanitized})`)();
      
      if (evaluated === null || evaluated === undefined || isNaN(evaluated)) {
        return "";
      }
      if (!isFinite(evaluated)) {
        return "Cannot divide by 0";
      }

      // Format decimals beautifully
      if (Number.isInteger(evaluated)) {
        return evaluated.toString();
      } else {
        const fixed = Number(evaluated.toFixed(8));
        return parseFloat(fixed.toString()).toString();
      }
    } catch {
      return "";
    }
  };

  // Real-time live evaluation behavior
  useEffect(() => {
    const cleanExpr = expression.trim();
    if (!cleanExpr) {
      setResult("");
      return;
    }

    const lastChar = cleanExpr.slice(-1);
    // Don't show eval if ending with an operator
    if (["+", "-", "*", "/", "(", "."].includes(lastChar)) {
      return;
    }

    const calculated = calculateResult(cleanExpr);
    if (calculated && calculated !== "Error" && calculated !== "Cannot divide by 0") {
      setResult(calculated);
    }
  }, [expression]);

  const handleEquals = () => {
    if (!expression.trim()) return;
    
    const finalResult = calculateResult(expression);
    if (finalResult) {
      if (finalResult === "Error" || finalResult === "Cannot divide by 0") {
        setErrorMsg(finalResult);
      } else {
        setExpression(finalResult);
        setResult("");
      }
    } else {
      setErrorMsg("Invalid Equation");
    }
  };

  const handleCopy = () => {
    const textToCopy = expression || result;
    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle keyboard inputs for a premium experience
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if input elements are not focused to avoid hijacking textareas
      const activeTag = document.activeElement?.tagName;
      if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

      const key = e.key;
      if (/[0-9]/.test(key)) {
        handleKeyPress(key);
      } else if (["+", "-", "*", "/", "%", "(", ")", "."].includes(key)) {
        handleKeyPress(key);
      } else if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (key === "Backspace") {
        handleBackspace();
      } else if (key === "Escape") {
        clearAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression]);

  // Format expression for the visual display screen
  const getDisplayExpression = () => {
    return expression
      .replace(/\*/g, " × ")
      .replace(/\//g, " ÷ ")
      .replace(/\+/g, " + ")
      .replace(/\-/g, " - ");
  };

  return (
    <div 
      className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-4.5 shadow-md flex flex-col justify-between max-w-sm w-full mx-auto"
      id="hero-instant-calculator"
    >
      <div>
        {/* Interactive Header & Utility info */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-bold font-mono text-slate-400 dark:text-zinc-500 uppercase">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3 text-blue-500 animate-pulse" />
            <span>Instant Math Pad</span>
          </span>
          <span className="text-[9px] bg-slate-100 dark:bg-zinc-800/85 px-1.5 py-0.5 rounded-sm">
            Keyboard active
          </span>
        </div>

        {/* Display Screen Panel */}
        <div className="bg-slate-50 dark:bg-zinc-950/80 rounded-xl p-3 text-right space-y-1 relative group font-mono overflow-hidden border border-slate-150 dark:border-zinc-800/50 mb-4 min-h-[76px] flex flex-col justify-between">
          <div className="text-[10px] text-slate-400 dark:text-zinc-500 truncate h-4 font-semibold select-none">
            {errorMsg ? errorMsg : (result ? `Preview: ${result}` : "Enter expression")}
          </div>
          
          <div className="flex items-center justify-between gap-1 w-full mt-1">
            {/* Copy handle button on screen */}
            {(expression || result) && (
              <button
                onClick={handleCopy}
                title="Copy result to clipboard"
                className="shrink-0 p-1.5 rounded-lg border border-slate-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-450 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer shadow-2xs"
              >
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              </button>
            )}
            
            <div className="text-right w-full font-bold select-all truncate text-lg md:text-xl text-slate-900 dark:text-white leading-none">
              {getDisplayExpression() || "0"}
            </div>
          </div>
        </div>

        {/* Keypad Grid buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {/* Row 1 */}
          <button
            onClick={clearAll}
            className="p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/20 dark:hover:bg-orange-950/40 border border-orange-100 dark:border-orange-900/30 text-orange-600 dark:text-orange-450 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
            title="Clear all"
          >
            AC
          </button>
          <button
            onClick={() => handleKeyPress("(")}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 border border-slate-150 dark:border-zinc-750 text-slate-600 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            (
          </button>
          <button
            onClick={() => handleKeyPress(")")}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 border border-slate-150 dark:border-zinc-750 text-slate-600 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            )
          </button>
          <button
            onClick={handleBackspace}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 border border-slate-150 dark:border-zinc-750 text-slate-600 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center hover:scale-[1.02] active:scale-95"
            title="Backspace"
          >
            <Delete className="w-3.5 h-3.5" />
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleKeyPress("7")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            7
          </button>
          <button
            onClick={() => handleKeyPress("8")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            8
          </button>
          <button
            onClick={() => handleKeyPress("9")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            9
          </button>
          <button
            onClick={() => handleKeyPress("/")}
            className="p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-100/80 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            ÷
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleKeyPress("4")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            4
          </button>
          <button
            onClick={() => handleKeyPress("5")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            5
          </button>
          <button
            onClick={() => handleKeyPress("6")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            6
          </button>
          <button
            onClick={() => handleKeyPress("*")}
            className="p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-100/80 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            ×
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleKeyPress("1")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            1
          </button>
          <button
            onClick={() => handleKeyPress("2")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            2
          </button>
          <button
            onClick={() => handleKeyPress("3")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            3
          </button>
          <button
            onClick={() => handleKeyPress("-")}
            className="p-2.5 rounded-xl bg-blue-50/50 hover:bg-blue-100/80 dark:bg-blue-950/20 dark:hover:bg-blue-950/40 border border-blue-100/50 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            -
          </button>

          {/* Row 5 */}
          <button
            onClick={() => handleKeyPress("0")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            0
          </button>
          <button
            onClick={() => handleKeyPress(".")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            .
          </button>
          <button
            onClick={() => handleKeyPress("%")}
            className="p-2.5 rounded-xl bg-slate-50/40 hover:bg-slate-100/90 dark:bg-zinc-850 dark:hover:bg-zinc-800 border border-slate-150 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
          >
            %
          </button>
          <button
            onClick={handleEquals}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all cursor-pointer shadow-xs border border-blue-700/30 hover:shadow-md flex items-center justify-center hover:scale-[1.02] active:scale-95"
            title="Evaluate expression"
          >
            <Equal className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

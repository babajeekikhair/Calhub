import React, { useState } from "react";

export default function ScientificWidget() {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [isRadian, setIsRadian] = useState<boolean>(true);
  const [lastAnswer, setLastAnswer] = useState<string>("0");
  const [calcHistory, setCalcHistory] = useState<string[]>([]);

  const handleKeyPress = (char: string) => {
    setDisplayValue((prev) => prev + char);
  };

  const clearAll = () => {
    setDisplayValue("");
  };

  const deleteLast = () => {
    setDisplayValue((prev) => prev.slice(0, -1));
  };

  const handleMathFunction = (func: string) => {
    // E.g. sin, cos, tan, log, ln, sqrt
    setDisplayValue((prev) => prev + func + "(");
  };

  const evaluateExpressionEx = () => {
    if (!displayValue) return;

    try {
      // Create a secure processing representation
      let processedExpr = displayValue;

      // Replace symbols for Javascript Math
      processedExpr = processedExpr.replace(/π/g, "Math.PI");
      processedExpr = processedExpr.replace(/e/g, "Math.E");
      processedExpr = processedExpr.replace(/Ans/g, lastAnswer || "0");
      processedExpr = processedExpr.replace(/×/g, "*");
      processedExpr = processedExpr.replace(/÷/g, "/");

      // Custom handlers for functions
      // 1. sin, cos, tan with degree/radian considerations
      if (!isRadian) {
        // Deg -> Rad converter for sin(val), cos(val), tan(val)
        processedExpr = processedExpr.replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)");
        processedExpr = processedExpr.replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)");
        processedExpr = processedExpr.replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)");
      } else {
        processedExpr = processedExpr.replace(/sin\(/g, "Math.sin(");
        processedExpr = processedExpr.replace(/cos\(/g, "Math.cos(");
        processedExpr = processedExpr.replace(/tan\(/g, "Math.tan(");
      }

      processedExpr = processedExpr.replace(/ln\(/g, "Math.log(");
      processedExpr = processedExpr.replace(/log\(/g, "Math.log10(");
      processedExpr = processedExpr.replace(/sqrt\(/g, "Math.sqrt(");
      processedExpr = processedExpr.replace(/\^/g, "**");

      // Balance parentheses if missing
      const openingBrackets = (processedExpr.match(/\(/g) || []).length;
      const closingBrackets = (processedExpr.match(/\)/g) || []).length;
      if (openingBrackets > closingBrackets) {
        processedExpr += ")".repeat(openingBrackets - closingBrackets);
      }

      // Safe evaluation context
      const computeFn = new Function(`return (${processedExpr})`);
      const finalVal = computeFn();

      if (finalVal === undefined || isNaN(finalVal) || !isFinite(finalVal)) {
        throw new Error("Invalid Input");
      }

      const formattedResult = Number(finalVal.toFixed(8)).toString(); // Strip trailing zeros
      setCalcHistory((prev) => [`${displayValue} = ${formattedResult}`, ...prev.slice(0, 9)]);
      setLastAnswer(formattedResult);
      setDisplayValue(formattedResult);
    } catch {
      setDisplayValue("Error");
      setTimeout(() => setDisplayValue(""), 1200);
    }
  };

  return (
    <div id="scientific-calc-widget" className="bg-zinc-900 dark:bg-black rounded-2xl border border-zinc-800 shadow-xl overflow-hidden p-6 max-w-lg mx-auto">
      
      {/* SCREEN PANELS */}
      <div className="bg-zinc-950 rounded-xl p-4 md:p-6 text-right mb-6 border border-zinc-850 relative">
        <div className="absolute top-2 left-3 flex items-center space-x-2 text-[10px] uppercase tracking-wider text-zinc-500 font-bold font-mono">
          <span className={`px-1.5 py-0.5 rounded-sm ${isRadian ? "bg-blue-500/20 text-blue-400" : "bg-zinc-800 text-zinc-400"}`}>RAD</span>
          <span className={`px-1.5 py-0.5 rounded-sm ${!isRadian ? "bg-blue-500/20 text-blue-400" : "bg-zinc-800 text-zinc-400"}`}>DEG</span>
        </div>

        {/* Dynamic mathematical ticker */}
        <div className="text-zinc-500 text-xs font-mono min-h-4 h-4 overflow-hidden mb-1 break-all select-all">
          {calcHistory.length > 0 ? calcHistory[0].split("=")[0] : ""}
        </div>

        <div className="text-white text-3xl md:text-4xl font-mono font-bold tracking-tight select-all overflow-x-auto whitespace-nowrap scrollbar-none py-1">
          {displayValue || "0"}
        </div>
      </div>

      {/* ANGLE SYSTEM SWITCH AND AUX CONTROLS */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <button
          onClick={() => setIsRadian(!isRadian)}
          className="py-2.5 font-mono text-xs font-bold rounded-lg border border-zinc-800 text-zinc-400 hover:text-white bg-zinc-850 hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer"
        >
          {isRadian ? "→ DEG" : "→ RAD"}
        </button>

        <button
          onClick={() => handleKeyPress("(")}
          className="py-2.5 font-mono text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          (
        </button>

        <button
          onClick={() => handleKeyPress(")")}
          className="py-2.5 font-mono text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          )
        </button>

        <button
          onClick={() => handleKeyPress("Ans")}
          className="py-2.5 font-mono text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-blue-400 active:scale-95 transition-all cursor-pointer"
        >
          Ans
        </button>

        <button
          onClick={deleteLast}
          className="py-2.5 font-mono text-xs font-bold rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          DEL
        </button>
      </div>

      {/* KEYPAD GRID */}
      <div className="grid grid-cols-5 gap-2">
        {/* SCIENTIFIC MATH FUNCTIONS COL 1 & 2 */}
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => handleMathFunction("sin")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            sin
          </button>
          <button
            onClick={() => handleMathFunction("cos")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            cos
          </button>
          <button
            onClick={() => handleMathFunction("tan")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            tan
          </button>
          <button
            onClick={() => handleKeyPress("^")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            x^y
          </button>
          <button
            onClick={() => handleMathFunction("log")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            log10
          </button>
          <button
            onClick={() => handleMathFunction("ln")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            ln
          </button>
          <button
            onClick={() => handleMathFunction("sqrt")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            √
          </button>
          <button
            onClick={() => handleKeyPress("π")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            π
          </button>
          <button
            onClick={() => handleKeyPress("e")}
            className="py-3 font-mono text-xs font-semibold rounded-lg bg-zinc-850 hover:bg-zinc-800 text-zinc-400 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            e
          </button>
          <button
            onClick={clearAll}
            className="py-3 font-mono text-xs font-extrabold rounded-lg bg-red-600/20 border border-red-600/30 text-red-500 hover:bg-red-600 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            AC
          </button>
        </div>

        {/* NUMERIC AND OPERATORS KEYBOARD COLS 3, 4, 5 */}
        <div className="col-span-3 grid grid-cols-3 gap-2">
          {/* Row 1 */}
          <button
            onClick={() => handleKeyPress("7")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            7
          </button>
          <button
            onClick={() => handleKeyPress("8")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            8
          </button>
          <button
            onClick={() => handleKeyPress("9")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            9
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleKeyPress("4")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            4
          </button>
          <button
            onClick={() => handleKeyPress("5")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            5
          </button>
          <button
            onClick={() => handleKeyPress("6")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            6
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleKeyPress("1")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            1
          </button>
          <button
            onClick={() => handleKeyPress("2")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            2
          </button>
          <button
            onClick={() => handleKeyPress("3")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            3
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleKeyPress("0")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            0
          </button>
          <button
            onClick={() => handleKeyPress(".")}
            className="py-4 font-mono font-bold text-base rounded-lg bg-zinc-800 hover:bg-zinc-750 text-white active:scale-95 transition-all cursor-pointer"
          >
            .
          </button>
          <button
            onClick={evaluateExpressionEx}
            className="py-4 font-mono font-bold text-base rounded-lg bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all cursor-pointer shadow-md"
          >
            =
          </button>
        </div>
      </div>

      {/* ARITHMETIC SYMBOLS ROW BELOW */}
      <div className="grid grid-cols-4 gap-2 mt-2">
        <button
          onClick={() => handleKeyPress(" + ")}
          className="py-3 font-mono font-bold text-lg rounded-lg bg-zinc-850 hover:bg-zinc-800 text-blue-400 active:scale-95 transition-all cursor-pointer"
        >
          +
        </button>
        <button
          onClick={() => handleKeyPress(" - ")}
          className="py-3 font-mono font-bold text-lg rounded-lg bg-zinc-850 hover:bg-zinc-800 text-blue-400 active:scale-95 transition-all cursor-pointer"
        >
          −
        </button>
        <button
          onClick={() => handleKeyPress(" × ")}
          className="py-3 font-mono font-bold text-lg rounded-lg bg-zinc-850 hover:bg-zinc-800 text-blue-400 active:scale-95 transition-all cursor-pointer"
        >
          ×
        </button>
        <button
          onClick={() => handleKeyPress(" ÷ ")}
          className="py-3 font-mono font-bold text-lg rounded-lg bg-zinc-850 hover:bg-zinc-800 text-blue-400 active:scale-95 transition-all cursor-pointer"
        >
          ÷
        </button>
      </div>

      {/* SLIDING TAPE PANEL HISTORY DISPLAY */}
      {calcHistory.length > 1 && (
        <div className="mt-6 pt-4 border-t border-zinc-800 text-left">
          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-2 font-mono">Previous operations</p>
          <div className="space-y-1.5 max-h-24 overflow-y-auto">
            {calcHistory.slice(1).map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setDisplayValue(item.split("=")[1].trim())}
                className="font-mono text-xs text-zinc-400 flex justify-between items-center bg-zinc-950/40 p-1.5 rounded-lg border border-zinc-850 hover:border-zinc-700 cursor-pointer hover:bg-zinc-950 transition-all"
                title="Click to copy answer to screen"
              >
                <span className="truncate pr-4">{item.split("=")[0]}</span>
                <span className="font-bold text-blue-400 font-sans">{item.split("=")[1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

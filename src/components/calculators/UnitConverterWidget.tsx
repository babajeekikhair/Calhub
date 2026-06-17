import React, { useState } from "react";
import { convertUnits, CONVERSION_UNITS } from "../../utils/calculations";

interface PropertyCategory {
  id: string;
  name: string;
  icon: string;
  units: { id: string; name: string }[];
}

export const UNIT_CATEGORIES: PropertyCategory[] = [
  {
    id: "length",
    name: "Length",
    icon: "↔️",
    units: [
      { id: "m", name: "Meters (m)" },
      { id: "cm", name: "Centimeters (cm)" },
      { id: "mm", name: "Millimeters (mm)" },
      { id: "km", name: "Kilometers (km)" },
      { id: "in", name: "Inches (in)" },
      { id: "ft", name: "Feet (ft)" },
      { id: "yd", name: "Yards (yd)" },
      { id: "mi", name: "Miles (mi)" },
    ],
  },
  {
    id: "weight",
    name: "Weight & Mass",
    icon: "⚖️",
    units: [
      { id: "kg", name: "Kilograms (kg)" },
      { id: "g", name: "Grams (g)" },
      { id: "mg", name: "Milligrams (mg)" },
      { id: "lb", name: "Pounds (lbs)" },
      { id: "oz", name: "Ounces (oz)" },
      { id: "st", name: "Stones (st)" },
    ],
  },
  {
    id: "temperature",
    name: "Temperature",
    icon: "🌡️",
    units: [
      { id: "c", name: "Celsius (°C)" },
      { id: "f", name: "Fahrenheit (°F)" },
      { id: "k", name: "Kelvin (K)" },
    ],
  },
  {
    id: "speed",
    name: "Speed",
    icon: "🚀",
    units: [
      { id: "m_s", name: "Meters / second (m/s)" },
      { id: "km_h", name: "Kilometers / hour (km/h)" },
      { id: "mph", name: "Miles per hour (mph)" },
      { id: "knot", name: "Knots (kt)" },
    ],
  },
  {
    id: "area",
    name: "Area",
    icon: "📐",
    units: [
      { id: "sq_m", name: "Square Meters (m²)" },
      { id: "sq_cm", name: "Square Centimeters (cm²)" },
      { id: "sq_km", name: "Square Kilometers (km²)" },
      { id: "sq_in", name: "Square Inches (in²)" },
      { id: "sq_ft", name: "Square Feet (ft²)" },
      { id: "acre", name: "Acres (ac)" },
      { id: "hectare", name: "Hectares (ha)" },
    ],
  },
  {
    id: "volume",
    name: "Volume",
    icon: "🧪",
    units: [
      { id: "l", name: "Liters (L)" },
      { id: "ml", name: "Milliliters (mL)" },
      { id: "m3", name: "Cubic Meters (m³)" },
      { id: "gal", name: "Gallons (gal)" },
      { id: "qt", name: "Quarts (qt)" },
      { id: "cup", name: "Cups (cup)" },
      { id: "fl_oz", name: "Fluid Ounces (fl oz)" },
    ],
  },
  {
    id: "data",
    name: "Data Storage",
    icon: "💾",
    units: [
      { id: "byte", name: "Bytes (B)" },
      { id: "kb", name: "Kilobytes (KB)" },
      { id: "mb", name: "Megabytes (MB)" },
      { id: "gb", name: "Gigabytes (GB)" },
      { id: "tb", name: "Terabytes (TB)" },
    ],
  },
];

export default function UnitConverterWidget() {
  const [activeCat, setActiveCat] = useState<PropertyCategory>(UNIT_CATEGORIES[0]);
  const [fromUnit, setFromUnit] = useState<string>(UNIT_CATEGORIES[0].units[0].id);
  const [toUnit, setToUnit] = useState<string>(UNIT_CATEGORIES[0].units[1].id);
  const [inputValue, setInputValue] = useState<number>(1);

  const results = convertUnits(activeCat.id, fromUnit, toUnit, inputValue);

  const formatNumber = (val: number) => {
    if (val === 0) return "0";
    if (Math.abs(val) < 0.0001 || Math.abs(val) > 100000000) {
      return val.toExponential(4);
    }
    return Number(val.toFixed(5)).toString(); // strip trailing zeros
  };

  const handleCategoryChange = (cat: PropertyCategory) => {
    setActiveCat(cat);
    setFromUnit(cat.units[0].id);
    setToUnit(cat.units[1].id);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Get other equivalents for the Equivalents list
  const getOtherEquivalents = () => {
    return activeCat.units.map((unit) => {
      const equiv = convertUnits(activeCat.id, fromUnit, unit.id, inputValue);
      return {
        unitId: unit.id,
        name: unit.name,
        value: equiv,
      };
    });
  };

  const otherEquivalents = getOtherEquivalents();

  return (
    <div id="converter-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      
      {/* Property categories horizontal drawer bar */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto scrollbar-none no-scrollbar">
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat)}
            className={`whitespace-nowrap px-5 py-4 text-xs font-semibold flex items-center space-x-1.5 border-b-2 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer ${
              activeCat.id === cat.id
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50/10"
                : "border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200"
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUTS COLUMN */}
        <div className="lg:col-span-5 space-y-5">
          <h3 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
            CONVERT QUANTITY
          </h3>

          <div className="space-y-4">
            {/* Value parameter */}
            <div>
              <label htmlFor="convert-value-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Enter Value to Convert
              </label>
              <input
                type="number"
                id="convert-value-input"
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                value={inputValue === 0 ? "" : inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
              />
            </div>

            {/* From unit */}
            <div>
              <label htmlFor="convert-from-unit" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                From Unit
              </label>
              <select
                id="convert-from-unit"
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {activeCat.units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center py-1">
              <button
                onClick={handleSwap}
                title="Swap Units"
                className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 active:scale-95 transition-all text-xs font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <span>⇅ Swap Units</span>
              </button>
            </div>

            {/* To unit */}
            <div>
              <label htmlFor="convert-to-unit" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                To Unit
              </label>
              <select
                id="convert-to-unit"
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 py-2.5 px-3 text-zinc-900 dark:text-zinc-100 focus:border-emerald-500 focus:bg-white focus:outline-hidden sm:text-sm"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {activeCat.units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* OUTPUT ANALYSIS */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-zinc-50 dark:bg-zinc-900/40 p-6 md:p-8 rounded-xl border border-zinc-100 dark:border-zinc-800">
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              CONVERTED RESULTS
            </h4>

            {/* BIG RESULT VALUE */}
            <div className="bg-white dark:bg-zinc-850 p-6 rounded-xl border border-zinc-100 dark:border-zinc-800 text-left space-y-2">
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-sans">
                {inputValue === 0 ? "0" : inputValue} {activeCat.units.find(u => u.id === fromUnit)?.name} =
              </p>
              <p className="text-3xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-sans tracking-tight break-all">
                {formatNumber(results)} <span className="text-lg font-medium text-zinc-500 dark:text-zinc-400">{activeCat.units.find(u => u.id === toUnit)?.name}</span>
              </p>
            </div>

            {/* EQUIVALENCE PANEL LIST */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                Alternative Equivalences In {activeCat.name}
              </p>
              
              <div className="max-h-48 overflow-y-auto divide-y divide-zinc-200 dark:divide-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pr-1">
                {otherEquivalents.map((equiv) => (
                  <div key={equiv.unitId} className={`flex justify-between items-center px-4 py-2.5 text-xs ${equiv.unitId === toUnit ? "bg-emerald-50/30 dark:bg-emerald-950/10" : ""}`}>
                    <span className="text-zinc-500 dark:text-zinc-400">{equiv.name}</span>
                    <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {formatNumber(equiv.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-4 mt-4 text-center text-[11px] text-zinc-400 dark:text-zinc-500">
            * All conversion scalars comply precisely with contemporary NIST and SI international systems.
          </div>

        </div>

      </div>

    </div>
  );
}

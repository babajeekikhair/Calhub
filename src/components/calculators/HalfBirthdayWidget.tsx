import React, { useState, useEffect, useRef } from "react";
import { 
  Calendar, Clock, Sparkles, Cake, Gift, Copy, Check, Info, RotateCw, HelpCircle, ChevronRight, CalendarCheck, MapPin, Smile, Send
} from "lucide-react";

interface FutureHalfBirthday {
  date: Date;
  age: number;
  dayOfWeek: string;
}

const ZODIAC_SIGNS = [
  { name: "Capricorn", start: [12, 22], end: [1, 19], opposite: "Cancer" },
  { name: "Aquarius", start: [1, 20], end: [2, 18], opposite: "Leo" },
  { name: "Pisces", start: [2, 19], end: [3, 20], opposite: "Virgo" },
  { name: "Aries", start: [3, 21], end: [4, 19], opposite: "Libra" },
  { name: "Taurus", start: [4, 20], end: [5, 20], opposite: "Scorpio" },
  { name: "Gemini", start: [5, 21], end: [6, 20], opposite: "Sagittarius" },
  { name: "Cancer", start: [6, 21], end: [7, 22], opposite: "Capricorn" },
  { name: "Leo", start: [7, 23], end: [8, 22], opposite: "Aquarius" },
  { name: "Virgo", start: [8, 23], end: [9, 22], opposite: "Pisces" },
  { name: "Libra", start: [9, 23], end: [10, 22], opposite: "Aries" },
  { name: "Scorpio", start: [10, 23], end: [11, 21], opposite: "Taurus" },
  { name: "Sagittarius", start: [11, 22], end: [12, 21], opposite: "Gemini" }
];

export default function HalfBirthdayWidget() {
  const [birthDateInput, setBirthDateInput] = useState("1998-10-15");
  const [copied, setCopied] = useState(false);
  const [ticks, setTicks] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [tickingActual, setTickingActual] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate half-birthday date details
  const getHalfBirthdayDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const birthDate = new Date(dateStr + "T00:00:00");
    if (isNaN(birthDate.getTime())) return null;

    const month = birthDate.getMonth(); // 0-11
    const day = birthDate.getDate();
    const year = birthDate.getFullYear();

    // Shift by 6 calendar months
    const targetMonth = (month + 6) % 12;
    const targetYearOffset = Math.floor((month + 6) / 12);
    const targetYear = year + targetYearOffset;

    // Correct for end of month boundaries (e.g., Aug 31 -> Feb 28/29)
    const lastDayOfTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    const targetDay = Math.min(day, lastDayOfTargetMonth);

    return new Date(targetYear, targetMonth, targetDay, 0, 0, 0);
  };

  // Get next occurrence of the half-birthday date
  const getNextHalfBirthdayOccurrence = (dateStr: string): Date | null => {
    const originalHalf = getHalfBirthdayDate(dateStr);
    if (!originalHalf) return null;

    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Create half birthday for this calendar year
    const halfBaseThisYear = new Date(currentYear, originalHalf.getMonth(), originalHalf.getDate(), 0, 0, 0);

    if (halfBaseThisYear.getTime() >= today.getTime()) {
      return halfBaseThisYear;
    } else {
      // It has already passed this year, get next year's occurrence
      return new Date(currentYear + 1, originalHalf.getMonth(), originalHalf.getDate(), 0, 0, 0);
    }
  };

  // Get next occurrence of actual birthday
  const getNextActualBirthdayOccurrence = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const birthDate = new Date(dateStr + "T00:00:00");
    if (isNaN(birthDate.getTime())) return null;

    const today = new Date();
    const currentYear = today.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();

    const bdayThisYear = new Date(currentYear, birthMonth, birthDay, 0, 0, 0);
    if (bdayThisYear.getTime() >= today.getTime()) {
      return bdayThisYear;
    } else {
      return new Date(currentYear + 1, birthMonth, birthDay, 0, 0, 0);
    }
  };

  // Compute exact decimal age expected on the next half birthday
  const getAgeOnHalfBirthday = (dateStr: string, halfDate: Date): number => {
    if (!dateStr || !halfDate) return 0;
    const birthDate = new Date(dateStr + "T00:00:00");
    if (isNaN(birthDate.getTime())) return 0;

    const yearsDiff = halfDate.getFullYear() - birthDate.getFullYear();
    
    // Determine month relative position to know if birthday already passed in that year
    const birthMonth = birthDate.getMonth();
    const halfMonth = halfDate.getMonth();

    if (halfMonth > birthMonth) {
      return yearsDiff + 0.5;
    } else {
      return yearsDiff - 0.5;
    }
  };

  // Generate future timeline list
  const getFutureTimeline = (dateStr: string, limit = 10): FutureHalfBirthday[] => {
    const timeline: FutureHalfBirthday[] = [];
    const originalHalf = getHalfBirthdayDate(dateStr);
    if (!originalHalf) return timeline;

    const today = new Date();
    let currentYear = today.getFullYear();

    // Find the next half-birthday year
    const halfThisYear = new Date(currentYear, originalHalf.getMonth(), originalHalf.getDate(), 0, 0, 0);
    let startYear = currentYear;
    if (halfThisYear.getTime() < today.getTime()) {
      startYear = currentYear + 1;
    }

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 0; i < limit; i++) {
      const year = startYear + i;
      const hbDate = new Date(year, originalHalf.getMonth(), originalHalf.getDate(), 0, 0, 0);
      const age = getAgeOnHalfBirthday(dateStr, hbDate);
      timeline.push({
        date: hbDate,
        age: age,
        dayOfWeek: weekdays[hbDate.getDay()]
      });
    }

    return timeline;
  };

  // Helper to determine Zodiac Sign name
  const getZodiacSign = (dateStr: string): string => {
    if (!dateStr) return "Unknown";
    const birthDate = new Date(dateStr + "T00:00:00");
    if (isNaN(birthDate.getTime())) return "Unknown";

    const month = birthDate.getMonth() + 1; // 1-12
    const day = birthDate.getDate();

    for (const z of ZODIAC_SIGNS) {
      const [sm, sd] = z.start;
      const [em, ed] = z.end;

      if (month === sm && day >= sd) return z.name;
      if (month === em && day <= ed) return z.name;
    }

    // Wrap-around for late December/early January
    return "Capricorn";
  };

  const getOppositeZodiac = (signName: string): string => {
    const match = ZODIAC_SIGNS.find(z => z.name.toLowerCase() === signName.toLowerCase());
    return match ? match.opposite : "Unknown";
  };

  // Live timer tick hook
  useEffect(() => {
    const updateCountdown = () => {
      const nextHalf = getNextHalfBirthdayOccurrence(birthDateInput);
      const nextActual = getNextActualBirthdayOccurrence(birthDateInput);
      const today = new Date();

      if (nextHalf) {
        const diffMs = nextHalf.getTime() - today.getTime();
        if (diffMs > 0) {
          // Calculate breakdown
          const secondsTotal = Math.floor(diffMs / 1000);
          const minutesTotal = Math.floor(secondsTotal / 60);
          const hoursTotal = Math.floor(minutesTotal / 60);
          const daysTotal = Math.floor(hoursTotal / 24);

          // Get exact months estimation if we want, or rely on clean relative countdown
          const yearsDiff = nextHalf.getFullYear() - today.getFullYear();
          let monthsDiff = nextHalf.getMonth() - today.getMonth();
          let daysLeft = nextHalf.getDate() - today.getDate();

          if (daysLeft < 0) {
            monthsDiff -= 1;
            // Get days in previous month
            const prevMonthDate = new Date(nextHalf.getFullYear(), nextHalf.getMonth(), 0);
            daysLeft += prevMonthDate.getDate();
          }

          const finalMonths = (yearsDiff * 12 + monthsDiff) % 12;

          setTicks({
            months: Math.max(0, finalMonths),
            days: Math.max(0, daysLeft),
            hours: hoursTotal % 24,
            minutes: minutesTotal % 60,
            seconds: secondsTotal % 60
          });
        }
      }

      if (nextActual) {
        const diffActualMs = nextActual.getTime() - today.getTime();
        if (diffActualMs > 0) {
          const secondsTotal = Math.floor(diffActualMs / 1000);
          const minutesTotal = Math.floor(secondsTotal / 60);
          const hoursTotal = Math.floor(minutesTotal / 60);
          const daysTotal = Math.floor(hoursTotal / 24);

          setTickingActual({
            months: Math.floor(daysTotal / 30.44), // rough
            days: daysTotal % 30,
            hours: hoursTotal % 24,
            minutes: minutesTotal % 60,
            seconds: secondsTotal % 60
          });
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [birthDateInput]);

  const originalHalfDate = getHalfBirthdayDate(birthDateInput);
  const nextHalfDate = getNextHalfBirthdayOccurrence(birthDateInput);
  const zodiac = getZodiacSign(birthDateInput);
  const oppositeZodiac = getOppositeZodiac(zodiac);
  const ageOnNext = nextHalfDate ? getAgeOnHalfBirthday(birthDateInput, nextHalfDate) : 0;
  const timeline = getFutureTimeline(birthDateInput, 8);

  const formattedHalfDate = originalHalfDate ? originalHalfDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric"
  }) : "";

  const handleShare = () => {
    if (!formattedHalfDate) return;
    const textToCopy = `🎉 My exact Half Birthday is on ${formattedHalfDate}! On my next occurrence, I will be exactly ${ageOnNext} years old. Celebrate with me! 🍰 Compute yours on CalcHub!`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8" id="half-birthday-calculator">
      {/* Informational Hero Policy & Intent Banner */}
      <div className="bg-blue-50/50 dark:bg-blue-950/10 border-l-4 border-blue-500 p-4 rounded-r-xl">
        <div className="flex space-x-3">
          <CalendarCheck className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed font-sans">
            <strong>Half Birthday Scientific Calculator:</strong> Your exact half-birthday corresponds to the precise calendar seasonal antipode (six calendar months offset). Perfect for setting half-milestones, scheduling holiday-adjacent birthdays offset parties, and tracking precise fractional decimal years.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-805 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          {/* Input birthday field */}
          <div className="space-y-2">
            <label htmlFor="birthdate-field" className="text-xs font-bold text-slate-800 dark:text-zinc-200 block">
              Enter My Exact Birthday Date
            </label>
            <div className="relative">
              <input
                id="birthdate-field"
                type="date"
                value={birthDateInput}
                onChange={(e) => {
                  if (e.target.value) setBirthDateInput(e.target.value);
                }}
                className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3.5 text-xs md:text-sm text-slate-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-blue-500/10 focus:outline-hidden transition-all font-sans font-semibold cursor-pointer"
              />
            </div>
            <p className="text-[10px] text-slate-450 dark:text-zinc-500">
              Input birth day to project corresponding half-year dates. Values are calculated local sandbox client-side.
            </p>
          </div>

          {/* Quick Details Badge Overview */}
          {originalHalfDate && (
            <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/50 border border-slate-150 dark:border-zinc-850 rounded-xl flex flex-col justify-between">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-slate-400 dark:text-zinc-500 uppercase font-bold block">
                  ANNUAL HALF BIRTHDAY CALENDAR DATE
                </span>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-sans tracking-tight">
                  {formattedHalfDate}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-zinc-850/80 mt-2">
                <div className="text-xs">
                  <span className="text-slate-400 block text-[10px]">NEXT AGE LEVEL</span>
                  <span className="font-bold text-slate-700 dark:text-zinc-300">{ageOnNext} Years Old</span>
                </div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied Announcement!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Share My Half Birthday</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {originalHalfDate && nextHalfDate && (
        <>
          {/* COUNTDOWNS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {/* Countdown 1: Next Half Birthday */}
            <div className="p-5 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-950/10 dark:to-indigo-950/10 border border-blue-500/15 rounded-2xl relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-15">
                <Clock className="w-16 h-16 text-blue-500" />
              </div>
              <div className="space-y-3 relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-500 text-white p-1 rounded-md text-xs">
                    <Clock className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[9.5px] font-mono tracking-wider font-extrabold text-blue-500 uppercase block">LIVE ANTIPODE TIMELINE</span>
                    <h4 className="text-xs font-black text-slate-900 dark:text-zinc-100">
                      Countdown to Next Half Birthday
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-1 pt-2 text-center">
                  <div className="bg-white/80 dark:bg-zinc-900/90 rounded-md p-1.5 border border-blue-500/5">
                    <span className="block text-base md:text-lg font-black font-mono text-blue-600 dark:text-blue-400 leading-none">
                      {ticks.months}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase">Mth</span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-900/90 rounded-md p-1.5 border border-blue-500/5">
                    <span className="block text-base md:text-lg font-black font-mono text-blue-600 dark:text-blue-400 leading-none">
                      {ticks.days}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase">Days</span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-900/90 rounded-md p-1.5 border border-blue-500/5">
                    <span className="block text-base md:text-lg font-black font-mono text-blue-600 dark:text-blue-400 leading-none">
                      {String(ticks.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase">Hrs</span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-900/90 rounded-md p-1.5 border border-blue-500/5">
                    <span className="block text-base md:text-lg font-black font-mono text-blue-600 dark:text-blue-400 leading-none">
                      {String(ticks.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase">Min</span>
                  </div>
                  <div className="bg-white/80 dark:bg-zinc-900/90 rounded-md p-1.5 border border-blue-500/5 animate-pulse">
                    <span className="block text-base md:text-lg font-black font-mono text-indigo-500 dark:text-indigo-400 leading-none">
                      {String(ticks.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase">Sec</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                  Target Date: <strong className="text-slate-700 dark:text-zinc-200">{nextHalfDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</strong> (Exact decimal target: <strong className="text-blue-600 dark:text-blue-400">{ageOnNext}</strong>).
                </p>
              </div>
            </div>

            {/* Countdown 2: Next Actual Birthday */}
            <div className="p-5 bg-slate-50 dark:bg-zinc-950 border border-slate-150 dark:border-zinc-850 rounded-2xl relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-15">
                <Cake className="w-16 h-16 text-slate-300" />
              </div>
              <div className="space-y-3 relative z-10">
                <div className="flex items-center space-x-2">
                  <span className="bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 p-1 rounded-md text-xs">
                    <Cake className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[9.5px] font-mono tracking-wider font-extrabold text-slate-400 uppercase block">CORE NATIVE BIRTHDAY</span>
                    <h4 className="text-xs font-black text-slate-900 dark:text-zinc-100">
                      Countdown to Regular Birthday
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-1 pt-2 text-center text-slate-500 dark:text-zinc-400">
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-1.5 border border-slate-100 dark:border-zinc-800">
                    <span className="block text-base md:text-lg font-black font-mono text-slate-700 dark:text-zinc-350 leading-none">
                      {tickingActual.months}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase font-semibold">Mth</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-1.5 border border-slate-100 dark:border-zinc-800">
                    <span className="block text-base md:text-lg font-black font-mono text-slate-700 dark:text-zinc-350 leading-none">
                      {tickingActual.days}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase font-semibold">Days</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-1.5 border border-slate-100 dark:border-zinc-800">
                    <span className="block text-base md:text-lg font-black font-mono text-slate-700 dark:text-zinc-350 leading-none">
                      {String(tickingActual.hours).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase font-semibold">Hrs</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-1.5 border border-slate-100 dark:border-zinc-800">
                    <span className="block text-base md:text-lg font-black font-mono text-slate-700 dark:text-zinc-350 leading-none">
                      {String(tickingActual.minutes).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase font-semibold">Min</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 rounded-md p-1.5 border border-slate-100 dark:border-zinc-800">
                    <span className="block text-base md:text-lg font-black font-mono text-slate-700 dark:text-zinc-350 leading-none">
                      {String(tickingActual.seconds).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] text-slate-400 block font-mono font-bold mt-1 uppercase font-semibold">Sec</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                  Target Date: <strong className="text-slate-600 dark:text-zinc-300">
                    {getNextActualBirthdayOccurrence(birthDateInput)?.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </strong> (Next actual full-age year tier target).
                </p>
              </div>
            </div>
          </div>

          {/* ASTROLOGICAL ALIGNMENTS SECTION */}
          <div className="p-6 bg-slate-50/50 dark:bg-zinc-950/50 border border-slate-150 dark:border-zinc-850 rounded-2xl text-left space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-indigo-500 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Celestial Antipode: Polar Opposites</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-sans">
              Because your half-birthday lies exactly 180 degrees (6 months) away relative to the sun, your half-birthday always takes place under the <strong>astrological opposite sign</strong> of your original zodiac!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Original Sideral Sign */}
              <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-slate-150 dark:bg-zinc-800 flex items-center justify-center text-xl">
                  🌙
                </span>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold block">Birthday Zodiac Sign</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">{zodiac}</span>
                </div>
              </div>

              {/* Polar Opposite Sign */}
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-105-0 dark:border-blue-900/20 flex items-center space-x-3">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center text-xl">
                  ☀️
                </span>
                <div>
                  <span className="text-[9px] text-blue-500 uppercase tracking-widest font-mono font-bold block">Half Birthday Zodiac Antipode</span>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-400">{oppositeZodiac} (Polar Opposite)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 10-YEAR MILESTONE TIMELINE */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-805 rounded-2xl p-6 shadow-xs text-left space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-zinc-815 pb-3">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-blue-500 uppercase font-bold block">HISTORICAL PROJECTION matrix</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Your Future Half Birthdays (Next 8 Occurrences)</span>
                </h4>
              </div>
              <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full">
                Weekend planner mapping
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-150 dark:border-zinc-800/80 text-slate-400 dark:text-zinc-500 font-mono text-[10px] uppercase font-bold">
                    <th className="py-2.5">Occurrence Year</th>
                    <th className="py-2.5">Calendar Date</th>
                    <th className="py-2.5">Day of Week</th>
                    <th className="py-2.5 text-right">Decimal Age Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-zinc-850">
                  {timeline.map((item, idx) => {
                    const isWeekend = item.dayOfWeek === "Saturday" || item.dayOfWeek === "Sunday";
                    return (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-zinc-950/30 transition-colors">
                        <td className="py-3 font-semibold font-mono text-slate-700 dark:text-zinc-300">
                          {item.date.getFullYear()}
                        </td>
                        <td className="py-3 text-slate-900 dark:text-white font-medium">
                          {item.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </td>
                        <td className="py-3">
                          <span className={`${isWeekend ? "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 font-bold px-2 py-0.5 rounded-md" : "text-slate-600 dark:text-zinc-400"}`}>
                            {item.dayOfWeek} {isWeekend && "🎉"}
                          </span>
                        </td>
                        <td className="py-3 text-right font-bold text-blue-600 dark:text-blue-400 font-mono">
                          {item.age}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* CELEB IDEAS & TIPS (Rich material Content for high UX engagement and AdSense value) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {/* Party Ideas */}
            <div className="p-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-805 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                <Gift className="w-4 h-4 text-emerald-500" />
                <span>How to Celebrate your Half Birthday?</span>
              </h4>
              <ul className="text-xs text-slate-600 dark:text-zinc-455 space-y-2.5 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 select-none mt-0.5">•</span>
                  <span><strong>The Half-Slice Cake:</strong> Bake or buy a regular birthday cake, cut it directly in half, and stack them or serve the single semisphere to emphasize the 0.5 theme!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 select-none mt-0.5">•</span>
                  <span><strong>Opposite Costumes Party:</strong> Because your zodiac is the polar opposite, throw a party representing your polar qualities or dressed as your opposite self.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 select-none mt-0.5">•</span>
                  <span><strong>Mid-Year Review check-ins:</strong> Use it as a personal day to review your real New Year resolutions or birthday resolutions, celebrating what you have achieved so far.</span>
                </li>
              </ul>
            </div>

            {/* Why Celebrate */}
            <div className="p-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-805 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-blue-600 dark:text-blue-400 flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-blue-500" />
                <span>Why do people use this calculator?</span>
              </h4>
              <ul className="text-xs text-slate-600 dark:text-zinc-455 space-y-2.5 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 select-none mt-0.5">•</span>
                  <span><strong>Holiday Offsetters:</strong> Children born on Christmas Eve, Thanksgiving, or early July often miss standard classmates parties. Celebrating 6 months away solves scheduling conflicts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 select-none mt-0.5">•</span>
                  <span><strong>Young Milestones:</strong> Parents celebrating the exact age milestones of toddlers (e.g. 1.5, 2.5 years old) to record precise height and weight curves.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 select-none mt-0.5">•</span>
                  <span><strong>Spaced Fun:</strong> Simply because life is short and sharing positive moments with friends twice a year is a wonderful way to express gratitude!</span>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

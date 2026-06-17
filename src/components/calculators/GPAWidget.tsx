import React, { useState } from "react";
import { calculateGPA, CourseInput } from "../../utils/calculations";

export default function GPAWidget() {
  const [courses, setCourses] = useState<CourseInput[]>([
    { name: "Mathematics 101", grade: "A", credits: 4 },
    { name: "Physics Lab & Theory", grade: "B+", credits: 4 },
    { name: "English Literature", grade: "A-", credits: 3 },
    { name: "Intro to Algorithms", grade: "A", credits: 3 },
  ]);

  const results = calculateGPA(courses);

  const handleGradeChange = (index: number, gradValue: string) => {
    const updated = [...courses];
    updated[index].grade = gradValue;
    setCourses(updated);
  };

  const handleCreditsChange = (index: number, creds: number) => {
    const updated = [...courses];
    updated[index].credits = creds;
    setCourses(updated);
  };

  const handleNameChange = (index: number, name: string) => {
    const updated = [...courses];
    updated[index].name = name;
    setCourses(updated);
  };

  const addCourseRow = () => {
    setCourses([...courses, { name: "", grade: "A", credits: 3 }]);
  };

  const removeCourseRow = (index: number) => {
    if (courses.length === 1) {
      setCourses([{ name: "", grade: "A", credits: 3 }]);
    } else {
      setCourses(courses.filter((_, i) => i !== index));
    }
  };

  const clearAllCourses = () => {
    setCourses([{ name: "", grade: "A", credits: 3 }]);
  };

  return (
    <div id="gpa-calc-widget" className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* INPUT PANEL COURSE ROW CREATOR (Left side 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
              Course Transcript Rows
            </h3>
            <button
              onClick={clearAllCourses}
              className="text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 cursor-pointer"
            >
              Clear All Rows
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {courses.map((course, idx) => (
              <div 
                key={idx} 
                className="grid grid-cols-12 gap-2 bg-zinc-50 dark:bg-zinc-805/50 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800 relative group items-center"
              >
                {/* Course Name */}
                <div className="col-span-6 md:col-span-7">
                  <input
                    type="text"
                    aria-label={`Course ${idx + 1} Name`}
                    className="block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-1.5 px-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:outline-hidden"
                    placeholder={`e.g. Science Course ${idx + 1}`}
                    value={course.name}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                  />
                </div>

                {/* Grade Option Selection */}
                <div className="col-span-3 md:col-span-2">
                  <select
                    aria-label={`Course ${idx + 1} Grade`}
                    className="block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-1.5 px-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:outline-hidden"
                    value={course.grade}
                    onChange={(e) => handleGradeChange(idx, e.target.value)}
                  >
                    {["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"].map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                {/* Credit Hours Select */}
                <div className="col-span-2 select-credits-credits">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    aria-label={`Course ${idx + 1} Credits`}
                    className="block w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-1.5 px-2 text-xs text-center text-zinc-900 dark:text-zinc-100 focus:border-blue-500 focus:outline-hidden"
                    value={course.credits || ""}
                    onChange={(e) => handleCreditsChange(idx, Math.max(1, Number(e.target.value)))}
                  />
                </div>

                {/* Delete course row */}
                <div className="col-span-1 text-center justify-self-center">
                  <button
                    onClick={() => removeCourseRow(idx)}
                    className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 text-sm font-bold cursor-pointer"
                    title="Remove Class Row"
                  >
                    ×
                  </button>
                </div>

              </div>
            ))}
          </div>

          <button
            onClick={addCourseRow}
            className="w-full text-center py-2.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-50/10 dark:bg-blue-950/15 border border-dashed border-blue-300 dark:border-blue-900 rounded-lg transition-colors cursor-pointer"
          >
            + Add Another Course Row
          </button>
        </div>

        {/* CUMULATIVE SCORE DISPLAY PANEL (Right side 5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-50 dark:bg-zinc-900/40 p-6 md:p-8 rounded-xl border border-slate-200">
          
          <div className="space-y-6">
            <h4 className="text-sm font-semibold tracking-wider text-slate-505 dark:text-zinc-400 uppercase font-sans">
              DEVELOPMENTAL GRADE AVERAGE
            </h4>

            {/* BIG GPA VALUE DISPLAY */}
            <div className="text-center bg-white dark:bg-zinc-905 p-6 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-xs flex flex-col items-center justify-center space-y-3">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block">CUMULATIVE GPA</span>
              <p className="text-6xl font-black text-blue-600 dark:text-blue-400 font-sans tracking-tight">
                {results.gpa.toFixed(2)}
              </p>
              
              {/* Progress scale indicator bar */}
              <div className="w-full h-2 bg-slate-200 dark:bg-zinc-850 rounded-full overflow-hidden relative">
                <div 
                  style={{ width: `${(results.gpa / 4.0) * 100}%` }} 
                  className="h-full bg-blue-600 transition-all duration-300"
                />
              </div>

              <span className="text-xs font-bold text-zinc-500">
                {results.gpa >= 3.5 ? "Dean's List Status Equivalent" : results.gpa >= 3.0 ? "Solid Standing Score" : "Passing Standing"}
              </span>
            </div>

            {/* QUICK STATS COLUMN */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800 rounded-lg text-left">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Attempted Credits</span>
                <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-1 font-mono">
                  {results.totalCredits}
                </p>
              </div>

              <div className="p-3 bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/50 dark:border-zinc-800 rounded-lg text-left">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-semibold">Recorded Courses</span>
                <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-1 font-mono">
                  {results.validCoursesCount}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-4 mt-4 text-center text-[10px] text-zinc-400 dark:text-zinc-500 uppercase font-bold tracking-widest leading-normal">
            * This system processes weights strictly relative to US 4.0 weighted scholastic tables.
          </div>

        </div>

      </div>

    </div>
  );
}

// pure mathematics functions for the calculator hub

/**
 * Monthly or yearly row for Amortization Schedule
 */
export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  remainingBalance: number;
}

/**
 * 1. Mortgage Calculator
 */
export function calculateMortgage(
  homeValue: number,
  downPayment: number,
  interestRateAnnual: number,
  termYears: number,
  propertyTaxYearly: number = 0,
  insuranceYearly: number = 0
) {
  const principal = Math.max(0, homeValue - downPayment);
  const monthlyRate = interestRateAnnual / 100 / 12;
  const totalMonths = termYears * 12;

  let monthlyPI = 0;
  if (principal > 0) {
    if (monthlyRate === 0) {
      monthlyPI = principal / totalMonths;
    } else {
      monthlyPI =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  }

  const monthlyTax = propertyTaxYearly / 12;
  const monthlyInsurance = insuranceYearly / 12;
  const monthlyTotal = monthlyPI + monthlyTax + monthlyInsurance;

  // Let's build amortization table (summarized by year to avoid huge rendering arrays, or monthly if requested)
  const amortizationSchedule: AmortizationYear[] = [];
  let remainingBalance = principal;
  
  for (let year = 1; year <= termYears; year++) {
    let yearPrincipalPaid = 0;
    let yearInterestPaid = 0;
    
    for (let month = 1; month <= 12; month++) {
      const interestForMonth = remainingBalance * monthlyRate;
      const principalForMonth = Math.min(remainingBalance, monthlyPI - interestForMonth);
      
      yearPrincipalPaid += principalForMonth;
      yearInterestPaid += interestForMonth;
      remainingBalance -= principalForMonth;
    }
    
    amortizationSchedule.push({
      year,
      principalPaid: Math.round(yearPrincipalPaid),
      interestPaid: Math.round(yearInterestPaid),
      totalPaid: Math.round(yearPrincipalPaid + yearInterestPaid),
      remainingBalance: Math.max(0, Math.round(remainingBalance)),
    });
  }

  const totalPaymentPI = monthlyPI * totalMonths;
  const totalInterest = Math.max(0, totalPaymentPI - principal);

  return {
    principal,
    monthlyPI: Math.round(monthlyPI * 100) / 100,
    monthlyTax: Math.round(monthlyTax * 100) / 100,
    monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
    monthlyTotal: Math.round(monthlyTotal * 100) / 100,
    totalInterest: Math.round(totalInterest),
    totalPaymentPI: Math.round(totalPaymentPI),
    totalTaxAndInsurance: Math.round((propertyTaxYearly + insuranceYearly) * termYears),
    overallTotalPay: Math.round(totalPaymentPI + (propertyTaxYearly + insuranceYearly) * termYears),
    amortizationSchedule,
  };
}

/**
 * 2. Compound Interest Calculator
 */
export interface CompoundGrowthYear {
  year: number;
  contributions: number;
  interest: number;
  balance: number;
}

export function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  rateAnnual: number,
  years: number,
  compoundingFrequency: number // 1 = Annually, 12 = Monthly, 365 = Daily
) {
  const r = rateAnnual / 100;
  const schedule: CompoundGrowthYear[] = [];
  
  let currentBalance = principal;
  let totalContributions = principal;
  let totalInterestEarned = 0;

  for (let year = 1; year <= years; year++) {
    // We compute compounding month-by-month for realistic visual tracking
    let yearContributions = 0;
    let yearInterest = 0;

    for (let m = 1; m <= 12; m++) {
      // Add monthly contribution
      currentBalance += monthlyContribution;
      yearContributions += monthlyContribution;
      totalContributions += monthlyContribution;

      // Compound interest depending on frequency relative to months
      // If compounding is monthly (12) or daily (365)
      let interestFactor = 0;
      if (compoundingFrequency === 12) {
        interestFactor = r / 12;
      } else if (compoundingFrequency === 365) {
        // Daily compounding during this month (using average 30.4 days)
        interestFactor = Math.pow(1 + r / 365, 30.4375) - 1;
      } else {
        // Compound once a year, so we distribute the compound interest factor or calculate it at month 12
        if (m === 12) {
          // simple single-year compounding factor
          interestFactor = r;
        }
      }

      if (interestFactor > 0) {
        const interestEarned = currentBalance * interestFactor;
        currentBalance += interestEarned;
        yearInterest += interestEarned;
        totalInterestEarned += interestEarned;
      }
    }

    // In case of annual compounding, calculate at the end of the year if not handled
    if (compoundingFrequency === 1 && yearInterest === 0) {
      const yearStartBalance = currentBalance - yearContributions;
      // apply simple r to balance
      const interestEarned = currentBalance * r;
      currentBalance += interestEarned;
      yearInterest = interestEarned;
      totalInterestEarned += interestEarned;
    }

    schedule.push({
      year,
      contributions: Math.round(totalContributions),
      interest: Math.round(totalInterestEarned),
      balance: Math.round(currentBalance),
    });
  }

  return {
    totalContributions: Math.round(totalContributions),
    totalInterestEarned: Math.round(totalInterestEarned),
    futureValue: Math.round(currentBalance),
    schedule,
  };
}

/**
 * 3. BMI (Body Mass Index)
 */
export function calculateBMI(
  weight: number, // in kg or lbs
  height: number, // in cm or inches
  isMetric: boolean
) {
  let bmi = 0;
  let category = "";
  let idealWeightMin = 0;
  let idealWeightMax = 0;

  if (isMetric) {
    // weight in kg, height in cm
    const heightInMeters = height / 100;
    if (heightInMeters > 0) {
      bmi = weight / (heightInMeters * heightInMeters);
      idealWeightMin = 18.5 * (heightInMeters * heightInMeters);
      idealWeightMax = 24.9 * (heightInMeters * heightInMeters);
    }
  } else {
    // weight in lbs, height in inches
    if (height > 0) {
      bmi = (weight / (height * height)) * 703;
      idealWeightMin = (18.5 * (height * height)) / 703;
      idealWeightMax = (24.9 * (height * height)) / 703;
    }
  }

  // Round values
  bmi = Math.round(bmi * 10) / 10;
  idealWeightMin = Math.round(idealWeightMin * 10) / 10;
  idealWeightMax = Math.round(idealWeightMax * 10) / 10;

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal Weight";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  return {
    bmi,
    category,
    idealWeightMin,
    idealWeightMax,
  };
}

/**
 * 4. Date Difference & Age
 */
export function calculateDateDifference(
  date1Str: string,
  date2Str: string,
  includeEndDate: boolean = false
) {
  if (!date1Str || !date2Str) return null;

  const d1 = new Date(date1Str);
  const d2 = new Date(date2Str);

  // Identify earlier and later date
  const start = d1 < d2 ? d1 : d2;
  const end = d1 < d2 ? d2 : d1;

  let totalMs = end.getTime() - start.getTime();
  if (includeEndDate) {
    totalMs += 24 * 60 * 60 * 1000;
  }

  const totalDays = Math.floor(totalMs / (24 * 60 * 60 * 1000));
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysInWeek = totalDays % 7;

  // Year, Month, Day natural calculation
  let sYear = start.getFullYear();
  let sMonth = start.getMonth();
  let sDay = start.getDate();

  const eYear = end.getFullYear();
  const eMonth = end.getMonth();
  let eDay = end.getDate();

  if (includeEndDate) {
    eDay += 1;
    // Handle rolls
    const daysInEndMonth = new Date(eYear, eMonth + 1, 0).getDate();
    if (eDay > daysInEndMonth) {
      eDay = 1;
      // roll month
      // if month rolls past Dec
      const tempDate = new Date(eYear, eMonth + 1, 1);
      // use temp date segments
    }
  }

  // Recalculate year/month/day using calendars
  let yearsDiff = eYear - sYear;
  let monthsDiff = end.getMonth() - start.getMonth();
  let daysDiff = end.getDate() - start.getDate();

  if (includeEndDate) {
    daysDiff += 1;
  }

  if (daysDiff < 0) {
    // Borrow days from previous month
    const prevMonthDate = new Date(end.getFullYear(), end.getMonth(), 0);
    daysDiff += prevMonthDate.getDate();
    monthsDiff -= 1;
  }

  if (monthsDiff < 0) {
    monthsDiff += 12;
    yearsDiff -= 1;
  }

  // Calculate business days (Monday-Friday)
  let businessDays = 0;
  const current = new Date(start);
  const targetEnd = new Date(end);
  if (includeEndDate) {
    targetEnd.setDate(targetEnd.getDate() + 1);
  }

  while (current < targetEnd) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      businessDays++;
    }
    current.setDate(current.getDate() + 1);
  }

  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return {
    years: yearsDiff,
    months: monthsDiff,
    days: daysDiff,
    totalDays,
    weeks: totalWeeks,
    remainingDays: remainingDaysInWeek,
    businessDays,
    dayOfWeekStart: weekdays[d1.getDay()],
    dayOfWeekEnd: weekdays[d2.getDay()],
    totalHours: totalDays * 24,
    totalMinutes: totalDays * 24 * 60,
  };
}

/**
 * 5. Unit Converter lookup structures and calculator
 */
export const CONVERSION_UNITS: Record<string, { name: string; factor: number; isOffset?: boolean; offset?: number }> = {
  // LENGTH (Base: Meter)
  "length-m": { name: "Meters (m)", factor: 1.0 },
  "length-cm": { name: "Centimeters (cm)", factor: 0.01 },
  "length-mm": { name: "Millimeters (mm)", factor: 0.001 },
  "length-km": { name: "Kilometers (km)", factor: 1000.0 },
  "length-in": { name: "Inches (in)", factor: 0.0254 },
  "length-ft": { name: "Feet (ft)", factor: 0.3048 },
  "length-yd": { name: "Yards (yd)", factor: 0.9144 },
  "length-mi": { name: "Miles (mi)", factor: 1609.344 },

  // WEIGHT / MASS (Base: Kilogram)
  "weight-kg": { name: "Kilograms (kg)", factor: 1.0 },
  "weight-g": { name: "Grams (g)", factor: 0.001 },
  "weight-mg": { name: "Milligrams (mg)", factor: 0.000001 },
  "weight-lb": { name: "Pounds (lbs)", factor: 0.45359237 },
  "weight-oz": { name: "Ounces (oz)", factor: 0.028349523 },
  "weight-st": { name: "Stones (st)", factor: 6.35029318 },

  // SPEED (Base: m/s)
  "speed-m_s": { name: "Meters per second (m/s)", factor: 1.0 },
  "speed-km_h": { name: "Kilometers per hour (km/h)", factor: 0.27777778 },
  "speed-mph": { name: "Miles per hour (mph)", factor: 0.44704 },
  "speed-knot": { name: "Knots (kt)", factor: 0.514444 },

  // AREA (Base: Square Meter)
  "area-sq_m": { name: "Square Meters (m²)", factor: 1.0 },
  "area-sq_cm": { name: "Square Centimeters (cm²)", factor: 0.0001 },
  "area-sq_km": { name: "Square Kilometers (km²)", factor: 1000000.0 },
  "area-sq_in": { name: "Square Inches (in²)", factor: 0.00064516 },
  "area-sq_ft": { name: "Square Feet (ft²)", factor: 0.09290304 },
  "area-acre": { name: "Acres (ac)", factor: 4046.856422 },
  "area-hectare": { name: "Hectares (ha)", factor: 10000.0 },

  // VOLUME (Base: Liter)
  "volume-l": { name: "Liters (L)", factor: 1.0 },
  "volume-ml": { name: "Milliliters (mL)", factor: 0.001 },
  "volume-m3": { name: "Cubic Meters (m³)", factor: 1000.0 },
  "volume-gal": { name: "Gallons (US gal)", factor: 3.78541178 },
  "volume-qt": { name: "Quarts (US qt)", factor: 0.9463529 },
  "volume-cup": { name: "Cups (US cup)", factor: 0.2365882 },
  "volume-fl_oz": { name: "Fluid Ounces (fl oz)", factor: 0.02957353 },

  // DATA (Base: Byte)
  "data-byte": { name: "Bytes (B)", factor: 1.0 },
  "data-kb": { name: "Kilobytes (KB)", factor: 1000.0 },
  "data-mb": { name: "Megabytes (MB)", factor: 1000000.0 },
  "data-gb": { name: "Gigabytes (GB)", factor: 1000000000.0 },
  "data-tb": { name: "Terabytes (TB)", factor: 1000000000000.0 },
};

export function convertUnits(category: string, fromUnit: string, toUnit: string, value: number): number {
  if (category === "temperature") {
    // Custom non-linear conversions for temperature (Celsius, Fahrenheit, Kelvin)
    let celsius = value;
    if (fromUnit === "f") {
      celsius = ((value - 32) * 5) / 9;
    } else if (fromUnit === "k") {
      celsius = value - 273.15;
    }

    if (toUnit === "c") return celsius;
    if (toUnit === "f") return (celsius * 9) / 5 + 32;
    if (toUnit === "k") return celsius + 273.15;
    return value;
  }

  const fromInfo = CONVERSION_UNITS[`${category}-${fromUnit}`];
  const toInfo = CONVERSION_UNITS[`${category}-${toUnit}`];

  if (!fromInfo || !toInfo) return value;

  // Convert to base, then to target
  const valueInBase = value * fromInfo.factor;
  return valueInBase / toInfo.factor;
}

/**
 * 6. GPA Calculator
 */
export interface CourseInput {
  name: string;
  grade: string; // A, B+, B, etc.
  credits: number;
}

export function calculateGPA(courses: CourseInput[]) {
  const gradePoints: Record<string, number> = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0,
  };

  let totalPoints = 0;
  let totalCredits = 0;
  let validCoursesCount = 0;

  courses.forEach((c) => {
    if (c.grade in gradePoints && c.credits > 0) {
      totalPoints += gradePoints[c.grade] * c.credits;
      totalCredits += c.credits;
      validCoursesCount++;
    }
  });

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0.0;

  return {
    gpa: Math.round(gpa * 100) / 100,
    totalCredits,
    validCoursesCount,
  };
}

/**
 * 7. Percentage Arithmetic
 */
export function calculatePercentageOf(percent: number, baseValue: number): number {
  return (percent / 100) * baseValue;
}

export function calculateWhatPercentValue(x: number, y: number): number {
  if (y === 0) return 0;
  return (x / y) * 100;
}

export function calculatePercentageChange(original: number, current: number): { percent: number; isIncrease: boolean } {
  if (original === 0) return { percent: 0, isIncrease: true };
  const diff = current - original;
  const percent = (diff / original) * 100;
  return {
    percent: Math.round(Math.abs(percent) * 100) / 100,
    isIncrease: diff >= 0,
  };
}

/**
 * 8. BMR and Calorie Needs
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  ageYears: number,
  gender: "male" | "female",
  activityLevel: string
) {
  let bmr = 0;

  // Mifflin-St Jeor
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
  }

  const activityFactors: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const factor = activityFactors[activityLevel] || 1.2;
  const tdee = bmr * factor;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    loseWeightCal: Math.round(tdee - 450), // Healthy weight loss calorie target
    gainWeightCal: Math.round(tdee + 450), // Healthy weight gain calorie target
  };
}

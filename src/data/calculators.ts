import { CategoryInfo, CalculatorMetadata } from "../types";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "financial",
    name: "Financial",
    description: "Mortgage payments, loans, compounding interest, savings, salary, tips, taxes, and investments.",
    icon: "DollarSign",
    color: "text-blue-600 dark:text-blue-400 font-sans font-medium tracking-tight",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-100 dark:border-blue-900/30",
  },
  {
    id: "math",
    name: "Mathematics",
    description: "Percentages, fractions, statistics, algebra, geometry, equations, and advanced scientific functions.",
    icon: "Percent",
    color: "text-indigo-600 dark:text-indigo-400 font-sans font-medium tracking-tight",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
    borderColor: "border-indigo-100 dark:border-indigo-900/30",
  },
  {
    id: "health",
    name: "Health & Fitness",
    description: "BMI, basal metabolic rate (BMR), calorie needs, body fat percent, macronutrients, and pregnancy.",
    icon: "Activity",
    color: "text-rose-600 dark:text-rose-400 font-sans font-medium tracking-tight",
    bgColor: "bg-rose-50 dark:bg-rose-950/30",
    borderColor: "border-rose-100 dark:border-rose-900/30",
  },
  {
    id: "date-time",
    name: "Date & Time",
    description: "Age calculations, calendar date differences, countdowns, business days, and duration conversions.",
    icon: "Calendar",
    color: "text-slate-600 dark:text-slate-400 font-sans font-medium tracking-tight",
    bgColor: "bg-slate-100 dark:bg-slate-900/30",
    borderColor: "border-slate-200 dark:border-slate-800/30",
  },
  {
    id: "conversion",
    name: "Unit Conversion",
    description: "Instant converter for length, weight, volume, area, temperature, speed, and computer data sizes.",
    icon: "Scale",
    color: "text-violet-600 dark:text-violet-400 font-sans font-medium tracking-tight",
    bgColor: "bg-violet-50 dark:bg-violet-950/30",
    borderColor: "border-violet-100 dark:border-violet-900/30",
  },
  {
    id: "everyday",
    name: "Everyday & Misc",
    description: "Semester GPA, discounts, test grade curves, gas mileage (MPG), or paint and concrete volume estimators.",
    icon: "Briefcase",
    color: "text-cyan-600 dark:text-cyan-400 font-sans font-medium tracking-tight",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/30",
    borderColor: "border-cyan-100 dark:border-cyan-900/30",
  },
  {
    id: "ai-tools",
    name: "AI Assistants",
    description: "Intelligent, contextual helpers for smart writing, customized study schedules, and travel planning.",
    icon: "Sparkles",
    color: "text-amber-600 dark:text-amber-400 font-sans font-medium tracking-tight",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-100 dark:border-amber-900/30",
  },
];

export const CALCULATORS: CalculatorMetadata[] = [
  {
    id: "mortgage-calculator",
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    category: "financial",
    shortDescription: "Calculate your monthly home mortgage payment with interactive interest breakdown, tax adjustments, and complete amortization schedules.",
    description: "Comprehensive home buyer's financial planning tool. Input home value, purchase down payments, interest percentage, and loan duration to discover precise principal and interest, monthly visual breakdown, and complete repayment graphs over the life of your mortgage.",
    howItWorks: "Under the hood, our tool applies the standard fixed-rate compound loan amortization model. It takes your loan principal (the property purchase value minus down payments) and iterates it against modern fractional interest rates, factoring in optional custom layers such as yearly property tax and homeowner insurance.",
    formulaExplanation: `To solve for the monthly payment (M), we utilize the compound annuity formula:
    
M = P * [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]

Where:
- M is the total monthly payment.
- P is the net loan principal amount (Home Value minus Down Payment).
- r is the monthly interest rate (Annual Interest Rate converted to decimal and divided by 12).
- n is the total schedule of payments (Loan Term in Years multiplied by 12).`,
    faq: [
      {
        question: "What is an amortization schedule?",
        answer: "An amortization schedule is an itemized transaction ledger displaying exactly how much of each monthly payment goes toward reducing the original loan principal versus paying off the accrued bank interest over the complete duration.",
      },
      {
        question: "How does the down payment magnitude impact my mortgage?",
        answer: "A larger down payment lowers the initial principal (P) you need to borrow. This subsequently reduces your monthly recurring payment, total interest accumulated over the life of the loan, and potentially avoids private mortgage insurance (PMI) fees.",
      },
      {
        question: "Can I make extra payments to pay down the mortgage quicker?",
        answer: "Yes. By paying extra money directly toward your core principal asset, you shorten the overall loan repayment schedule and directly prevent substantial amounts of compounding interest from building up.",
      },
    ],
    popular: true,
  },
  {
    id: "compound-interest",
    slug: "compound-interest",
    name: "Compound Interest Calculator",
    category: "financial",
    shortDescription: "Project your long-term wealth growth, evaluating monthly recurring contributions, compounding frequency, and initial investments.",
    description: "Visualize interest-on-interest mechanisms. Determine the ultimate future value of your financial portfolio by altering starting amounts, continuous monthly additions, expected index return ratios, compounding schedule rates (annually, monthly, daily), and the length of growth years.",
    howItWorks: "The dynamic calculator processes starting balances first, maps the repeated periodic monthly contributions through a progressive geometric series, and applies your annual compound yields scaled to the desired compounding periods.",
    formulaExplanation: `The future value calculation consists of the principal compound and the series annuity:

Future Value (A) = P * (1 + r/n)^(n*t) + PMT * [ ((1 + r/n)^(n*t) - 1) / (r/n) ] * (1 + r/n)

Where:
- A is the ultimate accumulated prospective balance.
- P is the starting initial investment principal.
- PMT is the added recurring periodic amount (e.g., monthly contribution).
- r is the nominal annual compounding return (expressed as a decimal).
- n is the compounding frequency per year (e.g., 12 for monthly, 1 for annually).
- t is the total cumulative time period in years.`,
    faq: [
      {
        question: "What is the primary difference between simple and compound interest?",
        answer: "Simple interest accumulates solely on the absolute original principal amount you put in. Compound interest accumulates on both your starting principal AND all the previous interest payments you have earned.",
      },
      {
        question: "Why does compound frequency matter?",
        answer: "The more frequently interest compounds (e.g., daily or monthly vs. once a year), the faster your wealth accelerates. This happens because your earnings are reinvested to work for you sooner.",
      },
      {
        question: "What is the Rule of 72?",
        answer: "The Rule of 72 is a quick, useful mental shortcut to estimate when your money will double. Divide 72 by your expected annual rate of return (e.g. 72 / 8% = 9 years to double your capital).",
      },
    ],
    popular: true,
  },
  {
    id: "bmi-calculator",
    slug: "bmi-calculator",
    name: "BMI (Body Mass Index) Calculator",
    category: "health",
    shortDescription: "Evaluate your clinical weight category relative to height in metric or imperial, reflecting ideal ratios and balanced fitness bounds.",
    description: "Immediate body composition weight indexer. Enter weight and height data using kilograms/centimeters, or pounds/feet-inches, to calculate your direct Body Mass Index (BMI). View your status mapped seamlessly on the World Health Organization (WHO) healthy weight-spectrum scales.",
    howItWorks: "This tool takes a standard ratio of human mass to surface layout area. Ideal weight metrics are extracted dynamically using healthy body mass targets relative to your height square parameters.",
    formulaExplanation: `Depending on the desired unit selection:

1. Metric System:
BMI = Weight (kg) / [ Height (m) ]^2

2. Imperial System:
BMI = [ Weight (lb) / [ Height (in) ]^2 ] * 703

Status Classifications:
- Underweight: BMI values below 18.5
- Normal Weight: BMI values from 18.5 to 24.9
- Overweight: BMI values from 25.0 to 29.9
- Obese Category: BMI values of 30.0 or higher`,
    faq: [
      {
        question: "Is BMI an accurate measure of overall physical health?",
        answer: "BMI is a reliable basic indicator of weight categories for most adults. However, it does not directly distinguish between muscle mass and fat tissue percentage. Highly athletic people or bodybuilders may record an 'overweight' BMI score despite maintaining extremely low body fat.",
      },
      {
        question: "What constitutes a healthy target BMI?",
        answer: "Medical consensus defines a healthy body mass range as scoring a BMI between 18.5 and 24.9. Staying in this range significantly lowers long-term cardiovascular risks.",
      },
      {
        question: "Do guidelines differ for children or seniors?",
        answer: "Yes. While the mathematical formula remains identical, youth BMI results must be calculated relative to historic age-and-gender percentiles. Older seniors are often recommended to maintain a slightly higher, protective BMI buffer.",
      },
    ],
    popular: true,
  },
  {
    id: "date-difference",
    slug: "date-difference",
    name: "Date Difference & Age Calculator",
    category: "date-time",
    shortDescription: "Count exact intervals of years, months, weeks, business days, and total hours between past and future target dates.",
    description: "An incredibly accurate chronological calendar analyzer. Enter any two historic, current, or distant future dates to extract the precise elapsed duration. Breaks down differences into years/months/days, absolute calendar day tallies, weekday count, and down to exact minutes.",
    howItWorks: "The algorithm calculates elapsed days by evaluating calendar rules, factoring in varying monthly spans, tracking historical leap years, and adjusting optional boundaries (such as choosing to include or ignore target end-dates).",
    formulaExplanation: `Our calendar parser takes absolute epoch times from midnight of the first selected date (D1) to midnight of the target date (D2):

Elapsed Tally = Epoch(D2) - Epoch(D1)

We convert this baseline millisecond difference progressively into standard units:
- Days = Milliseconds / 86,400,000
- Weeks = Math.floor(Days / 7)
- Months and Years = Extracted dynamically by navigating year cycles, accounting for non-leap years and 28-31 day structures.`,
    faq: [
      {
        question: "How are leap years handled in the calculations?",
        answer: "Leap years (any year divisible by 4, except century years unless divisible by 400) are fully accounted for by our engine. This adds an extra leap-day (February 29th) whenever a date boundary spans across it.",
      },
      {
        question: "What is the difference between total days and year/month/day breakdown?",
        answer: "Total days is a continuous scalar counting of elapsed intervals. The year/month/day breakdown maps this count to the actual calendar grid, showing it in natural human terms (e.g. 1 Year, 3 Months, and 5 Days).",
      },
      {
        question: "Can I use this tool to calculate my age in dynamic terms?",
        answer: "Yes, absolutely! Set the first date to your birthdate and the second date to today. You will see your age displayed down to the correct number of days, weeks, or even minutes.",
      },
    ],
    popular: true,
  },
  {
    id: "unit-converter",
    slug: "unit-converter",
    name: "Comprehensive Unit Converter",
    category: "conversion",
    shortDescription: "Convert length, mass, temperature, area, speed, and computerized memory metrics instantly across international standard systems.",
    description: "An all-in-one dimensional converter. Toggle quickly between physical properties—Length, Weight/Mass, Temperature, Area, Speed, Volume, and computer Data dimensions. Inputs translate instantly, showing you equivalents across both metric and imperial systems.",
    howItWorks: "All units within a category map to a standardized base anchor. Values are converted to this anchor first, and then multiplied by the respective unit scalar to produce accurate equivalents.",
    formulaExplanation: `Unit values are calculated as follows (using standard scientific scalars):

Conversion = Base Value * Target Scale Factor

For example, in Length:
- Base Unit Anchor: Meter (1.0)
- Inch Factor: 0.0254 meters
- Foot Factor: 0.3048 meters
- Kilometer Factor: 1000.0 meters

Temperature conversions use their standard algebraic formulas:
- Fahrenheit to Celsius: C = (F - 32) * 5/9
- Celsius to Kelvin: K = C + 273.15`,
    faq: [
      {
        question: "What is the difference between the Metric and Imperial systems?",
        answer: "The Metric System (SI) is base-10, making calculations easy (e.g., 100cm = 1m). The Imperial System is based on historical measures, using varied divisions (e.g., 12 inches = 1 foot, 16 ounces = 1 pound).",
      },
      {
        question: "How accurate is the temperature conversion at extremes?",
        answer: "Our temperature formulas are 100% mathematically exact, using standard physics equations. Absolute zero scales perfectly at -273.15°C or -459.67°F.",
      },
      {
        question: "What values does the data converter use?",
        answer: "Our software uses the standard decimal base-1000 system (where 1 Kilobyte = 1000 bytes) for digital files, which aligns with modern operating system and hard drive storage guidelines.",
      },
    ],
    popular: true,
  },
  {
    id: "gpa-calculator",
    slug: "gpa-calculator",
    name: "GPA & Course Grade Calculator",
    category: "everyday",
    shortDescription: "Monitor school or university grades, logging semester classes to compute cumulative GPA and plan necessary course margins.",
    description: "An interactive educational planner. input letter grades (A+, A, B, etc.) along with their corresponding course credits to instantly calculate your overall Grade Point Average (GPA). Add as many rows as needed to track different terms.",
    howItWorks: "Each letter grade is assigned a standard point value (ranging from 4.0 for an A down to 0.0 for an F). We calculate a weighted average by multiplying each course grade's value by its credit hours, summing the results, and dividing by total credits.",
    formulaExplanation: `The GPA formula is calculated as follows:

GPA = Sum( Grade Value * Credit Hours ) / Sum( Total Credit Hours )

Standard Point Weights:
- A+ / A = 4.0 Points
- A- = 3.7 Points
- B+ = 3.3 Points
- B = 3.0 Points
- B- = 2.7 Points
- C+ = 2.3 Points
- C = 2.00 Points
- D = 1.0 Point
- F = 0.0 Points`,
    faq: [
      {
        question: "What is the difference between a weighted and unweighted GPA?",
        answer: "Unweighted GPA treats all courses on a simple 4.0 scale regardless of difficulty. Weighted GPA awards extra points (often up to 5.0) for advanced courses like AP, IB, or Honors classes.",
      },
      {
        question: "How do credit hours affect my GPA?",
        answer: "Courses with more credit hours (e.g., a 4-credit science lab) have a bigger impact on your GPA than courses with fewer credits (e.g., a 1-credit hobby course).",
      },
      {
        question: "Can I use this tool to calculate semester-specific GPA?",
        answer: "Yes. Simply input your current classes and credit hours to see your GPA for the term, or add previous semesters to find your cumulative career GPA.",
      },
    ],
    popular: false,
  },
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage & Percent Change Calculator",
    category: "math",
    shortDescription: "Quickly find percentages of numbers, absolute percentage change intervals, and percent increase/decrease ratios.",
    description: "Solve complex percentage questions instantly. Our multi-mode interface handles three distinct percentage scenarios: finding the direct percentage of a starting value, calculating the percentage ratio between two numbers, and tracking percent growth or declines.",
    howItWorks: "The calculator runs direct algebraic formulas to solve for your missing percentage variables based on the active tab's layout inputs.",
    formulaExplanation: `The calculator supports three distinct calculation formulas:

1. Basic Percentage:
Result = (Percentage / 100) * Number

2. Percentage Ratio (What percent is X of Y):
Percentage = (X / Y) * 100

3. Percentage Increase/Decrease (Percent Change):
Change = ((New Value - Old Value) / Old Value) * 100`,
    faq: [
      {
        question: "How do you calculate percentage increase?",
        answer: "Take the new value, subtract the original value, and divide the result by the original value. Then, multiply by 100 to convert it to a percentage.",
      },
      {
        question: "Can percentage changes be negative?",
        answer: "Yes, a negative result simply signifies a percentage decrease rather than growth (e.g., a drop in stock price).",
      },
      {
        question: "Why does reversing progress look asymmetrical?",
        answer: "If a value drops by 50%, it requires a 100% increase to return to its original value. This happens because the reference baseline changes from the starting amount to the lower, halved amount.",
      },
    ],
    popular: true,
  },
  {
    id: "scientific-calculator",
    slug: "scientific-calculator",
    name: "Scientific Calculator Widget",
    category: "math",
    shortDescription: "A full-featured scientific calculator supporting arithmetic, trigonometry, log functions, exponent calculations, and parenthetical groups.",
    description: "A fast, fully interactive math canvas. Perform standard arithmetic combined with scientific functions: sine, cosine, tangent (in degrees or radians), logarithms (base-10 and natural log), powers, roots, Pi, and Euler's constant.",
    howItWorks: "The calculator processes your inputs using a clean parenthetical expression parser, maintaining the standard order of operations (PEMDAS/BODMAS) to deliver accurate step-by-step mathematical results.",
    formulaExplanation: `Evaluations adhere strictly to mathematical precidences:

Parentheses () -> Exponents ^ -> Multiplication & Division * / -> Addition & Subtraction + -

All trigonometric helper calculations:
- Radians: Inputs are evaluated directly by the JS Math engine.
- Degrees: Angle parameter inputs are converted: Radians = Degrees * (Pi / 180).`,
    faq: [
      {
        question: "What is the difference between Radian (Rad) and Degree (Deg) mode?",
        answer: "Radian mode measures angles based on the radius of a circle (where a full rotation is 2π). Degree mode divides a circle into 360 units. Select the mode that matches your math homework or engineering task.",
      },
      {
        question: "What is 'e' in scientific notation?",
        answer: "The constant 'e' is Euler's number (approx. 2.71828). It is the base of natural logarithms (ln) and is vital in calculus and compound growth calculations.",
      },
      {
        question: "How do I perform memory operations?",
        answer: "Use 'Ans' to pull the result of your last successful calculation back onto the screen. This makes multi-step calculations seamless.",
      },
    ],
    popular: false,
  },
  {
    id: "tip-discount",
    slug: "tip-discount",
    name: "Tip, Tax & Discount Calculator",
    category: "everyday",
    shortDescription: "Instantly calculate shopping discounts, add local sales taxes, or split restaurant tips easily among friends.",
    description: "Manage your daily spending. Use the Discount tab to find final retail prices after applying sales, coupons, and local taxes. Switch to the Tip tab to split bills, set tip percentages, and see what each person owes.",
    howItWorks: "The calculator applies standard retail savings and tip percentages on top of your final base bill, splitting totals evenly across your dinner party where relevant.",
    formulaExplanation: `1. Discount Tab:
Saved Amount = Original Price * (Discount Percent / 100)
Subtotal = Original Price - Saved Amount
Sales Tax = Subtotal * (Tax Rate / 100)
Final Price = Subtotal + Sales Tax

2. Tip Tab:
Tip Amount = Base Bill * (Tip Percent / 100)
Total Bill = Base Bill + Tip Amount
Share Per Person = Total Bill / Number of People`,
    faq: [
      {
        question: "Are tips calculated before or after sales tax?",
        answer: "Standard etiquette calculates the tip percentage based on the subtotal of food and drinks before sales tax is added.",
      },
      {
        question: "How do stackable discounts work?",
        answer: "Normally, if you have multiple discounts (e.g. 20% off plus an extra 10%), stores apply the second discount to the already reduced subtotal, rather than adding them together to make 30% off.",
      },
      {
        question: "Is sales tax calculated on the discounted price?",
        answer: "Yes, in almost all regions, sales tax is calculated on the net transaction amount after the discount has been applied.",
      },
    ],
    popular: false,
  },
  {
    id: "bmr-calculator",
    slug: "bmr-calculator",
    name: "BMR & Calories Calculator",
    category: "health",
    shortDescription: "Calculate your Basal Metabolic Rate (BMR) and daily calorie needs based on physical activity levels.",
    description: "Find your daily energy expenditure. Input age, gender, weight, and height to find your Basal Metabolic Rate (BMR)—the calories your body burns just staying alive. Combine this with your activity level to estimate your Total Daily Energy Expenditure (TDEE).",
    howItWorks: "This tool uses the scientifically validated Mifflin-St Jeor equation to calculate your BMR, then scales it using physical activity factors to find your total daily calorie needs.",
    formulaExplanation: `Mifflin-St Jeor Equation:

For Men:
BMR = 10 * Weight (kg) + 6.25 * Height (cm) - 5 * Age (years) + 5

For Women:
BMR = 10 * Weight (kg) + 6.25 * Height (cm) - 5 * Age (years) - 161

Total Daily Energy Expenditure (TDEE):
TDEE = BMR * Activity Factor
- Sedentary (little to no exercise): 1.2
- Light (exercise 1-3 days/week): 1.375
- Moderate (exercise 3-5 days/week): 1.55
- Active (exercise 6-7 days/week): 1.725
- Very Active (hard labor or training twice/day): 1.9`,
    faq: [
      {
        question: "What is BMR?",
        answer: "Your Basal Metabolic Rate (BMR) is the minimum energy your body requires to perform basic life-sustaining functions (like breathing and pumping blood) while at complete rest.",
      },
      {
        question: "How many calories should I eat to lose weight?",
        answer: "To lose weight safely, aim for a modest calorie deficit—generally eating 300 to 500 calories below your TDEE daily. This encourages steady, sustainable weight loss.",
      },
      {
        question: "How accurate is the Mifflin-St Jeor equation?",
        answer: "Studies show it is one of the most accurate BMR estimation formulas available for healthy adults. However, it may be less precise for individuals with extremely high muscle mass or low body fat.",
      },
    ],
    popular: false,
  },
  {
    id: "ai-writer",
    slug: "ai-writer",
    name: "AI Smart Writer",
    category: "ai-tools",
    shortDescription: "Polish, rephrase, expand, or summarize any piece of text using context-aware presets.",
    description: "An intelligent prose and copy assistant. Instantly adjust the tone of your essays, emails, or articles. Select custom tones like professional, casual, persuasive, or direct, and see high-quality rewritten suggestions with tracked adjustment statistics.",
    howItWorks: "This tool proxies your requests to pre-configured server-side LLM sessions. By providing custom tone anchors, structural constraints, and context, the server refines and structures the text dynamically.",
    formulaExplanation: `Inputs processed dynamically using specialized writing instruction matrices:
- Tone adaptation parameters
- Grammar correction rules
- Maximum length thresholds`,
    faq: [
      {
        question: "Is my pasted text private?",
        answer: "Yes. All text translation and rewriting is processed securely server-side. No inputs are stored or logged in databases."
      },
      {
        question: "How does the tone adjustment work?",
        answer: "The model is guided with contextual writing prompts that dictate sentence pacing, vocabulary sophistication, and emotional resonance based on your selection."
      }
    ],
    popular: true
  },
  {
    id: "ai-teacher",
    slug: "ai-teacher",
    name: "AI Study Mentor",
    category: "ai-tools",
    shortDescription: "Enter any complex topic to instantly generate a step-by-step master explainer, concept map, and a 5-day custom study path.",
    description: "Accelerate your learning on any science, history, programming, or general topic. Enter your topic to receive an in-depth explanatory breakdown, key learning takeaways, structured dynamic quiz questions, and a customized study schedule.",
    howItWorks: "The tool guides the model to index educational structures, generate conceptual scaffolds, formulate retrieval-based quiz checks, and construct a practical spaced-repetition timeline.",
    formulaExplanation: `Topic pedagogical structuring:
- Structural scaffolding guides
- Retrieval-based question generation
- Spaced-repetition scheduling templates`,
    faq: [
      {
        question: "What subjects does this support?",
        answer: "It supports all fields of knowledge, including mathematics, natural sciences, history, computer code, literature, and standard languages."
      },
      {
        question: "What is the spaced-repetition timeline?",
        answer: "It is a customized 5-day guide that structures your reviews over time so you remember concepts longer, rather than cramming."
      }
    ],
    popular: true
  },
  {
    id: "ai-travel",
    slug: "ai-travel",
    name: "AI Tour Planner",
    category: "ai-tools",
    shortDescription: "Design custom day-by-day itineraries based on hours, styles, budgets, and specific destination targets.",
    description: "An interactive travel blueprint companion. Define your ideal destination, budget scale, trip length, and travel styles. Generate an hourly schedule of sights, restaurants, and insider tips, combined with estimated cost metrics.",
    howItWorks: "The custom generator maps geographic assets, budget ranges, and travel preferences to compile an optimized routing schedule, prioritizing proximity, travel style, and regional highlights.",
    formulaExplanation: `Itinerary planning and optimization:
- Location-clustering heuristics
- Cost-allocation distributions
- Travel-style pacing constraints`,
    faq: [
      {
        question: "Can I use this for multi-city routes?",
        answer: "Yes, you can input multiple nearby locations as part of the destination description to generate custom routes."
      },
      {
        question: "Are the restaurant and sightseeing estimates accurate?",
        answer: "The numbers are generated based on historical ranges and travel patterns, so they serve as solid general planning budget estimates."
      }
    ],
    popular: true
  },
  {
    id: "half-birthday",
    slug: "half-birthday",
    name: "Half Birthday Calculator",
    category: "date-time",
    shortDescription: "Discover your exact half birthday date, track a live countdown, and get a schedule of your future half birthdays.",
    description: "Calculate your exact half birthday—the calendar date exactly six months away from your actual birthday. Track the remaining time with a live animated countdown, see your exact decimal age (such as 28.5), check astronomical zodiac changes, and get your half birthday dates for the next 10 years.",
    howItWorks: "The calculator takes your birth date and adds exactly 6 calendar months to it. If the target month has fewer days than your birth day (e.g., born August 31st, projecting into February), the calculation shifts gracefully to the end of that month (February 28th, or February 29th on leap years) to keep aligning perfectly with seasonal midpoints.",
    formulaExplanation: `Half birthday computation shifts the calendar month by exactly 6:
    
Target Month = (Birth Month + 6) % 12
(where December is 12, converted to a 1-to-12 scale)

If Birth Day exceeds the maximum days of the target month (e.g. August 29/30/31 to February), the date wraps cleanly to the last day of that month. Decimals are calculated as:
Decimal Age on Half Birthday = Actual Age + 0.5`,
    faq: [
      {
        question: "What is a half birthday?",
        answer: "A half birthday is a day celebrated exactly six months before or after your actual birthday. It is commonly celebrated by people born near major holidays (like Christmas) so they can have a party in the summer, or by schools for students with summer birthdays.",
      },
      {
        question: "What happens if I was born on August 31st or August 30th?",
        answer: "Since February normally only has 28 days (or 29 in a leap year), adding 6 months to August 31st lands on the very last day of February (February 28th or February 29th). Our calculator implements the standard calendar-logic shift to the last day of February.",
      },
      {
        question: "Why should someone calculate their half birthday?",
        answer: "Celebrating a half birthday is popular for young kids (e.g., reaching 1.5 or 2.5 years old), students who want to celebrate during the school year rather than summer, and individuals whose real birthdays fall on holidays (making it hard for friends to attend).",
      }
    ],
    popular: true
  }
];

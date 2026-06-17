import { ReactNode } from "react";

export type CalculatorCategory = "financial" | "math" | "health" | "date-time" | "conversion" | "everyday" | "ai-tools";

export interface CategoryInfo {
  id: CalculatorCategory;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind class string for colors
  bgColor: string;
  borderColor: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorMetadata {
  id: string;
  name: string;
  slug: string;
  category: CalculatorCategory;
  description: string;
  shortDescription: string;
  formulaExplanation: string;
  howItWorks: string;
  faq: FAQItem[];
  popular?: boolean;
}

export interface RouteState {
  path: string; // / or /category/:id or /calculator/:slug
  categoryId?: string;
  calcSlug?: string;
}

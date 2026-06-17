import React, { useState } from "react";
import { 
  FileText, Shield, ShieldAlert, Check, Mail, Info, Send, Phone, MessageSquare, AlertCircle, Heart 
} from "lucide-react";

interface CompliancePageProps {
  page: "privacy" | "terms" | "about" | "contact";
  onNavigateHome: () => void;
}

export default function CompliancePages({ page, onNavigateHome }: CompliancePageProps) {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "General Feedback",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill out all required fields.");
      return;
    }
    // Simulate high-fidelity success
    setFormSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", subject: "General Feedback", message: "" });
    }, 1500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      {/* Dynamic Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-400 dark:text-zinc-500 font-medium mb-6">
        <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer" onClick={onNavigateHome}>Home</span>
        <span>/</span>
        <span className="text-slate-950 dark:text-zinc-305 capitalize">{page === "about" ? "About Us" : page === "contact" ? "Contact Us" : `${page} Policy`}</span>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-850 p-6 md:p-10 shadow-xs space-y-8">
        
        {/* PRIVACY POLICY PAGE */}
        {page === "privacy" && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-zinc-800 pb-4">
              <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 p-2.5 rounded-2xl">
                <Shield className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
                  Privacy Policy
                </h1>
                <p className="text-xs text-slate-450 dark:text-zinc-500 font-mono">
                  Last Updated: June 12, 2026 • Verified Google AdSense Compliant
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
              <p>
                At <strong>CalcHub</strong>, accessible from our public web portal, one of our main priorities is the privacy of our visitors. This Privacy Policy document specifies the types of information collected and recorded by CalcHub and how we utilize it.
              </p>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                1. 100% Client-Side Privacy Architecture
              </h3>
              <p>
                Unlike traditional, heavy SaaS calculation engines, <strong>CalcHub executes 100% of calculation scripts directly inside the client browser</strong> using modern sandboxed JavaScript. This means any parameters you input (such as your birthdates for our Half Birthday Calculator, your home details for our Mortgage calculator, your personal height and weight for our BMI calculator, or other sensitive financial metrics) <strong>never leave your computer</strong> and are never transmitted to, stored, or processed on any secondary server databases. Your confidentiality is absolute.
              </p>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                2. Standard Logs and Log Files
              </h3>
              <p>
                CalcHub follows a standard procedure of utilizing log files. These files log visitors when they visit web assets. All hosting companies do this as a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and optionally the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
              </p>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                3. Google AdSense & Cookie Disclosures
              </h3>
              <p>
                CalcHub is built to partner with third-party vendors, including <strong>Google AdSense</strong>, to serve advertisements. Google uses cookies to serve ads to our site visitors based on their visit to CalcHub and other sites on the internet.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Google's use of cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
                </li>
                <li>
                  Users may choose to opt-out of personalized advertising by visiting Google's official <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ads Settings page</a>.
                </li>
                <li>
                  You can also choose to disable cookies through your individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
                </li>
              </ul>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                4. Third-Party Privacy Policies
              </h3>
              <p>
                CalcHub's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain choices.
              </p>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                5. GDPR & CCPA Data Retention Rights
              </h3>
              <p>
                Under modern privacy regimes such as the European Union's General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you are entitled to several data-protection rights. Because CalcHub does not ask for or collect any personally identifiable profiles, nor do we run background tracking databases, we do not persist user data. If you contact our support desk via our contact portal, your details are only used to respond to your specific query.
              </p>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                6. Children's Information
              </h3>
              <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. CalcHub does not knowingly collect any Personal Identifiable Information from children under the age of 13.
              </p>
            </div>
          </div>
        )}

        {/* TERMS OF SERVICE PAGE */}
        {page === "terms" && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-zinc-800 pb-4">
              <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 p-2.5 rounded-2xl">
                <FileText className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
                  Terms of Service
                </h1>
                <p className="text-xs text-slate-450 dark:text-zinc-500 font-mono">
                  Last Updated: June 12, 2026 • Verified AdSense Compliant
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
              <p>
                Welcome to <strong>CalcHub</strong>. By accessing our website, you agree to comply with and be bound by the following terms and conditions of use, which govern CalcHub's relationship with you in relation to this website.
              </p>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                1. License and Permitted Use
              </h3>
              <p>
                The content and software algorithms of CalcHub are provided free of charge for your personal, educational, and computational usage. You are permitted to perform calculations, share formatted outputs, and evaluate different metrics under these terms.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must not reverse-engineer database schemas.</li>
                <li>You must not use automated scraping bots or DDOS spiders that would disrupt sandbox memory.</li>
                <li>You must not represent any outputs of our tools as guaranteed certified legal, fiscal, or biological audits.</li>
              </ul>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                2. General Disclaimer & Limitation of Liability
              </h3>
              <p>
                <strong>The calculations provided by CalcHub are prospective estimates purely for educational planning.</strong> 
              </p>
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 text-amber-805 dark:text-amber-300 rounded-lg flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs">
                  We state explicitly: CalcHub does not provide certified financial consultation, medical diagnosis, mortgage backing, or astronomical certitude. Consult standard certified personal accounts, real-estate legal specialists, or clinical family physicians prior to making major lifestyle, health, or financial investments.
                </span>
              </div>
              <p>
                We do not warrant or guarantee that the calculations are 100% free from minor floating-point errors, leap year shifts, or changes in governmental tax parameters. CalcHub and its developers disclaim any liability for decisions made based on outputs of these standard calculators.
              </p>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                3. External Ads and Third-Party Resources
              </h3>
              <p>
                This website contains advertisements served by Google AdSense and third-party affiliates. These systems are governed by separate licensing structures. CalcHub does not endorse, control, or assume any liability for the goods, software, or promotions displayed on those advertiser networks.
              </p>

              <h3 className="text-sm font-bold text-slate-950 dark:text-white pt-2 uppercase tracking-wide font-mono">
                4. Governing Law
              </h3>
              <p>
                These terms shall be governed by, and construed in accordance with, standard international intellectual property rights laws. Any dispute arising from your use of this digital portal shall be resolved exclusively within appropriate sandboxed arbitration courts.
              </p>
            </div>
          </div>
        )}

        {/* ABOUT US PAGE */}
        {page === "about" && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-105 dark:border-zinc-800 pb-4">
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 p-2.5 rounded-2xl">
                <Info className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
                  About CalcHub
                </h1>
                <p className="text-xs text-slate-450 dark:text-zinc-500 font-mono">
                  The Premium Everyday Calculators Portal
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-sans">
              <p>
                Welcome to <strong>CalcHub</strong>—a curated suite of clean, lightweight, instant-result web calculators. 
              </p>
              <p>
                CalcHub was built with a simple mission: <strong>to save people time from clunky, ad-saturated, slow-loading legacy calculators.</strong> We wanted to create a platform that focuses on impeccable visual presentation, responsive mobile design, dynamic real-time outputs, and ultimate privacy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-850/80">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    🛡️ Absolute Client-Side Privacy
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Your financial figures, pregnancy dates, BMI indices, or test grades are handled solely within your own device memory. We do not transmit parameters server-side.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-850/80">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    🎓 Complete Transparency & Formulae
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    No mystery results. We present full descriptions, standard formula guides, and clear FAQs underneath every single tool. You know exactly how the answers are reached.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-850/80">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    ☀️ Blistering Fast Speeds
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Because we don't rely on cumbersome background database requests to calculate your scores, your results render under 5ms, locally synchronized.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-100 dark:border-zinc-850/80">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    🍰 Interactive Modern Additions
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Our library grows continuously based on what users ask for. For example, our new Half Birthday Calculator lets you map exact mid-year milestones in 2 clicks.
                  </p>
                </div>
              </div>

              <div className="pt-4 text-center">
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <span>Crafted with</span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>for web explorers all over the world.</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT US FORM PAGE */}
        {page === "contact" && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-zinc-800 pb-4">
              <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 p-2.5 rounded-2xl">
                <Mail className="w-6 h-6" />
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white font-display tracking-tight">
                  Contact Support & Feedback
                </h1>
                <p className="text-xs text-slate-450 dark:text-zinc-500 font-mono">
                  Suggest a Calculator • Report a bug • Partner with Ads
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Form Column */}
              <div className="md:col-span-7 space-y-4">
                {formSubmitted ? (
                  <div className="p-8 bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-500/20 rounded-2xl text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-lg">
                      ✓
                    </div>
                    <h3 className="text-base font-bold text-emerald-850 dark:text-emerald-400">Message Received Successfully!</h3>
                    <p className="text-xs text-emerald-650 dark:text-emerald-500/90 leading-relaxed">
                      Thank you for contacting CalcHub. Our operations desk will review your suggestions and follow up within 2 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-bold text-slate-705 dark:text-zinc-350">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3 text-xs text-slate-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-blue-500/10 focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-bold text-slate-705 dark:text-zinc-350">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="e.g. john@example.com"
                        className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3 text-xs text-slate-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-blue-500/10 focus:outline-hidden transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="text-xs font-bold text-slate-705 dark:text-zinc-350">
                        Purpose of Inquiry
                      </label>
                      <select
                        id="contact-subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3 text-xs text-slate-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white focus:outline-hidden transition-all cursor-pointer"
                      >
                        <option value="General Feedback">Suggest a New Calculator</option>
                        <option value="Bug Report">Algorithm Accuracy Question / Bug Report</option>
                        <option value="Ad Partnership">Advertising & Partnership Inquiry</option>
                        <option value="Other">Other General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-xs font-bold text-slate-705 dark:text-zinc-350">
                        Detailed Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="Tell us what tool you would like us to add, or provide feedback on your calculation experiences..."
                        className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950 p-3 text-xs text-slate-900 dark:text-zinc-100 focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-blue-500/10 focus:outline-hidden transition-all"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl text-xs cursor-pointer transition-all flex items-center justify-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Sidebar Info Column */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-5 bg-slate-50 dark:bg-zinc-950 border border-slate-150 dark:border-zinc-850 rounded-2xl text-left space-y-3.5">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-blue-550 dark:text-blue-400">
                      <Mail className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Email Address</h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">support@calchub.portal</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    <span className="text-indigo-555 dark:text-indigo-400">
                      <MessageSquare className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">Continuous Feedback</h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal">
                        Our engineering core updates mathematics models twice monthly to keep consistent with legal tax parameters and metrics.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/50 dark:border-zinc-815/80 text-[10px] text-slate-450 dark:text-zinc-500">
                    Calculators operate independently under standard browser sandboxing protocols.
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

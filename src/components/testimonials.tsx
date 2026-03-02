"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatedText } from "./ui/animated-text";

const TESTIMONIALS = [
  {
    quote: "HYRE hat unseren Time-to-Hire um 40% reduziert. Die KI-gestuetzte CV-Analyse spart uns taeglich Stunden.",
    quoteEn: "HYRE reduced our time-to-hire by 40%. The AI-powered CV analysis saves us hours every day.",
    name: "Dr. Stefan Mueller",
    role: "Head of Talent Acquisition",
    company: "TechRecruit GmbH",
  },
  {
    quote: "Das Kanban-Board mit Drag & Drop ist genial. Endlich haben wir den vollen Ueberblick ueber unsere Pipeline.",
    quoteEn: "The Kanban board with drag & drop is brilliant. Finally we have full visibility over our pipeline.",
    name: "Sandra Hoffmann",
    role: "Senior Recruiterin",
    company: "PersonalPro AG",
  },
  {
    quote: "White-Label Karriereportal aufgesetzt in 10 Minuten. Unsere Kunden sind begeistert vom professionellen Auftritt.",
    quoteEn: "White-label career portal set up in 10 minutes. Our clients love the professional appearance.",
    name: "Markus Weber",
    role: "Geschaeftsfuehrer",
    company: "AviationStaff GmbH",
  },
  {
    quote: "Die DSGVO-Compliance war fuer uns entscheidend. Mit HYRE koennen wir bedenkenlos arbeiten.",
    quoteEn: "GDPR compliance was crucial for us. With HYRE we can work without worries.",
    name: "Julia Schneider",
    role: "Datenschutzbeauftragte",
    company: "RecruitFirst AG",
  },
  {
    quote: "Von LinkedIn direkt in die Pipeline - die Chrome Extension ist ein Game-Changer fuer unser Sourcing.",
    quoteEn: "From LinkedIn directly into the pipeline - the Chrome extension is a game-changer for our sourcing.",
    name: "Tobias Fischer",
    role: "Tech Recruiter",
    company: "DigitalHire GmbH",
  },
  {
    quote: "Die Analytics haben uns geholfen, unsere Kosten pro Einstellung um 35% zu senken. Daten-getriebenes Recruiting.",
    quoteEn: "Analytics helped us reduce our cost per hire by 35%. Data-driven recruiting at its best.",
    name: "Anna Berger",
    role: "VP People Operations",
    company: "ScaleUp Recruiting",
  },
];

function TestimonialCard({
  testimonial,
  locale,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  locale: string;
}) {
  return (
    <div className="glass w-[320px] flex-shrink-0 rounded-2xl p-6 md:w-[380px] transition-all duration-300 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        &ldquo;{locale === "de" ? testimonial.quote : testimonial.quoteEn}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-purple-500/30 text-sm font-bold text-accent-light">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div className="text-sm font-medium text-text-primary">
            {testimonial.name}
          </div>
          <div className="text-xs text-text-muted">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ locale }: { locale: string }) {
  const t = useTranslations("testimonials");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const row1X = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const row2X = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3, 6);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-32">
      <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16 text-center px-6">
        <AnimatedText
          text={t("title")}
          as="h2"
          className="justify-center text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight"
        />
      </motion.div>

      {/* Row 1 - scrolls left with parallax boost */}
      <div className="mb-6 overflow-hidden">
        <motion.div style={{ x: row1X }} className="animate-scroll-left flex gap-6">
          {[...row1, ...row1, ...row1, ...row1].map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} locale={locale} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 - scrolls right with parallax boost */}
      <div className="overflow-hidden">
        <motion.div style={{ x: row2X }} className="animate-scroll-right flex gap-6">
          {[...row2, ...row2, ...row2, ...row2].map((testimonial, i) => (
            <TestimonialCard key={i} testimonial={testimonial} locale={locale} />
          ))}
        </motion.div>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-primary to-transparent" />
    </section>
  );
}

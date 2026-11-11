"use client";

import { m } from "motion/react";
import { useLang } from "@/lib/use-lang";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

const headingVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const markerVariants = {
  hidden: { y: 14 },
  visible: {
    y: 0,
    transition: { type: "spring" as const, stiffness: 170, damping: 19 },
  },
};

const copyVariants = {
  hidden: { y: 30 },
  visible: {
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 20 },
  },
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  const { t } = useLang();
  return (
    <m.header
      className="section-heading"
      initial={false}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={headingVariants}
    >
      <m.div
        className="section-heading__marker"
        aria-hidden="true"
        variants={markerVariants}
      >
        <span>{t.common.section}</span>
        <strong>{index}</strong>
      </m.div>
      <m.div
        className="section-heading__copy"
        variants={copyVariants}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h2><span>{title}</span></h2>
      </m.div>
      {description ? (
        <m.p className="section-heading__description" variants={copyVariants}>
          {description}
        </m.p>
      ) : null}
    </m.header>
  );
}

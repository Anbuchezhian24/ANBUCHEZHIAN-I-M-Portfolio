"use client";

import Button from "@/components/ui/Button";
import VelocityMarquee from "@/components/ui/VelocityMarquee";
import styles from "./About.module.css";
import { useLang } from "@/lib/i18n";

const MARQUEE_ROWS = [
  {
    items: [
      "Full Stack Development",
      "Frontend Engineering",
      "Backend Engineering",
      "React & Next.js",
      "Node.js & Express",
      "API Architecture",
      "Database Systems",
      "Cloud & DevOps",
    ],
    velocity: 34,
  },
  {
    items: [
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Accessibility",
      "Motion Design",
      "Figma",
      "Framer",
      "AI-Assisted Design",
      "Frontend Development",
    ],
    velocity: -28,
    outline: true,
  },
];

const CAPABILITIES = [
  { key: "c1" },
  { key: "c2" },
  { key: "c3" },
  { key: "c4" },
];

export default function About() {
  const { t } = useLang();

  return (
    <section className={styles.about} id="about">
      <VelocityMarquee rows={MARQUEE_ROWS} />

      <div className={styles.wrap}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>
            <span>01</span> {t("about.eyebrow")}
          </p>
          <h2 className={styles.h2}>
            {t("about.h2a")}<br />
            {t("about.h2b")} <em className={styles.serif}>{t("about.h2Em")}</em>{t("about.h2c")}
          </h2>
        </div>

        <div className={styles.narrative}>
          <div className={styles.narrativeLead}>
            <p className={styles.lead}>{t("about.intro1")}</p>
            <div className={styles.signatureWrap}>
              <span className={styles.signatureLine} />
              <p className={styles.signature}>{t("about.signature")}</p>
            </div>
          </div>
          <div className={styles.narrativeBody}>
            <p>{t("about.intro2")}</p>
            <p>{t("about.intro3")}</p>
            <p>{t("about.intro4")}</p>
          </div>
        </div>

        <div className={styles.metrics}>
          {CAPABILITIES.map((c) => (
            <div className={styles.metric} key={c.key}>
              <div className={styles.capLabel}>{t(`about.${c.key}.tag`)}</div>
              <h3 className={styles.capTitle}>{t(`about.${c.key}.title`)}</h3>
              <p className={styles.capDesc}>{t(`about.${c.key}.desc`)}</p>
            </div>
          ))}
        </div>

        <p className={styles.edu}>
          {t("about.edu")}
        </p>

        <div className={styles.next}>
          <Button href="#work" variant="dark" size="sm" arrow>
            {t("about.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}

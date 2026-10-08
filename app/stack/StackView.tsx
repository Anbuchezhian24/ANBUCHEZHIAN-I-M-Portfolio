"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, prefersReducedMotion, EASE } from "@/lib/gsap";
import Button from "@/components/ui/Button";
import LanguageToggle from "@/components/layout/LanguageToggle";
import { useLang } from "@/lib/i18n";
import { DEV_STACK } from "@/content/stack";
import styles from "./stack.module.css";

export default function StackView() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  useEffect(() => {
    try {
      sessionStorage.setItem("portfolio_from_stack", "true");
      sessionStorage.setItem("portfolio_target_hash", "#stack");
    } catch {
      // ignore
    }

    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from([`.${styles.eyebrow}`, `.${styles.h1}`, `.${styles.intro}`], {
        y: 36,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.outExpo,
        stagger: 0.08,
        immediateRender: false,
      });

      gsap.from(`.${styles.category}`, {
        y: 40,
        autoAlpha: 0,
        duration: 0.85,
        ease: EASE.outExpo,
        stagger: 0.1,
        immediateRender: false,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.page} ref={root}>
      {/* top navigation bar */}
      <div className={styles.bar}>
        <Link
          href="/#stack"
          className={styles.back}
          scroll={false}
          onClick={() => {
            try {
              sessionStorage.setItem("portfolio_from_stack", "true");
              sessionStorage.setItem("portfolio_target_hash", "#stack");
            } catch {
              // ignore
            }
          }}
        >
          {t("stackpage.back")}
        </Link>
        <div className={styles.barRight}>
          <Link
            href="/"
            className={styles.logo}
            onClick={() => {
              try {
                sessionStorage.removeItem("portfolio_from_stack");
                sessionStorage.removeItem("portfolio_from_case_study");
                sessionStorage.removeItem("portfolio_from_certifications");
                sessionStorage.setItem("portfolio_target_hash", "#home");
              } catch {
                // ignore
              }
            }}
          >
            Anbuchezhian<i>.</i>
          </Link>
          <LanguageToggle />
        </div>
      </div>

      <div className={styles.wrap}>
        {/* header */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span>03</span> {t("stackpage.eyebrow")}
          </p>
          <h1 className={styles.h1}>
            {t("stackpage.h1a")}<br />
            <em className={styles.serif}>{t("stackpage.h1Em")}</em>
          </h1>
          <p className={styles.intro}>{t("stackpage.intro")}</p>
        </header>

        {/* technology categories */}
        <div className={styles.categories}>
          {DEV_STACK.map((cat) => (
            <section className={styles.category} key={cat.id}>
              <div className={styles.catHeader}>
                <div className={styles.catMeta}>
                  <span className={styles.catNum}>{cat.number}</span>
                  <h2 className={styles.catTitle}>{cat.title}</h2>
                </div>
                <p className={styles.catDesc}>{cat.description}</p>
              </div>

              <div className={styles.techGrid}>
                {cat.items.map((tech) => (
                  <div className={styles.techCard} key={tech.name}>
                    <div className={styles.techIconWrap}>
                      {tech.src ? (
                        <img
                          src={tech.src}
                          alt=""
                          aria-hidden="true"
                          className={styles.techLogo}
                        />
                      ) : (
                        <span
                          className={styles.techMono}
                          style={{
                            color: tech.color,
                            backgroundColor: `${tech.color}14`,
                          }}
                          aria-hidden="true"
                        >
                          {tech.mono}
                        </span>
                      )}
                    </div>
                    <div className={styles.techInfo}>
                      <h3 className={styles.techName}>{tech.name}</h3>
                      <p className={styles.techRole}>{tech.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* bottom navigation & CTA */}
        <div className={styles.bottomBar}>
          <p className={styles.bottomPrompt}>{t("stackpage.readyPrompt")}</p>
          <div className={styles.bottomActions}>
            <Button href="/#work" variant="primary" size="md" arrow>
              {t("stackpage.exploreWork")}
            </Button>
            <Button
              href="/#stack"
              variant="dark"
              size="md"
              onClick={() => {
                try {
                  sessionStorage.setItem("portfolio_from_stack", "true");
                  sessionStorage.setItem("portfolio_target_hash", "#stack");
                } catch {
                  // ignore
                }
              }}
            >
              {t("stackpage.back")}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

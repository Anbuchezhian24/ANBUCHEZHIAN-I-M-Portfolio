"use client";

/*
 * CREDENTIALS — pitch-deck cascade, showcasing exactly 5 Certification Providers:
 * 1. Microsoft (/certifications/microsoft)
 * 2. MongoDB   (/certifications/mongodb)
 * 3. Infosys   (/certifications/infosys)
 * 4. IBM       (/certifications/ibm)
 * 5. NASSCOM   (/certifications/nasscom)
 *
 * Each card represents a provider at provider level.
 * Clicking a provider card or its CTA button navigates to its dedicated page.
 * Certificate counts are dynamically calculated: provider.certificates.length.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, EASE } from "@/lib/gsap";
import { sceneScrub } from "@/lib/scene";
import {
  CERTIFICATION_PROVIDERS,
  getCertificateCountLabel,
  type CertificationProvider,
} from "@/content/certifications";
import styles from "./Certifications.module.css";
import { useLang, L } from "@/lib/i18n";

/* ---------- the movement model ----------
 *   RIGHT  →  CENTER  →  BACKGROUND
 *
 * A provider card slides in from the right and takes the centre as the active
 * hero panel. When passed, it recedes straight back in Z as a depth layer.
 */
const ENTER_X = 118; /* % of panel width — waiting panel sits off-RIGHT */
const ENTER_Z = -150; /* px of depth on approach, flattening to 0 at centre */
const BACK_Z = -520; /* px — how far a passed card recedes */
const BACK_SCALE = 0.2; /* how much it shrinks on the way back */
const BACK_MIN_OP = 0.18; /* fades into background, never to nothing */
const CULL_IN = 1.25; /* incoming panels beyond this are off-stage */
const CULL_BACK = 3.2; /* passed panels linger as depth layers this far back */

type Panel = { provider: CertificationProvider; index: number };

/* Exactly 5 provider panels */
const PANELS: Panel[] = CERTIFICATION_PROVIDERS.map((provider, index) => ({
  provider,
  index,
}));

/* alternating tone rhythm, kept from the deck design */
const TONE = ["dark", "light", "dark", "light", "dark"] as const;

export default function Certifications() {
  const root = useRef<HTMLElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1001px) and (prefers-reduced-motion: no-preference)", () => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);
      const counter = el.querySelector<HTMLElement>(`.${styles.count}`);
      const n = panels.length;
      let active = -1;

      el.classList.add(styles.deckMode);

      const setActive = (i: number) => {
        if (i === active) return;
        active = i;
        panels.forEach((p, k) => p.classList.toggle(styles.on, k === i));
        if (counter) {
          counter.textContent = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
        }
      };

      const place = (p: number) => {
        for (let i = 0; i < n; i++) {
          const el2 = panels[i];
          const d = i - p; /* >0 still to come · 0 centred · <0 receding */

          if (d > CULL_IN || d < -CULL_BACK) {
            el2.style.visibility = "hidden";
            el2.style.pointerEvents = "none";
            continue;
          }
          el2.style.visibility = "visible";

          let x = 0;
          let z = 0;
          let op = 1;
          let sc = 1;

          if (d >= 0) {
            /* RIGHT → CENTER */
            const progress = Math.min(d, CULL_IN);
            x = ENTER_X * progress;
            z = ENTER_Z * progress;
            sc = 1 - 0.05 * progress;
            op = 1 - Math.max(0, progress - 0.5) / 0.62;
          } else {
            /* CENTER → BACKGROUND: straight back in Z */
            const progress = Math.min(CULL_BACK, -d);
            const e = 1 - Math.pow(1 - Math.min(progress, 1), 2);
            z = BACK_Z * (e + Math.max(0, progress - 1) * 0.28);
            sc = 1 - BACK_SCALE * (e + Math.max(0, progress - 1) * 0.12);
            op = Math.max(BACK_MIN_OP, 1 - e * 0.68 - Math.max(0, progress - 1) * 0.06);
          }

          const dist = Math.abs(d);
          el2.style.transform =
            `translate3d(${x.toFixed(2)}%, 0%, ${z.toFixed(1)}px)` +
            ` scale(${sc.toFixed(3)})`;
          el2.style.opacity = String(gsap.utils.clamp(0, 1, op));
          el2.style.filter = "";
          /* The closer to center, the higher the z-index so the active card always wins clicks */
          el2.style.zIndex = String(500 - Math.round(dist * 50));
          /* Only allow clicks on cards that are visible on or near center stage */
          el2.style.pointerEvents = dist <= 0.85 ? "auto" : "none";
        }
        setActive(Math.round(gsap.utils.clamp(0, n - 1, p)));
      };

      /* scroll → target → interpolation → transforms */
      let target = 0;
      let current = 0;
      let lastPlaced = -1;
      const tick = (_t: number, dt: number) => {
        const f = Math.min(dt / 1000, 0.05);
        const diff = target - current;
        if (Math.abs(diff) < 0.0005) {
          current = target;
        } else {
          current += diff * Math.min(f * 25, 1);
        }
        /* Only rewrite DOM inline styles when position actually changes,
           preventing RAF style mutations from swallowing mouse clicks */
        if (Math.abs(current - lastPlaced) > 0.0001) {
          lastPlaced = current;
          place(current);
        }
      };
      gsap.ticker.add(tick);
      place(0);

      const st = ScrollTrigger.create({
        ...sceneScrub(el),
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          target = self.progress * (n - 1);
        },
      });

      gsap.from(`.${styles.foot} > *`, {
        y: 18,
        autoAlpha: 0,
        duration: 0.8,
        ease: EASE.outExpo,
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 74%" },
      });

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        el.classList.remove(styles.deckMode);
      };
    });

    mm.add("(max-width: 1000px), (prefers-reduced-motion: reduce)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(`.${styles.panel}`).forEach((p) => {
        gsap.from(p, {
          y: 40,
          autoAlpha: 0,
          duration: 0.85,
          ease: EASE.outExpo,
          immediateRender: false,
          scrollTrigger: { trigger: p, start: "top 88%" },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.certs} id="certifications" ref={root}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span>06</span> {t("cert.eyebrow")}
        </p>
        <h2 className={styles.h2}>{t("cert.h2")}</h2>
        <p className={styles.lede}>{t("cert.lede")}</p>
      </div>

      <div className={styles.stageWrap}>
        <div className={styles.stage}>
          {PANELS.map((p, i) => {
            const tone = TONE[i % TONE.length];
            const cls = `${styles.panel} ${styles[tone]} ${i === 0 ? styles.on : ""}`;
            const provider = p.provider;
            const certCount = provider.certificates.length;
            const countLabel = getCertificateCountLabel(certCount, lang);

            return (
              <Link
                href={`/certifications/${provider.slug}`}
                className={cls}
                key={provider.slug}
                style={{ zIndex: 200 - i }}
                aria-label={`${provider.name} — ${countLabel} — ${t("cert.viewCertificates")}`}
                scroll={false}
                onClick={() => {
                  try {
                    sessionStorage.setItem("portfolio_from_certifications", "true");
                    sessionStorage.setItem("portfolio_target_hash", "#certifications");
                  } catch {
                    // ignore
                  }
                }}
              >
                {/* Provider identity band */}
                <div className={styles.band}>
                  <span className={styles.no}>{provider.no}</span>
                  <span className={styles.kind}>{t("cert.providerLabel")}</span>
                  <span className={`${styles.status} ${styles.ok}`}>
                    {countLabel} ↗
                  </span>
                </div>

                {/* Provider logo mark on high-contrast plate */}
                <div className={styles.issuerRow}>
                  {provider.logo ? (
                    <span className={styles.logoPlate}>
                      <img
                        src={provider.logo.src}
                        alt={provider.name}
                        style={{ aspectRatio: provider.logo.aspect }}
                      />
                    </span>
                  ) : null}
                  <span className={styles.issuerName}>
                    {provider.name}
                  </span>
                </div>

                <h3 className={styles.title}>{L(lang, provider, "title")}</h3>

                <div className={styles.detail}>
                  {provider.metric && (
                    <div className={styles.metric}>
                      <span className={styles.metricValue}>{provider.metric.value}</span>
                      <span className={styles.metricLabel}>
                        {(lang === "fr" && provider.fr?.metricLabel) || provider.metric.label}
                      </span>
                    </div>
                  )}

                  <div className={styles.cols}>
                    <dl className={styles.record}>
                      <div>
                        <dt>{t("cert.issuedBy")}</dt>
                        <dd>{provider.name}</dd>
                      </div>
                      <div>
                        <dt>{t("cert.certificatesAvailable")}</dt>
                        <dd>{countLabel}</dd>
                      </div>
                      <div>
                        <dt>{t("cert.id")}</dt>
                        <dd>{provider.slug.toUpperCase()}</dd>
                      </div>
                    </dl>

                    <p className={styles.colLbl}>{t("cert.skills")}</p>
                    <ul className={styles.skills}>
                      {provider.skills.map((s, si) => (
                        <li key={s}>
                          {(lang === "fr" && provider.fr?.skills?.[si]) || s}
                        </li>
                      ))}
                    </ul>

                    {/* Visual affordance showing whole card is clickable */}
                    <div className={styles.cardPrompt}>
                      <span>{t("cert.viewCertificates")} ({certCount})</span>
                      <span className={styles.promptArrow} aria-hidden="true">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className={styles.foot}>
        <span className={styles.brandFoot}>
          <b>06</b> Anbuchezhian
        </span>
        <span className={styles.count}>
          01 / {String(CERTIFICATION_PROVIDERS.length).padStart(2, "0")}
        </span>
        <span className={styles.footLbl}>{t("cert.foot")}</span>
      </div>
    </section>
  );
}

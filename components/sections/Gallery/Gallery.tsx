"use client";

/*
 * THE PEOPLE BEHIND THE WORK — DriftWall.
 *
 * Built to the supplied DriftWall reference, in this portfolio's language:
 *   columns 5 · tilt 16° · turn -14° · perspective 1200 · depth 120
 *   speed 42px/s · direction up · variance 0.45 · parallax 0.6 · lift 64
 *   fade 0.6 · radius 14 · roll 0 · pauseOnHover false · grayscale false
 *
 * Two deliberate departures from the reference, both to keep Gireesh's own
 * photographs intact:
 *   · overlayColor #060010 → the portfolio's white ground, as instructed
 *   · dim 0.55 → tiles are NOT darkened. Depth reads through scale, the
 *     perspective itself and the soft edge mask, so every face stays bright.
 *
 * Tiles keep each photograph's TRUE aspect ratio rather than the reference's
 * fixed 200×132, so nothing is stretched and the column rhythm varies
 * naturally — the "slight variation between tiles" comes from the pictures.
 *
 * Columns wrap seamlessly: each column's content is rendered twice and the
 * offset wraps at half its height. Motion is a calm autonomous drift plus a
 * scroll contribution, so the wall is alive when still and responds as the
 * page moves. Pointer adds the parallax lean.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "@/lib/gsap";
import { sceneScrub } from "@/lib/scene";
import { FRAMES } from "@/content/gallery";
import { useLang } from "@/lib/i18n";
import styles from "./Gallery.module.css";

/* ---- DriftWall parameters ---- */
const BASE_SPEED = 28; /* px/s base drift — calm, elegant, museum-quality */
const VARIANCE = 0.22; /* gentle per-column speed spread */
const SCROLL_FACTOR = 420; /* scroll travel contribution */

/* Columns per breakpoint. */
const COLS_DESKTOP = 4;
const COLS_LAPTOP = 4;
const COLS_TABLET = 3;
const COLS_MOBILE = 2;

const colCount = (w: number) =>
  w >= 1400 ? COLS_DESKTOP : w >= 1100 ? COLS_LAPTOP : w >= 700 ? COLS_TABLET : COLS_MOBILE;

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const { t } = useLang();

  /* Columns are computed on the client so the count can follow the viewport.
     Round-robin keeps order across columns. */
  const [cols, setCols] = useState<number>(COLS_DESKTOP);

  useEffect(() => {
    const apply = () => setCols(colCount(window.innerWidth));
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  /* deal the 14 frames into columns, round-robin, preserving order */
  const columns = useMemo(() => {
    const colsArr: (typeof FRAMES)[] = Array.from({ length: cols }, () => []);
    FRAMES.forEach((f, i) => colsArr[i % cols].push(f));
    return colsArr;
  }, [cols]);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const colEls = gsap.utils.toArray<HTMLElement>(`.${styles.colInner}`);
    if (!colEls.length) return;

    const wallEl = el.querySelector<HTMLElement>(`.${styles.wall}`);

    /* per-column speed: alternating slightly for organic rhythm without chaotic spread */
    const speeds = colEls.map(
      (_, i) =>
        BASE_SPEED *
        (1 + (i % 2 === 0 ? 1 : -1) * VARIANCE * ((i + 1) / colEls.length))
    );

    const offsets = colEls.map(() => 0);
    const loopDistances = colEls.map(() => 0);

    /* Measure the exact height of one full set of items (including all gaps).
       Measuring between item[0] and item[N] where N is columns[i].length gives
       100% pixel-perfect seam distance computed directly by browser layout. */
    const view = el.querySelector<HTMLElement>(`.${styles.wallView}`);
    const measure = () => {
      if (view) el.style.setProperty("--wall-h", `${Math.round(view.clientHeight)}px`);
      colEls.forEach((colEl, i) => {
        const n = columns[i]?.length ?? 0;
        if (n > 0 && colEl.children.length >= 2 * n) {
          const item0 = colEl.children[0] as HTMLElement;
          const itemN = colEl.children[n] as HTMLElement;
          if (item0 && itemN) {
            loopDistances[i] = Math.max(1, itemN.offsetTop - item0.offsetTop);
          }
        }
        if (!loopDistances[i] || loopDistances[i] <= 1) {
          loopDistances[i] = Math.max(1, colEl.scrollHeight / 3);
        }
      });
    };

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (view) ro.observe(view);
    measure();
    const t0 = setTimeout(measure, 300);

    /* Smooth lerped scroll integration — no sudden jumps when scrolling starts or stops */
    let targetScrollPush = 0;
    let smoothedScrollPush = 0;
    let lastSmoothedScrollPush = 0;

    /* Subtle cursor parallax */
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentTiltX = 0;
    let currentTiltY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetTiltX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetTiltY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const onPointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const tick = (_t: number, dt: number) => {
      // Clamp delta time to 32ms (max 1 frame lag drop)
      const deltaSec = Math.min(dt / 1000, 0.032);

      // Silky smooth interpolation of scroll push (damping factor 0.08)
      smoothedScrollPush += (targetScrollPush - smoothedScrollPush) * 0.08;
      const scrollDelta = smoothedScrollPush - lastSmoothedScrollPush;
      lastSmoothedScrollPush = smoothedScrollPush;

      // Mouse tilt parallax lerp
      if (wallEl) {
        currentTiltX += (targetTiltX - currentTiltX) * 0.04;
        currentTiltY += (targetTiltY - currentTiltY) * 0.04;
        const rx = 6 - currentTiltY * 2.2;
        const ry = -3 + currentTiltX * 3.2;
        wallEl.style.transform = `translate(-50%, -48%) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      }

      colEls.forEach((c, i) => {
        const D = loopDistances[i];
        if (D <= 1) return;

        // Base autonomous drift
        const drift = speeds[i] * deltaSec;
        // Scroll contribution with subtle per-column parallax weight
        const scrollWeight = 0.85 + (i % 3) * 0.15;
        const scrollMove = scrollDelta * scrollWeight;

        // Additive continuous position
        offsets[i] += drift + scrollMove;

        // Mathematical loop: exactly when offset crosses D, subtract D
        while (offsets[i] >= D) {
          offsets[i] -= D;
        }
        while (offsets[i] < 0) {
          offsets[i] += D;
        }

        c.style.transform = `translate3d(0, ${(-offsets[i]).toFixed(2)}px, 0)`;
      });
    };

    /* only animate while the wall is on screen */
    let running = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          measure();
          gsap.ticker.add(tick);
          running = true;
        } else if (!entry.isIntersecting && running) {
          gsap.ticker.remove(tick);
          running = false;
        }
      },
      { rootMargin: "150px" }
    );
    io.observe(el);

    /* scroll travel scrub */
    const st = ScrollTrigger.create({
      ...sceneScrub(el),
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        targetScrollPush = self.progress * SCROLL_FACTOR;
      },
    });

    gsap.fromTo(
      `.${styles.head} > *`,
      { y: 36, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: EASE.outExpo,
        stagger: 0.09,
        immediateRender: false,
        scrollTrigger: { trigger: el, start: "top 90%" },
      }
    );

    return () => {
      clearTimeout(t0);
      if (running) gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      st.kill();
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [cols, columns]);

  return (
    <section className={styles.gallery} id="gallery" ref={root}>
      <div className={styles.head}>
        <p className={styles.eyebrow}>
          <span>07</span> {t("gallery.eyebrow")}
        </p>
        <h2 className={styles.h2}>
          {t("gallery.h2a")}{" "}
          <em className={styles.serif}>{t("gallery.h2Em")}</em>
        </h2>
        <p className={styles.lede}>{t("gallery.lede")}</p>
      </div>

      <div className={styles.wallView}>
        {/* --cols is driven from JS so the grid can never disagree with the
            number of columns actually rendered */}
        <div className={styles.wall} style={{ "--cols": cols } as React.CSSProperties}>
          {columns.map((col, ci) => (
            <div className={styles.col} key={ci}>
              <div className={styles.colInner}>
                {/* rendered 3 times for a completely seamless, infinite buffer */}
                {[...col, ...col, ...col].map((f, i) => (
                  <figure
                    className={styles.tile}
                    key={`${f.id}-${i}`}
                    style={{ "--ar": f.ar } as React.CSSProperties}
                    aria-hidden={i >= col.length}
                  >
                    <img
                      src={f.src}
                      alt={f.title || (i < col.length ? t("gallery.alt") : "")}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                    />
                  </figure>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* soft edge mask — gentle dissolve at very edges only */}
        <div className={styles.fade} aria-hidden="true" />
      </div>

      <div className={styles.foot}>
        <span className={styles.count}>
          {String(FRAMES.length).padStart(2, "0")} {t("gallery.frames")}
        </span>
        <span className={styles.hint}>{t("gallery.hint")}</span>
      </div>
    </section>
  );
}


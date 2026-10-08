"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import {
  setLenis,
  getLenis,
  scrollToHash,
  headerOffset,
  isProgrammaticScrolling,
  setProgrammaticScrolling,
} from "@/lib/lenis";
import {
  calculateSectionBoundaries,
  findActiveSection,
  getSectionConfig,
  type SectionBoundary,
  type SectionId,
} from "@/lib/sections";

let pendingCrossRouteHash: string | null = null;

/* Single rAF loop: Lenis drives ScrollTrigger.
   Centralized section-boundary calculation, URL synchronization,
   safe hash scrolling, browser Back/Forward (popstate), and deterministic
   cross-route hash restoration. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const boundariesRef = useRef<SectionBoundary[]>([]);
  const currentSectionRef = useRef<SectionId | null>(null);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, touchMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => {
        lenis!.raf(time * 1000);
      };
      gsap.ticker.add(raf, false, true);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    }

    // Cache section boundaries from real Scene/runway document-space geometry
    const refreshBoundaries = () => {
      if (typeof window === "undefined" || window.location.pathname !== "/") return;
      boundariesRef.current = calculateSectionBoundaries(headerOffset());
    };

    // Initial boundary computation
    const timer = setTimeout(refreshBoundaries, 100);

    // Refresh boundaries on ScrollTrigger refresh, window resize, and orientationchange
    ScrollTrigger.addEventListener("refresh", refreshBoundaries);
    let resizeTimer: NodeJS.Timeout | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        refreshBoundaries();
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    // Active section scroll-spy & scroll-driven URL synchronization
    const onScrollUpdate = (scrollY: number) => {
      if (window.location.pathname !== "/" || isProgrammaticScrolling()) return;

      if (boundariesRef.current.length === 0) {
        refreshBoundaries();
        if (boundariesRef.current.length === 0) return;
      }

      const active = findActiveSection(scrollY, boundariesRef.current);
      if (!active) return;

      if (active.id !== currentSectionRef.current) {
        currentSectionRef.current = active.id;

        // Synchronize URL using history.replaceState (never pushState during scroll)
        const targetHash = active.id === "home" ? "" : active.hash;
        const currentHash = window.location.hash;
        if (targetHash !== currentHash) {
          const targetUrl = targetHash
            ? `${window.location.pathname}${targetHash}`
            : window.location.pathname;
          history.replaceState(null, "", targetUrl);
        }

        // Broadcast to Nav and other listeners
        window.dispatchEvent(
          new CustomEvent("portfolio-section-change", {
            detail: { id: active.id, hash: active.hash },
          })
        );
      }
    };

    if (lenis) {
      lenis.on("scroll", (e: { scroll: number }) => {
        onScrollUpdate(e.scroll);
      });
    } else {
      const onNativeScroll = () => onScrollUpdate(window.scrollY);
      window.addEventListener("scroll", onNativeScroll, { passive: true });
    }

    /* Delegated link click handler:
       Captures link clicks in CAPTURE phase so router or preventDefault cannot swallow cross-route section intent */
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as Element)?.closest?.<HTMLAnchorElement>("a[href]");
      const href = link?.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      if (href === "/") {
        try {
          sessionStorage.removeItem("portfolio_from_case_study");
          sessionStorage.removeItem("portfolio_from_certifications");
          sessionStorage.removeItem("portfolio_from_stack");
          sessionStorage.setItem("portfolio_target_hash", "#home");
        } catch {
          // ignore
        }
        pendingCrossRouteHash = "#home";
        return;
      }

      if (href.startsWith("#")) {
        e.preventDefault();
        scrollToHash(href);
        return;
      }

      if (href.startsWith("/#") || href.includes("#")) {
        const hashIdx = href.indexOf("#");
        const hash = href.slice(hashIdx);
        if (window.location.pathname === "/") {
          e.preventDefault();
          scrollToHash(hash);
          return;
        }
        // Different route: store target section in sessionStorage and pending queue
        try {
          sessionStorage.setItem("portfolio_target_hash", hash);
        } catch {
          // ignore storage error
        }
        pendingCrossRouteHash = hash;
      }
    };
    document.addEventListener("click", onClick, { capture: true });

    /* Browser Back/Forward navigation listener:
       Synchronizes visible section with URL without creating recursive history entries */
    const onPopState = () => {
      if (window.location.pathname !== "/") return;
      let hash = window.location.hash;
      if (!hash && pendingCrossRouteHash) {
        hash = pendingCrossRouteHash;
      }
      if (!hash) {
        try {
          hash = sessionStorage.getItem("portfolio_target_hash") || "";
        } catch {}
      }
      if (!hash) {
        try {
          if (sessionStorage.getItem("portfolio_from_case_study") === "true") {
            hash = "#work";
          } else if (sessionStorage.getItem("portfolio_from_certifications") === "true") {
            hash = "#certifications";
          } else if (sessionStorage.getItem("portfolio_from_stack") === "true") {
            hash = "#stack";
          }
        } catch {}
      }
      if (hash && hash !== "#home") {
        pendingCrossRouteHash = hash;
        setProgrammaticScrolling(true);
        const section = getSectionConfig(hash);
        if (section) {
          window.dispatchEvent(
            new CustomEvent("portfolio-section-change", {
              detail: { id: section.id, hash: section.hash },
            })
          );
        }
      }
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      clearTimeout(timer);
      if (resizeTimer) clearTimeout(resizeTimer);
      ScrollTrigger.removeEventListener("refresh", refreshBoundaries);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  /* Route change scroll handler:
     Deterministic cross-route hash navigation.
     When entering a new page without a hash, reset scroll position immediately to top (0px).
     If a hash is present (or queued cross-route), wait until destination layout reflow has
     settled to its true non-zero offset, and immediately lock to the section. */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let targetHash = window.location.hash;
    if (!targetHash && pendingCrossRouteHash) {
      targetHash = pendingCrossRouteHash;
    }
    if (!targetHash) {
      try {
        targetHash = sessionStorage.getItem("portfolio_target_hash") || "";
      } catch {
        // ignore
      }
    }
    if (!targetHash) {
      try {
        if (sessionStorage.getItem("portfolio_from_case_study") === "true") {
          targetHash = "#work";
        } else if (sessionStorage.getItem("portfolio_from_certifications") === "true") {
          targetHash = "#certifications";
        } else if (sessionStorage.getItem("portfolio_from_stack") === "true") {
          targetHash = "#stack";
        }
      } catch {
        // ignore
      }
    }
    if (!targetHash && typeof document !== "undefined" && document.referrer) {
      if (document.referrer.includes("/work/")) {
        targetHash = "#work";
      } else if (document.referrer.includes("/certifications/")) {
        targetHash = "#certifications";
      } else if (document.referrer.includes("/stack")) {
        targetHash = "#stack";
      }
    }

    if (targetHash && pathname === "/") {
      // Lock programmatic scroll immediately so onScrollUpdate at initial 0px cannot
      // corrupt or wipe the destination hash before layout and scrolling complete
      setProgrammaticScrolling(true);

      const section = getSectionConfig(targetHash);
      const targetId = section?.id || targetHash.replace(/^[/#]+/, "").split("?")[0].trim();
      const isHome =
        targetId === "home" ||
        targetId === "intro" ||
        targetId === "hero" ||
        targetHash === "#home";

      if (isHome) {
        pendingCrossRouteHash = null;
        try {
          sessionStorage.removeItem("portfolio_from_case_study");
          sessionStorage.removeItem("portfolio_from_certifications");
          sessionStorage.removeItem("portfolio_from_stack");
          sessionStorage.removeItem("portfolio_target_hash");
        } catch {}
        scrollToHash("#home", { immediate: true, updateHistory: false });
        return;
      }

      let frameCount = 0;
      const maxFrames = 120; // Up to 2 seconds for complete DOM reflow and font metrics
      let lastMeasuredScroll = -1;
      let confirmedCount = 0;

      const checkAndScroll = () => {
        let el = targetId ? document.getElementById(targetId) : null;
        if (!el && section?.sceneId) {
          el = document.querySelector(`[data-scene="${section.sceneId}"]`);
        }

        const isDesktop = window.matchMedia("(min-width: 1001px)").matches;
        let measuredScroll = 0;

        if (el) {
          if (isDesktop && (section?.isStickyScene || section?.id === "about")) {
            const hold = (el.closest("[data-scene]") as HTMLElement | null) || el;
            measuredScroll = hold.offsetTop;
          } else {
            const hold = (el.closest("[data-scene]") as HTMLElement | null) || el;
            const sceneContainer = (hold.closest("[data-scene-order]") as HTMLElement | null);
            const isMobileKeepFrame =
              hold.getAttribute("data-scene") === "journey" ||
              hold.getAttribute("data-scene") === "gallery" ||
              hold.getAttribute("data-scene") === "hero";

            if (isMobileKeepFrame && sceneContainer) {
              measuredScroll = Math.max(0, sceneContainer.offsetTop);
            } else {
              const rect = el.getBoundingClientRect();
              measuredScroll = Math.max(0, rect.top + window.scrollY - headerOffset());
            }
          }
        }

        // Layout is ready when element exists AND:
        // - on desktop sticky scenes: offsetTop MUST be > 500 (not 0) and matches previous measurement
        // - on mobile/flow: measuredScroll has resolved > 100 and matches previous measurement
        const isMeasuredValid = isDesktop
          ? (!section?.isStickyScene || measuredScroll > 500)
          : measuredScroll > 100;

        const isLayoutReady = el && isMeasuredValid && (measuredScroll === lastMeasuredScroll);

        if (el && isMeasuredValid && measuredScroll !== lastMeasuredScroll) {
          lastMeasuredScroll = measuredScroll;
          confirmedCount = 0;
          const lenis = getLenis();
          if (lenis) {
            lenis.scrollTo(measuredScroll, { immediate: true });
          }
          window.scrollTo({ top: measuredScroll, behavior: "auto" });
        }

        if (isLayoutReady) {
          confirmedCount++;
          if (confirmedCount >= 2) {
            ScrollTrigger.refresh();
            boundariesRef.current = calculateSectionBoundaries(headerOffset());

            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(measuredScroll, { immediate: true });
            }
            window.scrollTo({ top: measuredScroll, behavior: "auto" });

            if (section?.hash && window.location.hash !== section.hash) {
              history.replaceState(null, "", `${window.location.pathname}${section.hash}`);
            }

            if (section) {
              window.dispatchEvent(
                new CustomEvent("portfolio-section-change", {
                  detail: { id: section.id, hash: section.hash },
                })
              );
            }

            pendingCrossRouteHash = null;

            // Clear one-time route transition flags now that destination is settled
            try {
              sessionStorage.removeItem("portfolio_from_case_study");
              sessionStorage.removeItem("portfolio_from_certifications");
              sessionStorage.removeItem("portfolio_from_stack");
              sessionStorage.removeItem("portfolio_target_hash");
            } catch {}

            // Keep programmatic lock active for another 400ms to absorb any latent scroll events
            setTimeout(() => {
              setProgrammaticScrolling(false);
            }, 400);

            return;
          }
        }

        if (frameCount < maxFrames) {
          frameCount++;
          requestAnimationFrame(checkAndScroll);
        } else {
          // Fallback if maxFrames reached: position at best known measurement
          if (el && measuredScroll > 0) {
            ScrollTrigger.refresh();
            boundariesRef.current = calculateSectionBoundaries(headerOffset());
            const lenis = getLenis();
            if (lenis) {
              lenis.scrollTo(measuredScroll, { immediate: true });
            }
            window.scrollTo({ top: measuredScroll, behavior: "auto" });
            if (section?.hash && window.location.hash !== section.hash) {
              history.replaceState(null, "", `${window.location.pathname}${section.hash}`);
            }
          }
          pendingCrossRouteHash = null;
          setTimeout(() => {
            setProgrammaticScrolling(false);
          }, 400);
        }
      };

      requestAnimationFrame(checkAndScroll);
    } else if (pathname === "/") {
      // Landing on root without any target hash and not from a subpage
      pendingCrossRouteHash = null;
      try {
        sessionStorage.removeItem("portfolio_from_case_study");
        sessionStorage.removeItem("portfolio_from_certifications");
        sessionStorage.removeItem("portfolio_from_stack");
        sessionStorage.removeItem("portfolio_target_hash");
      } catch {}
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    } else {
      // Non-home subpage (e.g. /work/[slug] or /stack)
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}

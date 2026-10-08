import type Lenis from "lenis";
import { getSectionConfig } from "./sections";

/* Shared Lenis instance + one place that owns in-page anchor scrolling,
   so the fixed header can never cover the top of a section. */

let instance: Lenis | null = null;
let isProgrammatic = false;
let unlockTimeout: NodeJS.Timeout | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export const isProgrammaticScrolling = (): boolean => isProgrammatic;

export const setProgrammaticScrolling = (val: boolean) => {
  isProgrammatic = val;
  if (!val && unlockTimeout) {
    clearTimeout(unlockTimeout);
    unlockTimeout = null;
  }
};

/** Distance the header occupies, plus breathing room below it.
 *  Read from the --nav-offset custom property so the smooth-scrolled path and
 *  the CSS scroll-margin-top path can never disagree. Deliberately NOT measured
 *  from the live header box: the nav hides on scroll-down, so a measurement
 *  taken mid-click would be short and the section would land under it. */
export function headerOffset() {
  if (typeof document === "undefined") return 104;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-offset"
  );
  const px = parseFloat(raw);
  return Number.isFinite(px) ? px : 104;
}

export type ScrollToHashOptions = {
  duration?: number;
  immediate?: boolean;
  updateHistory?: boolean;
  onComplete?: () => void;
};

/**
 * Scroll safely to an in-page target, properly distinguishing sticky Scenes from
 * normal flow sections and preventing DOMException on malformed hashes.
 */
export function scrollToHash(rawHash: string, options: ScrollToHashOptions = {}) {
  if (typeof document === "undefined" || !rawHash) return;

  const {
    duration = 1.1,
    immediate = false,
    updateHistory = true,
    onComplete,
  } = options;

  const section = getSectionConfig(rawHash);
  const isHome =
    rawHash === "#home" ||
    rawHash === "#top" ||
    rawHash === "#" ||
    rawHash === "/" ||
    section?.id === "home";

  const lenis = getLenis();
  const isDesktop = window.matchMedia("(min-width: 1001px)").matches;

  // Lock programmatic scroll so scroll-spy does not fight the transition
  setProgrammaticScrolling(true);
  if (unlockTimeout) clearTimeout(unlockTimeout);
  unlockTimeout = setTimeout(() => {
    setProgrammaticScrolling(false);
  }, Math.max(1400, (duration || 1.1) * 1000 + 300));

  const finish = () => {
    setProgrammaticScrolling(false);
    onComplete?.();
  };

  if (isHome) {
    if (updateHistory) {
      history.pushState(null, "", window.location.pathname);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio-section-change", {
          detail: { id: "home", hash: "" },
        })
      );
    }
    if (lenis) {
      if (immediate) {
        lenis.scrollTo(0, { immediate: true });
        if (unlockTimeout) clearTimeout(unlockTimeout);
        unlockTimeout = setTimeout(() => {
          setProgrammaticScrolling(false);
          onComplete?.();
        }, 400);
      } else {
        lenis.scrollTo(0, { duration, onComplete: finish });
      }
    } else {
      window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
      if (immediate) {
        if (unlockTimeout) clearTimeout(unlockTimeout);
        unlockTimeout = setTimeout(() => {
          setProgrammaticScrolling(false);
          onComplete?.();
        }, 400);
      } else {
        finish();
      }
    }
    return;
  }

  // Find target element safely without querySelector injection
  const targetId = section?.id || rawHash.replace(/^[/#]+/, "").split("?")[0].trim();
  let targetEl = targetId ? document.getElementById(targetId) : null;

  if (!targetEl && section?.sceneId) {
    targetEl = document.querySelector(`[data-scene="${section.sceneId}"]`);
  }

  if (!targetEl) {
    // Target element not found, safely release lock
    setProgrammaticScrolling(false);
    return;
  }

  // Compute destination scroll position:
  // - Sticky Scene: must reach hold.offsetTop so the frame pins at top: 0.
  // - Normal flow: subtract headerOffset so header does not obscure title.
  let targetScroll = 0;
  if (isDesktop && (section?.isStickyScene || section?.id === "about")) {
    const hold = (targetEl.closest("[data-scene]") as HTMLElement | null) || targetEl;
    targetScroll = hold.offsetTop;

    // Safety: If this is a sticky scene other than home, targetScroll must not be 0.
    // An offsetTop of 0 means the browser layout reflow hasn't finished measuring preceding scenes.
    if (section.id !== "home" && targetScroll === 0) {
      setProgrammaticScrolling(false);
      return;
    }
  } else {
    const hold = (targetEl.closest("[data-scene]") as HTMLElement | null) || targetEl;
    const sceneContainer = (hold.closest("[data-scene-order]") as HTMLElement | null);
    const isMobileKeepFrame =
      hold.getAttribute("data-scene") === "journey" ||
      hold.getAttribute("data-scene") === "gallery" ||
      hold.getAttribute("data-scene") === "hero";

    if (isMobileKeepFrame && sceneContainer) {
      targetScroll = Math.max(0, sceneContainer.offsetTop);
    } else {
      const rect = targetEl.getBoundingClientRect();
      targetScroll = Math.max(0, rect.top + window.scrollY - headerOffset());
    }
  }

  if (updateHistory && section) {
    history.pushState(null, "", section.hash);
  }

  if (section && typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("portfolio-section-change", {
        detail: { id: section.id, hash: section.hash },
      })
    );
  }

  if (lenis) {
    if (immediate) {
      lenis.scrollTo(targetScroll, { immediate: true });
      window.scrollTo({ top: targetScroll, behavior: "auto" });
      if (unlockTimeout) clearTimeout(unlockTimeout);
      unlockTimeout = setTimeout(() => {
        setProgrammaticScrolling(false);
        onComplete?.();
      }, 400);
    } else {
      lenis.scrollTo(targetScroll, { duration, onComplete: finish });
    }
  } else {
    window.scrollTo({
      top: targetScroll,
      behavior: immediate ? "auto" : "smooth",
    });
    if (immediate) {
      if (unlockTimeout) clearTimeout(unlockTimeout);
      unlockTimeout = setTimeout(() => {
        setProgrammaticScrolling(false);
        onComplete?.();
      }, 400);
    } else {
      finish();
    }
  }
}

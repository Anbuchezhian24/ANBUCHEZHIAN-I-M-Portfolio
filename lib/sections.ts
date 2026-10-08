/* Centralized single source of truth for portfolio sections.
 * Canonical section order:
 * home -> about -> journey -> stack -> work -> experience -> certifications -> gallery -> contact
 */

export type SectionId =
  | "home"
  | "about"
  | "journey"
  | "stack"
  | "work"
  | "experience"
  | "certifications"
  | "gallery"
  | "contact";

export type SectionConfig = {
  id: SectionId;
  hash: `#${SectionId}`;
  /**
   * Scene identifier used in data-scene / data-runway attributes
   * if different from id (e.g. Scene order 8 has data-scene="credentials")
   */
  sceneId?: string;
  /** Whether the section is held inside a sticky 100svh Scene frame on desktop */
  isStickyScene: boolean;
  /** Main navigation link key this section maps to in Nav.tsx */
  navKey: "nav.home" | "nav.about" | "nav.work" | "nav.contact" | null;
};

export const SECTIONS: SectionConfig[] = [
  { id: "home", hash: "#home", sceneId: "hero", isStickyScene: false, navKey: "nav.home" },
  { id: "about", hash: "#about", sceneId: "about", isStickyScene: false, navKey: "nav.about" },
  { id: "journey", hash: "#journey", sceneId: "journey", isStickyScene: true, navKey: "nav.about" },
  { id: "stack", hash: "#stack", sceneId: "stack", isStickyScene: true, navKey: "nav.about" },
  { id: "work", hash: "#work", sceneId: "work", isStickyScene: true, navKey: "nav.work" },
  { id: "experience", hash: "#experience", sceneId: "experience", isStickyScene: true, navKey: "nav.work" },
  { id: "certifications", hash: "#certifications", sceneId: "credentials", isStickyScene: true, navKey: "nav.work" },
  { id: "gallery", hash: "#gallery", sceneId: "gallery", isStickyScene: true, navKey: "nav.work" },
  { id: "contact", hash: "#contact", isStickyScene: false, navKey: "nav.contact" },
];

export const SECTION_IDS: SectionId[] = SECTIONS.map((s) => s.id);

/**
 * Normalizes an arbitrary hash or ID string and returns the matching canonical SectionConfig.
 * Handles prefixes (#), query parameters, trailing slashes, and legacy aliases.
 */
export function getSectionConfig(rawHashOrId: string | null | undefined): SectionConfig | undefined {
  if (!rawHashOrId) return undefined;
  const clean = rawHashOrId
    .replace(/^[/#]+/, "")
    .split("?")[0]
    .split("&")[0]
    .trim()
    .toLowerCase();

  if (!clean) return undefined;

  // Recognized aliases
  if (clean === "top" || clean === "intro" || clean === "hero") {
    return SECTIONS.find((s) => s.id === "home");
  }
  if (clean === "credentials") {
    return SECTIONS.find((s) => s.id === "certifications");
  }

  return SECTIONS.find((s) => s.id === clean);
}

export type SectionBoundary = {
  id: SectionId;
  hash: string;
  start: number;
  end: number;
};

/**
 * Calculates real document-space boundaries for all canonical sections
 * based on Scene hold and runway geometry.
 */
export function calculateSectionBoundaries(headerOffsetPx: number = 104): SectionBoundary[] {
  if (typeof document === "undefined") return [];

  const isDesktop = window.matchMedia("(min-width: 1001px)").matches;
  const boundaries: SectionBoundary[] = [];

  for (let i = 0; i < SECTIONS.length; i++) {
    const config = SECTIONS[i];

    if (config.id === "home") {
      boundaries.push({
        id: "home",
        hash: "",
        start: 0,
        end: 0,
      });
      continue;
    }

    let el = document.getElementById(config.id);
    if (!el && config.sceneId) {
      el = document.querySelector(`[data-scene="${config.sceneId}"]`);
    }

    if (!el) continue;

    const hold = (el.closest("[data-scene]") as HTMLElement | null) || el;
    const sceneContainer = (hold.closest("[data-scene-order]") as HTMLElement | null);

    if (isDesktop && (config.isStickyScene || config.id === "about")) {
      const runway =
        (hold.nextElementSibling as HTMLElement | null) ??
        (hold.parentElement?.querySelector<HTMLElement>(":scope > [data-runway]") ?? null);
      const start = hold.offsetTop;
      const distance =
        runway && runway.hasAttribute("data-runway") ? runway.offsetHeight : 0;
      const end = start + distance;

      boundaries.push({
        id: config.id,
        hash: config.hash,
        start,
        end,
      });
    } else {
      // Normal flow (Contact, or any section on mobile)
      const targetBox = sceneContainer || hold || el;
      const rect = targetBox.getBoundingClientRect();
      const start = Math.max(0, rect.top + window.scrollY - (config.isStickyScene ? 0 : headerOffsetPx));
      const end = start + targetBox.offsetHeight;

      boundaries.push({
        id: config.id,
        hash: config.hash,
        start,
        end,
      });
    }
  }

  // Adjust contiguous ranges so there are no dead zones between sections
  for (let i = 0; i < boundaries.length - 1; i++) {
    boundaries[i].end = boundaries[i + 1].start;
  }
  if (boundaries.length > 0) {
    boundaries[boundaries.length - 1].end = Number.MAX_SAFE_INTEGER;
  }

  return boundaries;
}

/**
 * Finds the currently active section given the current scroll position and boundaries.
 */
export function findActiveSection(
  scrollY: number,
  boundaries: SectionBoundary[],
  viewportHeight: number = typeof window !== "undefined" ? window.innerHeight : 900
): SectionBoundary | undefined {
  if (boundaries.length === 0) return undefined;

  // Viewport reference line: 30% down the screen for natural visual focus
  const referencePoint = scrollY + Math.min(viewportHeight * 0.3, 260);

  for (let i = boundaries.length - 1; i >= 0; i--) {
    if (referencePoint >= boundaries[i].start) {
      return boundaries[i];
    }
  }

  return boundaries[0];
}

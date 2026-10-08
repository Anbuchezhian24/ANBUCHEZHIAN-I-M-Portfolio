"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/lib/i18n";
import { getSectionConfig, type SectionId } from "@/lib/sections";
import { scrollToHash, getLenis } from "@/lib/lenis";
import styles from "./Nav.module.css";

/* `#home` resolves to the very top of the document (see lib/lenis.ts), so
   Home always returns to the true beginning of the portfolio. */
const LINKS = [
  { key: "nav.home", href: "#home", watch: null },
  { key: "nav.about", href: "#about", watch: "about" },
  { key: "nav.work", href: "#work", watch: "work" },
  { key: "nav.contact", href: "#contact", watch: "contact" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);

  /* mobile drawer — the desktop pill can't hold four links plus the toggle
     at phone widths, so below 900px navigation lives behind a menu button
     rather than being hidden entirely */
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  /* Smart scroll direction tracking: hides navbar on sustained downward scroll
     so it never obscures mobile forms or cards, and brings it back instantly on upward scroll. */
  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const diff = currentY - lastY;

        if (menuOpen) {
          setNavVisible(true);
          lastY = currentY;
          ticking = false;
          return;
        }

        if (currentY <= 60) {
          setNavVisible(true);
        } else if (diff > 12 && currentY > 120) {
          setNavVisible(false);
        } else if (diff < -8) {
          setNavVisible(true);
        }

        lastY = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  /* close on Escape, lock body, and safely coordinate with Lenis */
  useEffect(() => {
    if (!menuOpen) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [menuOpen]);

  /* never leave the drawer open behind a resize to desktop */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const close = () => {
      if (mq.matches) {
        setMenuOpen(false);
        document.body.style.overflow = "";
        getLenis()?.start();
      }
    };
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  /* Header scrolled condensation trigger */
  useEffect(() => {
    const nav = ref.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top-=40",
        onUpdate: (self) => {
          nav.classList.toggle(styles.scrolled, self.scroll() > 40);
        },
        onLeaveBack: () => nav.classList.remove(styles.scrolled),
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  /* Listen to centralized scroll-spy section changes */
  useEffect(() => {
    const updateActiveFromId = (sectionId: SectionId | string) => {
      const config = getSectionConfig(sectionId);
      if (!config || config.navKey === "nav.home") {
        setActive(null);
      } else if (config.navKey === "nav.about") {
        setActive("about");
      } else if (config.navKey === "nav.work") {
        setActive("work");
      } else if (config.navKey === "nav.contact") {
        setActive("contact");
      }
    };

    if (typeof window !== "undefined" && window.location.hash) {
      updateActiveFromId(window.location.hash);
    }

    const onSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ id: SectionId; hash: string }>;
      const sectionId = customEvent.detail?.id;
      if (sectionId) {
        updateActiveFromId(sectionId);
      }
    };

    window.addEventListener("portfolio-section-change", onSectionChange);
    return () => {
      window.removeEventListener("portfolio-section-change", onSectionChange);
    };
  }, []);

  const handleMobileNavClick = useCallback((href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    document.body.style.overflow = "";
    getLenis()?.start();
    requestAnimationFrame(() => {
      scrollToHash(href);
    });
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    getLenis()?.start();
  }, []);

  return (
    <header
      className={`${styles.wrap} ${!navVisible && !menuOpen ? styles.hidden : ""}`}
      ref={ref}
    >
      <div className={styles.cap}>
        <a href="#home" className={styles.logo} aria-label={t("nav.home")}>
          Anbuchezhian<i>.</i>
        </a>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => {
            const isOn = l.watch === active;
            return (
              <a
                key={l.key}
                href={l.href}
                className={isOn ? styles.on : ""}
                aria-current={isOn ? "page" : undefined}
                onClick={() => {
                  setActive(l.watch);
                }}
              >
                <span className={styles.roll}>
                  <span>{t(l.key)}</span>
                  <span aria-hidden="true">{t(l.key)}</span>
                </span>
              </a>
            );
          })}
        </nav>

        <div className={styles.right}>
          <LanguageToggle />
          <button
            type="button"
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ---------- mobile drawer ---------- */}
      <div
        className={`${styles.sheet} ${menuOpen ? styles.sheetOpen : ""}`}
        id="mobile-nav"
        hidden={!menuOpen}
      >
        <nav aria-label="Primary mobile">
          {LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={l.watch === active ? styles.sheetOn : ""}
              aria-current={l.watch === active ? "page" : undefined}
              onClick={(e) => handleMobileNavClick(l.href, e)}
            >
              {t(l.key)}
            </a>
          ))}
        </nav>
      </div>
      <button
        type="button"
        className={`${styles.scrim} ${menuOpen ? styles.scrimOn : ""}`}
        aria-label={t("nav.close")}
        tabIndex={menuOpen ? 0 : -1}
        onClick={handleCloseMenu}
      />
    </header>
  );
}

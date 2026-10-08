"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Cert } from "@/content/certifications";
import { useLang, L } from "@/lib/i18n";
import { getLenis } from "@/lib/lenis";
import styles from "./CertificateModal.module.css";

const emptySubscribe = () => () => {};

type Props = {
  cert: Cert | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function CertificateModal({ cert, isOpen, onClose }: Props) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { t, lang } = useLang();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Save previous scroll overflow style
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Pause smooth scroll (Lenis) if active
    const lenis = getLenis();
    if (lenis) lenis.stop();

    // Auto-focus close button for keyboard accessibility
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      if (lenis) lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !cert) return null;

  const title = L(lang, cert, "title");
  const description =
    (lang === "fr" && cert.fr?.description) || cert.description;

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div className={styles.modal}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowNo}>{cert.no}</span>
              <span>·</span>
              <span>{t("cert.modalRecord")}</span>
            </div>
            <h3 id="cert-modal-title" className={styles.title}>
              {title}
            </h3>
            <div className={styles.metaRow}>
              {cert.issuer && (
                <span className={styles.metaItem}>
                  <span>{t("cert.issuedBy")}:</span>
                  <strong>{cert.issuer}</strong>
                </span>
              )}
              {cert.year && (
                <>
                  <span className={styles.metaDot} aria-hidden="true">
                    •
                  </span>
                  <span className={styles.metaItem}>
                    <span>{t("cert.year")}:</span>
                    <strong>{cert.year}</strong>
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t("cert.closeModal")}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        {/* Content Body */}
        <div className={styles.content}>
          {/* Certificate Area */}
          <div className={styles.previewCol}>
            <div className={styles.previewCard}>
              {cert.certificateImage ? (
                <img
                  src={cert.certificateImage}
                  alt={title}
                  className={styles.certImage}
                />
              ) : (
                <div className={styles.placeholderBox}>
                  <div className={styles.placeholderIcon} aria-hidden="true">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-4" />
                      <path d="M9 15l3-3 3 3" />
                    </svg>
                  </div>
                  <h4 className={styles.placeholderTitle}>
                    {t("cert.previewComing")}
                  </h4>
                  <p className={styles.placeholderText}>
                    {t("cert.previewNotice")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className={styles.detailsCol}>
            <div className={styles.recordGrid}>
              <div className={styles.recordItem}>
                <span className={styles.recordLabel}>{t("cert.issuedBy")}</span>
                <span className={styles.recordValue}>
                  {cert.issuer ?? t("cert.tbc")}
                </span>
              </div>

              <div className={styles.recordItem}>
                <span className={styles.recordLabel}>{t("cert.year")}</span>
                <span className={styles.recordValue}>
                  {cert.year ?? t("cert.tbc")}
                </span>
              </div>

              {cert.credentialId && (
                <div className={styles.recordItem}>
                  <span className={styles.recordLabel}>{t("cert.id")}</span>
                  <span className={`${styles.recordValue} ${styles.monoVal}`}>
                    {cert.credentialId}
                  </span>
                </div>
              )}

              {cert.metric && (
                <div className={styles.recordItem}>
                  <span className={styles.recordLabel}>
                    {(lang === "fr" && cert.fr?.metricLabel) || cert.metric.label}
                  </span>
                  <span className={styles.recordValue}>{cert.metric.value}</span>
                </div>
              )}
            </div>

            {cert.skills.length > 0 && (
              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>{t("cert.skillsFocus")}</span>
                <ul className={styles.skillsList}>
                  {cert.skills.map((s, si) => (
                    <li key={s} className={styles.skillPill}>
                      {(lang === "fr" && cert.fr?.skills?.[si]) || s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {description && (
              <div className={styles.sectionBlock}>
                <span className={styles.sectionLabel}>{t("cert.description")}</span>
                <p className={styles.descriptionText}>{description}</p>
              </div>
            )}

            {cert.credentialUrl && (
              <div className={styles.verifyAction}>
                <a
                  className={styles.verifyLink}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{t("cert.verify")}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

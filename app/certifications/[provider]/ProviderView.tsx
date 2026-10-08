"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LanguageToggle from "@/components/layout/LanguageToggle";
import CertificateModal from "@/components/sections/Certifications/CertificateModal";
import {
  CERTIFICATION_PROVIDERS,
  getCertificateCountLabel,
  type CertificationProvider,
  type IndividualCert,
} from "@/content/certifications";
import { getLenis } from "@/lib/lenis";
import { useLang, L } from "@/lib/i18n";
import styles from "./provider.module.css";

type Props = {
  provider: CertificationProvider;
};

export default function ProviderView({ provider }: Props) {
  const { t, lang } = useLang();
  const [selectedCert, setSelectedCert] = useState<IndividualCert | null>(null);

  // Scroll to top immediately when provider page loads or changes, and record section origin
  useEffect(() => {
    try {
      sessionStorage.setItem("portfolio_from_certifications", "true");
      sessionStorage.setItem("portfolio_target_hash", "#certifications");
    } catch {
      // ignore
    }
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [provider.slug]);

  const certCount = provider.certificates.length;
  const countLabel = getCertificateCountLabel(certCount, lang);

  // Other providers for quick navigation at the bottom
  const otherProviders = CERTIFICATION_PROVIDERS.filter(
    (p) => p.slug !== provider.slug
  );

  return (
    <main className={styles.page}>
      {/* Top persistent navigation bar */}
      <div className={styles.bar}>
        <Link
          href="/#certifications"
          className={styles.back}
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
          {t("cert.backToCerts")}
        </Link>
        <div className={styles.barRight}>
          <Link
            href="/"
            className={styles.logo}
            onClick={() => {
              try {
                sessionStorage.removeItem("portfolio_from_certifications");
                sessionStorage.removeItem("portfolio_from_case_study");
                sessionStorage.removeItem("portfolio_from_stack");
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
        {/* Provider Hero Header */}
        <header className={styles.hero}>
          <div className={styles.kickerRow}>
            <span className={styles.kicker}>
              <span>{provider.no}</span> · {t("cert.providerLabel")}
            </span>
            <span className={styles.countBadge}>{countLabel}</span>
          </div>

          <div className={styles.titleRow}>
            <div className={styles.titleCol}>
              <h1 className={styles.title}>{L(lang, provider, "title")}</h1>
              <p className={styles.tagline}>
                {(lang === "fr" && provider.fr?.tagline) || provider.tagline}
              </p>
            </div>

            {provider.logo ? (
              <div className={styles.logoCard}>
                <img
                  src={provider.logo.src}
                  alt={provider.name}
                  style={{ aspectRatio: provider.logo.aspect }}
                />
              </div>
            ) : null}
          </div>

          <p className={styles.description}>
            {(lang === "fr" && provider.fr?.description) || provider.description}
          </p>

          <div className={styles.metaStrip}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>{t("cert.issuedBy")}</span>
              <strong className={styles.metaValue}>{provider.name}</strong>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>
                {t("cert.certificatesAvailable")}
              </span>
              <strong className={styles.metaValue}>{certCount}</strong>
            </div>
            {provider.metric && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>
                  {(lang === "fr" && provider.fr?.metricLabel) ||
                    provider.metric.label}
                </span>
                <strong className={styles.metaValue}>
                  {provider.metric.value}
                </strong>
              </div>
            )}
          </div>
        </header>

        {/* Certificates Grid / List */}
        <section className={styles.certsSection} aria-label="Certificates list">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {t("cert.providerCredentials")}
            </h2>
            <span className={styles.sectionSub}>
              {countLabel}
            </span>
          </div>

          <div className={styles.grid}>
            {provider.certificates.map((cert, index) => {
              const certTitle = L(lang, cert, "title");
              const certDesc =
                (lang === "fr" && cert.fr?.description) || cert.description;

              return (
                <article key={cert.id || cert.title} className={styles.card}>
                  {/* Visual Preview / Thumbnail */}
                  <div
                    className={styles.imageBox}
                    onClick={() => setSelectedCert(cert)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCert(cert);
                      }
                    }}
                    aria-label={`Open certificate preview — ${certTitle}`}
                  >
                    {cert.certificateImage ? (
                      <div className={styles.imageWrap}>
                        <img
                          src={cert.certificateImage}
                          alt={certTitle}
                          className={styles.certThumb}
                        />
                        <div className={styles.imageOverlay}>
                          <span>{t("cert.viewCertLabel")}</span>
                          <span className={styles.overlayArrow} aria-hidden="true">
                            ↗
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <div className={styles.phIcon} aria-hidden="true">
                          <svg
                            width="28"
                            height="28"
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
                        <span className={styles.phText}>
                          {t("cert.previewComing")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Certificate Information */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardBand}>
                      <span className={styles.certIndex}>
                        {cert.no || String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.cardIssuer}>{cert.issuer}</span>
                      <span
                        className={`${styles.cardStatus} ${cert.verified ? styles.ok : ""}`}
                      >
                        {cert.verified ? t("cert.verified") : t("cert.onRequest")}
                      </span>
                    </div>

                    <h3 className={styles.cardTitle}>{certTitle}</h3>

                    {certDesc && (
                      <p className={styles.cardDesc}>{certDesc}</p>
                    )}

                    {/* Metadata fields */}
                    <dl className={styles.certMeta}>
                      <div>
                        <dt>{t("cert.year")}</dt>
                        <dd>{cert.year ?? t("cert.tbc")}</dd>
                      </div>
                      <div>
                        <dt>{t("cert.id")}</dt>
                        <dd className={styles.mono}>
                          {cert.credentialId ?? "—"}
                        </dd>
                      </div>
                      {cert.metric && (
                        <div>
                          <dt>
                            {(lang === "fr" && cert.fr?.metricLabel) ||
                              cert.metric.label}
                          </dt>
                          <dd>{cert.metric.value}</dd>
                        </div>
                      )}
                    </dl>

                    {/* Skills pills */}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className={styles.skillsBox}>
                        <ul className={styles.skillList}>
                          {cert.skills.map((skill, si) => (
                            <li key={skill} className={styles.skillPill}>
                              {(lang === "fr" && cert.fr?.skills?.[si]) || skill}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.viewBtn}
                        onClick={() => setSelectedCert(cert)}
                        aria-label={`${t("cert.viewCertLabel")} — ${certTitle}`}
                      >
                        <span>{t("cert.viewCertLabel")}</span>
                        <span className={styles.btnArrow} aria-hidden="true">
                          →
                        </span>
                      </button>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.verifyLink}
                        >
                          {t("cert.verify")}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Other Providers Switcher */}
        <section className={styles.switcherSection}>
          <p className={styles.switcherEyebrow}>
            {t("cert.allProviders")}
          </p>
          <div className={styles.providerPills}>
            {otherProviders.map((other) => (
              <Link
                key={other.slug}
                href={`/certifications/${other.slug}`}
                className={styles.providerPill}
                onClick={() => {
                  try {
                    sessionStorage.setItem("portfolio_from_certifications", "true");
                    sessionStorage.setItem("portfolio_target_hash", "#certifications");
                  } catch {
                    // ignore
                  }
                }}
              >
                <span className={styles.pillNo}>{other.no}</span>
                <span className={styles.pillName}>{other.name}</span>
                <span className={styles.pillCount}>
                  ({other.certificates.length})
                </span>
                <span className={styles.pillArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom Return Bar */}
        <footer className={styles.pageFooter}>
          <Link
            href="/#certifications"
            className={styles.bottomBack}
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
            {t("cert.backToCerts")}
          </Link>
          <div className={styles.bottomRight}>
            <span className={styles.brandFoot}>
              <b>{provider.no}</b> {provider.name.toUpperCase()}
            </span>
          </div>
        </footer>
      </div>

      {/* Reusable modal for full-size certificate viewing */}
      <CertificateModal
        cert={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </main>
  );
}

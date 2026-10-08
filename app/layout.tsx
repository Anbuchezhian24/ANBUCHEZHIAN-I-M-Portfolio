import type { Metadata } from "next";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { LanguageProvider } from "@/lib/i18n";
import { SITE_URL, PERSON } from "@/lib/site";
import "./globals.css";

const DESCRIPTION =
  "Product Designer crafting UX for climate-tech and AI products — where design, data, and business strategy meet. Based in Antibes, France.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ANBUCHEZHIAN I M — Product Designer",
    template: "%s",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "ANBUCHEZHIAN I M — Product Designer",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Anbuchezhian — Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ANBUCHEZHIAN I M — Product Designer",
    description: DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSON.name,
  jobTitle: PERSON.jobTitle,
  email: `mailto:${PERSON.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Antibes", addressCountry: "FR" },
  url: SITE_URL,
  sameAs: PERSON.sameAs,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}

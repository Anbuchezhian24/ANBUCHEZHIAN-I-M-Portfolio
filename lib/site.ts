/* Single source of truth for site-wide constants.
   Set NEXT_PUBLIC_SITE_URL in Vercel once the domain exists —
   everything (sitemap, robots, OG, JSON-LD) follows automatically. */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const PERSON = {
  name: "ANBUCHEZHIAN I M",
  jobTitle: "Product Designer & UX Consultant",
  email: "anbuchezhianim24@gmail.com",
  location: "Antibes, France",
  /* exact profile URLs as supplied — also consumed by JSON-LD */
  sameAs: [
    "https://www.linkedin.com/in/anbuchezhianilanchezhian/",
    "https://github.com/Anbuchezhian24",
  ],
};

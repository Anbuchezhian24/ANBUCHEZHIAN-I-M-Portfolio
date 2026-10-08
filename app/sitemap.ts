import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";
import { CERTIFICATION_PROVIDERS } from "@/content/certifications";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...PROJECTS.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...CERTIFICATION_PROVIDERS.map((p) => ({
      url: `${SITE_URL}/certifications/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

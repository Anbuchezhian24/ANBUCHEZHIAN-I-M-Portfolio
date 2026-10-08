import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CERTIFICATION_PROVIDERS,
  getCertificationProvider,
} from "@/content/certifications";
import ProviderView from "./ProviderView";

export function generateStaticParams() {
  return CERTIFICATION_PROVIDERS.map((p) => ({
    provider: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string }>;
}): Promise<Metadata> {
  const { provider } = await params;
  const data = getCertificationProvider(provider);

  if (!data) {
    return {
      title: "Certifications · Anbuchezhian",
    };
  }

  return {
    title: `${data.name} Certifications — Anbuchezhian`,
    description: data.description,
  };
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider } = await params;
  const providerData = getCertificationProvider(provider);

  if (!providerData) {
    notFound();
  }

  return <ProviderView provider={providerData} />;
}

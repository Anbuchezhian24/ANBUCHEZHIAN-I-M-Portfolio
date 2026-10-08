/* Credentials & Certification Providers data source.
 *
 * Exactly 5 Certification Providers:
 * 1. Microsoft (/certifications/microsoft)
 * 2. MongoDB   (/certifications/mongodb)
 * 3. Infosys   (/certifications/infosys)
 * 4. IBM       (/certifications/ibm)
 * 5. NASSCOM   (/certifications/nasscom)
 *
 * All certificates are 100% verified real credentials mapped directly to
 * assets in /public/images/certificates/.
 */

export type Cert = {
  no: string;
  issuer: string | null;
  logo?: { src: string; aspect: number };
  title: string;
  year: string | null;
  credentialId: string | null;
  credentialUrl?: string;
  certificateImage?: string;
  description?: string;
  verified: boolean;
  skills: string[];
  metric?: { value: string; label: string };
  fr?: { title?: string; skills?: string[]; metricLabel?: string; description?: string };
};

export type IndividualCert = Cert & {
  id: string;
  issuedDate?: string | null;
};

export type ProviderSlug = "microsoft" | "mongodb" | "infosys" | "ibm" | "nasscom";

export type CertificationProvider = {
  slug: ProviderSlug;
  name: string;
  no: string;
  title: string;
  tagline: string;
  description: string;
  logo: { src: string; aspect: number };
  skills: string[];
  metric: { value: string; label: string };
  certificates: IndividualCert[];
  fr?: {
    title?: string;
    tagline?: string;
    description?: string;
    skills?: string[];
    metricLabel?: string;
  };
};

export const CERTIFICATION_PROVIDERS: CertificationProvider[] = [
  {
    slug: "microsoft",
    name: "Microsoft",
    no: "01",
    title: "Microsoft Certifications",
    tagline: "Cloud computing, AI systems & enterprise analytics",
    description:
      "Official certifications from Microsoft validating technical proficiency in Azure artificial intelligence workloads, machine learning concepts, computer vision, and natural language processing.",
    logo: { src: "/images/issuers/microsoft.png", aspect: 2110 / 540 },
    metric: { value: "Azure AI", label: "Specialization" },
    skills: [
      "Azure AI Services",
      "Machine Learning Workloads",
      "Computer Vision",
      "Natural Language Processing",
      "Conversational AI",
    ],
    fr: {
      title: "Certifications Microsoft",
      tagline: "Cloud computing, IA & analytique d’entreprise",
      description:
        "Certifications officielles de Microsoft validant l'expertise technique en intelligence artificielle Azure, machine learning, vision par ordinateur et traitement du langage naturel.",
      skills: [
        "Services Azure AI",
        "Charges de travail ML",
        "Vision par ordinateur",
        "Traitement du langage naturel",
        "Agents conversationnels",
      ],
      metricLabel: "Spécialisation",
    },
    certificates: [
      {
        id: "azure-ai-fundamentals",
        no: "1.1",
        issuer: "Microsoft",
        title: "Microsoft Certified: Azure AI Fundamentals",
        certificateImage: "/images/certificates/microsoft-azure-ai.jpeg",
        year: "2025",
        issuedDate: "September 27, 2025",
        credentialId: "JQWM-4wBC",
        credentialUrl: "https://verify.certiport.com",
        verified: true,
        description:
          "Official Microsoft certification validating fundamental knowledge of artificial intelligence and machine learning principles along with implementation on Microsoft Azure cloud services.",
        skills: [
          "Azure AI Services",
          "Machine Learning Principles",
          "Computer Vision Workloads",
          "Natural Language Processing",
          "Conversational AI",
        ],
        metric: { value: "AI-900", label: "Certification Code" },
        fr: {
          title: "Microsoft Certified: Azure AI Fundamentals",
          description:
            "Certification officielle Microsoft validant les connaissances fondamentales en intelligence artificielle, principes de machine learning et services d'IA sur le cloud Microsoft Azure.",
          skills: [
            "Services Azure AI",
            "Principes de Machine Learning",
            "Vision par ordinateur",
            "Traitement du langage naturel",
            "IA conversationnelle",
          ],
          metricLabel: "Code de certification",
        },
      },
    ],
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    no: "02",
    title: "MongoDB Certifications",
    tagline: "Document data modeling, schema patterns & Atlas Search",
    description:
      "Official MongoDB Academy credentials verifying expertise in relational-to-document schema migration, high-performance schema design patterns, anti-pattern avoidance, and MongoDB Atlas Search fundamentals.",
    logo: { src: "/images/issuers/mongodb.svg", aspect: 120 / 32 },
    metric: { value: "Document DB", label: "Database Architecture" },
    skills: [
      "Relational to Document Migration",
      "Schema Patterns & Anti-patterns",
      "Atlas Full-Text Search",
      "Embedding vs Referencing",
      "Document Lifecycle",
    ],
    fr: {
      title: "Certifications MongoDB",
      tagline: "Modélisation documentaire, schémas optimisés & Atlas Search",
      description:
        "Certifications officielles MongoDB Academy validant la migration relationnelle vers le documentaire, les modèles de conception de schémas performants et la recherche plein texte Atlas Search.",
      skills: [
        "Migration relationnelle vers documentaire",
        "Modèles de schémas & Anti-patterns",
        "Recherche plein texte Atlas Search",
        "Incorporation vs Références",
        "Cycle de vie documentaire",
      ],
      metricLabel: "Architecture de données",
    },
    certificates: [
      {
        id: "mongodb-relational-to-document",
        no: "2.1",
        issuer: "MongoDB",
        title: "Relational to Document Model",
        certificateImage: "/images/certificates/Relational to Document Model.jpg.png",
        year: "2026",
        issuedDate: "March 9, 2026",
        credentialId: "MDBjimgupdb42",
        credentialUrl: "https://learn.mongodb.com",
        verified: true,
        description:
          "Official proof of completion in transforming traditional relational tabular schemas into flexible, high-performance MongoDB document data models, mastering embedding versus referencing strategies and query optimization.",
        skills: [
          "Relational to NoSQL Migration",
          "Document Data Modeling",
          "Embedding vs Referencing",
          "Schema Normalization",
          "Query Performance",
        ],
        metric: { value: "Data Modeling", label: "Architecture Track" },
        fr: {
          title: "Modèle relationnel vers documentaire",
          description:
            "Attestation officielle de réussite dans la transformation de schémas relationnels classiques en modèles documentaires MongoDB performants et flexibles, avec maîtrise des compromis incorporation/référence.",
          skills: [
            "Migration relationnel vers NoSQL",
            "Modélisation de données documentaires",
            "Incorporation vs Références",
            "Normalisation de schéma",
            "Performance des requêtes",
          ],
          metricLabel: "Axe d'architecture",
        },
      },
      {
        id: "mongodb-schema-patterns-antipatterns",
        no: "2.2",
        issuer: "MongoDB",
        title: "Schema Patterns and Anti-patterns",
        certificateImage: "/images/certificates/Schema Design Patterns and Antipatterns.jpg.png",
        year: "2026",
        issuedDate: "April 25, 2026",
        credentialId: "MDBkreuufmp69",
        credentialUrl: "https://learn.mongodb.com",
        verified: true,
        description:
          "Official proof of completion in industry-proven MongoDB schema patterns (subset, bucket, computed, polymorphic) and mitigating severe database anti-patterns such as massive unindexed arrays and bloated documents.",
        skills: [
          "Schema Design Patterns",
          "Anti-pattern Avoidance",
          "Polymorphic Schemas",
          "Bucket & Subset Patterns",
          "High Concurrency Schemas",
        ],
        metric: { value: "Patterns", label: "Design Track" },
        fr: {
          title: "Modèles de schémas et Anti-patterns",
          description:
            "Attestation officielle couvrant les modèles de conception de schémas éprouvés (sous-ensembles, compartiments, polymorphisme) et l'évitement des anti-patterns majeurs sur MongoDB.",
          skills: [
            "Modèles de conception de schémas",
            "Évitement des anti-patterns",
            "Schémas polymorphes",
            "Patterns Bucket & Subset",
            "Haute concurrence",
          ],
          metricLabel: "Axe de conception",
        },
      },
      {
        id: "mongodb-search-fundamentals",
        no: "2.3",
        issuer: "MongoDB",
        title: "Search Fundamentals",
        certificateImage: "/images/certificates/Search Fundamentals.jpg.png",
        year: "2026",
        issuedDate: "March 9, 2026",
        credentialId: "MDBkieehxsosk",
        credentialUrl: "https://learn.mongodb.com",
        verified: true,
        description:
          "Official qualification in MongoDB Atlas Search architecture, full-text search index creation, custom analyzers, fuzzy search matching, and multi-field relevance scoring directly on document collections.",
        skills: [
          "Atlas Search",
          "Full-Text Indexing",
          "Fuzzy Search & Relevance",
          "Custom Analyzers",
          "Search Query Pipelines",
        ],
        metric: { value: "Atlas Search", label: "Search Engine" },
        fr: {
          title: "Fondamentaux d'Atlas Search",
          description:
            "Certification officielle sur l'architecture MongoDB Atlas Search, la création d'index de recherche textuelle, les analyseurs personnalisés et le calcul de pertinence multi-champs.",
          skills: [
            "Atlas Search",
            "Indexation plein texte",
            "Recherche floue & Pertinence",
            "Analyseurs personnalisés",
            "Pipelines de recherche",
          ],
          metricLabel: "Moteur de recherche",
        },
      },
    ],
  },
  {
    slug: "infosys",
    name: "Infosys",
    no: "03",
    title: "Infosys Certifications",
    tagline: "Foundational software engineering & systems programming",
    description:
      "Technical certifications from Infosys Springboard emphasizing core programming disciplines, memory management, algorithmic problem solving, and structured system software development.",
    logo: { src: "/images/issuers/infosys.svg", aspect: 110 / 32 },
    metric: { value: "Springboard", label: "Learning Platform" },
    skills: [
      "C Programming",
      "Pointers & Memory Allocation",
      "Data Structures",
      "Structured Programming",
      "Algorithms",
    ],
    fr: {
      title: "Certifications Infosys",
      tagline: "Génie logiciel fondamental & programmation système",
      description:
        "Certifications techniques d'Infosys Springboard mettant l'accent sur les disciplines fondamentales de programmation, la gestion de la mémoire et la conception logicielle structurée.",
      skills: [
        "Programmation en C",
        "Pointeurs & gestion mémoire",
        "Structures de données",
        "Programmation structurée",
        "Algorithmes",
      ],
      metricLabel: "Plateforme d'apprentissage",
    },
    certificates: [
      {
        id: "programming-in-c",
        no: "3.1",
        issuer: "Infosys Springboard",
        title: "Programming in C",
        certificateImage: "/images/certificates/infosys-programming-c.jpeg",
        year: "2024",
        issuedDate: "December 13, 2024",
        credentialId: null,
        credentialUrl: "https://verify.onwingspan.com",
        verified: true,
        description:
          "Official course completion certificate covering foundational C programming, pointer arithmetic, dynamic memory management, and structured modular algorithm design on Infosys Springboard.",
        skills: [
          "C Programming",
          "Memory Management",
          "Pointers & References",
          "Data Structures",
          "Modular Architecture",
        ],
        metric: { value: "Core C", label: "Systems Programming" },
        fr: {
          title: "Programmation en C",
          description:
            "Attestation officielle de réussite couvrant les fondamentaux du langage C, la gestion de la mémoire, les pointeurs et la conception logicielle structurée sur Infosys Springboard.",
          skills: [
            "Programmation en C",
            "Gestion mémoire",
            "Pointeurs & Références",
            "Structures de données",
            "Architecture modulaire",
          ],
          metricLabel: "Programmation système",
        },
      },
    ],
  },
  {
    slug: "ibm",
    name: "IBM",
    no: "04",
    title: "IBM Certifications",
    tagline: "Enterprise design thinking, AI engineering & human-centric systems",
    description:
      "Official credentials issued by IBM verifying competencies in enterprise-grade design thinking methodologies, human-in-the-loop AI product design, prompt engineering, and agile team collaboration.",
    logo: { src: "/images/issuers/ibm.png", aspect: 4464 / 1944 },
    metric: { value: "Design & AI", label: "Practice Track" },
    skills: [
      "Enterprise Design Thinking",
      "Team Essentials for AI",
      "Human-in-the-Loop",
      "User Empathy & Research",
      "Agile Prototyping",
    ],
    fr: {
      title: "Certifications IBM",
      tagline: "Design thinking d'entreprise, ingénierie IA & systèmes centrés utilisateur",
      description:
        "Certifications officielles délivrées par IBM attestant des compétences en design thinking d’entreprise, conception de produits d’IA avec humain dans la boucle et collaboration agile.",
      skills: [
        "Design Thinking d’entreprise",
        "Fondamentaux d'équipe pour l'IA",
        "Humain dans la boucle",
        "Empathie & recherche utilisateur",
        "Prototypage agile",
      ],
      metricLabel: "Axe de pratique",
    },
    certificates: [
      {
        id: "enterprise-design-thinking-practitioner",
        no: "4.1",
        issuer: "IBM",
        title: "Enterprise Design Thinking Practitioner",
        certificateImage: "/images/certificates/ibm-design-thinking-practitioner.jpeg",
        year: "2024",
        issuedDate: "October 20, 2024",
        credentialId: "1NuTr7Do",
        credentialUrl: "https://www.credly.com/go/1NuTr7Do",
        verified: true,
        description:
          "Professional credential in IBM's enterprise design thinking framework, focusing on user-centered empathy research, hill statements, playbacks, and rapid iterative prototyping across multidisciplinary teams.",
        skills: [
          "Enterprise Design Thinking",
          "User Empathy & Research",
          "Hills & Playbacks",
          "Iterative Prototyping",
          "Multidisciplinary Collaboration",
        ],
        metric: { value: "Practitioner", label: "IBM Credential" },
        fr: {
          title: "Praticien en Design Thinking d’entreprise",
          description:
            "Certification professionnelle sur la méthodologie de design thinking d'IBM, axée sur la recherche utilisateur empathique, les playbacks et le prototypage itératif rapide.",
          skills: [
            "Design Thinking d'entreprise",
            "Empathie & recherche utilisateur",
            "Hills & Playbacks",
            "Prototypage itératif",
            "Collaboration pluridisciplinaire",
          ],
          metricLabel: "Titre IBM",
        },
      },
      {
        id: "enterprise-design-thinking-ai",
        no: "4.2",
        issuer: "IBM",
        title: "Enterprise Design Thinking - Team Essentials for AI",
        certificateImage: "/images/certificates/ibm-design-thinking-ai.jpeg",
        year: "2024",
        issuedDate: "December 13, 2024",
        credentialId: "v1T4ARFv",
        credentialUrl: "https://www.credly.com/go/v1T4ARFv",
        verified: true,
        description:
          "Specialized certification addressing key design challenges in artificial intelligence: model intent transparency, explainability, algorithmic bias detection, and human-in-the-loop validation frameworks.",
        skills: [
          "AI Design Thinking",
          "Human-Centered AI",
          "Ethics & Algorithmic Trust",
          "Human-in-the-Loop",
          "AI Product Strategy",
        ],
        metric: { value: "AI Essentials", label: "Specialization" },
        fr: {
          title: "Design Thinking d’entreprise — Essentiels d’équipe pour l’IA",
          description:
            "Certification spécialisée traitant des enjeux de conception en intelligence artificielle : transparence, explicabilité, détection des biais et validation avec humain dans la boucle.",
          skills: [
            "Design Thinking pour l'IA",
            "IA centrée sur l'humain",
            "Éthique & confiance algorithmique",
            "Humain dans la boucle",
            "Stratégie produit IA",
          ],
          metricLabel: "Spécialisation",
        },
      },
    ],
  },
  {
    slug: "nasscom",
    name: "NASSCOM",
    no: "05",
    title: "NASSCOM Certifications",
    tagline: "Industry-aligned skills & emerging technology curriculum",
    description:
      "FutureSkills Prime credential awarded by the IT-ITeS Sector Skills Council NASSCOM in collaboration with Government and Industry, certifying competencies in digital application fundamentals and emerging STEM technologies.",
    logo: { src: "/images/issuers/nasscom.svg", aspect: 130 / 32 },
    metric: { value: "FutureSkills", label: "Industry Benchmark" },
    skills: [
      "Digital Application Fundamentals",
      "STEM Competencies",
      "Emerging Technologies",
      "IT-ITeS Standards",
      "Digital Problem Solving",
    ],
    fr: {
      title: "Certifications NASSCOM",
      tagline: "Compétences alignées industrie & technologies émergentes",
      description:
        "Titre FutureSkills Prime décerné par le NASSCOM IT-ITeS Sector Skills Council en collaboration avec le gouvernement et l'industrie, certifiant les compétences fondamentales en applications numériques et technologies STEM.",
      skills: [
        "Fondamentaux des applications numériques",
        "Compétences STEM",
        "Technologies émergentes",
        "Standards IT-ITeS",
        "Résolution de problèmes numériques",
      ],
      metricLabel: "Référence industrielle",
    },
    certificates: [
      {
        id: "digital-application-fundamentals",
        no: "5.1",
        issuer: "NASSCOM IT-ITeS SSC",
        title: "Digital Application Fundamentals (STEM)",
        certificateImage: "/images/certificates/nasscom Digital Application Fundamentals (STEM).jpg",
        year: "2026",
        issuedDate: "March 11, 2026",
        credentialId: "26110306298",
        credentialUrl: "https://futureskillsprime.in",
        verified: true,
        description:
          "Official Certificate of Participation awarded under FutureSkills Prime (A MeitY - NASSCOM Digital Skilling Initiative), aligned to Competency Standards developed by IT-ITeS Sector Skills Council NASSCOM in collaboration with Industry and Government.",
        skills: [
          "Digital Application Fundamentals",
          "STEM Competencies",
          "Emerging Technologies",
          "IT-ITeS Sector Standards",
          "Digital Problem Solving",
        ],
        metric: { value: "FutureSkills", label: "Govt & Industry" },
        fr: {
          title: "Fondamentaux des applications numériques (STEM)",
          description:
            "Certificat officiel de participation délivré sous l'égide de FutureSkills Prime (initiative MeitY - NASSCOM), aligné sur les normes de compétences du conseil sectoriel IT-ITeS.",
          skills: [
            "Applications numériques fondamentales",
            "Compétences STEM",
            "Technologies émergentes",
            "Standards sectoriels IT-ITeS",
            "Résolution de problèmes numériques",
          ],
          metricLabel: "Gouv & Industrie",
        },
      },
    ],
  },
];

/**
 * Returns formatted certificate count string with correct singular/plural wording.
 * e.g., "1 Certificate" or "3 Certificates"
 */
export function getCertificateCountLabel(count: number, lang: "en" | "fr" = "en"): string {
  if (lang === "fr") {
    return count === 1 ? "1 Certificat" : `${count} Certificats`;
  }
  return count === 1 ? "1 Certificate" : `${count} Certificates`;
}

/**
 * Get a single certification provider by its slug ("microsoft", "mongodb", etc.)
 */
export function getCertificationProvider(slug: string): CertificationProvider | undefined {
  const normalized = slug.trim().toLowerCase();
  return CERTIFICATION_PROVIDERS.find((p) => p.slug === normalized);
}

/**
 * Helper to retrieve all certificates across all providers.
 */
export function getAllCertificates(): IndividualCert[] {
  return CERTIFICATION_PROVIDERS.flatMap((p) => p.certificates);
}

/* Backwards-compatible export of all certificates */
export const CERTS: Cert[] = getAllCertificates();

"use client";

/*
 * Centralised EN/FR store for every user-facing string on the site.
 *
 * Switching is pure React state: scroll position, the active section and all
 * pinned ScrollTriggers survive, with no reload. The choice persists in
 * localStorage and is mirrored onto <html lang> for assistive tech.
 *
 * Proper nouns (companies, products, tools, place names) are deliberately
 * NOT translated. French runs longer than English, so copy here is written
 * to fit the same layout rather than translated literally.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "fr";

type Entry = { en: string; fr: string };

export const DICT: Record<string, Entry> = {
  /* ---------------- nav ---------------- */
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.about": { en: "About", fr: "À propos" },
  "nav.work": { en: "Work", fr: "Projets" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "nav.menu": { en: "Open menu", fr: "Ouvrir le menu" },
  "nav.close": { en: "Close menu", fr: "Fermer le menu" },

  /* ---------------- intro ---------------- */
  "intro.scroll": { en: "Scroll to enter", fr: "Faites défiler pour entrer" },

  /* ---------------- hero ---------------- */
  "hero.kicker": {
    en: "Full Stack Developer & Software Engineer",
    fr: "Développeur Full Stack & Ingénieur Logiciel",
  },
  "hero.h1a": { en: "I turn ideas into", fr: "Je transforme vos idées en" },
  "hero.h1aEm": { en: "", fr: "" },
  "hero.h1b": { en: "", fr: "" },
  "hero.h1bEm": { en: "digital products.", fr: "produits numériques." },
  "hero.sub": {
    en: "I build modern full-stack applications from idea to deployment — crafting scalable interfaces, reliable backends, and thoughtful digital experiences.",
    fr: "Je conçois des applications full-stack modernes de l’idée au déploiement — interfaces évolutives, backends fiables et expériences numériques soignées.",
  },
  "hero.cta1": { en: "View My Work", fr: "Voir mes projets" },
  "hero.cta2": { en: "How I Build", fr: "Comment je conçois" },
  "hero.scroll": { en: "Scroll to Explore", fr: "Faites défiler" },
  "stat.projects": { en: "Projects Completed", fr: "Projets réalisés" },
  "stat.years": { en: "Years of Experience", fr: "Ans d’expérience" },
  "stat.technologies": { en: "Technologies Explored", fr: "Technologies explorées" },
  "stat.countries": { en: "Technologies Explored", fr: "Technologies explorées" },
  "stat.satisfaction": { en: "Client Satisfaction", fr: "Satisfaction client" },

  /* ---------------- about ---------------- */
  "about.eyebrow": { en: "About", fr: "À propos" },
  "about.h2a": { en: "I build with purpose —", fr: "Je construis avec intention —" },
  "about.h2b": { en: "engineering ideas into", fr: "transformer les idées en" },
  "about.h2Em": { en: "experiences.", fr: "expériences." },
  "about.h2c": { en: "", fr: "" },
  "about.intro1": {
    en: "I’m Anbuchezhian, a Computer Science Engineering student and aspiring Full Stack Developer focused on building thoughtful, scalable digital products.",
    fr: "Je suis Anbuchezhian, étudiant en génie informatique et développeur full stack passionné par la création de produits numériques performants et évolutifs.",
  },
  "about.intro2": {
    en: "I work across the full development lifecycle — from shaping an idea and designing intractive interfaces to engineering APIs, databases, authentication, and production-ready applications.",
    fr: "J’interviens sur l’ensemble du cycle de développement — de la conception d’interfaces intuitives à l’ingénierie des API, des bases de données et des applications de production.",
  },
  "about.intro3": {
    en: "My primary stack revolves around React, Next.js, TypeScript, Node.js, Express, PostgreSQL, Supabase, and Prisma. I enjoy working at the intersection of product thinking and engineering, where clean interfaces meet reliable systems.",
    fr: "Ma stack principale s’articule autour de React, Next.js, TypeScript, Node.js, Express, PostgreSQL, Supabase et Prisma, alliant interfaces soignées et systèmes fiables.",
  },
  "about.intro4": {
    en: "I’m particularly interested in building products that are not only visually refined, but also structured, performant, maintainable, and genuinely useful.",
    fr: "Je m’intéresse particulièrement à la création de produits non seulement esthétiques, mais aussi structurés, performants, maintenables et réellement utiles.",
  },
  "about.signature": {
    en: "Think clearly. Build deliberately. Ship beautifully.",
    fr: "Penser clairement. Bâtir avec méthode. Livrer avec soin.",
  },
  "about.c1.tag": { en: "PRODUCT", fr: "PRODUIT" },
  "about.c1.title": { en: "From concept to interface", fr: "Du concept à l’interface" },
  "about.c1.desc": {
    en: "Turning ideas into clear, intuitive digital experiences with a strong focus on usability and detail.",
    fr: "Transformer les idées en expériences numériques claires et intuitives avec une attention méticuleuse portée à l’usage.",
  },
  "about.c2.tag": { en: "FRONTEND", fr: "FRONTEND" },
  "about.c2.title": { en: "Interfaces with intent", fr: "Des interfaces réfléchies" },
  "about.c2.desc": {
    en: "React, Next.js and TypeScript — building responsive interfaces that feel polished and purposeful.",
    fr: "React, Next.js et TypeScript — concevoir des interfaces réactives, élégantes et cohérentes.",
  },
  "about.c3.tag": { en: "BACKEND", fr: "BACKEND" },
  "about.c3.title": { en: "Systems that scale", fr: "Des systèmes évolutifs" },
  "about.c3.desc": {
    en: "Node.js, Express and REST APIs — creating structured backend systems designed for reliability.",
    fr: "Node.js, Express et API REST — bâtir des architectures backend structurées et fiables.",
  },
  "about.c4.tag": { en: "DATA", fr: "DONNÉES" },
  "about.c4.title": { en: "Where products become systems", fr: "De la donnée aux systèmes" },
  "about.c4.desc": {
    en: "PostgreSQL, Supabase and Prisma — connecting applications to secure, structured data.",
    fr: "PostgreSQL, Supabase et Prisma — connecter les applications à des données fiables et sécurisées.",
  },
  "about.edu": {
    en: "Computer Science Engineering · Full Stack Development · Product Engineering · Modern Web Applications",
    fr: "Génie Informatique · Développement Full Stack · Ingénierie Produit · Applications Web Modernes",
  },
  "about.cta": { en: "Explore My Work", fr: "Découvrir mes projets" },

  /* ---------------- journey ----------------
     Chapter copy lives in content/journey.ts; only the chrome is here. */
  "journey.eyebrow": { en: "MY JOURNEY", fr: "MON PARCOURS" },
  "journey.enter": { en: "SCROLL TO EXPLORE", fr: "DÉFILER POUR EXPLORER" },
  "journey.chapter": { en: "Chapter", fr: "Chapitre" },
  "journey.lede": {
    en: "From curiosity to code — and from code to creating.",
    fr: "De la curiosité au code — et du code à la création.",
  },

  /* ---------------- tech stack / toolkit ---------------- */
  "stack.eyebrow": { en: "Toolkit", fr: "Outils" },
  "stack.h2": { en: "My Tech", fr: "Ma boîte à" },
  "stack.h2Em": { en: "Stack.", fr: "outils." },
  "stack.lede": {
    en: "The technologies I use to design, engineer, and ship modern digital products — from interfaces and APIs to databases and deployment.",
    fr: "Les technologies que j’utilise pour concevoir, développer et déployer des produits numériques modernes — des interfaces aux bases de données.",
  },
  "stack.count": { en: "tools", fr: "outils" },
  "stack.disciplines": { en: "disciplines", fr: "disciplines" },
  "stack.cta": { en: "Explore My Stack", fr: "Découvrir ma stack" },

  /* ---------------- dedicated stack page (/stack) ---------------- */
  "stackpage.eyebrow": { en: "STACK / TECHNOLOGY", fr: "STACK / TECHNOLOGIES" },
  "stackpage.h1a": { en: "The technologies behind", fr: "Les technologies derrière" },
  "stackpage.h1Em": { en: "what I build.", fr: "ce que je conçois." },
  "stackpage.intro": {
    en: "My development stack is built around modern web technologies, reliable backend systems, structured data, and practical tools that help turn ideas into production-ready products.",
    fr: "Mon environnement de développement s’articule autour de technologies web modernes, d’architectures backend fiables, de données structurées et d’outils pragmatiques au service de produits performants.",
  },
  "stackpage.back": { en: "← Back to Portfolio", fr: "← Retour au portfolio" },
  "stackpage.exploreWork": { en: "Explore Projects", fr: "Découvrir mes projets" },
  "stackpage.readyPrompt": { en: "Ready to build something together?", fr: "Prêt à concevoir un projet ensemble ?" },

  /* ---------------- work ---------------- */
  "work.eyebrow": { en: "Featured Work", fr: "Projets sélectionnés" },
  "work.h2a": { en: "Selected projects,", fr: "Des projets choisis," },
  "work.h2b": { en: "designed to", fr: "conçus pour être" },
  "work.h2Em": { en: "ship.", fr: "livrés." },
  "work.lede": {
    en: "Product UX, product strategy, data design and systems design — each project a different capability, all one practice.",
    fr: "UX produit, stratégie produit, design de données et de systèmes — chaque projet une compétence différente, une seule pratique.",
  },
  "work.open": { en: "Open case study", fr: "Voir l’étude de cas" },
  "work.hint": { en: "SCROLL TO BROWSE", fr: "FAITES DÉFILER" },

  /* ---------------- experience ---------------- */
  "exp.eyebrow": { en: "Experience", fr: "Expérience" },
  "exp.h2": { en: "Where I built my", fr: "Là où j’ai forgé mon" },
  "exp.h2Em": { en: "experience.", fr: "expérience." },
  "exp.worked": { en: "What I worked on", fr: "Ce sur quoi j’ai travaillé" },
  "exp.impact": { en: "Impact", fr: "Impact" },
  "exp.tools": { en: "Tools & skills", fr: "Outils & compétences" },
  "exp.hint": { en: "SCROLL · CLICK TO JUMP", fr: "DÉFILER · CLIQUER POUR NAVIGUER" },
  "type.Internship": { en: "Internship", fr: "Stage" },
  "type.Full-time": { en: "Full-time", fr: "Temps plein" },
  "type.Hackathon": { en: "Hackathon", fr: "Hackathon" },
  "type.Freelance": { en: "Freelance", fr: "Freelance" },
  "type.Cohort": { en: "Cohort", fr: "Cohorte" },
  "type.Bootcamp": { en: "Bootcamp", fr: "Bootcamp" },
  "type.Teaching": { en: "Teaching", fr: "Enseignement" },

  /* ---------------- credentials ---------------- */
  "cert.introLabel": { en: "Introduction", fr: "Introduction" },
  "cert.introTitle1": { en: "VERIFIED", fr: "TITRES" },
  "cert.introTitle2": { en: "CREDENTIALS", fr: "VÉRIFIÉS" },
  "cert.introBody": {
    en: "Continuous, applied learning across data, design, marketing and AI — the technical base underneath the product work.",
    fr: "Un apprentissage continu et appliqué en données, design, marketing et IA — la base technique du travail produit.",
  },
  "cert.introNote": {
    en: "Five programmes · Coursera, LinkedIn Learning and hands-on portfolio projects.",
    fr: "Cinq programmes · Coursera, LinkedIn Learning et projets concrets.",
  },
  "cert.eyebrow": { en: "Credentials", fr: "Titres & certifications" },
  "cert.h2": { en: "Credentials", fr: "Certifications" },
  "cert.lede": {
    en: "Professional certifications and credentials earned throughout my design and technology journey.",
    fr: "Les certifications et titres professionnels obtenus tout au long de mon parcours en design et en technologie.",
  },
  "cert.certified": { en: "Certified", fr: "Certifié" },
  "cert.brandRole": { en: "Product Designer", fr: "Product Designer" },
  "cert.issuerTBC": { en: "Issuer — to confirm", fr: "Organisme — à confirmer" },
  "cert.certification": { en: "Certification", fr: "Certification" },
  "cert.verified": { en: "✓ Verified", fr: "✓ Vérifié" },
  "cert.onRequest": { en: "Credential on request", fr: "Justificatif sur demande" },
  "cert.issuedBy": { en: "Issued by", fr: "Délivré par" },
  "cert.year": { en: "Year", fr: "Année" },
  "cert.id": { en: "Credential ID", fr: "N° de justificatif" },
  "cert.tbc": { en: "To confirm", fr: "À confirmer" },
  "cert.skills": { en: "Skills", fr: "Compétences" },
  "cert.verify": { en: "Verify credential ↗", fr: "Vérifier le justificatif ↗" },
  "cert.foot": { en: "Credentials", fr: "Titres" },
  "cert.viewCert": { en: "View Certificate →", fr: "Voir le certificat →" },
  "cert.viewCertLabel": { en: "View Certificate", fr: "Voir le certificat" },
  "cert.closeModal": { en: "Close certificate modal", fr: "Fermer le certificat" },
  "cert.modalRecord": { en: "Credential Record", fr: "Fiche justificative" },
  "cert.skillsFocus": { en: "Skills & Focus", fr: "Compétences & axes" },
  "cert.description": { en: "Description", fr: "Description" },
  "cert.previewComing": { en: "Certificate preview coming soon.", fr: "Aperçu du certificat bientôt disponible." },
  "cert.previewNotice": {
    en: "Official credential verification available on request.",
    fr: "Vérification officielle du justificatif disponible sur demande.",
  },
  "cert.viewCertificates": { en: "View Certificates", fr: "Voir les certificats" },
  "cert.providerLabel": { en: "Certification Provider", fr: "Organisme de certification" },
  "cert.backToCerts": { en: "← Back to Certifications", fr: "← Retour aux certifications" },
  "cert.providerCredentials": { en: "Provider Credentials", fr: "Certificats de l'organisme" },
  "cert.certificatesAvailable": { en: "Certificates Available", fr: "Certificats disponibles" },

  /* ---------------- gallery — the people behind the work ---------------- */
  "gallery.eyebrow": { en: "The Archive", fr: "L’archive" },
  "gallery.h2a": { en: "The people behind", fr: "Celles et ceux derrière" },
  "gallery.h2Em": { en: "the work", fr: "le travail" },
  "gallery.lede": {
    en: "The people, moments and experiences that shaped the work behind the screen.",
    fr: "Les personnes, les moments et les expériences qui ont façonné le travail derrière l’écran.",
  },
  "gallery.alt": {
    en: "A moment with the people behind the work",
    fr: "Un moment avec celles et ceux derrière le travail",
  },
  "gallery.frames": { en: "Frames", fr: "Images" },
  "gallery.hint": { en: "Scroll to travel the archive", fr: "Faites défiler pour parcourir l’archive" },

  /* ---------------- connect ---------------- */
  "connect.eyebrow": { en: "Let’s Connect", fr: "Restons en contact" },
  "connect.h2a": { en: "Let’s create what’s", fr: "Créons ce qui" },
  "connect.h2Em": { en: "next.", fr: "vient." },
  "connect.lede": {
    en: "I’m open to product design roles, collaborations and good conversations — if you’re building something people should love, I’d like to hear about it.",
    fr: "Je suis ouvert aux postes en product design, aux collaborations et aux bonnes conversations — si vous construisez quelque chose que les gens devraient adorer, parlons-en.",
  },
  "connect.cta": { en: "Start a Conversation", fr: "Démarrer la conversation" },
  "connect.formTitle": { en: "Send a message", fr: "Envoyer un message" },
  "connect.formSubtitle": {
    en: "Tell me a little about what you're building.",
    fr: "Parlez-moi de ce que vous construisez.",
  },
  "connect.nameLabel": { en: "NAME", fr: "NOM" },
  "connect.namePlaceholder": { en: "Your name", fr: "Votre nom" },
  "connect.emailLabel": { en: "EMAIL", fr: "EMAIL" },
  "connect.emailPlaceholder": { en: "you@email.com", fr: "vous@email.com" },
  "connect.subjectLabel": { en: "SUBJECT", fr: "SUJET" },
  "connect.subjectPlaceholder": { en: "What is this about?", fr: "De quoi s’agit-il ?" },
  "connect.messageLabel": { en: "MESSAGE", fr: "MESSAGE" },
  "connect.messagePlaceholder": {
    en: "Share the details of your project...",
    fr: "Partagez les détails de votre projet...",
  },
  "connect.sendBtn": { en: "Send Message", fr: "Envoyer le message" },
  "connect.sending": { en: "Sending message...", fr: "Envoi en cours..." },
  "connect.success": {
    en: "Thanks! Your message has been sent successfully.",
    fr: "Merci ! Votre message a été envoyé avec succès.",
  },
  "connect.error": {
    en: "Something went wrong. Please try again.",
    fr: "Une erreur s'est produite. Veuillez réessayer.",
  },
  "connect.validationError": {
    en: "Please fill out all required fields with a valid email address.",
    fr: "Veuillez remplir tous les champs obligatoires avec une adresse e-mail valide.",
  },
  "connect.sendAnother": { en: "Send another message", fr: "Envoyer un autre message" },
  "connect.credit": { en: "Designed & Developed by", fr: "Conçu & développé par" },
  "connect.top": { en: "Back to top ↑", fr: "Haut de page ↑" },

  /* ---------------- case study (/work/[slug]) ---------------- */
  "case.back": { en: "← Back to work", fr: "← Retour aux projets" },
  "case.kicker": { en: "Case Study", fr: "Étude de cas" },
  "case.role": { en: "Role", fr: "Rôle" },
  "case.timeline": { en: "Timeline", fr: "Période" },
  "case.focus": { en: "Focus", fr: "Focus" },
  "case.site": { en: "Live product", fr: "Produit en ligne" },
  "case.repo": { en: "Source", fr: "Code source" },
  "case.cover": { en: "COVER", fr: "VISUEL" },
  "case.context": { en: "Context", fr: "Contexte" },
  "case.problem": { en: "The Problem", fr: "Le problème" },
  "case.process": { en: "Process", fr: "Démarche" },
  "case.decisions": { en: "Design Decisions", fr: "Décisions de design" },
  "case.outcome": { en: "Outcome", fr: "Résultats" },
  "case.reflection": { en: "Reflection", fr: "Ce que j’en retire" },
  "case.all": { en: "← All projects", fr: "← Tous les projets" },
  "case.next": { en: "Next project", fr: "Projet suivant" },

  /* ---------------- lab (/tunnel) ---------------- */
  "lab.back": { en: "← PORTFOLIO", fr: "← PORTFOLIO" },
  "lab.hint": {
    en: "LAB · TUNNEL TYPE — SCROLL TO TRAVEL · MOVE THE MOUSE",
    fr: "LAB · TUNNEL TYPE — FAITES DÉFILER POUR AVANCER · BOUGEZ LA SOURIS",
  },

  /* ---------------- 404 ---------------- */
  "nf.label": { en: "404 — NOT FOUND", fr: "404 — PAGE INTROUVABLE" },
  "nf.h1": { en: "This page went", fr: "Cette page a quitté" },
  "nf.h1Em": { en: "off the grid.", fr: "les radars." },
  "nf.cta": { en: "Back to the portfolio →", fr: "Retour au portfolio →" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => { },
  t: (k) => DICT[k]?.en ?? k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "fr") {
      queueMicrotask(() => setLangState(saved));
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("lang", l);
    } catch {
      /* private mode — the choice simply won't persist */
    }
    document.documentElement.lang = l;
  };

  const t = (k: string) => DICT[k]?.[lang] ?? DICT[k]?.en ?? k;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);

/** Pick a translated field off a content record: `L(lang, item, "summary")`
 *  returns `item.fr.summary` when available, else the English original. */
export function L<T extends { fr?: Record<string, unknown> }>(
  lang: Lang,
  item: T,
  field: keyof T & string
): string {
  if (lang === "fr" && item.fr && typeof item.fr[field] === "string") {
    return item.fr[field] as string;
  }
  return item[field] as unknown as string;
}

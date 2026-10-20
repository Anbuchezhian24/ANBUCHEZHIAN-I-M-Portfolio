/* THE PEOPLE BEHIND THE WORK — the personal archive.
 *
 * ⚠ SOURCING: every frame is one of Anbu's own supplied photographs,
 * in the order numbered (Gallery 1 → 14). Nothing is stock,
 * generated, substituted or repeated. 14 authentic frames.
 *
 * `ar` is each file's TRUE aspect ratio, so a frame is only ever cropped by
 * object-fit, never scaled non-uniformly. The variety in frame widths comes
 * from the photographs themselves rather than from arbitrary sizing.
 *
 * `scale` and `y` are the curation: a little rhythm so the rail reads as a
 * hung archive rather than a filmstrip. Frames 9 and 10 — the two team
 * photographs marked as belonging in the middle — sit at the centre
 * of the sequence and carry the largest scale. */

export type Frame = {
  id: string;
  src: string;
  width: number;
  height: number;
  ar: number; /* true width / height */
  title: string;
  scale?: number; /* relative scale tweak */
  y?: number; /* vertical offset in px */
  hero?: boolean; /* the centrepieces */
};

export const FRAMES: Frame[] = [
  {
    id: "g01",
    src: "/images/gallery/g01.jpg",
    title: "Team & Colleagues at College Event",
    width: 4096,
    height: 3072,
    ar: 1.3333,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g02",
    src: "/images/gallery/g02.jpg",
    title: "Campus Moments & Project Team",
    width: 4608,
    height: 3456,
    ar: 1.3333,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g03",
    src: "/images/gallery/g03.jpg",
    title: "Hands-on Development & Coding Session",
    width: 1280,
    height: 720,
    ar: 1.7778,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g04",
    src: "/images/gallery/g04.jpg",
    title: "Collaborative Work & Campus Discussion",
    width: 4032,
    height: 3024,
    ar: 1.3333,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g05",
    src: "/images/gallery/g05.jpg",
    title: "Seminar Hall & Conference Presentation",
    width: 4032,
    height: 3024,
    ar: 1.3333,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g06",
    src: "/images/gallery/g06.jpg",
    title: "Workspace Setup & Focused Execution",
    width: 1920,
    height: 1080,
    ar: 1.7778,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g07",
    src: "/images/gallery/g07.jpg",
    title: "Peer Network & Tech Gathering",
    width: 1084,
    height: 1164,
    ar: 0.9313,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g08",
    src: "/images/gallery/g08.jpg",
    title: "Outdoor Teammates & Hackathon Group",
    width: 1448,
    height: 1086,
    ar: 1.3333,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g09",
    src: "/images/gallery/g09.jpg",
    title: "Technical Presentation & Demo Session",
    width: 1086,
    height: 1448,
    ar: 0.75,
    scale: 1.0,
    y: 0,
    hero: true,
  },
  {
    id: "g10",
    src: "/images/gallery/g10.jpg",
    title: "Campus Event & Mobile Showcase",
    width: 720,
    height: 1600,
    ar: 0.45,
    scale: 1.0,
    y: 0,
    hero: true,
  },
  {
    id: "g11",
    src: "/images/gallery/g11.jpg",
    title: "Team Brainstorming & Review",
    width: 1599,
    height: 1200,
    ar: 1.3325,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g12",
    src: "/images/gallery/g12.jpg",
    title: "Workshop & Engineering Collaboration",
    width: 1260,
    height: 456,
    ar: 2.7632,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g13",
    src: "/images/gallery/g13.jpg",
    title: "Event Recognition & Teammates",
    width: 1600,
    height: 1200,
    ar: 1.3333,
    scale: 1.0,
    y: 0,
  },
  {
    id: "g14",
    src: "/images/gallery/g14.jpg",
    title: "College Team & Project Milestones",
    width: 1600,
    height: 1200,
    ar: 1.3333,
    scale: 1.0,
    y: 0,
  },
];

import type { Metadata } from "next";
import StackView from "./StackView";

export const metadata: Metadata = {
  title: "Anbuchezhian — Tech Stack",
  description:
    "The technologies and tools I use to build modern full-stack digital products.",
};

export default function StackPage() {
  return <StackView />;
}

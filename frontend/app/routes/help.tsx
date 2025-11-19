import HelpInterface from "~/components/HelpInterface";
import type { Route } from "./+types/help";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Help - Autism Research Collaboration" },
    { name: "description", content: "Documentation and help for using the Autism Research Compendium" },
  ];
}

export default function Help() {
  return (
    <>
      <HelpInterface />
    </>
  );
}

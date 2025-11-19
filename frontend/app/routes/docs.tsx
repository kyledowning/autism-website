import type { Route } from "./+types/search";
import { Footer } from "~/footer/footer";
import ProjectDocumentation from "~/components/ProjectDocumentation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Docs - Autism Research Collaboration" },
    { name: "description", content: "Developer Docs for ARC" },
  ];
}

export default function Search() {
  return (
    <>
      <ProjectDocumentation />
    </>
  );
}

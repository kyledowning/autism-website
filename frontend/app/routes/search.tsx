import type { Route } from "./+types/search";
import SearchInterface from "~/components/SearchInterface";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search - Autism Research Collaboration" },
    { name: "description", content: "Search and filter autism research papers by multiple criteria" },
  ];
}

export default function Search() {
  return (
    <>
      <SearchInterface />
    </>
  );
}

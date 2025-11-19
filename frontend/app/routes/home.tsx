import type { Route } from "./+types/home";
import { LandingPage } from "~/components/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Autism Research Collaboration" },
    { name: "description", content: "Search and explore autism research papers from IEEE Xplore and ACM Digital Library" },
  ];
}

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}

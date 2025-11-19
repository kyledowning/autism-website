import type { Route } from "./+types/about";
import AboutInterface from "~/components/AboutInterface";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About - Autism Research Collaboration" },
    { name: "description", content: "Learn about our team and mission" },
  ];
}

export default function About() {
  return (
    <>
      <AboutInterface />
    </>
    );
  }

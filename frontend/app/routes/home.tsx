import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Nav } from "../nav/nav"


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "Autism database tool", content: "" },
  ];
}

export default function Home() {
  return (
    <>
      <Nav />
      <Welcome />
    </>
  );
}

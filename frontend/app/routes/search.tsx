import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Nav } from "../nav/nav"
import Articles from "../articles/articles";
import { Footer } from "~/footer/footer";
 
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search" },
    { name: "Search database", content: "" },
  ];
}

export default function Search() {
  return (
    <>
      <Nav />
      <Articles />
      <Footer />
    </>
  );
}

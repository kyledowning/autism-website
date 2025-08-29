import type { Route } from "./+types/home";
import { Nav } from "../nav/nav"


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Help" },
    { name: "Autism database tool", content: "" },
  ];
}

export default function Help() {
  const tdClass = "p-2 py-7.5 text-center border border-black";
  return (
    <>
      <Nav />
      <h1 className="text-xl font-semibold text-center m-15">

        Our dataset contains thousands of autism research papers which our team has preformed coding on to allow us and our users
        to filter and search our dataset to their desire. The set of different attributes we code each paper with are described below.

      </h1>

      <div className="w-3/4 mx-auto">
        <table className="w-full">
          <tr>
            <td className="p-2 text-center font-bold border border-black w-1/4">Theme</td>
            <td className="p-2 text-center font-bold border border-black w-3/4">Definition</td>
          </tr>
          <tr>
            <td className={tdClass}>Technology &#8594; 241 codes</td>
            <td className={tdClass}>The codes associated <b>technology</b> theme describe the technologies used or described in a study.</td>
          </tr>
          <tr>
            <td className={tdClass}>Challenge &#8594; 144 codes</td>
            <td className={tdClass}>The codes associated with the <b>challenge</b> theme describes the specific challenge an autistic individual may be facing, highlighted in
            that paper. </td>
          </tr>
          <tr>
            <td className={tdClass}>Level &#8594; 23 codes</td>
            <td className={tdClass}>The codes associated with the <b>level</b> theme describe the level to which the participants may be experiencing autism spectrum disorder. Codes generally
            describe the specific effects participants may be experiencing.</td>
          </tr>
          <tr>
            <td className={tdClass}>Problem &#8594; 13 codes</td>
            <td className={tdClass}>The codes associated with the <b>problem</b> theme describe the main problem the participants of the study experience.</td>
          </tr>
          <tr>
            <td className={tdClass}>Group &#8594; 11 codes</td>
            <td className={tdClass}>?</td>
          </tr>
          <tr>
            <td className={tdClass}>Gender &#8594; 10 codes</td>
            <td className={tdClass}>The codes associated with the <b>gender</b> theme describe the main / majority gender of the participants of the study.</td>
          </tr>
          <tr>
            <td className={tdClass}>Age &#8594; 6 codes</td>
            <td className={tdClass}>The codes associated with the <b>age</b> theme describe the main age group of the participants of the study.</td>
          </tr>
          <tr>
            <td className={tdClass}>Language &#8594; 5 codes</td>
            <td className={tdClass}>The codes associated with the <b>language</b> theme describe the language in which the paper used. The two language forms are person-first and identity first.</td>
          </tr>
          <tr>
            <td className={tdClass}>Participant Number &#8594; 5 codes</td>
            <td className={tdClass}>The codes associated with the <b>participant number</b> theme describe the approximate number of participants the study considered.</td>
          </tr>
          <tr>
            <td className={tdClass}>Target User &#8594; 5 codes</td>
            <td className={tdClass}>The codes associated with the <b>target user</b> theme describe the intended user or reader of the research.</td>
          </tr>
          <tr>
            <td className={tdClass}>Race &#8594; 3 codes</td>
            <td className={tdClass}>The codes associated with the <b>race</b> theme describe the main race of the participants considered in the study.</td>
          </tr>
        </table>
        </div>

    </>
  );
}

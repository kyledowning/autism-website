import { Nav } from "~/nav/nav";

export default function About() {

    const teamMembers = [
      {
        name: "Dr. Shameed Ahmed",
        picture: "shameem.jpg",
        link: "https://facultyweb.cs.wwu.edu/~ahmeds/",
        role: "Project Overseer",
        bio: "Associate Professor at Western Washington University"
      },
      {
        name: "Jenny Sims",
        picture: "arc.png",
        link: "",
        role: "Project Developer",
        bio: ""
      },
      {
        name: "Brady Deyak",
        picture: "arc.png",
        link: "",
        role: "Project Developer",
        bio: ""
      },
      {
        name: "Kyle Downing",
        picture: "kyle.jpg",
        link: "https://www.linkedin.com/in/kyledowning/",
        role: "Project Developer",
        bio: "Senior computer science student at Western Washington University"
      }
    ];
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Nav />
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-light text-gray-800 mb-4">About</h1>
          </div>
          <div className="max-w-3xl mx-auto mb-20 space-y-6 text-gray-600 leading-relaxed">
            <p className="text-lg text-center">
              We are a dedicated team of student researchers working with the NEATLab at Western Washington University. Our diverse skill sets and shared 
              passion for excellence drive us to push boundaries and create meaningful solutions.
            </p>
            <p className="text-lg text-center">
              We started this project to help a broad range of people gain access to insightful knowledge and information regarding autsim research. The goal is to deliver
              a functional and accessible web application that serves as a public facing interface for accessing our autism research database. We strived to incorporate visual features within our website
              with the ability to export them for personal use.
            </p>
          </div>
            <div className="mb-12">
            <h2 className="text-3xl font-light text-gray-800 text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
              {teamMembers.map((member, index) => (
                <a 
                  key={index}
                  href={member.link}
                  target="_blank"
                  className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-2 hover:border-gray-300 transition-all duration-300 cursor-pointer">
                  <img className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6" src={member.picture}></img>
                  <h3 className="text-xl font-medium text-gray-800 text-center mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center mb-4 font-medium">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {member.bio}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-light text-gray-800 text-center mb-12">Contact Us</h2>
          <div className="max-w-3xl mx-auto mb-20 space-y-6 text-gray-600 leading-relaxed">
            <p className="text-lg text-center mb-12 max-w-3xl"> 
                As this is a relatively new project in the stages of development, we are open to any and all constructive feedback regarding your experience with this website.
                Further, if you have any additional questions or comments regarding our project don't hesitate to reach out!
            </p>
            <a href="mailto:downink4@wwu.edu?subject=Questions/Comments regarding arc.cs.wwu.edu">
              <h1 className="text-center text-2xl rounded-xl shadow-sm bg-gray-200 hover:bg-gray-300 hover:shadow-lg mb-10 py-5 text-black transition-all duration-300 cursor-pointer">Contact</h1>
            </a>
          </div>
      </div>
    );
  }

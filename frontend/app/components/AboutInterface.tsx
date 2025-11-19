export default function AboutInterface() {
  const teamMembers = [
    {
      name: "Dr. Shameed Ahmed",
      picture: "shameem.jpg",
      link: "https://facultyweb.cs.wwu.edu/~ahmeds/",
      role: "Project Overseer",
      bio: ""
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
      bio: ""
    },
    {
      name: "Maria Iliescu",
      picture: "arc.png",
      link: "",
      role: "Project Developer",
      bio: ""
    }
  ];

  return (
      <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }} className="min-h-screen pb-10 relative overflow-hidden">

        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
            style={{ backgroundColor: 'var(--accent-blue)' }}
          />
          <div
            className="absolute bottom-40 left-1/3 w-80 h-80 rounded-full opacity-25 blur-3xl"
            style={{ backgroundColor: 'var(--accent-purple)' }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: 'var(--accent-cyan)' }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              About <span style={{
                background: `linear-gradient(135deg, var(--accent-blue), var(--accent-purple))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>ARC</span>
            </h1>
            <p className="text-xl" style={{ color: 'var(--text-tertiary)' }}>
              Building tools for accessing autism research
            </p>
          </div>

          {/* Mission Section */}
          <div className="max-w-3xl mx-auto mb-20 space-y-6 leading-relaxed">
            <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="rounded-xl p-8 shadow-lg border">
              <p className="text-lg text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                We are a dedicated team of student researchers working with the <b className="bg-gradient-to-r from-blue-500 via-purple-300 to-cyan-300 bg-clip-text text-transparent">NEAT Lab</b> at <a href="https://cs.wwu.edu" target="_blank" className="hover:underline"><b>Western Washington University.</b></a> We are devoted to developing technologies that benefit humanity for the greater good.
              </p>
              <p className="text-lg text-center" style={{ color: 'var(--text-secondary)' }}>
                We started this project to help a broad range of people gain access to insightful knowledge and information regarding autism research. The goal is to deliver
                a functional and accessible web application that serves as a public facing interface for accessing our autism research database. We strived to incorporate visual features within our website
                with the ability to export them for personal use.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 style={{ color: 'var(--text-primary)' }} className="text-4xl font-bold text-center mb-12">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {teamMembers.map((member, index) => (
                <a
                  key={index}
                  href={member.link}
                  target="_blank"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                  className="rounded-xl p-8 shadow-lg border hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 transition-all duration-300 cursor-pointer">
                  <img className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6" src={member.picture} alt={member.name}></img>
                  <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-medium text-center mb-2">
                    {member.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }} className="text-sm text-center mb-4 font-medium">
                    {member.role}
                  </p>
                  <p style={{ color: 'var(--text-tertiary)' }} className="text-sm text-center leading-relaxed">
                    {member.bio}
                  </p>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-12">
            <h2 style={{ color: 'var(--text-primary)' }} className="text-4xl font-bold text-center mb-12">
              Get in Touch
            </h2>
            <div className="max-w-3xl mx-auto px-7 space-y-6">
              <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="rounded-xl p-8 shadow-lg border">
                <p className="text-lg text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
                  As this is a relatively new project in the stages of development, we are open to any and all constructive feedback regarding your experience with this website.
                  Further, if you have any additional questions or comments regarding our project don't hesitate to reach out!
                </p>
                <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfwDea1_VSwGcG6XPIhYq53I7yKVRpKQPKejQwl3lXnUKyjQQ/viewform?usp=prev">
                  <div style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} className="text-center text-xl font-medium rounded-xl shadow-md border hover:bg-blue-500 hover:shadow-xl hover:translate-y-[-5px] py-6 transition-all duration-300 cursor-pointer">
                    Share Your Feedback
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

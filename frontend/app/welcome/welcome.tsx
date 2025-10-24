export function Welcome() {
  return (
    <main className="min-h-screen pt-16 pb-4">
      <div className="flex flex-col items-center space-y-6 p-8">
        <img src="arc.png" alt="ARC Logo" className="max-h-40"/>
        <h1 className="text-5xl font-sans text-center px-7">Autism Research Collaboration</h1>
        <p className="text-3xl font-sans text-center px-7">A tool for better understanding Autism research</p>
      </div>
      <div className="flex justify-center mt-5 mb-10">
      </div>
      <div className="max-w-7xl mx-auto px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-4">
            <img 
              src="demo.png" 
              alt="Data Visuals" 
              className="w-full h-138 object-cover rounded-4xl shadow-lg"
            />
            <h3 className="text-2xl font-semibold">Data Visualizations</h3>
            <p className="text-lg leading-relaxed">
              Access a large database of autism research papers from trusted datasets provided by IEEE Xplore and ACM Digital Library.
              Our website aggregates thousands of research papers from these sources, making it easy to discover relevant research in autism.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <img 
              src="demo2.png" 
              alt="Search Results" 
              className="h-auto w-250 items-center rounded-4xl shadow-lg"
            />
            <h3 className="text-2xl font-semibold">Advanced Filtering & Searching</h3>
            <p className="text-lg leading-relaxed">
              Filter research by a wide range or criteria, and search for keywords in either the title and abstract or the 
              full text of the paper. Our wide range of options for filtering our database helps you understand trends in autism research
              such as differences between sources, use of technologies, and frequency of keywords across research papers.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

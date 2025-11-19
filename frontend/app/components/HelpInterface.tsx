export default function HelpInterface() {
    return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }} className="min-h-screen py-8">
      <div className="flex flex-col items-center space-y-6 p-8">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Help
        </h1>
        <p style={{ color: 'var(--text-secondary)' }} className="text-lg text-center px-7 max-w-3xl">
          The Autism Research Collaboration provides searchable access to thousands of qualitatively coded research papers from IEEE Xplore and ACM Digital Library, focused on autism research and assistive technologies
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        
        {/* Getting Started Section */}
        <section className="mb-8">
          <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border rounded-lg p-6">
            <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-semibold mb-4">
              1. Getting Started
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed mb-4">
              Navigate to the <strong>Search</strong> page to explore our comprehensive database of autism research papers. Use filters to narrow down results by demographics, technologies, challenges addressed, and more.
            </p>
          </div>
        </section>

        {/* Search Functionality */}
        <section className="mb-8">
          <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border rounded-lg p-6">
            <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-semibold mb-4">
              2. Search Functionality
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Search Types</h3>
                <ul className="space-y-2 ml-4">
                  <li style={{ color: 'var(--text-secondary)' }}>
                    <strong>• Title and Abstract:</strong> Searches within article titles and abstracts (faster, more focused results)
                  </li>
                  <li style={{ color: 'var(--text-secondary)' }}>
                    <strong>• Full Text:</strong> Searches the entire article content (comprehensive but may return more results)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="mb-8">
          <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border rounded-lg p-6">
            <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-semibold mb-4">
              3. Using Filters
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed mb-4">
              Filters help you narrow down search results based on specific criteria. The filter panel appears on the left side of the search page.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Demographic Filters</h4>
                <ul style={{ color: 'var(--text-secondary)' }} className="text-sm space-y-1">
                  <li>• Age Group</li>
                  <li>• Gender</li>
                  <li>• Race</li>
                  <li>• Participant Size</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Research Filters</h4>
                <ul style={{ color: 'var(--text-secondary)' }} className="text-sm space-y-1">
                  <li>• Technology Type</li>
                  <li>• Challenge Addressed</li>
                  <li>• Problem Type</li>
                  <li>• Target User</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Content Filters</h4>
                <ul style={{ color: 'var(--text-secondary)' }} className="text-sm space-y-1">
                  <li>• Language Type</li>
                  <li>• Level Type</li>
                  <li>• Dataset (ACM/IEEE)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Visualizations Section */}
        <section className="mb-8">
          <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border rounded-lg p-6">
            <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-semibold mb-4">
              4. Data Visualizations
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed mb-4">
              The visualization panel displays charts and graphs based on your current search and filter selections. Visualizations dynamically update based on your filters and include geographic distributions, technology trends, demographic breakdowns.
            </p>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              Click the <strong>"Show/Hide Visualizations"</strong> button to toggle the charts panel. When hidden, the articles list expands to full width.
            </p>
          </div>
        </section>

        {/* Article Display Section */}
        <section className="mb-8">
          <div style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }} className="border rounded-lg p-6">
            <h2 style={{ color: 'var(--text-primary)' }} className="text-2xl font-semibold mb-4">
              5. Viewing Articles
            </h2>
            <p style={{ color: 'var(--text-secondary)' }} className="leading-relaxed mb-4">
              Articles are displayed in a scrollable list on the left or center of the page, depending on whether visualizations are visible.
            </p>
            <div>
              <h4 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Article Display Options</h4>
              <ul className="space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li><strong>• Show Abstract:</strong> Toggle to display or hide article abstracts</li>
                <li><strong>• Show Keywords:</strong> Toggle to display or hide article keywords</li>
                <li><strong>• Entries Per Load:</strong> Set the number of articles to load at once</li>
                <li><strong>• Load More:</strong> Click to load additional articles</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
    );
}

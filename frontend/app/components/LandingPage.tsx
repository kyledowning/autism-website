import { useState } from 'react';
import { useNavigate } from 'react-router';

export function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)' }} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div
          className="absolute top-20 right-1/4 w-96 h-96 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: 'var(--accent-blue)' }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: 'var(--accent-purple)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: 'var(--accent-cyan)' }}
        />
      </div>
      <div className="flex flex-col items-center space-y-16 p-8 max-w-7xl w-full relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Autism Research
              <br />
              <span style={{
                background: `linear-gradient(135deg, var(--accent-blue), var(--accent-purple))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Collaboration
              </span>
            </h1>
            <p style={{ color: 'var(--text-secondary)' }} className="text-xl sm:text-2xl md:text-3xl text-center px-4 max-w-4xl mx-auto leading-relaxed font-light">
              A tool for exploring autism related academic literature
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-4xl px-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search autism research papers..."
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                className="w-full px-8 py-6 pr-32 border-2 rounded-xl text-lg sm:text-xl placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 transition-all shadow-lg"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer font-medium text-lg shadow-md hover:shadow-lg"
                aria-label="Search"
              >
                Search
              </button>
            </div>
          </form>
          <p style={{ color: 'var(--text-tertiary)' }} className="text-base text-center mt-4">
            Search by keywords, content, or topics - Press Enter to search
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button
            onClick={() => navigate('/about')}
            className="px-6 py-2.5 rounded-lg font-medium transition-all hover:translate-y-[-1px] cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            About the Project
          </button>
          <button
            onClick={() => navigate('/help')}
            className="px-6 py-2.5 rounded-lg font-medium transition-all hover:translate-y-[-1px] cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            How to Use
          </button>
        </div>
      </div>
    </main>
  );
}

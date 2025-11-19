import { Moon, Sun } from "lucide-react";
import { useTheme } from "~/context/ThemeContext";

export function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }} className="relative shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="no-underline">
          <div className="inline-block" style={{
            borderBottom: '2px solid transparent',
            borderImage: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple)) 1',
            paddingBottom: '4px'
          }}>
            
            <h1 className="text-xl md:text-2xl font-weight-200 tracking-widest"
              style={{ color: 'var(--text-primary)' }}
            >
              Autism Research Collaboration
            </h1>
          </div>
        </a>

        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-1">
            <a
              href="/"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-4 py-2 rounded transition-colors"
            >
              Home
            </a>

            <a
              href="/search"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-4 py-2 rounded transition-colors"
            >
              Search
            </a>

            <a
              href="/help"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-4 py-2 rounded transition-colors"
            >
              Help
            </a>

            {/* <a
              href="/docs"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-4 py-2 rounded transition-colors"
            >
              Docs
            </a> */}

            <a
              href="/about"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-4 py-2 rounded transition-colors"
            >
              About
            </a>
          </div>

          <div className="flex items-center space-x-2 border-l pl-4" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={toggleTheme}
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              className="p-2 rounded border transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

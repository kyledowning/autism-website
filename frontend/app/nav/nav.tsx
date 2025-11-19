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
            
            <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-weight-200 tracking-wide sm:tracking-widest"
              style={{ color: 'var(--text-primary)' }}
            >
              Autism Research Collaboration
            </h1>
          </div>
        </a>

        <div className="flex items-center gap-2 sm:gap-8">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <a
              href="/"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-2 sm:px-4 py-2 rounded transition-colors text-xs sm:text-base touch-manipulation min-h-[44px] flex items-center"
            >
              Home
            </a>

            <a
              href="/search"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-2 sm:px-4 py-2 rounded transition-colors text-xs sm:text-base touch-manipulation min-h-[44px] flex items-center"
            >
              Search
            </a>

            <a
              href="/help"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-2 sm:px-4 py-2 rounded transition-colors text-xs sm:text-base touch-manipulation min-h-[44px] flex items-center"
            >
              Help
            </a>

            {/* <a
              href="/docs"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-2 sm:px-4 py-2 rounded transition-colors text-xs sm:text-base touch-manipulation min-h-[44px] flex items-center"
            >
              Docs
            </a> */}

            <a
              href="/about"
              style={{ color: 'var(--text-secondary)' }}
              className="hover:text-blue-600 font-medium px-2 sm:px-4 py-2 rounded transition-colors text-xs sm:text-base touch-manipulation min-h-[44px] flex items-center"
            >
              About
            </a>
          </div>

          <div className="flex items-center space-x-2 border-l pl-2 sm:pl-4" style={{ borderColor: 'var(--border-color)' }}>
            <button
              onClick={toggleTheme}
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              className="p-1.5 sm:p-2 rounded border transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

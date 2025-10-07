// Navigation bar with two links.
export function Nav() {
    return (
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
          <img src="/arc.png" alt="" className="max-h-15"/>
          <div className="flex space-x-8">
            <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="/search" className="text-gray-600 hover:text-gray-900">Search</a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">Search</a>
          </div>
        </div>
      </nav>
    );
}

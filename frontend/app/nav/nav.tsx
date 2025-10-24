// Navigation bar with two links.
export function Nav() {
    return (
      <nav className="bg-gray-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
          <img src="/arc_inv.png" alt="" className="max-h-20"/>
          <div className="flex space-x-8">
            <a href="/" className="text-gray-100 hover:text-gray-900">Home</a>
            <a href="/search" className="text-gray-100 hover:text-gray-900">Search</a>
            <a href="/about" className="text-gray-100 hover:text-gray-900">About</a>
          </div>
        </div>
      </nav>
    );
}

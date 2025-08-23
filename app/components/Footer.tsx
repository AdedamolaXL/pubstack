export const Footer = () => {
  return (
    <footer className="bg-dune-900 text-white py-12 mt-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Pubstack</h3>
            <p className="text-gray-400 text-sm">
              Supporting independent creative writing through blockchain technology.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition">All Books</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">New Releases</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Bestsellers</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Categories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition">Newsletter</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Writing Blog</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Social Media</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Format Guide</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 AuthorWorks. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Supporting creators with Circle, Polygon, and Web3 Authentication
          </p>
        </div>
      </div>
    </footer>
  );
};
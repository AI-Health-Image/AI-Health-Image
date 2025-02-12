import { Link } from "react-router-dom";


function Header() {
    return (
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">AI-Health-Image Analyzer</div>
        <nav className="flex gap-2">
            {/* Hier Navigationselemente einfügen */}
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <a href ="#" className="hover:text-gray-300">About</a>
            <a href ="#" className="hover:text-gray-300">Contact</a>
            <Link to="/login" className="hover:text-gray-300">Login</Link>
        </nav>
        </header>
    );
  }
  
  export default Header;
  
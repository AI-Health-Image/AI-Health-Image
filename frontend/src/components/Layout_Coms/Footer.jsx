import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-gray-800/95 text-white p-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
          <li>
            <Link 
              to="/imprint" 
              className="text-sm hover:text-blue-400 transition-colors"
            >
              Impressum
            </Link>
          </li>
          <li>
            <Link 
              to="/privacy" 
              className="text-sm hover:text-blue-400 transition-colors"
            >
              Datenschutz
            </Link>
          </li>
          <li>
            <Link 
              to="/terms" 
              className="text-sm hover:text-blue-400 transition-colors"
            >
              Nutzungsbedingungen
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="text-sm hover:text-blue-400 transition-colors"
            >
              Kontakt
            </Link>
          </li>
        </ul>
        <p className="text-center mt-3 text-sm text-gray-400">
          © 2025 AI-Health-Image Analyzer
        </p>
      </div>
    </footer>
  );
}

export default Footer; // Standard-Export hinzufügen
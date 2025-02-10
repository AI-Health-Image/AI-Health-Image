import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-gray-200 p-4">
      <div>
        <ul className="flex justify-center space-x-4">      
          <li>
            <Link to="/imprint">Impressum</Link>
          </li>
          <li>
            <Link to="/about">Über uns</Link>
          </li>
          <li>
            <Link to="/contact">Kontakt</Link>
          </li>
          <li>
            <Link to="/privacy">Datenschutz</Link>
          </li>
        </ul>
      </div>
      <p>© 2025</p>
    </footer>
  );
}

export default Footer;
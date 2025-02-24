import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useJwtStore from "../jwtStore";
import Cookies from "js-cookie";

function Header() {
  const email = useJwtStore((state) => state.decodedJwt.email);
  const role = useJwtStore((state) => state.decodedJwt.role);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const name = email ? email.split('@')[0] : null;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    useJwtStore.getState().removeJwt();
    Cookies.remove("jwt", { path: '' });
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center relative z-20">
      <div className="font-bold text-xl drop-shadow-lg">
        AI-Health-Image Analyzer
      </div>
      <nav className="flex gap-2">
        <Link to="/" className="hover:text-gray-300">Startseite</Link>
        {(role === 'patient') && <Link to="/upload" className="hover:text-gray-300">Hochladen</Link>}
        {(role === 'patient') && <Link to="/archiv" className="hover:text-gray-300">Archiv</Link>}
        <Link to="/about" className="hover:text-gray-300">Über uns</Link>
        <Link to="/contact" className="hover:text-gray-300">Kontakt</Link>
        {name ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="hover:text-gray-300">{name}</button>
            {dropdownOpen && (
              <div className="absolute bg-gray-800 rounded-lg shadow-md right-0 mt-2">
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-700">Einstellungen</Link>
                <button onClick={logout} className="block px-4 py-2 text-left w-full hover:bg-gray-700">Abmelden</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="hover:text-gray-300">Anmelden</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;

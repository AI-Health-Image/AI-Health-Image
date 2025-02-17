import { useState } from "react";
import { Link } from "react-router-dom";
import useJwtStore from "../jwtStore";
import Cookies from "js-cookie";


function Header() {
  //const jwt = useJwtStore((state) => state.jwt);
  const email = useJwtStore((state) => state.decodedJwt.email);
  const role = useJwtStore((state) => state.decodedJwt.role);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //console.log('JWT Role:', role);
  //console.log('JWT Email:', email);

  const name = email ? email.split('@')[0] : null;

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    useJwtStore.removeJwt();
    Cookies.set("jwt", '', { expires: 7 });
    setDropdownOpen(false);
  };

    return (
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">AI-Health-Image Analyzer</div>
        <nav className="flex gap-2">
            {/* Hier Navigationselemente einfügen */}
          <Link to="/" className="hover:text-gray-300">Home</Link>
          
          {(role === 'patient' /*|| role==='doctor'*/) && <Link to="/upload" className="hover:text-gray-300">Upload</Link>}
          {(role === 'patient' /*|| role==='doctor'*/) && <Link to="/archiv" className="hover:text-gray-300">Archiv</Link>}
          
            <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          
          {name ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="hover:text-gray-300">{name}</button>
              {dropdownOpen && (
                <div className="absolute bg-gray-800 rounded-lg shadow-md right-0 mt-2">
                  <Link to="/settings" className="block px-4 py-2 hover:bg-gray-700">Settings</Link>
                  <Link to="/" onClick={logout} className="block px-4 py-2 hover:bg-gray-700">Logout</Link>
                </div>
                )}
            </div>
            ) : (
              <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
          
        </nav>
        </header>
    );
  }
  
  export default Header;
  
import { Link } from "react-router-dom";
import useJwtStore from "../jwtStore";


function Header() {
  //const jwt = useJwtStore((state) => state.jwt);
  const email = useJwtStore((state) => state.decodedJwt.email);
  const role = useJwtStore((state) => state.decodedJwt.role);
  console.log('JWT Role:', role);
  console.log('JWT Email:', email);

  const name = email ? email.split('@')[0] : null;

    return (
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">AI-Health-Image Analyzer</div>
        <nav className="flex gap-2">
            {/* Hier Navigationselemente einfügen */}
            <Link to="/" className="hover:text-gray-300">Home</Link>
            {(role==='patient' /*|| role==='doctor'*/) && <Link to="/upload" className="hover:text-gray-300">Upload</Link>}
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          {name ? (
              <p>{name}</p>
            ) : (
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            )}
        </nav>
        </header>
    );
  }
  
  export default Header;
  
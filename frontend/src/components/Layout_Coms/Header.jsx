import React from 'react'


function Header() {
    return (
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">AI-Health-Image Analyzer</div>
        <nav>
            {/* Hier Navigationselemente einfügen */}
            <a href ="#" className="mr-4 hover:text-gray-300">Home</a>
            <a href ="#" className="mr-4 hover:text-gray-300">About</a>
            <a href ="#">Contact</a>
            <a href ="#">Login</a>
     
        </nav>
        </header>
    );
  }
  
  export default Header;
  
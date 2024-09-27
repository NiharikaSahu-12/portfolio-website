import React, { useState } from "react";
import { RiCloseLine, RiMenu2Line } from "@remixicon/react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-stone-900 bg-opacity-50 backdrop-blur-sm flex justify-between items-center text-white px-6 py-6 md:px-20 z-50">
      <span className="text-xl font-bold tracking-wide">
        <a href="#" onClick={()=> setMenuOpen(false)}>PORTFOLIO</a></span>

      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center absolute md:relative top-full md:top-auto left-0 w-full md:w-auto bg-black md:bg-transparent p-6 md:p-0 transition-all duration-300 ease-in-out rounded-b-lg gap-6`}
      >
        <li className="text-md p-2 md:p-0 relative">
  <a href="#About" onClick={() => setMenuOpen(false)} className="hover:text-[#465697] transition-colors relative inline-block">
    About
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#465697] transition-all duration-300 ease-out group-hover:w-full"></span>
  </a>
</li>
<li className="text-md p-2 md:p-0 relative">
  <a href="#Experience" onClick={() => setMenuOpen(false)} className="hover:text-[#465697] transition-colors relative inline-block">
    Experience
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#465697] transition-all duration-300 ease-out group-hover:w-full"></span>
  </a>
</li>
<li className="text-md p-2 md:p-0 relative">
  <a href="#Skills" onClick={() => setMenuOpen(false)} className="hover:text-[#465697] transition-colors relative inline-block">
    Skills
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#465697] transition-all duration-300 ease-out group-hover:w-full"></span>
  </a>
</li>
<li className="text-md p-2 md:p-0 relative">
  <a href="#Projects" onClick={() => setMenuOpen(false)} className="hover:text-[#465697] transition-colors relative inline-block">
    Projects
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#465697] transition-all duration-300 ease-out group-hover:w-full"></span>
  </a>
</li>
<li className="text-md p-2 md:p-0 relative">
  <a href="#Contact" onClick={() => setMenuOpen(false)} className="hover:text-[#465697] transition-colors relative inline-block">
    Contact
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#465697] transition-all duration-300 ease-out group-hover:w-full"></span>
  </a>
</li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden z-50" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <RiCloseLine size={30} className="transition-all duration-300" />
        ) : (
          <RiMenu2Line size={30} className="transition-all duration-300" />
        )}
      </button>
    </nav>
  );
}
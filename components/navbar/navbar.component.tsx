import React from "react";

const Navbar: React.FC = () => {
    return (
        <nav>
            <a href="/"><img src="/kodesnaps_header.svg" alt="logo" width="250px" className="inline mr-3" /></a>
            <a href="https://github.com/saptarshibasu15/kodesnaps" target="_blank"><div className="release absolute bg-black hidden md:inline lg:inline rounded-l-full right-0 top-6 h-12 text-white p-3 pl-6 pt-4 font-mono text-sm font-medium  w-72 hover:w-96 transition duration-500 ease-in-out">Early beta release v0.1.0</div></a>
        </nav>
    )
}

export default Navbar;
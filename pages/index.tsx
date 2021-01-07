import React from "react";
import Navbar from "../components/navbar/navbar.component";

const Home: React.FC = () => {
  return (
    <div className="p-3">
      <Navbar />
      <div className="px-10 py-8 lg:px-24 flex justify-between">
        <div className="inline lg:pt-32">
          <div className="font-sans font-display font-bold text-primary text-3xl lg:text-6xl">
            Share Code
        </div>
          <div className="font-display font-bold text-3xl lg:text-6xl mt-3">
            Be Cool!
        </div>
          <div className="font-display font-regular text-xl lg:text-3xl">
            Create one now!
            <a href="#"><img className="inline addbutton" src="/addbutton.svg" /></a>
          </div>
        </div>
        <div>
          <img className="hidden lg:inline" src="/illustration.svg" />
        </div>
      </div>
    </div>
  )
}

export default Home;
import axios from "axios";
import React from "react";
import Navbar from "../components/navbar/navbar.component";

const Home: React.FC = () => {
  return (
    <div className="p-3">
      <Navbar />
      <div className="hidden lg:flex px-10 py-8 lg:px-24 justify-between">
        <div className="inline lg:pt-32 md:pt-32">
          <div className="font-sans font-display font-bold text-primary text-3xl lg:text-6xl">
            Share Code
        </div>
          <div className="font-display font-bold text-3xl lg:text-6xl mt-3">
            Be Cool!
        </div>
          <div className="flex mt-8 font-display font-regular text-xl lg:text-3xl">
            Create one now!
            <a href="#">
              <div className="addbutton w-10 h-10 rounded-full text-center ml-5">
                <span className="font-sans font-bold text-4xl text-white radius-full">+</span>
              </div>
            </a>
          </div>
        </div>
        <div>
          <img className="inline" src="/illustration.svg" />
        </div>
      </div>
    </div>
  )
}

export default Home;
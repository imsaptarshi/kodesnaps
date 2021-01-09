import React from "react";
import Navbar from "../components/navbar/navbar.component";
import NotSupported from "../components/not_supported/not_supported"
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div className="p-3">
      <Head>
        <title>Kodesnaps</title>
        <meta name="description" content="Share code in the most easier way than ever" />
        <meta name="title" content={`Kodesnaps | Sharing Code Made Easier`} />
        <meta name="image" content="/kodesnaps_logo.png" />
        <meta property="og:title" content={`Kodesnaps | Sharing Code Made Easier`} />
        <meta property="og:description" content="Share code in the most easier way than ever" />
        <meta property="og:image" content="/kodesnaps_logo.png" />
      </Head>
      <Navbar />
      <div className="hidden lg:flex px-10 py-8 lg:px-20 justify-between">
        <div className="inline lg:pt-32 md:pt-32">
          <div className="font-sans font-display font-bold text-primary text-3xl lg:text-6xl">
            Sharing Code
        </div>
          <div className="font-display font-bold text-3xl lg:text-6xl mt-3">
            Made Easier
        </div>
          <div className="flex mt-8 font-display font-regular text-xl lg:text-3xl">
            Create one now!
            <a href="/new">
              <button className="focus:outline-none addbutton w-10 h-10 rounded-full ml-5">
                <img className="mx-auto" src="/add.svg" />
              </button>
            </a>
          </div>
        </div>
        <div>
          <img className="inline" src="/illustration.svg" />
        </div>
      </div>
      <NotSupported />
    </div>
  )
}

export default Home;
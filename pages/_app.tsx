import '../styles/globals.css'
import React from "react";
import Head from "next/head";
import "./../components/navbar/navbar.scss"

const MyApp: React.FC<{ Component: any, pageProps: any }> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp



import Page from "~/app/page";
import Guest from "~/app/guest/page";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {

  const head = <Head>
    <title>HELHa - Portail d'authentification avec différents niveaux</title>
    <meta name="description" content="K Gen" />
    <link rel="icon" href="/favicon.ico" />
  </Head>

  const {data: session} = useSession()

  return(
    <>
    {head}
    {session?
      <Guest />
      :
      <Page />
    }
    </>
  )
}

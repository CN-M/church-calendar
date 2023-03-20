import { type NextPage } from "next";
import { useSession } from 'next-auth/react'
import Head from "next/head";

import Calendar from "~/components/Calendar";
import Navbar from "~/components/Navbar";

const Home: NextPage = () => {

  const { status: loading } = useSession();

  if (loading === 'loading') {
    return <h2 className='loader'>Loading...</h2>
  }

  return (
    <>
      <Head>
        <title>Church Calendar</title>
        <meta name="description" content="Church Calendar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <br />
      <Calendar />
    </>
  );
};

export default Home;
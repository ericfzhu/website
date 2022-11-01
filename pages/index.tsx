import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

const Home: NextPage = props => {
  let currentYear = new Date().getFullYear();

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="px-8">
      <Head>
        <title>Eric Zhu</title>
        <meta property={"og:title"} content={"Eric Zhu"} key="title"/>
        <meta name="viewport" content="width=device-width" key="title"/>
        <link rel="icon" href="/white.ico" />
      </Head>

      <main className="min-h-screen py-16 flex-1 flex flex-col justify-center items-center">
          <motion.h1
              // initial={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              className="font-serif text-6xl m-5 leading-tight">
            Eric Zhu
          </motion.h1>
        <div className="align-middle max-w-screen-md justify-between">
          <Link href="/socials">
            <button className="p-3">Socials</button>
          </Link>
          {" / "}
          <Link href="/podsearch">
            <button disabled className="p-3 line-through">
              PodSearch
            </button>
          </Link>
          {/*{" / "}*/}
          {/*<Link href="/palette-diffuser"><button disabled className="p-3 line-through">Palette Diffuser</button></Link>*/}
        </div>
        <p className="text-sm p-3 text-gray-600">
          &copy; {currentYear}. All rights reserved.
        </p>
      </main>
    </motion.div>
  );
};

export default Home;

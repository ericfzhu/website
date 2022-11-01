import {NextPage} from "next";
import { motion, AnimatePresence } from 'framer-motion';
import Head from "next/head";
import Link from "next/link";

const Socials: NextPage = () => {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="px-8">
            <Head>
                <title>Eric Zhu: Socials</title>
                <meta property={"og:title"} content={"Eric Zhu: Socials"} key="title"/>
                <meta name="viewport" content="width=device-width" key="title"/>
                <link rel="icon" href="/white.ico" />
            </Head>
            <motion.div className="min-h-screen py-16 flex-1 flex flex-col">
                <Link href="/">
                    <button className="p-3">
                        <motion.h1
                            key="title"
                            className="font-serif text-6xl m-5 leading-tight content-center">
                            Eric Zhu
                        </motion.h1>
                    </button>
                </Link>
            </motion.div>
        </motion.div>
    )
}

export default Socials
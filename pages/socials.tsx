import { NextPage } from 'next'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'

const Socials: NextPage = () => {
    let currentYear = new Date().getFullYear()
    return (
        <motion.div className="px-8">
            <Head>
                <title>Eric Zhu: Socials</title>
                <meta
                    property={'og:title'}
                    content={'Eric Zhu: Socials'}
                    key="title"
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/white.ico" />
            </Head>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ translateY: '-35%' }}
                transition={{ duration: 0.5, type: 'tween', delay: 0.2 }}
                className="min-h-screen py-16 flex-1 flex flex-col justify-center items-center"
            >
                <Link href="/">
                    <button>
                        <motion.h1 className="font-serif text-6xl m-5">
                            Eric Zhu
                        </motion.h1>
                    </button>
                </Link>
                <motion.div
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="align-middle max-w-screen-md justify-between"
                >
                    <button disabled className="p-3">
                        Socials
                    </button>
                    <button disabled className="p-1">
                        /
                    </button>
                    <button disabled className="p-3">
                        PodSearch
                    </button>
                </motion.div>
                <motion.div
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <button disabled className="text-sm p-3 text-gray-600">
                        &copy; {currentYear}. All rights reserved.
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default Socials

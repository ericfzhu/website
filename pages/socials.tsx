import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Socials: NextPage = () => {
    let currentYear = new Date().getFullYear()

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    }
    const item = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            translateY: '-80vh',
            transition: {
                type: 'tween',
                duration: 1.2,
            },
        },
    }

    return (
        <>
            <Head>
                <title>Eric Zhu - Socials</title>
                <meta
                    property={'og:title'}
                    content={'Eric Zhu - Socials'}
                    key="title"
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/white.ico" />
            </Head>

            <div className="flex-col flex items-center align-middle justify-center scrollbar-hide">
                <motion.div
                    initial={{ y: '37vh' }}
                    animate={{ y: '5vh' }}
                    transition={{ duration: 0.5, type: 'tween', delay: 0.2 }}
                >
                    <Link href="/">
                        <button>
                            <motion.h1 className="text-6xl m-5 select-none">
                                Eric Zhu
                            </motion.h1>
                        </button>
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ y: '37vh' }}
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
                    <button disabled className="p-3 line-through">
                        PodSearch
                    </button>
                </motion.div>
                <motion.p
                    initial={{ y: '37vh' }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm p-3 text-gray-600 select-none"
                >
                    &copy; {currentYear}. All rights reserved.
                </motion.p>
            </div>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="flex flex-col items-center"
            >
                <motion.div variants={item}>
                    <Link href="/">
                        <button>
                            <motion.h1 className="font-serif text-2xl m-7 select-none">
                                Github
                            </motion.h1>
                        </button>
                    </Link>
                </motion.div>
                <motion.div variants={item}>
                    <Link href="/">
                        <button>
                            <motion.h1 className="font-serif text-2xl m-7 select-none">
                                Linkedin
                            </motion.h1>
                        </button>
                    </Link>
                </motion.div>
                <motion.div variants={item}>
                    <Link href="/">
                        <button>
                            <motion.h1 className="font-serif text-2xl m-7 select-none">
                                Twitter
                            </motion.h1>
                        </button>
                    </Link>
                </motion.div>
                <motion.div variants={item}>
                    <Link href="/">
                        <button>
                            <motion.h1 className="font-mono text-2xl m-7 select-none">
                                Instagram
                            </motion.h1>
                        </button>
                    </Link>
                </motion.div>
                <motion.div variants={item}>
                    <Link href="/">
                        <button>
                            <motion.h1 className="font-serif text-2xl m-7 select-none">
                                hi@ericfzhu.com
                            </motion.h1>
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </>
    )
}

export default Socials

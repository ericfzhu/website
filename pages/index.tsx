import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Home: NextPage = () => {
    let currentYear = new Date().getFullYear()

    return (
        <motion.div className="px-8">
            <Head>
                <title>Eric Zhu</title>
                <meta property={'og:title'} content={'Eric Zhu'} key="title" />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/white.ico" />
            </Head>

            <motion.div className="flex-col flex items-center align-middle justify-center select-none">
                <motion.div
                    initial={{ opacity: 1, y: '15vh' }}
                    animate={{ y: '37vh' }}
                    transition={{ duration: 0.5, type: 'tween' }}
                >
                    <motion.h1 className="text-6xl m-5">Eric Zhu</motion.h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: '37vh' }}
                    animate={{ opacity: 1, y: '37vh' }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                    className="align-middle max-w-screen-md justify-between"
                >
                    <Link href="/socials">
                        <button className="p-3 uppercase">Socials</button>
                    </Link>
                    {' / '}
                    <a href="https://podsearch.app"
                          target="_blank"
                          rel="noreferrer">
                        <button disabled className="p-3 line-through uppercase">
                            PodSearch
                        </button>
                    </a>
                    {/*{" / "}*/}
                    {/*<Link href="/palette-diffusion"><button disabled className="p-3 line-through">Palette Diffusion</button></Link>*/}
                </motion.div>
                <motion.p
                    initial={{ opacity: 0, y: '37vh' }}
                    animate={{ opacity: 1, y: '37vh' }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                    className="text-sm p-3 text-gray-600"
                >
                    &copy; {currentYear}. All rights reserved.
                </motion.p>
            </motion.div>
        </motion.div>
    )
}

export default Home

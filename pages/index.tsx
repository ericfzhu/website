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

            <motion.div
                initial={{ opacity: 1, y: '-35%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, type: 'tween' }}
                className="min-h-screen py-16 flex-1 flex flex-col justify-center items-center"
            >
                <motion.h1 className="font-serif text-6xl m-5">
                    Eric Zhu
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                    className="align-middle max-w-screen-md justify-between"
                >
                    <Link href="/socials">
                        <button className="p-3">Socials</button>
                    </Link>
                    {' / '}
                    <Link href="/podsearch">
                        <button disabled className="p-3 line-through">
                            PodSearch
                        </button>
                    </Link>
                    {/*{" / "}*/}
                    {/*<Link href="/palette-diffuser"><button disabled className="p-3 line-through">Palette Diffuser</button></Link>*/}
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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

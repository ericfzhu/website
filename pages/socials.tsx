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
                delayChildren: 0.2,
            },
        },
    }
    const item = {
        hidden: { opacity: 0, y: '30vh' },
        show: {
            opacity: 1,
            y: '5vh',
            transition: {
                type: 'tween',
                duration: 1.2,
            },
        },
    }

    const pathVariants = {
        hidden: {
            opacity: 0,
            pathLength: 0,
        },
        hover: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 1.5,
                ease: 'linear',
            },
        },
    }

    const textVariants = {
        hidden: {
            x: '-17.5px',
        },
        hover: {
            x: '0vh',
            transition: {
                duration: 1.5,
                type: 'tween',
            },
        },
    }

    const socials = [
        {
            name: 'Github',
            link: 'https://github.com/ericfzhu',
            path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/ericfzhu/',
            path: 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z',
        },
        {
            name: 'Twitter',
            link: 'https://twitter.com/ericfzhu1',
            path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
        },
        {
            name: 'hi@ericfzhu.com',
            link: 'mailto:hi@ericfzhu.com',
            path: 'M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z',
        },
    ]

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
                    animate={{ opacity: 0, y: '37vh' }}
                    transition={{ duration: 0.2 }}
                    className="align-middle max-w-screen-md justify-between"
                >
                    <button disabled className="p-3">
                        Socials
                    </button>
                    {' / '}
                    <button disabled className="p-3 line-through">
                        PodSearch
                    </button>
                </motion.div>
                <motion.p
                    initial={{ y: '37vh' }}
                    animate={{ opacity: 0, y: '37vh' }}
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
                {socials.map((social, index) => (
                    <motion.div key={index} variants={item}>
                        <a href={social.link} target="_blank" rel="noreferrer">
                            <motion.button
                                className="inline-flex items-center"
                                initial="hidden"
                                whileHover="hover"
                                whileTap="hover"
                                animate="hidden"
                            >
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35"
                                    height="35"
                                    viewBox="0 0 24 24"
                                >
                                    <motion.path
                                        fill="none"
                                        stroke="black"
                                        variants={pathVariants}
                                        d={social.path}
                                    />
                                </motion.svg>
                                <motion.h1
                                    className="text-2xl m-7 select-none"
                                    variants={textVariants}
                                >
                                    {social.name}
                                </motion.h1>
                            </motion.button>
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </>
    )
}

export default Socials

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Socials: NextPage = () => {
    let currentYear = new Date().getFullYear()
    const [initialAnimation, setInitialAnimation] = useState(false)
    setTimeout(() => {
        setInitialAnimation(true)
    }, 2000)

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
        hidden: { opacity: 0, y: '32vh' },
        show: {
            opacity: 1,
            y: '17vh',
            transition: {
                type: 'tween',
                duration: 1.2,
            },
        },
    }

    const socials = [
        {
            name: 'Github',
            link: 'https://github.com/ericfzhu',
        },
        {
            name: 'Hugging Face',
            link: 'https://huggingface.co/ericzhu',
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/ericfzhu/',
        },
        {
            name: 'Twitter',
            link: 'https://twitter.com/ericfzhu1',
        },
        {
            name: 'Email',
            link: 'mailto:hi@ericfzhu.com',
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
                    animate={{ y: '22vh' }}
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
                    <button disabled className="p-3 uppercase">
                        Socials
                    </button>
                    {' / '}
                    <button disabled className="p-3 line-through uppercase">
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
                        <a
                            href={social.link}
                            target="_blank"
                            rel="noreferrer"
                            className={
                                initialAnimation
                                    ? 'link-underline p-5 inline-block'
                                    : 'p-5 inline-block'
                            }
                        >
                            <motion.h1
                                initial="hidden"
                                animate="hidden"
                                className="text-2xl p-3 select-none tracking-widest uppercase"
                            >
                                {social.name}
                            </motion.h1>
                        </a>
                    </motion.div>
                ))}
            </motion.div>
        </>
    )
}

export default Socials

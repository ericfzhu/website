import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const Home: NextPage = () => {
    let currentYear = new Date().getFullYear()
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
        <div className="px-8">
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

            <div className="select-none flex items-center justify-center h-screen flex-col">
                <div>
                    <h1 className="text-6xl m-5">Eric Zhu</h1>
                </div>
                <div className="align-middle max-w-screen-md justify-between">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                Socials
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute left-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                    {socials.map((social, index) => (
                                        <Menu.Item key={index}>
                                            {({ active }) => (
                                                <a
                                                    href={social.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <button
                                                        className={`${
                                                            active
                                                                ? 'bg-gray-200'
                                                                : 'text-black-900'
                                                        } group flex w-full items-center px-2 py-2 text-sm`}
                                                    >
                                                        {social.name}
                                                    </button>
                                                </a>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    {' / '}
                    <a
                        href="https://podsearch.app"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button disabled className="p-3 line-through uppercase">
                            PodSearch
                        </button>
                    </a>
                    {/*{" / "}*/}
                    {/*<Link href="/palette-diffusion"><button disabled className="p-3 line-through">Palette Diffusion</button></Link>*/}
                </div>
                <p className="text-sm p-3 text-gray-600">
                    &copy; {currentYear}. All rights reserved.
                </p>
            </div>
        </div>
    )
}

export default Home

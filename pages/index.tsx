import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
    let currentYear = new Date().getFullYear()

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
                    <Link href="/socials">
                        <button className="p-3 uppercase">Socials</button>
                    </Link>
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

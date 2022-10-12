import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'


const Home: NextPage = () => {
  return (
    <div className="px-8">
      <Head>
        <title>Eric Zhu</title>
        <meta name="viewport" content="width=device-width"/>
        <link rel="icon" href="/white.ico" />
      </Head>

      <main className="min-h-screen py-16 flex-1 flex flex-col justify-center items-center">
        <h1 className="font-serif text-6xl m-5 leading-tight">
          Eric Zhu
        </h1>

        <div className="flex align-middle flex-wrap max-w-screen-md">
          <Link href="/contact">Contact</Link>
        </div>
      </main>
    </div>
  )
}

export default Home

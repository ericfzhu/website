import Sketch3 from '@/components/p5/sketch3'
import Head from 'next/head'

export default function p5() {
    return (
        <main className="w-screen h-screen bg-black overflow-hidden">
            <Head>
                <title>Primes</title>
                <meta property={'og:title'} content={'Primes'} key="title" />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/assets/black.jpg" />
            </Head>
            <Sketch3 />
        </main>
    )
}

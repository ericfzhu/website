import Sketch2 from '@/components/p5/sketch2'
import Head from 'next/head'

export default function p5() {
    return (
        <main className="w-screen h-screen bg-black overflow-hidden">
            <Head>
                <title>Entropy</title>
                <meta property={'og:title'} content={'Entropy'} key="title" />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/assets/tsubuyaki.jpg" />
            </Head>
            <Sketch2 />
        </main>
    )
}
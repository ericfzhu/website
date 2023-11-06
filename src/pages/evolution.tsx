import Sketch1 from '@/components/p5/sketch1'
import Head from 'next/head'

export default function p5() {
    return (
        <main className="w-screen h-screen bg-black overflow-hidden">
            <Head>
                <title>Evolution</title>
                <meta property={'og:title'} content={'Evolution'} key="title" />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/assets/black.jpg" />
            </Head>
            <Sketch1 />
        </main>
    )
}

import P5 from '@/components/sketch1'
import Head from 'next/head'

export default function p5() {
    return (
        <main className="w-screen h-screen bg-black overflow-hidden">
            <Head>
                <title>Abstraction</title>
                <meta
                    property={'og:title'}
                    content={'Abstraction'}
                    key="title"
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/assets/black.jpg" />
            </Head>
            <P5 />
        </main>
    )
}

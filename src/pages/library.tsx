import Library from '@/components/LibraryComponent'
import Head from 'next/head'

export default function LibraryPage() {
    return (
        <main>
            <Head>
                <title>ESSENCE</title>
                <meta property={'og:title'} content={'ESSENCE'} key="title" />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/assets/icons/ESSENCE3.png" />
            </Head>
            <Library />
        </main>
    )
}

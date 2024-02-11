import LibraryComponent from '@/components/LibraryComponent'
import Head from 'next/head'

export default function LibraryPage() {
    return (
        <main>
            <Head>
                <title>Literature tracker | ESSENCE</title>
                <meta
                    property={'og:title'}
                    content={'Literature tracker | ESSENCE'}
                    key="title"
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/assets/icons/ESSENCE3.png" />
            </Head>
            <LibraryComponent />
        </main>
    )
}

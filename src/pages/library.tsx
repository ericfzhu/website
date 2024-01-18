import LibraryComponent from '@/components/LibraryComponent'
import Head from 'next/head'

export default function LibraryPage() {
    return (
        <main>
            <Head>
                <title>Books & movies tracker | ESSENCE</title>
                <meta
                    property={'og:title'}
                    content={'Books & movies tracker | ESSENCE'}
                    key="title"
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/assets/icons/ESSENCE4.png" />
            </Head>
            <LibraryComponent />
        </main>
    )
}

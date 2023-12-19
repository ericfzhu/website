import Library from "@/components/library";
import Head from "next/head";

export default function LibraryPage() {
    return (
    <main>
        <Head>
            <title>图书馆</title>
            <meta property={'og:title'} content={'图书馆'} key="title" />
            <meta
                name="viewport"
                content="width=device-width"
                key="title"
            />
            <link rel="icon" href="/assets/icons/library.jpg" />
        </Head>
        <Library />
    </main>
    )
}
import P5 from "@/components/P5";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function p5() {
    const [canvasHeight, setCanvasHeight] = useState(500);
    const [canvasWidth, setCanvasWidth] = useState(500);

    useEffect(() => {
        setCanvasHeight(window.innerHeight);
        setCanvasWidth(window.innerWidth);
    }, []);

    return (
        <main className="w-screen h-screen bg-black overflow-hidden">
            <Head>
                <title>Abstraction</title>
                <meta property={'og:title'} content={'Abstraction'} key="title" />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/assets/black.jpg"/>
            </Head>
            <P5 canvasHeight={canvasHeight} canvasWidth={canvasWidth}/>
        </main>
    );
}
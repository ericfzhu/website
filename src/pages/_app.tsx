import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import AnimatedCursor from 'react-animated-cursor'

export default function App({ Component, pageProps }: AppProps<{}>) {
    return (
        <AnimatePresence initial={false} mode="wait">
            {/* <AnimatedCursor
                color="255, 255, 255"
                // color="#fff"
                innerSize={8}
                outerSize={35}
                innerScale={1}
                outerScale={1.7}
                outerAlpha={0}
                innerStyle={{
                    backgroundColor: 'rgb(255,255,255)',
                    // border: '3px solid rgb(255,255,255)',
                    // opacity: 0,
                }}
                outerStyle={{
                    backgroundColor: 'rgb(255,255,255)',
                    // border: '3px solid rgb(255,255,255)',
                    mixBlendMode: 'exclusion',
                }}
                clickables={['.icon', 'button']}
                trailingSpeed={8}
            /> */}
            <Component {...pageProps} />
        </AnimatePresence>
    )
}

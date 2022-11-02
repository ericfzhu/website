import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

function App({ Component, pageProps }: AppProps) {
    return (
        <AnimatePresence initial={false} mode="wait">
            <Component {...pageProps} />
        </AnimatePresence>
    )
}

export default App

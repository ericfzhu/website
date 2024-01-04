import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'

import { PostHogProvider} from 'posthog-js/react'

const options = {
    api_host: process.env.POSTHOG_HOST,
  }

export default function App({ Component, pageProps }: AppProps<{}>) {
    return (
        <AnimatePresence initial={false}>
            <PostHogProvider 
            apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
            options={options}
            >
                <Component {...pageProps} />
            </PostHogProvider>
        </AnimatePresence>
    )
}

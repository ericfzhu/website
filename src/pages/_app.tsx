import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import { courierPrime } from '@/components/Fonts';

export default function App({ Component, pageProps }: AppProps<{}>) {
	return (
		<AnimatePresence initial={false}>
			<main className={courierPrime.className}>
				<Component {...pageProps} />
			</main>
		</AnimatePresence>
	);
}

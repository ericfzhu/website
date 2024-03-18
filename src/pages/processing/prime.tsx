import Sketch3 from '@/components/p5/sketch3';
import Head from 'next/head';

export default function P5PrimePage() {
	return (
		<main className="h-screen w-screen overflow-hidden bg-black">
			<Head>
				<title>Prime</title>
				<meta property={'og:title'} content={'Prime'} key="title" />
				<meta name="viewport" content="width=device-width" key="title" />
				<link rel="icon" href="/assets/icons/tsubuyaki.jpg" />
			</Head>
			<Sketch3 />
		</main>
	);
}

import Sketch1 from '@/components/p5/sketch1';
import Head from 'next/head';

export default function P5EvolutionPage() {
	return (
		<main className="h-screen w-screen overflow-hidden bg-black">
			<Head>
				<title>Evolution</title>
				<meta property={'og:title'} content={'Evolution'} key="title" />
				<meta name="viewport" content="width=device-width" key="title" />
				<link rel="icon" href="/assets/icons/tsubuyaki.jpg" />
			</Head>
			<Sketch1 />
		</main>
	);
}

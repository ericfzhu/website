import Sketch2 from '@/components/p5/sketch2';
import Head from 'next/head';

export default function P5FlowerPage() {
	return (
		<main className="h-screen w-screen overflow-hidden bg-black">
			<Head>
				<title>Flower</title>
				<meta property={'og:title'} content={'Flower'} key="title" />
				<meta name="viewport" content="width=device-width" key="title" />
				<link rel="icon" href="/assets/icons/tsubuyaki.jpg" />
			</Head>
			<Sketch2 />
		</main>
	);
}

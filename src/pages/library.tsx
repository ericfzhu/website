import { LibraryComponent } from '@/components';
import Head from 'next/head';

export default function LibraryPage() {
	return (
		<main>
			<Head>
				<title>Reflections on Literature | ESSENCE</title>
				<meta property={'og:title'} content={'Reflections on Literature | ESSENCE'} key="title" />
				<meta name="viewport" content="width=device-width" key="title" />
				<link rel="icon" href="/assets/icons/ESSENCE3.png" />
			</Head>
			<LibraryComponent />
		</main>
	);
}

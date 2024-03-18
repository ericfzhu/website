import { LibraryComponent } from '@/components';
import Head from 'next/head';

export default function LibraryPage() {
	return (
		<main>
			<Head>
				<title>Reflections on Literature | ESSENCE</title>
				<meta property={'og:title'} content={'Reflections on Literature | ESSENCE'} key="title" />
				<meta property="og:url" content="http://ericfzhu.com/library" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="https://www.ericfzhu.com/assets/files/projects/essence/1.webp" />
				<meta name="viewport" content="width=device-width" key="title" />
				<link rel="icon" href="/assets/icons/ESSENCE3.png" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="ericfzhu.com/library" />
				<meta property="twitter:url" content="http://ericfzhu.com/library" />
				<meta name="twitter:title" content={'Reflections on Literature | ESSENCE'} />
				<meta name="twitter:image" content="https://www.ericfzhu.com/assets/files/projects/essence/1.webp" />
			</Head>
			<LibraryComponent />
		</main>
	);
}

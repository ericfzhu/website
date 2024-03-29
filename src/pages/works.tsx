import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { WorksComponent } from '@/components';
import { cn } from '@/lib/utils';

export default function LibraryPage() {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updateCursorPosition = (e: MouseEvent) => {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener('mousemove', updateCursorPosition);

		return () => {
			window.removeEventListener('mousemove', updateCursorPosition);
		};
	}, []);
	return (
		<main className={cn('h-full w-full overflow-hidden bg-[#D6D2CB] @container')}>
			<Head>
				<title>Eric Zhu Works</title>
				<meta property={'og:title'} content={'Eric Zhu Works'} key="title" />
				<meta property="og:url" content="http://ericfzhu.com/works" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="https://www.ericfzhu.com/assets/works.webp" />
				<meta name="viewport" content="width=device-width" key="title" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="ericfzhu.com/works" />
				<meta property="twitter:url" content="http://ericfzhu.com/works" />
				<meta name="twitter:title" content={'Eric Zhu Works'} />
				<meta property="og:image" content="https://www.ericfzhu.com/assets/works.webp" />
			</Head>
			<div className="absolute bottom-10 left-10 flex origin-top-left -rotate-90 transform gap-5 gap-x-5 font-thin @5xl:text-xl @7xl:gap-x-10 @7xl:text-2xl">
				<Link href="/" className="duration-300 hover:text-[#E6883C]">
					Home
				</Link>
				<Link href="/works" className="text-[#E6883C]">
					Works
				</Link>
				<Link href="/library" className="duration-300 hover:text-[#E6883C]">
					Literature
				</Link>
				<Link href="/?windows=blog&fs=blog" className="duration-300 hover:text-[#E6883C]">
					Writing
				</Link>
			</div>
			<WorksComponent cursorPosition={cursorPosition} />
		</main>
	);
}

import { useState } from 'react';
import { IconCode } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { HoverMediaComponent } from '@/components';
import { jetBrainsMono } from '@/components/Fonts';
import { WORKS } from '@/components/data/works';

export default function WorksComponent({ cursorPosition }: { cursorPosition: { x: number; y: number } }) {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [hoverText, setHoverText] = useState('' as string);
	return (
		<div className={jetBrainsMono.className}>
			<div className="pointer-events-none absolute left-[30%] top-[20%] h-screen w-full opacity-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
				<Image
					src="/assets/files/aphrodite_full.webp"
					alt="Aphrodite"
					priority
					width={1208 / 3}
					height={2352 / 3}
					className="w-[80%]"
					style={{
						transform: `translateY(-${scrollProgress * 0.05}%)`,
					}}
				/>
			</div>
			<div
				className="z-10 flex h-screen flex-wrap overflow-auto font-light"
				onScroll={(e) => {
					const element = e.target as HTMLElement;
					const scrollProgressPixels = element.scrollTop;
					setScrollProgress(scrollProgressPixels);
				}}>
				<div className="mx-12 mb-10 mt-12 flex h-fit flex-wrap gap-x-5 gap-y-3 text-4xl uppercase @5xl:text-5xl @7xl:m-20 @7xl:gap-x-10 @7xl:gap-y-8  @7xl:text-6xl">
					{WORKS.map((work) => {
						const [isHovered, setIsHovered] = useState(false);

						return (
							<div className="flex h-16 items-center gap-x-1 overflow-hidden">
								{'link' in work && work.link?.preview ? (
									<HoverMediaComponent
										cursorPosition={{
											x: cursorPosition.x,
											y: cursorPosition.y,
										}}
										paths={work.link.preview}
										onMouseEnter={() => {
											setIsHovered(true);
											setHoverText(work.description);
										}}
										onMouseLeave={() => {
											setIsHovered(false);
											setHoverText('');
										}}>
										<div className="cursor-alias truncate">
											<div
												className={cn(
													'font-thin transition-transform duration-300',
													isHovered ? 'translate-y-[-120%]' : 'translate-y-0',
												)}>
												{work.title}
											</div>
											<Link
												href={work.link.href}
												target="_blank"
												className={cn(
													'absolute top-0 cursor-alias font-thin text-[#E6883C] transition-transform duration-300',
													isHovered ? 'translate-y-0' : 'translate-y-[120%]',
												)}>
												{work.title}
											</Link>
										</div>
									</HoverMediaComponent>
								) : 'link' in work ? (
									<div
										className="relative flex items-center justify-center truncate"
										onMouseEnter={() => {
											setIsHovered(true);
											setHoverText(work.description ? work.description : '');
										}}
										onMouseLeave={() => {
											setIsHovered(false);
											setHoverText('');
										}}>
										<div className="relative flex cursor-alias items-center justify-center truncate">
											<div
												className={cn(
													'font-thin transition-transform duration-300',
													isHovered ? 'translate-y-[-120%]' : 'translate-y-0',
												)}>
												{work.title}
											</div>
											<Link
												href={work.link!.href}
												target="_blank"
												className={cn(
													'absolute top-0 font-thin text-[#E6883C] transition-transform duration-300',
													isHovered ? 'translate-y-0' : 'translate-y-[120%] cursor-alias',
												)}>
												WIP
											</Link>
										</div>
									</div>
								) : (
									<div
										className="relative flex items-center justify-center truncate"
										onMouseEnter={() => {
											setIsHovered(true);
											setHoverText(work.description ? work.description : '');
										}}
										onMouseLeave={() => {
											setIsHovered(false);
											setHoverText('');
										}}>
										<div
											className={cn(
												'font-thin transition-transform duration-300',
												isHovered ? 'translate-y-[-120%]' : 'translate-y-0',
											)}>
											{work.title}
										</div>
										<div
											className={cn(
												'absolute top-0 font-thin text-[#E6883C] transition-transform duration-300',
												isHovered ? 'translate-y-0' : 'translate-y-[120%]',
											)}>
											WIP
										</div>
									</div>
								)}
								{'github' in work && work.github && (
									<Link
										href={work.github}
										target="_blank"
										className="flex cursor-alias self-start text-secondary duration-300 hover:text-[#E6883C]">
										<IconCode className="h-4 w-4" />
									</Link>
								)}
								{'year' in work && work.year ? (
									<span className="self-start text-xs font-normal text-secondary">{work.year.slice(-2)}</span>
								) : (
									<span className="self-start text-xs font-normal text-secondary"></span>
								)}
							</div>
						);
					})}
				</div>
				<div className="absolute bottom-2 shrink-0">{hoverText}</div>
			</div>
		</div>
	);
}

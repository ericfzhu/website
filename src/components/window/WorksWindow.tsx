import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { IconX, IconMinus, IconCode } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { IconExpand } from '@/components/svg';
import { jetBrainsMono } from '@/components/Fonts';
import { HoverMediaComponent } from '@/components';
import { windowProps } from '@/components/types';
import { WORKS } from '@/components/data/works';

export default function WorksWindow({ item, position, moveItemToLast, cursorPosition }: windowProps & { cursorPosition: { x: number; y: number } }) {
	const [windowPosition, setWindowPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: window.innerWidth * (window.innerWidth < 798 ? position.x / 3 : position.x),
		y: window.innerHeight * position.y,
	});
	const [lightsHovered, setLightsHovered] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [hoverText, setHoverText] = useState('' as string);
	const searchParams = useSearchParams();
	const router = useRouter();
	const setIsFullscreen = useCallback(
		(bool: boolean) => {
			const newParams = new URLSearchParams(searchParams.toString());
			if (bool) {
				newParams.set('fs', item.var);
			} else {
				newParams.delete('fs');
			}
			router.push('?' + newParams.toString());
		},
		[item.var, router, searchParams],
	);
	const isFullScreen = searchParams?.get('fs') == item.var;

	const targetProperties = useMemo(
		() => ({
			x: isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x,
			y: isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y,
			height: isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.6) / 1.618),
			width: isFullScreen
				? window.innerWidth * 0.9
				: window.innerWidth < 768
					? window.innerWidth * 0.8
					: Math.max(750, window.innerWidth * 0.6),
		}),
		[isFullScreen, windowPosition.x, windowPosition.y],
	);

	return (
		<div
			className={`absolute ${
				isFullScreen ? 'fixed z-50 h-screen w-screen backdrop-blur-md' : 'pointer-events-none h-full w-full'
			} ${jetBrainsMono.className} scroll-smooth`}
			style={{ zIndex: position.z.indexOf(item.var) + 10 }}>
			<motion.div
				initial={targetProperties}
				animate={targetProperties}
				drag={!isFullScreen}
				onTapStart={() => moveItemToLast(item.var)}
				onDragEnd={(e, info) =>
					setWindowPosition({
						x: info.offset.x + windowPosition.x,
						y: info.offset.y + windowPosition.y,
					})
				}
				dragMomentum={false}
				transition={{ stiffness: 100, transition: 0.3 }}
				className={`pointer-events-auto flex flex-col overflow-hidden rounded-lg border border-[#666868] bg-[#D6D2CB] shadow-2xl backdrop-blur-md @container`}>
				{/* Traffic lights */}
				<div
					className="absolute z-20 mx-4 my-[18px] flex items-center rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Red */}
					<div
						className={cn(
							'flex h-3 w-3 items-center justify-center rounded-full active:bg-[#F59689]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#DF3D35] bg-[#FE5F57]'
								: 'border-[1px] border-[#C5682B] bg-[#E6883C]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconX className="stroke-black/50" />}
					</div>
					{/* Yellow */}
					<div
						className={cn(
							'ml-2 flex h-3 w-3 items-center justify-center rounded-full active:bg-[#F6F069]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#DE9A10] bg-[#FCBA2B]'
								: 'border-[1px] border-[#55667F] bg-[#A9ADB1]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconMinus className="stroke-black/50" />}
					</div>
					{/* Green */}
					<div
						className={cn(
							'ml-2 flex h-3 w-3 items-center justify-center rounded-full active:bg-[#73F776]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#14A620] bg-[#61C555]'
								: 'border-[1px] border-[#55667F] bg-[#A9ADB1]',
						)}
						onClick={() => setIsFullscreen(!isFullScreen)}>
						{lightsHovered && <IconExpand className="fill-black/50" />}
					</div>
				</div>

				<div className="pointer-events-none absolute left-[30%] top-[20%] w-full opacity-50 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
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
					className="z-10 mx-12 mb-10 mt-12 flex h-screen flex-wrap overflow-auto font-light @7xl:m-20"
					onScroll={(e) => {
						const element = e.target as HTMLElement;
						const scrollProgressPixels = element.scrollTop;
						setScrollProgress(scrollProgressPixels);
					}}>
					<div className="flex h-fit flex-wrap gap-x-5 gap-y-3 text-4xl uppercase @5xl:text-5xl @7xl:gap-x-10 @7xl:gap-y-8 @7xl:text-6xl">
						{WORKS.map((work) => {
							const [isHovered, setIsHovered] = useState(false);

							return (
								<div className="flex h-16 items-center gap-x-1 overflow-hidden">
									{'link' in work && work.link?.preview ? (
										<HoverMediaComponent
											cursorPosition={{
												x: cursorPosition.x - (isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x),
												y: cursorPosition.y - (isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y),
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
			</motion.div>
		</div>
	);
}

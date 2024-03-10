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
				isFullScreen ? 'fixed w-screen h-screen z-50 backdrop-blur-md' : 'h-full w-full pointer-events-none'
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
				className={`bg-[#D6D2CB] pointer-events-auto backdrop-blur-md rounded-lg shadow-2xl border-[#666868] border flex flex-col overflow-hidden @container`}>
				{/* Traffic lights */}
				<div
					className="absolute flex items-center mx-4 my-[18px] z-20 rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Red */}
					<div
						className={cn(
							'rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FE5F57] border-[1px] border-[#DF3D35]' : 'bg-[#E6883C] border-[1px] border-[#C5682B]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconX className="stroke-black/50" />}
					</div>
					{/* Yellow */}
					<div
						className={cn(
							'rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FCBA2B] border-[1px] border-[#DE9A10]' : 'bg-[#A9ADB1] border-[1px] border-[#55667F]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconMinus className="stroke-black/50" />}
					</div>
					{/* Green */}
					<div
						className={cn(
							'rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#61C555] border-[1px] border-[#14A620]' : 'bg-[#A9ADB1] border-[1px] border-[#55667F]',
						)}
						onClick={() => setIsFullscreen(!isFullScreen)}>
						{lightsHovered && <IconExpand className="fill-black/50" />}
					</div>
				</div>

				<div className="absolute left-[30%] top-[20%] w-full pointer-events-none drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] opacity-50">
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
					className="mt-12 @7xl:m-20 mb-10 mx-12 flex flex-wrap font-light z-10 overflow-auto h-screen"
					onScroll={(e) => {
						const element = e.target as HTMLElement;
						const scrollProgressPixels = element.scrollTop;
						setScrollProgress(scrollProgressPixels);
					}}>
					<div className="flex flex-wrap gap-x-5 @7xl:gap-x-10 gap-y-3 @7xl:gap-y-8 @5xl:text-5xl text-4xl @7xl:text-6xl uppercase h-fit">
						{WORKS.map((work) => {
							const [isHovered, setIsHovered] = useState(false);

							return (
								<div className="flex h-16 overflow-hidden items-center gap-x-1">
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
											<Link href={work.link.href} target="_blank" className="truncate cursor-alias">
												<div
													className={`font-thin transition-transform duration-300 ${isHovered ? 'translate-y-[-120%]' : 'translate-y-0'}`}>
													{work.title}
												</div>
												<div
													className={`font-thin absolute top-0 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-[120%]'} text-[#E6883C]`}>
													{work.title}
												</div>
											</Link>
										</HoverMediaComponent>
									) : 'link' in work ? (
										<div
											className="truncate relative flex items-center justify-center"
											onMouseEnter={() => {
												setIsHovered(true);
												setHoverText(work.description ? work.description : '');
											}}
											onMouseLeave={() => {
												setIsHovered(false);
												setHoverText('');
											}}>
											<Link
												href={work.link!.href}
												target="_blank"
												className="truncate relative flex items-center justify-center">
												<div
													className={`font-thin transition-transform duration-300 ${isHovered ? 'translate-y-[-120%]' : 'translate-y-0'}`}>
													{work.title}
												</div>
												<div
													className={`font-thin absolute top-0 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-[120%]'} text-[#E6883C]`}>
													WIP
												</div>
											</Link>
										</div>
									) : (
										<div
											className="truncate relative flex items-center justify-center"
											onMouseEnter={() => {
												setIsHovered(true);
												setHoverText(work.description ? work.description : '');
											}}
											onMouseLeave={() => {
												setIsHovered(false);
												setHoverText('');
											}}>
											<div
												className={`font-thin transition-transform duration-300 ${isHovered ? 'translate-y-[-120%]' : 'translate-y-0'}`}>
												{work.title}
											</div>
											<div
												className={`font-thin absolute top-0 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-[120%]'} text-[#E6883C]`}>
												WIP
											</div>
										</div>
									)}
									{'github' in work && work.github && (
										<Link
											href={work.github}
											target="_blank"
											className="text-secondary hover:text-[#E6883C] duration-300 flex self-start cursor-alias">
											<IconCode className="h-4 w-4" />
										</Link>
									)}
									{'year' in work && work.year ? (
										<span className="text-secondary text-xs self-start font-normal">{work.year.slice(-2)}</span>
									) : (
										<span className="text-secondary text-xs self-start font-normal"></span>
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

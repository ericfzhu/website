import { IconChevronLeft, IconChevronRight, IconHome, IconMinus, IconSearch, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import music from '@/components/data/music.json';
import { useEffect, useRef, useState } from 'react';
import { notoSansSC } from '@/components/Fonts';
import { Music, MusicWindowProps } from '@/components/types';
import { IconPlayerPlayFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { IconExpand } from '@/components/svg/IconExpand';

const parsedMusic: Record<string, Music> = JSON.parse(JSON.stringify(music));
Object.keys(parsedMusic).forEach((key) => {
	parsedMusic[key].type = 'song';
});

const pictures = {
	Luna: {
		content: '/assets/files/luna.jpg',
		type: 'picture',
		index: '',
	},
	'The Mask': {
		content: '/assets/files/mask.jpg',
		type: 'picture',
		index: '',
	},
	'Feels like home': {
		content: '/assets/files/home.jpg',
		type: 'picture',
		index: '',
	},
	'Thinking of you': {
		content: '/assets/files/thinking.jpg',
		type: 'picture',
		index: '',
	},
	Family: {
		content: '/assets/files/family.jpg',
		type: 'picture',
		index: '',
	},
};

const menu = {
	blog: {
		type: 'blog',
	},
	music: {
		type: 'music',
	},
};

const combinedData: Record<string, { type: string }> = {
	...parsedMusic,
	...pictures,
	...menu,
};

function SongComponent({
	onClick,
	src,
	index,
	name,
	artist,
	link,
}: {
	onClick: () => void;
	src: string;
	index: string;
	name: string;
	artist?: string;
	link?: string;
}) {
	const [hover, setHover] = useState(false);

	return (
		<div
			className="m-1 flex cursor-pointer flex-row rounded-lg py-2 hover:bg-white/10"
			onClick={onClick}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}>
			<div
				className={cn(
					'flex w-8 shrink-0 items-center justify-end text-right text-[#A7A7A7]',
					hover && link !== undefined ? 'ml-2 mr-3' : 'mr-5',
				)}>
				{hover && link !== undefined ? (
					<Link
						onClick={(e) => {
							e.stopPropagation();
						}}
						href={link}
						target="_blank"
						className=" cursor-alias">
						<IconPlayerPlayFilled className="p-1 text-white hover:text-accent" />
					</Link>
				) : (
					index
				)}
			</div>
			<Image height={50} width={50} src={src} alt={name} className="pointer-events-none h-12 w-12 rounded shadow" />
			{artist ? (
				<div className="flex flex-col overflow-hidden pl-5">
					<p className="truncate whitespace-nowrap text-lg text-white">{name}</p>
					<p className="truncate text-sm text-[#A7A7A7]">{artist}</p>
				</div>
			) : (
				<div className="ml-5 flex items-center text-xl text-white">{name}</div>
			)}
		</div>
	);
}

function SideBarComponent({
	onClick,
	src,
	name,
	artist,
	itemKey,
}: {
	onClick: () => void;
	src: string;
	name: string;
	artist?: string;
	itemKey?: string | null;
}) {
	const searchParams = useSearchParams();
	const k = searchParams.get('k');
	return (
		<div
			className={cn(
				'm-0.5 flex cursor-pointer flex-row gap-3 rounded-md p-1.5',
				itemKey === k ? 'bg-[#232323] hover:bg-[#393838] active:bg-[#232323]' : 'bg-[#121212] hover:bg-[#1A1A1A] active:bg-[#000000]',
			)}
			onClick={onClick}>
			<Image height={50} width={50} src={src} alt={name} className="pointer-events-none h-10 w-10 rounded shadow" />
			{artist ? (
				<div className="flex flex-col overflow-hidden">
					<p className="text-md truncate whitespace-nowrap text-white">{name}</p>
					<p className="text-xs text-[#A7A7A7]">{artist}</p>
				</div>
			) : (
				<div className="text-md flex items-center text-white">{name}</div>
			)}
		</div>
	);
}

export default memo(MusicWindow);

function MusicWindow({ item, position, moveItemToLast, actions, cursorPosition }: MusicWindowProps) {
	const [windowPosition, setWindowPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: window.innerWidth * (window.innerWidth < 798 ? position.x / 3 : position.x),
		y: window.innerHeight * position.y,
	});

	const searchParams = useSearchParams();
	const router = useRouter();
	function setIsFullscreen(bool: boolean) {
		const newParams = new URLSearchParams(searchParams.toString());
		if (bool) {
			newParams.set('fs', item.var);
		} else {
			newParams.delete('fs');
		}
		router.push('?' + newParams.toString());
	}
	const isFullScreen = searchParams?.get('fs') == item.var;
	const key = searchParams.get('k');
	const state = key ? combinedData[key].type : 'blog';
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [history, setHistory] = useState([{ k: 'blog' }]);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [lightsHovered, setLightsHovered] = useState(false);

	const targetProperties = {
		x: isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x,
		y: isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y,
		height: isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.6) / 1.618),
		width: isFullScreen ? window.innerWidth * 0.9 : window.innerWidth < 768 ? window.innerWidth * 0.8 : Math.max(750, window.innerWidth * 0.6),
	};

	function setKey(key: string) {
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set('k', key);
		router.push('?' + newParams.toString());
	}

	useEffect(() => {
		const key = searchParams.get('k');
		const state = key ? combinedData[key].type : 'blog';

		if (state !== null && (currentIndex === -1 || history[currentIndex]?.k !== key)) {
			const newEntry = { k: key || '' };
			const updatedHistory = [...history.slice(0, currentIndex + 1), newEntry];
			setHistory(updatedHistory);
			setCurrentIndex(updatedHistory.length - 1);
		}
	}, [searchParams]);

	const goBack = () => {
		if (currentIndex > 1) {
			const newIndex = currentIndex - 1;
			setCurrentIndex(newIndex);
			const prevEntry = history[newIndex];
			setKey(prevEntry.k);
		}
	};

	const goForward = () => {
		if (currentIndex < history.length - 1) {
			const newIndex = currentIndex + 1;
			setCurrentIndex(newIndex);
			const nextEntry = history[newIndex];
			setKey(nextEntry.k);
		}
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (containerRef.current) {
			const { left, top, width, height } = containerRef.current.getBoundingClientRect();
			const x = (e.clientX - (left + width / 2)) / (width / 2);
			const y = -(e.clientY - (top + height / 2)) / (height / 2);

			setTilt({ x, y });
		}
	};

	useEffect(() => {
		const container = containerRef.current;

		if (container) {
			container.addEventListener('mousemove', handleMouseMove);
		}
		return () => {
			if (container) {
				container.removeEventListener('mousemove', handleMouseMove);
			}
		};
	}, []);

	return (
		<div
			className={cn(
				`absolute scroll-smooth`,
				isFullScreen ? 'fixed z-50 h-screen w-screen backdrop-blur-md' : 'pointer-events-none h-full w-full',
				notoSansSC.className,
			)}
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
				className={`pointer-events-auto flex flex-col overflow-hidden rounded-lg border border-[#666868] bg-black shadow-2xl backdrop-blur-md @container`}>
				{/* Traffic lights */}
				<div
					className="absolute z-10 mx-4 my-[18px] flex items-center rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Red */}
					<button
						className={cn(
							'flex h-3 w-3 cursor-default items-center justify-center rounded-full active:bg-[#F59689]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#DF3D35] bg-[#FE5F57]'
								: 'border-[1px] border-accent7 bg-accent',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconX className="stroke-black/50" />}
					</button>
					{/* Yellow */}
					<button
						className={cn(
							'ml-2 flex h-3 w-3 cursor-default items-center justify-center rounded-full active:bg-[#F6F069]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#DE9A10] bg-[#FCBA2B]'
								: 'border-[1px] border-[#222] bg-[#242424]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconMinus className="stroke-black/50" />}
					</button>
					{/* Green */}
					<button
						className={cn(
							'ml-2 flex h-3 w-3 cursor-default items-center justify-center rounded-full active:bg-[#73F776]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#14A620] bg-[#61C555]'
								: 'border-[1px] border-[#222] bg-[#242424]',
						)}
						onClick={() => {
							setIsFullscreen(!isFullScreen);
						}}>
						{lightsHovered && <IconExpand className="fill-black/50" />}
					</button>
				</div>
				<div className={`mx-2 mt-12 flex flex-grow gap-x-2 overflow-auto`}>
					<div className="flex w-1/4 max-w-xs shrink-0 flex-col gap-2 rounded-lg">
						<div className="flex flex-col gap-y-5 rounded-lg bg-[#121212] py-5">
							<button
								onClick={() => setKey('blog')}
								className={cn(
									'flex w-full gap-x-3 rounded-lg px-5 duration-300 hover:text-white',
									state === 'blog' ? 'text-white' : 'text-[#B3B3B3]',
								)}>
								<IconHome className={cn(state === 'blog' && 'fill-white')} />
								<span>Blog</span>
							</button>
							<button className="flex w-full gap-x-3 rounded-lg px-5 text-secondary">
								<IconSearch />
								<span>Search</span>
							</button>
						</div>

						<div className="mb-2 flex h-full flex-col rounded-lg bg-[#121212]">
							<SideBarComponent
								onClick={() => {
									setKey('music');
								}}
								src={'assets/icons/heart.jpg'}
								name="Liked Songs"
								itemKey={'music'}
								artist={`Playlist•${Object.keys(parsedMusic).length} songs`}
							/>
							{Object.entries(pictures).map(([key, item], index) => (
								<SideBarComponent
									onClick={() => {
										setKey(key);
									}}
									src={item.content}
									name={key}
									itemKey={key}
									key={key}
								/>
							))}

							{Object.entries(actions).map(([key, item]) => (
								<SideBarComponent onClick={item.onClick} src={item.iconPath} name={item.name} key={key} />
							))}
						</div>
					</div>

					<div className={`relative flex h-full w-full flex-col overflow-auto rounded-lg`} ref={containerRef}>
						<div className="sticky left-5 top-5 z-10 -m-10 flex w-fit gap-x-2">
							<button
								className={cn('rounded-full bg-black p-1', currentIndex > 1 ? 'opacity-80' : 'opacity-50')}
								onClick={() => goBack()}>
								<IconChevronLeft className="stroke-white" />
							</button>
							<button
								className={cn('rounded-full bg-black p-1', currentIndex < history.length - 1 ? 'opacity-80' : 'opacity-50')}
								onClick={() => {
									if (currentIndex < history.length - 1) {
										goForward();
									}
								}}>
								<IconChevronRight className="stroke-white" />
							</button>
						</div>

						{state === 'blog' && (
							<div className="mb-2 flex h-full grow flex-col rounded-lg bg-gradient-to-b from-secondary to-[#121212] pt-36">
								<div className="mx-10 flex flex-row">
									<Image
										height={100}
										width={100}
										src="/assets/icons/blog.png"
										alt="heart square"
										className="h-20 w-20 rounded-lg shadow-xl lg:h-36 lg:w-36"
									/>
									<div className="ml-5 flex flex-col text-white">
										<h3 className="text-sm">Blog</h3>
										<h2 className="text-2xl font-semibold md:text-4xl xl:text-6xl">Thoughts</h2>
										<div className="mt-7 flex flex-row items-center space-x-2 text-xs lg:text-sm">
											<Image height={50} width={50} src="/assets/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
											<div className="cursor-pointer hover:underline">Eric Zhu</div>
											<div className="h-1 w-1 rounded-full bg-white " />
											<p>0 posts</p>
										</div>
									</div>
								</div>
								<div className="mt-4 flex flex-grow flex-col bg-black/50 px-2 pt-10">
									<div className="grid grid-cols-2">
										<div className="mt-5 flex flex-row px-3">
											<div className="mr-5 w-8 text-right text-lg text-[#A7A7A7]">{'#'}</div>
											<div className="flex flex-col">
												<p className="text-lg text-[#A7A7A7]">{'Title'}</p>
											</div>
										</div>
										<div className="mt-5 hidden flex-row px-3 md:flex">
											<div className="mr-5 w-8 text-right text-lg text-[#A7A7A7]">{'#'}</div>
											<div className="flex flex-col">
												<p className="text-lg text-[#A7A7A7]">{'Title'}</p>
											</div>
										</div>
									</div>
									<hr className="mt-2 border-t border-white/20" />

									<div className="grid grid-cols-1 md:grid-cols-2"></div>
								</div>
							</div>
						)}

						{state === 'music' && (
							<div className="mb-2 flex h-max w-full flex-grow flex-col items-start overflow-auto rounded-lg bg-gradient-to-b from-accent to-[#121212] pt-36">
								<div
									className="pointer-events-none absolute inset-0 z-30 mb-2 rounded-lg transition duration-300"
									style={{
										background: `radial-gradient(600px at ${
											cursorPosition.x -
											(isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x) -
											Math.min(targetProperties.width / 4, 320)
										}px ${
											cursorPosition.y - (isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y) - 48
										}px, #${parseInt('638ED1', 16).toString(16).padStart(6, '0')}50, transparent 50%)`,
									}}
								/>
								<div className="mx-10 flex flex-row">
									<Image
										height={100}
										width={100}
										src="/assets/icons/heart.jpg"
										alt="heart square"
										className="h-20 w-20 rounded-lg shadow-xl lg:h-36 lg:w-36"
									/>
									<div className="ml-5 flex flex-col text-white">
										<h3 className="text-sm">Playlist</h3>
										<h2 className="text-2xl font-semibold md:text-4xl xl:text-6xl">Liked Songs</h2>
										<h3 className="mt-2 text-xs opacity-0 duration-300 hover:opacity-100 lg:text-sm">
											ずっとあなたの恋人になりたいと夢見ていて、その夢に翻弄されて苦しいんだ。
										</h3>
										<div className="flex flex-row items-center space-x-2 text-xs lg:text-sm">
											<Image height={50} width={50} src="/assets/profile.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
											<div className="cursor-pointer hover:underline">Eric Zhu</div>
											<div className="h-1 w-1 rounded-full bg-white " />
											<p>{Object.keys(parsedMusic).length} songs</p>
										</div>
									</div>
								</div>
								<div className="mt-4 flex flex-grow flex-col bg-black/50 px-2 pt-10">
									<div className="grid grid-cols-2">
										<div className="mt-5 flex flex-row px-3">
											<div className="mr-5 w-8 text-right text-lg text-[#A7A7A7]">{'#'}</div>
											<div className="flex flex-col">
												<p className="text-lg text-[#A7A7A7]">{'Title'}</p>
											</div>
										</div>
										<div className="mt-5 hidden flex-row px-3 md:flex">
											<div className="mr-5 w-8 text-right text-lg text-[#A7A7A7]">{'#'}</div>
											<div className="flex flex-col">
												<p className="text-lg text-[#A7A7A7]">{'Title'}</p>
											</div>
										</div>
									</div>
									<hr className="mt-2 border-t border-white/20" />

									<div className="grid grid-cols-1 md:grid-cols-2">
										{Object.entries(parsedMusic).map(([key, item], index) => (
											<SongComponent
												onClick={() => {
													setKey(key);
													if (containerRef.current) {
														containerRef.current.scrollTop = 0;
													}
												}}
												index={(index + 1).toString()}
												src={`/assets/music/${key}.jpg`}
												name={key}
												artist={item.artist}
												link={item.link}
												key={key}
											/>
										))}
									</div>
									<p className="mx-3 mb-6 mt-2 text-xs font-light text-white opacity-0 duration-300 hover:opacity-100 xl:text-sm">
										{
											"I've come to realize that trying to replace something significant you've lost is a fool's errand. There's nothing comparable, nothing equal. You can't get it back. All you can do is to create something to grieve, to let go of, and find separate, unique joy in something new. It won't be what it was, but it might be worth keeping."
										}
									</p>
								</div>
							</div>
						)}

						{state === 'song' && (
							<div
								className={cn('flex w-full flex-grow items-start overflow-auto', parsedMusic[key as keyof typeof parsedMusic].color)}>
								<div
									className="pointer-events-none absolute inset-0 z-30 transition duration-300"
									style={{
										background: `radial-gradient(600px at ${
											cursorPosition.x -
											(isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x) -
											Math.min(targetProperties.width / 4, 320)
										}px ${
											cursorPosition.y - (isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y) - 48
										}px, #${parseInt('638ED1', 16).toString(16).padStart(6, '0')}50, transparent 50%)`,
									}}
								/>
								<span
									className={`pointer-events-auto mx-auto flex w-2/3 max-w-2xl whitespace-pre-wrap pb-6 pt-24 text-xl font-semibold text-white md:text-2xl`}>
									{parsedMusic[key as keyof typeof parsedMusic].content}
								</span>
							</div>
						)}

						{state === 'picture' && (
							<div className={`flex h-full w-full flex-grow items-center justify-center`}>
								<Image
									src={pictures[key as keyof typeof pictures].content}
									alt="image"
									className="w-5/12 shadow-lg drop-shadow-glowwhite "
									width={100}
									height={100}
									style={{
										transform: `perspective(1000px) rotateY(${tilt.x * 15}deg) rotateX(${tilt.y * 15}deg)`,
										transition: 'transform 0.1s',
									}}
								/>
							</div>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
}

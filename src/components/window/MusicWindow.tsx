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
			className="flex flex-row py-2 hover:bg-white/10 rounded-lg m-1 cursor-pointer"
			onClick={onClick}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}>
			<div
				className={`${
					hover && link !== undefined ? 'mr-3 ml-2' : 'mr-5'
				} text-[#A7A7A7] w-8 text-right flex items-center justify-end shrink-0`}>
				{hover && link !== undefined ? (
					<Link
						onClick={(e) => {
							e.stopPropagation();
						}}
						href={link}
						target="_blank"
						className=' cursor-alias'>
						<IconPlayerPlayFilled className="text-white hover:text-accent p-1" />
					</Link>
				) : (
					index
				)}
			</div>
			<Image height={50} width={50} src={src} alt={name} className="rounded shadow h-12 w-12 pointer-events-none" />
			{artist ? (
				<div className="flex flex-col pl-5 overflow-hidden">
					<p className="text-lg text-white whitespace-nowrap truncate">{name}</p>
					<p className="text-sm text-[#A7A7A7] truncate">{artist}</p>
				</div>
			) : (
				<div className="flex items-center text-xl text-white ml-5">{name}</div>
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
			className={`flex flex-row p-1.5 rounded-md m-0.5 cursor-pointer gap-3 ${itemKey === k ? 'bg-[#232323] hover:bg-[#393838] active:bg-[#232323]' : 'bg-[#121212] hover:bg-[#1A1A1A] active:bg-[#000000]'}`}
			onClick={onClick}>
			<Image height={50} width={50} src={src} alt={name} className="rounded shadow h-10 w-10 pointer-events-none" />
			{artist ? (
				<div className="flex flex-col overflow-hidden">
					<p className="text-md text-white whitespace-nowrap truncate">{name}</p>
					<p className="text-xs text-[#A7A7A7]">{artist}</p>
				</div>
			) : (
				<div className="flex items-center text-md text-white">{name}</div>
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
		if (currentIndex > 0) {
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
			className={`absolute ${
				isFullScreen ? 'fixed w-screen h-screen z-50 backdrop-blur-md' : 'h-full w-full pointer-events-none'
			} ${notoSansSC.className} scroll-smooth`}
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
				transition={{ stiffness: 100, transition: 0.5 }}
				className={`bg-black pointer-events-auto backdrop-blur-md rounded-lg shadow-2xl shadow-black border-[#666868] border flex flex-col overflow-hidden @container`}>
				{/* Traffic lights */}
				<div
					className="absolute flex items-center mx-4 z-10 my-[18px] rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Red */}
					<div
						className={`${
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FE5F57]' : 'bg-accent'
						} rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]`}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconX className="stroke-black/50" />}
					</div>
					{/* Yellow */}
					<div
						className={`${
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FCBA2B]' : 'bg-slate-500/40'
						} rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2`}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconMinus className="stroke-black/50" />}
					</div>
					{/* Green */}
					<div
						className={`${
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#61C555]' : 'bg-slate-500/40'
						} rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2`}
						onClick={() => {
							setIsFullscreen(!isFullScreen);
						}}>
						{lightsHovered && (
							<svg
								className="fill-black/50"
								fill-rule="evenodd"
								stroke-linejoin="round"
								stroke-miterlimit="2"
								clip-rule="evenodd"
								viewBox="0 0 13 13">
								<path d="M4.871 3.553 9.37 8.098V3.553H4.871zm3.134 5.769L3.506 4.777v4.545h4.499z" />
								<circle cx="6.438" cy="6.438" r="6.438" fill="none" />
							</svg>
						)}
					</div>
				</div>
				<div className={`flex mt-12 mx-2 gap-x-2 flex-grow overflow-auto`}>
					<div className="w-1/4 max-w-xs shrink-0 gap-2 flex flex-col rounded-lg">
						<div className="bg-[#121212] py-5 gap-y-5 flex flex-col rounded-lg">
							<button
								onClick={() => setKey('blog')}
								className={`hover:text-white duration-300 ${state === 'blog' ? 'text-white' : 'text-[#B3B3B3]'} flex px-5 w-full rounded-lg gap-x-3`}>
								<IconHome className={`${state === 'blog' && 'fill-white'}`} />
								<span>Blog</span>
							</button>
							<button className="text-secondary flex px-5 w-full rounded-lg gap-x-3">
								<IconSearch />
								<span>Search</span>
							</button>
						</div>

						<div className="bg-[#121212] flex flex-col h-full">
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

					<div className={`h-full rounded-lg overflow-auto relative flex flex-col w-full`} ref={containerRef}>
						<div className="sticky top-5 left-5 -m-10 flex gap-x-2 z-10 w-fit">
							<button
								className={`bg-black ${currentIndex > 0 ? 'opacity-80' : 'opacity-50'} rounded-full p-1`}
								onClick={() => goBack()}>
								<IconChevronLeft className="stroke-white" />
							</button>
							<button
								className={`bg-black ${currentIndex < history.length - 1 ? 'opacity-80' : 'opacity-50'} rounded-full p-1`}
								onClick={() => {
									if (currentIndex < history.length - 1) {
										goForward();
									}
								}}>
								<IconChevronRight className="stroke-white" />
							</button>
						</div>

						{state === 'blog' && (
							<div className="bg-gradient-to-b from-secondary to-[#121212] pt-36 h-full flex flex-col">
								<div className="flex flex-row mx-10">
									<Image
										height={100}
										width={100}
										src="/assets/icons/blog.png"
										alt="heart square"
										className="rounded-lg shadow-xl h-20 w-20 lg:h-36 lg:w-36"
									/>
									<div className="flex flex-col ml-5 text-white">
										<h3 className="text-sm">Blog</h3>
										<h2 className="text-2xl md:text-4xl xl:text-6xl font-semibold">Thoughts</h2>
										<div className="flex flex-row items-center space-x-2 text-xs lg:text-sm mt-7">
											<Image height={50} width={50} src="/assets/profile.jpg" alt="Profile" className="rounded-full h-8 w-8" />
											<div className="hover:underline cursor-pointer">Eric Zhu</div>
											<div className="w-1 h-1 rounded-full bg-white " />
											<p>0 posts</p>
										</div>
									</div>
								</div>
								<div className="bg-black/50 pt-10 mt-4 px-2 flex-grow flex flex-col">
									<div className="grid grid-cols-2">
										<div className="flex flex-row mt-5 px-3">
											<div className="text-lg mr-5 w-8 text-right text-[#A7A7A7]">{'#'}</div>
											<div className="flex flex-col">
												<p className="text-lg text-[#A7A7A7]">{'Title'}</p>
											</div>
										</div>
										<div className="flex flex-row mt-5 px-3 hidden md:flex">
											<div className="text-lg mr-5 w-8 text-right text-[#A7A7A7]">{'#'}</div>
											<div className="flex flex-col">
												<p className="text-lg text-[#A7A7A7]">{'Title'}</p>
											</div>
										</div>
									</div>
									<hr className="border-t border-white/20 mt-2" />

									<div className="grid grid-cols-1 md:grid-cols-2"></div>
								</div>
							</div>
						)}

						{state === 'music' && (
							<div className="bg-gradient-to-b from-accent to-[#121212] pt-36 h-max flex flex-col flex-grow w-full flex items-start overflow-auto">
								<div
									className="pointer-events-none fixed inset-0 z-30 transition duration-300 absolute"
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
								<div className="flex flex-row mx-10">
									<Image
										height={100}
										width={100}
										src="/assets/icons/heart.jpg"
										alt="heart square"
										className="rounded-lg shadow-xl h-20 w-20 lg:h-36 lg:w-36"
									/>
									<div className="flex flex-col ml-5 text-white">
										<h3 className="text-sm">Playlist</h3>
										<h2 className="text-2xl md:text-4xl xl:text-6xl font-semibold">Liked Songs</h2>
										<h3 className="mt-2 text-xs lg:text-sm opacity-0 hover:opacity-100 duration-300">
											ずっとあなたの恋人になりたいと夢見ていて、その夢に翻弄されて苦しいんだ。
										</h3>
										<div className="flex flex-row items-center space-x-2 text-xs lg:text-sm">
											<Image height={50} width={50} src="/assets/profile.jpg" alt="Profile" className="rounded-full h-8 w-8" />
											<div className="hover:underline cursor-pointer">Eric Zhu</div>
											<div className="w-1 h-1 rounded-full bg-white " />
											<p>{Object.keys(parsedMusic).length} songs</p>
										</div>
									</div>
								</div>
								<div className="bg-black/50 pt-10 mt-4 px-2 flex-grow flex flex-col">
									<div className="grid grid-cols-2">
										<div className="flex flex-row mt-5 px-3">
											<div className="text-lg mr-5 w-8 text-right text-[#A7A7A7]">{'#'}</div>
											<div className="flex flex-col">
												<p className="text-lg text-[#A7A7A7]">{'Title'}</p>
											</div>
										</div>
										<div className="flex flex-row mt-5 px-3 hidden md:flex">
											<div className="text-lg mr-5 w-8 text-right text-[#A7A7A7]">{'#'}</div>
											<div className="flex flex-col">
												<p className="text-lg text-[#A7A7A7]">{'Title'}</p>
											</div>
										</div>
									</div>
									<hr className="border-t border-white/20 mt-2" />

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
									<p className="mx-3 mb-6 opacity-0 hover:opacity-100 duration-300 text-white text-xs xl:text-sm font-light mt-2">
										{
											"I've come to realize that trying to replace something significant you've lost is a fool's errand. There's nothing comparable, nothing equal. You can't get it back. All you can do is to create something to grieve, to let go of, and find separate, unique joy in something new. It won't be what it was, but it might be worth keeping."
										}
									</p>
								</div>
							</div>
						)}

						{state === 'song' && (
							<div className={`${parsedMusic[key as keyof typeof parsedMusic].color} w-full flex items-start flex-grow overflow-auto`}>
								<div
									className="pointer-events-none fixed inset-0 z-30 transition duration-300 absolute"
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
									className={`flex pt-24 pb-6 w-2/3 max-w-2xl font-semibold mx-auto text-white text-xl md:text-2xl whitespace-pre-wrap pointer-events-auto`}>
									{parsedMusic[key as keyof typeof parsedMusic].content}
								</span>
							</div>
						)}

						{state === 'picture' && (
							<div className={`flex h-full items-center justify-center w-full flex-grow`}>
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

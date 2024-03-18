import { windowProps } from '@/components/types';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PLAYER } from '@/components/data/player';
import { motion } from 'framer-motion';
import { robotoMono, jetBrainsMono } from '@/components/Fonts';
import { IconX, IconPlayerPauseFilled, IconPlayerPlayFilled, IconPlayerTrackNextFilled, IconPlayerTrackPrevFilled } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

export type Track = {
	name: string;
	src: string;
};

export default function PlayerWindow({ item, position, moveItemToLast }: windowProps) {
	const [windowPosition, setWindowPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: window.innerWidth * (window.innerWidth < 798 ? position.x / 3 : position.x),
		y: window.innerHeight * position.y,
	});
	const [lightsHovered, setLightsHovered] = useState(false);
	const [currentTrack, setCurrentTrack] = useState<Track>(PLAYER[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	const targetProperties = {
		x: windowPosition.x,
		y: windowPosition.y,
		height: Math.max(500, window.innerWidth * 0.32),
		width: Math.max(350, window.innerWidth * 0.24),
	};

	function playPause() {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	}

	function nextTrack() {
		setHasLoaded(false);
		const index = PLAYER.indexOf(currentTrack);
		const nextIndex = (index + 1) % PLAYER.length;
		setCurrentTrack(PLAYER[nextIndex]);
	}

	function prevTrack() {
		if (audioRef.current && audioRef.current.currentTime > 5) {
			audioRef.current.currentTime = 0;
		} else {
			setHasLoaded(false);
			const index = PLAYER.indexOf(currentTrack);
			const prevIndex = (index - 1 + PLAYER.length) % PLAYER.length;
			setCurrentTrack(PLAYER[prevIndex]);
		}
	}

	useEffect(() => {
		if (!audioRef.current) return;
		audioRef.current.onended = () => {
			nextTrack();
			setTimeout(() => {
				if (audioRef.current) {
					audioRef.current.play();
					setIsPlaying(true);
				}
			}, 50);
		};
		if (isPlaying) {
			audioRef.current.play();
		}
	}, [currentTrack]);

	function formatTime(time: number) {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	return (
		<div
			className={cn('pointer-events-none absolute h-full w-full scroll-smooth', jetBrainsMono.className)}
			style={{ zIndex: position.z.indexOf(item.var) + 10 }}>
			<motion.div
				initial={targetProperties}
				animate={targetProperties}
				drag
				onTapStart={() => moveItemToLast(item.var)}
				onDragEnd={(e, info) =>
					setWindowPosition({
						x: info.offset.x + windowPosition.x,
						y: info.offset.y + windowPosition.y,
					})
				}
				dragMomentum={false}
				transition={{ stiffness: 100, transition: 0.5 }}
				className={`pointer-events-auto relative mx-4 my-8 flex flex-col items-center justify-center overflow-hidden @container`}>
				<div className="relative z-20 -mt-8 flex w-full items-center justify-center">
					{PLAYER.map((track, i) => (
						<Image
							key={currentTrack.src}
							src={`/assets/player/${track.src}.webp`}
							alt={track.name}
							width={300}
							height={300}
							className={cn(
								'pointer-events-none absolute z-10 mx-auto aspect-square h-auto w-[90%] animate-spin-slow rounded-full border-2 object-cover ring-2 ring-black',
								track.src == currentTrack.src ? 'visible' : 'invisible',
							)}
							style={{
								animationPlayState: isPlaying && hasLoaded ? 'running' : 'paused',
							}}
						/>
					))}
					<div className="absolute inset-0 z-10 flex items-center justify-center">
						<div className="h-16 w-16 rounded-full border border-black bg-white ring-4 ring-white"></div>
					</div>
				</div>
				<div className="absolute mx-auto flex h-full w-[70%] max-w-xl flex-col items-center border border-black bg-white p-4 shadow-2xl">
					{/* Traffic lights */}
					<div
						className="absolute left-5 top-0 z-20 my-[18px] flex items-center"
						onMouseEnter={() => setLightsHovered(true)}
						onMouseLeave={() => setLightsHovered(false)}>
						{/* Red */}
						<button
							className={cn(
								'flex h-3 w-3 cursor-default items-center justify-center border border-black active:bg-[#F59689]',
								position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FE5F57]' : '',
							)}
							onClick={() => item.closeWindow!()}>
							{lightsHovered && <IconX className="stroke-black/50" />}
						</button>
					</div>
					<h2 className="whitespace-nowrap pt-4 text-lg font-bold lg:text-xl">{currentTrack.name}</h2>
					<audio
						ref={audioRef}
						src={`/assets/player/${currentTrack.src}.mp3`}
						onCanPlay={() => setHasLoaded(true)}
						onEnded={() => setIsPlaying(false)}
						onPause={() => setIsPlaying(false)}
						onPlay={() => setIsPlaying(true)}
					/>
					<div className="absolute bottom-5 w-fit space-y-2">
						<div className="relative flex items-center justify-center">
							<span className="mr-2">
								{audioRef.current && !isNaN(audioRef.current.currentTime) ? formatTime(audioRef.current.currentTime) : '00:00'}
								{' / '}
								{audioRef.current && !isNaN(audioRef.current.duration) ? formatTime(audioRef.current.duration) : '00:00'}
							</span>
						</div>
						<div className="divide-x divide-black rounded-md border border-black text-black">
							<button onClick={prevTrack} className="px-4 py-2">
								<IconPlayerTrackPrevFilled className="w-5" />
							</button>
							<button onClick={playPause} className="px-4 py-2">
								{isPlaying ? <IconPlayerPauseFilled className="w-5" /> : <IconPlayerPlayFilled className="w-5" />}
							</button>
							<button onClick={nextTrack} className="px-4 py-2">
								<IconPlayerTrackNextFilled className="w-5" />
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

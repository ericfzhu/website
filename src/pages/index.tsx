import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import Head from 'next/head';
import { useScramble } from 'use-scramble';
import { useGlitch } from 'react-powerglitch';
import { motion } from 'framer-motion';
import { animateScroll as scroll } from 'react-scroll';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { fontClassNames, courierPrime } from '@/components/Fonts';
import { itemsConfigProps } from '@/components/types';
import { FinderWindow, LibraryWindow, PlayerWindow, MusicWindow, WorksWindow } from '@/components/window';
import { Icon, MultiIcon } from '@/components/desktop';
import wip from '@/components/data/wip.json';
import { cn } from '@/lib/utils';

function randomize(num: number) {
	const random = Math.random() * 0.03;
	const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	return num + random * plusOrMinus;
}

export default function HomePage() {
	// time
	const currentYear = dayjs().year();
	const origin1006 = dayjs('2020-10-06');
	const origin1108 = dayjs('2023-11-08');
	const isJune18 = dayjs().format('MM-DD') === '06-18';
	const [time, setTime] = useState<dayjs.Dayjs | null>(null);
	const [showDisplay, setShowDisplay] = useState<'time' | '1006' | '1108'>('time');
	const [time1006, setTime1006] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});
	const [time1108, setTime1108] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	// Window management
	const searchParams = useSearchParams();
	const router = useRouter();
	function setWindow(name: string, bool: boolean) {
		const newParams = new URLSearchParams(searchParams.toString());
		const currentWindows = searchParams.get('windows');

		if (bool) {
			addWindowToParams(newParams, currentWindows, name);
		} else {
			removeWindowFromParams(newParams, currentWindows, name);
		}

		updateUrlParams(newParams);
	}

	function addWindowToParams(params: URLSearchParams, currentWindows: string | null, name: string) {
		const windowsArray = currentWindows ? currentWindows.split(';') : [];

		if (name === 'inspo' && !windowsArray.includes('inspo')) {
			params.set('inspo', '0');
		}
		if (windowsArray.includes(name)) {
			const index = windowsArray.indexOf(name);
			windowsArray.splice(index, 1);
		}
		windowsArray.push(name);
		params.set('windows', windowsArray.join(';'));
	}

	function removeWindowFromParams(params: URLSearchParams, currentWindows: string | null, name: string) {
		const windowsArray = currentWindows ? currentWindows.split(';') : [];
		const index = windowsArray.indexOf(name);

		if (index > -1) {
			windowsArray.splice(index, 1);
		}

		if (windowsArray.length > 0) {
			params.set('windows', windowsArray.join(';'));
		} else {
			params.delete('windows');
		}

		if (name === itemsConfig.library.var) {
			params.delete('lang');
			params.delete('tab');
			params.delete('author');
			params.delete('book');
			params.delete('reflections');
		} else if (name === itemsConfig.music.var) {
			params.delete('k');
		} else if (name === itemsConfig.drafts.var) {
			params.delete(itemsConfig.drafts.var);
		}

		if (params.get('fs') === name) {
			params.delete('fs');
		}
	}

	function updateUrlParams(params: URLSearchParams) {
		if (params.toString()) {
			router.push(`?${params.toString()}`);
		} else {
			router.push('/');
		}
	}

	function openWindow(variable: string) {
		setWindow(variable, true);
		moveItemToLast(variable, desktopWindows, setDesktopWindows);
	}
	function showWindow(name: string) {
		const currentWindows = searchParams.get('windows');
		const windowsArray = currentWindows ? currentWindows.split(';') : [];
		return windowsArray.includes(name);
	}
	const itemsConfig: itemsConfigProps = {
		music: {
			name: 'Writing',
			hoverName: 'Not Spotify',
			var: 'blog',
			icon: {
				src: '/assets/icons/spotify.webp',
				showName: true,
				column: 2,
				handleDoubleClick: () => {
					openWindow('blog');
				},
			},
			hasWindow: true,
			closeWindow: () => {
				setWindow('blog', false);
			},
		},
		works: {
			name: 'Works',
			var: 'works',
			icon: {
				src: '/assets/icons/aphrodite.webp',
				showName: true,
				handleDoubleClick: () => {
					openWindow('works');
				},
			},
			hasWindow: true,
			closeWindow: () => {
				setWindow('works', false);
			},
		},
		drafts: {
			name: 'Inspirations',
			var: 'inspo',
			icon: {
				src: '/assets/icons/folder.webp',
				showName: true,
				handleDoubleClick: () => {
					openWindow('inspo');
				},
			},
			hasWindow: true,
			closeWindow: () => {
				setWindow('inspo', false);
			},
		},
		library: {
			name: 'Literature',
			hoverName: 'ESSENCE',
			var: 'library',
			icon: {
				src: '/assets/icons/ESSENCE.png',
				showName: true,
				handleDoubleClick: () => {
					openWindow('library');
				},
			},
			hasWindow: true,
			closeWindow: () => {
				setWindow('library', false);
			},
		},
		player: {
			name: '나히 FM',
			var: 'player',
			icon: {
				src: '/assets/icons/icantlove.webp',
				showName: true,
				column: 2,
				handleDoubleClick: () => {
					openWindow('player');
				},
			},
			hasWindow: true,
			closeWindow: () => {
				setWindow('player', false);
			},
		},
		exit: {
			name: 'Exit',
			var: 'exit',
			icon: {
				src: '/assets/icons/exit.webp',
				className: 'drop-shadow-glow',
				showName: false,
				handleDoubleClick: () => enableScrollAndScrollToSecondDiv(),
			},
		},
	};

	// Desktop
	const [currentNameFont, setCurrentNameFont] = useState(Math.floor(Math.random() * fontClassNames.length));
	const [nameHover, setNameHover] = useState(false);
	const desktopRef = useRef<HTMLDivElement>(null);

	// Screensaver
	const [showScreensaver, setShowScreensaver] = useState(true);
	const [indicator, setIndicator] = useState(false);
	const [entryAnimationFinished, setEntryAnimationFinished] = useState(false);

	// Elevator
	const [showExit, setShowExit] = useState(false);
	const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
	const [elevatorText, setElevatorText] = useState<string>('"ELEVATOR"');
	let audio: HTMLAudioElement;
	if (typeof window !== 'undefined') {
		audio = new Audio('/assets/sounds/elevator.mp3');
	}

	// Z index management
	const [desktopIcons, setDesktopIcons] = useState<string[]>([...Object.keys(itemsConfig).map((key) => itemsConfig[key].var), 'desktop']);
	const [desktopWindows, setDesktopWindows] = useState<string[]>([
		...Object.keys(itemsConfig)
			.filter((key) => itemsConfig[key].hasWindow)
			.map((key) => itemsConfig[key].var),
	]);
	function moveItemToLast(itemName: string, itemsArray: string[], setItemsArray: (newArray: string[]) => void) {
		const newArr = [...itemsArray];
		const index = newArr.indexOf(itemName);
		if (index > -1) {
			newArr.splice(index, 1);
			newArr.push(itemName);
			setItemsArray(newArr);
		}
	}

	// Animations
	const glitch = useGlitch({
		playMode: 'always',
		hideOverflow: false,
		timing: { duration: 4000, iterations: Infinity },
		glitchTimeSpan: { start: 0.9, end: 1 },
		shake: { amplitudeX: 0.05, amplitudeY: 0.2, velocity: 15 },
		pulse: false,
		slice: {
			count: 6,
			velocity: 15,
			minHeight: 0.02,
			maxHeight: 0.15,
			hueRotate: true,
		},
	});

	const { ref: entryTextRef } = useScramble({
		text: 'Click anywhere or press enter to continue',
		speed: 0.5,
		tick: 1,
		overflow: false,
		chance: 0.75,
		overdrive: false,
		onAnimationEnd: () => {
			setEntryAnimationFinished(true);
		},
	});

	const { ref: copyrightRef, replay: copyrightReplay } = useScramble({
		text: `&copy; ${currentYear}. All rights reserved.`,
		speed: 1,
		tick: 1,
		playOnMount: true,
		chance: 0.8,
		overdrive: false,
	});

	const { ref: elevatorRef } = useScramble({
		text: elevatorText,
		speed: 0.1,
		tick: 1,
		playOnMount: true,
		chance: 0.8,
		overdrive: false,
	});

	const musicActions = [
		{
			name: '10.06',
			iconPath: '/assets/files/1006.png',
			index: '',
			onClick: () => {
				if (showDisplay !== '1006') {
					setShowDisplay('1006');
				} else {
					setShowDisplay('time');
				}
			},
		},
		{
			name: '11.08',
			iconPath: '/assets/files/1108.png',
			index: '',
			onClick: () => {
				if (showDisplay !== '1108') {
					setShowDisplay('1108');
				} else {
					setShowDisplay('time');
				}
			},
		},
	];

	function enableScrollAndScrollToSecondDiv() {
		if (!scrollEnabled) {
			audio.play();
			setScrollEnabled(true);
			scroll.scrollToBottom({
				duration: 2000,
				smooth: 'easeInOutQuint',
				delay: 1000,
			});
		} else {
			scroll.scrollToBottom({ duration: 2000, smooth: 'easeInOutQuint' });
		}
	}

	function elevator() {
		setElevatorText('"PORTAL"');
	}

	useEffect(() => {
		function updateClock() {
			const currentTime = dayjs();
			const updateTimeSinceOrigin = (origin: dayjs.Dayjs) => {
				const timeSinceOrigin = Math.floor((currentTime.valueOf() - origin.valueOf()) / 1000);
				const days = Math.floor(timeSinceOrigin / (3600 * 24));
				const hours = Math.floor((timeSinceOrigin % (3600 * 24)) / 3600);
				const minutes = Math.floor((timeSinceOrigin % 3600) / 60);
				const seconds = timeSinceOrigin % 60;
				return { days, hours, minutes, seconds };
			};
			setTime1006(updateTimeSinceOrigin(origin1006));
			setTime1108(updateTimeSinceOrigin(origin1108));
			setTime(dayjs());
		}
		updateClock();

		const timer = setInterval(updateClock, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		if (searchParams?.toString()) {
			const windows = searchParams.get('windows');
			if (windows) {
				const windowsArray = windows.split(';');
				const lastWindow = windowsArray[windowsArray.length - 1];
				moveItemToLast(lastWindow, desktopWindows, setDesktopWindows);
			}
		}
	}, [searchParams]);

	useEffect(() => {
		const handleEvent = (event: MouseEvent | KeyboardEvent) => {
			if (event.type === 'click' || (event.type === 'keydown' && (event as KeyboardEvent).key === 'Enter')) {
				setShowScreensaver(false);
				glitch.setOptions({ html: '' });
				glitch.stopGlitch();
			}
		};

		if (showScreensaver) {
			window.addEventListener('click', handleEvent);
			window.addEventListener('keydown', handleEvent);
		}

		return () => {
			window.removeEventListener('click', handleEvent);
			window.removeEventListener('keydown', handleEvent);
		};
	}, [showScreensaver]);

	useEffect(() => {
		if (nameHover) {
			const interval = setInterval(() => {
				setCurrentNameFont((prevIndex) => (prevIndex + 1) % fontClassNames.length);
			}, 300);
			return () => clearInterval(interval);
		}
	}, [nameHover]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (entryAnimationFinished) {
				setIndicator((prevIndicator) => !prevIndicator);
			}
		}, 750);
		return () => clearInterval(interval);
	}, [entryAnimationFinished]);

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
		<motion.div className={cn('relative select-none overflow-hidden', scrollEnabled ? '' : 'h-screen', courierPrime.className)}>
			<Head>
				<title>Eric Zhu "WEBSITE"</title>
				<meta property={'og:title'} content={'Eric Zhu "WEBSITE"'} key="title" />
				<meta name="viewport" content="width=device-width" key="title" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="A canvas where code is the paintbrush" />

				<meta property="og:url" content="http://ericfzhu.com/" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="https://www.ericfzhu.com/assets/files/projects/website/1.jpg" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="ericfzhu.com" />
				<meta property="twitter:url" content="http://ericfzhu.com/" />
				<meta name="twitter:title" content={'Eric Zhu "WEBSITE"'} />
				<meta name="twitter:image" content="https://www.ericfzhu.com/assets/files/projects/website/1.jpg" />
			</Head>

			{/* Desktop */}
			<div
				className={`relative z-10 h-screen w-[100lvw] select-none overflow-hidden`}
				onClick={() => moveItemToLast('desktop', desktopIcons, setDesktopIcons)}
				ref={desktopRef}>
				{/* Screensaver */}
				<Image
					src="/assets/wallpaper.webp"
					alt=""
					priority
					width={1920}
					height={1080}
					className={cn(
						'pointer-events-none absolute left-1/2 top-1/2 h-screen w-full -translate-x-1/2 -translate-y-1/2 transform object-cover',
						showScreensaver ? 'z-30' : '-z-20',
					)}
				/>

				{/* Screensaver time */}
				<div
					className={cn(
						'absolute left-1/2 top-[15%] -translate-x-1/2 transform text-center text-slate-100 duration-500',
						showScreensaver ? 'z-30 opacity-100' : 'invisible -z-20 opacity-0',
					)}>
					<h1 className="text-sm sm:text-base md:text-xl lg:text-2xl ">{time ? time.format('dddd, DD MMMM') : ''}</h1>
					<h2 className="text-6xl font-bold sm:text-7xl md:text-8xl lg:text-9xl ">{time ? time.format('h:mm') : ''}</h2>
				</div>

				{!entryAnimationFinished ? (
					<div
						className={cn(
							'absolute bottom-1/4 flex w-full items-center justify-center px-2 text-center text-sm text-white/80 duration-500 lg:text-xl',
							showScreensaver ? 'z-30 opacity-100' : 'invisible -z-20 opacity-0',
						)}>
						<h2 className={`space-x-3 px-2 text-center text-sm duration-500 lg:text-xl`} ref={entryTextRef}></h2>

						<div id="indicator" className={cn('z-30 h-4 w-2 bg-slate-100/50 md:h-5 md:w-2.5', indicator ? 'opacity-100' : 'opacity-0')} />
					</div>
				) : (
					<div
						className={cn(
							'absolute bottom-1/4 flex w-full items-center justify-center px-2 text-center text-sm text-white/80 duration-500 lg:text-xl',
							showScreensaver ? 'z-30 opacity-100' : 'invisible -z-20 opacity-0',
						)}
						ref={glitch.ref}>
						<h2 className={`space-x-3 px-2 text-center text-sm duration-500 lg:text-xl`}>Click anywhere or press enter to continue</h2>

						<div id="indicator" className={cn('z-30 h-4 w-2 bg-white/80 md:h-5 md:w-2.5', indicator ? 'opacity-100' : 'opacity-0')} />
					</div>
				)}

				{/* Name */}
				<div
					className={cn(
						'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform space-y-5 p-5 text-center transition-all delay-500',
						showScreensaver ? 'invisible' : 'visible',
					)}>
					{!showScreensaver && (
						<>
							<h1
								className={cn('whitespace-nowrap text-5xl text-white md:text-7xl', fontClassNames[currentNameFont])}
								onMouseEnter={() => setNameHover(true)}
								onMouseLeave={() => setNameHover(false)}>
								Eric Zhu
							</h1>
							<p className="whitespace-nowrap text-lg text-white md:text-2xl" ref={copyrightRef} onMouseOver={copyrightReplay} />
						</>
					)}
				</div>

				{/* Time */}
				<div
					className={cn(
						'absolute left-2 top-2 flex flex-col items-end space-y-5 rounded text-4xl text-white transition-all md:text-6xl lg:left-7 lg:top-7',
						courierPrime.className,
						showScreensaver ? 'invisible' : 'visible delay-500',
					)}>
					<motion.button
						onClick={() => {
							setShowExit(!showExit);
						}}
						drag
						dragMomentum={false}
						className={`h-full w-full rounded bg-black p-1 delay-0 md:p-2`}>
						{showDisplay === '1006' && (
							<div className="px-2">
								{isJune18
									? 'happy birthday'
									: `${time1006.days.toString().padStart(2, '0')}:${time1006.hours.toString().padStart(2, '0')}:${time1006.minutes
											.toString()
											.padStart(2, '0')}:${time1006.seconds.toString().padStart(2, '0')}`}
							</div>
						)}
						{showDisplay === '1108' && (
							<div className="px-2">
								{`${time1108.days.toString().padStart(2, '0')}:${time1108.hours.toString().padStart(2, '0')}:${time1108.minutes
									.toString()
									.padStart(2, '0')}:${time1108.seconds.toString().padStart(2, '0')}`}
							</div>
						)}
						{showDisplay === 'time' && time && <div className="px-2">{time.format('HH:mm:ss')}</div>}
						{showDisplay === 'time' && !time && <div>Loading...</div>}
					</motion.button>
				</div>

				{/* Desktop Icons */}
				<div className={cn('delay-500', showScreensaver ? 'invisible' : 'visible')} onClick={(e) => e.stopPropagation()}>
					<div className="pointer-events-none absolute right-2 top-2 grid w-fit grid-cols-2 lg:right-7 lg:top-7 xl:gap-10">
						<div className="grid h-fit gap-4 xl:gap-10">
							{Object.keys(itemsConfig)
								.filter((key) => itemsConfig[key].icon && itemsConfig[key].icon.column === 1)
								.map((key) => {
									const item = itemsConfig[key];
									return (
										<Icon
											key={key}
											item={item}
											zPosition={desktopIcons}
											moveItemToLast={(itemname: string) => moveItemToLast(itemname, desktopIcons, setDesktopIcons)}
										/>
									);
								})}
						</div>
						<div className="grid grid-flow-row gap-4 xl:gap-10">
							<MultiIcon
								item={itemsConfig.library}
								zPosition={desktopIcons}
								src={{
									open: '/assets/icons/ESSENCE2.webp',
									closed: '/assets/icons/ESSENCE.webp',
								}}
								moveItemToLast={(itemname: string) => moveItemToLast(itemname, desktopIcons, setDesktopIcons)}
							/>
							{Object.keys(itemsConfig)
								.filter((key) => itemsConfig[key].icon && itemsConfig[key].icon.column === 2)
								.map((key) => {
									const item = itemsConfig[key];
									return (
										<Icon
											key={key}
											item={item}
											zPosition={desktopIcons}
											moveItemToLast={(itemname: string) => moveItemToLast(itemname, desktopIcons, setDesktopIcons)}
											rounded={false}
										/>
									);
								})}
						</div>
					</div>

					<div className={cn('absolute left-[15%] top-[20%]', showExit ? 'visible' : 'invisible')}>
						<Icon
							item={itemsConfig.exit}
							zPosition={desktopIcons}
							moveItemToLast={(itemname: string) => moveItemToLast(itemname, desktopIcons, setDesktopIcons)}
						/>
					</div>

					<div className={`absolute left-[75%] top-[75%]`}>
						<Icon
							item={itemsConfig.drafts}
							zPosition={desktopIcons}
							moveItemToLast={(itemname: string) => moveItemToLast(itemname, desktopIcons, setDesktopIcons)}
						/>
					</div>

					<div className={`absolute left-[12%] top-[30%]`}>
						<Icon
							item={itemsConfig.works}
							zPosition={desktopIcons}
							moveItemToLast={(itemname: string) => moveItemToLast(itemname, desktopIcons, setDesktopIcons)}
						/>
					</div>
				</div>

				<div
					onClick={showScreensaver ? undefined : (e) => e.stopPropagation()}
					className={cn('absolute top-0 delay-500', showScreensaver ? 'invisible opacity-0' : 'visible opacity-100')}>
					{showWindow(itemsConfig.music.var) && (
						<MusicWindow
							item={itemsConfig.music}
							position={{
								x: randomize(0.3),
								y: randomize(0.2),
								z: desktopWindows,
							}}
							moveItemToLast={(itemname: string) => openWindow(itemname)}
							actions={musicActions}
							cursorPosition={cursorPosition}
						/>
					)}
					{showWindow(itemsConfig.drafts.var) && (
						<FinderWindow
							item={itemsConfig.drafts}
							position={{
								x: randomize(0.2),
								y: randomize(0.1),
								z: desktopWindows,
							}}
							files={wip}
							moveItemToLast={(itemname: string) => openWindow(itemname)}
						/>
					)}
					{showWindow(itemsConfig.player.var) && (
						<PlayerWindow
							item={itemsConfig.player}
							position={{
								x: randomize(0.12),
								y: randomize(0.21),
								z: desktopWindows,
							}}
							moveItemToLast={(itemname: string) => openWindow(itemname)}
						/>
					)}
					{showWindow(itemsConfig.library.var) && (
						<LibraryWindow
							item={itemsConfig.library}
							position={{
								x: randomize(0.12),
								y: randomize(0.21),
								z: desktopWindows,
							}}
							moveItemToLast={(itemname: string) => openWindow(itemname)}
						/>
					)}
					{showWindow(itemsConfig.works.var) && (
						<WorksWindow
							item={itemsConfig.works}
							position={{
								x: randomize(0.12),
								y: randomize(0.21),
								z: desktopWindows,
							}}
							moveItemToLast={(itemname: string) => openWindow(itemname)}
							cursorPosition={cursorPosition}
						/>
					)}
				</div>
			</div>

			<div
				className={cn(
					'relative flex h-screen w-[100lvw] select-none items-center justify-center overflow-hidden bg-black text-center text-white',
					scrollEnabled ? 'flex' : 'hidden',
				)}>
				<div className={cn('absolute left-7 top-7 z-10 w-2/5 space-y-5 text-left text-xl xl:text-4xl', courierPrime.className)}>
					<h2 ref={elevatorRef}></h2>
					{/* <p>A transition state between two worlds.</p> */}
				</div>
				<div className="absolute bottom-0 flex h-full w-full justify-center">
					<div className="absolute bottom-0 w-full">
						<Image src="/assets/elevator.webp" className="pointer-events-none z-0 w-full" alt="elevator" width={2000} height={1500} />
						<button
							className="absolute bottom-[-21%] left-1/2 h-[63%] w-[19%]"
							style={{
								transform: 'translate(-50%, -50%) scale(var(--image-scale-factor, 1))',
							}}
							onClick={() => {
								elevator();
							}}
							tabIndex={-1}></button>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

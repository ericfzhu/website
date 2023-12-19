import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Head from 'next/head'
import { useScramble } from 'use-scramble'
import { useGlitch } from 'react-powerglitch'
import { FinderWindow, P5Window } from '@/components/window'
import Icon from '@/components/Icon'
import music from '@/components/data/music.json'
import notes from '@/components/data/notes.json'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { animateScroll as scroll } from 'react-scroll'
import { fontClassNames, orbitron } from '@/components/Fonts'
import LibraryWindow from '@/components/window/LibraryWindow'

const notesFilesJson = generateFilesJson(notes)
const dahliaFilesJson = generateFilesJson(music)

function generateFilesJson(data: Record<string, string>): Array<{
    name: string
    iconPath: string
    type: string
    size: string
}> {
    return Object.keys(data).map((key) => {
        const sizeInBytes = new TextEncoder().encode(data[key]).length
        return {
            name: key,
            iconPath: '/assets/files/text.png',
            type: 'Plain Text Document',
            size: formatSize(sizeInBytes),
        }
    })
}

function formatSize(sizeInBytes: number): string {
    if (sizeInBytes < 1000) {
        return `${sizeInBytes} bytes`
    } else {
        return `${Math.round(sizeInBytes / 1000)} KB`
    }
}

function randomize(num: number) {
    const random = Math.random() * 0.03
    const plusOrMinus = Math.random() < 0.5 ? -1 : 1
    return num + random * plusOrMinus
}

const musicName = '君の幸せを'
const notesName = 'Meditations for the Self'
const libraryName = '图书馆'
const p5jsName = 'p5.js'

const desktopItemsConfig = [
    {
        name: 'NotesCast',
        src: '/assets/icons/NotesCast.png',
        x: 0.88,
        y: 0.1,
    },
    // {
    //     name: 'INDUSTRIAL GALLERY',
    //     src: '/assets/industrial---gallery.png',
    //     x: 0.664,
    //     y: 0.092,
    // },
    {
        name: libraryName,
        src: '/assets/icons/library.png',
        x: 0.74,
        y: 0.22,
    },
    {
        name: musicName,
        src: '/assets/icons/folder.png',
        x: 0.9,
        y: 0.24,
    },
    {
        name: notesName,
        src: '/assets/icons/folder.png',
        x: 0.9,
        y: 0.53,
    },
    {
        name: p5jsName,
        src: '/assets/icons/tsubuyaki.jpg',
        x: 0.1,
        y: 0.83,
    },
]

export default function HomePage() {
    const [time, setTime] = useState<dayjs.Dayjs | null>(null)
    const [showScreensaver, setShowScreensaver] = useState(true)
    const [showDisplay, setShowDisplay] = useState<'time' | '1006' | 'rip'>(
        'time'
    )
    const [showMusicWindow, setShowMusicWindow] = useState(false)
    const [showP5Window, setShowP5Window] = useState(false)
    const [showNotesWindow, setShowNotesWindow] = useState(false)
    const [showLibraryWindow, setShowLibraryWindow] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [currentNameFont, setCurrentNameFont] = useState(
        Math.floor(Math.random() * fontClassNames.length)
    )
    const [nameHover, setNameHover] = useState(false)
    const [animationFinished, setAnimationFinished] = useState(false)
    const [indicator, setIndicator] = useState(false)
    const [entryAnimationFinished, setEntryAnimationFinished] = useState(false)
    const [showExit, setShowExit] = useState(false)
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(false)
    const [elevatorText, setElevatorText] = useState<string>('"ELEVATOR"')
    const [temp, setTemp] = useState(false)
    const [showEntryText, setShowEntryText] = useState<boolean>(false)
    const [desktopIcons, setDesktopIcons] = useState<string[]>([
        ...desktopItemsConfig.map((item) => item.name),
        '',
        'desktop',
    ])
    const [desktopFolders, setDesktopFolders] = useState<string[]>([
        musicName,
        notesName,
        p5jsName,
        libraryName,
    ])
    const [time1006, setTime1006] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
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
    })
    const origin = dayjs('2020-10-06')
    const currentYear = dayjs().year()
    let audio: HTMLAudioElement
    let clickAudio: HTMLAudioElement
    if (typeof window !== 'undefined') {
        audio = new Audio('/assets/sounds/elevator.mp3')

        if (elevatorText === '"PORTAL"') {
            clickAudio = new Audio('/assets/sounds/click2.mp3')
            clickAudio.volume = 0.2
        } else {
            clickAudio = new Audio('/assets/sounds/click.mp3')
            clickAudio.volume = 0.5
        }
    }

    const { ref: entryTextRef, replay: entryTextReplay } = useScramble({
        text: 'Click anywhere or press enter to continue',
        speed: 0.5,
        tick: 1,
        overflow: true,
        // playOnMount: true,
        chance: 0.75,
        overdrive: false,
        onAnimationStart: () => {
            setShowEntryText(true)
        },
        onAnimationEnd: () => {
            setEntryAnimationFinished(true)
        },
    })
    entryTextReplay

    const { ref: copyrightRef, replay: copyrightReplay } = useScramble({
        text: `&copy; ${currentYear}. All rights reserved.`,
        speed: 1,
        tick: 1,
        playOnMount: true,
        chance: 0.8,
        overdrive: false,
    })

    const { ref: nameRef, replay: nameReplay } = useScramble({
        text: 'Eric Zhu',
        speed: 0.1,
        tick: 1,
        chance: 0.75,
        overflow: false,
        overdrive: false,
        onAnimationEnd: () => {
            if (!showScreensaver) {
                setNameHover(true)
                setTimeout(() => {
                    setAnimationFinished(true)
                }, 300)
            }
        },
    })

    const { ref: elevatorRef } = useScramble({
        text: elevatorText,
        speed: 0.1,
        tick: 1,
        playOnMount: true,
        chance: 0.8,
        overdrive: false,
    })

    const dahliaFiles = [
        ...dahliaFilesJson,
        {
            name: '214655.jpg',
            iconPath: '/assets/files/214655_icon.jpg',
            type: 'JPEG image',
            size: '251 KB',
        },
        {
            name: '10.06',
            iconPath: '/assets/files/1006.png',
            type: 'click',
            onClick: () => {
                if (showDisplay !== '1006') {
                    setShowDisplay('1006')
                } else {
                    setShowDisplay('time')
                }
            },
            size: '',
        },
        {
            name: '11.09',
            iconPath: '/assets/files/1109.png',
            type: 'click',
            size: '',
            onClick: () => {
                if (showDisplay !== 'rip') {
                    setShowDisplay('rip')
                } else {
                    setShowDisplay('time')
                }
            },
        },
    ]

    function enableScrollAndScrollToSecondDiv() {
        if (!scrollEnabled) {
            audio.play()
            setScrollEnabled(true)
            scroll.scrollToBottom({
                duration: 2000,
                smooth: 'easeInOutQuint',
                delay: 1000,
            })
        } else {
            scroll.scrollToBottom({ duration: 2000, smooth: 'easeInOutQuint' })
        }
    }

    function handleDoubleClick(name: string) {
        switch (name) {
            case 'NotesCast':
                window.open('https://notescast.com/', '_blank')
                break
            case 'INDUSTRIAL GALLERY':
                window.open('https://industrial---gallery.com/', '_blank')
                break
            case libraryName:
                setShowLibraryWindow(true)
                moveItemToLast(name, desktopFolders, setDesktopFolders)
                // window.open('https://library.ericfzhu.com', '_blank')
                break
            case musicName:
                setShowMusicWindow(true)
                moveItemToLast(name, desktopFolders, setDesktopFolders)
                break
            case notesName:
                setShowNotesWindow(true)
                moveItemToLast(name, desktopFolders, setDesktopFolders)
                break
            case p5jsName:
                setShowP5Window(true)
                moveItemToLast(name, desktopFolders, setDesktopFolders)
                break
            default:
                break
        }
    }

    function moveItemToLast(
        itemName: string,
        itemsArray: string[],
        setItemsArray: (newArray: string[]) => void
    ) {
        const newArr = [...itemsArray]
        const index = newArr.indexOf(itemName)
        if (index > -1) {
            newArr.splice(index, 1)
            newArr.push(itemName)
            setItemsArray(newArr)
        }
    }

    function elevator() {
        setElevatorText('"PORTAL"')
        setTemp(true)
    }

    useEffect(() => {
        function updateClock() {
            const currentTime = dayjs()
            const timeSinceOrigin = Math.floor(
                (currentTime.valueOf() - origin.valueOf()) / 1000
            )
            const days = Math.floor(timeSinceOrigin / (3600 * 24))
            const hours = Math.floor((timeSinceOrigin % (3600 * 24)) / 3600)
            const minutes = Math.floor((timeSinceOrigin % 3600) / 60)
            const seconds = timeSinceOrigin % 60

            setTime1006({ days, hours, minutes, seconds })
        }
        updateClock()

        const timer = setInterval(updateClock, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        setTime(dayjs())

        const timerId = setInterval(() => {
            setTime(dayjs())
        }, 1000)

        return () => {
            clearInterval(timerId)
        }
    }, [])

    useEffect(() => {
        const handleEvent = (event: MouseEvent | KeyboardEvent) => {
            if (
                event.type === 'click' ||
                (event.type === 'keydown' &&
                    (event as KeyboardEvent).key === 'Enter')
            ) {
                setShowScreensaver(false)
                glitch.setOptions({ html: '' })
                glitch.stopGlitch()
                nameReplay()
                setTimeout(() => {
                    nameReplay()
                }, 300)
            }
        }

        if (showScreensaver) {
            window.addEventListener('click', handleEvent)
            window.addEventListener('keydown', handleEvent)
        }

        return () => {
            window.removeEventListener('click', handleEvent)
            window.removeEventListener('keydown', handleEvent)
        }
    }, [showScreensaver])

    useEffect(() => {
        if (nameHover) {
            const interval = setInterval(() => {
                setCurrentNameFont(
                    (prevIndex) => (prevIndex + 1) % fontClassNames.length
                )
            }, 300)
            return () => clearInterval(interval)
        }
    }, [nameHover])

    useEffect(() => {
        const interval = setInterval(() => {
            if (entryAnimationFinished) {
                setIndicator((prevIndicator) => !prevIndicator)
            }
        }, 750)
        return () => clearInterval(interval)
    }, [entryAnimationFinished])

    return (
        <motion.main
            className={`overflow-hidden select-none no-scrollbar relative ${
                scrollEnabled ? '' : 'h-screen'
            }`}
            onMouseDown={() => clickAudio.play()}
        >
            <Head>
                <title>Eric Zhu&trade; "WEBSITE"</title>
                <meta
                    property={'og:title'}
                    content={'Eric Zhu™ "WEBSITE"'}
                    key="title"
                />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Desktop */}
            <div
                className={`h-screen select-none w-[100lvw] relative z-10 overflow-hidden`}
                onClick={() =>
                    moveItemToLast('desktop', desktopIcons, setDesktopIcons)
                }
            >
                {/* Screensaver */}
                <div className="">
                    {!videoLoaded && (
                        <Image
                            src="/assets/wallpaper.jpg"
                            alt="Video placeholder"
                            priority
                            width={1920}
                            height={1080}
                            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover h-screen w-full ${
                                showScreensaver ? 'z-30' : '-z-20'
                            }`}
                        />
                    )}
                    {/* <video
                        autoPlay
                        loop
                        muted
                        onLoadedData={() => setVideoLoaded(true)}
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover h-screen w-full ${
                            showScreensaver ? 'z-30 ' : ' -z-20'
                        } ${videoLoaded ? 'visible' : ''}`}
                    >
                        <source src="/assets/background.mp4" type="video/mp4" />
                    </video> */}
                </div>

                {/* Screensaver time */}
                <div>
                    <div
                        className={`absolute top-[15%] left-1/2 transform -translate-x-1/2 text-center text-slate-100 duration-500 ${
                            showScreensaver
                                ? 'opacity-100 z-30'
                                : 'opacity-0 invisible -z-20'
                        }`}
                    >
                        <h1 className="lg:text-2xl md:text-xl sm:text-base text-sm drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                            {time ? time.format('dddd, DD MMMM') : ''}
                        </h1>
                        <h2 className="lg:text-9xl md:text-8xl sm:text-7xl font-bold text-6xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                            {time ? time.format('h:mm') : ''}
                        </h2>
                    </div>

                    {!entryAnimationFinished ? (
                        <div
                            className={`absolute lg:text-xl text-sm bottom-1/4 w-full px-2 text-white/80 duration-500 text-center flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${
                                showScreensaver
                                    ? 'opacity-100 z-30'
                                    : 'opacity-0 invisible -z-20'
                            } `}
                        >
                            <h2
                                className={`lg:text-xl text-sm space-x-3 px-2 duration-500 text-center`}
                                ref={entryTextRef}
                            ></h2>

                            <div
                                id="indicator"
                                className={`w-2 h-4 md:w-2.5 md:h-5 bg-slate-100/50 ${
                                    indicator ? 'opacity-100' : 'opacity-0'
                                } z-30`}
                            />
                        </div>
                    ) : (
                        <div
                            className={`absolute lg:text-xl text-sm bottom-1/4 w-full px-2 text-white/80 duration-500 text-center flex items-center justify-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${
                                showScreensaver
                                    ? 'opacity-100 z-30'
                                    : 'opacity-0 invisible -z-20'
                            } `}
                            ref={glitch.ref}
                        >
                            <h2
                                className={`lg:text-xl text-sm space-x-3 px-2 duration-500 text-center`}
                            >
                                Click anywhere or press enter to continue
                            </h2>

                            <div
                                id="indicator"
                                className={`w-2 h-4 md:w-2.5 md:h-5 bg-white/80 ${
                                    indicator ? 'opacity-100' : 'opacity-0'
                                } z-30`}
                            />
                        </div>
                    )}
                </div>

                {/* Desktop */}
                <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-all delay-500 ${
                        showScreensaver ? 'invisible' : 'visible'
                    }`}
                >
                    {!showScreensaver && (
                        <>
                            {animationFinished ? (
                                <h1
                                    className={`md:text-5xl text-3xl scale-150 text-white p-5 w-42 whitespace-nowrap drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${fontClassNames[currentNameFont]}`}
                                    onMouseEnter={() => setNameHover(true)}
                                    onMouseLeave={() => setNameHover(false)}
                                >
                                    Eric Zhu
                                </h1>
                            ) : (
                                <h1
                                    className={`md:text-5xl text-3xl text-white p-5 w-42 whitespace-nowrap duration-[1500ms] transition scale-150 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ${fontClassNames[currentNameFont]}`}
                                    ref={nameRef}
                                ></h1>
                            )}
                            <p
                                className="md:text-md text-sm font-light p-3 text-white/80 w-42 text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                                ref={copyrightRef}
                                onMouseOver={copyrightReplay}
                            />
                        </>
                    )}
                </div>

                {/* Time */}
                <button
                    className={`absolute mt-7 ml-7 ${
                        orbitron.className
                    }  text-white md:text-6xl text-3xl rounded transition-all ${
                        showScreensaver ? 'invisible' : 'visible delay-500'
                    }`}
                    onClick={() => {
                        setShowExit(!showExit)
                    }}
                >
                    <div
                        className={`bg-black delay-0 w-full h-full rounded md:p-2 p-1`}
                    >
                        {showDisplay === '1006' && (
                            <div className="px-2">
                                {`${time1006.days
                                    .toString()
                                    .padStart(2, '0')}:${time1006.hours
                                    .toString()
                                    .padStart(2, '0')}:${time1006.minutes
                                    .toString()
                                    .padStart(2, '0')}:${time1006.seconds
                                    .toString()
                                    .padStart(2, '0')}`}
                            </div>
                        )}
                        {showDisplay === 'rip' && (
                            <div className="px-2">Rest in peace</div>
                        )}
                        {showDisplay === 'time' && time && (
                            <div className="px-2">
                                {time.format('HH:mm:ss')}
                            </div>
                        )}
                        {showDisplay === 'time' && !time && (
                            <div>Loading...</div>
                        )}
                    </div>
                </button>

                {/* Desktop Icons */}
                <div
                    className={`delay-500 transition-all ${
                        showScreensaver ? 'invisible' : 'visible'
                    }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {desktopItemsConfig.map((item) => (
                        <Icon
                            key={item.name}
                            name={item.name}
                            position={{
                                x: randomize(item.x),
                                y: randomize(item.y),
                                z: desktopIcons,
                            }}
                            src={item.src}
                            onDoubleClick={() => handleDoubleClick(item.name)}
                            moveItemToLast={(itemname: string) =>
                                moveItemToLast(
                                    itemname,
                                    desktopIcons,
                                    setDesktopIcons
                                )
                            }
                        />
                    ))}

                    <div className={`${showExit ? 'visible' : 'invisible'}`}>
                        <Icon
                            name=""
                            position={{
                                x: randomize(0.2),
                                y: randomize(0.3),
                                z: desktopIcons,
                            }}
                            src="/assets/icons/exit.png"
                            onDoubleClick={() =>
                                enableScrollAndScrollToSecondDiv()
                            }
                            moveItemToLast={() =>
                                moveItemToLast(
                                    '',
                                    desktopIcons,
                                    setDesktopIcons
                                )
                            }
                        />
                    </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                    {/* Finder folders */}
                    {showMusicWindow && (
                        <FinderWindow
                            name={musicName}
                            position={{
                                x: randomize(0.4),
                                y: randomize(0.2),
                                z: desktopFolders,
                            }}
                            onClose={() => setShowMusicWindow(false)}
                            files={{ data: dahliaFiles, metadata: music }}
                            moveItemToLast={(itemname: string) =>
                                moveItemToLast(
                                    itemname,
                                    desktopFolders,
                                    setDesktopFolders
                                )
                            }
                        />
                    )}
                    {showNotesWindow && (
                        <FinderWindow
                            name={notesName}
                            position={{
                                x: randomize(0.2),
                                y: randomize(0.3),
                                z: desktopFolders,
                            }}
                            onClose={() => setShowNotesWindow(false)}
                            files={{ data: notesFilesJson, metadata: notes }}
                            moveItemToLast={(itemname: string) =>
                                moveItemToLast(
                                    itemname,
                                    desktopFolders,
                                    setDesktopFolders
                                )
                            }
                        />
                    )}
                    {showP5Window && (
                        <P5Window
                            name={p5jsName}
                            x={randomize(0.12)}
                            y={randomize(0.21)}
                            zPosition={desktopFolders}
                            onClose={() => setShowP5Window(false)}
                            moveItemToLast={(itemname: string) =>
                                moveItemToLast(
                                    itemname,
                                    desktopFolders,
                                    setDesktopFolders
                                )
                            }
                        />
                    )}
                    {showLibraryWindow && (
                        <LibraryWindow
                            name={libraryName}
                            x={randomize(0.12)}
                            y={randomize(0.21)}
                            zPosition={desktopFolders}
                            onClose={() => setShowLibraryWindow(false)}
                            moveItemToLast={(itemname: string) =>
                                moveItemToLast(
                                    itemname,
                                    desktopFolders,
                                    setDesktopFolders
                                )
                            }
                        />
                    )}
                </div>
            </div>

            <div
                className={`h-screen overflow-hidden select-none w-[100lvw] text-center flex items-center justify-center bg-black text-white relative`}
            >
                <div className="w-full bottom-0 absolute flex justify-center h-full">
                    <span
                        className="md:text-5xl text-3xl absolute top-[15%] z-10"
                        ref={elevatorRef}
                    />
                    <div className="w-full bottom-0 absolute">
                        <Image
                            src="/assets/elevator.png"
                            className="z-0 pointer-events-none w-full"
                            alt="elevator"
                            width={2000}
                            height={1500}
                        />
                        <button
                            className="absolute left-1/2 bottom-[-21%] w-[19%] h-[63%]"
                            style={{
                                transform:
                                    'translate(-50%, -50%) scale(var(--image-scale-factor, 1))',
                            }}
                            onClick={() => {
                                elevator()
                            }}
                            tabIndex={-1}
                        ></button>
                    </div>
                </div>
            </div>
        </motion.main>
    )
}

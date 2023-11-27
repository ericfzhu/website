import React, { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'
import Head from 'next/head'
import {
    Orbitron,
    Source_Code_Pro,
    Pixelify_Sans,
    Glass_Antiqua,
    Shadows_Into_Light,
    Sacramento,
    Indie_Flower,
    La_Belle_Aurore,
    Satisfy,
    Zeyada,
} from 'next/font/google'
import { useScramble } from 'use-scramble'
import { useGlitch } from 'react-powerglitch'
import Icon from '@/components/Icon'
import FinderWindow from '@/components/FinderWindow'
import P5Window from '@/components/P5Window'
import music from '@/components/music.json'
import notes from '@/components/notes.json'
import Image from 'next/image'

const sourceCodePro = Source_Code_Pro({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const pixelifySans = Pixelify_Sans({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const orbitron = Orbitron({
    weight: '700',
    display: 'swap',
    subsets: ['latin'],
})
const glassAntiqua = Glass_Antiqua({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const shadowsIntoLight = Shadows_Into_Light({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const sacramento = Sacramento({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const indieFlower = Indie_Flower({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const laBelleAurore = La_Belle_Aurore({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const satisfy = Satisfy({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})
const zeyada = Zeyada({
    weight: '400',
    display: 'swap',
    subsets: ['latin'],
})

const fontClassNames = [
    sourceCodePro.className,
    orbitron.className,
    zeyada.className,
    pixelifySans.className,
    glassAntiqua.className,
    satisfy.className,
    shadowsIntoLight.className,
    sacramento.className,
    indieFlower.className,
    laBelleAurore.className,
]

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
            iconPath: '/assets/text.png',
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

const desktopItemsConfig = [
    {
        name: 'NotesCast',
        src: '/assets/NotesCast.png',
        type: 'icon',
        x: 0.88,
        y: 0.1,
    },
    // {
    //     name: 'INDUSTRIAL GALLERY',
    //     src: '/assets/industrial---gallery.png',
    //     type: 'icon',
    //     x: 0.664,
    //     y: 0.092,
    // },
    {
        name: libraryName,
        src: '/assets/library.png',
        type: 'icon',
        x: 0.74,
        y: 0.22,
    },
    {
        name: musicName,
        src: '/assets/folder.png',
        type: 'folder',
        x: 0.9,
        y: 0.24,
    },
    {
        name: notesName,
        src: '/assets/folder.png',
        type: 'folder',
        x: 0.9,
        y: 0.53,
    },
    {
        name: 'p5.js',
        src: '/assets/tsubuyaki.jpg',
        type: 'icon',
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
    const [showMusic, setShowMusic] = useState(false)
    const [showP5, setShowP5] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [currentNameFont, setCurrentNameFont] = useState(
        Math.floor(Math.random() * fontClassNames.length)
    )
    const [nameHover, setNameHover] = useState(false)
    const [animationFinished, setAnimationFinished] = useState(false)
    const [indicator, setIndicator] = useState(false)
    const [entryAnimationFinished, setEntryAnimationFinished] = useState(false)
    const [timeBG, setTimeBG] = useState('bg-black')
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(false)
    const secondDivRef = useRef<HTMLDivElement>(null)

    const enableScrollAndScrollToSecondDiv = () => {
        setScrollEnabled(true)
        setTimeout(() => {
            secondDivRef.current!.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }
    const [desktopIcons, setDesktopIcons] = useState<string[]>([
        ...desktopItemsConfig
            .filter((item) => item.type === 'icon' || item.type === 'folder')
            .map((item) => item.name),
        'desktop',
    ])
    const [desktopFolders, setDesktopFolders] = useState<string[]>([
        musicName,
        notesName,
        'p5.js',
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

    const { ref: entryTextRef } = useScramble({
        text: 'Click anywhere or press enter to continue',
        speed: 0.5,
        tick: 1,
        overflow: true,
        playOnMount: true,
        chance: 0.75,
        overdrive: false,
        onAnimationEnd: () => {
            setEntryAnimationFinished(true)
        },
    })

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

    const dahliaFiles = [
        ...dahliaFilesJson,
        {
            name: '214655.jpg',
            iconPath: '/assets/214655_icon.jpg',
            type: 'JPEG image',
            size: '251 KB',
        },
        {
            name: '10.06',
            iconPath: '/assets/1006.png',
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
            iconPath: '/assets/1109.png',
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

    function handleDoubleClick(name: string) {
        switch (name) {
            case 'NotesCast':
                window.open('https://notescast.com/', '_blank')
                break
            case 'INDUSTRIAL GALLERY':
                window.open('https://industrial---gallery.com/', '_blank')
                break
            case libraryName:
                window.open('https://library.ericfzhu.com', '_blank')
                break
            case musicName:
                setShowMusic(true)
                moveItemToLast(name, desktopFolders, setDesktopFolders)
                break
            case notesName:
                setShowNotes(true)
                moveItemToLast(name, desktopFolders, setDesktopFolders)
                break
            case 'p5.js':
                setShowP5(true)
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
        <main
            className={`overflow-hidden select-none w-[100lvw] ${
                scrollEnabled ? 'overflow-auto min-h-screen' : 'h-screen'
            }`}
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

            {/* <CommandMenu /> */}
            <div
                className={`h-screen overflow-hidden select-none w-[100lvw] relative`}
                onClick={() =>
                    moveItemToLast('desktop', desktopIcons, setDesktopIcons)
                }
            >
                {/* Screensaver */}
                <div>
                    {!videoLoaded && (
                        <Image
                            src="/assets/background.jpg"
                            alt="Video placeholder"
                            priority
                            width={1920}
                            height={1080}
                            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover min-h-screen w-full ${
                                showScreensaver ? 'z-30 ' : ' -z-20'
                            }`}
                        />
                    )}
                    <video
                        autoPlay
                        loop
                        muted
                        onLoadedData={() => setVideoLoaded(true)}
                        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover min-h-screen w-full ${
                            showScreensaver ? 'z-30 ' : ' -z-20'
                        } ${videoLoaded ? 'visible' : ''}`}
                    >
                        <source src="/assets/background.mp4" type="video/mp4" />
                    </video>
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
                        <h1 className="lg:text-2xl md:text-xl sm:text-base text-sm">
                            {time ? time.format('dddd, DD MMMM') : ''}
                        </h1>
                        <h2 className="lg:text-9xl md:text-8xl sm:text-7xl font-bold text-6xl">
                            {time ? time.format('h:mm') : ''}
                        </h2>
                    </div>

                    <div
                        className={`absolute lg:text-xl text-sm bottom-1/4 w-full px-2 text-slate-100/50 duration-500 text-center flex items-center justify-center ${
                            showScreensaver
                                ? 'opacity-100 z-30'
                                : 'opacity-0 invisible -z-20'
                        } `}
                        ref={glitch.ref}
                    >
                        <h2
                            className={`lg:text-xl text-sm space-x-3 px-2 text-slate-100/50 duration-500 text-center`}
                            ref={entryTextRef}
                        >
                            Click anywhere or press enter to continue
                        </h2>

                        <div
                            id="indicator"
                            className={`w-2 h-4 md:w-2.5 md:h-5 bg-slate-100/50 ${
                                indicator ? 'opacity-100' : 'opacity-0'
                            } z-30`}
                        />
                    </div>
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
                                    className={`text-5xl scale-150 text-white p-5 w-42 ${fontClassNames[currentNameFont]}`}
                                    onMouseEnter={() => setNameHover(true)}
                                    onMouseLeave={() => setNameHover(false)}
                                >
                                    Eric Zhu
                                </h1>
                            ) : (
                                <h1
                                    className={`text-5xl text-white p-5 w-42 duration-[1500ms] transition scale-150 ${fontClassNames[currentNameFont]}`}
                                    ref={nameRef}
                                ></h1>
                            )}
                            <p
                                className="text-md font-light p-3 text-white/80 w-42 text-center"
                                ref={copyrightRef}
                                onMouseOver={copyrightReplay}
                            >
                                {/* &copy; {currentYear}. All rights reserved. */}
                            </p>
                        </>
                    )}
                </div>

                {/* Time */}
                <button
                    className={`absolute mt-7 ml-7 ${
                        orbitron.className
                    }  text-white md:text-6xl text-3xl rounded transition-all  ${
                        showScreensaver ? 'invisible' : 'visible delay-500'
                    }`}
                    onClick={() => {
                        if (timeBG === 'bg-black') {
                            setTimeBG('bg-[#4AA35C]')
                        } else {
                            enableScrollAndScrollToSecondDiv()
                        }
                    }}
                >
                    <div
                        className={`${timeBG} delay-0 w-full h-full rounded p-2`}
                    >
                        {timeBG === 'bg-black' ? (
                            <div>
                                {showDisplay === '1006' && (
                                    <div className="px-2">
                                        {`${time1006.days
                                            .toString()
                                            .padStart(2, '0')}:${time1006.hours
                                            .toString()
                                            .padStart(
                                                2,
                                                '0'
                                            )}:${time1006.minutes
                                            .toString()
                                            .padStart(
                                                2,
                                                '0'
                                            )}:${time1006.seconds
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
                        ) : (
                            <svg
                                className="h-[60px] w-[60px] fill-white"
                                viewBox="0 0 1280.000000 1280.000000"
                                preserveAspectRatio="xMidYMid meet"
                            >
                                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                                    <path
                                        d="M325 12468 c-3 -7 -4 -2742 -3 -6078 l3 -6065 6075 0 6075 0 0 6075
0 6075 -6073 3 c-4853 2 -6074 0 -6077 -10z m9405 -4568 l0 -3600 455 0 455 0
0 -560 0 -560 -455 0 -455 0 0 -562 0 -563 377 -377 378 -378 -2370 1 -2370 0
-295 309 -295 308 -508 3 c-279 2 -507 2 -507 -1 0 -3 138 -143 307 -312 l308
-308 -455 0 -455 1 -389 377 -389 377 7 895 c3 492 9 1465 12 2163 l7 1267
832 0 832 0 181 438 c99 240 225 544 278 675 54 130 101 237 104 237 7 0 -4
16 649 -1026 l582 -931 -1205 -1841 c-664 -1012 -1206 -1843 -1206 -1846 0 -3
222 -6 494 -6 l493 0 1109 1636 1109 1637 3 -992 2 -991 1545 0 1545 0 0 380
0 380 -1125 0 -1125 0 0 988 0 987 -771 1250 c-424 688 -782 1269 -796 1293
l-25 42 680 0 680 0 408 -677 c225 -373 424 -703 444 -734 l35 -57 330 193
c216 125 329 197 327 206 -2 8 -258 427 -569 932 l-565 917 -1103 0 -1103 0
-12 -67 c-7 -43 -25 -90 -49 -132 -21 -36 -51 -88 -66 -116 -46 -80 -213 -245
-309 -304 -130 -79 -267 -136 -386 -159 -156 -31 -190 -34 -373 -41 l-169 -6
-301 -797 -302 -798 -552 0 -553 0 0 2225 0 2225 3320 0 3320 0 0 -3600z"
                                    />
                                    <path
                                        d="M4945 10755 c-216 -27 -335 -79 -487 -210 -152 -132 -250 -279 -286
-431 -49 -206 -49 -350 0 -554 36 -150 172 -360 286 -442 179 -130 292 -175
500 -198 186 -22 415 20 553 100 212 124 391 347 437 545 48 205 48 333 0 540
-34 148 -85 229 -247 388 -105 103 -153 143 -211 174 -78 42 -204 77 -315 88
-33 3 -76 7 -95 9 -19 2 -80 -2 -135 -9z"
                                    />
                                </g>
                            </svg>
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
                            type={item.type}
                            x={randomize(item.x)}
                            y={randomize(item.y)}
                            zPosition={desktopIcons}
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
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                    {/* Finder folders */}
                    {showMusic && (
                        <FinderWindow
                            name={musicName}
                            x={randomize(0.4)}
                            y={randomize(0.2)}
                            zPosition={desktopFolders}
                            onClose={() => setShowMusic(false)}
                            files={dahliaFiles}
                            fileContents={music}
                            moveItemToLast={(itemname: string) =>
                                moveItemToLast(
                                    itemname,
                                    desktopFolders,
                                    setDesktopFolders
                                )
                            }
                        />
                    )}
                    {showNotes && (
                        <FinderWindow
                            name={notesName}
                            x={randomize(0.2)}
                            y={randomize(0.3)}
                            zPosition={desktopFolders}
                            onClose={() => setShowNotes(false)}
                            files={notesFilesJson}
                            fileContents={notes}
                            moveItemToLast={(itemname: string) =>
                                moveItemToLast(
                                    itemname,
                                    desktopFolders,
                                    setDesktopFolders
                                )
                            }
                        />
                    )}
                    {showP5 && (
                        <P5Window
                            name="p5.js"
                            x={randomize(0.12)}
                            y={randomize(0.21)}
                            zPosition={desktopFolders}
                            onClose={() => setShowP5(false)}
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
                className={`h-screen overflow-hidden select-none w-[100lvw] text-center flex items-center justify-center bg-black text-white`}
                ref={secondDivRef}
            >
                you're not supposed to see this yet
            </div>
        </main>
    )
}

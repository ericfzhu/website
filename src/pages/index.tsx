import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Head from 'next/head'
import { Orbitron, Source_Code_Pro, Pixelify_Sans, Glass_Antiqua, Shadows_Into_Light, Sacramento, Indie_Flower, La_Belle_Aurore, Satisfy, Zeyada } from 'next/font/google'
import { useScramble } from "use-scramble";

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

import Icon from '@/components/Icon'
import FinderWindow from '@/components/FinderWindow'
import P5Window from '@/components/P5Window'
import music from '@/components/music.json'
import notes from '@/components/notes.json'
import Image from 'next/image'


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

const desktopItemsConfig = [
    {
        name: 'NotesCast',
        src: '/assets/NotesCast.png',
        type: 'icon',
        x: 0.88,
        y: 0.1,
    },
    {
        name: 'INDUSTRIAL GALLERY',
        src: '/assets/industrial---gallery.png',
        type: 'icon',
        x: 0.664,
        y: 0.092,
    },
    {
        name: 'Library',
        src: '/assets/library.png',
        type: 'icon',
        x: 0.74,
        y: 0.22,
    },
    {
        name: 'dahlia',
        src: '/assets/folder.png',
        type: 'folder',
        x: 0.9,
        y: 0.24,
    },
    {
        name: 'meditations on the self',
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
    }
]

export default function HomePage() {
    const [time, setTime] = useState<dayjs.Dayjs | null>(null)
    const [showScreensaver, setShowScreensaver] = useState(true)
    const [show1006, setShow1006] = useState(false)
    const [showdahlia, setShowdahlia] = useState(false)
    const [showP5, setShowP5] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [currentNameFont, setCurrentNameFont] = useState(Math.floor(Math.random() * fontClassNames.length))
    const [nameHover, setNameHover] = useState(true)
    const [desktopIcons, setDesktopIcons] = useState<string[]>(
        [...desktopItemsConfig
            .filter((item) => item.type === 'icon' || item.type === 'folder')
            .map((item) => item.name), 'desktop']
    )
    const [desktopFolders, setDesktopFolders] = useState<string[]>([
        'dahlia',
        'meditations on the self',
        'p5.js',
    ])
    const [time1006, setTime1006] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const origin = dayjs('2020-10-06')
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const currentYear = dayjs().year()
    const { ref: entryTextRef } = useScramble({
        text: "Click anywhere or press enter to continue",
        speed: 0.5,
        tick: 1,
        overflow: true,
        playOnMount: true,
        chance: 0.75,
        overdrive: false
    })
    const { ref: copyrightRef, replay: copyrightReplay } = useScramble({
        text: `&copy; ${currentYear}. All rights reserved.`,
        speed: 1,
        tick: 1,
        playOnMount: true,
        chance: 0.8,
        overdrive: false
    })

    useEffect(() => {
        const updateCursorPosition = (e: MouseEvent) => {
            setCursorPosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', updateCursorPosition)
        return () => window.removeEventListener('mousemove', updateCursorPosition)
    }, [])

    function handleDoubleClick(name: string) {
        switch (name) {
            case 'NotesCast':
                window.open('https://notescast.com/', '_blank')
                break
            case 'INDUSTRIAL GALLERY':
                window.open('https://industrial---gallery.com/', '_blank')
                break
            case 'Library':
                window.open('https://library.ericfzhu.com', '_self')
                break
            case 'dahlia':
                setShowdahlia(true)
                moveItemToLast(name, desktopFolders, setDesktopFolders)
                break
            case 'meditations on the self':
                setShowNotes(true)
                moveItemToLast(
                    name,
                    desktopFolders,
                    setDesktopFolders
                )
                break
            case 'p5.js':
                setShowP5(true)
                moveItemToLast(name, desktopFolders, setDesktopFolders)
                break
            default:
                break
        }
    }

    const dahliaFiles = [
        ...dahliaFilesJson,
        {
            name: '214655.jpg',
            iconPath: '/assets/214655_icon.jpg',
            type: 'JPEG image',
            size: '251 KB',
        },
        {
            name: '1006',
            iconPath: '/assets/1006.png',
            type: 'click',
            onClick: () => {setShow1006(!show1006)},
            size: '',
        },
    ]

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
                setCurrentNameFont((prevIndex) => (prevIndex + 1) % fontClassNames.length);
            }, 200);
            return () => clearInterval(interval);
        }
    }, [nameHover])

    return (
        <main className="relative h-screen overflow-hidden select-none w-[100lvw]" onClick={() => moveItemToLast("desktop", desktopIcons, setDesktopIcons)}>
            <Head>
                <title>Eric Zhu&trade; "WEBSITE"</title>
                <meta property={'og:title'} content={'Eric Zhu™ "WEBSITE"'} key="title" />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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

                <h2
                    className={`absolute lg:text-xl text-sm bottom-1/4 left-1/2 transform -translate-x-1/2 space-x-3 px-4 text-slate-100/50 duration-500 text-center ${
                        showScreensaver
                            ? 'opacity-100 z-30'
                            : 'opacity-0 invisible -z-20'
                    }`}
                    ref={entryTextRef}
                >
                    {/* Click anywhere or press enter to continue */}
                </h2>
            </div>

            {/* Desktop */}
            <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center transition-all delay-500 ${
                    showScreensaver ? 'invisible' : 'visible'
                }`}
            >
                <h1
                    className={`text-5xl text-white p-5 w-42 ${fontClassNames[currentNameFont]}`}
                    onMouseEnter={() => setNameHover(true)}
                    onMouseLeave={() => setNameHover(false)}
                >
                    Eric Zhu
                </h1>
                <p className="text-md font-light p-3 text-white/80 w-42 text-center" ref={copyrightRef} onMouseOver={copyrightReplay}>
                    {/* &copy; {currentYear}. All rights reserved. */}
                </p>
            </div>

            {/* Time */}
            <div
                className={`absolute mt-9 ml-9 ${
                    orbitron.className
                } bg-black text-white font-mono md:text-6xl text-3xl p-2 rounded transition-all delay-500 ${
                    showScreensaver ? 'invisible' : 'visible'
                }`}
            >
                {show1006
                    ? `${time1006.days.toString().padStart(2, '0')}:${time1006.hours
                        .toString()
                        .padStart(2, '0')}:${time1006.minutes
                        .toString()
                        .padStart(2, '0')}:${time1006.seconds
                        .toString()
                        .padStart(2, '0')}`
                    : time ? time.format('HH:mm:ss') : 'Loading...'}
            </div>

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
                {showdahlia && (
                    <FinderWindow
                        name="dahlia"
                        x={randomize(0.4)}
                        y={randomize(0.2)}
                        zPosition={desktopFolders}
                        onClose={() => setShowdahlia(false)}
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
                        name="meditations on the self"
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
        </main>
    )
}

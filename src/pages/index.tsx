import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Head from 'next/head'
import { useScramble } from 'use-scramble'
import { useGlitch } from 'react-powerglitch'
import {
    FinderWindow,
    P5Window,
    LibraryWindow,
    GalleryWindow,
    MusicWindow,
} from '@/components/window'
import { Icon, MultiIcon } from '@/components/desktop'
import notes from '@/components/data/notes.json'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { animateScroll as scroll } from 'react-scroll'
import { fontClassNames, orbitron, glassAntiqua } from '@/components/Fonts'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { itemsConfigProps } from '@/components/types'

const notesFilesJson = generateFilesJson(notes)

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

export default function HomePage() {
    // time
    const currentYear = dayjs().year()
    const origin1006 = dayjs('2020-10-06')
    const origin1108 = dayjs('2023-11-08')
    const isJune18 = dayjs().format('MM-DD') === '06-18'
    const [time, setTime] = useState<dayjs.Dayjs | null>(null)
    const [showDisplay, setShowDisplay] = useState<'time' | '1006' | '1108'>(
        'time'
    )
    const [time1006, setTime1006] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const [time1108, setTime1108] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    // Window management
    const searchParams = useSearchParams()
    const router = useRouter()
    function setWindow(name: string, bool: boolean) {
        const newParams = new URLSearchParams(searchParams.toString())
        const currentWindows = searchParams.get('windows')
        if (bool) {
            if (currentWindows) {
                const windowsArray = currentWindows.split(';')
                if (windowsArray.includes(name)) {
                    const index = windowsArray.indexOf(name)
                    windowsArray.splice(index, 1)
                }
                windowsArray.push(name)
                newParams.set('windows', windowsArray.join(';'))
            } else {
                newParams.set('windows', name)
            }
        } else {
            const currentWindowsArray = currentWindows
                ? currentWindows.split(';')
                : []
            if (newParams.get('fs') === name) {
                newParams.delete('fs')
            }
            const index = currentWindowsArray.indexOf(name)
            if (index > -1) {
                currentWindowsArray.splice(index, 1)
            }
            if (currentWindowsArray.length > 0) {
                newParams.set('windows', currentWindowsArray.join(';'))
            } else {
                newParams.delete('windows')
            }
            if (name === itemsConfig.library.var) {
                newParams.delete('lang')
                newParams.delete('tab')
                newParams.delete('author')
            } else if (name === itemsConfig.music.var) {
                newParams.delete('mt')
                newParams.delete('mk')
            }
        }

        if (newParams.toString()) {
            router.push('?' + newParams.toString())
        } else {
            router.push('/')
        }
    }
    function openWindow(variable: string) {
        setWindow(variable, true)
        moveItemToLast(variable, desktopWindows, setDesktopWindows)
    }
    function showWindow(name: string) {
        const currentWindows = searchParams.get('windows')
        const windowsArray = currentWindows ? currentWindows.split(';') : []
        return windowsArray.includes(name)
    }
    const itemsConfig: itemsConfigProps = {
        music: {
            name: '君の幸せを',
            var: 'music',
            icon: {
                src: '/assets/icons/heart.png',
                className: '',
                showName: true,
                column: 2,
                handleDoubleClick: () => {
                    openWindow('music')
                },
            },
            hasWindow: true,
            closeWindow: () => {
                setWindow('music', false)
            },
        },
        notes: {
            name: 'Meditations',
            var: 'notes',
            icon: {
                src: '/assets/icons/folder.png',
                className: '',
                showName: true,
                column: 2,
                handleDoubleClick: () => {
                    openWindow('notes')
                },
            },
            hasWindow: true,
            closeWindow: () => {
                setWindow('notes', false)
            },
        },
        p5js: {
            name: 'p5.js',
            var: 'processing',
            icon: {
                src: '/assets/icons/tsubuyaki.jpg',
                className: '',
                showName: true,
                column: 2,
                handleDoubleClick: () => {
                    openWindow('sketch')
                },
            },
            hasWindow: true,
            closeWindow: () => {
                setWindow('sketch', false)
            },
        },
        library: {
            name: 'ESSENCE',
            var: 'library',
            icon: {
                src: '/assets/icons/ESSENCE.png',
                className: '',
                showName: true,
                handleDoubleClick: () => {
                    openWindow('library')
                },
            },
            hasWindow: true,
            closeWindow: () => {
                setWindow('library', false)
            },
        },
        gallery: {
            name: 'GALERIE INDUSTRIELLE',
            var: 'gallery',
            icon: {
                src: '/assets/icons/industrial---gallery.png',
                className: glassAntiqua.className,
                showName: true,
                handleDoubleClick: () => {
                    openWindow('gallery')
                },
            },
            hasWindow: true,
            closeWindow: () => {
                setWindow('gallery', false)
            },
        },
        notesCast: {
            name: 'NotesCast',
            var: 'notesCast',
            icon: {
                src: '/assets/icons/NotesCast.png',
                className: '',
                showName: true,
                column: 1,
                handleDoubleClick: () => {
                    window.open('https://notescast.com/', '_blank')
                },
            },
        },
        exit: {
            name: 'Exit',
            var: 'exit',
            icon: {
                src: '/assets/icons/exit.png',
                className: 'drop-shadow-glow',
                showName: false,
                handleDoubleClick: () => enableScrollAndScrollToSecondDiv(),
            },
        },
        blog: {
            name: 'Blog',
            var: 'blog',
            icon: {
                src: '/assets/icons/blog.png',
                className: '',
                showName: true,
                column: 1,
                handleDoubleClick: () => {
                    window.open(process.env.NEXT_PUBLIC_BLOG_URL, '_blank')
                },
            },
        },
    }

    // Desktop
    const [currentNameFont, setCurrentNameFont] = useState(
        Math.floor(Math.random() * fontClassNames.length)
    )
    const [nameHover, setNameHover] = useState(false)

    // Screensaver
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [showScreensaver, setShowScreensaver] = useState(true)
    const [animationFinished, setAnimationFinished] = useState(false)
    const [indicator, setIndicator] = useState(false)
    const [entryAnimationFinished, setEntryAnimationFinished] = useState(false)
    const [showQuote, setShowQuote] = useState(true)

    // Elevator
    const [showExit, setShowExit] = useState(false)
    const [scrollEnabled, setScrollEnabled] = useState<boolean>(false)
    const [elevatorText, setElevatorText] = useState<string>('"ELEVATOR"')
    let audio: HTMLAudioElement
    if (typeof window !== 'undefined') {
        audio = new Audio('/assets/sounds/elevator.mp3')
    }

    // Z index management
    const [desktopIcons, setDesktopIcons] = useState<string[]>([
        ...Object.keys(itemsConfig).map((key) => itemsConfig[key].var),
        'desktop',
    ])
    const [desktopWindows, setDesktopWindows] = useState<string[]>([
        ...Object.keys(itemsConfig)
            .filter((key) => itemsConfig[key].hasWindow)
            .map((key) => itemsConfig[key].var),
    ])
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
    })
    const { ref: entryTextRef, replay: entryTextReplay } = useScramble({
        text: 'Click anywhere or press enter to continue',
        speed: 0.5,
        tick: 1,
        overflow: false,
        chance: 0.75,
        overdrive: false,
        onAnimationEnd: () => {
            if (!showQuote) {
                setEntryAnimationFinished(true)
            }
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

    const musicActions = [
        {
            name: '10.06.20',
            iconPath: '/assets/files/1006.png',
            index: '爱',
            onClick: () => {
                if (showDisplay !== '1006') {
                    setShowDisplay('1006')
                } else {
                    setShowDisplay('time')
                }
            },
        },
        {
            name: '11.08.23',
            iconPath: '/assets/files/1108.png',
            index: '爱',
            onClick: () => {
                if (showDisplay !== '1108') {
                    setShowDisplay('1108')
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

    function elevator() {
        setElevatorText('"PORTAL"')
    }

    useEffect(() => {
        function updateClock() {
            const currentTime = dayjs()
            const updateTimeSinceOrigin = (origin: dayjs.Dayjs) => {
                const timeSinceOrigin = Math.floor(
                    (currentTime.valueOf() - origin.valueOf()) / 1000
                )
                const days = Math.floor(timeSinceOrigin / (3600 * 24))
                const hours = Math.floor((timeSinceOrigin % (3600 * 24)) / 3600)
                const minutes = Math.floor((timeSinceOrigin % 3600) / 60)
                const seconds = timeSinceOrigin % 60
                return { days, hours, minutes, seconds }
            }
            setTime1006(updateTimeSinceOrigin(origin1006))
            setTime1108(updateTimeSinceOrigin(origin1108))
            setTime(dayjs())
        }
        updateClock()

        const timer = setInterval(updateClock, 1000)
        const timer2 = setTimeout(() => {
            setShowQuote(false)
            entryTextReplay()
        }, 3000)

        return () => {
            clearInterval(timer)
            clearTimeout(timer2)
        }
    }, [])

    useEffect(() => {
        if (searchParams?.toString()) {
            setShowScreensaver(false)
            glitch.setOptions({ html: '' })
            glitch.stopGlitch()
            nameReplay()
            setTimeout(() => {
                nameReplay()
            }, 300)
            const windows = searchParams.get('windows')
            if (windows) {
                const windowsArray = windows.split(';')
                const lastWindow = windowsArray[windowsArray.length - 1]
                moveItemToLast(lastWindow, desktopWindows, setDesktopWindows)
            }
        }
    }, [searchParams])

    useEffect(() => {
        const handleEvent = (event: MouseEvent | KeyboardEvent) => {
            if (
                !showQuote &&
                (event.type === 'click' ||
                    (event.type === 'keydown' &&
                        (event as KeyboardEvent).key === 'Enter'))
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
    }, [showScreensaver, showQuote])

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
            className={`overflow-hidden select-none relative ${
                scrollEnabled ? '' : 'h-screen'
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

                <meta property="og:url" content="http://ericfzhu.com/" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:image"
                    content="https://www.ericfzhu.com/assets/wallpaper_preview.jpg"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="ericfzhu.com" />
                <meta property="twitter:url" content="http://ericfzhu.com/" />
                <meta name="twitter:title" content={'Eric Zhu™ "WEBSITE"'} />
                <meta
                    name="twitter:image"
                    content="https://www.ericfzhu.com/assets/wallpaper_preview.jpg"
                />
            </Head>

            {/* Desktop */}
            <div
                className={`h-screen select-none w-[100lvw] relative z-10 overflow-hidden`}
                onClick={() =>
                    moveItemToLast('desktop', desktopIcons, setDesktopIcons)
                }
            >
                {/* Screensaver */}
                {!videoLoaded && (
                    <Image
                        src="/assets/wallpaper_quality_85.jpg"
                        alt="Video placeholder"
                        priority
                        width={1920}
                        height={1080}
                        className={`absolute top-1/2 left-1/2 transform pointer-events-none -translate-x-1/2 -translate-y-1/2 object-cover h-screen w-full ${
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

                <div
                    className={`absolute top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center transform duration-1000 z-50 ${
                        showQuote
                            ? 'opacity-100'
                            : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <div className="text-center w-2/3">
                        <p className="text-white text-2xl mb-4">
                            {
                                '"Every portrait that is painted with feeling is a portrait of the artist... It is rather the painter who, on the coloured canvas, reveals himself."'
                            }
                        </p>
                        <div className="text-right w-full">
                            <p className="text-white text-xl">
                                {'― Oscar Wilde, '}
                                <i>{'The Picture of Dorian Gray'}</i>
                            </p>
                        </div>
                    </div>
                </div>

                {showQuote === false && (
                    <>
                        {/* Screensaver time */}
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
                    </>
                )}

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
                    className={`absolute top-7 left-7 ${
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
                                {isJune18
                                    ? 'happy birthday'
                                    : `${time1006.days
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
                        {showDisplay === '1108' && (
                            <div className="px-2">
                                {`${time1108.days
                                    .toString()
                                    .padStart(2, '0')}:${time1108.hours
                                    .toString()
                                    .padStart(2, '0')}:${time1108.minutes
                                    .toString()
                                    .padStart(2, '0')}:${time1108.seconds
                                    .toString()
                                    .padStart(2, '0')}`}
                            </div>
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
                    <div className="grid right-7 absolute top-7 gap-8 w-fit grid-cols-2 pointer-events-none">
                        <div className="grid gap-8 h-fit">
                            {Object.keys(itemsConfig)
                                .filter(
                                    (key) =>
                                        itemsConfig[key].icon &&
                                        itemsConfig[key].icon.column === 1
                                )
                                .map((key) => {
                                    const item = itemsConfig[key]
                                    return (
                                        <Icon
                                            key={key}
                                            item={item}
                                            zPosition={desktopIcons}
                                            moveItemToLast={(
                                                itemname: string
                                            ) =>
                                                moveItemToLast(
                                                    itemname,
                                                    desktopIcons,
                                                    setDesktopIcons
                                                )
                                            }
                                            // rounded={true}
                                        />
                                    )
                                })}
                        </div>
                        <div className="grid grid-flow-row gap-8">
                            <MultiIcon
                                item={itemsConfig.library}
                                zPosition={desktopIcons}
                                src={{
                                    open: '/assets/icons/ESSENCE3.png',
                                    closed: '/assets/icons/ESSENCE.png',
                                }}
                                moveItemToLast={(itemname: string) =>
                                    moveItemToLast(
                                        itemname,
                                        desktopIcons,
                                        setDesktopIcons
                                    )
                                }
                            />
                            {Object.keys(itemsConfig)
                                .filter(
                                    (key) =>
                                        itemsConfig[key].icon &&
                                        itemsConfig[key].icon.column === 2
                                )
                                .map((key) => {
                                    const item = itemsConfig[key]
                                    return (
                                        <Icon
                                            key={key}
                                            item={item}
                                            zPosition={desktopIcons}
                                            moveItemToLast={(
                                                itemname: string
                                            ) =>
                                                moveItemToLast(
                                                    itemname,
                                                    desktopIcons,
                                                    setDesktopIcons
                                                )
                                            }
                                            rounded={true}
                                        />
                                    )
                                })}
                        </div>
                    </div>

                    <div
                        className={`${
                            showExit ? 'visible' : 'invisible'
                        } top-[20%] absolute left-[15%] pointer-events-none`}
                    >
                        <Icon
                            item={itemsConfig.exit}
                            zPosition={desktopIcons}
                            moveItemToLast={(itemname: string) =>
                                moveItemToLast(
                                    itemname,
                                    desktopIcons,
                                    setDesktopIcons
                                )
                            }
                        />
                    </div>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                    {/* Finder folders */}
                    {showWindow(itemsConfig.music.var) && (
                        <MusicWindow
                            item={itemsConfig.music}
                            position={{
                                x: randomize(0.4),
                                y: randomize(0.2),
                                z: desktopWindows,
                            }}
                            moveItemToLast={(itemname: string) =>
                                openWindow(itemname)
                            }
                            actions={musicActions}
                        />
                    )}
                    {showWindow(itemsConfig.notes.var) && (
                        <FinderWindow
                            item={itemsConfig.notes}
                            position={{
                                x: randomize(0.2),
                                y: randomize(0.3),
                                z: desktopWindows,
                            }}
                            files={{ data: notesFilesJson, metadata: notes }}
                            moveItemToLast={(itemname: string) =>
                                openWindow(itemname)
                            }
                        />
                    )}
                    {showWindow(itemsConfig.p5js.var) && (
                        <P5Window
                            item={itemsConfig.p5js}
                            position={{
                                x: randomize(0.12),
                                y: randomize(0.21),
                                z: desktopWindows,
                            }}
                            moveItemToLast={(itemname: string) =>
                                openWindow(itemname)
                            }
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
                            moveItemToLast={(itemname: string) =>
                                openWindow(itemname)
                            }
                        />
                    )}
                    {showWindow(itemsConfig.gallery.var) && (
                        <GalleryWindow
                            item={itemsConfig.gallery}
                            position={{
                                x: randomize(0.12),
                                y: randomize(0.21),
                                z: desktopWindows,
                            }}
                            moveItemToLast={(itemname: string) =>
                                openWindow(itemname)
                            }
                        />
                    )}
                </div>
            </div>

            <div
                className={`h-screen ${
                    scrollEnabled ? 'flex' : 'hidden'
                } overflow-hidden select-none w-[100lvw] text-center flex items-center justify-center bg-black text-white relative`}
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

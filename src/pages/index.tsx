import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Head from 'next/head'
import { Orbitron } from "next/font/google"
import DraggableIcon from '@/components/DraggableIcon'
import Finder from '@/components/Finder'
import music from '@/components/music.json'
import meditations from '@/components/meditations.json'

const orbitron = Orbitron({
    weight: '700',
    display: 'swap',
    subsets: ['latin'],
})

const meditations_files = Object.keys(meditations).map((key) => {
    const blob = new Blob([meditations[key as keyof typeof meditations]], { type: 'text/plain' });
    return {
        name: key,
        iconPath: '/assets/text.png',
        type: 'Plain Text Document',
        size: formatSize(blob.size)
}});

const dahlia_files_json = Object.keys(music).map((key) => {
    const blob = new Blob([music[key as keyof typeof music]], { type: 'text/plain' });
    return {
        name: key,
        iconPath: '/assets/text.png',
        type: 'Plain Text Document',
        size: formatSize(blob.size)
}});

function formatSize(sizeInBytes: number): string {
    if (sizeInBytes < 1000) {
        return `${sizeInBytes} bytes`;
    } else {
        return `${Math.round(sizeInBytes / 1000)} KB`;
    }
}


export default function HomePage() {
    const [time, setTime] = useState<dayjs.Dayjs | null>(null)
    const [showTimeDate, setShowTimeDate] = useState(true)
    const [show1006, setShow1006] = useState(false)
    const currentYear = dayjs().year()
    const [showdahlia, setShowdahlia] = useState(false);
    const [showMeditations, setShowMeditations] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [desktopIcons, setDesktopIcons] = useState<string[]>([' ', '', 'dahlia', 'meditations']);
    const [desktopFolders, setDesktopFolders] = useState<string[]>(['dahlia', 'meditations']);

    const moveIconToLast = (str: string) => {
        const newArr = [...desktopIcons]; // Clone the existing array
        const index = newArr.indexOf(str); // Find the index of the string
        if (index > -1) {
        newArr.splice(index, 1); // Remove the string from its current index
        newArr.push(str); // Append the string to the end
        setDesktopIcons(newArr); // Update the state variable
        }
    };

    const moveFolderToLast = (str: string) => {
        const newArr = [...desktopFolders]; // Clone the existing array
        const index = newArr.indexOf(str); // Find the index of the string
        if (index > -1) {
        newArr.splice(index, 1); // Remove the string from its current index
        newArr.push(str); // Append the string to the end
        setDesktopFolders(newArr); // Update the state variable
        }
    };
  
    const handleVideoLoad = () => {
      setVideoLoaded(true);
    };

    const dahlia_files = [
        ...dahlia_files_json,
        { name: '214655.jpg', iconPath: '/assets/214655.jpg', type: 'JPEG image', size: '251 KB' },
        { name: '1006', iconPath: '/assets/1006.png', type: 'click', onClick: () => setShow1006(!show1006), size:'' },
    ];

    const [time1006, setTime1006] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    const origin = dayjs('2020-10-06')

    const updateClock = () => {
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
    useEffect(() => {
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
        const handleClick = () => {
            setShowTimeDate(false)
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                setShowTimeDate(false)
            }
        }

        if (showTimeDate) {
            window.addEventListener('click', handleClick)
            window.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            window.removeEventListener('click', handleClick)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [showTimeDate])

    return (
        <main className="relative w-screen h-screen overflow-hidden select-none">
            <Head>
                <title>"WEBSITE"</title>
                <meta property={'og:title'} content={'"WEBSITE"'} key="title" />
                <meta
                    name="viewport"
                    content="width=device-width"
                    key="title"
                />
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                {!videoLoaded && (
                    <img
                    src="/assets/background.jpg"
                    alt="Video placeholder"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover min-h-screen max-w-screen -z-20"
                    />
                )}
                <video
                    autoPlay
                    loop
                    muted
                    onLoadedData={handleVideoLoad}
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover min-h-screen max-w-screen -z-20 ${videoLoaded ? 'visible' : ''}`}
                >
                    <source src="/assets/background.mp4" type="video/mp4" />
                </video>
            </div>
            <div
                className={`absolute top-24 left-1/2 transform -translate-x-1/2 text-center z-10 text-slate-100 duration-500 ${
                    showTimeDate ? 'opacity-100' : 'opacity-0 invisible'
                } -z-10`}
            >
                <h1 className="lg:text-2xl md:text-xl sm:text-base text-sm">
                    {time ? time.format('dddd, DD MMMM') : ''}
                </h1>
                <h2 className="lg:text-9xl md:text-8xl sm:text-7xl text-6xl">
                    {time ? time.format('h:mm') : ''}
                </h2>
            </div>

            <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -z-10 transition-opacity delay-500 opacity-0 ${
                    showTimeDate ? '' : 'opacity-100'
                }`}
            >
                <h1 className="text-5xl text-white m-5">Eric Zhu</h1>
                <p className="text-md font-light p-3 text-white/80">
                    &copy; {currentYear}. All rights reserved.
                </p>
            </div>

            <div
                className={`absolute mt-9 ml-9 ${
                    orbitron.className
                } bg-black text-white font-mono text-6xl p-2 rounded delay-500 opacity-0 ${
                    showTimeDate || show1006 ? '' : 'opacity-100'
                }`}
            >
                {time ? time.format('HH:mm:ss') : 'Loading...'}
            </div>
            <div
                className={`absolute mt-9 ml-9 ${
                    orbitron.className
                } bg-black text-white font-mono text-6xl p-2 rounded delay-500 opacity-0 ${
                    showTimeDate || !show1006 ? '' : 'opacity-100'
                }`}
            >
                {`${time1006.days.toString().padStart(2, '0')}:${time1006.hours
                    .toString()
                    .padStart(2, '0')}:${time1006.minutes
                    .toString()
                    .padStart(2, '0')}:${time1006.seconds
                    .toString()
                    .padStart(2, '0')}`}
            </div>
            <div
                className={`delay-500 opacity-0 ${
                    showTimeDate ? '' : 'opacity-100'
                }`}
            >
                <DraggableIcon
                    name=""
                    x={0.88}
                    y={0.1}
                    zPosition={desktopIcons}
                    src="/assets/NotesCast.png"
                    onDoubleClick={() =>
                        window.open('https://notescast.com/', '_blank')
                    }
                    moveIconToLast={moveIconToLast}
                />
                <DraggableIcon
                    name=" "
                    x={0.764}
                    y={0.092}
                    zPosition={desktopIcons}
                    src="/assets/industrial---gallery.png"
                    onDoubleClick={() =>
                        window.open('https://industrial---gallery.com/', '_blank')
                    }
                    moveIconToLast={moveIconToLast}
                />
                <DraggableIcon
                    name="dahlia"
                    x={0.9}
                    y={0.24}
                    zPosition={desktopIcons}
                    src="/assets/folder.png"
                    onDoubleClick={() => {setShowdahlia(true); moveFolderToLast('dahlia')}}
                    moveIconToLast={moveIconToLast}
                />
                <DraggableIcon
                    name="meditations"
                    x={0.9}
                    y={0.53}
                    zPosition={desktopIcons}
                    src="/assets/folder.png"
                    onDoubleClick={() => {setShowMeditations(true); moveFolderToLast('meditations')}}
                    moveIconToLast={moveIconToLast}
                />
            </div>
            {showdahlia && (
                <Finder
                    name="dahlia"
                    x={0.4}
                    y={0.2}
                    zPosition={desktopFolders}
                    onClose={() => setShowdahlia(false)}
                    files={dahlia_files}
                    fileContents={music}
                    moveFolderToLast={moveFolderToLast}
                />
            )}
            {showMeditations && (
                <Finder
                    name="meditations"
                    x={0.2}
                    y={0.3}
                    zPosition={desktopFolders}
                    onClose={() => setShowMeditations(false)}
                    files={meditations_files}
                    fileContents={meditations}
                    moveFolderToLast={moveFolderToLast}
                />
            )}
            <h1
                className={`absolute lg:text-xl text-sm bottom-1/4 left-1/2 transform -translate-x-1/2 text-left space-x-3 px-4 text-slate-100/50 duration-500 ${
                    showTimeDate ? 'opacity-100' : 'opacity-0 invisible'
                }`}
            >
                Click anywhere or press enter to continue
            </h1>
        </main>
    )
}

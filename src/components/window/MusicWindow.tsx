import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import AbstractWindow from './AbstractWindow'
import Image from 'next/image'
import music from '@/components/data/music.json'
import { useEffect, useRef, useState } from 'react'
import { notoSerif } from '@/components/Fonts'

interface MusicWindowProps {
    name: string
    position: { x: number; y: number; z: string[] }
    onClose: () => void
    moveItemToLast: (itemname: string) => void
    actions: Action[]
}

interface Music {
    lyrics: string
    artist: string
    color: string
}

interface Action {
    name: string
    iconPath: string
    onClick: () => void
    index: string
}

const parsedMusic: Record<string, Music> = JSON.parse(JSON.stringify(music))

function SongComponent({
    onClick,
    src,
    index,
    name,
    artist,
}: {
    onClick: () => void
    src: string
    index: string
    name: string
    artist?: string
}) {
    return (
        <div
            className="flex flex-row py-2 hover:bg-white/10 rounded-lg px-3 cursor-pointer"
            onClick={onClick}
        >
            <div className="mr-5 text-[#A7A7A7] w-8 text-right flex items-center justify-end shrink-0">
                {index}
            </div>
            <Image
                height={50}
                width={50}
                src={src}
                alt={name}
                className="rounded-lg shadow h-12 w-12 pointer-events-none"
            />
            {artist ? (
                <div className="flex flex-col pl-5 overflow-hidden">
                    <p className="text-lg text-white whitespace-nowrap truncate">
                        {name}
                    </p>
                    <p className="text-sm text-[#A7A7A7]">{artist}</p>
                </div>
            ) : (
                <div className="flex items-center text-xl text-white ml-5">
                    {name}
                </div>
            )}
        </div>
    )
}

export default function MusicWindow({
    name,
    position,
    onClose,
    moveItemToLast,
    actions,
}: MusicWindowProps) {
    const [showState, setShowState] = useState<'menu' | 'picture' | 'lyric'>(
        'menu'
    )
    const [cache, setCache] = useState<'menu' | 'picture' | 'lyric'>('menu')
    const [content, setContent] = useState<string | null>(null)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement | null>(null)

    const handleMouseMove = (e: MouseEvent) => {
        if (containerRef.current) {
            const { left, top, width, height } =
                containerRef.current.getBoundingClientRect()
            const x = (e.clientX - (left + width / 2)) / (width / 2)
            const y = -(e.clientY - (top + height / 2)) / (height / 2)

            setTilt({ x, y })
        }
    }

    useEffect(() => {
        const container = containerRef.current

        if (container) {
            container.addEventListener('mousemove', handleMouseMove)
        }
        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, [])

    return (
        <AbstractWindow
            position={position}
            name={name}
            moveItemToLast={moveItemToLast}
            onClose={onClose}
            windowClassName="bg-black"
        >
            <div
                className={`bg-gradient-to-b from-accent to-black h-full rounded-lg mt-12 mx-2 overflow-auto relative flex flex-col ${notoSerif.className}`}
                ref={containerRef}
            >
                <div className="absolute sticky top-5 left-0 flex space-x-2 mx-5 z-10">
                    <button
                        className={`bg-black ${
                            showState === 'menu' ? 'opacity-50' : 'opacity-80'
                        } rounded-full p-1`}
                        onClick={() => setShowState('menu')}
                    >
                        <IconChevronLeft className="stroke-white" />
                    </button>
                    <button
                        className={`bg-black ${
                            cache !== 'menu' && cache !== showState
                                ? 'opacity-80'
                                : 'opacity-50'
                        } rounded-full p-1`}
                        onClick={() => setShowState(cache)}
                    >
                        <IconChevronRight className="stroke-white" />
                    </button>
                </div>
                {showState === 'menu' ? (
                    <div className="mt-24 h-full flex flex-col">
                        <div className="flex flex-row mx-5">
                            <Image
                                height={100}
                                width={100}
                                src="/assets/icons/heart_square.jpg"
                                alt="heart square"
                                className="rounded-lg shadow-xl"
                            />
                            <div className="flex flex-col ml-5">
                                <p className="text-6xl text-white font-semibold">
                                    君の幸せを
                                </p>
                                <p className="text-white mt-2 text-sm">
                                    {Object.keys(music).length + ' songs'}
                                </p>
                            </div>
                        </div>
                        <div className="bg-black/50 pt-10 mt-4 px-2 flex-grow flex flex-col">
                            <div className="grid grid-cols-2">
                                <div className="flex flex-row mt-5 px-3">
                                    <div className="text-lg mr-5 w-8 text-right text-[#A7A7A7]">
                                        {'#'}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-lg text-[#A7A7A7]">
                                            {'Title'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row mt-5 px-3 hidden md:flex">
                                    <div className="text-lg mr-5 w-8 text-right text-[#A7A7A7]">
                                        {'#'}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-lg text-[#A7A7A7]">
                                            {'Title'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-t border-white/20 mt-2" />

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {Object.entries(parsedMusic).map(
                                    ([key, item], index) => (
                                        <SongComponent
                                            onClick={() => {
                                                setShowState('lyric')
                                                setCache('lyric')
                                                setContent(key)
                                                if (containerRef.current) {
                                                    containerRef.current.scrollTop = 0
                                                }
                                            }}
                                            index={(index + 1).toString()}
                                            src={`/assets/music/${key}.jpg`}
                                            name={key}
                                            artist={item.artist}
                                        />
                                    )
                                )}
                                <SongComponent
                                    onClick={() => {
                                        setShowState('picture')
                                        setCache('picture')
                                        setContent('/assets/files/warmth.jpg')
                                    }}
                                    index={'猫'}
                                    src={`/assets/files/warmth.jpg`}
                                    name="The Anchor"
                                />

                                <SongComponent
                                    onClick={() => {
                                        setShowState('picture')
                                        setCache('picture')
                                        setContent(
                                            '/assets/files/unraveling.jpg'
                                        )
                                    }}
                                    index={'私'}
                                    src={`/assets/files/unraveling.jpg`}
                                    name="The Unraveling"
                                />

                                {Object.entries(actions).map(([key, item]) => (
                                    <SongComponent
                                        onClick={item.onClick}
                                        index={item.index}
                                        src={item.iconPath}
                                        name={item.name}
                                    />
                                ))}
                            </div>
                            <p className="mx-3 pb-6 text-white text-sm font-light mt-2">
                                {
                                    "I've come to realize that trying to replace something significant you've lost is a fool's errand. There's nothing comparable, nothing equal. You can't get it back. All you can do is to find something to grieve, to let go of, and find separate, unique joy in something new. It won't be what it was, but it might be worth keeping."
                                }
                            </p>
                        </div>
                    </div>
                ) : showState === 'lyric' ? (
                    <span
                        className={`mt-24 mb-6 w-2/3 max-w-2xl mx-auto text-white text-xl md:text-2xl whitespace-pre-wrap pointer-events-auto`}
                        style={{
                            transform: `perspective(1000px) rotateY(${
                                tilt.x * 3
                            }deg) rotateX(${tilt.y * 0}deg)`,
                            transition: 'transform 0.1s',
                        }}
                    >
                        {parsedMusic[content!].lyrics}
                    </span>
                ) : (
                    <div
                        className={`flex flex-grow items-center justify-center`}
                    >
                        <Image
                            src={content!}
                            alt="IG"
                            className="w-5/12 shadow-lg drop-shadow-glowwhite"
                            width={100}
                            height={100}
                            style={{
                                transform: `perspective(1000px) rotateY(${
                                    tilt.x * 15
                                }deg) rotateX(${tilt.y * 15}deg)`,
                                transition: 'transform 0.1s',
                            }}
                        />
                    </div>
                )}
            </div>
        </AbstractWindow>
    )
}

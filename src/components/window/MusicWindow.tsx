import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import AbstractWindow from './AbstractWindow'
import Image from 'next/image'
import music from '@/components/data/music.json'
import { useEffect, useRef, useState } from 'react'
import { notoSerifSC } from '@/components/Fonts'
import { Music, MusicWindowProps } from '@/components/types'
import { IconPlayerPlayFilled } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { memo } from 'react'

const parsedMusic: Record<string, Music> = JSON.parse(JSON.stringify(music))
Object.keys(parsedMusic).forEach((key) => {
    parsedMusic[key].type = 'music'
})

const pictures = {
    Luna: {
        content: '/assets/files/luna.jpg',
        type: 'picture',
        index: '私',
    },
    'The Mask': {
        content: '/assets/files/mask.jpg',
        type: 'picture',
        index: '私',
    },
}

function SongComponent({
    onClick,
    src,
    index,
    name,
    artist,
    link,
}: {
    onClick: () => void
    src: string
    index: string
    name: string
    artist?: string
    link?: string
}) {
    const [hover, setHover] = useState(false)

    return (
        <div
            className="flex flex-row py-2 hover:bg-white/10 rounded-lg px-3 cursor-pointer"
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                className={`${
                    hover && link !== undefined ? 'mr-3 ml-2' : 'mr-5'
                } text-[#A7A7A7] w-8 text-right flex items-center justify-end shrink-0`}
            >
                {hover && link !== undefined ? (
                    <Link
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        href={link}
                        target="_blank"
                    >
                        <IconPlayerPlayFilled className="text-white hover:text-accent p-1" />
                    </Link>
                ) : (
                    index
                )}
            </div>
            <Image
                height={50}
                width={50}
                src={src}
                alt={name}
                className="rounded shadow h-12 w-12 pointer-events-none"
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

export default memo(MusicWindow)

function MusicWindow({
    item,
    position,
    moveItemToLast,
    actions,
}: MusicWindowProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    function setState(state: 'menu' | 'pic' | 'song') {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('mt', state)
        router.push('?' + newParams.toString())
    }
    const showState =
        (searchParams.get('mt') as 'menu' | 'pic' | 'song') || 'menu'
    function setKey(key: string, state: 'menu' | 'pic' | 'song') {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('mk', key)
        newParams.set('mt', state)
        router.push('?' + newParams.toString())
    }
    const key = searchParams.get('mk')

    const [cache, setCache] = useState<'menu' | 'pic' | 'song'>('menu')
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
            item={item}
            moveItemToLast={moveItemToLast}
            windowClassName="bg-black"
        >
            <div className="absolute text-white my-[14px] text-center w-full">
                {showState === 'menu' ? 'Blog' : key}
            </div>

            <div
                className={`bg-gradient-to-b from-accent to-[#121212] h-full rounded-lg mt-12 mx-2 overflow-auto relative flex flex-col ${notoSerifSC.className}`}
                ref={containerRef}
            >
                <div className="absolute sticky top-5 left-0 flex space-x-2 mx-5 z-10 w-fit">
                    <button
                        className={`bg-black ${
                            showState === 'menu' ? 'opacity-50' : 'opacity-80'
                        } rounded-full p-1`}
                        onClick={() => setState('menu')}
                    >
                        <IconChevronLeft className="stroke-white" />
                    </button>
                    <button
                        className={`bg-black ${
                            cache !== 'menu' && cache !== showState
                                ? 'opacity-80'
                                : 'opacity-50'
                        } rounded-full p-1`}
                        onClick={() => setState(cache)}
                    >
                        <IconChevronRight className="stroke-white" />
                    </button>
                </div>
                {showState === 'menu' ? (
                    <div className="mt-16 h-full flex flex-col">
                        <div className="flex flex-row mx-10">
                            <Image
                                height={100}
                                width={100}
                                src="/assets/icons/heart.jpg"
                                alt="heart square"
                                className="rounded-lg shadow-xl h-16 w-16 lg:h-28 lg:w-28"
                            />
                            <div className="flex flex-col ml-5 text-white">
                                <h2 className="text-2xl md:text-4xl xl:text-6xl font-semibold">
                                    君の幸せを
                                </h2>
                                <h3 className="mt-2 text-xs lg:text-sm opacity-0 hover:opacity-100 duration-300">
                                    ずっとあなたの恋人になりたいと夢見ていて、その夢に翻弄されて苦しいんだ。
                                </h3>
                                {/* <p className="text-xs lg:text-sm">
                                    {Object.keys(music).length + ' songs'}
                                </p> */}
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
                                {/* {Object.entries(parsedMusic).map(
                                    ([key, item], index) => (
                                        <SongComponent
                                            onClick={() => {
                                                setCache('song')
                                                setKey(key, 'song')
                                                if (containerRef.current) {
                                                    containerRef.current.scrollTop = 0
                                                }
                                            }}
                                            index={(index + 1).toString()}
                                            src={`/assets/music/${key}.jpg`}
                                            name={key}
                                            artist={item.artist}
                                            link={item.link}
                                        />
                                    )
                                )} */}
                                {Object.entries(pictures).map(
                                    ([key, item], index) => (
                                        <SongComponent
                                            onClick={() => {
                                                setState('pic')
                                                setCache('pic')
                                                setKey(key, 'pic')
                                            }}
                                            index={item.index}
                                            src={item.content}
                                            name={key}
                                        />
                                    )
                                )}

                                {Object.entries(actions).map(([key, item]) => (
                                    <SongComponent
                                        onClick={item.onClick}
                                        index={item.index}
                                        src={item.iconPath}
                                        name={item.name}
                                    />
                                ))}
                            </div>
                            <p className="mx-3 pb-6 opacity-0 hover:opacity-100 duration-300 text-white text-xs xl:text-sm font-light  mt-2">
                                {
                                    "I've come to realize that trying to replace something significant you've lost is a fool's errand. There's nothing comparable, nothing equal. You can't get it back. All you can do is to create something to grieve, to let go of, and find separate, unique joy in something new. It won't be what it was, but it might be worth keeping."
                                }
                            </p>
                        </div>
                    </div>
                ) : showState === 'song' ? (
                    <div
                        className={`${
                            parsedMusic[key as keyof typeof parsedMusic].color
                        } top-0 absolute w-full h-fit flex items-start`}
                    >
                        <span
                            className={`pt-24 pb-6 w-2/3 max-w-2xl font-semibold mx-auto text-white text-xl md:text-2xl whitespace-pre-wrap pointer-events-auto`}
                            // style={{
                            //     transform: `perspective(1000px) rotateY(${
                            //         tilt.x * 3
                            //     }deg) rotateX(${tilt.y * 0}deg)`,
                            //     transition: 'transform 0.1s',
                            // }}
                        >
                            {
                                parsedMusic[key as keyof typeof parsedMusic]
                                    .content
                            }
                        </span>
                    </div>
                ) : (
                    <div
                        className={`flex flex-grow items-center justify-center`}
                    >
                        <Image
                            src={pictures[key as keyof typeof pictures].content}
                            alt="image"
                            className="w-5/12 shadow-lg drop-shadow-glowwhite "
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

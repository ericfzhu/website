import {
    IconChevronLeft,
    IconChevronRight,
    IconHome,
    IconSearch,
} from '@tabler/icons-react'
import AbstractWindow from './AbstractWindow'
import Image from 'next/image'
import music from '@/components/data/music.json'
import { useCallback, useEffect, useRef, useState } from 'react'
import { notoSansSC } from '@/components/Fonts'
import { Music, MusicWindowProps } from '@/components/types'
import { IconPlayerPlayFilled } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { memo } from 'react'

const parsedMusic: Record<string, Music> = JSON.parse(JSON.stringify(music))
Object.keys(parsedMusic).forEach((key) => {
    parsedMusic[key].type = 'song'
})

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
}

const menu = {
    'blog': {
        type: 'blog',
    },
    'music': {
        type: 'music',
    },
}

const combinedData: Record<string, {type: string}> = {...parsedMusic, ...pictures, ...menu};

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
            className="flex flex-row py-2 hover:bg-white/10 rounded-lg m-1 cursor-pointer"
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

function SideBarComponent({
    onClick,
    src,
    name,
    artist,
}: {
    onClick: () => void
    src: string
    name: string
    artist?: string
}) {
    return (
        <div
            className="flex flex-row p-1 hover:bg-[#1A1A1A] rounded-lg m-1 cursor-pointer"
            onClick={onClick}
        >
            <Image
                height={50}
                width={50}
                src={src}
                alt={name}
                className="rounded shadow h-10 w-10 pointer-events-none"
            />
            {artist ? (
                <div className="flex flex-col pl-5 overflow-hidden">
                    <p className="text-md text-white whitespace-nowrap truncate">
                        {name}
                    </p>
                    <p className="text-xs text-[#A7A7A7]">{artist}</p>
                </div>
            ) : (
                <div className="flex items-center text-md text-white ml-5">
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
    const key = searchParams.get('k');
    const state = key ? combinedData[key].type : 'blog';
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [history, setHistory] = useState([{ k: 'blog' }]);
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement | null>(null)
    console.log(state)

    function setKey(key: string) {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('k', key)
        router.push('?' + newParams.toString())
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
            <div
                className={`flex ${notoSansSC.className} mt-12 mx-2 gap-x-2 h-full`}
            >
                <div className="w-1/4 max-w-xs shrink-0 gap-2 flex flex-col rounded-lg">
                    <div className="bg-[#121212] py-5 gap-y-5 flex flex-col rounded-lg">
                        <button
                            onClick={() => setKey('blog')}
                            className={`hover:text-white duration-300 ${state === 'blog' ? 'text-white' : 'text-[#B3B3B3]'} flex px-5 w-full rounded-lg gap-x-3`}
                        >
                            <IconHome
                                className={`${state === 'blog' && 'fill-white'}`}
                            />
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
                                setKey('music')
                            }}
                            src={'assets/icons/heart.jpg'}
                            name="Liked Songs"
                        />
                        {Object.entries(pictures).map(([key, item], index) => (
                            <SideBarComponent
                                onClick={() => {
                                    setKey(key)
                                }}
                                src={item.content}
                                name={key}
                            />
                        ))}

                        {Object.entries(actions).map(([key, item]) => (
                            <SideBarComponent
                                onClick={item.onClick}
                                src={item.iconPath}
                                name={item.name}
                            />
                        ))}
                    </div>
                </div>

                <div
                    className={`h-full rounded-lg overflow-auto relative flex flex-col w-full`}
                    ref={containerRef}
                >
                    <div className="absolute fixed top-5 left-0 flex gap-x-2 mx-5 z-10 w-fit">
                        <button
                            className={`bg-black ${
                                currentIndex > 0
                                    ? 'opacity-80'
                                    : 'opacity-50'
                            } rounded-full p-1`}
                            onClick={() => goBack()}
                        >
                            <IconChevronLeft className="stroke-white" />
                        </button>
                        <button
                            className={`bg-black ${
                                currentIndex < history.length - 1
                                    ? 'opacity-80'
                                    : 'opacity-50'
                            } rounded-full p-1`}
                            onClick={() => {
                                if (currentIndex < history.length - 1) {
                                    goForward()
                                }
                            }}
                        >
                            <IconChevronRight className="stroke-white" />
                        </button>
                    </div>

                    {state === 'blog' && (
                        <div className="bg-gradient-to-b from-secondary to-[#121212] pt-16 h-full flex flex-col">
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
                                    <h2 className="text-2xl md:text-4xl xl:text-6xl font-semibold">
                                        Thoughts
                                    </h2>
                                    <h3 className="mt-2 text-xs lg:text-sm opacity-0 hover:opacity-100 duration-300">
                                        ずっとあなたの恋人になりたいと夢見ていて、その夢に翻弄されて苦しいんだ。
                                    </h3>
                                    <div className="flex flex-row items-center space-x-2 text-xs lg:text-sm">
                                        <Image
                                            height={50}
                                            width={50}
                                            src="/assets/profile.jpg"
                                            alt="Profile"
                                            className="rounded-full h-8 w-8"
                                        />
                                        <div className="hover:underline cursor-pointer">
                                            Eric Zhu
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-white " />
                                        <p>0 posts</p>
                                    </div>
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

                                <div className="grid grid-cols-1 md:grid-cols-2"></div>
                            </div>
                        </div>
                    )}

                    {state === 'music' && (
                        <div className="bg-gradient-to-b from-accent to-[#121212] pt-16 h-full flex flex-col">
                            <div className="flex flex-row mx-10">
                                <Image
                                    height={100}
                                    width={100}
                                    src="/assets/icons/heart.jpg"
                                    alt="heart square"
                                    className="rounded-lg shadow-xl h-20 w-20 lg:h-36 lg:w-36"
                                />
                                <div className="flex flex-col ml-5 text-white">
                                    <h3 className="text-sm">Blog</h3>
                                    <h2 className="text-2xl md:text-4xl xl:text-6xl font-semibold">
                                        Thoughts
                                    </h2>
                                    <h3 className="mt-2 text-xs lg:text-sm opacity-0 hover:opacity-100 duration-300">
                                        ずっとあなたの恋人になりたいと夢見ていて、その夢に翻弄されて苦しいんだ。
                                    </h3>
                                    <div className="flex flex-row items-center space-x-2 text-xs lg:text-sm">
                                        <Image
                                            height={50}
                                            width={50}
                                            src="/assets/profile.jpg"
                                            alt="Profile"
                                            className="rounded-full h-8 w-8"
                                        />
                                        <div className="hover:underline cursor-pointer">
                                            Eric Zhu
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-white " />
                                        <p>{Object.keys(parsedMusic).length} songs</p>
                                    </div>
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
                                                    setKey(key)
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
                                    )}
                                </div>
                                <p className="mx-3 pb-6 opacity-0 hover:opacity-100 duration-300 text-white text-xs xl:text-sm font-light  mt-2">
                                    {
                                        "I've come to realize that trying to replace something significant you've lost is a fool's errand. There's nothing comparable, nothing equal. You can't get it back. All you can do is to create something to grieve, to let go of, and find separate, unique joy in something new. It won't be what it was, but it might be worth keeping."
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                    {state === 'song' && (
                        <div
                            className={`${
                                parsedMusic[key as keyof typeof parsedMusic]
                                    .color
                            } w-full flex items-start`}
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
                    )}

                    {state === 'picture' && (
                        <div
                            className={`flex h-full items-center justify-center`}
                        >
                            <Image
                                src={
                                    pictures[key as keyof typeof pictures]
                                        .content
                                }
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
            </div>
        </AbstractWindow>
    )
}

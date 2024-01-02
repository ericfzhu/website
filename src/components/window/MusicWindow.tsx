import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import AbstractWindow from './AbstractWindow'
import Image from 'next/image'
import music from '@/components/data/music.json'

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
}

interface Action {
    name: string
    iconPath: string
    onClick: () => void
}

// {
//     name: '214655.jpg',
//     iconPath: '/assets/files/214655_icon.jpg',
//     type: 'JPEG image',
//     size: '251 KB',
// },

const parsedMusic: Record<string, Music> = JSON.parse(JSON.stringify(music))


export default function MusicWindow({
    name,
    position,
    onClose,
    moveItemToLast,
    actions
}: MusicWindowProps) {
    return (
        <AbstractWindow
            position={position}
            name={name}
            moveItemToLast={moveItemToLast}
            onClose={onClose}
            windowClassName="bg-[#000000]"
        >
            <div className="bg-gradient-to-b from-accent to-black h-full rounded-lg mt-12 mx-2 overflow-auto relative">
                <div className="absolute top-0 left-0 flex space-x-2 m-5">
                    <button className="bg-black opacity-50 rounded-full p-1">
                        <IconChevronLeft className="stroke-white" />
                    </button>
                    <button className="bg-black opacity-80 rounded-full p-1">
                        <IconChevronRight className="stroke-white" />
                    </button>
                </div>
                <div className="mt-24 h-full">
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
                    <div className='bg-black/50 pt-10 mt-4 px-2 h-full'>
                        <div className='grid grid-cols-2'>
                        <div className="flex flex-row mt-5 px-3">
                            <div className="text-lg text-white mr-5 text-[#A7A7A7]">
                                {'#'}
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg text-white text-[#A7A7A7]">
                                    {'Title'}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row mt-5 px-3">
                            <div className="text-lg text-white mr-5 text-[#A7A7A7]">
                                {'#'}
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg text-white text-[#A7A7A7]">
                                    {'Title'}
                                </p>
                            </div>
                        </div>
                        </div>
                        <hr className="border-t border-white/20 mt-2"/>

                        <div className='grid grid-cols-2'>
                        {Object.entries(parsedMusic).map(([key, item], index) => (
                            <div className="flex flex-row py-2 hover:bg-white/10 rounded-lg px-3">
                                <div className="text-lg text-white mr-5 pt-2 text-[#A7A7A7] w-3">
                                    {index + 1}
                                </div>
                                <Image
                                    height={50}
                                    width={50}
                                    src={`/assets/music/${key}.jpg`}
                                    alt={item.artist}
                                    className="rounded-lg shadow h-12 w-12"
                                />
                                <div className="flex flex-col ml-5">
                                    <p className="text-lg text-white">
                                        {key}
                                    </p>
                                    <p className="text-white text-sm text-[#A7A7A7]">
                                        {item.artist}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {Object.entries(actions).map(([key, item]) => (
                            <div className="flex flex-row py-2 hover:bg-white/10 rounded-lg px-3 cursor-pointer" onClick={item.onClick}>
                                <div className="text-white mr-5 pt-2 text-[#A7A7A7] w-3">
                                    {"愛"}
                                </div>
                                <Image
                                    height={50}
                                    width={50}
                                    src={`${item.iconPath}`}
                                    alt={item.name}
                                    className="rounded-lg shadow h-12 w-12"
                                />
                                <div className="flex items-center text-xl text-white ml-5">
                                    {item.name}
                                </div>
                            </div>
                        ))}

                        </div>
                        <p className='mx-3 pb-6 text-white text-sm font-light mt-2'>{"I've come to realize that trying to replace something significant you've lost is a fool's errand. There's nothing comparable, nothing equal. You can't get it back. All you can do is to find something to grieve, to let go of, and find separate, unique joy in something new. It won't be what it was, but it might be worth keeping."}</p>
                    </div>

                </div>
            </div>
        </AbstractWindow>
    )
}

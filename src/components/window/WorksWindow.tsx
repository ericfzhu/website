import { windowProps } from '@/components/types'
import { RESUME_DATA } from '@/components/data/resume'
import HoverImageComponent from '@/components/HoverImageComponent'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { IconX, IconMinus, IconCode } from '@tabler/icons-react'
import { robotoMono } from '@/components/Fonts'
import Image from 'next/image'

export default function WorksWindow({
    item,
    position,
    moveItemToLast,
    cursorPosition,
}: windowProps & { cursorPosition: { x: number; y: number } }) {
    const [windowPosition, setWindowPosition] = useState<{
        x: number
        y: number
    }>({
        x:
            window.innerWidth *
            (window.innerWidth < 798 ? position.x / 3 : position.x),
        y: window.innerHeight * position.y,
    })
    const [lightsHovered, setLightsHovered] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    function setIsFullscreen(bool: boolean) {
        const newParams = new URLSearchParams(searchParams.toString())
        if (bool) {
            newParams.set('fs', item.var)
        } else {
            newParams.delete('fs')
        }
        router.push('?' + newParams.toString())
    }
    const isFullScreen = searchParams?.get('fs') == item.var

    const targetProperties = {
        x: isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x,
        y: isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y,
        height: isFullScreen
            ? window.innerHeight * 0.9
            : Math.max(463.5352286774, (window.innerWidth * 0.6) / 1.618),
        width: isFullScreen
            ? window.innerWidth * 0.9
            : window.innerWidth < 768
              ? window.innerWidth * 0.8
              : Math.max(750, window.innerWidth * 0.6),
    }

    return (
        <div
            className={`absolute ${
                isFullScreen
                    ? 'fixed w-screen h-screen z-50 backdrop-blur-md'
                    : 'h-full w-full pointer-events-none'
            } ${robotoMono.className}`}
            style={{ zIndex: position.z.indexOf(item.var) + 10 }}
        >
            <motion.div
                initial={targetProperties}
                animate={targetProperties}
                drag={!isFullScreen}
                onTapStart={() => moveItemToLast(item.var)}
                onDragEnd={(e, info) =>
                    setWindowPosition({
                        x: info.offset.x + windowPosition.x,
                        y: info.offset.y + windowPosition.y,
                    })
                }
                dragMomentum={false}
                transition={{ stiffness: 100, transition: 0.5 }}
                className={`bg-[#D6D2CB] pointer-events-auto backdrop-blur-md rounded-lg shadow-2xl shadow-black border-[#666868] border flex flex-col overflow-hidden @container`}
            >
                {/* Traffic lights */}
                <div
                    className="absolute flex items-center mx-4 my-[18px] z-10 rounded-full"
                    onMouseEnter={() => setLightsHovered(true)}
                    onMouseLeave={() => setLightsHovered(false)}
                >
                    {/* Red */}
                    <div
                        className={`${
                            position.z.indexOf(item.var) ==
                                position.z.length - 1 || lightsHovered
                                ? 'bg-[#FE5F57]'
                                : 'bg-[#E6883C]'
                        } rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]`}
                        onClick={() => item.closeWindow!()}
                    >
                        {lightsHovered && <IconX className="stroke-black/50" />}
                    </div>
                    {/* Yellow */}
                    <div
                        className={`${
                            position.z.indexOf(item.var) ==
                                position.z.length - 1 || lightsHovered
                                ? 'bg-[#FCBA2B]'
                                : 'bg-slate-500/40'
                        } rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2`}
                        onClick={() => item.closeWindow!()}
                    >
                        {lightsHovered && (
                            <IconMinus className="stroke-black/50" />
                        )}
                    </div>
                    {/* Green */}
                    <div
                        className={`${
                            position.z.indexOf(item.var) ==
                                position.z.length - 1 || lightsHovered
                                ? 'bg-[#61C555]'
                                : 'bg-slate-500/40'
                        } rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2`}
                        onClick={() => setIsFullscreen(!isFullScreen)}
                    >
                        {lightsHovered && (
                            <svg
                                className="fill-black/50"
                                fill-rule="evenodd"
                                stroke-linejoin="round"
                                stroke-miterlimit="2"
                                clip-rule="evenodd"
                                viewBox="0 0 13 13"
                            >
                                <path d="M4.871 3.553 9.37 8.098V3.553H4.871zm3.134 5.769L3.506 4.777v4.545h4.499z" />
                                <circle
                                    cx="6.438"
                                    cy="6.438"
                                    r="6.438"
                                    fill="none"
                                />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="absolute left-5 top-44 transform -rotate-90 -translate-x-1/2 text-end text-black text-lg gap-5 flex">
                    {/* <IconCode className="h-4 w-4" />
                    Code
                    <span>24 Year</span> */}
                </div>
                {/* <div className="absolute w-2/3 left-[35%] top-[35%] pointer-events-none">
                    <Image 
                        src="/assets/files/aphrodite_full.png" 
                        alt="Aphrodite" 
                        width={1000}
                        height={3000}
                    />
                </div> */}
                <div className="mt-16 mx-12 flex flex-wrap gap-x-5 @7xl:gap-x-10 gap-y-3 @7xl:gap-y-8 font-light uppercase @5xl:text-5xl text-4xl @7xl:text-7xl z-10">
                    {RESUME_DATA.projects.map((project) => {
                        const [isHovered, setIsHovered] = useState(false)

                        return (
                            <div className="flex h-16 overflow-hidden items-center gap-x-1">
                                {'link' in project && project.link ? (
                                    <HoverImageComponent
                                        cursorPosition={{
                                            x:
                                                cursorPosition.x -
                                                (isFullScreen
                                                    ? (window.innerWidth * 1) /
                                                      20
                                                    : windowPosition.x),
                                            y:
                                                cursorPosition.y -
                                                (isFullScreen
                                                    ? (window.innerHeight * 1) /
                                                      20
                                                    : windowPosition.y),
                                        }}
                                        path={[project.link.preview]}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <Link
                                            href={project.link.href}
                                            target="_blank"
                                            className="truncate"
                                        >
                                            <div
                                                className={`transition-transform duration-500 ${isHovered ? 'translate-y-[-120%]' : 'translate-y-0'}`}
                                            >
                                                {project.title}
                                            </div>
                                            <div
                                                className={`absolute top-0 transition-transform duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-[120%]'} text-[#E6883C]`}
                                            >
                                                {project.title}
                                            </div>
                                        </Link>
                                    </HoverImageComponent>
                                ) : (
                                    <div
                                        className="truncate relative flex items-center justify-center"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <div
                                            className={`transition-transform duration-500 ${isHovered ? 'translate-y-[-120%]' : 'translate-y-0'}`}
                                        >
                                            {project.title}
                                        </div>
                                        <div
                                            className={`absolute top-0 transition-transform duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-[120%]'} text-[#E6883C]`}
                                        >
                                            WIP
                                        </div>
                                    </div>
                                )}
                                {'github' in project && project.github && (
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        className="text-secondary hover:text-[#E6883C] duration-300 flex self-start"
                                    >
                                        <IconCode className="h-4 w-4" />
                                    </Link>
                                )}
                                {'year' in project && project.year ? (
                                    <span className="text-secondary text-xs self-start font-normal">
                                        {project.year.slice(-2)}
                                    </span>
                                ) : (
                                    <span className="text-secondary text-xs self-start font-normal"></span>
                                )}
                            </div>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}

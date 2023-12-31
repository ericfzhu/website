import { IconMinus, IconX } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface AbstractWindowProps {
    position: { x: number; y: number; z: string[] }
    name: string
    onClose: () => void
    moveItemToLast: (itemname: string) => void
    windowClassName?: string
    children?: ReactNode
}

export default function AbstractWindow({
    position,
    name,
    moveItemToLast,
    onClose,
    windowClassName,
    children,
}: AbstractWindowProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)
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

    return (
        <div
            className={`absolute pointer-events-none ${
                isFullscreen
                    ? 'fixed inset-0 z-50 backdrop-blur-md'
                    : 'h-full w-full'
            }`}
            style={{ zIndex: position.z.indexOf(name) + 10 }}
        >
            <motion.div
                initial={windowPosition}
                animate={{
                    x: isFullscreen
                        ? (window.innerWidth * 1) / 20
                        : windowPosition.x,
                    y: isFullscreen
                        ? (window.innerHeight * 1) / 20
                        : windowPosition.y,
                    height: isFullscreen
                        ? window.innerHeight * 0.9
                        : Math.max(463.5352286774, window.innerWidth * 0.55 / 1.618),
                    width: isFullscreen
                        ? window.innerWidth * 0.9
                        : window.innerWidth < 768
                          ? window.innerWidth * 0.8
                          : Math.max(750, window.innerWidth * 0.5),
                }}
                drag={!isFullscreen}
                onTapStart={() => moveItemToLast(name)}
                onDragEnd={(e, info) =>
                    setWindowPosition({
                        x: info.offset.x + windowPosition.x,
                        y: info.offset.y + windowPosition.y,
                    })
                }
                dragMomentum={false}
                transition={{ stiffness: 100, transition: 0.5 }}
                className={` ${
                    windowClassName ? windowClassName : ''
                } pointer-events-auto backdrop-blur-md rounded-lg ring-1 ring-black shadow-2xl shadow-black border-[#666868] border flex flex-col overflow-hidden`}
            >
                {/* Traffic lights */}
                <div
                    className="absolute flex items-center mx-4 z-10 my-[18px] rounded-full"
                    onMouseEnter={() => setLightsHovered(true)}
                    onMouseLeave={() => setLightsHovered(false)}
                >
                    {/* Red */}
                    <div
                        className="bg-[#FE5F57] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]"
                        onClick={onClose}
                    >
                        {lightsHovered && <IconX className="stroke-black/50" />}
                    </div>
                    {/* Yellow */}
                    <div
                        className="bg-[#FCBA2B] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2"
                        onClick={onClose}
                    >
                        {lightsHovered && (
                            <IconMinus className="stroke-black/50" />
                        )}
                    </div>
                    {/* Green */}
                    <div
                        className="bg-[#61C555] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2"
                        onClick={() => setIsFullscreen(!isFullscreen)}
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
                {children}
            </motion.div>
        </div>
    )
}

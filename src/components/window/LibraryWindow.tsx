import { useState } from 'react'
import { motion } from 'framer-motion'
import { IconArrowUpRight, IconMinus, IconX } from '@tabler/icons-react'
import Library from '../library'
import Theatre from '../Theatre'

interface Props {
    name: string
    x: number
    y: number
    zPosition: string[]
    onClose: () => void
    moveItemToLast: (itemname: string) => void
}

export default function LibraryWindow({
    name,
    x,
    y,
    zPosition,
    onClose,
    moveItemToLast,
}: Props) {
    const initialPosition = {
        x:
            window.innerWidth < 798
                ? (window.innerWidth * x) / 3
                : window.innerWidth * x,
        y: window.innerHeight * y,
    }
    const [position, setPosition] = useState<{ x: number; y: number }>(
        initialPosition
    )
    const [isHovered, setIsHovered] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    return (
        <div
            className={`absolute pointer-events-none ${
                isFullscreen
                    ? 'fixed inset-0 z-50 backdrop-blur-md'
                    : 'h-full w-full'
            }`}
            style={{ zIndex: zPosition.indexOf(name) + 10 }}
        >
            <motion.div
                initial={position}
                animate={{
                    x: isFullscreen ? (window.innerWidth * 1) / 20 : position.x,
                    y: isFullscreen
                        ? (window.innerHeight * 1) / 20
                        : position.y,
                    height: isFullscreen
                        ? window.innerHeight * 0.9
                        : Math.min(550, window.innerHeight * 0.6),
                    width: isFullscreen
                        ? window.innerWidth * 0.9
                        : window.innerWidth < 768
                          ? window.innerWidth * 0.8
                          : Math.min(750, window.innerWidth * 0.5),
                }}
                drag={!isFullscreen}
                onTapStart={() => moveItemToLast(name)}
                onDragEnd={(e, info) =>
                    setPosition({
                        x: info.offset.x + position.x,
                        y: info.offset.y + position.y,
                    })
                }
                dragMomentum={false}
                transition={{ stiffness: 100, transition: 0.5 }}
                className={`bg-[#282827]/80 pointer-events-auto backdrop-blur-md rounded-lg ring-1 ring-black shadow-2xl shadow-black border-[#666868] border flex flex-col overflow-hidden`}
            >
                {/* Traffic lights */}
                <div
                    className="absolute flex items-center mx-4 my-[18px] z-10 rounded-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Red */}
                    <div
                        className="bg-[#FE5F57] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]"
                        onClick={onClose}
                    >
                        {isHovered && <IconX className="stroke-black/50" />}
                    </div>
                    {/* Yellow */}
                    <div
                        className="bg-[#FCBA2B] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2"
                        onClick={onClose}
                    >
                        {isHovered && <IconMinus className="stroke-black/50" />}
                    </div>
                    {/* Green */}
                    <div
                        className="bg-[#61C555] rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                        {isHovered && (
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
                {/* Open in new window? */}
                <div
                    className="absolute right-3 top-3 z-10 rounded-full flex h-5 w-5 justify-center items-center active:bg-white/50 ml-2"
                    onClick={() =>
                        window.open(
                            `https://www.ericfzhu.com/library`,
                            '_blank'
                        )
                    }
                >
                    <IconArrowUpRight className="stroke-black" />
                </div>

                {/* Window title */}
                {/* <div className="absolute flex items-center px-4 py-3 z-0 w-full h-12">
                    <div className="text-center m-auto text-[#EBEBEB] text-sm">
                        {"The Joy of Reading"}
                    </div>
                </div> */}
                <div
                    className="overflow-auto bg-[#2A2C2D] relative border-b border-b-[#666868]"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <Library darkMode={false} />
                    {/* <Theatre /> */}
                </div>
            </motion.div>
        </div>
    )
}

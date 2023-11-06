import { useState } from 'react'
import { motion } from 'framer-motion'
import Sketch1 from '@/components/p5/sketch1'
import Sketch2 from '@/components/p5/sketch2'
import Sketch3 from '@/components/p5/sketch3'

interface Props {
    name: string
    x: number
    y: number
    zPosition: string[]
    onClose: () => void
    moveItemToLast: (itemname: string) => void
}

const sketches = [
    { sketch: Sketch1, name: 'Evolution' },
    { sketch: Sketch2, name: 'Flower' },
    { sketch: Sketch3, name: 'Prime' },
]

export default function P5Window({
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
    const sketchKeys = Object.keys(sketches) as Array<keyof typeof sketches>
    const [activeSketchKey, setActiveSketchKey] = useState(0)

    const toggleSketch = () => {
        const currentSketchIndex = activeSketchKey
        const nextSketchIndex = (currentSketchIndex + 1) % sketchKeys.length
        setActiveSketchKey(nextSketchIndex)
    }

    const ActiveSketch = sketches[activeSketchKey].sketch
    const ActiveName = sketches[activeSketchKey].name

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
                        : window.innerHeight * 0.5,
                    width: isFullscreen
                        ? window.innerWidth * 0.9
                        : window.innerWidth < 768
                        ? window.innerWidth * 0.8
                        : window.innerWidth * 0.4,
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
                    className="absolute flex items-center mx-4 my-[18px] z-10"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Red */}
                    <div
                        className="bg-red-500 rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]"
                        onClick={onClose}
                    >
                        {isHovered && (
                            <svg
                                className="stroke-black/50 h-2 w-2"
                                xmlns="http://www.w3.org/2000/svg"
                                width="8"
                                height="8"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-width="1"
                                    d="M1.182 5.99L5.99 1.182m0 4.95L1.182 1.323"
                                />
                            </svg>
                        )}
                    </div>
                    {/* Yellow */}
                    <div
                        className="bg-yellow-500 rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2"
                        onClick={onClose}
                    >
                        {isHovered && (
                            <svg
                                className="stroke-black/50"
                                xmlns="http://www.w3.org/2000/svg"
                                width="6"
                                height="1"
                                fill="none"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-width="2"
                                    d="M.61.703h5.8"
                                />
                            </svg>
                        )}
                    </div>
                    {/* Green */}
                    <div
                        className="bg-green-500 rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                        {isHovered && (
                            <svg
                                className="fill-black/50"
                                xmlns="http://www.w3.org/2000/svg"
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
                    {/* White */}
                    <div
                        className="bg-white rounded-full w-3 h-3 flex justify-center items-center active:bg-white/50 ml-2"
                        onClick={() => toggleSketch()}
                    >
                        {isHovered && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="fill-black/50"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path
                                    d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                                    stroke-width="0"
                                ></path>
                            </svg>
                        )}
                    </div>
                </div>

                {/* Window title */}
                <div className="absolute flex items-center px-4 py-3 z-0 w-full h-12">
                    <div className="text-center m-auto text-[#EBEBEB] text-sm">
                        {ActiveName}
                    </div>
                </div>
                <ActiveSketch
                    height={
                        isFullscreen
                            ? window.innerHeight * 0.9
                            : window.innerHeight * 0.5
                    }
                    width={
                        isFullscreen
                            ? window.innerWidth * 0.9
                            : window.innerWidth < 768
                            ? window.innerWidth * 0.8
                            : window.innerWidth * 0.4
                    }
                />
            </motion.div>
        </div>
    )
}

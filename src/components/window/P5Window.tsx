import { useState } from 'react'
import { motion } from 'framer-motion'
import Sketch1, { string as String1 } from '@/components/p5/sketch1'
import Sketch2, { string as String2 } from '@/components/p5/sketch2'
import Sketch3, { string as String3 } from '@/components/p5/sketch3'
import { IconArrowUpRight, IconCode, IconEye, IconMinus, IconX } from '@tabler/icons-react'
import { CodeBlock, atomOneDark } from 'react-code-blocks'



interface Props {
    name: string
    x: number
    y: number
    zPosition: string[]
    onClose: () => void
    moveItemToLast: (itemname: string) => void
}

const sketches = [
    { sketch: Sketch1, name: 'evolution' },
    { sketch: Sketch2, name: 'flower' },
    { sketch: Sketch3, name: 'prime' },
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
    const [showCode, setShowCode] = useState(false)

    const toggleSketch = () => {
        setActiveSketchKey((activeSketchKey + 1) % sketchKeys.length)
    }

    const ActiveString = [String1, String2, String3][activeSketchKey]

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
                    {/* White */}
                    <div
                        className="bg-neutral-200 rounded-full w-3 h-3 flex justify-center items-center active:bg-white ml-2"
                        onClick={() => toggleSketch()}
                    >
                        {isHovered && (
                            <svg
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
                {/* Combined div */}
                <div className="absolute right-3 top-3 z-10 flex">
                    {/* Show code */}
                    <div
                        className={`rounded-full flex h-5 w-5 justify-center items-center ml-2 hover:text-white duration-300 ${showCode ? 'text-white/50' : 'text-white'}`}
                        onClick={() => setShowCode(false)}
                    >
                        <IconEye />
                    </div>
                    {/* Show code */}
                    <div
                        className={`rounded-full flex h-5 w-5 justify-center items-center ml-2 hover:text-white duration-300 ${showCode ? 'text-white' : 'text-white/50'}`}
                        onClick={() => setShowCode(true)}
                    >
                        <IconCode />
                    </div>
                    {/* Open in new window? */}
                    <div
                        className="rounded-full flex h-5 w-5 justify-center items-center active:bg-white/50 ml-2"
                        onClick={() =>
                            window.open(
                                `https://www.ericfzhu.com/${ActiveName}`,
                                '_blank'
                            )
                        }
                    >
                        <IconArrowUpRight className="stroke-white" />
                    </div>
                </div>

                {/* Window title */}
                <div className="absolute flex items-center px-4 py-3 z-0 w-full h-12">
                    <div className="text-center m-auto text-[#EBEBEB] text-sm">
                        {ActiveName}
                    </div>
                </div>
                {showCode ? (
                    <CodeBlock text={ActiveString} language="typescript" theme={atomOneDark} showLineNumbers={false}/>
                ) : (
                    <ActiveSketch
                        height={
                            isFullscreen
                                ? window.innerHeight * 0.9
                                : Math.min(550, window.innerHeight * 0.6)
                        }
                        width={
                            isFullscreen
                                ? window.innerWidth * 0.9
                                : window.innerWidth < 768
                                ? window.innerWidth * 0.8
                                : Math.min(
                                        window.innerWidth * 0.5,
                                        Math.min(750, window.innerWidth * 0.5)
                                    )
                        }
                    />
                )}
            </motion.div>
        </div>
    )
}

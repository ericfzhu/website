import { useState } from 'react'
import { motion } from 'framer-motion'
import Sketch1, { string as String1 } from '@/components/p5/sketch1'
import Sketch2, { string as String2 } from '@/components/p5/sketch2'
import Sketch3, { string as String3 } from '@/components/p5/sketch3'
import {
    IconArrowUpRight,
    IconCode,
    IconEye,
    IconMinus,
    IconPlayerTrackNext,
    IconX,
} from '@tabler/icons-react'
import { CodeBlock, atomOneDark } from 'react-code-blocks'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'

interface P5WindowProps {
    name: string
    position: { x: number; y: number; z: string[] }
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
    position,
    onClose,
    moveItemToLast,
}: P5WindowProps) {
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
    const [isFullscreen, setIsFullscreen] = useState(false)
    const targetProperties = {
        x: isFullscreen ? (window.innerWidth * 1) / 20 : windowPosition.x,
        y: isFullscreen ? (window.innerHeight * 1) / 20 : windowPosition.y,
        height: isFullscreen
            ? window.innerHeight * 0.9
            : Math.max(463.5352286774, (window.innerWidth * 0.55) / 1.618),
        width: isFullscreen
            ? window.innerWidth * 0.9
            : window.innerWidth < 768
              ? window.innerWidth * 0.8
              : Math.max(750, window.innerWidth * 0.5),
    }
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
            className={`absolute ${
                isFullscreen
                    ? 'fixed inset-0 z-50 backdrop-blur-md'
                    : 'h-full w-full pointer-events-none'
            }`}
            style={{ zIndex: position.z.indexOf(name) + 10 }}
        >
            <motion.div
                initial={targetProperties}
                animate={targetProperties}
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
                className={`bg-black pointer-events-auto backdrop-blur-md rounded-lg ring-1 ring-black shadow-2xl shadow-black border-[#666868] border flex flex-col overflow-hidden`}
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
                            position.z.indexOf(name) == position.z.length - 1 ||
                            lightsHovered
                                ? 'bg-[#FE5F57]'
                                : 'bg-slate-500/40'
                        } rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]`}
                        onClick={onClose}
                    >
                        {lightsHovered && <IconX className="stroke-black/50" />}
                    </div>
                    {/* Yellow */}
                    <div
                        className={`${
                            position.z.indexOf(name) == position.z.length - 1 ||
                            lightsHovered
                                ? 'bg-[#FCBA2B]'
                                : 'bg-slate-500/40'
                        } rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2`}
                        onClick={onClose}
                    >
                        {lightsHovered && (
                            <IconMinus className="stroke-black/50" />
                        )}
                    </div>
                    {/* Green */}
                    <div
                        className={`${
                            position.z.indexOf(name) == position.z.length - 1 ||
                            lightsHovered
                                ? 'bg-[#61C555]'
                                : 'bg-slate-500/40'
                        } rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2`}
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
                    {/* White */}
                    {/* <div
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
                    </div> */}
                </div>
                <div className="absolute right-3 top-3 z-10 flex">
                    {/* Next */}
                    <Tooltip
                        title="Next sketch"
                        placement="top"
                        arrow
                        className={`rounded-full flex h-5 w-5 justify-center items-center ml-2 hover:text-white duration-300 text-secondary`}
                        onClick={() => toggleSketch()}
                    >
                        <IconPlayerTrackNext />
                    </Tooltip>
                    {/* Show sketch */}
                    <Tooltip
                        title="Show sketch"
                        placement="top"
                        arrow
                        className={`rounded-full flex h-5 w-5 justify-center items-center ml-2 hover:text-white duration-300 ${
                            showCode ? 'text-secondary' : 'text-white'
                        }`}
                        onClick={() => setShowCode(false)}
                    >
                        <IconEye />
                    </Tooltip>
                    {/* Show code */}
                    <Tooltip
                        title="Show code"
                        placement="top"
                        arrow
                        className={`rounded-full flex h-5 w-5 justify-center items-center ml-2 hover:text-white duration-300 ${
                            showCode ? 'text-white' : 'text-secondary'
                        }`}
                        onClick={() => setShowCode(true)}
                    >
                        <IconCode />
                    </Tooltip>
                    {/* Open in new window? */}
                    <Tooltip
                        title="Open in new window"
                        placement="top"
                        arrow
                        className="rounded-full flex h-5 w-5 justify-center items-center hover:text-white duration-300 ml-2 text-secondary"
                    >
                        <Link
                            href={`/processing/${ActiveName}`}
                            target="_blank"
                        >
                            <IconArrowUpRight />
                        </Link>
                    </Tooltip>
                </div>

                {/* Window title */}
                <div className="absolute flex items-center px-4 py-3 z-0 w-full h-12">
                    <div className="text-center m-auto text-[#EBEBEB] text-sm">
                        {ActiveName}
                    </div>
                </div>
                {showCode ? (
                    <div className="p-5 bg-[#282D34] overflow-auto">
                        <CodeBlock
                            text={ActiveString}
                            language="typescript"
                            theme={atomOneDark}
                            showLineNumbers={false}
                        />
                    </div>
                ) : (
                    <ActiveSketch
                        height={
                            isFullscreen
            ? window.innerHeight * 0.9
            : Math.max(463.5352286774, (window.innerWidth * 0.55) / 1.618)
                        }
                        width={
                            isFullscreen
            ? window.innerWidth * 0.9
            : window.innerWidth < 768
              ? window.innerWidth * 0.8
              : Math.max(750, window.innerWidth * 0.5)
                        }
                    />
                )}
            </motion.div>
        </div>
    )
}

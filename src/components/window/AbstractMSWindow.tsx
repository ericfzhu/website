import { IconMinus, IconRectangle, IconX } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

interface AbstractMSWindowProps {
    position: { x: number; y: number; z: string[] }
    name: string
    onClose: () => void
    moveItemToLast: (itemname: string) => void
    windowClassName?: string
    children?: ReactNode
}

export default function AbstractMSWindow({
    position,
    name,
    moveItemToLast,
    onClose,
    windowClassName,
    children,
}: AbstractMSWindowProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    function setIsFullscreen(bool: boolean) {
        const newParams = new URLSearchParams(searchParams.toString())
        if (bool) {
            newParams.set(name, 'true')
        } else {
            newParams.set(name, 'false')
        }
        router.push('?' + newParams.toString())
    }
    const isFullScreen = searchParams?.get(name) == 'true'
    const [windowPosition, setWindowPosition] = useState<{
        x: number
        y: number
    }>({
        x:
            window.innerWidth *
            (window.innerWidth < 798 ? position.x / 3 : position.x),
        y: window.innerHeight * position.y,
    })

    const targetProperties = {
        x: isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x,
        y: isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y,
        height: isFullScreen
            ? window.innerHeight * 0.9
            : Math.max(463.5352286774, (window.innerWidth * 0.55) / 1.618),
        width: isFullScreen
            ? window.innerWidth * 0.9
            : window.innerWidth < 768
              ? window.innerWidth * 0.8
              : Math.max(750, window.innerWidth * 0.5),
    }

    const [lightsHovered, setLightsHovered] = useState(false)

    return (
        <div
            className={`absolute ${
                isFullScreen
                    ? 'fixed inset-0 z-50 backdrop-blur-md'
                    : 'h-full w-full pointer-events-none'
            }`}
            style={{ zIndex: position.z.indexOf(name) + 10 }}
        >
            <motion.div
                initial={targetProperties}
                animate={targetProperties}
                drag={!isFullScreen}
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
                } pointer-events-auto backdrop-blur-md shadow-2xl shadow-black border-[#666868] border flex flex-col overflow-hidden`}
            >
                {/* Traffic lights */}
                <div
                    className="absolute flex items-center z-10 rounded-full right-0"
                    onMouseEnter={() => setLightsHovered(true)}
                    onMouseLeave={() => setLightsHovered(false)}
                >
                    {/* Minimize */}
                    <div
                        className="hover:bg-secondary/20 w-10 h-8 flex justify-center items-center active:opacity-80"
                        onClick={onClose}
                    >
                        <IconMinus className="stroke-black/50 stroke-1" />
                    </div>
                    {/* Yellow */}
                    <div
                        className="hover:bg-secondary/20 w-10 h-8 flex justify-center items-center active:opacity-80"
                        onClick={() => setIsFullscreen(!isFullScreen)}
                    >
                        <IconRectangle className="stroke-black/50 stroke-1 w-5" />
                    </div>
                    {/* Close */}
                    <div
                        className="hover:bg-[#FE5F57] w-10 h-8 flex justify-center items-center active:opacity-80"
                        onClick={onClose}
                    >
                        <IconX className="stroke-black/50 stroke-1" />
                    </div>
                </div>
                {children}
            </motion.div>
        </div>
    )
}

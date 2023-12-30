import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type DraggableItemProps = {
    name: string
    position: { x: number; y: number; z: string[] }
    src: string
    onDoubleClick?: () => void
    moveItemToLast: (itemname: string) => void
}

export default function DraggableIcon({
    name,
    position,
    src,
    onDoubleClick,
    moveItemToLast,
}: DraggableItemProps) {
    const [windowPosition, setWindowPosition] = useState<{
        x: number
        y: number
    }>({
        x: -9999,
        y: -9999,
    })

    useEffect(() => {
        const initialX =
            window.innerWidth < 798
                ? window.innerWidth * (position.x - 0.1)
                : window.innerWidth * position.x
        const initialY = window.innerHeight * position.y
        setWindowPosition({ x: initialX, y: initialY })
    }, [])

    return (
        <motion.div
            initial={windowPosition}
            drag
            onTapStart={(e) => {
                e.stopImmediatePropagation
                moveItemToLast(name)
            }}
            dragMomentum={false}
            onDoubleClick={onDoubleClick}
            className={`absolute icon cursor-pointer lg:w-24 lg:h-24 h-20 w-20 rounded flex items-center flex-col border-2 ${
                position.z.indexOf(name) == position.z.length - 1
                    ? 'border-white/20'
                    : 'border-transparent'
            }`}
            style={{
                x: windowPosition.x,
                y: windowPosition.y,
                zIndex: position.z.indexOf(name),
            }}
        >
            <Image
                height={50}
                width={50}
                alt={name}
                src={src}
                priority
                className={`w-full h-full pointer-events-none drop-shadow-lg rounded p-2 ${
                    position.z.indexOf(name) == position.z.length - 1
                        ? 'bg-slate-600/50'
                        : ''
                }`}
            />
            <div
                className={`inset-0 flex justify-center items-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-sm sm:text-xs text-xs text-center rounded w-fit mt-1 px-1 ${
                    position.z.indexOf(name) == position.z.length - 1
                        ? 'bg-[#4149CD]'
                        : ''
                }`}
            >
                {name}
            </div>
        </motion.div>
    )
}

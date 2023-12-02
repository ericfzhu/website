import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type DraggableItemProps = {
    name: string
    x: number
    y: number
    zPosition: string[]
    src: string
    onDoubleClick?: () => void
    moveItemToLast: (itemname: string) => void
}

export default function DraggableItem({
    name,
    x,
    y,
    zPosition,
    src,
    onDoubleClick,
    moveItemToLast,
}: DraggableItemProps) {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: -9999,
        y: -9999,
    })

    useEffect(() => {
        const initialX = window.innerWidth < 798
                ? window.innerWidth * (x - 0.1)
                : window.innerWidth * x
        const initialY = window.innerHeight * y
        setPosition({ x: initialX, y: initialY })
    }, [])

    return (
        <motion.div
            initial={position}
            drag
            onTapStart={(e) => {
                e.stopImmediatePropagation
                moveItemToLast(name)
            }}
            dragMomentum={false}
            onDoubleClick={onDoubleClick}
            className={`absolute icon cursor-pointer lg:w-24 lg:h-24 h-20 w-20 rounded flex items-center flex-col border-2 ${
                zPosition.indexOf(name) == zPosition.length - 1
                    ? 'border-white/20'
                    : 'border-transparent'
            }`}
            style={{
                x: position.x,
                y: position.y,
                zIndex: zPosition.indexOf(name),
            }}
        >
            <motion.img
                src={src}
                className={`w-full h-full pointer-events-none rounded p-2 ${
                    zPosition.indexOf(name) == zPosition.length - 1
                        ? 'bg-slate-600/50'
                        : ''
                }`}
            />
            <div
                className={`inset-0 flex justify-center items-center text-white md:text-base sm:text-sm text-xs text-center rounded w-fit mt-1 px-1 ${
                    zPosition.indexOf(name) == zPosition.length - 1
                        ? 'bg-[#4149CD]'
                        : ''
                }`}
            >
                {name}
            </div>
        </motion.div>
    )
}

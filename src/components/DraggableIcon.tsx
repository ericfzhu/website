import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type DraggableItemProps = {
    name: string
    x: number
    y: number
    zPosition: string[]
    src: string
    onDoubleClick?: () => void,
    moveIconToLast: (name: string) => void
}

export default function DraggableItem({
    name,
    x,
    y,
    zPosition,
    src,
    onDoubleClick,
    moveIconToLast
}: DraggableItemProps) {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })

    useEffect(() => {
        // Calculate initial position based on screen width and height percentages
        const initialX = window.innerWidth < 798 ? window.innerWidth * (x - 0.1) : window.innerWidth * x
        const initialY = window.innerHeight * y
        setPosition({ x: initialX, y: initialY })
    }, [])

    return (
        <motion.div
            initial={position}
            animate={position}
            drag
            onTapStart={() => moveIconToLast(name)}
            dragMomentum={false}
            onDoubleClick={onDoubleClick}
            className="absolute cursor-pointer lg:w-24 lg:h-24 h-14 w-14"
            style={{ x: position.x, y: position.y, zIndex: zPosition.indexOf(name) }}
        >
            <motion.img
                src={src}
                className="w-full h-full pointer-events-none"
            />
            <div className="inset-0 flex justify-center items-center text-white md:text-base sm:text-sm text-xs text-center">
                {name}
            </div>
        </motion.div>
    )
}

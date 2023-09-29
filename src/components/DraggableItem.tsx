import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type DraggableItemProps = {
    name: string
    x: number
    y: number
    src: string
    onDoubleClick?: () => void
}

export default function DraggableItem({
    name,
    x,
    y,
    src,
    onDoubleClick,
}: DraggableItemProps) {
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    })

    useEffect(() => {
        // Calculate initial position based on screen width and height percentages
        const initialX = window.innerWidth * x
        const initialY = window.innerHeight * y
        setPosition({ x: initialX, y: initialY })
    }, [])

    return (
        <motion.div
            initial={position}
            animate={position}
            drag
            dragMomentum={false}
            onDoubleClick={onDoubleClick}
            className="absolute cursor-pointer lg:w-24 lg:h-24 md:h-14 md:w-14 h-6 w-6 rounded-lg"
            style={{ x: position.x, y: position.y }}
        >
            <motion.img
                src={src}
                className="w-full h-full pointer-events-none"
            />
            <div className="inset-0 flex justify-center items-center text-white lg:text-lg md:text-base sm:text-sm text-xs">
                {name}
            </div>
        </motion.div>
    )
}

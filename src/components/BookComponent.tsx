import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface BookProps {
    book: {
        key: string
        title: string
    }
    documentHeight: number
    triggerDrop: boolean
    delay: number
}

export default function BookComponent({ book, triggerDrop, delay }: BookProps) {
    const controls = useAnimation()
    const distanceToBottom = 5000
    const animationDuration = Math.sqrt(distanceToBottom / 1000)

    function dropBook() {
        controls.start({
            y: distanceToBottom,
            transition: {
                delay: delay,
                duration: animationDuration,
                ease: [0.33333, 0, 0.66667, 0.33333],
            },
        })
    }

    useEffect(() => {
        if (triggerDrop) {
            dropBook()
        }
    }, [triggerDrop])

    return (
        <motion.div
            drag
            animate={controls}
            className="m-auto pointer-events-auto bg-black cursor-pointer"
            onDragEnd={(event, info) => {
                dropBook()
            }}
        >
            <Image
                priority
                width="200"
                height="300"
                className="w-48 pointer-events-none ring-1 md:ring-2 ring-black"
                src={`/assets/covers/${book.key}.jpg`}
                alt={book.title}
            />
        </motion.div>
    )
}

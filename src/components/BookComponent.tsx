import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface BookProps {
    book: {
        key: string
        title: string
    }
    triggerDrop: boolean
    delay: number
    darkMode: boolean
}

export default function BookComponent({
    book,
    triggerDrop,
    delay,
    darkMode,
}: BookProps) {
    const controls = useAnimation()
    const distanceToBottom = 50000
    const animationDuration = Math.sqrt(distanceToBottom / 1000)

    useEffect(() => {
        if (triggerDrop) {
            controls.start({
                y: distanceToBottom,
                transition: {
                    delay: delay,
                    duration: animationDuration,
                    ease: [0.33333, 0, 0.66667, 0.33333],
                },
            })
        }
    }, [triggerDrop])

    return (
        <motion.div
            drag
            animate={controls}
            className="m-auto pointer-events-auto cursor-pointer"
            onDragEnd={(event, info) => {
                controls.start({
                    y: distanceToBottom,
                    transition: {
                        duration: animationDuration,
                        ease: [0.33333, 0, 0.66667, 0.33333], // Cubic bezier for gravity
                    },
                })
            }}
        >
            <Image
                width="200"
                height="300"
                className={`w-48 pointer-events-none shadow-lg`}
                src={`/assets/covers/${book.key}_300px.jpg`}
                alt={book.title}
            />
        </motion.div>
    )
}

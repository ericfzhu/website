import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'

interface FallingImageComponentProps {
    image: {
        src: string
        title: string
    }
    triggerDrop: boolean
    delay: number
}

export default function FallingImageComponent({
    image,
    triggerDrop,
    delay,
}: FallingImageComponentProps) {
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
            className="pointer-events-auto cursor-pointer"
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
                className={`pointer-events-none shadow-lg ring-1 ring-secondary min-w-full min-h-full w-fit h-fit`}
                src={image.src}
                alt={image.title}
            />
        </motion.div>
    )
}

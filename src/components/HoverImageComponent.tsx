import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function HoverImageComponent({
    cursorPosition,
    paths,
    className,
    imageClassName,
    children,
    onMouseEnter,
    onMouseLeave,
}: {
    onClick?: () => void
    cursorPosition: { x: number; y: number }
    paths: readonly string[]
    className?: string
    imageClassName?: string
    children: React.ReactNode
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}) {
    const [hover, setHover] = useState(false)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (hover) {
            interval = setInterval(() => {
                setIndex((prevIndex) => (prevIndex + 1) % paths.length);
            }, 500);
        } else {
            setTimeout(() => setIndex(0), 300);
        }
        return () => clearInterval(interval);
    }, [paths, hover]);

    return (
        <span
            className={`cursor-pointer ${className} duration-300 pointer-events-auto`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className={`${hover ? 'z-[5]' : 'z-0'} sticky flex`}
            >
                {children}
            </div>
            {paths.map((path, i) => (
                <Image
                    key={i}
                    src={path}
                    alt="image"
                    height={200}
                    width={300}
                    className={`fixed z-[1] ${hover ? 'opacity-100' : 'opacity-0'} duration-300 transition-opacity -translate-y-1/2 -translate-x-1/2 pointer-events-none ${imageClassName} ${i === index ? 'visible' : 'invisible'}`}
                    style={{
                        top: `${cursorPosition.y}px`,
                        left: `${cursorPosition.x}px`,
                    }}
                />
            ))}
        </span>
    )
}

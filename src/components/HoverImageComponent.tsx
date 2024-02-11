import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function HoverImageComponent({
    cursorPosition,
    path,
    className,
    imageClassName,
    children,
    onMouseEnter,
    onMouseLeave,
}: {
    onClick?: () => void
    cursorPosition: { x: number; y: number }
    path: string[]
    className?: string
    imageClassName?: string
    children: React.ReactNode
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}) {
    const [hover, setHover] = useState(false)
    const [currentPath, setCurrentPath] = useState(path[0])
    useEffect(() => {
        let pathIndex = 0
        const interval = setInterval(() => {
            pathIndex = (pathIndex + 1) % path.length
            setCurrentPath(path[pathIndex])
        }, 500)
        return () => clearInterval(interval)
    }, [path])

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
            <Image
                src={currentPath}
                alt="image"
                height={200}
                width={300}
                className={`fixed z-[1] ${hover ? 'opacity-100' : 'opacity-0'} duration-300 transition-opacity -translate-y-1/2 -translate-x-1/2 pointer-events-none ${imageClassName}`}
                style={{
                    top: `${cursorPosition.y}px`,
                    left: `${cursorPosition.x}px`,
                }}
            />
        </span>
    )
}

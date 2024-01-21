import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { rosarivo } from '@/components/Fonts'

export default function HoverImageComponent({
    text,
    onClick,
    cursorPosition,
    path,
    href,
    className,
    imageClassName,
}: {
    text: string
    onClick?: () => void
    cursorPosition: { x: number; y: number }
    path: string
    href?: string
    className?: string
    imageClassName?: string
}) {
    const [hover, setHover] = useState(false)

    return (
        <span
            className={`cursor-pointer ${className} duration-300 pointer-events-auto relative`}
        >
            {href ? (
                <Link
                    href={href}
                    target="_blank"
                    className={`${hover ? 'z-[5]' : 'z-0'} sticky`}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {text}
                </Link>
            ) : (
                <span
                    onClick={onClick}
                    className={`${hover ? 'z-[5]' : 'z-0'} sticky`}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    {text}
                </span>
            )}
            <Image
                src={path}
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
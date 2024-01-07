import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type DraggableItemProps = {
    name: string
    zPosition: string[]
    src: string
    onDoubleClick?: () => void
    moveItemToLast: (itemname: string) => void
    className?: string
    showName: boolean
    rounded?: boolean
}

export default function Icon({
    name,
    zPosition,
    src,
    onDoubleClick,
    moveItemToLast,
    className,
    showName,
    rounded,
}: DraggableItemProps) {
    return (
        <motion.div
            drag
            onTapStart={(e) => {
                e.stopImmediatePropagation
                moveItemToLast(name)
            }}
            dragMomentum={false}
            onDoubleClick={onDoubleClick}
            className={`icon cursor-pointer lg:w-24 lg:h-24 h-20 w-20 rounded flex items-center flex-col border-2 pointer-events-auto ${
                zPosition.indexOf(name) == zPosition.length - 1
                    ? 'border-white/20'
                    : 'border-transparent'
            } ${className ? className : ''}`}
            style={{
                zIndex: zPosition.indexOf(name),
            }}
        >
            <div
                className={`p-2 rounded ${
                    zPosition.indexOf(name) == zPosition.length - 1
                        ? 'bg-slate-600/50'
                        : ''
                }`}
            >
                <Image
                    height={50}
                    width={50}
                    alt={name}
                    src={src}
                    priority
                    className={`w-full h-full pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] ${
                        rounded ? 'rounded-xl' : ''
                    }`}
                />
            </div>
            <div
                className={`inset-0 flex justify-center items-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-sm sm:text-xs text-xs text-center rounded w-fit mt-1 px-1.5 ${
                    zPosition.indexOf(name) == zPosition.length - 1
                        ? 'bg-[#0359D1]'
                        : ''
                }`}
            >
                {showName ? name : ''}
            </div>
        </motion.div>
    )
}

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MultiIconProps } from '@/components/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function MultiIcon({
    item,
    zPosition,
    src,
    moveItemToLast,
}: MultiIconProps) {
    const [swapIcon, setSwapIcon] = useState<boolean>(false)
    const searchParams = useSearchParams()

    useEffect(() => {
        if (searchParams?.get(item.var) !== null) {
            setSwapIcon(true)
        }
    }, [searchParams])

    return (
        <motion.div
            drag
            onTapStart={(e) => {
                e.stopImmediatePropagation
                moveItemToLast(item.var)
            }}
            dragMomentum={false}
            onDoubleClick={() => {
                setSwapIcon(true)
                item.icon.handleDoubleClick!()
            }}
            className={`icon cursor-pointer xl:w-28 xl:h-28 h-24 w-24 rounded flex items-center flex-col border-2 pointer-events-auto ${
                zPosition.indexOf(item.var) == zPosition.length - 1
                    ? 'border-white/20'
                    : 'border-transparent'
            }`}
            style={{
                zIndex: zPosition.indexOf(item.var),
            }}
        >
            <div
                className={`p-2 rounded ${
                    zPosition.indexOf(item.var) == zPosition.length - 1
                        ? 'bg-slate-600/50'
                        : ''
                }`}
            >
                {swapIcon ? (
                    <Image
                        height={50}
                        width={50}
                        alt={item.name}
                        priority
                        src={src.open}
                        className={`w-full h-full pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] rounded-xl`}
                    />
                ) : (
                    <Image
                        height={50}
                        width={50}
                        alt={item.name}
                        priority
                        src={src.closed}
                        className={`w-full h-full pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] rounded-xl`}
                    />
                )}
            </div>
            <div
                className={`inset-0 flex justify-center items-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-base sm:text-sm text-xs text-center rounded w-fit mt-1 px-1.5 ${
                    zPosition.indexOf(item.var) == zPosition.length - 1
                        ? 'bg-[#0359D1]'
                        : ''
                }`}
            >
                {item.name}
            </div>
        </motion.div>
    )
}

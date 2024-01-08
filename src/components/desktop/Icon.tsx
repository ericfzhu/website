import { motion } from 'framer-motion'
import Image from 'next/image'
import { IconProps } from '@/components/types'

export default function Icon({
    item,
    zPosition,
    onDoubleClick,
    moveItemToLast,
    rounded,
}: IconProps) {
    return (
        <motion.div
            drag
            onTapStart={(e) => {
                e.stopImmediatePropagation
                moveItemToLast(item.var)
            }}
            dragMomentum={false}
            onDoubleClick={onDoubleClick}
            className={`icon cursor-pointer lg:w-24 lg:h-24 h-20 w-20 rounded flex items-center flex-col border-2 pointer-events-auto ${
                zPosition.indexOf(item.var) == zPosition.length - 1
                    ? 'border-white/20'
                    : 'border-transparent'
            } ${item.icon.className ? item.icon.className : ''}`}
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
                <Image
                    height={50}
                    width={50}
                    alt={item.name}
                    src={item.icon.src}
                    priority
                    className={`w-full h-full pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] ${
                        rounded ? 'rounded-xl' : ''
                    }`}
                />
            </div>
            <div
                className={`inset-0 flex justify-center items-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-sm sm:text-xs text-xs text-center rounded w-fit mt-1 px-1.5 ${
                    zPosition.indexOf(item.var) == zPosition.length - 1
                        ? 'bg-[#0359D1]'
                        : ''
                }`}
            >
                {item.icon.showName ? item.name : ''}
            </div>
        </motion.div>
    )
}

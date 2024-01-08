import { motion } from 'framer-motion'
import Image from 'next/image'

type MultiIconProps = {
    name: string
    zPosition: string[]
    src: { open: string; closed: string }
    onDoubleClick?: () => void
    moveItemToLast: (itemname: string) => void
    open: boolean
}

export default function MultiIcon({
    name,
    zPosition,
    src,
    onDoubleClick,
    moveItemToLast,
    open,
}: MultiIconProps) {
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
            }`}
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
                {open ? (
                    <Image
                        height={50}
                        width={50}
                        alt={name}
                        priority
                        src={src.open}
                        className={`w-full h-full pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] rounded-xl`}
                    />
                ) : (
                    <Image
                        height={50}
                        width={50}
                        alt={name}
                        priority
                        src={src.closed}
                        className={`w-full h-full pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] rounded-xl`}
                    />
                )}
            </div>
            <div
                className={`inset-0 flex justify-center items-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-base sm:text-sm text-xs text-center rounded w-fit mt-1 px-1.5 ${
                    zPosition.indexOf(name) == zPosition.length - 1
                        ? 'bg-[#0359D1]'
                        : ''
                }`}
            >
                {name}
            </div>
        </motion.div>
    )
}

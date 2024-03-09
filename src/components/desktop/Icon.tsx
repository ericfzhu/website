import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconProps } from '@/components/types';
import { useScramble } from 'use-scramble';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Icon({ item, zPosition, moveItemToLast, rounded }: IconProps) {
	const [isHovered, setIsHovered] = useState(false);
	const position = zPosition.indexOf(item.var);

	const { ref: textRef } = useScramble({
		text: isHovered && item.hoverName ? item.hoverName : item.name,
		speed: 1,
		tick: 1,
		chance: 0.8,
		overdrive: false,
	});

	return (
		<motion.div
			drag
			onTapStart={(e) => {
				e.stopPropagation();
				moveItemToLast(item.var);
			}}
			dragMomentum={false}
			onDoubleClick={item.icon.handleDoubleClick}
			className={cn(
				'icon cursor-pointer xl:w-24 xl:h-24 h-20 w-20 rounded flex items-center flex-col border-2 pointer-events-auto',
				position == zPosition.length - 1 ? 'border-white/20' : 'border-transparent',
				item.icon.className ? item.icon.className : '',
			)}
			style={{
				zIndex: position,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className={cn('p-2 rounded', position == zPosition.length - 1 ? 'bg-slate-600/50' : '')}>
				<Image
					height={50}
					width={50}
					alt={item.name}
					src={item.icon.src}
					priority
					className={cn('w-full h-full pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]', rounded ? 'rounded-xl' : '')}
				/>
			</div>
			{item.icon.showName && (
				<div
					className={cn(
						'inset-0 flex whitespace-nowrap justify-center items-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] md:text-sm sm:text-xs text-xs text-center rounded w-fit mt-1 px-1.5',
						position == zPosition.length - 1 ? 'bg-[#0359D1]' : '',
					)}
					ref={textRef}
				/>
			)}
		</motion.div>
	);
}

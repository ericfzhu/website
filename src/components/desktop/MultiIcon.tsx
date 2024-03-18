import { motion } from 'framer-motion';
import Image from 'next/image';
import { MultiIconProps } from '@/components/types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useScramble } from 'use-scramble';
import { cn } from '@/lib/utils';

export default function MultiIcon({ item, zPosition, src, moveItemToLast }: MultiIconProps) {
	const [swapIcon, setSwapIcon] = useState<boolean>(false);
	const [isHovered, setIsHovered] = useState(false);
	const searchParams = useSearchParams();
	const position = zPosition.indexOf(item.var);

	const { ref: textRef } = useScramble({
		text: isHovered && item.hoverName ? item.hoverName : item.name,
		speed: 1,
		tick: 1,
		chance: 0.8,
		overdrive: false,
	});

	useEffect(() => {
		if (searchParams?.get(item.var) !== null) {
			setSwapIcon(true);
		}
	}, [searchParams]);

	return (
		<motion.div
			drag
			onTapStart={(e) => {
				e.stopPropagation();
				moveItemToLast(item.var);
			}}
			dragMomentum={false}
			onDoubleClick={() => {
				setSwapIcon(true);
				item.icon.handleDoubleClick!();
			}}
			className={cn(
				'icon pointer-events-auto flex h-20 w-20 cursor-pointer flex-col items-center rounded border-2 xl:h-24 xl:w-24',
				position == zPosition.length - 1 ? 'border-white/20' : 'border-transparent',
			)}
			style={{
				zIndex: position,
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className={cn('rounded p-2', position == zPosition.length - 1 ? 'bg-slate-600/50' : '')}>
				{swapIcon ? (
					<Image
						height={50}
						width={50}
						alt={item.name}
						priority
						src={src.open}
						className={`pointer-events-none h-full w-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]`}
					/>
				) : (
					<Image
						height={50}
						width={50}
						alt={item.name}
						priority
						src={src.closed}
						className={`pointer-events-none h-full w-full drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]`}
					/>
				)}
			</div>
			<div
				className={cn(
					'inset-0 mt-1 flex w-fit items-center justify-center rounded px-1.5 text-center text-xs text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-sm md:text-base',
					position == zPosition.length - 1 ? 'bg-[#0359D1]' : '',
				)}
				ref={textRef}
			/>
		</motion.div>
	);
}

import { IconMinus, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { AbstractWindowProps } from '@/components/types';
import { IconExpand } from '@/components/svg';
import { cn } from '@/lib/utils';

export default function AbstractWindow({ position, item, moveItemToLast, className, windowScale = 1, children }: AbstractWindowProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	function setIsFullscreen(bool: boolean) {
		const newParams = new URLSearchParams(searchParams.toString());
		if (bool) {
			newParams.set('fs', item.var);
		} else {
			newParams.delete('fs');
		}
		router.push('?' + newParams.toString());
	}
	const isFullScreen = searchParams?.get('fs') == item.var;
	const [windowPosition, setWindowPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: window.innerWidth * (window.innerWidth < 798 ? position.x / 3 : position.x),
		y: window.innerHeight * position.y,
	});

	const targetProperties = {
		x: isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x,
		y: isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y,
		height: isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.6) / 1.618) * windowScale,
		width: isFullScreen
			? window.innerWidth * 0.9
			: window.innerWidth < 768
				? window.innerWidth * 0.8
				: Math.max(750, window.innerWidth * 0.6) * windowScale,
	};

	const [lightsHovered, setLightsHovered] = useState(false);

	return (
		<div
			className={cn('absolute', isFullScreen ? 'fixed z-50 h-screen w-screen backdrop-blur-md' : 'pointer-events-none h-full w-full')}
			style={{ zIndex: position.z.indexOf(item.var) + 10 }}>
			<motion.div
				initial={targetProperties}
				animate={targetProperties}
				drag={!isFullScreen}
				onTapStart={() => moveItemToLast(item.var)}
				onDragEnd={(e, info) =>
					setWindowPosition({
						x: info.offset.x + windowPosition.x,
						y: info.offset.y + windowPosition.y,
					})
				}
				dragMomentum={false}
				transition={{ stiffness: 100, transition: 0.3 }}
				className={cn(
					'pointer-events-auto flex flex-col overflow-hidden rounded-lg border border-[#666868] shadow-2xl backdrop-blur-md',
					className,
				)}>
				{/* Traffic lights */}
				<div
					className="absolute z-10 mx-4 my-[18px] flex items-center rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Red */}
					<button
						className={cn(
							'flex h-3 w-3 cursor-default items-center justify-center rounded-full active:bg-[#F59689]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#DF3D35] bg-[#FE5F57]'
								: 'border-[1px] border-accent7 bg-accent',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconX className="stroke-black/50" />}
					</button>
					{/* Yellow */}
					<button
						className={cn(
							'ml-2 flex h-3 w-3 cursor-default items-center justify-center rounded-full active:bg-[#F6F069]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#DE9A10] bg-[#FCBA2B]'
								: 'border-[1px] border-[#A9A8A6] bg-[#CDCCCA]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconMinus className="stroke-black/50" />}
					</button>
					{/* Green */}
					<button
						className={cn(
							'ml-2 flex h-3 w-3 cursor-default items-center justify-center rounded-full active:bg-[#73F776]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#14A620] bg-[#61C555]'
								: 'border-[1px] border-[#A9A8A6] bg-[#CDCCCA]',
						)}
						onClick={() => setIsFullscreen(!isFullScreen)}>
						{lightsHovered && <IconExpand className="fill-black/50" />}
					</button>
				</div>
				{children}
			</motion.div>
		</div>
	);
}

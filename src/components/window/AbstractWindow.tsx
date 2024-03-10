import { IconMinus, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { AbstractWindowProps } from '@/components/types';
import { IconExpand } from '@/components/svg';
import { cn } from '@/lib/utils';

export default function AbstractWindow({ position, item, moveItemToLast, windowClassName, children }: AbstractWindowProps) {
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
		height: isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.6) / 1.618),
		width: isFullScreen ? window.innerWidth * 0.9 : window.innerWidth < 768 ? window.innerWidth * 0.8 : Math.max(750, window.innerWidth * 0.6),
	};

	const [lightsHovered, setLightsHovered] = useState(false);

	return (
		<div
			className={cn('absolute', isFullScreen ? 'fixed w-screen h-screen z-50 backdrop-blur-md' : 'h-full w-full pointer-events-none')}
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
				transition={{ stiffness: 100, transition: 0.5 }}
				className={cn(
					'pointer-events-auto backdrop-blur-md rounded-lg shadow-2xl shadow-black border-[#666868] border flex flex-col overflow-hidden',
					windowClassName,
				)}>
				{/* Traffic lights */}
				<div
					className="absolute flex items-center mx-4 z-10 my-[18px] rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Red */}
					<div
						className={cn(
							'rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F59689]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FE5F57] border-[1px] border-[#DF3D35]' : 'bg-accent border-[1px] border-accent7',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconX className="stroke-black/50" />}
					</div>
					{/* Yellow */}
					<div
						className={cn(
							'rounded-full w-3 h-3 flex justify-center items-center active:bg-[#F6F069] ml-2',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FCBA2B] border-[1px] border-[#DE9A10]' : 'bg-[#CDCCCA] border-[1px] border-[#A9A8A6]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconMinus className="stroke-black/50" />}
					</div>
					{/* Green */}
					<div
						className={cn(
							'rounded-full w-3 h-3 flex justify-center items-center active:bg-[#73F776] ml-2',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#61C555] border-[1px] border-[#14A620]' : 'bg-[#CDCCCA] border-[1px] border-[#A9A8A6]',
						)}
						onClick={() => setIsFullscreen(!isFullScreen)}>
						{lightsHovered && <IconExpand className="fill-black/50" />}
					</div>
				</div>
				{children}
			</motion.div>
		</div>
	);
}

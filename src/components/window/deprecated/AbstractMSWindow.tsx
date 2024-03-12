import { IconMinus, IconRectangle, IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { AbstractWindowProps } from '@/components/types';
import { cn } from '@/lib/utils';

export default function AbstractMSWindow({ item, position, moveItemToLast, className, children }: AbstractWindowProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	function setIsFullscreen(bool: boolean) {
		const newParams = new URLSearchParams(searchParams.toString());
		if (bool) {
			newParams.set(item.var, 'true');
		} else {
			newParams.set(item.var, 'false');
		}
		router.push('?' + newParams.toString());
	}
	const isFullScreen = searchParams?.get(item.var) == 'true';
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
			className={cn('absolute', isFullScreen ? 'fixed inset-0 z-50 backdrop-blur-md' : 'pointer-events-none h-full w-full')}
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
					'pointer-events-auto flex flex-col overflow-hidden border border-[#666868] shadow-2xl shadow-black backdrop-blur-md',
					className,
				)}>
				{/* Traffic lights */}
				<div
					className="absolute right-0 z-10 flex items-center rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Minimize */}
					<div
						className="flex h-8 w-10 items-center justify-center hover:bg-secondary/20 active:opacity-80"
						onClick={() => item.closeWindow?.()}>
						<IconMinus className="stroke-black/50 stroke-1" />
					</div>
					{/* Yellow */}
					<div
						className="flex h-8 w-10 items-center justify-center hover:bg-secondary/20 active:opacity-80"
						onClick={() => setIsFullscreen(!isFullScreen)}>
						<IconRectangle className="w-5 stroke-black/50 stroke-1" />
					</div>
					{/* Close */}
					<div
						className="flex h-8 w-10 items-center justify-center hover:bg-[#FE5F57] active:opacity-80"
						onClick={() => item.closeWindow?.()}>
						<IconX className="stroke-black/50 stroke-1" />
					</div>
				</div>
				{children}
			</motion.div>
		</div>
	);
}

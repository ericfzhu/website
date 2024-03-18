import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { IconX, IconMinus, IconCode } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { IconExpand } from '@/components/svg';
import { WorksComponent } from '@/components';
import { windowProps } from '@/components/types';
import { jetBrainsMono } from '@/components/Fonts';
import { OpenNewWindowComponent } from '@/components/window';

export default function WorksWindow({ item, position, moveItemToLast, cursorPosition }: windowProps & { cursorPosition: { x: number; y: number } }) {
	const [windowPosition, setWindowPosition] = useState<{
		x: number;
		y: number;
	}>({
		x: window.innerWidth * (window.innerWidth < 798 ? position.x / 3 : position.x),
		y: window.innerHeight * position.y,
	});
	const [lightsHovered, setLightsHovered] = useState(false);
	const searchParams = useSearchParams();
	const router = useRouter();
	const setIsFullscreen = useCallback(
		(bool: boolean) => {
			const newParams = new URLSearchParams(searchParams.toString());
			if (bool) {
				newParams.set('fs', item.var);
			} else {
				newParams.delete('fs');
			}
			router.push('?' + newParams.toString());
		},
		[item.var, router, searchParams],
	);
	const isFullScreen = searchParams?.get('fs') == item.var;

	const targetProperties = useMemo(
		() => ({
			x: isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x,
			y: isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y,
			height: isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.6) / 1.618),
			width: isFullScreen
				? window.innerWidth * 0.9
				: window.innerWidth < 768
					? window.innerWidth * 0.8
					: Math.max(750, window.innerWidth * 0.6),
		}),
		[isFullScreen, windowPosition.x, windowPosition.y, window.innerWidth, window.innerHeight],
	);

	return (
		<div
			className={cn(
				'absolute scroll-smooth',
				isFullScreen ? 'fixed z-50 h-screen w-screen backdrop-blur-md' : 'pointer-events-none h-full w-full',
				jetBrainsMono.className,
			)}
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
				className={`pointer-events-auto flex flex-col overflow-hidden rounded-lg border border-[#666868] bg-[#D6D2CB] shadow-2xl backdrop-blur-md @container`}>
				{/* Traffic lights */}
				<div
					className="absolute z-20 mx-4 my-[18px] flex items-center rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Red */}
					<div
						className={cn(
							'flex h-3 w-3 items-center justify-center rounded-full active:bg-[#F59689]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#DF3D35] bg-[#FE5F57]'
								: 'border-[1px] border-[#C5682B] bg-[#E6883C]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconX className="stroke-black/50" />}
					</div>
					{/* Yellow */}
					<div
						className={cn(
							'ml-2 flex h-3 w-3 items-center justify-center rounded-full active:bg-[#F6F069]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#DE9A10] bg-[#FCBA2B]'
								: 'border-[1px] border-[#55667F] bg-[#A9ADB1]',
						)}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconMinus className="stroke-black/50" />}
					</div>
					{/* Green */}
					<div
						className={cn(
							'ml-2 flex h-3 w-3 items-center justify-center rounded-full active:bg-[#73F776]',
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered
								? 'border-[1px] border-[#14A620] bg-[#61C555]'
								: 'border-[1px] border-[#55667F] bg-[#A9ADB1]',
						)}
						onClick={() => setIsFullscreen(!isFullScreen)}>
						{lightsHovered && <IconExpand className="fill-black/50" />}
					</div>
				</div>
				<OpenNewWindowComponent href={'/works'} />
				<WorksComponent
					cursorPosition={{
						x: cursorPosition.x - (isFullScreen ? (window.innerWidth * 1) / 20 : windowPosition.x),
						y: cursorPosition.y - (isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y),
					}}
				/>
			</motion.div>
		</div>
	);
}

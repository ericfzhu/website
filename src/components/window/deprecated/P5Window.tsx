import { useState } from 'react';
import { motion } from 'framer-motion';
import Sketch1, { string as String1 } from '@/components/p5/sketch1';
import Sketch2, { string as String2 } from '@/components/p5/sketch2';
import Sketch3, { string as String3 } from '@/components/p5/sketch3';
import { IconArrowUpRight, IconCode, IconEye, IconMinus, IconPlayerTrackNext, IconX } from '@tabler/icons-react';
import { CodeBlock, atomOneDark } from 'react-code-blocks';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { windowProps } from '@/components/types';
import { IconExpand } from '@/components/svg/IconExpand';

const sketches = [
	{ sketch: Sketch1, name: 'evolution' },
	{ sketch: Sketch2, name: 'flower' },
	{ sketch: Sketch3, name: 'prime' },
];

export default function P5Window({ item, position, moveItemToLast }: windowProps) {
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
	const targetProperties = {
		x: isFullScreen ? window.innerWidth / 2 - window.innerHeight / 2 : windowPosition.x,
		y: isFullScreen ? (window.innerHeight * 1) / 20 : windowPosition.y,
		height: isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.55) / 1.618),
		width: isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.55) / 1.618),
	};
	const sketchKeys = Object.keys(sketches) as Array<keyof typeof sketches>;
	const [activeSketchKey, setActiveSketchKey] = useState(0);
	const [showCode, setShowCode] = useState(false);

	const toggleSketch = () => {
		setActiveSketchKey((activeSketchKey + 1) % sketchKeys.length);
	};

	const ActiveString = [String1, String2, String3][activeSketchKey];
	const ActiveSketch = sketches[activeSketchKey].sketch;
	const ActiveName = sketches[activeSketchKey].name;

	return (
		<div
			className={`absolute ${isFullScreen ? 'fixed z-50 h-screen w-screen backdrop-blur-md' : 'pointer-events-none h-full w-full'}`}
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
				className={`pointer-events-auto flex flex-col overflow-hidden rounded-lg border border-[#666868] bg-black shadow-2xl shadow-black backdrop-blur-md`}>
				{/* Traffic lights */}
				<div
					className="absolute z-10 mx-4 my-[18px] flex items-center rounded-full"
					onMouseEnter={() => setLightsHovered(true)}
					onMouseLeave={() => setLightsHovered(false)}>
					{/* Red */}
					<div
						className={`${
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FE5F57]' : 'bg-accent'
						} flex h-3 w-3 items-center justify-center rounded-full active:bg-[#F59689]`}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconX className="stroke-black/50" />}
					</div>
					{/* Yellow */}
					<div
						className={`${
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#FCBA2B]' : 'bg-slate-500/40'
						} ml-2 flex h-3 w-3 items-center justify-center rounded-full active:bg-[#F6F069]`}
						onClick={() => item.closeWindow!()}>
						{lightsHovered && <IconMinus className="stroke-black/50" />}
					</div>
					{/* Green */}
					<div
						className={`${
							position.z.indexOf(item.var) == position.z.length - 1 || lightsHovered ? 'bg-[#61C555]' : 'bg-slate-500/40'
						} ml-2 flex h-3 w-3 items-center justify-center rounded-full active:bg-[#73F776]`}
						onClick={() => setIsFullscreen(!isFullScreen)}>
						{lightsHovered && <IconExpand className="fill-black/50" />}
					</div>
				</div>
				<div className="absolute right-3 top-3 z-10 flex">
					{/* Next */}
					<Tooltip
						title="Next sketch"
						placement="top"
						arrow
						className={`ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-secondary duration-300 hover:text-white`}
						onClick={() => toggleSketch()}>
						<IconPlayerTrackNext />
					</Tooltip>
					{/* Show sketch */}
					<Tooltip
						title="Show sketch"
						placement="top"
						arrow
						className={`ml-2 flex h-5 w-5 items-center justify-center rounded-full duration-300 hover:text-white ${
							showCode ? 'text-secondary' : 'text-white'
						} cursor-pointer`}
						onClick={() => setShowCode(false)}>
						<IconEye />
					</Tooltip>
					{/* Show code */}
					<Tooltip
						title="Show code"
						placement="top"
						arrow
						className={`ml-2 flex h-5 w-5 items-center justify-center rounded-full duration-300 hover:text-white ${
							showCode ? 'text-white' : 'text-secondary'
						} cursor-pointer`}
						onClick={() => setShowCode(true)}>
						<IconCode />
					</Tooltip>
					{/* Open in new window? */}
					<Tooltip
						title="Open in new window"
						placement="top"
						arrow
						className="ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-secondary duration-300 hover:text-white">
						<Link href={`/processing/${ActiveName}`} target="_blank">
							<IconArrowUpRight />
						</Link>
					</Tooltip>
				</div>

				{/* Window title */}
				<div className="absolute z-0 flex h-12 w-full items-center px-4 py-3">
					<div className="m-auto text-center text-sm text-[#EBEBEB]">{ActiveName}</div>
				</div>
				{showCode ? (
					<div className="overflow-auto bg-[#282D34] p-5">
						<CodeBlock text={ActiveString} language="typescript" theme={atomOneDark} showLineNumbers={false} />
					</div>
				) : (
					<ActiveSketch
						height={isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.55) / 1.618)}
						width={isFullScreen ? window.innerHeight * 0.9 : Math.max(463.5352286774, (window.innerWidth * 0.55) / 1.618)}
					/>
				)}
			</motion.div>
		</div>
	);
}

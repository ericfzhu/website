import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function HoverImageComponent({
	cursorPosition,
	paths,
	className,
	imageClassName,
	children,
	onMouseEnter,
	onMouseLeave,
}: {
	onClick?: () => void;
	cursorPosition: { x: number; y: number };
	paths: readonly string[];
	className?: string;
	imageClassName?: string;
	children: React.ReactNode;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}) {
	const [hover, setHover] = useState(false);
	const [index, setIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleMouseEnter = useCallback(() => {
		setHover(true);
		onMouseEnter?.();
	}, [onMouseEnter]);

	const handleMouseLeave = useCallback(() => {
		setHover(false);
		onMouseLeave?.();
	}, [onMouseLeave]);

	useLayoutEffect(() => {
		if (hover) {
			setIsTransitioning(true);
			intervalRef.current = setInterval(() => {
				setIndex((prevIndex) => (prevIndex + 1) % paths.length);
			}, 400);
		} else {
			setIsTransitioning(false);
			timeoutRef.current = setTimeout(() => setIndex(0), 300);
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [hover, paths]);

	return (
		<span className={`${className} duration-300 pointer-events-auto`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`${hover ? 'z-[5]' : 'z-0'} sticky flex`}>
				{children}
			</div>
			{paths.map((path, i) => (
				<Image
					key={i}
					src={path}
					alt="image"
					height={200}
					width={300}
					className={`fixed z-[1] ${isTransitioning || hover ? 'opacity-100' : 'opacity-0'} h-[35%] max-h-72 w-auto duration-300 transition-opacity -translate-y-1/2 -translate-x-1/2 pointer-events-none ${imageClassName} ${
						i === index ? 'visible' : 'invisible'
					}`}
					style={{
						top: `${cursorPosition.y}px`,
						left: `${cursorPosition.x}px`,
					}}
				/>
			))}
		</span>
	);
}

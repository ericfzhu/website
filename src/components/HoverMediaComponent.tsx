import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

export default function HoverMediaComponent({
	cursorPosition,
	paths,
	className,
	children,
	onMouseEnter,
	onMouseLeave,
}: {
	onClick?: () => void;
	cursorPosition: { x: number; y: number };
	paths: readonly (string | { path: string; type: 'image' | 'video' })[];
	className?: string;
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

	useEffect(() => {
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
		<span className={`pointer-events-auto duration-300`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`${hover ? 'z-[5]' : 'z-0'} sticky flex`}>
				{children}
			</div>
			{paths.map((item, i) => {
				const path = typeof item === 'string' ? item : item.path;
				const type = typeof item === 'string' ? 'image' : item.type;
				if (type === 'video') {
					return (
						<video
							key={i}
							src={path}
							className={cn(
								'pointer-events-none fixed z-[1] h-[35%] max-h-72 w-auto -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300',
								isTransitioning || hover ? 'opacity-100' : 'opacity-0',
								className,
								i === index ? 'visible' : 'invisible',
							)}
							style={{
								top: `${cursorPosition.y}px`,
								left: `${cursorPosition.x}px`,
							}}
							autoPlay
							loop
							muted
						/>
					);
				}

				return (
					<Image
						key={i}
						src={path}
						alt="image"
						height={200}
						width={300}
						className={cn(
							'pointer-events-none fixed z-[1] h-[35%] max-h-72 w-auto -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300',
							isTransitioning || hover ? 'opacity-100' : 'opacity-0',
							className,
							i === index ? 'visible' : 'invisible',
						)}
						style={{
							top: `${cursorPosition.y}px`,
							left: `${cursorPosition.x}px`,
						}}
					/>
				);
			})}
		</span>
	);
}

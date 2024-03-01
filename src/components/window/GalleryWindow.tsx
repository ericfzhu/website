import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AbstractMSWindow, OpenNewWindowComponent } from '@/components/window';
import Link from 'next/link';
import { windowProps } from '@/components/types';

export default function LibraryWindow({ item, position, moveItemToLast }: windowProps) {
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleMouseMove = (e: MouseEvent) => {
		if (containerRef.current) {
			const { left, top, width, height } = containerRef.current.getBoundingClientRect();
			const x = (e.clientX - (left + width / 2)) / (width / 2);
			const y = -(e.clientY - (top + height / 2)) / (height / 2);

			setTilt({ x, y });
		}
	};

	useEffect(() => {
		const container = containerRef.current;

		if (container) {
			container.addEventListener('mousemove', handleMouseMove);
		}
		return () => {
			if (container) {
				container.removeEventListener('mousemove', handleMouseMove);
			}
		};
	}, []);

	return (
		<AbstractMSWindow position={position} item={item} moveItemToLast={moveItemToLast} windowClassName="bg-[#F5F4F0]">
			{/* <OpenNewWindowComponent href="https://industrial---gallery.com" /> */}
			<div className="overflow-auto relative flex flex-grow items-center justify-center" ref={containerRef}>
				<Link href="https://industrial---gallery.com" target="_blank">
					<Image
						src="/assets/icons/industrial---gallery.png"
						alt="IG"
						className="h-52 w-52"
						width={100}
						height={100}
						style={{
							transform: `perspective(1000px) rotateY(${tilt.x * 15}deg) rotateX(${tilt.y * 15}deg)`,
							transition: 'transform 0.1s',
						}}
					/>
				</Link>
			</div>
		</AbstractMSWindow>
	);
}

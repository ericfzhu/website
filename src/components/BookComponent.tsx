import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface BookProps {
	book: {
		key: string;
		title: string;
	};
	documentHeight: number;
	triggerDrop: boolean;
	delay: number;
}

export default function BookComponent({ book, documentHeight, triggerDrop, delay }: BookProps) {
	const controls = useAnimation();

	useEffect(() => {
		if (triggerDrop) {
			const distanceToBottom = documentHeight + 300;
			const animationDuration = Math.sqrt(distanceToBottom / 1000);

			controls.start({
				y: distanceToBottom,
				transition: {
					delay: delay,
					duration: animationDuration,
					ease: [0.33333, 0, 0.66667, 0.33333],
				},
			});
		}
	}, [triggerDrop]);

	return (
		<motion.div
			drag
			animate={controls}
			className="m-auto pointer-events-auto bg-black cursor-pointer"
			onDragEnd={(event, info) => {
				const distanceToBottom = documentHeight * 2;
				const animationDuration = Math.sqrt(distanceToBottom / 1000);
				controls.start({
					y: distanceToBottom,
					transition: {
						duration: animationDuration,
						ease: [0.33333, 0, 0.66667, 0.33333], // Cubic bezier for gravity
					},
				});
			}}>
			<Image priority width="200" height="300" className="w-48 pointer-events-none ring-1 md:ring-2 ring-black" src={`/assets/covers/${book.key}.jpg`} alt={book.title} />
		</motion.div>
	);
}

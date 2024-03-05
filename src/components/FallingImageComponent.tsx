import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';
import { memo } from 'react';

interface FallingImageComponentProps {
	image: {
		src: string;
		title: string;
	};
	triggerDrop: boolean;
	delay: number;
	onClick?: () => void;
	noGrayscale?: boolean;
}

function FallingImageComponent({ image, triggerDrop, delay, onClick, noGrayscale = false }: FallingImageComponentProps) {
	const controls = useAnimation();
	const distanceToBottom = 50000;
	const animationDuration = Math.sqrt(distanceToBottom / 1000);

	useEffect(() => {
		if (triggerDrop) {
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
			// drag
			dragMomentum={false}
			animate={controls}
			className={`pointer-events-auto ${onClick ? 'cursor-pointer' : noGrayscale ? '' : 'grayscale-[70%]'}`}
			// onDragEnd={(event, info) => {
			//     controls.start({
			//         y: distanceToBottom,
			//         transition: {
			//             duration: animationDuration,
			//             ease: [0.33333, 0, 0.66667, 0.33333], // Cubic bezier for gravity
			//         },
			//     })
			// }}
			onClick={onClick}>
			<Image
				width="200"
				height="300"
				className={`pointer-events-none shadow-lg border-[1px] border-secondary/20 min-w-full min-h-full w-fit h-fit`}
				src={image.src}
				alt=""
			/>
		</motion.div>
	);
}

export default memo(FallingImageComponent);

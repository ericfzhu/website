import { motion, useAnimation } from 'framer-motion';
import { useEffect, memo } from 'react';
import Image from 'next/image';

function FallingImageComponent({
	image,
	triggerDrop,
	delay,
	onClick,
}: {
	image: {
		src: string;
		title: string;
	};
	triggerDrop: boolean;
	delay: number;
	onClick?: () => void;
}) {
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
			className={`pointer-events-auto ${onClick ? 'cursor-pointer' : ''}`}
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
				className={`pointer-events-none shadow-lg border-[1px] border-[#8E8E8E]/20 min-w-full min-h-full w-fit h-fit`}
				src={image.src}
				alt=""
			/>
		</motion.div>
	);
}

export default memo(FallingImageComponent);

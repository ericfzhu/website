import dynamic from 'next/dynamic';
const ReactP5Wrapper = dynamic(() => import('@p5-wrapper/react').then((mod) => mod.ReactP5Wrapper), {
	ssr: false,
});
import { Sketch, SketchProps } from '@p5-wrapper/react';

type P5Props = SketchProps & {
	canvasHeight: number;
	canvasWidth: number;
};

const sketch: Sketch<P5Props> = (p5) => {
	let t = 1;
	let n = 100000;
	let canvasHeight = window.innerHeight;
	let canvasWidth = window.innerWidth;
	let heightRatio = canvasHeight / 540;
	let widthRatio = canvasWidth / 540;
	let p = new Array(n).fill(0);

	for (let i = 2; i < n; i++) {
		if (p[i] === 0) {
			for (let j = i * 2; j < n; j += i) {
				if (p[j] === 0) {
					p[j] = i;
				}
			}
		}
	}

	p5.setup = () => {
		p5.createCanvas(canvasWidth, canvasHeight);
	};

	p5.updateWithProps = (props: { canvasHeight: number; canvasWidth: number }) => {
		if (props.canvasHeight) {
			canvasHeight = props.canvasHeight;
		}
		if (props.canvasWidth) {
			canvasWidth = props.canvasWidth;
		}
		heightRatio = canvasHeight / 540;
		widthRatio = canvasWidth / 540;
		p5.resizeCanvas(canvasWidth, canvasHeight);
	};

	p5.windowResized = () => {
		canvasHeight = window.innerHeight;
		canvasWidth = window.innerWidth;
		heightRatio = canvasHeight / 540;
		widthRatio = canvasWidth / 540;
		p5.resizeCanvas(canvasWidth, canvasHeight);
	};

	p5.draw = () => {
		p5.background(0, 6);

		for (let i = 2; i < n; i++) {
			if (p[i] === 0) {
				p5.stroke('white');
				p5.point((i * p5.sin(i * t)) / (50 / widthRatio) + widthRatio * 270, (i * p5.cos(i * t)) / (50 / heightRatio) + heightRatio * 270, 2);
			}
		}
		t += 1e-7;
	};
};

export default function P5({ height, width }: { height?: number; width?: number }) {
	return <ReactP5Wrapper sketch={sketch} canvasHeight={height} canvasWidth={width} />;
}

export const string = `
import { Sketch, SketchProps } from '@p5-wrapper/react'

type P5Props = SketchProps & {
    canvasHeight: number
    canvasWidth: number
}

const sketch: Sketch<P5Props> = (p5) => {
    let t = 1
    let n = 100000
    let canvasHeight = window.innerHeight
    let canvasWidth = window.innerWidth
    let heightRatio = canvasHeight / 540
    let widthRatio = canvasWidth / 540
    let p = new Array(n).fill(0)

    for (let i = 2; i < n; i++) {
        if (p[i] === 0) {
            for (let j = i * 2; j < n; j += i) {
                if (p[j] === 0) {
                    p[j] = i
                }
            }
        }
    }

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
    }

    p5.updateWithProps = (props: {
        canvasHeight: number
        canvasWidth: number
    }) => {
        if (props.canvasHeight) {
            canvasHeight = props.canvasHeight
        }
        if (props.canvasWidth) {
            canvasWidth = props.canvasWidth
        }
        heightRatio = canvasHeight / 540
        widthRatio = canvasWidth / 540
        p5.resizeCanvas(canvasWidth, canvasHeight)
    }

    p5.windowResized = () => {
        canvasHeight = window.innerHeight
        canvasWidth = window.innerWidth
        heightRatio = canvasHeight / 540
        widthRatio = canvasWidth / 540
        p5.resizeCanvas(canvasWidth, canvasHeight)
    }

    p5.draw = () => {
        p5.background(0, 6)

        for (let i = 2; i < n; i++) {
            if (p[i] === 0) {
                p5.stroke('white')
                p5.point(
                    (i * p5.sin(i * t)) / (50 / widthRatio) + widthRatio * 270,
                    (i * p5.cos(i * t)) / (50 / heightRatio) +
                        heightRatio * 270,
                    2
                )
            }
        }
        t += 1e-7
    }
}

export default function P5({
    height,
    width,
}: {
    height?: number
    width?: number
}) {
    return (
        <ReactP5Wrapper
            sketch={sketch}
            canvasHeight={height}
            canvasWidth={width}
        />
    )
}
`;

import p5Types from  "p5";
import { useState } from "react";
import dynamic from 'next/dynamic'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
    ssr: false,
})

export default function P5({canvasHeight, canvasWidth}: {canvasHeight: number, canvasWidth: number}) {
    const [vectors, setVectors] = useState<p5Types.Vector[]>([]);
    const [time, setTime] = useState(0);

    const heightRatio = canvasHeight / 540;
    const widthRatio = canvasWidth / 540;

    
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    }

    const draw = (p5: p5Types) => {
        setTime(t => t + 1);
        p5.background(0, 14);
        const newVectors = vectors.slice(-5000);

        // create for loop to add new vectors
        for (let i = 0; i < 15; i++) {
            newVectors.push(p5.createVector(
                p5.random(-1, 1),
                p5.random(-1, 1),
                p5.random(-1, 1)
            ));
        }

        newVectors.map(vector => {
            const k = vector.x * 4 + 2 ^ vector.y * 4 | 2 + vector.z * 4;
            const r = ((vector.x * 2 * (k) ^ vector.y * k + time / 299) & 1) * 2 - 1;
            vector.x += p5.sin(r) / 99 * vector.z;
            vector.y += p5.cos(r) / 99 * vector.z;
            p5.stroke(255, 96);
            p5.point(vector.x * (widthRatio * 109) + (widthRatio * 270), vector.y * (heightRatio * 109) + (heightRatio * 270));
            return vector;
        });

        setVectors(newVectors);
      };

    

    return <Sketch setup={setup} draw={draw} />;
}
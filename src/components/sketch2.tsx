import dynamic from 'next/dynamic'
const ReactP5Wrapper = dynamic(
    () => import('@p5-wrapper/react').then((mod) => mod.ReactP5Wrapper),
    {
        ssr: false,
    }
)
import { Sketch, SketchProps } from '@p5-wrapper/react'

type P5Props = SketchProps & {
    canvasHeight: number
    canvasWidth: number
}

const sketch: Sketch<P5Props> = (p5) => {
    let vectors: { x: number; y: number; z: number }[] = []
    let time = 0
    let canvasHeight = window.innerHeight
    let canvasWidth = window.innerWidth
    let heightRatio = canvasHeight / 540
    let widthRatio = canvasWidth / 540

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight)
    }

    p5.windowResized = () => {
        canvasHeight = window.innerHeight
        canvasWidth = window.innerWidth
        heightRatio = canvasHeight / 540
        widthRatio = canvasWidth / 540
        p5.resizeCanvas(canvasWidth, canvasHeight)
    }

    p5.draw = () => {
        time++
        p5.background(0, 6)

        vectors = [
            ...vectors.slice(-3000),
            ...Array.from({ length: 15 }, () =>
                p5.createVector(
                    p5.random(-1, 1),
                    p5.random(-1, 1),
                    p5.random(-1, 1)
                )
            ),
        ]

        vectors.forEach((v, i) => {
            const r =
                4 +
                9 /
                    p5.sin(
                        Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) * 4 -
                            time / 99
                    )
            v.x += (p5.sin(v.y * r) / i) * 9
            v.y += (p5.cos(r * v.x) / i) * 9

            p5.stroke((i % 15) * 17, (i % 5) * 51, (i % 10) * 26)
            p5.point(
                v.x * (widthRatio * 109) + widthRatio * 270,
                v.y * (heightRatio * 109) + heightRatio * 270
            )
        })
    }
}

export default function P5() {
    return <ReactP5Wrapper sketch={sketch} />
}

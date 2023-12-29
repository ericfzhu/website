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
        time++
        p5.background(0, 14)

        vectors = [
            ...vectors.slice(-5000),
            ...Array.from({ length: 15 }, () =>
                p5.createVector(
                    p5.random(-1, 1),
                    p5.random(-1, 1),
                    p5.random(-1, 1)
                )
            ),
        ]

        vectors.forEach((vector) => {
            const k = ((vector.x * 4 + 2) ^ (vector.y * 4)) | (2 + vector.z * 4)
            const r =
                (((vector.x * 2 * k) ^ (vector.y * k + time / 299)) & 1) * 2 - 1
            vector.x += (p5.sin(r) / 99) * vector.z
            vector.y += (p5.cos(r) / 99) * vector.z
            p5.stroke('white')
            p5.point(
                vector.x * (widthRatio * 109) + widthRatio * 270,
                vector.y * (heightRatio * 109) + heightRatio * 270
            )
        })
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

export const string = `
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
        time++
        p5.background(0, 14)

        vectors = [
            ...vectors.slice(-5000),
            ...Array.from({ length: 15 }, () =>
                p5.createVector(
                    p5.random(-1, 1),
                    p5.random(-1, 1),
                    p5.random(-1, 1)
                )
            ),
        ]

        vectors.forEach((vector) => {
            const k = ((vector.x * 4 + 2) ^ (vector.y * 4)) | (2 + vector.z * 4)
            const r =
                (((vector.x * 2 * k) ^ (vector.y * k + time / 299)) & 1) * 2 - 1
            vector.x += (p5.sin(r) / 99) * vector.z
            vector.y += (p5.cos(r) / 99) * vector.z
            p5.stroke('white')
            p5.point(
                vector.x * (widthRatio * 109) + widthRatio * 270,
                vector.y * (heightRatio * 109) + heightRatio * 270
            )
        })
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
`
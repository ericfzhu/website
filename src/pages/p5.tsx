import P5 from "@/components/P5";
import { useEffect, useState } from "react";

export default function p5() {
    const [canvasHeight, setCanvasHeight] = useState(500);
    const [canvasWidth, setCanvasWidth] = useState(500);

    useEffect(() => {
        setCanvasHeight(window.innerHeight);
        setCanvasWidth(window.innerWidth);
    }, []);

    return (
        <div className="w-screen h-screen bg-black">
            <P5 canvasHeight={canvasHeight} canvasWidth={canvasWidth}/>
        </div>
    );
}
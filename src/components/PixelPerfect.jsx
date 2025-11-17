import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIXEL_COLORS = ["red", "lime", "blue"];
const GRID_SIZE = 60;
const PIXEL_GAP = 7;

export default function PixelPerfect() {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let pixelUnitSize = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const w = canvas.width;
            const h = canvas.height;

            const fullUnitSize = 5 + PIXEL_GAP; 
            const totalGridUnits = (GRID_SIZE * fullUnitSize) - PIXEL_GAP; 
        
            const viewportMax = Math.max(w, h);
            pixelUnitSize = Math.floor(viewportMax / totalGridUnits) + 1;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const drawPixels = (progress) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;

            const initialScale = 95;  
            const finalScale = 1;
            const scale = gsap.utils.interpolate(initialScale, finalScale, progress);

            ctx.save();
            ctx.translate(cx, cy);
            ctx.scale(scale, scale);
            ctx.translate(-cx, -cy);

            const totalPixelSize = pixelUnitSize * 5;
            const gap = pixelUnitSize * PIXEL_GAP;
            const fullSize = totalPixelSize + gap;

            const gridWidth = GRID_SIZE * fullSize - gap;
            const gridHeight = GRID_SIZE * fullSize - gap;
            const startX = cx - gridWidth / 2;
            const startY = cy - gridHeight / 2;

            for (let row = 0; row < GRID_SIZE; row++) {
                for (let col = 0; col < GRID_SIZE; col++) {
                    const x = startX + col * fullSize;
                    const y = startY + row * fullSize;
                    PIXEL_COLORS.forEach((color, i) => {
                        ctx.fillStyle = color;
                        const barWidth = totalPixelSize / 3;
                        const barX = x + i * barWidth;
                        ctx.fillRect(barX, y, barWidth, totalPixelSize);
                    });
                }
            }

            ctx.restore();
            ctx.globalAlpha = 1;
        };

        const animationVars = {progress: 0};
        const draw = () => drawPixels(animationVars.progress);
        gsap.ticker.add(draw);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
            },
        });

        tl.to(animationVars, {
            progress: 1,
            ease: "power2.inOut",
            duration: 1.2,
        });

        tl.to(
            canvas,
            {
                opacity: 0,
                ease: "power2.out",
                duration: 0.6,
            },
            ">-0.5"
        );

        tl.fromTo(
            textRef.current,
            {
                scale: 80,
                transformOrigin: "center center",
            }, {
                scale: 1,
                ease: "power2.out",
                duration: 0.7,
            },
            ">+0.3"
        );

        return () => {
            tl.kill();
            gsap.ticker.remove(draw);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <section id="pixel-perfect" ref={sectionRef}>
            <canvas ref={canvasRef}/>
            <div>
                <h1 ref={textRef}>
                    <span>I'm</span>{" "}
                    <span>a</span>{" "}
                    <span>pixel<br/>perfectionist</span>
                </h1>
            </div>
        </section>
        
    );
}

import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIXEL_COLORS = ["red", "lime", "blue"];
const GRID_SIZE = 50; 
const PIXEL_GAP = 5;

function PixelPerfect() {
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
            const viewportMin = Math.min(w, h);
            const totalGridUnits = GRID_SIZE * 3 + (GRID_SIZE - 1) * PIXEL_GAP;
            pixelUnitSize = Math.floor((viewportMin * 1.2) / totalGridUnits);
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

            const alphaFade = 1 - gsap.utils.clamp(0, 1, (progress - 0.8) * 4);
            ctx.globalAlpha = alphaFade;

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

        const animationVars = { progress: 0 };
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

        tl.fromTo(
            textRef.current,
            {
                scale: 80,
                transformOrigin: "center center",
            },
            {
                scale: 1,
                ease: "power2.out",
                duration: 1.2,
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
        <section id="pixel-perfect" ref={sectionRef} className="relative w-screen
        h-screen overflow-hidden">
            <canvas ref={canvasRef} className="fixed top-0 left-0 z-10 w-full h-full"/>
            <div className="absolute inset-0 flex items-center justify-center z-20
            pointer-events-none overflow-hidden">
                <h1 ref={textRef} className="text-white font-semibold text-center
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                    <span>I'm</span>{" "}
                    <span>a</span>{" "}
                    <span>pixel<br />perfectionist</span>
                </h1>
            </div>
        </section>
    );
}

export default PixelPerfect;
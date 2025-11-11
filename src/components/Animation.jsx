import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Animation() {
    const sectionRef = useRef(null);
    const squaresRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const squares = squaresRef.current.filter(el => el != null);
            const reversedSquares = [...squares].reverse();

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "center center", 
                    end: "bottom top",
                    scrub: 1,
                    pin: true,
                },
            });

            reversedSquares.forEach((square, i) => {
                const rotation = -360; 
                const scale = 24; 

                tl.to(
                    square, {
                        rotate: rotation,
                        scale: scale,
                        opacity: 0,
                        duration: 1, 
                        ease: "power1.inOut",
                    }, i * 0.10
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="animation">
            {[
                "border-rose-600",
                "border-rose-700",
                "border-rose-800",
                "border-rose-900",
                "border-[#710033]",
            ].map((color, i) => (
                <div key={i} ref={(e) => (squaresRef.current[i] = e)} 
                className={`${color}`}
                style={{
                    width: `${7 + i * 7}rem`,
                    height: `${7 + i * 7}rem`,
                    zIndex: 10 - i, 
                }}/>
            ))}
            <h1>With best in class <br/> animation skills.</h1>
        </section>
    );
}

export default Animation;

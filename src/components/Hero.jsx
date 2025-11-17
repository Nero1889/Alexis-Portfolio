import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";

export default function Hero() {
    const titleRef = useRef(null);

    useEffect(() => {
        const spans = titleRef.current.querySelectorAll("span");

        gsap.fromTo( 
            spans,
            {opacity: 0, y: 40},
            {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power3.out",
                stagger: 0.15,
            }
        );
    }, []);

    return (
        <section id="hero">
            <p>
                <span>Meet</span>{" "}
                <span>Alexis...</span>
            </p>

            <h1 ref={titleRef}>
                <span>FRONT</span>{" "}
                <span>END</span><br/>
                <span>WEB</span>{" "}
                <span>DEVELOPER.</span>
            </h1>

            <div className="arrow">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bar" />
                ))}
            </div>
        </section>
    );
}

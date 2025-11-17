import React, {useState, useRef, useEffect} from "react";
import {gsap} from "gsap";
import menu from "/icons/menu.png";

export default function Priority() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navRef = useRef(null);
    const tl = useRef(null);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        tl.current = gsap.timeline({paused: true})
            .fromTo(
                navRef.current,
                { 
                    opacity: 0,
                    scale: 0.95,
                    transformOrigin: "top right",
                    display: "none",
                }, {
                    opacity: 1,
                    scale: 1,
                    display: "block",
                    duration: 0.1,
                    ease: "power3.out",
                }
            );
    }, []);

    useEffect(() => {
        isOpen ? tl.current.play() : tl.current.reverse();
    }, [isOpen]);

    return (
        <header>
            <div ref={menuRef}>
                <img src={menu} alt="Menu" draggable="false" onClick={toggleMenu}/>

                <nav ref={navRef}>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#work">Work</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

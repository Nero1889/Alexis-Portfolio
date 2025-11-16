import React, {useState, useRef, useEffect} from "react";
import menu from "/icons/menu.png";

export default function Priority() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        
    }, [menuRef]);

    return (
        <header>
            <div ref={menuRef}> 
                <img src={menu} alt="Menu" draggable="false"
                onClick={toggleMenu}/>
                        
                {isOpen && (
                    <nav>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#work">Work</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}

import {useState} from "react";
import menu from "/icons/menu.png";
import close from "/icons/close.png";
import {navigation} from "../constants/main.js";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className={isOpen ? "nav-open" : ""}>
            <img src={menu} alt="Menu" draggable="false" onClick={toggleMenu}/>
                    
            <nav className={isOpen ? "is-open" : ""}> 
                <ul>
                    <img src={close} alt="Close" draggable="false"
                    onClick={toggleMenu}/>
                    <hr/>
                    {navigation.map(({name, href}) => (
                        <li key={name}>
                            <a href={href} onClick={toggleMenu}>{name}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
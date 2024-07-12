import React, { useState } from "react";
import { Link } from 'react-router-dom';
import HakuKentta from "../HakuKentta/HakuKentta";
import "./TopBar.css";


const TopBar = () => {


  const [menuOpen, setMenuOpen] = useState(false);

    return (
    <>
        <div className="topBar">
            <div className="topBar-content">
            <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            <div className={`menu ${menuOpen ? 'open' : ''}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Kaikki ajot</Link>
                <Link to="/ei-aloitetut" onClick={() => setMenuOpen(false)}>Ei aloitetut</Link>
                <Link to="/aloitetut" onClick={() => setMenuOpen(false)}>Aloitetut</Link>
                <Link to="/suoritetut" onClick={() => setMenuOpen(false)}>Suoritetut</Link>
            </div>
            <div className="hakuKentta">
                <HakuKentta/>
            </div>
        </div>
        </div>
    </>
    )
}

export default TopBar;
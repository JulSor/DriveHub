import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./TopBar.css";


const TopBar = ({ ajot, setFilteredAjot }) => {


  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredAjot = ajot.filter(ajo =>
      ajo.nimi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ajo.paivamaara.includes(searchTerm) ||
      ajo.tapahtumanTyyppi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ajo.kohde.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ajo.lisaTiedot.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAjot(filteredAjot);
  }, [searchTerm, ajot, setFilteredAjot]);

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
                <input
                    type="text"
                    placeholder="Hae ajoja..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
        </div>
        </div>
    </>
    )
}

export default TopBar;
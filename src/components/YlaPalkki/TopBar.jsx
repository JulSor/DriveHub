// import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import './TopBar.css';

// const TopBar = ({ ajot, setFilteredAjot }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const filteredAjot = ajot.filter(ajo =>
//       ajo.nimi.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ajo.paivamaara.includes(searchTerm) ||
//       ajo.tapahtumanTyyppi.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ajo.kohde.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       ajo.lisaTiedot.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredAjot(filteredAjot);
//   }, [searchTerm, ajot, setFilteredAjot]);

//   return (
//     <div className="topBar">
//       <div className="topBar-content">
//         <div className="topBar-content-left">
//             <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
//             ☰
//             </div>
//             <div className={`menu ${menuOpen ? 'open' : ''}`}>
//             <Link to="/" onClick={() => setMenuOpen(false)}>Kaikki ajot</Link>
//             <Link to="/ei-aloitetut" onClick={() => setMenuOpen(false)}>Ei aloitetut</Link>
//             <Link to="/aloitetut" onClick={() => setMenuOpen(false)}>Aloitetut</Link>
//             <Link to="/suoritetut" onClick={() => setMenuOpen(false)}>Suoritetut</Link>
//             <Link to="/tankkaukset" onClick={() => setMenuOpen(false)}>Tankkaukset</Link>
//             </div>
//         </div>
//         <div className="topBar-content-right">
//           <Link to="/lisaa-ajo" className="add-button">+</Link>
//           <input
//             type="text"
//             placeholder="Hae ajoja..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopBar;

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './TopBar.css';

const TopBar = ({ ajot, setFilteredAjot }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredAjot = ajot.filter(ajo => {
      const nimi = ajo.nimi ? ajo.nimi.toLowerCase() : '';
      const tilausNro = ajo.tilausNro ? ajo.tilausNro.toLowerCase() : '';
      const paivamaara = ajo.paivamaara ? ajo.paivamaara : '';
      const tapahtumanTyyppi = ajo.tapahtumanTyyppi ? ajo.tapahtumanTyyppi.toLowerCase() : '';
      const kohde = ajo.kohde ? (typeof ajo.kohde === 'string' ? ajo.kohde.toLowerCase() : ajo.kohde.toString()) : '';
      const lisaTiedot = ajo.lisaTiedot ? ajo.lisaTiedot.toLowerCase() : '';

      return (
        nimi.includes(searchTerm.toLowerCase()) ||
        tilausNro.includes(searchTerm) ||
        paivamaara.includes(searchTerm) ||
        tapahtumanTyyppi.includes(searchTerm.toLowerCase()) ||
        kohde.includes(searchTerm.toLowerCase()) ||
        lisaTiedot.includes(searchTerm.toLowerCase())
      );
    });
    setFilteredAjot(filteredAjot);
  }, [searchTerm, ajot, setFilteredAjot]);

  return (
    <div className="topBar">
      <div className="topBar-content">
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Kaikki tilaukset</Link>
          <Link to="/ei-aloitetut" onClick={() => setMenuOpen(false)}>Kerättävät</Link>
          <Link to="/keratyt" onClick={() => setMenuOpen(false)}>Kerätyt</Link>
          <Link to="/toimitetut" onClick={() => setMenuOpen(false)}>Toimitetut</Link>
          <Link to="/tankkaukset" onClick={() => setMenuOpen(false)}>Tankkaukset</Link>
        </div>
        <div className="topBar-content-right">
          <Link to="/lisaa-ajo" className="add-button">+</Link>
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
  );
};

export default TopBar;

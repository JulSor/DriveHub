import React, { useState } from 'react';
import KaikkiAjot from '../KaikkiAjot/KaikkiAjot.jsx';
import '../KaikkiAjot/KaikkiAjot.css';

const HakuKentta = ({ searchTerm, setSearchTerm }) => {
  // const [searchTerm, setSearchTerm] = useState('');

  // const filteredAjot = ajot.filter(ajo =>
  //   ajo.nimi.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   ajo.paivamaara.includes(searchTerm) ||
  //   ajo.tapahtumanTyyppi.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   ajo.kohde.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   ajo.lisaTiedot.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="hakukentta">
        <input
          type="text"
          placeholder="Hae ajoja..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* <KaikkiAjot ajot={filteredAjot} muutaStatus={muutaStatus} /> */}
    </div>
  );
};

export default HakuKentta;

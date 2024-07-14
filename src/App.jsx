import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import KaikkiAjot from './components/KaikkiAjot/KaikkiAjot.jsx';
import AloitetutAjot from './components/AloitetutAjot/AloitetutAjot.jsx';
import EiAloitetutAjot from './components/EiAloitetutAjot/EiAloitetutAjot.jsx';
import SuoritetutAjot from './components/SuoritetutAjot/SuoritetutAjot.jsx';
import LisaaAjo from './components/LisaaAjo/LisaaAjo.jsx';
import Ajot from './components/Ajot'; // tuo ajotiedot
import NoPage from './components/NoPage';
import TopBar from './components/YlaPalkki/TopBar.jsx';
import Tankkaukset from './components/Tankkaukset/Tankkaukset.jsx';
import './App.css';

const App = () => {
  const [ajot, setAjot] = useState(Ajot);
  const [filteredAjot, setFilteredAjot] = useState(ajot);

  const lisaaAjo = (paivamaara, tapahtumanTyyppi, kohde, kollienMaara, lisaTiedot) => {
    const uusiAjo = {
      id: ajot.length + 1,
      nimi: `${tapahtumanTyyppi} ${ajot.length + 1}`,
      paivamaara,
      tapahtumanTyyppi,
      kohde,
      kollienMaara,
      lisaTiedot,
      status: 'Ei aloitettu'
    };
    const updatedAjot = [...ajot, uusiAjo];
    setAjot(updatedAjot);
    setFilteredAjot(updatedAjot);
  };

  const muutaStatus = (id, uusiStatus) => {
    const updatedAjot = ajot.map((ajo) =>
      ajo.id === id ? { ...ajo, status: uusiStatus } : ajo
    );
    setAjot(updatedAjot);
    setFilteredAjot(updatedAjot);
  };

  const filteredAjotWithoutTankkaus = filteredAjot.filter(ajo => ajo.tapahtumanTyyppi !== 'Tankkaus');
  const tankkausAjot = filteredAjot.filter(ajo => ajo.tapahtumanTyyppi === 'Tankkaus');

  return (
    <Router>
      <div className="container">
        <TopBar ajot={ajot} setFilteredAjot={setFilteredAjot} />
        {/* <PageButtons /> */}
        <Routes>
          <Route path="/" element={<KaikkiAjot ajot={filteredAjotWithoutTankkaus} muutaStatus={muutaStatus} />} />
          <Route path="/ei-aloitetut" element={<EiAloitetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Ei aloitettu')} muutaStatus={muutaStatus} />} />
          <Route path="/aloitetut" element={<AloitetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Aloitettu')} muutaStatus={muutaStatus} />} />
          <Route path="/suoritetut" element={<SuoritetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Suoritettu')} />} />
          <Route path="/tankkaukset" element={<Tankkaukset ajot={tankkausAjot} muutaStatus={muutaStatus} />} />
          <Route path="/lisaa-ajo" element={<LisaaAjo lisaaAjo={lisaaAjo} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;

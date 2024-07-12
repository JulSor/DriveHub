import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import KaikkiAjot from './components/KaikkiAjot/KaikkiAjot.jsx';
import AloitetutAjot from './components/AloitetutAjot/AloitetutAjot.jsx';
import EiAloitetutAjot from './components/EiAloitetutAjot/EiAloitetutAjot.jsx';
import SuoritetutAjot from './components/SuoritetutAjot/SuoritetutAjot.jsx';
import LisaaAjo from './components/LisaaAjo/LisaaAjo.jsx';
import HakuKentta from './components/HakuKentta/HakuKentta.jsx';
import Ajot from './components/Ajot'; // tuo ajotiedot
import NoPage from './components/NoPage';
import PageButtons from './components/PageButtons.jsx';
import TopBar from './components/YlaPalkki/TopBar.jsx';
import './App.css';

const App = () => {
  // const [ajot, setAjot] = useState([
  //   { id: 1, nimi: 'Ajo 1', paivamaara: '01.07.2024', tapahtumanTyyppi: 'Kuljetus', kohde: 'Kohde 1', kollienMaara: 10, lisaTiedot: "", status: 'Ei aloitettu' },
  //   { id: 2, nimi: 'Ajo 2', paivamaara: '02.07.2024', tapahtumanTyyppi: 'Tankkaus', kohde: 'Kohde 2', kollienMaara: 0, lisaTiedot: "", status: 'Aloitettu' },
  //   { id: 3, nimi: 'Ajo 3', paivamaara: '03.07.2024', tapahtumanTyyppi: 'Kuljetus', kohde: 'Kohde 3', kollienMaara: 20, lisaTiedot: "", status: 'Suoritettu' },
  // ]);
  const [ajot, setAjot] = useState(Ajot);
  const [searchTerm, setSearchTerm] = useState('');

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
    setAjot([...ajot, uusiAjo]);
  };

  const muutaStatus = (id, uusiStatus) => {
    setAjot(
      ajot.map((ajo) =>
        ajo.id === id ? { ...ajo, status: uusiStatus } : ajo
      )
    );
  };

  const filteredAjot = ajot.filter(ajo =>
    ajo.nimi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ajo.paivamaara.includes(searchTerm) ||
    ajo.tapahtumanTyyppi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ajo.kohde.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ajo.lisaTiedot.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="container">
        <TopBar/>
        <PageButtons/>
        <Routes>
          <Route path="/" element={<KaikkiAjot ajot={filteredAjot} muutaStatus={muutaStatus} />} />
          <Route path="/ei-aloitetut" element={<EiAloitetutAjot ajot={filteredAjot.filter(ajo => ajo.status === 'Ei aloitettu')} muutaStatus={muutaStatus} />} />
          <Route path="/aloitetut" element={<AloitetutAjot ajot={filteredAjot.filter(ajo => ajo.status === 'Aloitettu')} muutaStatus={muutaStatus} />} />
          <Route path="/suoritetut" element={<SuoritetutAjot ajot={filteredAjot.filter(ajo => ajo.status === 'Suoritettu')} />} />
          <Route path="/lisaa-ajo" element={<LisaaAjo lisaaAjo={lisaaAjo} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

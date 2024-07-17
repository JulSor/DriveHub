import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KaikkiAjot from '../KaikkiAjot/KaikkiAjot.jsx';
import AloitetutAjot from '../AloitetutAjot/AloitetutAjot.jsx';
import EiAloitetutAjot from '../EiAloitetutAjot/EiAloitetutAjot.jsx';
import SuoritetutAjot from '../SuoritetutAjot/SuoritetutAjot.jsx';
import LisaaAjo from '../LisaaAjo/LisaaAjo.jsx';
import NoPage from '../NoPage.jsx';
import TopBar from '../YlaPalkki/TopBar.jsx';
import Tankkaukset from '../Tankkaukset/Tankkaukset.jsx';
import Login from '../Login'; // Tuo Login-komponentti
import { auth, db } from '../../firebase.js'; // Tuo auth Firebase:sta
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './App.css';
import TapahtumanMuokkaus from '../TapahtumanMuokkaus/TapahtumanMuokkaus.jsx'; // Muutettu komponentin nimi

//Kaikki ajot = Kaikki Tilaukset
//Ei aloitetut = Kerättävät
//Aloitetut = Kerätty
//Suoritetut = Toimitetut
const App = () => {
  const [ajot, setAjot] = useState([]);
  const [filteredAjot, setFilteredAjot] = useState([]);
  const [user, setUser] = useState(null);
  const [muokattavaAjo, setMuokattavaAjo] = useState(null); // Lisää muokattava ajo

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'ajot'));
      const ajotData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAjot(ajotData);
      setFilteredAjot(ajotData);
    };

    fetchData();
  }, []);

  const lisaaAjo = async (tilausNro, paivamaara, tapahtumanTyyppi, kohde, kollienMaara, lisaTiedot) => {
    const uusiAjo = {
      tilausNro,
      paivamaara,
      tapahtumanTyyppi,
      kohde,
      kollienMaara,
      lisaTiedot,
      status: 'Ei aloitettu'
    };

    try {
      const docRef = await addDoc(collection(db, 'ajot'), uusiAjo);
      const addedAjo = { id: docRef.id, ...uusiAjo };
      setAjot([...ajot, addedAjo]);
      setFilteredAjot([...ajot, addedAjo]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const muutaStatus = async (id, uusiStatus) => {
    const ajoDocRef = doc(db, 'ajot', id);

    try {
      await updateDoc(ajoDocRef, { status: uusiStatus });
      const updatedAjot = ajot.map(ajo =>
        ajo.id === id ? { ...ajo, status: uusiStatus } : ajo
      );
      setAjot(updatedAjot);
      setFilteredAjot(updatedAjot);
      console.log("haloo")
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  const paivitaAjo = async (paivitettyAjo) => { // Lisää päivitä ajo funktio
    const ajoDocRef = doc(db, 'ajot', paivitettyAjo.id);
    try {
      await updateDoc(ajoDocRef, paivitettyAjo);
      const updatedAjot = ajot.map(ajo =>
        ajo.id === paivitettyAjo.id ? paivitettyAjo : ajo
      );
      setAjot(updatedAjot);
      setFilteredAjot(updatedAjot);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  };

  const aloitaMuokkaus = (ajo) => { // Lisää aloita muokkaus funktio
    setMuokattavaAjo(ajo);
  };

  const peruutaMuokkaus = () => { // Lisää peruuta muokkaus funktio
    setMuokattavaAjo(null);
  };

  const poistaAjo = async (id) => { // Lisää poistaAjo funktio
    const ajoDocRef = doc(db, 'ajot', id);
    try {
      await deleteDoc(ajoDocRef);
      const updatedAjot = ajot.filter(ajo => ajo.id !== id);
      setAjot(updatedAjot);
      setFilteredAjot(updatedAjot);
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  const filteredAjotWithoutTankkaus = filteredAjot.filter(ajo => ajo.tapahtumanTyyppi !== 'Tankkaus');
  const tankkausAjot = filteredAjot.filter(ajo => ajo.tapahtumanTyyppi === 'Tankkaus');

  return (
    <Router>
      <div className="container">
        {user ? (
          <>
            <TopBar ajot={ajot} setFilteredAjot={setFilteredAjot} />
            <Routes>
              <Route path="/" element={
                muokattavaAjo ? (
                  <TapahtumanMuokkaus
                    ajo={muokattavaAjo}
                    paivitaAjo={paivitaAjo}
                    peruutaMuokkaus={peruutaMuokkaus}
                  />
                ) : (
                  <KaikkiAjot
                    ajot={filteredAjotWithoutTankkaus}
                    muutaStatus={muutaStatus}
                    aloitaMuokkaus={aloitaMuokkaus} // Lisää aloita muokkaus propsi
                    paivitaAjo={paivitaAjo} // Lisää paivitaAjo propsi
                    poistaAjo={poistaAjo}
                  />
                )
                
              } />
              <Route path="/ei-aloitetut" element={<EiAloitetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Ei aloitettu')} muutaStatus={muutaStatus} aloitaMuokkaus={aloitaMuokkaus} paivitaAjo={paivitaAjo} />} />
              <Route path="/keratyt" element={<AloitetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Keratty')} muutaStatus={muutaStatus} aloitaMuokkaus={aloitaMuokkaus} paivitaAjo={paivitaAjo} />} />
              <Route path="/toimitetut" element={<SuoritetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Toimitettu')} aloitaMuokkaus={aloitaMuokkaus} paivitaAjo={paivitaAjo} />} />
              <Route path="/tankkaukset" element={<Tankkaukset ajot={ajot} poistaAjo={poistaAjo} paivitaAjo={paivitaAjo} />} />
              <Route path="/lisaa-ajo" element={<LisaaAjo lisaaAjo={lisaaAjo} />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth, db } from '../../firebase.js'; 
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './App.css';
import KaikkiTilaukset from '../KaikkiTilaukset/KaikkiTilaukset.jsx';
import KeratytTilaukset from '../KeratytTilaukset/KeratytTilaukset.jsx';
import KerattavatTilaukset from '../KerattavatTilaukset/KerattavatTilaukset.jsx';
import LisaaTilaus from '../LisaaTilaus/LisaaTilaus.jsx';
import Login from '../Login'; 
import Tankkaukset from '../Tankkaukset/Tankkaukset.jsx';
import TapahtumanMuokkaus from '../TapahtumanMuokkaus/TapahtumanMuokkaus.jsx';
import ToimitetutTilaukset from '../ToimitetutTilaukset/ToimitetutTilaukset.jsx';
import TopBar from '../YlaPalkki/TopBar.jsx';

//Kaikki ajot = Kaikki Tilaukset
//Ei aloitetut = Kerättävät
//Aloitetut = Kerätty
//Suoritetut = Toimitetut
const App = () => {
  const [ajot, setAjot] = useState([]);
  const [filteredAjot, setFilteredAjot] = useState([]);
  const [user, setUser] = useState(null);
  const [muokattavaAjo, setMuokattavaAjo] = useState(null);

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

  const lisaaTilaus = async (tilausNro, paivamaara, tapahtumanTyyppi, kohde, kollienMaara, lisaTiedot) => {
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

  const paivitaAjo = async (paivitettyAjo) => { 
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

  const aloitaMuokkaus = (ajo) => { 
    setMuokattavaAjo(ajo);
  };

  const peruutaMuokkaus = () => { 
    setMuokattavaAjo(null);
  };

  const poistaAjo = async (id) => {
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
                  <KaikkiTilaukset
                    ajot={filteredAjotWithoutTankkaus}
                    muutaStatus={muutaStatus}
                    aloitaMuokkaus={aloitaMuokkaus} 
                    paivitaAjo={paivitaAjo} 
                    poistaAjo={poistaAjo}
                  />
                )
                
              } />
              <Route path="/ei-aloitetut" element={<KerattavatTilaukset ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Ei aloitettu')} muutaStatus={muutaStatus} aloitaMuokkaus={aloitaMuokkaus} paivitaAjo={paivitaAjo} />} />
              <Route path="/keratyt" element={<KeratytTilaukset ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Keratty')} muutaStatus={muutaStatus} aloitaMuokkaus={aloitaMuokkaus} paivitaAjo={paivitaAjo} />} />
              <Route path="/toimitetut" element={<ToimitetutTilaukset ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Toimitettu')} aloitaMuokkaus={aloitaMuokkaus} paivitaAjo={paivitaAjo} />} />
              <Route path="/tankkaukset" element={<Tankkaukset ajot={ajot} poistaAjo={poistaAjo} paivitaAjo={paivitaAjo} />} />
              <Route path="/lisaa-ajo" element={<LisaaTilaus lisaaTilaus={lisaaTilaus} />} />
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

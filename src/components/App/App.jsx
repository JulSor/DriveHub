import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KaikkiAjot from '../KaikkiAjot/KaikkiAjot.jsx';
import AloitetutAjot from '../AloitetutAjot/AloitetutAjot.jsx';
import EiAloitetutAjot from '../EiAloitetutAjot/EiAloitetutAjot.jsx';
import SuoritetutAjot from '../SuoritetutAjot/SuoritetutAjot.jsx';
import LisaaAjo from '../LisaaAjo/LisaaAjo.jsx';
import Ajot from '../Ajot.js'; // tuo ajotiedot
import NoPage from '../NoPage.jsx';
import TopBar from '../YlaPalkki/TopBar.jsx';
import Tankkaukset from '../Tankkaukset/Tankkaukset.jsx';
import Login from '../Login'; // Tuo Login-komponentti
import { auth, db } from '../../firebase.js'; // Tuo auth Firebase:sta
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import './App.css';

const App = () => {
  const [ajot, setAjot] = useState([]);
  const [filteredAjot, setFilteredAjot] = useState([]);
  const [user, setUser] = useState(null);

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
    } catch (e) {
      console.error('Error updating document: ', e);
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
              <Route path="/" element={<KaikkiAjot ajot={filteredAjotWithoutTankkaus} muutaStatus={muutaStatus} />} />
              <Route path="/ei-aloitetut" element={<EiAloitetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Ei aloitettu')} muutaStatus={muutaStatus} />} />
              <Route path="/aloitetut" element={<AloitetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Aloitettu')} muutaStatus={muutaStatus} />} />
              <Route path="/suoritetut" element={<SuoritetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Suoritettu')} />} />
              <Route path="/tankkaukset" element={<Tankkaukset ajot={tankkausAjot} muutaStatus={muutaStatus} />} />
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

// const App = () => {
//   const [ajot, setAjot] = useState(Ajot);
//   const [filteredAjot, setFilteredAjot] = useState(ajot);

//   const lisaaAjo = (paivamaara, tapahtumanTyyppi, kohde, kollienMaara, lisaTiedot) => {
//     const uusiAjo = {
//       id: ajot.length + 1,
//       nimi: `${tapahtumanTyyppi} ${ajot.length + 1}`,
//       paivamaara,
//       tapahtumanTyyppi,
//       kohde,
//       kollienMaara,
//       lisaTiedot,
//       status: 'Ei aloitettu'
//     };
//     const updatedAjot = [...ajot, uusiAjo];
//     setAjot(updatedAjot);
//     setFilteredAjot(updatedAjot);
//   };

//   const muutaStatus = (id, uusiStatus) => {
//     const updatedAjot = ajot.map((ajo) =>
//       ajo.id === id ? { ...ajo, status: uusiStatus } : ajo
//     );
//     setAjot(updatedAjot);
//     setFilteredAjot(updatedAjot);
//   };

//   const filteredAjotWithoutTankkaus = filteredAjot.filter(ajo => ajo.tapahtumanTyyppi !== 'Tankkaus');
//   const tankkausAjot = filteredAjot.filter(ajo => ajo.tapahtumanTyyppi === 'Tankkaus');

//   return (
//     <Router>
//       <div className="container">
//         <TopBar ajot={ajot} setFilteredAjot={setFilteredAjot} />
//         {/* <PageButtons /> */}
//         <Routes>
//           <Route path="/" element={<KaikkiAjot ajot={filteredAjotWithoutTankkaus} muutaStatus={muutaStatus} />} />
//           <Route path="/ei-aloitetut" element={<EiAloitetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Ei aloitettu')} muutaStatus={muutaStatus} />} />
//           <Route path="/aloitetut" element={<AloitetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Aloitettu')} muutaStatus={muutaStatus} />} />
//           <Route path="/suoritetut" element={<SuoritetutAjot ajot={filteredAjotWithoutTankkaus.filter(ajo => ajo.status === 'Suoritettu')} />} />
//           <Route path="/tankkaukset" element={<Tankkaukset ajot={tankkausAjot} muutaStatus={muutaStatus} />} />
//           <Route path="/lisaa-ajo" element={<LisaaAjo lisaaAjo={lisaaAjo} />} />
//           <Route path="*" element={<NoPage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };
// export default App;

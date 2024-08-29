import React, { useState } from 'react';
import './KaikkiTilaukset.css';
import TapahtumanMuokkaus from '../TapahtumanMuokkaus/TapahtumanMuokkaus';

const KaikkiTilaukset = ({ ajot, muutaStatus, paivitaAjo, poistaAjo }) => {
  const [muokattavaAjo, setMuokattavaAjo] = useState(null);
  const [varmistusAjo, setVarmistusAjo] = useState(null);
  const [avattuAjoId, setAvattuAjoId] = useState(null);
  const [statusNappiAvoinna, setStatusNappiAvoinna] = useState(null);

  const formatPaivamaara = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  const getStatusClass = (buttonStatus, ajoStatus) => {
    if (buttonStatus === ajoStatus) {
      switch (buttonStatus) {
        case 'Keratty':
          return 'action-button started';
        case 'Toimitettu':
          return 'action-button completed';
        default:
          return 'action-button not-started';
      }
    }
    return 'action-button';
  };

  const aloitaMuokkaus = (ajo) => {
    setMuokattavaAjo(ajo);
  };

  const peruutaMuokkaus = () => {
    setMuokattavaAjo(null);
  };

  const handlePaivitaAjo = (paivitettyAjo) => {
    paivitaAjo(paivitettyAjo);
    setMuokattavaAjo(null);
  };

  const handleVarmistusPoisto = (ajo) => {
    setVarmistusAjo(ajo);
  };

  const peruutaPoisto = () => {
    setVarmistusAjo(null);
  };

  const vahvistaPoisto = () => {
    if (varmistusAjo) {
      poistaAjo(varmistusAjo.id);
      setVarmistusAjo(null);
    }
  };

  const toggleAjoDetails = (ajoId) => {
    if (avattuAjoId === ajoId) {
      setAvattuAjoId(null);
    } else {
      setAvattuAjoId(ajoId);
    }
  };

  const toggleStatusButtons = (ajoId) => {
    if (statusNappiAvoinna === ajoId) {
      setStatusNappiAvoinna(null);
    } else {
      setStatusNappiAvoinna(ajoId);
    }
  };

  return (
    <div className='kaikki-ajot-container'>
      <h1>Kaikki tilaukset</h1>
      {muokattavaAjo ? (
        <TapahtumanMuokkaus 
          ajo={muokattavaAjo} 
          paivitaAjo={handlePaivitaAjo} 
          peruutaMuokkaus={peruutaMuokkaus} 
        />
      ) : (
        <ul className='ajo-list'>
          {ajot.map((ajo) => (
            <li className={`ajo-item ${avattuAjoId === ajo.id ? 'open' : ''}`} key={ajo.id} onClick={() => toggleAjoDetails(ajo.id)}>
              <div className='ajo-info'>
                <span className='tilausNro'><strong>Tilausnumero:</strong> {ajo.tilausNro}</span>
                <span className='paivamaara'><strong>Päivämäärä:</strong> {formatPaivamaara(ajo.paivamaara)}</span>
                <span className='kohde'><strong>Kohde:</strong> {ajo.kohde}</span>
                <span className='status'> {ajo.status}</span>
              </div>
              {avattuAjoId === ajo.id && (
                <div className='ajo-details'>
                  <span className='kollienMaara'><strong>Kollien määrä:</strong> {ajo.kollienMaara}</span>
                  <span className='lisaTiedot'><strong>Lisätietoja:</strong> {ajo.lisaTiedot}</span>
                  <div className='ajo-actions'>
                    {statusNappiAvoinna === ajo.id ? (
                      <>
                        <button className={getStatusClass('Ei aloitettu', ajo.status)} onClick={(e) => { e.stopPropagation(); muutaStatus(ajo.id, 'Ei aloitettu'); toggleStatusButtons(null); }}>Ei aloitettu</button>
                        <button className={getStatusClass('Keratty', ajo.status)} onClick={(e) => { e.stopPropagation(); muutaStatus(ajo.id, 'Keratty'); toggleStatusButtons(null); }}>Kerätty</button>
                        <button className={getStatusClass('Toimitettu', ajo.status)} onClick={(e) => { e.stopPropagation(); muutaStatus(ajo.id, 'Toimitettu'); toggleStatusButtons(null); }}>Toimitettu</button>
                      </>
                    ) : (
                      <button className={getStatusClass(ajo.status, ajo.status)} onClick={(e) => { e.stopPropagation(); toggleStatusButtons(ajo.id); }}>{ajo.status}</button>
                    )}
                    <div className='editAndDelete'>
                      <button className="update-button-on-list" onClick={(e) => { e.stopPropagation(); aloitaMuokkaus(ajo); }}>Muokkaa</button>
                      <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleVarmistusPoisto(ajo); }}>Poista</button>
                    </div>
                  </div>
                  {varmistusAjo && varmistusAjo.id === ajo.id && (
                    <div className='varmistusikkuna'>
                      <p>Poistetaanko tilaus?</p>
                      <button className='confirm-button' onClick={vahvistaPoisto}>Ok</button>
                      <button className='cancel-button' onClick={peruutaPoisto}>Peruuta</button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KaikkiTilaukset;

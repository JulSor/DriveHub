import React, { useState } from 'react';
import './KaikkiAjot.css';
import TapahtumanMuokkaus from '../TapahtumanMuokkaus/TapahtumanMuokkaus';

const KaikkiAjot = ({ ajot, muutaStatus, paivitaAjo, poistaAjo }) => {
  const [muokattavaAjo, setMuokattavaAjo] = useState(null);
  const [varmistusAjo, setVarmistusAjo] = useState(null);


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
            <li className='ajo-item' key={ajo.id}>
              <div className='ajo-info'>
                <span className='nimi'>{ajo.nimi}</span>
                <span className='tilausNro'><strong>Tilausnumero:</strong> {ajo.tilausNro}</span>
                <span className='paivamaara'><strong>Päivämäärä:</strong> {formatPaivamaara(ajo.paivamaara)}</span>
                <span className='kohde'><strong>Kohde:</strong> {ajo.kohde}</span>
                <span className='kollienMaara'><strong>Kollien määrä:</strong> {ajo.kollienMaara}</span>
                <span className='lisaTiedot'><strong>Lisätietoja:</strong> {ajo.lisaTiedot}</span>
                <span className='status'> {ajo.status}</span>
              </div>
              <div className='ajo-actions'>
                <button className={getStatusClass('Ei aloitettu', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Ei aloitettu')}>Ei aloitettu</button>
                <button className={getStatusClass('Keratty', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Keratty')}>Kerätty</button>
                <button className={getStatusClass('Toimitettu', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Toimitettu')}>Toimitettu</button>
                <div className='editAndDelete'>
                  <button className="update-button-on-list" onClick={() => aloitaMuokkaus(ajo)}>Muokkaa tilausta</button>
                  <button className="delete-button" onClick={() => handleVarmistusPoisto(ajo)}>Poista</button>
                </div>
              </div>
              {varmistusAjo && varmistusAjo.id === ajo.id && (
                <div className='varmistusikkuna'>
                  <p>Poistetaanko tilaus?</p>
                  <button onClick={vahvistaPoisto}>Ok</button>
                  <button onClick={peruutaPoisto}>Peruuta</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KaikkiAjot;
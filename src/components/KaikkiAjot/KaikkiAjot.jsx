import React, { useState } from 'react';
import './KaikkiAjot.css';
import TapahtumanMuokkaus from '../TapahtumanMuokkaus/TapahtumanMuokkaus';

const KaikkiAjot = ({ ajot, muutaStatus, paivitaAjo }) => {
  const [muokattavaAjo, setMuokattavaAjo] = useState(null);

  const getStatusClass = (buttonStatus, ajoStatus) => {
    if (buttonStatus === ajoStatus) {
      switch (buttonStatus) {
        case 'Aloitettu':
          return 'action-button started';
        case 'Suoritettu':
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
                <span className='paivamaara'><strong>Päivämäärä:</strong> {ajo.paivamaara}</span>
                <span className='kohde'><strong>Kohde:</strong> {ajo.kohde}</span>
                <span className='kollienMaara'><strong>Kollien määrä:</strong> {ajo.kollienMaara}</span>
                <span className='lisaTiedot'><strong>Lisätietoja:</strong> {ajo.lisaTiedot}</span>
                <span className='status'> {ajo.status}</span>
              </div>
              <div className='ajo-actions'>
                <button className={getStatusClass('Ei aloitettu', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Ei aloitettu')}>Ei aloitettu</button>
                <button className={getStatusClass('Aloitettu', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Kerätty')}>Kerätty</button>
                <button className={getStatusClass('Suoritettu', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Toimitettu')}>Toimitettu</button>
                <button className="update-button-on-list" onClick={() => aloitaMuokkaus(ajo)}>Muokkaa tilausta</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KaikkiAjot;

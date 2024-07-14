import React from 'react';
import './KaikkiAjot.css';

const KaikkiAjot = ({ ajot, muutaStatus }) => {
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

  return (
    <div className='kaikki-ajot-container'>
      <h1>Kaikki Ajot</h1>
      <ul className='ajo-list'>
        {ajot.map((ajo) => (
          <li className='ajo-item' key={ajo.id}>
            <div className='ajo-info'>
              <span className='nimi'>{ajo.nimi}</span>
              <span className='tilausNro'><strong>Tilausnumero:</strong> {ajo.tilausNro}</span>
              <span className='paivamaara'><strong>Päivämäärä:</strong> {ajo.paivamaara}</span>
              <span className='tapahtumanTyyppi'><strong>Tapahtuma:</strong> {ajo.tapahtumanTyyppi}</span>
              <span className='kohde'><strong>Kohde:</strong> {ajo.kohde}</span>
              <span className='kollienMaara'><strong>Kollien määrä:</strong> {ajo.kollienMaara}</span>
              <span className='lisaTiedot'><strong>Lisätietoja:</strong> {ajo.lisaTiedot}</span>
              <span className='status'> {ajo.status}</span>
            </div>
            <div className='ajo-actions'>
              <button className={getStatusClass('Ei aloitettu', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Ei aloitettu')}>Ei aloitettu</button>
              <button className={getStatusClass('Aloitettu', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Aloitettu')}>Aloitettu</button>
              <button className={getStatusClass('Suoritettu', ajo.status)} onClick={() => muutaStatus(ajo.id, 'Suoritettu')}>Suoritettu</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KaikkiAjot;

import React from 'react';
import '../KaikkiAjot/KaikkiAjot.css';

const AloitetutAjot = ({ ajot, muutaStatus }) => {

  return (
    <div className='kaikki-ajot-container'>
      <h1>Aloitetut Ajot</h1>
      <ul className='ajo-list'>
        {ajot.map((ajo) => (
          <li className='ajo-item' key={ajo.id}>
            <div className='ajo-info'>
              <span className='nimi'>{ajo.nimi}</span>
              <span className='paivamaara'><strong>Päivämäärä:</strong> {ajo.paivamaara}</span>
              <span className='tapahtumanTyyppi'><strong>Tapahtuma:</strong> {ajo.tapahtumanTyyppi}</span>
              <span className='kohde'><strong>Kohde:</strong> {ajo.kohde}</span>
              <span className='kollienMaara'><strong>Kollien määrä:</strong> {ajo.kollienMaara}</span>
              <span className='lisaTiedot'><strong>Lisätietoja:</strong> {ajo.lisaTiedot}</span>
              <span className='status'> {ajo.status}</span>
            </div>
            <div className='ajo-actions'>
              <button className='action-button completed' onClick={() => muutaStatus(ajo.id, 'Suoritettu')}>Merkitse suoritetuksi</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AloitetutAjot;

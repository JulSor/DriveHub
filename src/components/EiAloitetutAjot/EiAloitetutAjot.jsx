import React from 'react';
import '../KaikkiAjot/KaikkiAjot.css';

const EiAloitetutAjot = ({ ajot, muutaStatus }) => {
  return (
    <div className='kaikki-ajot-container'>
      <h1>Ei Aloitetut Ajot</h1>
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
              <button className='action-button started' onClick={() => muutaStatus(ajo.id, 'Aloitettu')}>Merkitse aloitetuksi</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EiAloitetutAjot;

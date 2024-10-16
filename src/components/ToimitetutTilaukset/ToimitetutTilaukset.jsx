import React from 'react';
import '../KaikkiTilaukset/KaikkiTilaukset.css';

const ToimitetutTilaukset = ({ ajot }) => {

  const formatPaivamaara = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };
  
  return (
    <div className='kaikki-ajot-container'>
      <h1>Toimitetut</h1>
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
            </div><div className='ajo-actions'>
              <button disabled className='action-button completed-disabled'>Toimitettu</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToimitetutTilaukset;

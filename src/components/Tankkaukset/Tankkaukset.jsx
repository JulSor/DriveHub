import React from 'react';
import '../KaikkiAjot/KaikkiAjot.css';

const Tankkaukset = ({ ajot, muutaStatus }) => {
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

  
  const formatPaivamaara = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fi-FI', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  const tankkausAjot = ajot.filter(ajo => ajo.tapahtumanTyyppi === 'Tankkaus');

  return (
    <div className='kaikki-ajot-container'>
      <h1>Tankkaukset</h1>
      <ul className='ajo-list'>
        {tankkausAjot.map((ajo) => (
          <li className='ajo-item' key={ajo.id}>
            <div className='ajo-info'>
              <span className='nimi'>{ajo.nimi}</span>
              <span className='paivamaara'><strong>Päivämäärä:</strong> {formatPaivamaara(ajo.paivamaara)}</span>
              <span className='kohde'><strong>Kilometrit:</strong> {ajo.kohde}</span>
              <span className='kollienMaara'><strong>Polttoaineen määrä:</strong> {ajo.kollienMaara + "L"}</span>
              <span className='lisaTiedot'><strong>Lisätietoja:</strong> {ajo.lisaTiedot}</span>
              <span className='status'>{ajo.status}</span>
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

export default Tankkaukset;

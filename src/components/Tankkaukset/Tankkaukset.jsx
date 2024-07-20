import React, { useState } from 'react';
import '../KaikkiTilaukset/KaikkiTilaukset.css';
import TapahtumanMuokkaus from '../TapahtumanMuokkaus/TapahtumanMuokkaus';

const Tankkaukset = ({ ajot, poistaAjo, paivitaAjo  }) => {
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
  const vahvistaPoisto = (ajoId) => {
    setVarmistusAjo(ajoId);
  };
  
  const peruutaPoisto = () => {
    setVarmistusAjo(null);
  };

  const tankkausAjot = ajot.filter(ajo => ajo.tapahtumanTyyppi === 'Tankkaus');

  return (
    <div className='kaikki-ajot-container'>
      <h1>Tankkaukset</h1>
      {muokattavaAjo ? (
        <TapahtumanMuokkaus 
          ajo={muokattavaAjo} 
          paivitaAjo={handlePaivitaAjo} 
          peruutaMuokkaus={peruutaMuokkaus} 
        />
      ) : (
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
                <button className='action-button completed'>Suoritettu</button>
              <div className='editAndDelete'>
                <button className="update-button-on-list" onClick={() => aloitaMuokkaus(ajo)}>Muokkaa</button>
                <button className="delete-button" onClick={() => vahvistaPoisto(ajo.id)}>Poista</button>
                  {varmistusAjo === ajo.id && (
                    <div className='varmistusikkuna'>
                      <p>Poistetaanko tilaus?</p>
                      <button className='confirm-button' onClick={() => { poistaAjo(ajo.id); setVarmistusAjo(null); }}>Ok</button>
                      <button className='cancel-button' onClick={peruutaPoisto}>Peruuta</button>
                    </div>
                  )}              </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tankkaukset;

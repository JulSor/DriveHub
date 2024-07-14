import React, { useState } from 'react';
import './LisaaAjo.css';

const LisaaAjo = ({ lisaaAjo }) => {
  const [paivamaara, setPaivamaara] = useState('');
  const [tapahtumanTyyppi, setTapahtumanTyyppi] = useState('Ajo');
  const [kohde, setKohde] = useState('');
  const [kollienMaara, setKollienMaara] = useState('');
  const [lisaTiedot, setLisaTiedot] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tapahtumanTyyppi === 'Tankkaus') {
      lisaaAjo(paivamaara, tapahtumanTyyppi, parseInt(kohde), parseInt(kollienMaara), lisaTiedot);
    } else {
      lisaaAjo(paivamaara, tapahtumanTyyppi, kohde, parseInt(kollienMaara), lisaTiedot);
    }
    setPaivamaara('');
    setTapahtumanTyyppi('Ajo');
    setKohde('');
    setKollienMaara('');
    setLisaTiedot('');
  };

  return (
    <div className="lisaa-ajo-container">
      <h2>Lisää Ajo</h2>
      <form onSubmit={handleSubmit} className="lisaa-ajo-form">
        <div className="form-group">
          <label htmlFor="paivamaara">Päivämäärä:</label>
          <input
            type="date"
            id="paivamaara"
            value={paivamaara}
            onChange={(e) => setPaivamaara(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tapahtumanTyyppi">Tapahtuman tyyppi:</label>
          <select
            id="tapahtumanTyyppi"
            value={tapahtumanTyyppi}
            onChange={(e) => setTapahtumanTyyppi(e.target.value)}
            required
          >
            <option value="Ajo">Ajo</option>
            <option value="Tankkaus">Tankkaus</option>
          </select>
        </div>
        {tapahtumanTyyppi === 'Tankkaus' ? (
          <>
            <div className="form-group">
              <label htmlFor="kohde">Kilometrit:</label>
              <input
                type="number"
                id="kohde"
                value={kohde}
                onChange={(e) => setKohde(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="kollienMaara">Polttoaineen määrä:</label>
              <input
                type="number"
                id="kollienMaara"
                value={kollienMaara}
                onChange={(e) => setKollienMaara(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="kohde">Kohde:</label>
              <input
                type="text"
                id="kohde"
                value={kohde}
                onChange={(e) => setKohde(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="kollienMaara">Kollien määrä:</label>
              <input
                type="number"
                id="kollienMaara"
                value={kollienMaara}
                onChange={(e) => setKollienMaara(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="lisaTiedot">Lisätietoja:</label>
          <input
            type="text"
            id="lisaTiedot"
            value={lisaTiedot}
            onChange={(e) => setLisaTiedot(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Lisää Ajo</button>
      </form>
    </div>
  );
};

export default LisaaAjo;

import React, { useState, useEffect } from 'react';
import './TapahtumanMuokkaus.css';

const TapahtumanMuokkaus = ({ ajo, paivitaAjo, peruutaMuokkaus }) => {
  const [tilausNro, setTilausNro] = useState('');
  const [paivamaara, setPaivamaara] = useState('');
  const [tapahtumanTyyppi, setTapahtumanTyyppi] = useState('Ajo');
  const [kohde, setKohde] = useState('');
  const [kollienMaara, setKollienMaara] = useState('');
  const [lisaTiedot, setLisaTiedot] = useState('');

  useEffect(() => {
    if (ajo) {
      setTilausNro(ajo.tilausNro);
      setPaivamaara(ajo.paivamaara);
      setTapahtumanTyyppi(ajo.tapahtumanTyyppi);
      setKohde(ajo.kohde);
      setKollienMaara(ajo.kollienMaara);
      setLisaTiedot(ajo.lisaTiedot);
    }
  }, [ajo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    paivitaAjo({
      ...ajo,
      tilausNro,
      paivamaara,
      tapahtumanTyyppi,
      kohde,
      kollienMaara: parseInt(kollienMaara),
      lisaTiedot,
    });
  };

  return (
    <div className="edit-ajo-container">
      <h2>Muokkaa Ajoa</h2>
      <form onSubmit={handleSubmit} className="edit-ajo-form">
        <div className="form-group">
          <label htmlFor="tilausNro">Tilausnumero:</label>
          <input
            type="text"
            id="tilausNro"
            value={tilausNro}
            onChange={(e) => setTilausNro(e.target.value)}
            required
          />
        </div>
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
              <label htmlFor="kollienMaara">Tankatut litrat:</label>
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
        <button type="submit" className="update-button">Päivitä Ajo</button>
        <button type="button" className="cancel-button" onClick={peruutaMuokkaus}>Peruuta</button>
      </form>
    </div>
  );
};

export default TapahtumanMuokkaus;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LisaaTilaus from './LisaaTilaus';
import { vi } from 'vitest';

describe('LisaaTilaus Component', () => {
  it('should call lisaaTilaus with correct parameters when form is submitted', () => {
    // Mockataan lisaaTilaus-funktio
    const lisaaTilausMock = vi.fn();

    // Renderöidään LisaaTilaus-komponentti
    render(<LisaaTilaus lisaaTilaus={lisaaTilausMock} />);

    // Täytetään lomakkeen kentät
    fireEvent.change(screen.getByLabelText(/Tilausnumero:/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/Päivämäärä:/i), { target: { value: '2023-09-09' } });
    fireEvent.change(screen.getByLabelText(/Tapahtuman tyyppi:/i), { target: { value: 'Ajo' } });
    fireEvent.change(screen.getByLabelText(/Kohde:/i), { target: { value: 'Helsinki' } });
    fireEvent.change(screen.getByLabelText(/Kollien määrä:/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Lisätietoja:/i), { target: { value: 'Erikoiskuljetus' } });

    // Simuloidaan lomakkeen lähetys
    fireEvent.click(screen.getByText(/Lisää Ajo/i));

    // Varmistetaan, että lisaaTilaus-funktiota on kutsuttu oikeilla argumenteilla
    expect(lisaaTilausMock).toHaveBeenCalledWith(
      '123',               // tilausNro
      '2023-09-09',        // paivamaara
      'Ajo',               // tapahtumanTyyppi
      'Helsinki',          // kohde
      10,                  // kollienMaara (integer)
      'Erikoiskuljetus'    // lisaTiedot
    );
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Tämä tuo jest-dom matcherit, kuten toBeInTheDocument
import App from './App';
import { vi } from 'vitest'; // Vitestin mock-funktio
import { auth } from '../../firebase';

// Mockataan Firebase Auth käyttäen Vitestiä
vi.mock('../../firebase', () => ({
  auth: {
    onAuthStateChanged: vi.fn((callback) => {
      // Simuloidaan, ettei käyttäjää ole kirjautuneena
      callback(null);
      // Palautetaan unsubscribe-funktio
      return vi.fn();
    }),
  },
}));

describe('App Component', () => {
  it('should render login screen if user is not authenticated', () => {
    // Renderöidään App-komponentti
    render(<App />);
    
    // Etsitään kirjautumisruutu tai login-näkymä
    const loginElement = screen.getByText(/kirjaudu sisään/i);
    expect(loginElement).toBeInTheDocument();
  });
});

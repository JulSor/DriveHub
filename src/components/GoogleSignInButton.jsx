// GoogleSignInButton.jsx
import React from 'react';
import { signInWithGoogle } from '../firebase' // Varmista, että importaat oikein

const GoogleSignInButton = () => {
  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <button onClick={handleSignIn}>
      Kirjaudu sisään Google-tililläsi
    </button>
  );
};

export default GoogleSignInButton;

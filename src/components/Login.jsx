// Login.jsx
import React from 'react';
import { signInWithGoogle } from '../firebase';

const Login = () => {
  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="login-container">
      <h1>Tervetuloa käyttämään DriveHub-sovellusta, jolla voit seurata omia ajoja</h1>
      <button onClick={handleSignIn}>
        Kirjaudu sisään Google-tililläsi
      </button>
    </div>
  );
};

export default Login;

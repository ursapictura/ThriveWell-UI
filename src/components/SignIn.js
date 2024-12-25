import React from 'react';
import { Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <Image src="/images/Logo.png" alt="logo" style={{ maxWidth: '250px', margin: ' 10px auto' }} />
      <h1>Thrive Well</h1>
      <p>Click the button below to sign in!</p>
      <button style={{ maxHeight: '50px' }} type="button" className="button" onClick={signIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;

'use client';

import { signOut } from '@/utils/auth';

function Home() {
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
      <h1>Welcome to ThriveWell! </h1>
      <p>Click the button below to logout!</p>
      <button type="button" className="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Home;

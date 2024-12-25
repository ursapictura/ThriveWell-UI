'use client';

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
      <img src="/images/Logo.png" alt="logo" style={{ maxWidth: '200px', margin: ' 10px auto' }} />
      <h1>Welcome to ThriveWell! </h1>
      <p>Regain control over your health by tracking your symptoms and learning what your symtpom triggers are</p>
    </div>
  );
}

export default Home;

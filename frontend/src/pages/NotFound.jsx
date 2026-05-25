import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-container d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: '80vh', padding: '40px 20px' }}>
      
      <div className="cosmic-animation mb-4" style={{ position: 'relative', width: '150px', height: '150px' }}>
        <i className="fas fa-compass" style={{ fontSize: '100px', color: 'var(--primary-color)', animation: 'spin 10s linear infinite' }}></i>
        <i className="fas fa-star" style={{ position: 'absolute', top: '10px', right: '10px', color: 'var(--accent-color)', fontSize: '24px', animation: 'pulse 2s infinite' }}></i>
        <i className="fas fa-moon" style={{ position: 'absolute', bottom: '20px', left: '10px', color: 'var(--text-muted)', fontSize: '32px', animation: 'pulse 3s infinite' }}></i>
      </div>

      <h1 style={{ fontSize: '4rem', color: 'var(--text-heading)', fontWeight: '800', marginBottom: '10px' }}>404</h1>
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-color)', marginBottom: '20px' }}>Lost in the Cosmos?</h2>
      
      <p style={{ maxWidth: '500px', fontSize: '1.1rem', color: 'var(--text-content)', marginBottom: '30px' }}>
        Oops! It looks like your stars aligned on the wrong page. The cosmic coordinates you entered don't exist in our universe.
      </p>

      <Link to="/" className="btn-primary d-inline-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
        <i className="fas fa-space-shuttle"></i> Back to Earth (Home)
      </Link>

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default NotFound;

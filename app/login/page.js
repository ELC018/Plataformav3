'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contrasena })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0a0a'
    }}>
      <div style={{
        background: '#30bdc2',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          color: '#ffffff',
          fontSize: '1.5rem',
          fontWeight: '800',
          letterSpacing: '-0.5px'
        }}>
          Iniciar Sesión
        </h1>
        
        {error && (
          <div style={{
            background: '#fee',
            color: '#c00',
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#006064',
              fontWeight: '500'
            }}>
              Correo:
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #006064',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              placeholder="est@demo.com"
              onFocus={(e) => e.target.style.borderColor = '#ffff00'}
              onBlur={(e) => e.target.style.borderColor = '#006064'}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#006064',
              fontWeight: '500'
            }}>
              Contraseña:
            </label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #006064',
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              placeholder="123"
              onFocus={(e) => e.target.style.borderColor = '#ffff00'}
              onBlur={(e) => e.target.style.borderColor = '#006064'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#006064',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#ffff00';
              e.target.style.color = '#006064';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#006064';
              e.target.style.color = 'white';
            }}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ 
          marginTop: '1rem', 
          fontSize: '0.875rem', 
          color: '#666',
          textAlign: 'center'
        }}>
          <p style={{ fontWeight: '500', color: '#006064' }}>Cuentas de prueba:</p>
          <p>📧 est@demo.com / 123 <span style={{ color: '#006064' }}>(Estudiante)</span></p>
          <p>📧 doc@demo.com / 123 <span style={{ color: '#006064' }}>(Docente)</span></p>
          <p>📧 admin@demo.com / 123 <span style={{ color: '#006064' }}>(Administrador)</span></p>
        </div>
      </div>
    </div>
  );
}
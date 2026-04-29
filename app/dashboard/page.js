'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/usuario/permisos', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Token inválido');
        return res.json();
      })
      .then(data => {
        setUsuario(data.usuario);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    router.push('/login');
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1>Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <div style={{
        background: '#009da8',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }}>
        <h2>Bienvenido, {usuario.nombre} 👋</h2>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        <p><strong>Roles:</strong> {usuario.roles?.join(', ') || 'Sin rol'}</p>
      </div>

      <div style={{
        background: '#009da8',
        padding: '1.5rem',
        borderRadius: '8px'
      }}>
        <h3>Tus permisos:</h3>
        <ul>
          {usuario.permisos?.map((permiso, index) => (
            <li key={index}>{permiso}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
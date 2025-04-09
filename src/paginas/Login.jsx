
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (email && clave) {
      // Simulación de login
      onLogin({ nombre: email.split('@')[0], rol: 'medico' });
    } else {
      setError('Por favor completa todos los campos.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={manejarEnvio} className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}

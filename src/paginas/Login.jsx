
import { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!usuario || !clave) {
      setError('Completa todos los campos.');
      return;
    }

    const q = query(collection(db, 'usuarios'), where('usuario', '==', usuario));
    const resultado = await getDocs(q);
    if (resultado.empty) {
      setError('Usuario no encontrado.');
      return;
    }

    const data = resultado.docs[0].data();
    if (data.clave !== clave) {
      setError('Contraseña incorrecta.');
      return;
    }

    onLogin({ nombre: data.nombre, rol: data.rol });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={manejarEnvio} className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold">Ingreso a Clínica Hall</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
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

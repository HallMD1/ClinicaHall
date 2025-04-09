
import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

const canalesDisponibles = ['General', 'Recepción', 'Médicos', 'Urgencias'];

export default function ChatClinica({ usuario }) {
  const [mensajes, setMensajes] = useState([]);
  const [entrada, setEntrada] = useState('');
  const [canal, setCanal] = useState('General');
  const archivoInputRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, 'mensajes'),
      where('canal', '==', canal),
      orderBy('creado', 'asc')
    );
    const unsuscribe = onSnapshot(q, (snapshot) => {
      setMensajes(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsuscribe();
  }, [canal]);

  const enviarMensaje = async () => {
    if (entrada.trim() === '') return;
    await addDoc(collection(db, 'mensajes'), {
      de: usuario.nombre,
      texto: entrada,
      canal: canal,
      creado: serverTimestamp()
    });
    setEntrada('');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-2">
        <label className="block mb-1 font-medium">Canal actual:</label>
        <select
          value={canal}
          onChange={(e) => setCanal(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {canalesDisponibles.map((nombre) => (
            <option key={nombre} value={nombre}>
              {nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="h-[550px] flex flex-col border rounded-xl shadow bg-white">
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {mensajes.map((msg, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-2">
              <strong>{msg.de}: </strong>
              <span>{msg.texto}</span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex items-center gap-2">
          <input
            className="flex-1 border rounded p-2"
            placeholder={`Escribe en #${canal}`}
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
          />
          <button onClick={enviarMensaje} className="bg-blue-600 text-white px-4 py-2 rounded">
            Enviar
          </button>
          <button onClick={() => archivoInputRef.current.click()} className="border px-3 py-2 rounded">
            📎 Imagen
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={archivoInputRef}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

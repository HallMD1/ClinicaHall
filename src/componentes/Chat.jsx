
import { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

export default function ChatClinica({ usuario }) {
  const [mensajes, setMensajes] = useState([]);
  const [entrada, setEntrada] = useState('');
  const archivoInputRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'mensajes'), orderBy('creado', 'asc'));
    const unsuscribe = onSnapshot(q, (snapshot) => {
      setMensajes(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsuscribe();
  }, []);

  const enviarMensaje = async () => {
    if (entrada.trim() === '') return;
    await addDoc(collection(db, 'mensajes'), {
      de: usuario.nombre,
      texto: entrada,
      creado: serverTimestamp()
    });
    setEntrada('');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="h-[600px] flex flex-col border rounded-xl shadow bg-white">
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
            placeholder="Escribe un mensaje..."
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


import { useState, useRef } from 'react';

export default function ChatClinica() {
  const [mensajes, setMensajes] = useState([
    { de: 'Recepción', texto: 'Paciente María López llegó.' },
    { de: 'Laboratorio', texto: 'Resultados de Juan Pérez listos.' },
  ]);
  const [entrada, setEntrada] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const archivoInputRef = useRef(null);

  const enviarMensaje = () => {
    if (entrada.trim() !== '') {
      setMensajes([...mensajes, { de: 'Tú', texto: entrada }]);
      setEntrada('');
    }
  };

  const manejarCargaImagen = (e) => {
    const archivos = Array.from(e.target.files);
    const previews = archivos.map(archivo => URL.createObjectURL(archivo));
    setImagenes(prev => [...prev, ...previews]);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="h-[600px] flex flex-col border rounded-xl shadow">
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {mensajes.map((msg, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-2">
              <strong>{msg.de}: </strong>
              <span>{msg.texto}</span>
            </div>
          ))}
          {imagenes.map((img, index) => (
            <div key={`img-${index}`} className="bg-gray-50 p-2 rounded-xl">
              <strong>Imagen enviada:</strong>
              <img src={img} alt={`imagen-${index}`} className="mt-2 max-w-full rounded-xl border" />
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
            onChange={manejarCargaImagen}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}

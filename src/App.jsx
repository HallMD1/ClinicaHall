
import { useState } from 'react';
import ChatClinica from './componentes/Chat';
import Login from './paginas/Login';

export default function App() {
  const [usuario, setUsuario] = useState(null);

  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  return (
    <div>
      <div className="bg-blue-600 text-white p-4 text-center">
        Bienvenido, {usuario.nombre} ({usuario.rol})
      </div>
      <ChatClinica usuario={usuario} />
    </div>
  );
}

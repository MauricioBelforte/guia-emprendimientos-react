import { useState } from "react";
import HistorialMensajes from "./HistorialMensajes";
import EntradaMensaje from "./EntradaMensaje";

export default function ChatApp() {
  const [mensajes, setMensajes] = useState([{
    id: 1,
    emisor: 'sistema',
    texto: '¡Hola! Estoy acá para ayudarte. Escribí lo que necesites y te voy guiando 😊',
    timestamp: new Date().toISOString()
  }]);



  const agregarMensaje = (texto) => {
    const nuevo = {
      id: crypto.randomUUID(),
      emisor: 'usuario',
      texto,
      timestamp: new Date().toISOString()
    };
    setMensajes((prev) => [...prev, nuevo]);
  };

  return (
    <div className="contenedor-chat">
      <HistorialMensajes mensajes={mensajes} />
      <EntradaMensaje onEnviar={agregarMensaje} />
    </div>
  );
}

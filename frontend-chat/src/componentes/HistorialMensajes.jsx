import BurbujaMensaje from './BurbujaMensaje';
import { useRef, useEffect } from 'react';

function HistorialMensajes({ mensajes }) {
  const refFinal = useRef();

  useEffect(() => {
    refFinal.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  return (
    <div
      className="historial-mensajes overflow-y-auto h-[300px] rounded-t-2xl shadow-inner relative flex flex-col gap-2 px-4 py-4"
      style={{
        backgroundImage: 'url("/bg6.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: '400px',         // 👁️ Ajusta a gusto
        backgroundPosition: 'center',
        backgroundOpacity: '0.5',
        backgroundAttachment: 'fixed',    // ✅ para que scrollee dentro del bloque
      }}
    >
      {/* Mensaje guía si aún no hay mensajes */}
      {mensajes.length === 0 && (
        <p className="text-gray-400 text-sm text-center">
          Aún no hay mensajes...
        </p>
      )}

      {/* Renderizado de mensajes */}
      {mensajes.map(({ id, texto, emisor }) => (
        <BurbujaMensaje
          key={id}
          texto={texto}
          emisor={emisor}
          className="text-sm px-3 py-2 rounded-lg max-w-[80%] self-end"
        />
      ))}

      {/* Marcador invisible para scroll automático */}
      <div ref={refFinal} />
    </div>
  );
}

export default HistorialMensajes;

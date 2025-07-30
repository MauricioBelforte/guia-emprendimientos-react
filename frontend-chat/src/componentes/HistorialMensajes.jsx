function HistorialMensajes({ mensajes }) {
  return (
    <div className="historial-mensajes flex flex-col gap-2 px-4 py-4 overflow-y-auto h-[300px] bg-[#F8F8F8] rounded-md shadow-inner">
      
      {/* Mensaje guía si aún no hay mensajes */}
      {mensajes.length === 0 && (
        <p className="text-gray-400 text-sm text-center">Aún no hay mensajes...</p>
      )}

      {/* Renderizado dinámico de cada mensaje */}

   {/* // 🔜 TODO: reemplazar render directo por componente <BurbujaMensaje /> cuando esté creado
// mensajes.map((texto, index) => <BurbujaMensaje key={index} texto={texto} />)
 */}
      {mensajes.map((texto, index) => (
        <div
          key={index}
          className="bg-[#DCF8C6] text-sm px-3 py-2 rounded-lg max-w-[80%] self-end"
        >
          {texto}
        </div>
      ))}
    </div>
  );
}

export default HistorialMensajes;

// Este componente representa una burbuja de chat individual, tipo WhatsApp
// Recibe el texto del mensaje y una bandera para saber si es del usuario o de otro emisor

function BurbujaMensaje({ texto, emisor = 'usuario' }) {
      const estilos = {
    sistema: 'bg-white self-start text-xl text-gray-700',
    usuario: 'bg-[#DCF8C6] self-end text-xl text-black',
    otro: 'bg-white self-start text-black',
  };
  return (
    <div
      className={`
        px-3 py-3 rounded-lg text-sm max-w-[80%] mb-5 shadow-xl
        ${estilos[emisor] || estilos.otro} 
      `}
      // 📌 Explicación de clases:
      // px-3 py-2 → Espaciado interno suave
      // rounded-lg → Borde redondeado tipo burbuja
      // text-sm → Tamaño pequeño y legible
      // max-w-[80%] → No ocupa más del 80% del ancho (evita burbujas gigantes)
      // shadow-md → Sombra suave para destacar el mensaje
      // bg-[#DCF8C6] → Fondo verde claro si es el usuario (estilo WhatsApp)
      // bg-white → Fondo neutro si es otro emisor
      // self-end / self-start → Alineación derecha o izquierda según `esUsuario`
    >
      {
        texto?.trim() 
          ? texto 
          : <span className="text-gray-400 italic">[mensaje vacío]</span>
      }
      {/* 🔒 Defensa mínima:
          Si el texto está vacío o mal definido, se muestra un placeholder visual.
          Esto evita que React renderice una burbuja invisible. */}
    </div>
  );
}

export default BurbujaMensaje;

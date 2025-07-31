import { useState } from 'react'; // Importamos el hook 'useState' para manejar el estado del mensaje y posibles errores

 function EntradaMensaje({ onEnviar }) { // Define el componente, recibe una función por props llamada 'onEnviar'
  const [mensaje, setMensaje] = useState(''); // Estado que guarda el mensaje actual
  const [error, setError] = useState(false); // Estado para controlar si hay un error (campo vacío al enviar)

  // Maneja el cambio en el textarea cada vez que el usuario escribe
  const manejarCambio = (evento) => {
    setMensaje(evento.target.value); // Actualiza el mensaje según lo escrito
    if (error && evento.target.value.trim()) setError(false); // Si había error y el usuario escribe algo, lo desactiva

    // Ajuste dinámico de altura del textarea
    evento.target.style.height = 'auto'; // Resetea altura previa
    evento.target.style.height = `${evento.target.scrollHeight}px`; // Asigna nueva altura según contenido
  };

  // Maneja el envío del formulario (cuando se hace click en "Enviar")
  const manejarEnvio = (evento) => {
    evento.preventDefault(); // Previene recarga de la página
    if (mensaje.trim()) { // Solo envía si hay contenido real

      onEnviar(mensaje); // Llama a la función que envía el mensaje al padre
      setMensaje(''); // Limpia el campo después de enviar
    } else {
      setError(true); // Activa modo de error visual si el campo está vacío
    }
  };


//Agrega el envio del formulario con la tecla enter
  const manejarTecla = (evento) => {
  if (evento.key === 'Enter' && !evento.shiftKey) {
    evento.preventDefault(); // Previene el salto de línea
    manejarEnvio(evento); // Reutiliza tu lógica de envío
  }
};


  return (
    <form onSubmit={manejarEnvio} className="entrada-mensaje flex p-4 gap-4 bg-[#c6e99dc2]  rounded-b-2xl  items-end"> {/* Este bloque maneja el envío y alinea el botón al fondo del textarea dinámico */}
      
      {/* Textarea con altura automática, fondo claro y borde defensivo */}
      <textarea
        value={mensaje} // Vincula el valor del textarea al estado
        onChange={manejarCambio} // Maneja el cambio en tiempo real y ajusta altura
        onKeyDown={manejarTecla}
        placeholder="Escribí tu mensaje..." // Texto guía para el usuario
        rows={1} // Altura mínima en una línea
        className={`
          flex-grow px-4 py-2 rounded-md bg-[#FEFEFE] resize-none overflow-hidden
          border ${error ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}
          focus:outline-none focus:ring focus:ring-indigo-300
        `} // Estilos visuales + defensas si hay error
        style={{ minHeight: '40px', maxHeight: '200px' }} // Limita el crecimiento vertical para evitar desbordes
      />

      {/* Botón de envío con alineación vertical automática (se mantiene abajo mientras crece el textarea) */}
      <button
        type="submit"
        className="self-end text-white bg-[#8e82cf] hover:bg-[#846eff] px-4 py-2 rounded-md transition disabled:opacity-90" // Botón estilo WhatsApp con colores respetados
        disabled={!mensaje.trim()} // Desactiva si no hay texto válido
      >
        Enviar
      </button>
    </form>
  );
}

export default EntradaMensaje; // Exportamos el componente para usarlo en App.jsx o en otro lugar
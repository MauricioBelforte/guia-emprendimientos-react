import { useState } from 'react'; // Importa el hook 'useState' para manejar el texto del input

function EntradaMensaje({ onEnviar }) { // Define el componente, recibe una función por props llamada 'onEnviar'
  const [mensaje, setMensaje] = useState(''); // Crea una variable 'mensaje' que empieza vacía. Se actualiza con 'setMensaje'
  const [error, setError] = useState(false); // Variable para manejar errores si se intenta enviar sin contenido

  const manejarCambio = (e) => {
    setMensaje(e.target.value); // Cada vez que el usuario escribe, actualizamos el estado
    if (error && e.target.value.trim()) setError(false); // Si había error y ahora escribe, lo desactivamos
  };

  const manejarEnvio = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    if (mensaje.trim()) { // Solo enviamos si hay texto real
      onEnviar(mensaje); // Llamamos a la función 'onEnviar' pasando el mensaje como argumento
      setMensaje(''); // Limpiamos el campo después de enviar
    } else {
      setError(true); // Activamos error si se intenta enviar vacío
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="entrada-mensaje flex gap-4 items-start"> {/* Este bloque maneja el envío y alinea elementos */}
      <input
        type="text"
        value={mensaje} // El valor que se ve en el input es el estado actual
        onChange={manejarCambio} // Cada cambio actualiza el estado
        placeholder="Escribí tu mensaje..." // Mensaje de ejemplo dentro del campo
        className={`flex-grow px-4 py-2 rounded-md bg-[#FEFEFE] border ${error ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'} focus:outline-none focus:ring focus:ring-green-500`} // Visualmente indica si hay error
      />
      <button
        type="submit"
        className="text-white bg-[#1B8755] hover:bg-[#1DAA61] px-4 py-2 rounded-md transition disabled:opacity-50" // Botón estilo WhatsApp para enviar el texto
        disabled={!mensaje.trim()} // Desactiva el botón si no hay texto válido
      >
        Enviar
      </button>
    </form>
  );
}

export default EntradaMensaje; // Exportamos el componente para usarlo en App.jsx o en otro lugar
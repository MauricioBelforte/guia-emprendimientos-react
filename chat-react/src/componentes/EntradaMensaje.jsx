import { useState } from 'react'; // Importa el hook 'useState' para manejar el texto del input

function EntradaMensaje({ onEnviar }) { // Define el componente, recibe una función por props llamada 'onEnviar'
  const [mensaje, setMensaje] = useState(''); // Crea una variable 'mensaje' que empieza vacía. Se actualiza con 'setMensaje'

  const manejarCambio = (e) => setMensaje(e.target.value); // Cada vez que el usuario escribe, actualizamos el estado

  const manejarEnvio = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    if (mensaje.trim()) { // Solo enviamos si hay texto real
      onEnviar(mensaje); // Llamamos a la función 'onEnviar' pasando el mensaje como argumento
      setMensaje(''); // Limpiamos el campo después de enviar
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="entrada-mensaje"> {/* Este bloque maneja el envío */}
      <input
        type="text"
        value={mensaje} // El valor que se ve en el input es el estado actual
        onChange={manejarCambio} // Cada cambio actualiza el estado
        placeholder="Escribí tu mensaje..." // Mensaje de ejemplo dentro del campo
        className="input-texto"
      />
      <button type="submit" className="boton-enviar"> {/* Botón para enviar el texto */}
        Enviar
      </button>
    </form>
  );
}

export default EntradaMensaje; // Exportamos el componente para usarlo en App.jsx o en otro lugar

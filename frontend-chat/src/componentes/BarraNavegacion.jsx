
// Recibe: 
// - vistaActual (string): vista activa ('Chat', etc.)
// - onCambiarVista (función): setter que actualiza esa vista en App
function BarraNavegacion({ vistaActual, onCambiarVista }) {
  const vistas = ['Chat', 'Emprendimientos'];

  return (
    <nav className="bg-indigo-500 text-white px-6 py-4 shadow-md">
      {/* Contenedor vertical para título y botones */}
      <div className="flex flex-col lg:flex-row md:items-center md:justify-between gap-2 ">
        
        {/* Título fijo, independiente del layout */}
        <h1 className="text-4xl font-bold leading-tight py-2 font-roboto">
          Guía de Emprendimientos <br className="lg:hidden" /> {/* Elimina el salto de linea para pantallas del medium para arriba */}
          y Servicios Locales
        </h1>

        {/* Botones para cambiar vistas internas */}
        <div className="flex flex-row  gap-2 justify-center pl-6 py-2">
          {vistas.map((vista) => (
            <button
              key={vista}
              onClick={() => onCambiarVista(vista)}
              className={`py-2 px-4 rounded transition-colors ${
                vistaActual === vista
                  ? 'bg-white text-indigo-600 font-semibold'
                  : 'hover:bg-indigo-400'
              }`}
              aria-current={vistaActual === vista ? 'page' : undefined}
            >
              {vista} {/* Contenido del boton que muestra el nombre de la vista */}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;

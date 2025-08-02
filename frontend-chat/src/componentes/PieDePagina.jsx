// src/componentes/PieDePagina.jsx
// src/componentes/PieDePagina.jsx
export default function PieDePagina() {
  return (
    <footer className="bg-[#211f1f] text-center py-4 text-sm text-gray-300 border-t-2 border-t-indigo-800 mt-1">
      <p>
        Diseñado por <strong>Mauricio Belforte</strong> —{" "}
        <a
          href="https://mauriciobelforte.github.io/mi-portfolio/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-500 transition-colors duration-200 ease-in-out"
        >
          Explorá mi portfolio con algunos de mis trabajos
        </a>
      </p>
      <p className="mt-2 text-xs text-gray-500">
        © {new Date().getFullYear()} Mauricio Belforte. Todos los derechos reservados.
      </p>
    </footer>
  );
}


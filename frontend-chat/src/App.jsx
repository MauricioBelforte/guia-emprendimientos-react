import { useState } from 'react'

import './App.css'

import ChatApp from './componentes/ChatApp'
import BarraNavegacion from './componentes/BarraNavegacion'
/* import ListaEmprendimientos from './componentes/ListaEmprendimientos'
import VistaPerfil from './componentes/VistaPerfil' */

function App() {
   const [vistaActual, setVistaActual] = useState('Chat');


  return (
    <>
 
    <div className="min-h-screen bg-[#fffeda]">
      {/* Llamada al componente de navegación */}
      <BarraNavegacion
        vistaActual={vistaActual}        // Valor actual del estado
        onCambiarVista={setVistaActual} // Setter que se pasa como prop
      />

      {/* Vista central que cambia según el estado */}
      <main className="p-4">
        {vistaActual === 'Chat' && <ChatApp />}
        {vistaActual === 'Emprendimientos' && <ListaEmprendimientos />}
        {vistaActual === 'Perfil' && <VistaPerfil />}
      </main>
    </div>

      {/* <ChatApp /> */}

    </>
  )
}

export default App

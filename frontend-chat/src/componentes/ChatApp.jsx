import { useState } from "react";
import HistorialMensajes from "./HistorialMensajes";
import EntradaMensaje from "./EntradaMensaje";
import { guardarFicha } from '../services/guardarFicha';

// 🧠 Clase 10: flujo guiado con bienvenida integrada
const preguntasSistema = [
  {
    pregunta: "👋¡Hola! Estoy acá para ayudarte \n😊 Compartí el nombre de tu Instagram para que todo el mundo te conozca!",
    explicacion: "👉 Podés escribirlo sin el @. \n😉 Si te confundís en algún paso no te preocupes, al final lo modificamos juntos.",
    clave: "instagram"
  },
  {
    pregunta: "🎉 ¡Solo con dejar tu Instagram ya sos parte de la comunidad! \nPodés irte cuando quieras. Lo que ya compartiste queda guardado con cariño, y podés volver a editarlo más adelante.  \n 🔎 ¿Querés que te encuentren más rápido? Respondé por SI o por NO",
    explicacion: "👉 Este paso decide si continuás dejando más datos para ayudar al sistema a promocionarte por Localidad, Rubro, etc.",
    clave: "quiere_ser_visible"
  },
  {
    pregunta: "📍 ¿De qué provincia sos 🏞️?",
    explicacion: "Dejar tu provincia ayuda a que te encuentren en tu zona.",
    clave: "provincia"
  },
  {
    pregunta: "📍 ¿Y tu ciudad? 🏙️",
    explicacion: "Tu ciudad permite que otros usuarios locales te encuentren más fácil.",
    clave: "ciudad"
  },
  {
    pregunta: "📍 ¿Querés agregar tu barrio? 🏘️",
    explicacion: "Tu barrio conecta con clientes o vecinos cercanos si querés vender localmente.",
    clave: "barrio"
  },
  {
    pregunta: "¿Ofrecés un producto 🍰👗 o un servicio 👨‍🔧?",
    explicacion: "Esto ayuda a que te encuentren por lo que brindás. (Responde con la palabra producto o servicio)",
    clave: "tipo"
  },
  {
    pregunta: "¿A qué te dedicás? 👩‍🍳👩‍🏫👷",
    explicacion: "Puede ser algo como: 'venta de ropa', 'servicio de limpieza', etc.",
    clave: "rubro"
  },
  {
    pregunta: "💡 Si querés contarnos en una oración, algo mas sobre tu emprendimiento podés escribirlo en este momento.",
    explicacion: "Esto ayuda a que otros te conozcan mejor, podes mencionar cual es tu especialidad por ejemplo.",
    clave: "descripcion"
  },
  {
    pregunta: "🔄 ¿Querés dejar tu email por si en el futuro querés modificar tus datos?",
    explicacion: "Es útil si cambiás tu cuenta de Instagram o querés actualizar info.",
    clave: "email"
  }
  ,
  {
    pregunta: "🌐 ¿Tenés pagina web?",
    explicacion: "Copiá y pegá el link de tu sitio web.",
    clave: "website"
  }
];

export default function ChatApp() {
  const [mensajes, setMensajes] = useState([
    {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: preguntasSistema[0].pregunta + "\n" + preguntasSistema[0].explicacion,
      timestamp: new Date().toISOString()
    }
  ]);/* Maneja el estado de TODOS los mensajes del chat, contiene el estado inicial de la primer pregunta.
  En texto guardo la pregunta y la explicacion del primer mensaje del arreglo preguntasSistema, que en este caso es el mensaje de bienvenida*/

  const [indicePregunta, setIndicePregunta] = useState(0); /*Estado inicial del indice de la pregunta, la pregunta de bienvenida tiene el indice 0 */
  const [respuestasUsuario, setRespuestas] = useState({}); /* Estado inicial de las respuestas, es un objeto vacio   */

  const [flujoFinalizado, setFlujoFinalizado] = useState(false);/* Estado inicial del flujo completo incluido ediciones */
      // Si el usuario quiere modificar algún dato, se espera que escriba el nombre del campo

const [modoEdicionActivo, setModoEdicionActivo] = useState(false);



  /* Funcion que maneja el envio de mensajes */
  const agregarMensajeUsuario = (textoMensajeUsuario) => { /* Se llama recien cuando el usuario envia un mensaje por props, que proviene de el componente EntradaMensaje */
    const timestamp = new Date().toISOString();



   /* Este if de flujoFinalizado chequea si se terminaron todas las preguntas basicas del sistema.
   Si el flujo ya terminó, se activa el modo edición.
   Si el usuario escribe un campo válido, se permite editarlo
    */   



  // 🛠️ Si estamos esperando la respuesta editada
  if (flujoFinalizado && modoEdicionActivo) {
    const claveActual = preguntasSistema[indicePregunta]?.clave;
    const respuestasActualizadas = { ...respuestasUsuario, [claveActual]: textoMensajeUsuario };

    setRespuestas(respuestasActualizadas);
    setMensajes(prev => [...prev,
      { id: crypto.randomUUID(), emisor: 'usuario', texto: textoMensajeUsuario, timestamp }
    ]);

    mostrarFicha(respuestasActualizadas, "📝 Ficha actualizada:");
    setModoEdicionActivo(false); // Salimos del modo edición
    return;
  }

  // 🛠️ Si el flujo está finalizado pero aún no se eligió campo
  if (flujoFinalizado) {
    const campoAEditar = textoMensajeUsuario.toLowerCase().trim();
    const esCampoValido = preguntasSistema.some(p => p.clave === campoAEditar);

    if(campoAEditar==="no"){
        setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: `😊 Muchas gracias por ser parte de esta gran comunidad de Emprendimientos locales! Muchos éxitos! 🎉 \n 
          Podés navegar por la Web y conocer todos los emprendimientos de tu zona, presionando en la sección Emprendimientos`,
          timestamp
        }
      ]);
      return;
    } else if (!esCampoValido) {
      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: `😕 No reconozco ese campo. Si querés modificar tu ficha, podés escribir el campo que queres editar, por ejemplo: 'provincia', 'email', 'descripcion', etc.`,
          timestamp
        }
      ]);
      return;
    }
     const preguntaOriginal = preguntasSistema.find(p => p.clave === campoAEditar);

    setMensajes(prev => [...prev,
      {
        id: crypto.randomUUID(),
        emisor: 'sistema',
        texto: `✏️ Vamos a editar el campo '${campoAEditar}'.\n` + preguntaOriginal.pregunta + "\n" + preguntaOriginal.explicacion,
        timestamp
      }
    ]);

    setIndicePregunta(preguntasSistema.findIndex(p => p.clave === campoAEditar));
    setModoEdicionActivo(true); // Activamos modo edición
    return;
  }

    const claveActual = preguntasSistema[indicePregunta]?.clave; /* Obtiene la clave de la pregunta actual del arreglo preguntasSistema, en el primer llamado guarda la clave del indice 0 de la pregunta de bienvenida que es instagram  */
    /*  respuestasUsuarioActualizadas es un solo objeto que guarda las respuestas del usuario, en formato clave:valor */
    const respuestasUsuarioActualizadas = { ...respuestasUsuario, [claveActual]: textoMensajeUsuario }; /* Una vez que tiene la clave actual (en el primer paso instagram), se crea una copia del objeto respuestas (que en el primer paso esta vacio) y se agrega un nueva respuesta con la clave actual y el texto del mensaje  */

    setRespuestas(respuestasUsuarioActualizadas); /* Actualiza el estado del objeto respuestas con el nuevo objeto respuestasUsuarioActualizadas que contiene todas las respuestas del usuario creadas hasta el momento   */
    setMensajes(prev => [...prev,
      { id: crypto.randomUUID(), emisor: 'usuario', texto: textoMensajeUsuario, timestamp }
    ]); /*Actualiza el estado creando una copia del arreglo de mensajes agregando el nuevo mensaje del usuario y actualiza el estado de mensajes*/

    // 🚪 Si no quiere seguir en paso 1
    if (indicePregunta === 1 && textoMensajeUsuario.toLowerCase().includes("no")) {
      mostrarFicha(respuestasUsuarioActualizadas, "👌 ¡Gracias por compartir tus datos! 🎉 \n 👇 Esta es tu ficha:");
      guardarFicha(respuestasUsuarioActualizadas, setMensajes);
      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: "¡Perfecto! 😊 Tu perfil está creado con lo que dejaste. Si querés volver a editarlo más adelante, no hay problema.",
          timestamp
        }
      ]);
      setFlujoFinalizado(true);
      return;
    }

    // Una vez que se llama a esta funcion agregarMensajeUsuario, se avanza a la siguiente pregunta 
    if (indicePregunta + 1 < preguntasSistema.length) {
      const siguientePregunta = preguntasSistema[indicePregunta + 1];
      setIndicePregunta(indicePregunta + 1); /* Actualiza el estado del indice de la pregunta para que avance al siguiente paso */
      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: siguientePregunta.pregunta + "\n" + siguientePregunta.explicacion,
          timestamp
        }
      ]); /* Actualiza el estado creando una copia del arreglo de mensajes agregando el nuevo mensaje del sistema */
    
    
    
    
    
    } else {

      mostrarFicha(respuestasUsuarioActualizadas, "👌 ¡Gracias por compartir tus datos! 🎉 \n 👇 Esta es tu ficha:");
       
      guardarFicha(respuestasUsuarioActualizadas, setMensajes);
      // setIndicePregunta(indicePregunta + 1);  opcional: marcar fin de flujo, finalizaron las preguntas principales 
      setFlujoFinalizado(true);/* Actualiza el estado del flujo finalizado, activa el modo edición */

     



             

    }


  };




const mostrarFicha = (respuestas, encabezado = "📝 Ficha actualizada:") => {
  const resumen = `Instagram: ${respuestas.instagram || 'No proporcionado'}
Provincia: ${respuestas.provincia || 'No especificado'}
Ciudad: ${respuestas.ciudad || 'No especificado'}
Barrio: ${respuestas.barrio || 'No especificado'}
Tipo: ${respuestas.tipo || 'No aclarado'}
Rubro: ${respuestas.rubro || 'No definido'}
Descripción: ${respuestas.descripcion || 'No brindada'}
Email: ${respuestas.email || 'No compartido'}
Website: ${respuestas.website || 'No compartido'}`;

  const timestamp = new Date().toISOString();

  setMensajes(prev => [...prev,
    {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: encabezado,
      timestamp
    },
    {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: resumen,
      timestamp
    },
    {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: "¿Querés modificar algún dato? Escribí el nombre del campo como 'provincia', 'email', etc.",
      timestamp
    }
  ]);
};








  return (
    /* Cuando se pasan props a un componente hijo, la convencion es usar on al comienzo del nombre para indicar que es una funcion.
    El funcionamiento es asi, creo el componente en este caso EntradaMensaje.jsx y le paso la funcion agregarMensajeUsuario al hijo para que la cargue con datos del mensaje como paramentro */
    <div className="contenedor-chat flex-1 flex flex-col whitespace-pre-line">
      {/* Apenas se monta este componente principal ChatApp.jsx, es decir cuando lo llama App.jsx, se renderiza el componente HistorialMensajes con el estado inicial de mensajes, que es la pregunta[0] que contiene el mensaje de bienvenida */}
      <HistorialMensajes mensajes={mensajes} />
      {/* Apenas se monta este componente principal ChatApp.jsx, es decir cuando lo llama App.jsx, se renderiza el componente EntradaMensaje con la funcion agregarMensajeUsuario como prop que no tiene estado inicial porque no necesita pasar datos iniciales para crear el componente  */}
      <EntradaMensaje onEnviar={agregarMensajeUsuario} />
      {/* El componente EntradaMensaje.jsx que maneja la entrada de texto del usuario y el envío de mensajes. Recibe la función agregarMensajeUsuario como prop. Y vuelve cargada con los datos del mensaje del usuario, para que cuando vuelva llame a la funcion agregarMensajeUsuario y renderiza el componente HistorialMensajes para el segundo paso*/}
    </div>
  );
}

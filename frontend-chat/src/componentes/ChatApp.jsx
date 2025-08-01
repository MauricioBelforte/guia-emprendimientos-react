import { useState } from "react";
import HistorialMensajes from "./HistorialMensajes";
import EntradaMensaje from "./EntradaMensaje";

// 🧠 Clase 10: flujo guiado con bienvenida integrada
const preguntas = [
  {
    texto: "👋¡Hola! Estoy acá para ayudarte \n😊 Compartí el nombre de tu Instagram para que todo el mundo te conozca!",
    explicacion: "👉 Podés escribirlo sin el @. \n😉 Si te confundís en algún paso no te preocupes, al final lo modificamos juntos.",
    clave: "instagram"
  },
  {
    texto: "🎉 ¡Solo con dejar tu Instagram ya sos parte de la comunidad!  \n 🔎 ¿Querés que te encuentren más rápido? SI/NO",
    explicacion: "👉 Este paso decide si continuás dejando más datos para ayudar al sistema a promocionarte por Localidad, Rubro, etc.",
    clave: "quiere_ser_visible"
  },
  {
    texto: "📍 ¿De qué provincia sos 🏞️?",
    explicacion: "Dejar tu provincia ayuda a que te encuentren en tu zona.",
    clave: "provincia"
  },
  {
    texto: "📍 ¿Y tu ciudad? 🏙️",
    explicacion: "Tu ciudad permite que otros usuarios locales te encuentren más fácil.",
    clave: "ciudad"
  },
  {
    texto: "📍 ¿Querés agregar tu barrio? 🏘️",
    explicacion: "Tu barrio conecta con clientes o vecinos cercanos si querés vender localmente.",
    clave: "barrio"
  },
  {
    texto: "¿Ofrecés un producto 🍰👗 o un servicio 👨‍🔧?",
    explicacion: "Esto ayuda a que te encuentren por lo que brindás.",
    clave: "tipo"
  },
  {
    texto: "¿A qué te dedicás? 👩‍🍳👩‍🏫👷",
    explicacion: "Puede ser algo como: 'venta de ropa', 'servicio de limpieza', etc.",
    clave: "rubro"
  },
  {
    texto: "💡 ¿Querés dejarnos una descripción breve? (una oración)",
    explicacion: "Esto ayuda a que otros te conozcan mejor.",
    clave: "descripcion"
  },
  {
    texto: "🔄 ¿Querés dejar tu email por si en el futuro querés modificar tus datos?",
    explicacion: "Es útil si cambiás tu cuenta de Instagram o querés actualizar info.",
    clave: "email"
  }
  ,
  {
    texto: "🌐 ¿Tenés pagina web?",
    explicacion: "Copiá y pegá el link de tu sitio web.",
    clave: "website"
  }
];

export default function ChatApp() {
  const [mensajes, setMensajes] = useState([
    {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: preguntas[0].texto + "\n" + preguntas[0].explicacion,
      timestamp: new Date().toISOString()
    }
  ]);/* Maneja el estado de TODOS los mensajes del chat, contiene el estado inicial de la primer pregunta */

  const [indicePregunta, setIndicePregunta] = useState(0); /*Estado inicial del indice de la pregunta */
  const [respuestas, setRespuestas] = useState({});

  const agregarMensaje = (textoMensaje) => {
    const timestamp = new Date().toISOString();
    const claveActual = preguntas[indicePregunta]?.clave;
    const respuestasActualizadas = { ...respuestas, [claveActual]: textoMensaje }; /* Se crea una copia del objeto respuestas y se agrega (o actualiza) la clave actual con el nuevo mensaje  */

    setRespuestas(respuestasActualizadas);
    setMensajes(prev => [...prev,
      { id: crypto.randomUUID(), emisor: 'usuario', texto: textoMensaje, timestamp }
    ]);

    // 🚪 Si no quiere seguir en paso 1
    if (indicePregunta === 1 && textoMensaje.toLowerCase().includes("no")) {
      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: "¡Perfecto! 😊 Tu perfil está creado con lo que dejaste. Si querés volver a editarlo más adelante, no hay problema.",
          timestamp
        }
      ]);
      return;
    }

    // ➕ Avanzar al siguiente paso si existe
    if (indicePregunta + 1 < preguntas.length) {
      const siguientePregunta = preguntas[indicePregunta + 1];
      setIndicePregunta(indicePregunta + 1);
      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: siguientePregunta.texto + "\n" + siguientePregunta.explicacion,
          timestamp
        }
      ]);
    } else {
      // ✅ Generar ficha resumen con todas las respuestas finales
      const resumen = `Instagram: ${respuestasActualizadas.instagram || 'No proporcionado'}
      Provincia: ${respuestasActualizadas.provincia || 'No especificado'}
      Ciudad: ${respuestasActualizadas.ciudad || 'No especificado'}
      Barrio: ${respuestasActualizadas.barrio || 'No especificado'}
      Tipo: ${respuestasActualizadas.tipo || 'No aclarado'}
      Rubro: ${respuestasActualizadas.rubro || 'No definido'}
      Descripción: ${respuestasActualizadas.descripcion || 'No brindada'}
      Email: ${respuestasActualizadas.email || 'No compartido'}`;

      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: "👌 ¡Gracias por compartir tus datos! 🎉 \n 👇 Esta es tu ficha: ",
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
          texto: "Si querés modificar alguno de tus datos, escribí el nombre del campo: por ejemplo 'provincia', 'email' o 'descripcion'.",
          timestamp
        }
      ]);

      setIndicePregunta(indicePregunta + 1); // opcional: marcar fin de flujo
    }
  };

  return (
    <div className="contenedor-chat flex-1 flex flex-col whitespace-pre-line">
      <HistorialMensajes mensajes={mensajes} />
      <EntradaMensaje onEnviar={agregarMensaje} />
    </div>
  );
}

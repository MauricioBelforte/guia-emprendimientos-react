
# 🧠 Clase 10: Flujo Conversacional Guiado con Bienvenida Integrada y Ficha Final


## 🧩 Estructura general del componente `ChatApp`

Este componente es el corazón del sistema conversacional. Maneja:
- El **estado de los mensajes** (`mensajes`)
- El **estado del índice de pregunta actual** (`indicePregunta`)
- El **estado de las respuestas del usuario** (`respuestas`)
- La **lógica de avance**, condiciones especiales y generación de ficha final

---

## 🧠 Estados iniciales

```jsx
const [mensajes, setMensajes] = useState([
  {
    id: crypto.randomUUID(),
    emisor: 'sistema',
    texto: preguntas[0].pregunta + "\n" + preguntas[0].explicacion,
    timestamp: new Date().toISOString()
  }
]);
```

- Se inicia con un solo mensaje del sistema: la **pregunta de bienvenida**.
- `mensajes` es un array que se irá llenando con cada interacción.
- `crypto.randomUUID()` genera un ID único para cada mensaje (buena práctica para React al renderizar listas).
- `timestamp` guarda la hora del mensaje, útil para orden o trazabilidad futura.

---

## 🔄 Función `agregarMensajeUsuario`

Esta función se activa cuando el usuario envía un mensaje desde el componente hijo `EntradaMensaje`.

### 1. Guarda la respuesta del usuario

```jsx
const claveActual = preguntas[indicePregunta]?.clave;
const respuestasActualizadas = { ...respuestas, [claveActual]: textoMensajeUsuario };
setRespuestas(respuestasActualizadas);
```

- Extrae la **clave** de la pregunta actual (ej: `"instagram"`)
- Crea una copia del objeto `respuestas` y le agrega la nueva respuesta
- Actualiza el estado con `setRespuestas`

### 2. Agrega el mensaje del usuario al historial

```jsx
setMensajes(prev => [...prev,
  { id: crypto.randomUUID(), emisor: 'usuario', texto: textoMensajeUsuario, timestamp }
]);
```

- Se agrega el mensaje del usuario al array `mensajes`
- Esto permite que el historial se renderice con el nuevo mensaje

### 3. Condición especial: si el usuario responde "no" en el paso 1

```jsx
if (indicePregunta === 1 && textoMensajeUsuario.toLowerCase().includes("no")) {
  // mensaje de cierre anticipado
  return;
}
```

- Si el usuario no quiere seguir, se corta el flujo y se le muestra un mensaje de cierre
- No se avanza a la siguiente pregunta

### 4. Avanza a la siguiente pregunta (si hay más)

```jsx
if (indicePregunta + 1 < preguntas.length) {
  const siguientePregunta = preguntas[indicePregunta + 1];
  setIndicePregunta(indicePregunta + 1);
  setMensajes(prev => [...prev,
    {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: siguientePregunta.pregunta + "\n" + siguientePregunta.explicacion,
      timestamp
    }
  ]);
}
```

- Se incrementa el índice
- Se muestra la siguiente pregunta del sistema

### 5. Si ya no hay más preguntas → genera ficha resumen

```jsx
const resumen = `Instagram: ${respuestasActualizadas.instagram || 'No proporcionado'} ...`;
```

- Se arma un resumen con todas las respuestas
- Se agregan 3 mensajes finales:
  1. Agradecimiento
  2. Ficha generada
  3. Instrucción para editar campos

---

## 🧱 Renderizado de componentes hijos

```jsx
<HistorialMensajes mensajes={mensajes} />
<EntradaMensaje onEnviar={agregarMensajeUsuario} />
```

- `HistorialMensajes` recibe el array de mensajes y los muestra
- `EntradaMensaje` recibe la función `agregarMensajeUsuario` como prop
  - Cuando el usuario envía un mensaje, esta función se ejecuta con el texto

---

## 💡 Sugerencias para seguir creciendo

- Podés agregar un estado `flujoFinalizado` para manejar mejor el cierre del flujo
- Modularizar la lógica de generación de ficha en una función aparte (`generarFicha(respuestas)`)
- Agregar validaciones defensivas por tipo de dato (email, website, etc.)
- Mostrar un resumen parcial en cada paso para reforzar la sensación de avance

---




### 📦 Importaciones

```js
import { useState } from "react";
```
- `useState` es una herramienta que nos da React para **guardar información que puede cambiar**.
- Cada vez que esa información cambia, **React actualiza la pantalla automáticamente**.

```js
import HistorialMensajes from "./HistorialMensajes";
import EntradaMensaje from "./EntradaMensaje";
```
- Usamos dos componentes que vienen de otros archivos:
  - `HistorialMensajes`: muestra todos los mensajes del chat.
  - `EntradaMensaje`: es la cajita donde el usuario escribe y envía su respuesta.

---

### 🗃️ Preguntas Guiadas

```js
const preguntas = [ ... ]
```
- Es una lista (array) con cada paso que el usuario va a ir respondiendo.
- Cada pregunta tiene:
  - `texto`: lo que se pregunta.
  - `explicacion`: una ayuda emocional que explica por qué se pregunta.
  - `clave`: el nombre con el que se guarda esa respuesta.

> 💡 La primera pregunta es especial: da la bienvenida y pide el Instagram. Pero está integrada como cualquier otra.

---

### 🧱 Componente Principal: `ChatApp`

```js
export default function ChatApp() {
```
- Es el bloque principal que React usa para mostrar esta pantalla.
- Todo lo que pasa en el chat está dentro de esta función.

---

### 💬 Estados de la aplicación

```js
const [mensajes, setMensajes] = useState([
  {
    id: crypto.randomUUID(),
    emisor: 'sistema',
    texto: preguntas[0].texto + "\n" + preguntas[0].explicacion,
    timestamp: new Date().toISOString()
  }
]);
```
- `mensajes` es una lista con todo lo que se ve en el chat.
- Empezamos con un solo mensaje: el sistema da la bienvenida y hace la primera pregunta.

```js
const [pasoActual, setPasoActual] = useState(0);
```
- `pasoActual` indica en qué pregunta estamos.
- Como la bienvenida está en `preguntas[0]`, empezamos en el paso 0.

```js
const [respuestas, setRespuestas] = useState({});
```
- `respuestas` es un objeto que guarda lo que el usuario va contestando.
- Ejemplo: `{ instagram: "miCuenta", provincia: "Chubut" }`

---

### 🔁 Función principal: `agregarMensaje`

```js
const agregarMensaje = (texto) => {
  const timestamp = new Date().toISOString();
```
- Esta función se activa cada vez que el usuario envía un mensaje.
- Guardamos la hora con `timestamp` para saber cuándo se envió.

---

#### 🟡 Guardar respuesta actual

```js
const claveActual = preguntas[pasoActual]?.clave;
const respuestasActualizadas = { ...respuestas, [claveActual]: texto };
setRespuestas(respuestasActualizadas);
```
- Buscamos qué clave corresponde a la pregunta actual (ej: `provincia`) y guardamos la respuesta.
- Usamos `...respuestas` para mantener las anteriores y agregar la nueva.

```js
setMensajes(prev => [...prev,
  { id: ..., emisor: 'usuario', texto, timestamp }
]);
```
- Mostramos el mensaje que el usuario acaba de enviar.

---

#### 🚪 Condicional de salida anticipada

```js
if (pasoActual === 1 && texto.toLowerCase().includes("no")) {
```
- Si estamos en el paso 1 (pregunta si quiere seguir) y el usuario dice "no", se termina el flujo.

```js
setMensajes(prev => [...prev,
  { id: ..., emisor: 'sistema', texto: "¡Perfecto! 😊 Tu perfil está creado...", timestamp }
]);
return;
```
- Mostramos un mensaje final y no seguimos preguntando.

---

#### ➕ Avanzar al siguiente paso

```js
if (pasoActual + 1 < preguntas.length) {
  const siguiente = preguntas[pasoActual + 1];
  setPasoActual(pasoActual + 1);
  setMensajes(prev => [...prev,
    { id: ..., emisor: 'sistema', texto: siguiente.texto + "\n\n" + siguiente.explicacion, timestamp }
  ]);
}
```
- Si todavía hay preguntas, avanzamos al siguiente paso y mostramos la nueva pregunta.

---

#### ✅ Si ya respondió todo: generar ficha resumen

```js
const resumen = `Instagram: ${respuestasActualizadas.instagram || 'No proporcionado'}
Provincia: ${respuestasActualizadas.provincia || 'No especificado'}
Ciudad: ${respuestasActualizadas.ciudad || 'No especificado'}
Barrio: ${respuestasActualizadas.barrio || 'No especificado'}
Tipo: ${respuestasActualizadas.tipo || 'No aclarado'}
Rubro: ${respuestasActualizadas.rubro || 'No definido'}
Descripción: ${respuestasActualizadas.descripcion || 'No brindada'}
Email: ${respuestasActualizadas.email || 'No compartido'}`;
```
- Creamos un texto con todas las respuestas del usuario.
- Si alguna falta, mostramos un mensaje por defecto.

```js
setMensajes(prev => [...prev,
  { id: ..., emisor: 'sistema', texto: "¡Gracias por compartir tus datos! 🎉 Esta es tu ficha:", timestamp },
  { id: ..., emisor: 'sistema', texto: resumen, timestamp },
  { id: ..., emisor: 'sistema', texto: "Si querés modificar alguno de tus datos...", timestamp }
]);
```
- Mostramos el resumen y damos instrucciones para editar.

```js
setPasoActual(pasoActual + 1);
```
- Marcamos que el flujo terminó. Esto puede servir para mostrar botones o reiniciar.

---

### 📱 Render final del componente

```js
return (
  <div className="contenedor-chat whitespace-pre-line">
    <HistorialMensajes mensajes={mensajes} />
    <EntradaMensaje onEnviar={agregarMensaje} />
  </div>
);
```
- Mostramos los dos componentes juntos:
  - El historial del chat.
  - El input para nuevos mensajes.




---
## 🧩 Clase 10 (ANTES DE PULIR EL CODIGO)— Conversación guiada con lógica de salida

### 🎯 Objetivo
Crear un sistema de preguntas y respuestas que:
- Invite cálidamente al usuario a dejar datos útiles.
- Explique el propósito de cada dato.
- Active una decisión condicional: si no quiere ser encontrado, se cierra el chat con gratitud.

---

## 🧠 Estado y flujo sugerido

```jsx
const preguntas = [
  {
    texto: "¡Ya estás dentro del sistema! 🎉 ¿Querés que te encuentren más fácilmente?",
    explicacion: "Este paso decide si continuás dejando más datos o no.",
    clave: "quiere_ser_visible"
  },
  {
    texto: "¿De qué provincia sos?",
    explicacion: "Dejar tu provincia ayuda a que te encuentren en tu zona.",
    clave: "provincia"
  },
  {
    texto: "¿Y tu ciudad?",
    explicacion: "Tu ciudad permite que otros usuarios locales te encuentren más fácil.",
    clave: "ciudad"
  },
  {
    texto: "¿Querés agregar tu barrio?",
    explicacion: "Tu barrio conecta con clientes o vecinos cercanos si querés vender localmente.",
    clave: "barrio"
  },
  {
    texto: "¿Vendés un producto, ofrecés un servicio o algo puntual en una palabra?",
    explicacion: "Esto ayuda a que te encuentren por lo que ofrecés directamente.",
    clave: "rubro"
  },
  {
    texto: "¿Querés dejar tu email por si en el futuro querés modificar tus datos?",
    explicacion: "Es importante si cambiás tu nombre de Instagram o querés actualizar tu info.",
    clave: "email"
  }
];
```

---

## ⚙️ Lógica defensiva en `agregarMensaje`

```jsx
const agregarMensaje = (texto) => {
  const claveActual = preguntas[pasoActual].clave;

  // Guardar la respuesta
  setRespuestas(prev => ({ ...prev, [claveActual]: texto }));

  // Condición: si en el paso 0 elige "no", cerrar el chat
  if (pasoActual === 0 && texto.toLowerCase().includes("no")) {
    setMensajes(prev => [...prev,
      {
        id: crypto.randomUUID(),
        emisor: 'usuario',
        texto,
        timestamp: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        emisor: 'sistema',
        texto: "¡Perfecto! 😊 Tu perfil está creado con lo que dejaste. Si querés volver a editarlo más adelante, no hay problema.",
        timestamp: new Date().toISOString()
      }
    ]);
    return;
  }

  // Agregar mensaje del usuario
  setMensajes(prev => [...prev,
    {
      id: crypto.randomUUID(),
      emisor: 'usuario',
      texto,
      timestamp: new Date().toISOString()
    }
  ]);

  // Avanzar si hay más preguntas
  if (pasoActual + 1 < preguntas.length) {
    setPasoActual(pasoActual + 1);
    const siguiente = preguntas[pasoActual + 1];
    setMensajes(prev => [...prev,
      {
        id: crypto.randomUUID(),
        emisor: 'sistema',
        texto: `${siguiente.texto}\n\n${siguiente.explicacion}`,
        timestamp: new Date().toISOString()
      }
    ]);
  } else {
    // Última respuesta, mostrar ficha resumen
    const cierre = {
      id: crypto.randomUUID(),
      emisor: 'sistema',
      texto: `¡Gracias por compartir tus datos! 🎉 Estamos creando tu ficha.`,
      timestamp: new Date().toISOString()
    };

    const resumen = `
Instagram: ${respuestas.instagram || 'No proporcionado'}
Provincia: ${respuestas.provincia || 'No especificado'}
Ciudad: ${respuestas.ciudad || 'No especificado'}
Barrio: ${respuestas.barrio || 'No especificado'}
Rubro: ${respuestas.rubro || 'No especificado'}
Email: ${respuestas.email || 'No compartido'}
`;

    setMensajes(prev => [...prev, cierre,
      {
        id: crypto.randomUUID(),
        emisor: 'sistema',
        texto: resumen,
        timestamp: new Date().toISOString()
      }
    ]);

    // Persistencia opcional
    localStorage.setItem("fichaUsuario", JSON.stringify(respuestas));
  }
};
```

---

## 📘 Naming emocional

- `preguntas`: array guiado con claves por paso.
- `respuestas`: objeto de visibilidad emocional y técnica.
- `clave`: con propósito emocional para cada dato (ej: barrio, ciudad, email).
- `explicacion`: genera empatía, evita rechazo técnico.


---

## 📁 Estructura del archivo `ChatApp.jsx`

Este archivo contiene la lógica completa del chat: el historial de mensajes, la entrada del usuario, y el flujo guiado por pasos.

---

### 🧠 1. Importamos React y los componentes visuales

```jsx
import { useState } from "react";
import HistorialMensajes from "./HistorialMensajes";
import EntradaMensaje from "./EntradaMensaje";
```

- `useState`: nos permite guardar información en memoria y actualizarla cuando cambie.
- `HistorialMensajes`: muestra todos los mensajes que se han enviado.
- `EntradaMensaje`: es el campo donde el usuario escribe.

---

### 🧩 2. Preguntas guiadas con explicación emocional

```jsx
const preguntas = [
  {
    texto: "¡Ya estás dentro del sistema! 🎉 ¿Querés que te encuentren más fácilmente?",
    explicacion: "Este paso decide si continuás dejando más datos o no.",
    clave: "quiere_ser_visible"
  },
  {
    texto: "¿De qué provincia sos?",
    explicacion: "Dejar tu provincia ayuda a que te encuentren en tu zona.",
    clave: "provincia"
  },
  ...
];
```

- Cada pregunta tiene un `texto`, una `explicacion` emocional para que el usuario entienda por qué se le pregunta eso, y una `clave` que usamos para guardar su respuesta.
- Esto nos permite guiar al usuario como si fuera un formulario paso a paso.

---

### 🧱 3. Componente principal `ChatApp`

```jsx
export default function ChatApp() {
```

- Este es el corazón del componente de conversación. Acá van los estados y funciones principales.

---

### 📦 4. Estados: mensajes, paso actual, respuestas

```jsx
  const [mensajes, setMensajes] = useState([
    {
      id: 1,
      emisor: 'sistema',
      texto: preguntas[0].texto + "\n\n" + preguntas[0].explicacion,
      timestamp: new Date().toISOString()
    }
  ]);
```

- `mensajes`: guarda todos los mensajes del sistema y del usuario.
- `id`: usamos `crypto.randomUUID()` para generar un identificador único.
- `emisor`: puede ser `'usuario'` o `'sistema'`.
- `texto`: lo que dice cada mensaje.
- `timestamp`: la fecha y hora en que se envió el mensaje.

```jsx
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});
```

- `pasoActual`: indica en qué pregunta estamos.
- `respuestas`: guarda lo que escribió el usuario en cada paso.

---

### 🎯 5. Función principal `agregarMensaje`

Esta función se ejecuta cada vez que el usuario envía un mensaje.

```jsx
  const agregarMensaje = (texto) => {
```

#### 📝 Guardar respuesta

```jsx
    const claveActual = preguntas[pasoActual].clave;
    setRespuestas(prev => ({ ...prev, [claveActual]: texto }));
```

- Usamos la clave de la pregunta actual para guardar la respuesta en el objeto `respuestas`.

#### 💬 Mostrar el mensaje del usuario

```jsx
    setMensajes(prev => [...prev,
      {
        id: crypto.randomUUID(),
        emisor: 'usuario',
        texto,
        timestamp: new Date().toISOString()
      }
    ]);
```

- Agregamos el mensaje del usuario al historial.

#### ⚠️ Si el usuario no quiere continuar (paso 0)

```jsx
    if (pasoActual === 0 && texto.toLowerCase().includes("no")) {
```

- Si escribe “no” en la primera pregunta, el sistema entiende que no quiere continuar.

```jsx
      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: "¡Perfecto! 😊 Tu perfil está creado con lo que dejaste. Si querés volver a editarlo más adelante, no hay problema.",
          timestamp: new Date().toISOString()
        }
      ]);
      return;
```

- Le agradece y cierra el flujo, sin avanzar más.

#### ➕ Si hay otra pregunta

```jsx
    if (pasoActual + 1 < preguntas.length) {
      const siguiente = preguntas[pasoActual + 1];
```

- Verifica si hay más pasos. Si sí, avanza al siguiente:

```jsx
      setPasoActual(pasoActual + 1);
      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: siguiente.texto + "\n\n" + siguiente.explicacion,
          timestamp: new Date().toISOString()
        }
      ]);
    }
```

- Muestra la siguiente pregunta junto con su explicación.

#### ✅ Si es la última respuesta: mostrar ficha resumen

```jsx
    else {
      const resumen = `
Instagram: ${respuestas.instagram || 'No proporcionado'}
Provincia: ${respuestas.provincia || 'No especificado'}
Ciudad: ${respuestas.ciudad || 'No especificado'}
Barrio: ${respuestas.barrio || 'No especificado'}
Rubro: ${respuestas.rubro || 'No especificado'}
Email: ${respuestas.email || 'No compartido'}
`;
```

- Armamos el resumen de la ficha final usando las respuestas guardadas.

```jsx
      setMensajes(prev => [...prev,
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: "¡Gracias por compartir tus datos! 🎉 Estamos creando tu ficha.",
          timestamp: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          emisor: 'sistema',
          texto: resumen,
          timestamp: new Date().toISOString()
        }
      ]);
```

- Mostramos el resumen como mensaje final del sistema.

```jsx
      localStorage.setItem("fichaUsuario", JSON.stringify(respuestas));
```

- Guardamos la ficha en el navegador para poder verla más tarde.

---

### 🖼️ 6. Renderizar el chat visual

```jsx
  return (
    <div className="contenedor-chat whitespace-pre-line">
      <HistorialMensajes mensajes={mensajes} />
      <EntradaMensaje onEnviar={agregarMensaje} />
    </div>
  );
}
```

- `whitespace-pre-line` permite que se vean bien los saltos de línea.
- `HistorialMensajes`: muestra todos los mensajes.
- `EntradaMensaje`: campo de texto para responder.

---



## 🧠 ¿Qué es `setMensajes(prev => [...prev, nuevoMensaje])`?

Es una manera de **actualizar el array de mensajes** sin perder lo que ya tenías.

- `setMensajes(...)`: actualiza el estado `mensajes`
- `prev => [...prev, nuevoMensaje]`: toma los mensajes anteriores (`prev`), los copia con `...prev` y al final les suma un nuevo mensaje.

---

## 🔎 ¿Qué hace el `...prev`?

El `...` se llama **operador spread** y significa “copiá todos los elementos que tiene este array”.

Entonces:

```js
[...prev]
```

Es igual que decir:

```js
[mensajes[0], mensajes[1], mensajes[2], ...]
```

O sea: **no lo borra, no lo reemplaza, solo lo expande** para agregar algo más.

---

## 💬 Ejemplo real

Supongamos que tus mensajes actuales (`prev`) son:

```js
[
  { texto: "Hola" },
  { texto: "¿De qué provincia sos?" }
]
```

Y querés agregar:

```js
{ texto: "¡Gracias por responder!" }
```

La expresión:

```js
[...prev, { texto: "¡Gracias por responder!" }]
```

Genera:

```js
[
  { texto: "Hola" },
  { texto: "¿De qué provincia sos?" },
  { texto: "¡Gracias por responder!" }
]
```

Así se crea el nuevo estado.

---

## 🛡️ ¿Por qué no hacemos `mensajes.push(...)`?

Porque en React **no se recomienda modificar los arrays directamente**. Siempre se hace una **copia nueva** con lo que había + lo nuevo, para que React detecte el cambio y re-renderice.

---

## 📦 Cápsula técnica defensiva (Clase 10)

| Expresión | Qué hace |
|-----------|-----------|
| `...prev` | Copia todos los mensajes previos |
| `setMensajes(...)` | Actualiza el estado con el nuevo array |
| `[...prev, nuevo]` | Crea un array nuevo con todo lo anterior + uno nuevo |
| `prev => ...` | Usamos función para asegurarnos de tener el estado más actualizado |

---

''
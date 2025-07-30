

## 🧩 Clase 4 — Alineación vertical emocional: `textarea` + botón “Enviar”

### 📌 Objetivo de la clase
Permitir que el `textarea` se agrande dinámicamente y que el botón “Enviar” se mantenga **centrado verticalmente** al lado del contenido, logrando una experiencia visual armónica y emocionalmente cálida, inspirada en la famosa app de mensajería.

---

## 🛠️ Paso a paso: decisiones técnicas y emocionales

### 1. **Expansión dinámica del `textarea`**
**Por qué:** Para que el usuario escriba con comodidad sin romper la estética, evitando barras de scroll internas.

**Cómo se hace:**
- Se usa `scrollHeight` para calcular la altura real del contenido.
- Se resetea primero con `height: 'auto'` para evitar acumulaciones.
- Luego se asigna el nuevo valor `height = scrollHeight + 'px'`.

```jsx
e.target.style.height = 'auto';
e.target.style.height = `${e.target.scrollHeight}px`;
```

---

### 2. **Alineación vertical centrada del botón**
**Por qué:** Antes el botón se alineaba abajo (`self-end`) lo que generaba desequilibrio visual cuando el textarea crecía. Al usar `self-center`, el botón sigue el ritmo visual del contenido.

**Cómo se resuelve:**
- En el `form`: usamos `items-center` para alinear todos los hijos en el eje vertical.
- En el botón: aplicamos `self-center` para que se mantenga alineado con el `textarea` sin importar su altura.

```jsx
<form className="flex gap-4 items-center">
  <textarea ... />
  <button className="self-center ...">Enviar</button>
</form>
```

---

### 3. **Comportamiento visual ante errores**
**Por qué:** Queremos una UX empática que avise sin agresividad cuando el campo está vacío.

**Cómo se resuelve:**
- Se activa el estado `error` si el campo está vacío y el usuario hace submit.
- Se aplica un borde rojo y `ring` para que el feedback sea visual pero suave.

```jsx
{error ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}
```

---

### 4. **Estilos emocionales inspirados en WhatsApp**
**Por qué:** Estás construyendo un ecosistema cálido y visualmente familiar. El verde es el color emocional de WhatsApp y refleja cercanía.

**Cómo se aplica:**
- Se define fondo blanco suave para el `textarea`: `bg-[#FEFEFE]`
- Se aplica verde principal en botón: `bg-[#1B8755]` y verde más brillante al hacer hover: `hover:bg-[#1DAA61]`

---

## 🧪 Código final: EntradaMensaje con `self-center`

```jsx
<form onSubmit={manejarEnvio} className="entrada-mensaje flex gap-4 items-center">
  <textarea
    value={mensaje}
    onChange={manejarCambio}
    placeholder="Escribí tu mensaje..."
    rows={1}
    className={`
      flex-grow px-4 py-2 rounded-md bg-[#FEFEFE] resize-none overflow-hidden
      border ${error ? 'border-red-400 ring-2 ring-red-200' : 'border-gray-300'}
      focus:outline-none focus:ring focus:ring-green-500
    `}
    style={{ minHeight: '40px', maxHeight: '200px' }}
  />
  <button
    type="submit"
    className="self-center text-white bg-[#1B8755] hover:bg-[#1DAA61] px-4 py-2 rounded-md transition disabled:opacity-50"
    disabled={!mensaje.trim()}
  >
    Enviar
  </button>
</form>
```

---

## 🧠 Equivalencias clave para layouts conversacionales

| Clase Tailwind   | Comportamiento vertical       | Uso típico                  |
|------------------|-------------------------------|-----------------------------|
| `items-start`    | Alinea hijos arriba           | Layouts verticales simples  |
| `items-center`   | Alinea todos al centro        | Conversación + botón alineado |
| `items-end`      | Alinea todos abajo            | Uso anterior, menos fluido  |
| `self-start`     | Posiciona hijo arriba         | Menús o textos largos       |
| `self-center`    | Posiciona hijo al medio       | Botón alineado con texto    |
| `self-end`       | Posiciona hijo abajo          | Si se quiere asimetría visual|

---



## 🧠 Envío de mensajes con Enter y salto de línea con Shift

Para mejorar la experiencia conversacional del componente `EntradaMensaje`, se agregó la lógica que permite:

- ✅ Enviar el mensaje rápidamente al **presionar Enter**
- ↩️ Insertar un salto de línea dentro del mensaje con **Shift + Enter**

### 🔧 Implementación técnica

Se incorpora el siguiente manejador al `<textarea>`:

```jsx
const manejarTecla = (evento) => {
  if (evento.key === 'Enter' && !evento.shiftKey) {
    evento.preventDefault();     // Evita el salto de línea
    manejarEnvio(evento);        // Ejecuta el envío del mensaje
  }
};
```

Y luego, se añade como prop:

```jsx
onKeyDown={manejarTecla}
```

Esto convierte al textarea en una interfaz cálida y familiar, inspirada en plataformas como WhatsApp.

### 🛡️ Defensa UX

- El `evento.shiftKey` detecta si el usuario está intentando escribir varias líneas. Si no está presionado, se interpreta como intención de envío.
- Esta lógica previene frustraciones y permite una comunicación fluida, con atajos intuitivos.

### 🧪 Bonus: mini tabla de atajos para README

| Acción                  | Tecla                          |
|------------------------|--------------------------------|
| Enviar mensaje         | `Enter`                        |
| Insertar salto de línea| `Shift + Enter`                |

---

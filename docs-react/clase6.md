

## 📦 Clase 6 – `BurbujaMensaje.jsx` (versión inicial)

```jsx
function BurbujaMensaje({ texto, esUsuario = true }) {
  return (
    <div
      className={`
        px-3 py-2 rounded-lg text-sm max-w-[80%]
        ${esUsuario ? 'bg-[#DCF8C6] self-end' : 'bg-white self-start'}
        shadow-md
      `}
    >
      {texto}
    </div>
  );
}

export default BurbujaMensaje;

```

---

### 📚 Explicación técnica-emocional

| Propiedad      | Comportamiento                                                                            |
|----------------|--------------------------------------------------------------------------------------------|
| `texto`        | Contenido del mensaje                                                                      |
| `esUsuario`     | Booleano que define si es enviado por el usuario (`true`) o por otro (`false`)            |
| `self-end`     | Alinea la burbuja a la derecha si es propia                                                |
| `self-start`   | Alinea a la izquierda si es ajena                                                          |
| `bg-[#DCF8C6]` | Verde claro estilo WhatsApp para mensajes propios                                          |
| `bg-white`     | Blanco para mensajes recibidos                                                             |
| `shadow-md`    | Agrega profundidad visual, lo que genera una experiencia emocional más cuidada            |

---

### 🔧 Ejemplo de uso en `HistorialMensajes`

Actualizá el map para reemplazar el `div` directo:

```jsx
import BurbujaMensaje from './BurbujaMensaje';

{mensajes.map((texto, index) => (
  <BurbujaMensaje key={index} texto={texto} esUsuario={true} />

))}
```

Luego vas a poder escalar esto fácilmente con props como `hora`, `avatar`, `tipo`, etc.

---


### 🧩 ¿Qué es `key` y por qué importa?

Cuando usás `.map()` para renderizar varios componentes (como `BurbujaMensaje`), React necesita una **clave única** para identificar cada elemento. Así puede:

- Saber **cuál actualizar** si cambia el estado o los props.
- **Evitar re-renderizados innecesarios**, haciendo tu interfaz más eficiente.
- Detectar **cuándo eliminar, mantener o reordenar** burbujas sin romper el historial.

---

### 🔍 En tu ejemplo:

```jsx
{mensajes.map((texto, index) => (
  <BurbujaMensaje key={index} texto={texto} esUsuario={true} />
))}
```

- `index` es el número de posición en el array (`0`, `1`, `2`, ...).
- Le estamos dando a cada `BurbujaMensaje` una clave tipo `key={0}`, `key={1}`, etc.

📌 Esto **funciona bien si el array no cambia de orden**, pero puede tener problemas si:

- Se eliminan o insertan mensajes en el medio.
- React tiene que comparar qué burbuja cambió.

---

### 🛡️ ¿Qué se recomienda en un proyecto real?

Idealmente, cada mensaje debería tener un `id` único, algo como:

```jsx
{mensajes.map(({ id, texto }) => (
  <BurbujaMensaje key={id} texto={texto} esUsuario={true} />
))}
```

Así React no depende de la posición, sino de un identificador que nunca se repite.

---

### 🧠 ¿Cómo lo documentaríamos en una cápsula?

> "React necesita claves (`key`) únicas al renderizar listas. Usamos `index` por ahora para mantenerlo simple, pero en producción es mejor usar un `id` único por mensaje. Esto previene errores visuales y hace que el historial de chat sea más sólido."




### 🧩 ¿Qué hace el `.map(({ id, texto }) => ...)`?

- **`mensajes`** es un array de objetos, cada uno con propiedades como `id`, `texto`, `esUsuario`, etc.
- El `.map()` **recorre ese array** y, por cada elemento, **extrae** directamente las propiedades que te interesan (`id` y `texto`) gracias al destructuring.
- Después, **renderiza un componente `<BurbujaMensaje />`** por cada mensaje.

---

### 🎯 ¿Por qué `key={id}`?

- React necesita una **clave única (`key`)** para que cada elemento de la lista tenga identidad.
- Usamos `id` porque es **mejor que el índice (`index`)**, ya que **no se rompe si se borra, actualiza o reordena** el array.
- `key={id}` **no es un prop del componente**, sino una instrucción interna de React.

---

### 🧠 ¿Qué pasa con `texto` y `esUsuario`?

- Son props que **sí se pasan directamente** a `BurbujaMensaje`, y deben **coincidir con los parámetros** que definiste en ese componente:

```jsx
function BurbujaMensaje({ texto, esUsuario }) {
  // ...
}
```

- Si el objeto tiene estas propiedades:

```js
{ id: "abc123", texto: "Hola Mauricio", esUsuario: true }
```

Entonces podés hacer:

```jsx
<BurbujaMensaje key={id} texto={texto} esUsuario={esUsuario} />
```

Y React sabrá renderizar la burbuja como enviada por el usuario.

---

### 🛡️ Bonus: defensa si la propiedad no existe

Si por algún motivo un mensaje no tiene `esUsuario`, podés poner un valor por defecto en el componente:

```jsx
function BurbujaMensaje({ texto, esUsuario = true }) {
  // ...
}
```

Esto evita errores y asegura comportamiento esperado.

---


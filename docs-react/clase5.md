

## 🧩 Componente `HistorialMensajes` – Clase 5

Este componente permite visualizar todos los mensajes enviados dentro del sistema conversacional. Se diseñó con enfoque modular, estilo cálido y defensas visuales, respetando la estética WhatsApp y la claridad técnica.

### 📦 Código base:

```jsx
function HistorialMensajes({ mensajes }) {
  return (
    <div className="historial-mensajes flex flex-col gap-2 px-4 py-4 overflow-y-auto h-[300px] bg-[#F8F8F8] rounded-md shadow-inner">
      {mensajes.map((texto, index) => (
        <div
          key={index}
          className="bg-[#DCF8C6] text-sm px-3 py-2 rounded-lg max-w-[80%] self-end"
        >
          {texto}
        </div>
      ))}
    </div>
  );
}

export default HistorialMensajes;
```

---

### 📚 Explicación técnica-emocional

| Elemento             | Propósito                                                                 |
|----------------------|---------------------------------------------------------------------------|
| `mensajes.map(...)`  | Renderiza dinámicamente cada mensaje desde el array recibido por props    |
| `key={index}`        | Asegura render único para cada burbuja (defensa interna de React)         |
| `bg-[#DCF8C6]`       | Color verde tipo WhatsApp para mensajes propios (editable más adelante)   |
| `self-end`           | Alinea burbujas a la derecha simulando que fueron enviadas por el usuario |
| `overflow-y-auto`    | Permite scroll si el historial crece                                      |
| `shadow-inner`       | Sombra interna que aporta profundidad suave y visual emocional            |
| `h-[300px]`          | Altura fija y controlada para evitar desbordes                            |

---

### 💡 Ejemplo de uso dentro de `Chat.jsx`

```jsx
<HistorialMensajes mensajes={mensajes} />
```

Este paso te permite **visualizar el mensaje enviado desde `EntradaMensaje`**, cerrar el ciclo funcional y validar el sistema conversacional.

---



## 🔧 Readaptación sugerida

Dejás este bloque activo **por ahora** para visualizar los mensajes normalmente:

```jsx
{mensajes.map((texto, index) => (
  <div
    key={index}
    className="bg-[#DCF8C6] text-sm px-3 py-2 rounded-lg max-w-[80%] self-end"
  >
    {texto}
  </div>
))}
```

Y justo arriba, como comentario técnico, podés dejar esto para vos:

```jsx
// 🔜 TODO: reemplazar por <BurbujaMensaje key={index} texto={texto} />
// cuando el componente esté disponible y acepte props como texto, hora, emisor, avatar...
```

---

💡 De esa forma:

- No rompés el flujo actual 🧪
- Te anticipás a la modularidad 🧩
- Te dejás pistas claras para la migración futura 🛠️

Podés incluso dejar esa intención en el README de la clase 5, tipo:

> 👣 En esta versión, los mensajes se renderizan directamente. En clase futura se modulariza como `<BurbujaMensaje />`.


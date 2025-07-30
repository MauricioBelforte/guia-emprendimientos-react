

## 📘 Clase 7: Orquestación modular + mensaje automático de bienvenida

Una estructura sugerida para documentar esta clase:

### 🧩 1. Punto de entrada (`App.jsx`)
- Minimalismo: solo se monta `ChatApp`
- Separación clara entre frontend y lógica conversacional

### 🧩 2. ChatApp.jsx — El corazón del sistema
```jsx
const [mensajes, setMensajes] = useState([
  {
    id: 1,
    emisor: 'sistema',
    texto: '¡Hola! Estoy acá para ayudarte. Escribí lo que necesites y te voy guiando 😊',
    timestamp: new Date().toISOString()
  }
])
```
- Inicialización con burbuja automática
- Preparación para automatismos por palabra clave

### 🧩 3. BurbujaMensaje.jsx
- Diferenciación visual por `emisor`
- UX emocional: colores cálidos, tipografía amigable, defensas visuales

### 🧩 4. EntradaMensaje.jsx
- Validación y estilización defensiva del input
- Conversión de texto en burbuja modular

### 🧩 5. README-chat.md sugerido

```markdown
# Clase 7 — Bienvenida automática y propósito emocional

El sistema inicia con un mensaje del `emisor: sistema`, ofreciendo guía desde el primer render. Esta decisión técnica responde a un propósito emocional claro: evitar la frustración por incertidumbre, y dar calidez a la experiencia desde el inicio.

## Estructura técnica
- `useState` inicia con un mensaje automático
- `BurbujaMensaje` estiliza según `emisor`
- `EntradaMensaje` valida y convierte input en burbujas

## Propósito emocional
Cada mensaje no es solo código: es parte de una conversación cálida, empática y modular. El sistema conversa, guía y acompaña.
```

---

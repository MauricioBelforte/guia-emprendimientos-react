

# 📚 Clase 11: Lógica de edición de ficha post-flujo

---

## 🧠 Objetivo

Permitir que, una vez finalizado el flujo conversacional principal, el usuario pueda **modificar cualquier campo de su ficha** escribiendo el nombre del campo (ej: `"email"`, `"provincia"`), y que el sistema:
1. Le muestre la pregunta original correspondiente
2. Espere la nueva respuesta
3. Actualice el campo
4. Muestre la ficha actualizada

---

## 🧩 Cambios principales

### 1. `flujoFinalizado`: activa el modo edición

```jsx
const [flujoFinalizado, setFlujoFinalizado] = useState(false);
```

- Se activa al finalizar el flujo principal
- Permite distinguir entre flujo guiado y edición libre

---

### 2. `modoEdicionActivo`: espera la nueva respuesta

```jsx
const [modoEdicionActivo, setModoEdicionActivo] = useState(false);
```

- Se activa cuando el usuario escribe un campo válido para editar
- Indica que el próximo mensaje será la nueva respuesta para ese campo

---

### 3. Función `mostrarFicha(respuestas, encabezado)`

```jsx
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
    { id: crypto.randomUUID(), emisor: 'sistema', texto: encabezado, timestamp },
    { id: crypto.randomUUID(), emisor: 'sistema', texto: resumen, timestamp },
    { id: crypto.randomUUID(), emisor: 'sistema', texto: "¿Querés modificar algún dato? Escribí el nombre del campo como 'provincia', 'email', etc.", timestamp }
  ]);
};
```

- Centraliza la lógica de generación de ficha
- Se puede usar tanto al final del flujo como después de cada edición
- El encabezado es personalizable (🎉 o 📝)

---

## 🔁 Lógica dentro de `agregarMensajeUsuario`

### 🧠 Caso 1: flujo finalizado y esperando edición

```jsx
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
```

- Guarda la nueva respuesta en el campo editado
- Muestra la ficha actualizada
- Sale del modo edición

---

### 🛠️ Caso 2: flujo finalizado pero aún no se eligió campo

```jsx
if (flujoFinalizado) {
  const campoAEditar = textoMensajeUsuario.toLowerCase().trim();
  const esCampoValido = preguntasSistema.some(p => p.clave === campoAEditar);

  if (!esCampoValido) {
    setMensajes(prev => [...prev,
      { id: crypto.randomUUID(), emisor: 'sistema', texto: `😕 No reconozco ese campo. Probá con 'provincia', 'email', 'descripcion', etc.`, timestamp }
    ]);
    return;
  }

  const preguntaOriginal = preguntasSistema.find(p => p.clave === campoAEditar);

  setMensajes(prev => [...prev,
    { id: crypto.randomUUID(), emisor: 'sistema', texto: `✏️ Vamos a editar el campo '${campoAEditar}'.\n` + preguntaOriginal.pregunta + "\n" + preguntaOriginal.explicacion, timestamp }
  ]);

  setIndicePregunta(preguntasSistema.findIndex(p => p.clave === campoAEditar));
  setModoEdicionActivo(true); // Activamos modo edición
  return;
}
```

- Verifica si el campo existe
- Muestra la pregunta original
- Activa `modoEdicionActivo` para esperar la nueva respuesta

---

### 🎯 Caso 3: flujo guiado normal

Se mantiene igual que en la clase anterior. Al finalizar:

```jsx
mostrarFicha(respuestasUsuarioActualizadas, "👌 ¡Gracias por compartir tus datos! 🎉 \n 👇 Esta es tu ficha:");
setFlujoFinalizado(true);
```

---

## 🧪 Comportamiento esperado

1. El usuario completa el flujo → se muestra la ficha 🎉
2. Escribe `"email"` → el sistema muestra la pregunta original ✏️
3. Escribe `"nuevoemail@gmail.com"` → se actualiza el campo y se muestra la ficha 📝
4. Puede seguir editando otros campos

---

## 🧱 Posibles mejoras futuras

- Agregar `"listo"` o `"salir"` para terminar el modo edición
- Guardar la ficha en `localStorage` para persistencia
- Mostrar cambios resaltados visualmente (ej: campo editado en negrita)
- Agregar validaciones por tipo de dato (email, URL, etc.)

---


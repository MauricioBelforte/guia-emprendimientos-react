

## ✅ Estrategia 1: Reclamo automático por email

### 💡 Lógica

Si el usuario inicia sesión con Supabase Auth y su `user.email` coincide con el `email` de una ficha:

```js
const { data: fichasReclamables } = await supabase
  .from("fichas_emprendimientos")
  .select("*")
  .eq("email", user.email)
  .is("creado_por", null); // aún no reclamada
```

### 🧩 UI sugerida

```jsx
{
  fichasReclamables.length > 0 && (
    <div className="reclamo-sugerido">
      <p>🔐 Detectamos fichas que podrían ser tuyas por el email.</p>
      <button onClick={() => reclamarFicha(ficha.id)}>Reclamar ficha</button>
    </div>
  )
}
```

### 🛠️ Acción

```js
await supabase
  .from("fichas_emprendimientos")
  .update({ creado_por: user.id })
  .eq("id", ficha.id);
```

---

## ✅ Estrategia 2: Reclamo manual por Instagram

### 💡 Lógica

Si la ficha tiene un `instagram`, y el usuario no tiene email coincidente, podés ofrecer:

> “¿Tenés acceso a la cuenta @emprendimiento123? Podés reclamar esta ficha enviando la palabra clave `reclamo123` desde esa cuenta.”

### 🧩 Flujo sugerido

1. El usuario hace clic en “Reclamar por Instagram”
2. Se genera una palabra clave única (`reclamo123`)
3. Se le pide que envíe esa palabra por DM o la publique en una story
4. Vos verificás manualmente (o con webhook futuro)
5. Si se confirma, actualizás `creado_por`

---

## 📘 Cápsula técnica: Reclamo de propiedad de ficha

```md
### Reclamo de propiedad de ficha

Se permite que cualquier persona reclame una ficha si demuestra vínculo legítimo. Dos estrategias:

#### 1. Reclamo automático por email
- Si el usuario inicia sesión con el mismo email que figura en la ficha
- Se ofrece reclamarla con un clic
- Se actualiza el campo `creado_por` con `user.id`

#### 2. Reclamo manual por Instagram
- Si la ficha tiene un campo `instagram`
- Se genera una palabra clave única (`reclamo123`)
- El usuario debe enviarla desde esa cuenta
- Verificación manual o futura automatización
- Se actualiza `creado_por` si se confirma

Esta lógica respeta la apertura del sistema, permite fichas anónimas, y ofrece caminos cálidos para reconectar con la identidad.
```


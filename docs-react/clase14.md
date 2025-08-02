
# 📚 Clase 14 — Rediseño Ético y Defensivo de la Tabla `fichas_emprendimientos`

## 🧠 Introducción emocional

Esta clase documenta el rediseño completo de la tabla `fichas_emprendimientos` en Supabase. La decisión de rehacerla desde cero surge de una necesidad profunda: construir una base que refleje los valores del sistema conversacional que estamos creando.

Queremos que cada ficha:

- 🛡️ Respete la autonomía del usuario  
- 🧩 Permita edición progresiva sin frustraciones  
- 📚 Sea trazable, auditable y fácil de mantener  
- 💬 Exprese con claridad cuándo un dato fue compartido, omitido o simplemente no ofrecido

La tabla no es solo una estructura técnica: es una representación ética de cada interacción.

---

## 🧱 Estructura SQL con comentarios

Todos los campos opcionales comparten el mismo default: `'No compartido'`. Esta decisión permite limpieza uniforme, trazabilidad emocional y respeto por la voluntad del usuario.

```sql
create table if not exists fichas_emprendimientos (
  -- Clave única por ficha, segura y escalable
  id uuid primary key default gen_random_uuid(),

  -- Fecha automática para trazabilidad
  created_at timestamptz default now(),

  -- Clave obligatoria, 
  instagram text not null ,

  -- Ubicación general, útil para filtros
  provincia text default 'No compartido',

  -- Ubicación más específica
  ciudad text default 'No compartido',

  -- Detalle opcional, editable
  barrio text default 'No compartido',

  -- Producto, servicio o mixto
  tipo text default 'No compartido',

  -- Categoría del emprendimiento
  rubro text default 'No compartido',

  -- Texto libre, editable
  descripcion text default 'No compartido',

  -- Vínculo con el usuario, clave para trazabilidad
  email text default 'No compartido',

  -- Link externo, opcional
  website text default 'No compartido'
);
```

---

## 🔍 Decisiones clave

### 🔐 `instagram` como clave principal
- Es el único campo obligatorio
- Tiene restricción `UNIQUE` para evitar duplicados
- Representa la identidad pública del emprendimiento

### 📧 `email` como único pero no obligatorio
- Permite trazabilidad si se comparte
- No fuerza al usuario a brindarlo
- Tiene default `'No compartido'` para limpieza ética

### 🛡️ Defaults defensivos
Todos los campos opcionales comparten el mismo default:

| Campo        | Default         | Motivo emocional |
|--------------|------------------|------------------|
| provincia    | `'No compartido'`| Respeto por la omisión |
| tipo         | `'No compartido'`| No se presionó a definir |
| email        | `'No compartido'`| El usuario eligió no compartir |

Esto permite distinguir entre:
- `'No compartido'` → decisión explícita  
- `null` → error, corte o ficha incompleta

---

## 🔄 Lógica de guardado progresivo

### 🧩 Guardado inicial
Apenas el usuario ingresa su `instagram`, se crea la ficha mínima con los demás campos en default.

### 🧠 Actualización por respuesta
Cada vez que responde una pregunta, se actualiza la ficha con ese dato. No se espera que complete todo.

### 🛑 Abandono del flujo
Si el usuario se va antes de terminar, los datos ya ingresados quedan guardados. Los no respondidos mantienen su default.

### 💬 Mensaje cálido
> “Podés irte cuando quieras. Lo que ya compartiste queda guardado con cariño, y podés volver a editarlo más adelante.”

Este mensaje refuerza la autonomía y la confianza del sistema.

---

## 🧪 Pruebas sugeridas

- Insertar una ficha con solo `instagram` y verificar los defaults  
- Actualizar campos uno por uno y observar cómo se completa la ficha  
- Insertar dos fichas con el mismo `email` para validar la restricción `UNIQUE`  
- Filtrar por `provincia`, `tipo` o `rubro` para probar usabilidad futura

---

## 🧬 Próximos pasos

- Agregar campos técnicos como `decision_compartir`, `completitud`, `updated_at`, `verificado`  
- Modularizar funciones en React para `crearFichaInicial`, `actualizarFicha`, `mostrarFicha`  
- Documentar cada función como cápsula didáctica para onboarding futuro

---



## 🧩 1. Insertar una ficha mínima con solo `instagram`

Como todos los demás campos tienen default `'No compartido'`, esta consulta va a crear una ficha válida, trazable y lista para edición futura.

```sql
insert into fichas_emprendimientos (instagram)
values ('@panaderia_del_barrio');
```

---

## 🔍 2. Verificar que se haya guardado correctamente

Esta consulta te muestra la ficha recién creada, incluyendo todos los campos con sus defaults:

```sql
select * from fichas_emprendimientos
where instagram = '@panaderia_del_barrio';
```

---

## ✅ ¿Qué deberías ver?

Una fila con:

- Un `id` generado automáticamente  
- Un `created_at` con la fecha actual  
- `instagram = '@panaderia_del_barrio'`  
- Todos los demás campos con `'No compartido'`  
- `email` vacío pero único, sin conflicto

---


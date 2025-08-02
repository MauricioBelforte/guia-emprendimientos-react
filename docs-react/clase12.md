

## 📚 Clase 12 — Decisión de base: PostgreSQL, Supabase y la tabla `emprendimientos`

---

### 🧠 ¿Por qué elegimos PostgreSQL?

- ✅ **Madurez y confiabilidad**: PostgreSQL es una base de datos robusta, usada en producción por miles de proyectos.
- 🧩 **Soporte para relaciones, filtros y seguridad por usuario** (RLS), ideal para escalar el sistema sin cambiar de motor.
- 🛡️ **Tipos avanzados como `uuid` y `timestamptz`**, que permiten trazabilidad y claves seguras.
- 📚 **Documentación clara y comunidad activa**, lo que facilita el onboarding futuro.

---

### 🚀 ¿Por qué elegimos Supabase?

- 🧠 **Interfaz visual amigable** para crear tablas, editar datos y probar consultas sin escribir SQL desde cero.
- 🔐 **Integración nativa con PostgreSQL**, sin capas intermedias ni restricciones artificiales.
- 🧪 **Autenticación opcional**: permite empezar sin login y escalar a seguridad por usuario cuando lo necesitemos.
- 📦 **API REST y Realtime listas**, ideal para conectar con React sin configurar servidores.

---

### 📝 ¿Cómo creamos la cuenta?

1. Ingresamos a [supabase.com](https://supabase.com)
2. Usamos un email y contraseña para registrarnos
3. Creamos un nuevo proyecto con nombre, contraseña y región
4. Supabase generó una base PostgreSQL lista para usar

---

### 🧱 ¿Cómo diseñamos la tabla `emprendimientos`?

Creamos una tabla llamada `emprendimientos` con los siguientes campos:

| Campo         | Tipo         | Default             | Motivo emocional y técnico |
|---------------|--------------|---------------------|-----------------------------|
| `id`          | `uuid`       | `gen_random_uuid()` | Clave única por ficha, segura y escalable |
| `created_at`  | `timestamptz`| `now()`             | Fecha automática para trazabilidad |
| `instagram`   | `text`       | `'No proporcionado'`| Clave editable, con restricción `UNIQUE` para evitar duplicados |
| `provincia`   | `text`       | `'No especificado'` | Ubicación general, útil para filtros |
| `ciudad`      | `text`       | `'No especificado'` | Ubicación más específica |
| `barrio`      | `text`       | `'No especificado'` | Detalle opcional, editable |
| `tipo`        | `text`       | `'No aclarado'`     | Producto, servicio o mixto |
| `rubro`       | `text`       | `'No definido'`     | Categoría del emprendimiento |
| `descripcion` | `text`       | `'No brindada'`     | Texto libre, editable |
| `email`       | `text`       | `'No compartido'`   | Vínculo con el usuario, clave para trazabilidad |
| `website`     | `text`       | `'No compartido'`   | Link externo, opcional |

---

### 🧠 Reflexión final

> Esta clase define la base emocional y técnica del sistema. Elegimos herramientas que nos permiten crecer sin perder claridad, modularidad ni empatía. Cada campo tiene un propósito, cada decisión está pensada para el usuario, y cada ficha es una historia que merece ser guardada con respeto.

---

# Hubo un cambio en la estructura de la tabla e hicimos una nueva usando instrucciones SQL


---

## 🧱 Ejemplo: Crear tabla `fichas_emprendimientos`

```sql
-- Creamos la tabla principal
CREATE TABLE fichas_emprendimientos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- Identificador único
  created_at timestamptz DEFAULT now(),          -- Fecha de creación automática

  instagram text UNIQUE NOT NULL,                -- Clave principal, obligatoria y única

  provincia text DEFAULT 'No especificado',      -- Campos opcionales con valores por defecto
  ciudad text DEFAULT 'No especificado',
  barrio text DEFAULT 'No especificado',
  tipo text DEFAULT 'No aclarado',
  rubro text DEFAULT 'No definido',
  descripcion text DEFAULT 'No brindada',
  email text DEFAULT 'No compartido',
  website text DEFAULT 'No compartido'
);
```

---

## 📍 ¿Dónde lo escribís?

1. Entrás a tu proyecto en Supabase
2. Vas a la sección **SQL Editor**
3. Pegás el código en un nuevo script
4. Hacés clic en **Run** (Ejecutar)

---

## 🧠 ¿Qué hace cada línea?

- `uuid PRIMARY KEY`: crea un ID único para cada ficha
- `created_at DEFAULT now()`: guarda la fecha automáticamente
- `instagram UNIQUE NOT NULL`: obliga a que cada ficha tenga Instagram y que no se repita
- Los demás campos tienen valores por defecto para evitar `nulls` y acompañar emocionalmente al usuario

---



Creamos una tabla llamada `fichas_emprendimientos` con los siguientes campos:

| Campo         | Tipo         | Default             | Motivo emocional y técnico |
|---------------|--------------|---------------------|-----------------------------|
| `id`          | `uuid`       | `gen_random_uuid()` | Clave única por ficha, segura y escalable |
| `created_at`  | `timestamptz`| `now()`             | Fecha automática para trazabilidad |
| `instagram`   | `text` **NOT NULL** | —             | Clave obligatoria, con restricción `UNIQUE` para evitar duplicados y asegurar identidad |
| `provincia`   | `text`       | `'No especificado'` | Ubicación general, útil para filtros |
| `ciudad`      | `text`       | `'No especificado'` | Ubicación más específica |
| `barrio`      | `text`       | `'No especificado'` | Detalle opcional, editable |
| `tipo`        | `text`       | `'No aclarado'`     | Producto, servicio o mixto |
| `rubro`       | `text`       | `'No definido'`     | Categoría del emprendimiento |
| `descripcion` | `text`       | `'No brindada'`     | Texto libre, editable |
| `email`       | `text`       | `'No compartido'`   | Vínculo con el usuario, clave para trazabilidad |
| `website`     | `text`       | `'No compartido'`   | Link externo, opcional |

---


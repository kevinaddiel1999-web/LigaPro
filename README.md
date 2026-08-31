# ⚽ LigaPro Analytics

Plataforma web interactiva para el análisis táctico, pronósticos y seguimiento de la LigaPro ecuatoriana de fútbol.

---

## 🚀 Tecnologías Utilizadas

* **Framework:** Next.js 15 (App Router)
* **Lenguaje:** TypeScript
* **Estilos:** Tailwind CSS
* **Base de Datos & Auth:** Supabase (PostgreSQL)
* **API Externa:** TheSportsDB API
* **Despliegue:** Vercel

---

## 🗄️ Modelo de Datos (Supabase Schema)

### Tabla: `articulos_partidos`
Representa los análisis tácticos y pronósticos publicados por los usuarios analistas.

| Campo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `uuid` (PK) | Identificador único del análisis |
| `created_at` | `timestamp` | Fecha y hora de creación |
| `titulo` | `text` | Título de la publicación |
| `partido_info` | `text` | Nombre de los equipos o detalles del partido |
| `contenido` | `text` | Análisis táctico detallado |
| `pronostico` | `text` | Resultado predicho o recomendación |
| `user_id` | `uuid` (FK) | ID del usuario autor (Relación con `auth.users`) |

---

## 🔑 Credenciales de Prueba para Evaluación

Para probar los roles y permisos del sistema dentro de la plataforma:

* **Rol Analista (Acceso total al Dashboard / Publicación / CRUD):**
  * **Correo:** `analista@ligapro.com`
  * **Contraseña:** `Analista123!`

* **Rol Aficionado (Acceso de solo lectura):**
  * **Correo:** `aficionado@ligapro.com`
  * **Contraseña:** `Aficionado123!`

---

## ⚙️ Instalación y Configuración Local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/kevinaddiel1999-web/LigaPro.git](https://github.com/kevinaddiel1999-web/LigaPro.git)
   cd LigaPro
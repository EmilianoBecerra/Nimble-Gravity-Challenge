# Nimble Gravity Challenge

Aplicación React que permite a candidatos ver posiciones abiertas y enviar su postulación con el link de su repositorio de GitHub.

## Stack

- React 19 + TypeScript
- Vite
- CSS puro

## Funcionalidades

- Login por email con validación de formato.
- Listado de posiciones obtenido desde la API.
- Input de repositorio independiente por posición.
- Skeleton loading durante la carga inicial.
- Manejo de errores de red con pantalla de error y botón de reintento.
- Feedback visual en el botón de postulación (enviando / postulado / reintentar).

## Estructura del proyecto

    src/
    ├── components/
    │   ├── Header/
    │   ├── Footer/
    │   ├── Login/         validación de email, acceso a la app
    │   ├── Main/
    │   │   └── ListJobs/  listado de posiciones y postulación
    │   ├── Loading/       skeleton cards
    │   └── Error/         pantalla de error con retry
    ├── types.ts           interfaces User y Jobs
    └── App.tsx            manejo de estado de sesión (email)

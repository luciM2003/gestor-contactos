# Directorio — Gestor de contactos con filtros

Aplicación web para listar, buscar, agregar y eliminar contactos de un equipo.
Construida con **React + TypeScript + Tailwind CSS**, con formulario validado con
**Formik + Yup**.

🔗 **Demo:** https://gestor-contactos-psi.vercel.app

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

Para verificar las versiones instaladas:

```bash
node -v
npm -v
```

## Instalación

```bash
git clone https://github.com/luciM2003/gestor-contactos.git
cd gestor-contactos
npm install
```

## Correr el proyecto

```bash
npm run dev
```

Vite levanta la app en `http://localhost:5173`.

Otros comandos:

| Comando           | Qué hace                                             |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente       |
| `npm run build`   | Chequea tipos con TypeScript y genera `dist/`        |
| `npm run preview` | Sirve localmente el build de producción              |

---

## Funcionalidad

**Lista de contactos**

- Muestra nombre, email, teléfono y departamento.
- La lista inicial se carga desde `src/data/data.json`.
- Skeleton loading mientras se resuelve la carga (simulada con un retardo, como
  si viniera de una API).
- EmptyState con dos variantes: agenda vacía y búsqueda sin resultados, cada una
  con la acción que corresponde.
- Botón para eliminar un contacto.

**Formulario de alta (Formik + Yup)**

- Se abre en un modal que cierra con Escape, con click afuera o con el botón.
- Campos obligatorios: nombre, email y departamento. El teléfono es opcional.
- Validación en tiempo real con mensajes debajo de cada campo.
- El botón de guardar queda deshabilitado mientras haya errores.
- Valida además que el email no esté repetido en la lista.
- Al guardar se genera el `id` en formato UUID v4.

**Filtros**

- Búsqueda por nombre, sin distinguir mayúsculas ni tildes (`Martín` = `martin`).
- Chips para filtrar por departamento, combinables entre sí.
- Los dos filtros se aplican al mismo tiempo.
- Contador de resultados sobre el total.

---

## Estructura

```
src/
├── components/
│   ├── ContactForm.tsx      Formulario con Formik + Yup
│   ├── ContactRow.tsx       Fila de un contacto
│   ├── ContactSkeleton.tsx  Placeholder de carga
│   ├── DepartmentChips.tsx  Filtro por departamento
│   ├── EmptyState.tsx       Estados vacíos
│   ├── Modal.tsx            Modal accesible reutilizable
│   ├── SearchBar.tsx        Input de búsqueda
│   └── icons.tsx            Iconos SVG
├── data/
│   └── data.json            Contactos iniciales
├── hooks/
│   └── useContacts.ts       Estado de la lista (carga, alta, baja)
├── lib/
│   ├── departments.ts       Departamentos y su color
│   ├── text.ts              Normalización de texto
│   └── uuid.ts              Generación de UUID v4
├── types/
│   └── contact.ts           Tipos Contact y Department
├── App.tsx                  Composición y lógica de filtrado
├── index.css                Tokens de diseño y Tailwind
└── main.tsx                 Punto de entrada
```

## Decisiones técnicas

- **Vite** como bundler: arranque inmediato y build liviano.
- **Tailwind CSS v4** vía el plugin oficial de Vite. Los tokens de color y
  tipografía viven en `@theme` dentro de `index.css`, así el diseño se cambia
  desde un solo lugar.
- **Estado local con `useState` + `useMemo`.** El alcance de la prueba no
  justifica una librería de estado global; el filtrado se recalcula solo cuando
  cambian los contactos o los filtros.
- **Un color por departamento**, usado en el chip, en la etiqueta y en el
  cuadrado con la inicial. El color transmite información, no decora.
- **`crypto.randomUUID()`** para los ids, con un fallback propio para entornos
  donde la API nativa no está disponible.
- **Accesibilidad:** roles y etiquetas ARIA en el modal y los filtros, foco
  visible, contador con `aria-live` y soporte de `prefers-reduced-motion`.

## Deploy en Vercel

1. Subir el repositorio a GitHub.
2. En [vercel.com](https://vercel.com), **Add New → Project** e importar el repo.
3. Vercel detecta Vite solo. Framework: `Vite`, build: `npm run build`, output: `dist`.
4. **Deploy**, y pegar el link resultante arriba en este README.

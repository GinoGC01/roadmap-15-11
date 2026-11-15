# Ctrl+Map

> Tu roadmap, tecla por tecla.

Interfaz para seguir el roadmap de 28 semanas (350 h) de **AI Engineering / Backend**: etapas, jornadas, entregables y registro de avance.

- **Fuente de verdad:** `src/db/roadmap.json` (generado desde `roadmap.md`).
- **Persistencia:** `localStorage` (avance, checklist de cada entregable y notas del registro).
- **Confirmación:** marcar una jornada como hecha pide confirmación en un diálogo; desmarcarla es inmediato (y conserva las notas).
- **Estilo:** neumorphism sobre paleta pastel de libro, tipografía `Source Code Pro`, tema claro/oscuro (o automático según el sistema).
- **View transitions:** transición de página con `<ViewTransition>` de React 19 y revelado circular al cambiar de tema (API nativa del navegador, con fallback y respeto a `prefers-reduced-motion`).- **Nombre:** centralizado en `src/config/app.ts` (`APP_NAME`, `APP_TAGLINE`).

## Comandos

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # typecheck + build de producción
npm run lint       # eslint
npm run db:build   # regenera src/db/roadmap.json desde roadmap.md
```

## Estructura

```
src/
  components/     UI base (ui/), dominio (roadmap/, dashboard/) y shell (layout/)
  context/        RoadmapContext · ProgressContext · ThemeContext (+ sus providers)
  db/             roadmap.json (core) · types.ts · index.ts (selectores)
  server/querys/  capa de acceso async (hoy contra el JSON, lista para un servidor)
  hooks/          useRoadmap · useProgress · useTheme · useLocalStorage · useRoadmapSearch
  layouts/        AppLayout (shell con sidebar + topbar)
  routes/         paths.ts + definición de rutas
  pages/          Dashboard · Roadmap · Etapa · Semana · Jornada · 404
  styles/         theme.css (tokens) · globals.css · components.css · app.css
scripts/
  build-roadmap-db.mjs   parser de roadmap.md → src/db/roadmap.json
```

## Cómo funciona

1. `scripts/build-roadmap-db.mjs` parsea `roadmap.md` (etapas, semanas, jornadas, entregables, guías, evaluaciones e hilos transversales) y genera `src/db/roadmap.json`. Valida 7 etapas / 28 semanas / 140 jornadas antes de escribir.
2. `src/server/querys/roadmap.ts` expone ese JSON con funciones `async`. Para migrar a un servidor real se reemplazan los cuerpos por `fetch` (mismo contrato).
3. `RoadmapProvider` carga los datos una vez y los comparte; `ProgressProvider` maneja el avance y lo persiste en `localStorage` (`roadmap-ai:progress:v1`).
4. Los hooks (`src/hooks`) concentran la lógica: los componentes solo renderizan.

## Datos guardados

```json
{
  "version": 1,
  "days": { "sem-01-lun": { "done": true, "completedAt": "…", "notes": { "understood": "", "blocked": "", "next": "" } } },
  "steps": { "sem-01": [true, false, false, false, false, false] },
  "updatedAt": "…"
}
```

## Rutas

| Ruta | Pantalla |
|---|---|
| `/` | Panel de avance |
| `/roadmap` | Timeline de etapas y semanas |
| `/etapa/:stageId` | Detalle de una etapa |
| `/semana/:weekNumber` | Semana completa con entregable y guía |
| `/dia/:dayId` | Jornada con ancla, práctica, desafío y registro |

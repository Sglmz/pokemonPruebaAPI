# Pokémon TCG Explorer

Entrega de la prueba técnica de Front-End. La consigna original pedía Marvel API, pero se autorizó
el cambio a temática Pokémon. El proyecto consume dos APIs de forma directa desde el navegador: la
Pokémon TCG API, que requiere una API key, y PokéAPI, que es pública y no requiere autenticación.

## Instalación y ejecución local

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
cp .env.example .env    # completar VITE_POKEMON_API_KEY con la key de pokemontcg.io
npm run dev              # queda disponible en localhost:5173
```

La key de PokéAPI no es necesaria, dado que es una API abierta. Si no se dispone de una key de
Pokémon TCG API, la aplicación funciona igual, aunque con el límite gratuito compartido, que es
considerablemente más bajo.

## Nota sobre la API key

La Pokémon TCG API requiere una key enviada en el header `X-Api-Key`. Se evaluó agregar un backend
propio que actuara como proxy para mantener la key fuera del bundle público, pero en un proyecto
sin base de datos ni infraestructura propia ese proxy solo agrega un proceso extra para desplegar y
mantener, sin aportar una barrera real contra alguien decidido a extraerla. Se optó por una
alternativa más simple, la key vive en el `.env` del proyecto y viaja en el JavaScript del build
final, igual que ocurriría con cualquier variable `VITE_*`.

Esto significa que cualquiera que inspeccione el bundle publicado puede ver la key, es una
limitación conocida y aceptada para el alcance de esta entrega, no un descuido. En un proyecto real
con backend propio, la key volvería a vivir del lado del servidor.

## Funcionalidad

- Buscador único, disponible tanto en el encabezado como dentro de cada listado, que identifica
  automáticamente si el texto ingresado corresponde a un nombre, un tipo o un código exacto, y
  redirige al resultado correspondiente
- Listado de cartas con paginación real, filtrable por nombre o tipo
- Detalle de cada carta con imagen, descripción, HP, rareza, set, artista, y las demás cartas del
  mismo set como contenido relacionado
- Funcionalidad equivalente para Pokémon: listado paginado y detalle con estadísticas, habilidades
  y movimientos
- Página de inicio con accesos rápidos por tipo, que permite elegir entre ver cartas o Pokémon de
  ese tipo, además de una vista previa de ambos catálogos
- Página 404 para rutas no reconocidas

Los requerimientos de historial de búsquedas (6 y 7 del documento original, y del 6 al 10 del
documento de PokéAPI recibido posteriormente) quedaron fuera de alcance de forma explícita, dado
que no aplican sin base de datos ni gestión de usuarios, según lo acordado.

## Estructura del proyecto

```
src/
  components/
    layout/     Navbar, Footer, Hero
    ui/         Loader, ErrorMessage, EmptyState, Pagination, TypeIcon, Modal
    cards/      PokemonCard, CardGrid, CardDetail
    pokemon/    PokemonCreatureCard, PokemonGrid, PokemonDetail
    search/     SearchBar (componente único, reutilizado para cartas y Pokémon mediante el prop mode)
  pages/
    Home, Cards, CardDetail, Pokemon, PokemonDetail, NotFound
  hooks/        useCards, useCardDetail, useRelatedCards, usePokemonList, usePokemonDetail
  services/     pokemon.service.js, pokeapi.service.js, httpClient.js
  models/       tipos documentados con JSDoc (PokemonCard.js, SearchFilters.js)
  routes/       AppRoutes.jsx
  styles/       variables.css, global.css
  utils/        constants.js, formatters.js, search.js
```

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Inicio: buscador, categorías por tipo, cartas y Pokémon destacados |
| `/cards` | Listado de cartas, con filtros y paginación |
| `/cards/:id` | Detalle de una carta |
| `/pokemon` | Listado de Pokémon, con filtros y paginación |
| `/pokemon/:idOrName` | Detalle de un Pokémon |
| Cualquier otra | Página 404 |

## Variables de entorno

En la raíz del proyecto, `.env`:

```
VITE_POKEMON_API_KEY=
```

La key de Pokémon TCG API se obtiene sin costo en pokemontcg.io/dashboard.

## Build de producción

```bash
npm run build
npm run preview
```

## Pruebas realizadas

El proyecto no cuenta con una suite de pruebas automatizadas (ver sección de pendientes), la
verificación se hizo de forma manual antes de cada entrega:

- **Lint**: `npm run lint` corre limpio, 0 errores. Quedan 9 advertencias intencionales de
  `react-hooks/exhaustive-deps`, todas en efectos que deliberadamente solo deben dispararse al
  cambiar la URL o el identificador consultado, no en cada render de la función de fetch.
- **Build**: `npm run build` genera el bundle de producción sin errores, y se verificó con
  `npm run preview` que la aplicación carga y funciona igual que en desarrollo.
- **Funcional, manual**: se probó la navegación entre todas las rutas, la búsqueda por nombre,
  tipo y código exacto tanto para cartas como para Pokémon, la búsqueda en vivo dentro de los
  listados, el modal de selección de sección desde el buscador de inicio, la paginación, el
  detalle de carta con sus cartas relacionadas del mismo set, el detalle de Pokémon con
  estadísticas y movimientos, y los estados de carga, error y resultados vacíos.
- **Responsivo**: se revisó en tamaños de escritorio, tablet y mobile, incluyendo la corrección
  de un desbordamiento horizontal que aparecía en pantallas angostas por el comportamiento por
  defecto de CSS Grid.
- **Integración directa con las APIs**: dado que ya no hay proxy propio, se verificó con
  peticiones directas (`curl`) que tanto la Pokémon TCG API como PokéAPI responden
  correctamente desde el navegador sin bloqueos de CORS, usando la key real.
- **Exposición de la API key**: se confirmó, revisando el contenido de `dist/` tras el build,
  que la key solo aparece ahí de forma intencional (ver "Nota sobre la API key"), y que no queda
  hardcodeada en ningún archivo fuente ni fuera del `.env`, que está en `.gitignore`.

## Despliegue

El front-end puede publicarse tanto en GitHub Pages como en Netlify (o cualquier hosting
estático), sin cambios en el código, ya que no depende de ningún backend propio.

**GitHub Pages** se sirve desde una subcarpeta (`sglmz.github.io/pokemonPrueba/`), por lo
que el build necesita conocer ese subpath de antemano. El workflow de GitHub Actions
(`.github/workflows/deploy.yml`) ya lo resuelve automáticamente mediante la variable
`VITE_BASE_PATH`, definida únicamente en ese workflow, y toma la key desde el secret
`VITE_POKEMON_API_KEY` configurado en el repositorio.

**Netlify** (y la mayoría de los hostings estáticos) sirve el sitio desde la raíz del dominio, por
lo que `VITE_BASE_PATH` no debe definirse: `vite.config.js` usa `/` como valor por defecto cuando
la variable no está presente. El repositorio incluye `public/_redirects` para que las rutas de
React Router (`/cards`, `/pokemon/:idOrName`, etc.) funcionen correctamente en Netlify al recargar
la página o entrar por un enlace directo. La key se configura ahí como variable de entorno del
sitio, también con el nombre `VITE_POKEMON_API_KEY`.

## Decisiones técnicas

La búsqueda parcial de Pokémon por nombre requería apoyarse en información persistida o
sincronizada, pero al no incluir base de datos, se resolvió mediante una caché en memoria del lado
del cliente, en el primer uso se obtiene el listado completo de nombres de PokéAPI (aproximadamente
1300) y se mantiene en una variable del módulo mientras dure la sesión del navegador. No equivale a
una base de datos real, pero cumple el objetivo sin agregar infraestructura adicional para este
caso puntual.

Los tipos no coinciden entre ambas APIs, por ejemplo la TCG usa `Lightning` mientras que PokéAPI
usa `electric`, por lo que se implementó un mapeo en `utils/constants.js` para que el buscador
reconozca ambos vocabularios, en español e inglés.

No se utilizó TypeScript, en su lugar se documentaron los tipos de datos con JSDoc en `models/`,
manteniendo el proyecto en JavaScript puro.

No se utilizó Redux ni una librería de estado global equivalente. Cada página maneja su propio
estado mediante hooks, dado que no existe información que deba compartirse entre rutas de forma
que lo justifique.

## Pendientes

El proyecto no cuenta todavía con pruebas automatizadas. Tampoco se ha inicializado como
repositorio Git, no tiene historial de commits ni está publicado en GitHub, por lo que tampoco
existe una versión publicada en GitHub Pages. El código está listo para ese paso, resta ejecutar
`git init`, generar los commits correspondientes y subir el repositorio.

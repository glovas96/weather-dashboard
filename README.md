## Weather Dashboard

Lightweight weather dashboard built with React + Vite and deployed via GitHub Pages.

## Stack

- React 19 + Vite 7
- React Query for caching server data
- React Router v7
- Tailwind CSS 4

## Structure

- `src/main.jsx` → `App.jsx` wrapped by `QueryClientProvider`, `FavoritesProvider`, and `BrowserRouter`.
- `src/layouts/AppLayout.jsx` provides the `Navbar`, `Footer`, and Tailwind container as the UI shell.
- `src/pages/HomePage`, `CityPage`, and `SearchPage` handle routes and delegate rendering to `src/components/*`.
- `src/components/` hosts reusable UI blocks (weather card, navigation, footer).
- `src/hooks/` encapsulates React Query logic (`useWeatherSummaries`, `useWeatherDetails`, `useCitySuggestions`, `useFavorites`).
- `src/services/weatherService.js` centralizes Open-Meteo calls with a shared `safeFetch`.
- `src/contexts/` and `src/utils/` manage `localStorage` favorites and the weather code map that backs `FavoritesProvider`.

## Scripts

- npm run dev      - start Vite dev server
- npm run lint     - run ESLint against src
- npm run format   - run Prettier on src
- npm run build    - build to dist/ with base /weather-dashboard/
- npm run deploy   - push built dist/ to gh-pages branch



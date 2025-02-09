import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '@/pages/HomePage';
import CityPage from '@/pages/CityPage';
import SearchPage from '@/pages/SearchPage';
import AppLayout from '@/layouts/AppLayout';
import { FavoritesProvider } from '@/contexts/FavoritesProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/city/:id" element={<CityPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;

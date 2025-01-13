import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import SearchPage from "./pages/SearchPage";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:id" element={<CityPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
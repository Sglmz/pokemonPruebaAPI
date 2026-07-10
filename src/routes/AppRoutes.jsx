import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Cards from '../pages/Cards/Cards';
import CardDetailPage from '../pages/CardDetail/CardDetailPage';
import PokemonList from '../pages/Pokemon/PokemonList';
import PokemonDetailPage from '../pages/PokemonDetail/PokemonDetailPage';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/cards/:id" element={<CardDetailPage />} />
      <Route path="/pokemon" element={<PokemonList />} />
      <Route path="/pokemon/:idOrName" element={<PokemonDetailPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

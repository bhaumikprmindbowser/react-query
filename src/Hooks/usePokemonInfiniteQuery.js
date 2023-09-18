import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokemons = async ({ pageParam = 1 }) => {
  // return Promise.reject({ message: "Data has error" })
  const response = await axios.get(`http://localhost:3030/pokemons`, { params: { _page: pageParam, _order: "desc", _limit: 10 } });
  return response.data;
};

const usePokemonInfiniteQuery = () => {
  return useInfiniteQuery(['pokemonsInfinite'], fetchPokemons, {
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.length > 0 ? allPages.length + 1 : null;
      return nextPage;
    },
  });
};

export default usePokemonInfiniteQuery;
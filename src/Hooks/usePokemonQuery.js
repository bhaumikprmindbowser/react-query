import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokemons = async ({ limit }) => {
    // return Promise.reject({ message: "Data has error" })
    const response = await axios.get(`http://localhost:3030/pokemons`, { params: { _sort: "id", _order: "desc", _limit: limit } });
    return response.data;
};

const usePokemonQuery = (limit = 30) => {
    return useQuery(['pokemons', { limit }], () => fetchPokemons({ limit }), { 
        // staleTime: 0, 
        // refetchInterval: 1000 * 60 * 1, 
    });
};

export default usePokemonQuery;
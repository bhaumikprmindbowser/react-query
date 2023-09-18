import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokemon = async ({ id }) => {
    // return Promise.reject({ message: "Data has error" })
    const response = await axios.get(`http://localhost:3030/pokemons/${id}`);
    return response.data;
};

const usePokemonById = (id) => {
    return useQuery(['pokemons', { id }], () => fetchPokemon({ id }));
};

export default usePokemonById;
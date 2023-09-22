import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createPokemon = async ({ name, imgUrl }) => {
    // return Promise.reject({ message: "Data has error" })
    const response = await axios.post(`http://localhost:3030/pokemons`, { name, imgUrl });
    return response.data;
};

const useCreatePokemonMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(createPokemon, {
        onSuccess: () => {
            // Invalidate and refetch the pokemons query after a successful create
            queryClient.invalidateQueries({ queryKey: ['pokemons', { limit: 50 }], exact: true });
        },
    });

    const addPokemon = async (newPokemon) => {
        try {
            await mutation.mutateAsync(newPokemon);
        } catch (error) {
            // Handle error, if needed
            console.error('Error creating Pokemon:', error);
        }
    };

    return { addPokemon, isLoading: mutation.isLoading };
};

export default useCreatePokemonMutation;
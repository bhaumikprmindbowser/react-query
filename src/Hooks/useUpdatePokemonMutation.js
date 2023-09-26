import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const updatePokemon = async ({ id, name, imgUrl }) => {
    // return Promise.reject({ message: "Data has error" })
    const response = await axios.put(`http://localhost:3030/pokemons/${id}`, { name, imgUrl });
    return response.data;
};

const useUpdatePokemonMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(updatePokemon, {
        onSuccess: (data) => {
            // Invalidate and refetch the pokemons query after a successful create
            queryClient.setQueryData(['pokemons', { limit: 50 }], (prevPokemon) => {
                const tempPrevPokemon = [...prevPokemon]
                const index = tempPrevPokemon.findIndex(pokemon => pokemon?.id === data?.id)
                if (index !== -1) {
                    tempPrevPokemon[index] = data
                }
                return tempPrevPokemon
            })
            // queryClient.invalidateQueries({ queryKey: ['pokemons',{ limit: 50 }], exact: true });
        },
    });

    const editPokemon = async (newPokemon) => {
        try {
            await mutation.mutateAsync(newPokemon);
        } catch (error) {
            // Handle error, if needed
            console.error('Error creating Pokemon:', error);
        }
    };

    return { editPokemon, isLoading: mutation.isLoading };
};

export default useUpdatePokemonMutation;
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const deletePokemon = async (id) => {
    // return Promise.reject({ message: "Data has error" })
    const response = await axios.delete(`http://localhost:3030/pokemons/${id}`);
    return response.data;
};

const useDeletePokemonMutation = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(deletePokemon, {
        onSuccess: (data, id, context) => {
            // Invalidate and refetch the pokemons query after a successful create
            queryClient.setQueryData(['pokemons', { limit: 50 }], (prevPokemon) => {
                return prevPokemon.filter(pokemon => pokemon?.id !== id)
            })
            // queryClient.invalidateQueries({ queryKey: ['pokemons',{ limit: 50 }] });
        },
        // onMutate: (variables) => {
        //     console.log(variables, "variables")
        // }
    });

    const removePokemon = async (id) => {
        try {
            await mutation.mutateAsync(id);
        } catch (error) {
            // Handle error, if needed
            console.error('Error creating Pokemon:', error);
        }
    };

    return { removePokemon, isLoading: mutation.isLoading };
};

export default useDeletePokemonMutation;
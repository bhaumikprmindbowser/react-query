import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchComments = async ({ pokemonId }) => {
    const postId = parseInt(pokemonId.toString().slice(1))
    // return Promise.reject({ message: "Data has error" })
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`, { params: { postId } });
    return response.data;
};

const useCommentsById = (pokemonId) => {
    return useQuery(['comments', { pokemonId }], () => fetchComments({ pokemonId }), { enabled: !!pokemonId });
};

export default useCommentsById
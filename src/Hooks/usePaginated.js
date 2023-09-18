import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokemons = async ({ page }) => {
    // return Promise.reject({ message: "Data has error" })
    const response = await axios.get(`http://localhost:3030/pokemons`, { params: { _page: page, _limit: 3 } });
    return response.data;
};

const usePaginated = (page) => {
    const { data, ...queryProps } = useQuery(['pokemons', { page }], () => fetchPokemons({ page }), { keepPreviousData: true });
    const hasNextPage = data ? data.length >= 3 : false;

    return { data, hasNextPage, ...queryProps };
};

export default usePaginated;
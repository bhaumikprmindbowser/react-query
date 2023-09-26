import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const limit = 8

const fetchPokemons = async ({ page }) => {
    // return Promise.reject({ message: "Data has error" })
    const response = await axios.get(`http://localhost:3030/pokemons`, { params: { _page: page, _limit: limit } });
    return response.data;
};

const usePaginated = (page) => {
    const { data, ...queryProps } = useQuery(['pokemons', { page }], () => fetchPokemons({ page }), { keepPreviousData: true, enabled: false, });
    const hasNextPage = data ? data.length >= limit : false;

    return { data, hasNextPage, ...queryProps };
};

export default usePaginated;
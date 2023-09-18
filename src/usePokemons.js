// src/hooks/usePosts.js
import { useQuery } from 'react-query';

const usePokemons = async (page) => {
  const response = await fetch(`http://localhost:5000/posts?_page=${page}&_limit=10`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const usePosts = (page) => {
  return useQuery(['posts', page], () => fetchPosts(page), {
    staleTime: 60000, // Cache data for 60 seconds
  });
};

export default usePokemons;
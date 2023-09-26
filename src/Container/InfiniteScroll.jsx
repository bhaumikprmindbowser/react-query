import React from "react";
import { Box } from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import usePokemonInfiniteQuery from "../Hooks/usePokemonInfiniteQuery";
import PokemonCard from "../Components/PokemonCard";

export default function InfiniteScroll() {
  const {
    status,
    data,
    error,
    // isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    fetchStatus,
  } = usePokemonInfiniteQuery();

  const pokemons = data?.pages?.flatMap((page) => page);

  if (status === "loading") {
    return <Box sx={{ mx: "auto" }}>Loading.....</Box>;
  }

  if (status === "error") {
    return <Box sx={{ mx: "auto" }}>Error: {error.message}</Box>;
  }

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Virtuoso
        style={{ width: "350px", flex: 1 }}
        totalCount={pokemons?.length ? pokemons?.length : 0}
        data={pokemons ? pokemons : []}
        endReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        itemContent={(index, pokemon) => (
          <Box key={index} mb={2} p={2}>
            <PokemonCard key={index} pokemon={pokemon} />
          </Box>
        )}
      />
      {isFetchingNextPage && <Box>Loading more...</Box>}
      {!isFetchingNextPage && !hasNextPage && <Box>Nothing more to load</Box>}
      {fetchStatus === "paused" && <Box>No internet connection</Box>}
    </Box>
  );
}

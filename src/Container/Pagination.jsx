import React, { useEffect, useState } from "react";
import { Box, IconButton, Grid } from "@mui/material";
import usePaginated from "../Hooks/usePaginated";
import PokemonCard from "../Components/PokemonCard";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function Pagination() {
  const [page, setPage] = useState(1);
  const {
    data,
    error,
    status,
    isFetching,
    // isPreviousData,
    hasNextPage,
    refetch,
  } = usePaginated(page);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  }; 

  if (status === "loading") {
    return <Box sx={{ mx: "auto" }}>Loading...</Box>;
  }

  if (status === "error") {
    return <Box sx={{ mx: "auto" }}>Error: {error.message}</Box>;
  }

  return (
    <Box flex={1} display={"flex"} flexDirection="column">
      <Box
        flex={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        rowGap={2}
        overflow={"hidden"}
      >
        <IconButton
          onClick={() => handlePrev()}
          disabled={isFetching || page === 1}
        >
          <ArrowLeftIcon />
        </IconButton>
        <Box flex={1} sx={{ overflowY: "auto", height: "100%" }}>
          <Box sx={{ p: 1 }}>
            <Grid container spacing={2}>
              {data.map((pokemon, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <PokemonCard pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <IconButton
          onClick={() => handleNext()}
          disabled={!hasNextPage || isFetching}
        >
          <ArrowRightIcon />
        </IconButton>
      </Box>
      {isFetching && <Box>Loading</Box>}
    </Box>
  );
}

export default Pagination;

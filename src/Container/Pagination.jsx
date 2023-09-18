import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import usePaginated from "../Hooks/usePaginated";
import Slider from "react-slick";
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
  } = usePaginated(page);
  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  if (status === "loading") {
    return <Box sx={{ mx: "auto" }}>Loading...</Box>;
  }

  if (status === "error") {
    return <Box sx={{ mx: "auto" }}>Error: {error.message}</Box>;
  }

  return (
    <Box flex={1} display="flex" justifyContent={"center"}>
      <Box
        flex={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        rowGap={2}
      >
        <IconButton
          onClick={() => handlePrev()}
          disabled={isFetching || page === 1}
        >
          <ArrowLeftIcon />
        </IconButton>
        <Slider {...settings}>
          {data.map((pokemon, index) => (
            <Box key={index} sx={{ m: 1 }}>
              <PokemonCard pokemon={pokemon} />
            </Box>
          ))}
        </Slider>
        <IconButton
          onClick={() => handleNext()}
          disabled={!hasNextPage || isFetching}
        >
          <ArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Pagination;

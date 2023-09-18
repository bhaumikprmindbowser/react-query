import React, { useState } from "react";
import { Grid, Box, Typography, CircularProgress, Button } from "@mui/material";
import PokemonCard from "../Components/PokemonCard";
import usePokemonQuery from "../Hooks/usePokemonQuery";
import SlideDialog from "../Components/Dialog";
import UpdatePokemon from "./UpdatePokemon";
import useUpdatePokemonMutation from "../Hooks/useUpdatePokemonMutation";
import useDeletePokemonMutation from "../Hooks/useDeletePokemonMutation";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const { data, error, status } = usePokemonQuery(50);
  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    imageUrl: "",
  });
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const { editPokemon, isLoading: updating } = useUpdatePokemonMutation();
  const { removePokemon, isLoading: deleting } = useDeletePokemonMutation();

  const handleSubmitUpdate = async(formData) => {
    try {
      await editPokemon({ ...formData, id: initialValues.id });
      setOpenUpdate(false);
    } catch (error) {}
  };

  const handleSubmitDelete = async(formData) => {
    try {
      await removePokemon(initialValues?.id)
      setOpenDelete(false)
    } catch (error) {}
  };

  const onEditClick = (pokemon) => {
    setInitialValues(pokemon);
    setOpenUpdate(true);
  };

  const onDeleteClick = (pokemon) => {
    setInitialValues(pokemon);
    setOpenDelete(true);
  };

  const onInfoClick = (pokemon) => {
    history.push(`/pokemon/${pokemon.id}`);
  };

  if (status === "loading") {
    return <Box sx={{ mx: "auto" }}>Loading...</Box>;
  }

  if (status === "error") {
    return <Box sx={{ mx: "auto" }}>Error: {error.message}</Box>;
  }

  return (
    <Box flex={1} sx={{ overflowY: "auto", p: 1 }}>
      <Grid container spacing={2}>
        {data.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <PokemonCard
              key={index}
              pokemon={pokemon}
              actionBtn
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onInfoClick={onInfoClick}
            />
          </Grid>
        ))}
      </Grid>
      <SlideDialog isOpen={openUpdate} onClose={() => setOpenUpdate(false)}>
        <UpdatePokemon
          initialValues={initialValues}
          handleSubmit={handleSubmitUpdate}
          isLoading={updating}
        />
      </SlideDialog>
      <SlideDialog isOpen={openDelete} onClose={() => setOpenDelete(false)}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Typography> Are you sure you want to delete?</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmitDelete}
            startIcon={
              deleting && (
                <CircularProgress
                  //   size={"1.25rem"}
                  sx={{ color: "secondary.white" }}
                />
              )
            }
          >
            Delete
          </Button>
        </Box>
      </SlideDialog>
    </Box>
  );
}

export default Home;

import React from "react";
import PokemonForm from "../Components/PokemonForm";

function UpdatePokemon({ initialValues, handleSubmit, isLoading }) {
  return (
    <PokemonForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
    />
  );
}

export default UpdatePokemon;

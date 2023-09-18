import React from "react";
import PokemonForm from "../Components/PokemonForm";
import useCreatePokemonMutation from "../Hooks/useCreatePokemonMutation";

function AddPokemon() {
  const { addPokemon, isLoading } = useCreatePokemonMutation();
  const handleSubmit = (formData) => {
    addPokemon(formData);
  };

  return <PokemonForm onSubmit={handleSubmit} isSubmitting={isLoading} />;
}

export default AddPokemon;

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const dbJsonPath = path.join(__dirname, '../db.json'); // Define the path to db.json

const fetchAndSaveData = async () => {
  try {
    // Fetch data from PokeAPI
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=649") //649 images available
    const data = response.data.results
    const newPokemonData = [];
    // data.forEach((pokemon, index) => {
    //   newPokemonData.push({
    //     id: index + 1,
    //     name: pokemon.name,
    //     imgUrl: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1
    //       }.svg`
    //   });
    // });

    // For each Pokémon, fetch additional data from the second API
    for (let index = 0; index < data.length; index++) {
      let pokemon;
      if (index < 200) {
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data[index].name}`);
        pokemon = pokemonResponse.data;

      }
      newPokemonData.push({
        id: index + 1,
        name: data[index].name,
        imgUrl: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${index + 1}.svg`,
        // Add other properties you need from the second API
        // For example:
        ...(pokemon && { abilities: pokemon.abilities }),
        ...(pokemon && { types: pokemon.types }),
        // Add more as needed
      });
    }
    const jsonData = {
      pokemons: newPokemonData
    };
    // Write the fetched data to db.json
    fs.writeFileSync(dbJsonPath, JSON.stringify(jsonData, null, 2));
    console.log('Data has been saved to db.json');
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
};

fetchAndSaveData();
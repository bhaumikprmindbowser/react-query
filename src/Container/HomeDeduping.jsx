// import React from "react";
import usePokemonQuery from "../Hooks/usePokemonQuery";

function HomeDeduping() {
  const { data } = usePokemonQuery(50);
  console.log(data,"HomeDeduping")
  return "";
}

export default HomeDeduping;

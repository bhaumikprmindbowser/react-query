import React from "react";
// import Films from './Films'
// import Film from './Film'
// import Characters from './Characters'
// import Character from './Character'
// import Home from "./Home";
import { Link, Button, Box } from "@mui/material";
import { Switch, Route, Link as RouterLink } from "react-router-dom";
import InfiniteScroll from "./Container/InfiniteScroll";
import Home from "./Container/Home";
import AddPokemon from "./Container/AddPokemon";
import Pokemon from "./Container/Pokemon";
import Pagination from "./Container/Pagination";

export default function Layout(props) {
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        style={{
          width: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#CCC",
          "& button": {
            margin: (theme) => theme.spacing(1),
          },
        }}
      >
        <Link component={RouterLink} to="/">
          <Button color="primary">Home</Button>
        </Link>
        <Link component={RouterLink} to="/add">
          <Button color="primary">Add</Button>
        </Link>
        <Link component={RouterLink} to="/pagination">
          <Button color="primary">Slide</Button>
        </Link>
        <Link component={RouterLink} to="/inifinite">
          <Button color="primary">Inifinite Scroll</Button>
        </Link>
      </Box>
      <Box
        sx={{
          flex: 1,
          // margin: "0 auto",
          padding: "16px",
          display: "flex",
          justifyContent: "center",
          overflowY: "auto",
        }}
      >
        <Switch>
          <Route exact path="/pagination">
            <Pagination />
          </Route>
          <Route exact path="/pokemon/:id">
            <Pokemon />
          </Route>
          <Route exact path="/add">
            <AddPokemon />
          </Route>
          <Route exact path="/inifinite">
            <InfiniteScroll />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

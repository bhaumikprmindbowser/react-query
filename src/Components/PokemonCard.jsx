import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardMedia,
  capitalize,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';

function PokemonCard({
  pokemon,
  actionBtn,
  onEditClick,
  onDeleteClick,
  onInfoClick,
}) {
  return (
    <Card elevation={20}>
      <CardContent align="center">
        <Typography>{"Name: " + capitalize(`${pokemon.name}`)}</Typography>
        <Typography>{`ID: ${pokemon.id}`}</Typography>
        <CardMedia>
          <Box
            sx={{
              borderRadius: "50%",
              backgroundColor: "#F2F5C8",
              maxWidth: "90%",
              maxHeight: "50%",
            }}
          >
            <Box
              component={"img"}
              src={pokemon.imgUrl}
              sx={{
                width: "160px",
                height: "160px",
              }}
            />
          </Box>
        </CardMedia>
        {actionBtn && (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            mt={2}
          >
            <IconButton onClick={() => onInfoClick(pokemon)}>
              <InfoIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onEditClick(pokemon)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onDeleteClick(pokemon)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default PokemonCard;

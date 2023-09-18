import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import usePokemonById from "../Hooks/usePokemonById";
import { useParams } from "react-router-dom";
import useCommentsById from "../Hooks/useCommentsById";
import PokemonCard from "../Components/PokemonCard";

function Pokemon() {
  const { id } = useParams();
  const { data, status, error } = usePokemonById(id);
  const [pokemonId, setpokemonId] = useState(null);

  useEffect(() => {
    if (status === "success") {
      setpokemonId(data?.id);
    }
  }, [status, data]);

  const {
    data: commentsData,
    status: commentsStatus,
    error: commentsError,
  } = useCommentsById(pokemonId);

  if (status === "loading") {
    return <Box sx={{ mx: "auto" }}>Loading...</Box>;
  }

  if (status === "error") {
    return <Box sx={{ mx: "auto" }}>Error: {error.message}</Box>;
  }

  return (
    <Box flex={1} display={"flex"} flexDirection={"column"} rowGap={2}>
      <Box sx={{ width: "350px" }}>
        <PokemonCard pokemon={data} />
      </Box>
      <Divider />
      <Box
        flex={1}
        sx={{
          overflow: "hidden",
          overflowY: "auto",
          width: "350px",
        }}
      >
        {commentsStatus === "loading" ? (
          <Box>Loading Comments...</Box>
        ) : commentsStatus === "error" ? (
          <Box>Error: {commentsError.message}</Box>
        ) : (
          <List
            sx={{
              width: "100%",
              //   maxWidth: 360,
              bgcolor: "background.paper",
              overflowY: "auto",
            }}
          >
            {commentsData?.map((comment, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={comment.email}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={comment?.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment?.email}
                      </Typography>
                      {comment?.body}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}

export default Pokemon;

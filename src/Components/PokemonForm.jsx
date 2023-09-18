import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";

function PokemonForm({ initialValues, onSubmit, isSubmitting }) {
  const [name, setName] = useState(initialValues?.name || "");
  const [imgUrl, setImgUrl] = useState(initialValues?.imgUrl || "");

  useEffect(() => {
    setName(initialValues?.name || "");
    setImgUrl(initialValues?.imgUrl || "");
  }, [initialValues]);

  const clearInputs = () => {
    setName("");
    setImgUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      name,
      imgUrl,
    };
    await onSubmit(formData);
    clearInputs();
  };
  return (
    <Box flex={1}>
      <Container component={"div"} maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name of Pokemon"
            name="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="imageUrl"
            label="Image"
            id="imageUrl"
            onChange={(e) => setImgUrl(e.target.value)}
            value={imgUrl}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            startIcon={
              isSubmitting && (
                <CircularProgress
                  //   size={"1.25rem"}
                  sx={{ color: "secondary.white" }}
                />
              )
            }
            disabled={!name || !imgUrl}
          >
            {initialValues ? "Update" : "Create"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default PokemonForm;

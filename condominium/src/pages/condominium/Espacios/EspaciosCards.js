import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
  InputLabel,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  TextField,
  Typography,
  OutlinedInput,
  Select,
  FormControl,
  Box,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { gql, useMutation, useQuery } from "@apollo/client";

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const ADD_RESERVA_ESPACIO = gql`
  mutation AddReserva($input: ReservaInput) {
    addReserva(input: $input) {
      fecha
      residente
      espacio
      pago
    }
  }
`;

function MediaCard({ espacio, descripcion, rutaimg, titleimg }) {
  const [open, setOpen] = React.useState(false);
  const [espaciose, setEspaciose] = React.useState("");
  const handleChange = (event) => {
    setEspaciose(event.target.value);
  };
  const [addReserva, { newData, errorMutation }] = useMutation(
    ADD_RESERVA_ESPACIO
  );
  if (errorMutation) {
    console.log(errorMutation);
  }

  const pagoRef = React.useRef(null);
  const espacioRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const residenteRef = React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddReserva = (e) => {
    e.preventDefault();
    addReserva({
      variables: {
        input: {
          pago: parseInt(pagoRef.current.value, 10),
          espacio: espacioRef.current.value,
          fecha: dateRef.current.value,
          residente: residenteRef.current.value,
        },
      },
    });
    handleClose();
  };

  const today = new Date();
  const minDate = today.toISOString().substring(0, 10);
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  )
    .toISOString()
    .substring(0, 10);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  return (
    <Card mb={6}>
      <CardActionArea>
        <CardMedia image={rutaimg} title={titleimg} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {espacio}
          </Typography>
          <Typography component="p">{descripcion}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" onClick={handleClickOpen} color="primary">
          Reservar Espacio
        </Button>
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle>
          <Typography variant="h3">Reservar Espacio </Typography>
        </DialogTitle>
        <DialogContent>
          <InputLabel shrink>Nombre del reservante</InputLabel>
          <TextField
            disabled
            autoFocus
            inputRef={residenteRef}
            margin="dense"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue="Don Jose"
          />
          <InputLabel shrink>Fecha a usar el espacio</InputLabel>
          <TextField
            inputRef={dateRef}
            margin="dense"
            type="date"
            required
            inputProps={{ min: minDate, max: maxDate }}
            defaultValue={minDate}
            fullWidth
            variant="outlined"
          />
          <InputLabel shrink>Precio</InputLabel>
          <TextField
            inputRef={pagoRef}
            margin="dense"
            type="number"
            required
            fullWidth
            defaultValue="500"
            variant="outlined"
          />
          <InputLabel shrink>Espacio</InputLabel>
          <FormControl fullWidth>
            <Select
              fullWidth
              inputRef={espacioRef}
              margin-top="dense"
              variant="outlined"
              native
              value={espaciose}
              onChange={handleChange}
              input={
                <OutlinedInput label="Espacioes" id="demo-dialog-native" />
              }
            >
              <option value={"Piscina"}>Piscina</option>
              <option value={"Salón Multiuso"}>Salón Multiuso</option>
              <option value={"Quincho"}>Quincho</option>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleAddReserva}
            variant="contained"
            color="primary"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

function Cards() {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <MediaCard
            espacio="Piscina"
            descripcion="Refréscate en nuestra piscina para residentes."
            rutaimg="/static/img/unsplash/piscina.jpg"
            titleimg="Piscina"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MediaCard
            espacio="Salon Multiuso"
            descripcion="Un salon para todos tus eventos."
            rutaimg="/static/img/unsplash/salon.jpg"
            titleimg="Salon"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MediaCard
            espacio="Quincho"
            descripcion="¿Un asaito?"
            rutaimg="/static/img/unsplash/quincho.jpg"
            titleimg="Quincho"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default Cards;

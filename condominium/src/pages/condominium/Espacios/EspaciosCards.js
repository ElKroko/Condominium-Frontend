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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reservar Espacio</DialogTitle>
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
            fullWidth
            variant="outlined"
          />
          <InputLabel shrink>Espacio</InputLabel>
          <TextField
            inputRef={espacioRef}
            margin="dense"
            type="text"
            required
            fullWidth
            variant="outlined"
            defaultValue="espacio"
          />
          <InputLabel shrink>Precio</InputLabel>
          <TextField
            inputRef={pagoRef}
            margin="dense"
            type="number"
            required
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAddReserva}>Enviar</Button>
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
            descripcion="Refréscate en nuestra piscina exclusiva para residentes."
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

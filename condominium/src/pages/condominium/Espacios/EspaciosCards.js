import React, { useState } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
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

const GET_ESPACIOS = gql`
  query GetEspacios {
    getEspacios {
      nombre
      reservados
      cantidad
    }
  }
`;

function mapData(data) {
  return data.map((x) => {
    let item = {};
    item.nombre = x.nombre;
    item.disponible = x.cantidad - x.reservados;
    item.disabled = item.disponible > 0 ? false : true;
    return item;
  });
}

function MediaCard({ espacio, index, descripcion, rutaimg, titleimg }) {
  const { data, loading, error } = useQuery(GET_ESPACIOS);
  let espacios = [
    { disabled: false },
    { disabled: false },
    { disabled: false },
  ];

  if (data) {
    console.log(data);
    espacios = mapData(data.getEspacios);
  }

  if (error) {
    console.log(error);
  }

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

  const handleClickOpen = (valor) => {
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
    window.location.reload(false);
  };

  const valorBoton = React.useRef(null);

  const [buttonValue, setButtonValue] = useState(null);

  // Creamos un manejador de eventos para actualizar el valor del estado cuando se haga clic en un botón
  const handleButtonClick = (event) => {
    setButtonValue(espacio);
    handleClickOpen();
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
        <Grid container>
          <Grid item xs={7}>
            <Button
              id={espacio}
              value={espacio}
              name={espacio}
              variant="contained"
              onClick={(event) => handleButtonClick(event, espacio)}
              color="primary"
              disabled={espacios[index].disabled}
            >
              Reservar Espacio
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Box alignItems="flex-end" display="flex" justifyContent="flex-end">
              <Button> Disponibles: {espacios[index].disponible}</Button>
            </Box>
          </Grid>
        </Grid>
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
              onChange={(event) => handleChange(event)}
              input={
                <OutlinedInput
                  defaultValue={buttonValue}
                  label="Espacioes"
                  id="demo-dialog-native"
                />
              }
            >
              <option value={"Piscina"}>Piscina</option>
              <option value={"Salon Multiuso"}>Salón Multiuso</option>
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
            index={0}
            descripcion="Refréscate en nuestra piscina para residentes."
            rutaimg="/static/img/unsplash/piscina.jpg"
            titleimg="Piscina"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MediaCard
            espacio="Salon Multiuso"
            index={1}
            descripcion="Un salon para todos tus eventos."
            rutaimg="/static/img/unsplash/salon.jpg"
            titleimg="Salon"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MediaCard
            espacio="Quincho"
            index={2}
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

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

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

function MediaCard({ espacio, descripcion, rutaimg, titleimg }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    setOpen(false);
  };
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Reservar Espacio</DialogTitle>
          <DialogContent>
            <InputLabel shrink>Nombre del reservante</InputLabel>
            <TextField
              disabled
              autoFocus
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue="Don Jose"
            />
            <InputLabel shrink>Fecha a usar el espacio</InputLabel>
            <TextField
              margin="dense"
              id="date"
              type="date"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSend}>Enviar</Button>
          </DialogActions>
        </Dialog>
      </CardActions>
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

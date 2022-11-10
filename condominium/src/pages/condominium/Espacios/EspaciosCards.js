import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Link,
  Button as MuiButton,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const Button = styled(MuiButton)(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

function MediaCard({ espacio, descripcion, rutaimg, titleimg }) {
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
        <Button fullWidth color="primary" variant="contained">
          Reservar
        </Button>
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
            descripcion="Lorem id dolore officia commodo ipsum veniam fugiat duis cillum voluptate est ea nulla sit."
            rutaimg="/static/img/unsplash/unsplash-1.jpg"
            titleimg="Piscina"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MediaCard
            espacio="Salon Multiuso"
            descripcion="Un salon para todos tus eventos."
            rutaimg="/static/img/unsplash/unsplash-1.jpg"
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

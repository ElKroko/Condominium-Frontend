import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import {
  Avatar,
  Collapse,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Avatar as MuiAvatar,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider,
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";

export default function Noticias() {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Conserje" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Aviso fin de semana"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Conserje Juanito
              </Typography>
              {
                " — Eiusmod sint consequat eiusmod deserunt excepteur enim sunt non culpa sint..."
              }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Admin" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Fin de Año"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Administración
              </Typography>
              {" — Qui excepteur id do elit tempor anim commodo sint ex…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Admi" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Uso de Piscina"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Administración
              </Typography>
              {" — Laboris exercitation Lorem aliqua irure…"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

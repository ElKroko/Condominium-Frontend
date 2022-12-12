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

export default function Noticias({ avisos }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {avisos.map((row) => {
        return (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Conserje" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={row.titulo}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {row.creador}-
                  </Typography>
                  {row.descripcion}
                </React.Fragment>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
}

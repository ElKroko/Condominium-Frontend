import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import Helmet from "react-helmet";
import EspaciosCards from "./EspaciosCards";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Header = styled.div`
  padding: ${(props) => props.theme.spacing(6)}px 0;
`;

function Espacios() {
  return (
    <React.Fragment>
      <Helmet title="Espacios" />
      <Typography variant="h3" gutterBottom display="inline">
        Espacios
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Inicio
        </Link>
        <Typography>Espacios</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header>
        <Typography variant="h3" gutterBottom align="center">
          Conoce los espacios que tenemos para ti
        </Typography>

        <Typography variant="subtitle1" gutterBottom align="center">
          Reserva cualquiera de los siguientes!
        </Typography>
      </Header>

      <Grid container justify="center">
        <Grid item xs={12} lg={10}>
          <EspaciosCards />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Espacios;

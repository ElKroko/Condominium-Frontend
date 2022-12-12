import React from "react";
import styled from "styled-components/macro";

import { ReactComponent as GastosSVG } from "../../../vendor/logo.svg";

import { Helmet } from "react-helmet";

import {
  Avatar as MuiAvatar,
  Button,
  Box,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
  Card,
  CardContent,
  Link,
  SvgIcon,
} from "@material-ui/core";

import { DollarSign, Home } from "react-feather";

import { spacing } from "@material-ui/system";

import Noticias from "./Noticias";

import { gql, useQuery } from "@apollo/client";

const userID = "634e02da5cecb3222d4ea9fa";

const GET_AVISOS = gql`
  query GetAvisos {
    getAvisos {
      creador
      descripcion
      fecha
      titulo
    }
  }
`;

const GET_RESIDENTE = gql`
  query GetResidente($getResidenteId: ID!) {
    getResidente(id: $getResidenteId) {
      deuda
      email
      location
      userName
    }
  }
`;

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const Spacer = styled.div(spacing);

const CustomCard = styled(CardContent)`
  background: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.common.white};
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const Avatar = styled(MuiAvatar)`
  min-width: 150px;
  min-height: 150px;
`;

const Perfil = styled(Card)`
  text-align: center;
  justify-content: center;
  display: flex;
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const SecondaryCard = styled(CardContent)`
  background: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.info.contrastText};
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const Centered = styled.div`
  text-align: center;
`;

function Details({ name }) {
  return (
    <Perfil mb={6} style={{ boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Perfil
        </Typography>

        <Spacer mb={4} />
        <Avatar alt="Lucy Lavender" src="/static/img/avatars/avatar-2.jpg" />
        <Spacer mb={5} />
        <Typography variant="body2" component="div" gutterBottom>
          <Box fontWeight="fontWeightMedium">{name}</Box>
          <Box fontWeight="fontWeightRegular">Residente</Box>
        </Typography>
      </CardContent>
    </Perfil>
  );
}

const AboutIcon = styled.span`
  display: flex;
  padding-right: ${(props) => props.theme.spacing(2)}px;

  svg {
    width: 14px;
    height: 14px;
  }
`;
const StatsIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 32px;

  svg {
    width: 32px;
    height: 32px;
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

function About({ location }) {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Detalles
        </Typography>

        <Spacer mb={4} />

        <Grid container direction="row" alignItems="center" mb={2}>
          <Grid item>
            <AboutIcon>
              <Home />
            </AboutIcon>
          </Grid>
          <Grid item>
            Vive en <Link href="">{location}</Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function Deuda({ deuda }) {
  return (
    <Box position="relative">
      <Card mb={6} pt={2}>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            <Box fontWeight="fontWeightRegular">$ {deuda}</Box>
          </Typography>
          <Typography variant="body2" gutterBottom mt={3} mb={0}>
            Deuda Total
          </Typography>

          <StatsIcon>
            <DollarSign />
          </StatsIcon>
          <Spacer mb={5} />
          <Grid container justify="center">
            <Button variant="contained" color="primary">
              Pagar Aqui
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

function GastosComunes() {
  return (
    <Link href="/gastos">
      <Card mb={6} variant="outlined">
        <CustomCard>
          <Centered>
            <SvgIcon
              component={GastosSVG}
              viewBox="0 0 50 50"
              style={{ fontSize: 80, color: "primary.contrastText" }}
            />
            <Typography variant="h3"> Gastos Comunes</Typography>
          </Centered>
        </CustomCard>
      </Card>
    </Link>
  );
}

function ReservarEspacio() {
  return (
    <Link href="/espacios">
      <Card mb={6} variant="outlined">
        <SecondaryCard>
          <Centered>
            <SvgIcon
              component={GastosSVG}
              viewBox="0 0 50 50"
              style={{ fontSize: 80, color: "primary.contrastText" }}
            />
            <Typography variant="h3"> Reservar Espacio</Typography>
          </Centered>
        </SecondaryCard>
      </Card>
    </Link>
  );
}

function GetAvisos() {
  const { data, error } = useQuery(GET_AVISOS);

  if (data) {
    console.log(data);
    return data.getAvisos;
  }

  if (error) {
    console.log(error);
  }
  return [];
}

function GetResidente() {
  const { data, error } = useQuery(GET_RESIDENTE, {
    variables: {
      getResidenteId: userID,
    },
  });

  if (data) {
    console.log(data);
    return data.getResidente;
  }

  if (error) {
    console.log(error);
  }
  return {};
}
function ResidenteDashboard() {
  let avisos = GetAvisos();
  let residente = GetResidente();

  return (
    <React.Fragment>
      <Helmet title="Inicio" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Inicio
          </Typography>
          <Typography variant="subtitle1">
            Bienvenido {residente.userName}! Te extrañamos.{" "}
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />
      <Spacer mb={5} />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h4" gutterBottom>
            {" "}
            Avisos a la Comunidad:
          </Typography>
          <Noticias avisos={avisos} />
          <Spacer mb={30} />
          <Grid container spacing={6}>
            <Grid item xs={12} lg={1} />
            <Grid item xs={12} lg={4}>
              <GastosComunes />
            </Grid>
            <Grid item xs={12} lg={2}></Grid>
            <Grid item xs={12} lg={4}>
              <ReservarEspacio />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={1} />
        <Grid item xs={12} lg={3} spacing={2}>
          <Details name={residente.userName} mb={5} />
          <About location={residente.location} />
          <Deuda deuda={residente.deuda} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ResidenteDashboard;

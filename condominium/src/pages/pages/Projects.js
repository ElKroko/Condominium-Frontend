import React from "react";
import styled from "styled-components/macro";

import {
  Avatar,
  Button,
  Card as MuiCard,
  CardActions,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  Grid,
  Typography as MuiTypography,
} from "@material-ui/core";

import { AvatarGroup as MuiAvatarGroup } from "@material-ui/lab";

import { green, orange } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const Typography = styled(MuiTypography)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
  margin-bottom: ${(props) => props.theme.spacing(4)}px;
`;

const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: ${(props) => props.theme.spacing(2)}px;
`;

function Project({ title, description, chip }) {
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>

        {chip}

        <Typography mb={4} component="p">
          {description}
        </Typography>

        <AvatarGroup max={3}>
          <Avatar alt="Avatar" src="/static/img/avatars/avatar-2.jpg" />
        </AvatarGroup>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}

function Projects() {
  return (
    <React.Fragment>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6} xl={3}>
          <Project
            title="Saludo de Administracion"
            description="Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
            chip={<Chip label="Conserjeria" rgbcolor={green[500]} />}
          />
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Project
            title="Corte de Agua"
            description="Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa."
            chip={<Chip label="Administracion" rgbcolor={orange[500]} />}
          />
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Project
            title="Paso algo feo"
            description="Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
            chip={<Chip label="Noticias" rgbcolor={green[500]} />}
          />
        </Grid>
        <Grid item xs={12} lg={6} xl={3}>
          <Project
            title="Puede que pase algo feo!"
            description="Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris."
            chip={<Chip label="Noticias" rgbcolor={orange[500]} />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Projects;

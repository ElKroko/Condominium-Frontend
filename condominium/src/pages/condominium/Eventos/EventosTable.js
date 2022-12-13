import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import Helmet from "react-helmet";

import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  InputLabel,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Slide,
  Card,
  CardContent,
} from "@material-ui/core";

import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Visibility,
} from "@material-ui/icons";

import { spacing } from "@material-ui/system";
import { InputSharp } from "@material-ui/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div`
  flex: 1 1 100%;
`;

const ADD_EVENT = gql`
  mutation AddEvento($input: EventoInput) {
    addEvento(input: $input) {
      fecha
      nombre
      responsable
      tipo
      info_adicional
    }
  }
`;

const GET_EVENTOS = gql`
  query GetGastos {
    getEventos {
      nombre
      tipo
      fecha
      responsable
      info_adicional
    }
  }
`;

function mapData(data) {
  return data.map((x) => {
    let item = {};
    item.name = x.nombre;
    item.tipo = x.tipo;
    item.fecha = x.fecha.substring(0, 10);
    item.responsable = x.responsable;
    item.info_adicional = x.info_adicional;
    return item;
  });
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },
  { id: "tipo", numeric: true, disablePadding: false, label: "Tipo" },
  {
    id: "fecha",
    numeric: true,
    disablePadding: false,
    label: "Fecha",
  },
  {
    id: "responsable",
    numeric: true,
    disablePadding: false,
    label: "Responsable",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EnhancedTable({ rows }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("tipo");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const [data, setData] = React.useState({});

  const handleClickOpen = (event, row) => {
    setData(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    if (
      event.target.tagName !== "path" &&
      event.target.tagName !== "svg" &&
      event.target.tagName !== "BUTTON"
    ) {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
      console.log(event);

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.tipo}</TableCell>
                      <TableCell align="right">{row.fecha}</TableCell>
                      <TableCell align="right">{row.responsable}</TableCell>
                      <IconButton
                        onClick={(event) => handleClickOpen(event, row)}
                        edge="false"
                      >
                        <Visibility />
                      </IconButton>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth={fullWidth}
            maxWidth={maxWidth}
          >
            <DialogContent>
              <Grid container spacing={4}>
                <Grid item md={12}>
                  <Typography variant="h2">Evento {data.nombre}</Typography>
                </Grid>

                <Grid item md={6}>
                  <Typography variant="subtitle1">
                    <b>Responsable:</b> {data.responsable}
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography variant="subtitle1">
                    <b>Fecha:</b> {data.fecha}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="subtitle1">
                    <b>Tipo:</b> {data.tipo}
                  </Typography>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="subtitle1">
                    <b>Glosa:</b>
                  </Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography>{data.glosa}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <b>Info Adicional:</b> {data.info_adicional}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
              >
                Listo
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

function EventosTable() {
  const [open, setOpen] = React.useState(false);
  const [addEvent, { newData, errorMutation }] = useMutation(ADD_EVENT);

  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  if (errorMutation) {
    console.log(error);
  }

  const { data, loading, error } = useQuery(GET_EVENTOS);
  let eventos = [];
  if (data) {
    console.log(data);
    eventos = mapData(data.getEventos);
  }
  if (error) {
    console.log(error);
  }

  const nombreRef = React.useRef(null);
  const tipoRef = React.useRef(null);
  const dateRef = React.useRef(null);
  const responsableRef = React.useRef(null);
  const info_adicionalRef = React.useRef(null);
  const glosaRef = React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = (e) => {
    e.preventDefault();
    addEvent({
      variables: {
        input: {
          nombre: nombreRef.current.value,
          tipo: tipoRef.current.value,
          fecha: dateRef.current.value,
          responsable: responsableRef.current.value,
          info_adicional: info_adicionalRef.current.value,
          glosa: glosaRef.current.value,
        },
      },
    });
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <React.Fragment>
      <Helmet title="Registro eventos" />
      <Grid container spacing={6}>
        <Grid item xs={12} lg={5}>
          <Typography variant="h3" gutterBottom display="inline">
            Eventos condominio
          </Typography>
        </Grid>
        <Grid item xs={12} lg={3}></Grid>
        <Grid item xs={12} lg={3}>
          <Box
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              endIcon={<InputSharp />}
              onClick={handleClickOpen}
              color="primary"
            >
              Ingresar evento
            </Button>
          </Box>
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
        >
          <DialogTitle>Ingresar Evento</DialogTitle>
          <DialogContent>
            <InputLabel shrink>Nombre</InputLabel>
            <TextField
              autoFocus
              inputRef={nombreRef}
              margin="dense"
              id="name"
              type="text"
              fullWidth
              variant="outlined"
            />
            <InputLabel shrink>Tipo</InputLabel>
            <TextField
              inputRef={tipoRef}
              margin="dense"
              id="type"
              type="txt"
              fullWidth
              variant="outlined"
            />
            <InputLabel shrink>Fecha</InputLabel>
            <TextField
              inputRef={dateRef}
              margin="dense"
              id="date"
              type="date"
              fullWidth
              variant="outlined"
            />
            <InputLabel shrink>Responsable</InputLabel>
            <TextField
              inputRef={responsableRef}
              margin="dense"
              id="officer"
              type="text"
              fullWidth
              variant="outlined"
            />
            <InputLabel shrink>Información adicional</InputLabel>
            <TextField
              inputRef={info_adicionalRef}
              margin="dense"
              id="info_adicional"
              type="text"
              fullWidth
              variant="outlined"
            />
            <InputLabel shrink>Glosa</InputLabel>
            <TextField
              inputRef={glosaRef}
              margin="dense"
              id="info_adicional"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSend}>Enviar</Button>
          </DialogActions>
        </Dialog>

        <Grid item xs={12} lg={1}></Grid>
      </Grid>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/inicio">
          Inicio
        </Link>
        <Typography>Eventos</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <EnhancedTable rows={eventos} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default EventosTable;

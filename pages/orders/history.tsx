import { ShopLayout } from "../../components/layouts/ShopLayout";
import { Typography, Grid, Chip, Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridRenderCellParams } from "@mui/x-data-grid/models";
import NextLink from "next/link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },

  {
    field: "paid",
    headerName: "Estado",
    description: "Muestra informacion si esta pagada la orden o no",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined"></Chip>
      ) : (
        <Chip color="error" label="No Pagada" variant="outlined"></Chip>
      );
    },
  },

  {
    field: "orden",
    headerName: "Ver orden",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
          <Link underline="always">Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Jeronimo Garcia" },
  { id: 2, paid: true, fullname: "Luis Rodriguez" },
  { id: 3, paid: false, fullname: "Lucia Fernandez" },
  { id: 4, paid: false, fullname: "Pedro Valle" },
  { id: 5, paid: true, fullname: "Jose Gonzalez" },
];

const HistoryPage = () => {
  return (
    <ShopLayout
      title={"Historial de ordenes"}
      pageDescription={"Historial de ordenes del cliente"}
    >
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={10}
            rowsPerPageOptions={[10]}
          ></DataGrid>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default HistoryPage;

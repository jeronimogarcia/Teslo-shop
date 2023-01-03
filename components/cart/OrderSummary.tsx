import { Grid, Typography } from "@mui/material";

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>

      <Grid display="flex" justifyContent="end" item xs={6}>
        <Typography>3</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid display="flex" justifyContent="end" item xs={6}>
        <Typography>${150} </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos</Typography>
      </Grid>

      <Grid display="flex" justifyContent="end" item xs={6}>
        <Typography>${35} </Typography>
      </Grid>

      <Grid item xs={6} sx={{mt:1}}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>

      <Grid display="flex" justifyContent="end" item xs={6} sx={{mt:1}}>
        <Typography variant="subtitle1">${185} </Typography>
      </Grid>
    </Grid>
  );
};

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Link,
    Typography,
  } from "@mui/material";
  import { CartList, OrderSummary } from "../../components/cart";
  import { ShopLayout } from "../../components/layouts";
  import NextLink from 'next/link'

  
  const SummaryPage = () => {
    return (
      <ShopLayout
        title={"Resumen de compra"}
        pageDescription={"Resumen de la orden"}
      >
        <Typography variant="h1" component="h1">
          Resumen de la orden
        </Typography>
  
        <Grid container>
          <Grid item xs={12} sm={7}>
            <CartList />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Card className="summary-card">
              <CardContent>
                <Typography variant="h2">Resumen (3 productos)</Typography>
                <Divider sx={{ my: 1 }} />

                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='subtitle1'>Direccion de entrega</Typography>
                    <NextLink href='/checkout/address' passHref legacyBehavior>
                        <Link underline="always">
                        Editar 
                        </Link>
                    </NextLink>
                </Box>

                <Typography>Jeronimo Garcia</Typography>
                <Typography>Artigas 376</Typography>
                <Typography>Rosario, Sta Fe</Typography>
                <Typography>Argentina</Typography>
                <Typography>324235523</Typography>

                <Divider sx={{ my: 1 }} />

                <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Calculo costo</Typography>
                    <NextLink href='/cart' passHref legacyBehavior>
                        <Link underline="always">
                        Editar 
                        </Link>
                    </NextLink>
                </Box>
  
                <OrderSummary/>
  
                <Box sx={{ mt: 3 }}>
                  <Button color="secondary" className="circular-btn" fullWidth>
                    Confirmar orden
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ShopLayout>
    );
  };
  
  export default SummaryPage;
  
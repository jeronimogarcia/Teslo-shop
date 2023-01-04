import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import FullScreenLoading from "../../components/ui/FullScreenLoading";


const MenPage: NextPage = () => {

  const { products, isLoading } = useProducts('/products?gender=men')

  return (
    <ShopLayout
      title={"Teslo-Shop - Men Page"}
      pageDescription={"Encuentra los mejores productos de Teslo para ellos"}
    >
      <>
        <Typography variant="h1" component="h1">
          Seccion hombres
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Todos los productos para ellos
        </Typography>

        {
          isLoading 
          ? <FullScreenLoading />
          : <ProductList products={products} />
        }

      </>
    </ShopLayout>
  );
};

export default MenPage;
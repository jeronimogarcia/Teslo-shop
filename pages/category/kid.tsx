import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import FullScreenLoading from "../../components/ui/FullScreenLoading";


const KidPage: NextPage = () => {

  const { products, isLoading } = useProducts('/products?gender=kid')

  return (
    <ShopLayout
      title={"Teslo-Shop - Kid Page"}
      pageDescription={"Encuentra los mejores productos de Teslo para niños"}
    >
      <>
        <Typography variant="h1" component="h1">
          Seccion niños
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Todos los productos para niños
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

export default KidPage;

import type { NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import FullScreenLoading from "../../components/ui/FullScreenLoading";

const SearchPage: NextPage = () => {

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout
      title={"Teslo-Shop - SearchPage"}
      pageDescription={"Encuentra los mejores productos de Teslo"}
    >
      <>
        <Typography variant="h1" component="h1">
          Buscar
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          ABC
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

export default SearchPage;

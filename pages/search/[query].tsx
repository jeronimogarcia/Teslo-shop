import { GetServerSideProps, NextPage } from "next";
import { ShopLayout } from "../../components/layouts";
import { Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
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

        <ProductList products={products} />
      </>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);

  return {
    props: {
      products,
    },
  };
};

export default SearchPage;

import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";
import { Typography } from "@mui/material";
import { ProductList } from "../components/products";
import useSWR from 'swr'

const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())

const Home: NextPage = () => {

  const { data, error } = useSWR('/api/products', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log({data})

  return (
    <ShopLayout
      title={"Teslo-Shop - Home"}
      pageDescription={"Encuentra los mejores productos de Teslo"}
    >
      <>
        <Typography variant="h1" component="h1">
          Tienda
        </Typography>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Todos los productos
        </Typography>

        <ProductList products={data as any} />
      </>
    </ShopLayout>
  );
};

export default Home;

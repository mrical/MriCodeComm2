import Head from "next/head";
import React from "react";
import { deleteProduct } from "../../actions/productsActions";
import DivideHeading from "../../components/DivideHeading";
import ProductCard from "../../components/ProductCard";
import isAdmin from "../../helpers/ensureAdmin";
import useProducts from "../../hooks/useProducts";

export default function products() {
  const { productsState, productsDispatch } = useProducts();
  const handleDelete = async (productId) => {
    await deleteProduct(productId, productsDispatch);
  };
  return (
    <>
      <Head>
        <title>Admin | MriCodecomm</title>
      </Head>
      <DivideHeading title="All Products" />
      <div className="mx-auto grid p-1 sm:p-3 sm:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {productsState?.map((p) => (
          <ProductCard {...p} key={p._id} admin handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const admin = await isAdmin(ctx);
  if (!admin) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin/login" });
    res.end();
  }
  return { props: {} };
}

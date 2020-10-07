import React from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";

import useProducts from "../../../hooks/useProducts";
import { updateProduct } from "../../../actions/productsActions";
import ProductForm from "../../../components/ProductForm";
import isAdmin from "../../../helpers/ensureAdmin";
import Head from "next/head";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(6, "Title must be minimum 6 characters")
    .required("Please enter a title"),
  description: Yup.string()
    .min(15, "Product description is too short")
    .required("Please enter description"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Please enter price of product"),
  discountedPrice: Yup.number("Price must be a number").typeError(
    "Price must be a number"
  ),
});
export default function createproduct() {
  const { productsState, productsDispatch } = useProducts();
  const router = useRouter();
  const { productId } = router.query;
  const initialValues = {
    ...productsState?.find((p) => p._id === productId),
    files: [null],
  };
  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    const imageUrls = await Promise.all(
      values.files.map(async (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          if (file) {
            reader.readAsDataURL(file);
            reader.onload = async () => {
              const { data } = await Axios.post("/api/uploadImage", {
                data: reader.result,
              });
              resolve(data.url);
            };
          } else {
            resolve(null);
          }
        });
      })
    );
    if (!imageUrls[0]) {
      await updateProduct({ ...values }, productId, productsDispatch);
    } else {
      await updateProduct(
        { ...values, imageUrls },
        productId,
        productsDispatch
      );
    }
    setSubmitting(false);
    resetForm();
    router.back();
  };
  return (
    <div className="bg-gray-300 p-3 rounded-md border-black border shadow-lg md:w-3/5 mx-auto overflow-x-hidden">
      <Head>
        <title>Admin | MriCodecomm</title>
      </Head>
      <h1 className="font-semibold text-xl capitalize text-center">
        Update Product
      </h1>
      <ProductForm {...{ initialValues, handleFormSubmit, validationSchema }} />
    </div>
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

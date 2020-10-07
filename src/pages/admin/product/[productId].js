import Head from "next/head";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { deleteProduct } from "../../../actions/productsActions";
import ProductDetails from "../../../components/ProductDetails";
import ProductReviews from "../../../components/ProductReviews";
import isAdmin from "../../../helpers/ensureAdmin";
import useProducts from "../../../hooks/useProducts";
export default function index() {
  const router = useRouter();
  const { productId } = router.query;
  const { productsState, productsDispatch } = useProducts();
  const product = productsState?.find((p) => p._id === productId);
  const handleDelete = async (productId) => {
    await deleteProduct(productId, productsDispatch);
  };
  return (
    <div>
      <Head>
        <title>Admin | MriCodecomm</title>
      </Head>
      {product && <ProductDetails {...product} admin />}
      <div className="rounded-lg shadow-lg p-2 my-5">
        {productId && (
          <ProductReviews
            productId={productId}
            admin
            handleDelete={handleDelete}
          />
        )}
      </div>
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

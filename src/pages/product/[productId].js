import Axios from "axios";
import { fetchProduct } from "../../actions/productsActions";
import { createReview } from "../../actions/reviewsActions";
import ProductDetails from "../../components/ProductDetails";
import ProductReviews from "../../components/ProductReviews";
import ReviewForm from "../../components/ReviewForm";
import useAuth from "../../hooks/useAuth";
import useProducts from "../../hooks/useProducts";
import useReviews from "../../hooks/useReviews";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { fetchProductsForPaths } from "../api/products";
import { fetchProductStatic } from "../api/product/[productId]";
import Head from "next/head";
import { CircularProgress } from "@material-ui/core";
const validationSchema = Yup.object().shape({
  text: Yup.string().required("Please Provide your usefull review"),
});
export default function index({ product }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div
        className="w-screen flex justify-center items-center"
        style={{ height: "calc(100vh - 143px)" }}
      >
        <CircularProgress />
      </div>
    );
  }
  const productId = product?._id;
  const { productsState, productsDispatch } = useProducts();
  const { reviewsDispatch } = useReviews();
  const userId = useAuth().authState?.userDetails?._id;

  const onFormSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    await createReview(userId, productId, values, reviewsDispatch);
    await fetchProduct(productId, productsDispatch);
    resetForm();
    setSubmitting(false);
  };

  const initialValues = { rating: 5, text: "" };
  return (
    <div>
      <Head>
        <title>{product.title}</title>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {product.description && (
          <meta content={product.description} name="description" />
        )}
        <meta content="follow, index" name="robots" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta
          content="/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        <link
          href="/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/favicons/site.webmanifest" rel="manifest" />
        <link
          color="#5bbad5"
          href="/favicons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <link href="/favicons/favicon.ico" rel="shortcut icon" />
        <link
          crossOrigin=""
          href="https://fonts.gstatic.com/"
          rel="preconnect"
        />
        <link
          crossOrigin=""
          href="https://cdn.usefathom.com"
          rel="preconnect"
        />
        <link
          as="style"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap"
          rel="preload"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap"
          media="print"
          onLoad="this.media='all'"
          rel="stylesheet"
        />
        <meta content="en_US" property="og:locale" />
        <meta content={product.title} property="og:title" />
        <meta content={product.description} property="og:description" />
        <meta content="5e41b2275db646a5" name="yandex-verification" />
        {product.imageUrls[0] && (
          <>
            <meta content={product.imageUrls[0]} property="og:image" />
            <meta content={product.title} property="og:image:alt" />
          </>
        )}

        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@MricalSinghal" name="twitter:site" />
        <meta content="@MricalSinghal" name="twitter:creator" />
      </Head>
      {product && <ProductDetails {...product} />}
      <div className="rounded-lg shadow-lg p-2 my-5">
        {userId && (
          <ReviewForm {...{ initialValues, onFormSubmit, validationSchema }} />
        )}
        <ProductReviews productId={productId} />
      </div>
    </div>
  );
}
export const getStaticPaths = async () => {
  const res = await fetchProductsForPaths();
  const products = JSON.parse(res);
  const paths = [];
  products.forEach((p) => paths.push({ params: { productId: p?._id } }));
  return {
    paths,
    fallback: true,
  };
};
export const getStaticProps = async ({ params }) => {
  const productId = params.productId;
  const res = await fetchProductStatic(productId);
  const product = JSON.parse(res);
  return {
    props: { product },
    revalidate: 10,
  };
};

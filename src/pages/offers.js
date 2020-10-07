import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import DivideHeading from "../components/DivideHeading";
import ProductsLoader from "../components/ProductsLoader";
import Head from "next/head";
export default function offers() {
  const { productsState } = useProducts();
  const featured = productsState?.filter((p) => p.featured);

  return (
    <>
      <Head>
        <title>Offers|MriCodecomm</title>
      </Head>
      <DivideHeading title="Ofers" />
      <div className="mx-auto grid p-1 sm:p-3 sm:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {productsState?.length > 0 ? (
          featured.map((p) => (
            <React.Fragment key={p._id}>
              <ProductCard {...p} />
            </React.Fragment>
          ))
        ) : productsState?.length === 0 ? (
          <div className="text-lg font-semibold text-center">
            No Featured Products
          </div>
        ) : (
          <ProductsLoader />
        )}
      </div>
    </>
  );
}

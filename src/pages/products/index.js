import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";
import DivideHeading from "../../components/DivideHeading";
export default function index() {
  const { productsState } = useProducts();

  return (
    <>
      <DivideHeading title="All Products" />
      <div className="mx-auto grid p-1 sm:p-3 sm:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {productsState?.map((p) => (
          <ProductCard {...p} key={p._id} />
        ))}
      </div>
    </>
  );
}

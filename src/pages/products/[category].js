import useProducts from "../../hooks/useProducts";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";
import DivideHeading from "../../components/DivideHeading";
export default function index() {
  const router = useRouter();
  const { category } = router.query;
  const { productsState } = useProducts();
  const productsOfCategory = productsState?.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
  return (
    <>
      <DivideHeading title={category} />
      <div className="mx-auto grid p-1 sm:p-3 sm:w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {productsOfCategory?.length > 0 &&
          productsOfCategory.map((p) => (
            <React.Fragment key={p._id}>
              <ProductCard {...p} />
            </React.Fragment>
          ))}
      </div>
    </>
  );
}

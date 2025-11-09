 
import ProductCard from "./ProductCard";
import { ProductCardType } from "@/types/ProductsTypes";

export default function ProductsSection({
  productsArray,
  searchString,
}: {
  productsArray: ProductCardType[];
  searchString: string;
}) {
  return (
    <div className="w-full ">
      <h2 className="text-2xl my-1 mt-6">Shop</h2>
      {searchString ? (
        <p className="mt-2 text-sm text-(--subtext)  ">
          You searched for "{searchString}"{" "}
        </p>
      ) : (
        <></>
      )}
      {productsArray.length === 0 ? (
        <div className="flex justify-center items-center min-h-80">
          <p className="text-sm text-(--subtext) self-center ">
            Sorry, no products
          </p>
        </div>
      ) : (
        <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
          {productsArray.map((each: ProductCardType) => {
            return <ProductCard data={each} key={each.id} />;
          })}
        </div>
      )}
    </div>
  );
}

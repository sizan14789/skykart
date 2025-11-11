import Link from "next/link";
import FIlterBox from "./FilterBox";
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
      <div className="my-1 mt-6 flex justify-between items-center">
        <p className="text-sm text-(--subtext) flex items-center gap-1">
          <Link href="/" >Home</Link> / <Link href="/shop" >Shop</Link>
        </p>
        <FIlterBox search={searchString} />
      </div>
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
        <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {productsArray.map((each: ProductCardType) => {
            return <ProductCard data={each} key={each.id} />;
          })}
        </div>
      )}
    </div>
  );
}

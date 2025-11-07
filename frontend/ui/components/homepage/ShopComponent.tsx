import ProductCard from "@/app/shop/ProductCard";
import { ProductCardType } from "@/types/ProductsTypes";
import Link from "next/link";

// todo add limit
const getProducts = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/products`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default async function ShopComponent() {
  const products = await getProducts();

  if (products === null)
    return (
      <div className="flex flex-col w-full">
        <h2 className="text-2xl mb-4">Products</h2>
        <h2 className="text-(--subtext) text-sm self-center">Error Loading Products</h2>
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      <h2 className="text-2xl">Products</h2>
      <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
        {products.map((each: ProductCardType) => {
          return <ProductCard data={each} key={each.id} />;
        })}
      </div>
      <Link href="/shop" className="button-primary h-12 w-32 flex justify-center items-center self-center">
        See More
      </Link>
    </div>
  );
}

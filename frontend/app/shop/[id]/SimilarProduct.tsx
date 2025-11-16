import { ProductCardType, soloProductType } from "@/types/ProductsTypes";
import ProductCard from "../ProductCard"; 

const getSimilarProducts = async (category: string)=>{
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/products?category=${category}&limit=10`)
    if(res.status===200){
      const data = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function SimilarProduct({ data }: { data: soloProductType }) {
  const similarProduct = await getSimilarProducts(data.category); 

  if(!similarProduct) return <></>

  return (
    <div className="w-full ">
      <div className="flex w-full items-center mt-10 md:mt-20 mb-4 gap-2">
        <p className="border-b w-full border-b-(--border-button) "></p>
        <h2 className="text-xl font-semibold">Similar</h2>
        <p className="border-b w-full border-b-(--border-button) "></p>
      </div>
      {similarProduct.length === 0 ? (
        <div className="flex justify-center items-center min-h-80">
          <p className="text-sm text-(--subtext) self-center ">
            Sorry, no products
          </p>
        </div>
      ) : (
        <div className="w-full py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {similarProduct.map((each: ProductCardType) => {
            return <ProductCard data={each} key={each.id} />;
          })}
        </div>
      )}
    </div>
  );
}

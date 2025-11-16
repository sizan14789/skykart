import { redirect } from "next/navigation";
import SingleProduct from "./SingleProduct";
import { soloProductType } from "@/types/ProductsTypes";
import SimilarProduct from "./SimilarProduct";

const getProductData = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`
    );

    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
  redirect('/')
};

export default async function Product({ params }: { params: { id: string } }) {
  const id: string = (await params)?.id; 
  const productData: soloProductType = await getProductData(id);

  return (
    <div className="shell mb-20 grow flex mt-20">
      <div className="core grow flex flex-col">
        <SingleProduct data={productData} />
        <SimilarProduct data={productData} />
      </div>
    </div>
  );
}

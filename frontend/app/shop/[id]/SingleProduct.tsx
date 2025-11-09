import { soloProductType } from "@/types/ProductsTypes";
import Image from "next/image";
import CartAndBuy from "./CartAndBuy";

export default function SingleProduct({ data }: { data: soloProductType }) {
  const {
    id,
    product_name,
    product_image,
    description,
    rating,
    offer_price,
    price,
    category,
    brand,
  } = data;

  return (
    <div className="w-full flex flex-col gap-8 md:flex-row">
      <figure className="flex-1 flex justify-center px-10 items-start">
        <Image
          src={product_image}
          height={800}
          width={800}
          alt={product_name + " image"}
          className="rounded-2xl overflow-hidden object-cover"
        />
      </figure>
      <div className="flex flex-col gap-1 flex-1">
        <h2 className="text-4xl">{product_name}</h2>
        <p className="dimmed-text ">{description}</p>
        <p className="dimmed-text my-2">Rating: {rating}/5</p>

        <div className="flex gap-4 items-center mb-2">
          <p className="text-2xl">
            <span className="text-(--primary)">$</span>
            {offer_price}
          </p>
          <p className="line-through">${price}</p>
        </div>
        <p className="dimmed-text">Brand: {brand}</p>
        <p className="dimmed-text mb-4">Category: {category}</p>

        <CartAndBuy id={id} />
      </div>
    </div>
  );
}

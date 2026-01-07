import { soloProductType } from "@/types/ProductsTypes";
import Image from "next/image";
import CartAndBuy from "./CartAndBuy";
import { FolderStructure } from "@/ui/(buyer)/components/FolderStructure";

export default function SingleProduct({ data }: { data: soloProductType }) {
  const {
    id,
    product_name,
    product_image,
    description,
    rating,
    offer_price,
    price,
    product_stock,
    category,
    brand,
  } = data;

  return (
    <div className="w-full flex flex-col gap-8 md:flex-row">
      <figure className="flex-1 flex justify-center px-10 items-start">
        <Image
          src={product_image}
          height={400}
          width={400}
          alt={product_name + " image"}
          className="rounded-2xl overflow-hidden object-cover  text-[.6rem]"
        />
      </figure>
      <div className="flex flex-col gap-1 flex-1">
        <span>
          <FolderStructure
            list={[
              { text: "Shop", url: "shop" },
              {
                text:
                  product_name.length > 20
                    ? product_name.slice(0, 20) + "..."
                    : product_name,
                url: id.toString(),
              },
            ]}
            text_size="text-xs"
            margin="mb-2"
          />
        </span>
        <h2 className="text-4xl">{product_name}</h2>
        <p className="dimmed-text ">{description}</p>
        <p className="dimmed-text my-2">Rating: {rating}/5</p>

        <div className="flex gap-2 items-center mb-2">
          <p className="text-2xl">
            <span className="text-(--primary)">$</span>
            {offer_price}
          </p>
          <p className="line-through">${price}</p>
        </div>
        <p className="dimmed-text">Brand: {brand}</p>
        <p className="dimmed-text mb-4">Category: {category}</p>

        <p className="dimmed-text">Stock: {product_stock}</p>
        <CartAndBuy id={id} stockAvailable={product_stock} />
      </div>
    </div>
  );
}

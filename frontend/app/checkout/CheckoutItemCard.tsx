import Image from "next/image";

type ParamsType = {
  data: CartItemType;
};

const CheckoutItemCard = ({ data }: ParamsType) => {
  const {
    id,
    product_name,
    offer_price,
    product_image,
    seller_name,
    quantity,
  } = data;

  return (
    <div className="flex justify-between py-4 border-b-(--border) border-b bg-(--bg) hover:brightness-95 duration-200">
      <div className="flex gap-2 flex-col pl-2">
        <div>
          <Image
            height={100}
            width={100}
            alt={product_name + " image in cart"}
            src={product_image}
            className="object-cover rounded-lg max-w-20 mb-2"
          />
          <h2 className="text-sm">{product_name}</h2>
        </div>

        <h2 className="text-sm text-(--subtext)">{seller_name}</h2>
      </div>

      <div className="text-sm flex flex-col lg:flex-row justify-center lg:justify-start items-center ">
        <p className="self-center justify-self-center">
          ${offer_price}x{quantity}=
          <span className="font-semibold">${offer_price * quantity}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutItemCard;

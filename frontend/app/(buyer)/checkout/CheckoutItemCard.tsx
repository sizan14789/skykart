import useCartStore from "@/context/CartStore";
import { updateCart } from "@/lib/cartLib";
import Image from "next/image";
import toast from "react-hot-toast";

type ParamsType = {
  data: CartItemType;
  handleQuantityChange: (id: number, amount: number) => void;
  // handleDeleteFromOrderDetails: (id: number) => void;
};

const CheckoutItemCard = ({
  data,
  handleQuantityChange,
  // handleDeleteFromOrderDetails,
}: ParamsType) => {
  const { cart, setCart } = useCartStore();
  const { id, product_name, offer_price, product_image, quantity } = data;

  //increment or decrement
  const changeQuantity = async (amount: number) => {
    let changedAnything = false;
    const updatedCart = { ...cart };

    if (updatedCart[id.toString()]) {
      if (amount === 1) {
        updatedCart[id.toString()] += 1;
        changedAnything = true;
      } else if (amount === -1 && updatedCart[id.toString()] > 1) {
        updatedCart[id.toString()] -= 1;
        changedAnything = true;
      }
    } else {
      updatedCart[id.toString()] = 1;
    }
    setCart(updatedCart);

    if (changedAnything) {
      handleQuantityChange(id, amount);
      try {
        const res = await updateCart(updatedCart);
        if (!(res === 201)) {
          toast.error("Quantity was not changed. Error unknown");
        }
      } catch (error) {
        console.error(error);
        toast.error("Quantity was not changed. Error unknown");
      }
    }
  };

  return (
    <div className="grid grid-cols-3 place-items-center py-4 border-b-(--border) border-b bg-(--bg) hover:brightness-95 duration-200">
      <div className="flex gap-2 flex-col pl-2 justify-center">
        <figure className="flex flex-col items-center">
          <Image
            height={100}
            width={100}
            alt={product_name + " image in cart"}
            src={product_image}
            className="object-cover rounded-lg max-w-20 mb-2  text-[.6rem]"
          />
          <h2 className="text-sm">{product_name}</h2>
        </figure>
      </div>

      <div className="text-sm gap-2 justify-center items-center flex">
        <button
          className="cursor-pointer  text-2xl"
          onClick={() => changeQuantity(-1)}
        >
          {" "}
          -{" "}
        </button>
        <p>{quantity}</p>
        <button
          className="cursor-pointer  text-2xl text-(--primary) "
          onClick={() => changeQuantity(1)}
        >
          +
        </button>
      </div>

      <div className="text-xs flex flex-col lg:flex-row justify-center lg:justify-start items-center ">
        <p className="self-center justify-self-center">
          ${offer_price}x{quantity}=
          <span className="font-semibold">${offer_price * quantity}</span>
        </p>
      </div>
    </div>
  );
};

export default CheckoutItemCard;

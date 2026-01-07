import useCartStore from "@/context/CartStore";
import { updateCart } from "@/lib/cartLib";
import { TrashIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

type ParamsType = {
  data: CartItemType;
  handleQuantityChange: (id: number, amount: number) => void;
  handleDeleteFromCartDetails: (id: number) => void;
};

const ItemCard = ({
  data,
  handleQuantityChange,
  handleDeleteFromCartDetails,
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

  // delete item from cart
  const deleteItem = async () => {
    // updating global cart
    const updatedCart = { ...cart };
    delete updatedCart[id.toString()];

    setCart(updatedCart);

    // updating state and local details
    handleDeleteFromCartDetails(id);

    try {
      const res = await updateCart(updatedCart);
      if (!(res === 201)) {
        console.log("error at item card");
      } else {
        toast.success("Item deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 py-4 border-b-(--border) border-b bg-(--bg) hover:brightness-95 duration-200 ">
      <Link
        href={"/shop/" + id}
        className=" flex lg:col-span-2 items-center lg:items-start gap-4 flex-col lg:flex-row px-2  cursor-pointer"
      >
        <Image
          height={100}
          width={100}
          alt={product_name + " image in cart"}
          src={product_image}
          className="object-cover rounded-lg max-w-20 lg:max-w-28  text-[.6rem]"
        />
        <div className="flex gap-1 md:gap-2 flex-col  w-full">
          <h2 className=" text-center lg:text-start ">{product_name}</h2>
        </div>
      </Link>

      <p className="text-sm items-center hidden lg:flex">${offer_price}</p>

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

      <div className="text-sm flex flex-col lg:flex-row justify-center lg:justify-start items-center ">
        <p className="self-center justify-self-center mt-10 lg:mt-0">
          ${offer_price}x{quantity}=
          <span className="font-semibold">${offer_price * quantity}</span>
        </p>
        <button
          className="text-(--highlight) button-rounded h-10 w-10 lg:ml-auto"
          onClick={deleteItem}
        >
          <TrashIcon size={24} weight="light" />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;

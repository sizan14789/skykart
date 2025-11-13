"use client";

import useCartStore from "@/context/CartStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import districts from '@/assets/districts.json'

export default function CheckoutForm() {
  const router = useRouter();
  const { setCart } = useCartStore();

  const handleCheckoutFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    const full_name = formdata.get("full_name");
    const phone = formdata.get("phone"); 
    const city = formdata.get("city");
    const upzilla = formdata.get("upzilla");
    const street = formdata.get("street");
    const village = formdata.get("village");
    const message = formdata.get("message");

    const body = {
      full_name,
      phone, 
      city,
      upzilla,
      street,
      village,
      message,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
        {
          method: "post",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (res.status === 201) {
        toast.success("Order placed");
        setCart({});
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col ">
      <form className="flex flex-col mb-4" onSubmit={handleCheckoutFormSubmit}>
        <h2 className="text-xl mb-2">Contact</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="input max-w-140 mb-6 h-14  "
          name="full_name"
          required
        />
        <input
          type="text"
          placeholder="Phone number"
          className="input max-w-140 mb-8 h-14  "
          name="phone"
          required
        />
        <h2 className="text-xl mb-2">Address</h2>

        <label htmlFor="City" className="flex flex-col gap-2 mb-6">
          <p className="text-xs text-(--subtext) font-semibold">City</p>
          <select
            className="appearance-none input max-w-140 flex text-center"
            name="city"
            required
          >
            {districts.map(({ id, name, value }) => {
              return (
                <option value={value} key={id}>
                  {name}
                </option>
              );
            })}
          </select>
        </label>

        <input
          type="text"
          placeholder="Upzilla"
          className="input max-w-140 mb-6 h-14  "
          name="upzilla"
          required
        />

        <input
          type="text"
          placeholder="Village"
          className="input max-w-140 mb-6 h-14  "
          name="village"
          required
        />

        <input
          type="text"
          placeholder="Street Name"
          className="input max-w-140 mb-6 h-14  "
          name="street"
          required
        />

        <textarea
          placeholder="Message (optional)"
          className="input max-w-140 h-40  mb-8"
          name="message"
        />

        <button
          type="submit"
          className="button-primary h-14 w-40 flex justify-center items-center"
        >
          Checkout
        </button>
      </form>
    </div>
  );
}

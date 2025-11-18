"use client";

import useCartStore from "@/context/CartStore";
import { useUserStore } from "@/context/UserStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutAndUpdate() {
  const router = useRouter();
  const { setCart } = useCartStore()
  const { setUser } = useUserStore()

  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/auth/logout`);
      if (res.status === 200) {
        toast.success("Logged out");
        setCart({});
        setUser({})
        router.refresh();
        setTimeout(() => router.push("/"), 100);
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal Error");
    }
  };

  return (
    <div className="flex gap-4">
      <button className="button-primary h-12 w-32 flex justify-center items-center">
        Update Info
      </button>
      <button
        className="button-secondary h-12 w-32 flex justify-center items-center"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

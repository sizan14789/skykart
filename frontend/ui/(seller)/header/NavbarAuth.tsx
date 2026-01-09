import { useUserStore } from "@/context/UserStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NavbarAuth() {
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/auth/logout`);
      if (res.status === 200) {
        toast.success("Logged out");
        setUser({});
        router.push("/");
        router.refresh();
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
    <>
      <div className="flex gap-2 md:gap-4 items-center relative">
        <button
          className="cursor-pointer button-secondary h-8 w-20 md:h-10 md:w-32 justify-center items-center"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

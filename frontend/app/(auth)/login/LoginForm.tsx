"use client";

import { useUserStore } from "@/context/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const username = formdata.get("username");
    const password = formdata.get("password");

    const loginInfo = {
      username,
      password,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(loginInfo),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        toast.success("Logged in");
        setUser(data);
        router.push('/')
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Internal error");
    }
  };

  return (
    <form
      className="flex flex-col gap-6 h-full justify-center mx-auto"
      onSubmit={handleLogin}
    >
      <h2 className="text-2xl md:text-4xl  ">Login</h2>

      <input
        type="text"
        name="username"
        placeholder="username"
        required
        className="input h-16! w-92 md:w-120"
      />

      <input
        type="password"
        name="password"
        placeholder="password"
        required
        className="input h-16! w-92 md:w-120"
      />

      <button className="button-primary w-40 h-12 flex justify-center items-center ">
        Log in
      </button>

      <p className="text-sm text-(--subtext) ">
        New to SkyKart?{" "}
        <Link href="/signup" className="text-(--highlight) ">
          {" "}
          Sign up{" "}
        </Link>
      </p>
    </form>
  );
}

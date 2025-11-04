"use client";

import { useUserStore } from "@/context/UserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupForm() {
  const { setUser } = useUserStore();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData(e.currentTarget);
    const username = formdata.get("username");
    const email = formdata.get("email");
    const password = formdata.get("password");

    const signupInfo = {
      username,
      email,
      password,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(signupInfo),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.status === 201) {
        toast.success("Signed up");
        setUser(data);
        router.push("/");
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
      onSubmit={handleSignup}
    >
      <h2 className="text-2xl md:text-4xl ">Sign up</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        className="input h-16! w-92 md:w-120"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="input h-16! w-92 md:w-120"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="input h-16! w-92 md:w-120"
      />

      <button className="button-primary w-40 h-12 flex justify-center items-center ">
        Log in
      </button>

      <p className="text-sm text-(--subtext) ">
        SkyKart user?{" "}
        <Link href="/login" className="text-(--highlight) ">
          Log in{" "}
        </Link>
        here
      </p>
    </form>
  );
}

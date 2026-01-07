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
        `/api/auth/signup`,
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
        router.push("/")
        router.refresh(); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal error");
    }
  };

  return (
    <form
      className="flex flex-col h-full justify-center mx-auto"
      onSubmit={handleSignup}
    >
      <h2 className="text-2xl md:text-4xl mb-4 ">Sign up</h2>
      
      <label
        htmlFor="username"
        className="text-(--subtext) text-xs font-bold mb-2"
      >
        Username
      </label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        className="input h-16! w-92 md:w-120 mb-6 "
      />
      
      <label
        htmlFor="username"
        className="text-(--subtext) text-xs font-bold mb-2"
      >
        Email
      </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="input h-16! w-92 md:w-120 mb-6 "
      />

      <label
        htmlFor="username"
        className="text-(--subtext) text-xs font-bold mb-2"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="input h-16! w-92 md:w-120 mb-6 "
      />

      <button className="button-primary w-40 h-12 flex justify-center items-center ">
        Sign up
      </button>

      <p className="text-xs text-(--subtext) mt-2 ">
        ShopUp user?{" "}
        <Link href="/login" className="text-(--highlight) ">
          Log in{" "}
        </Link>
        here
      </p>
    </form>
  );
}

"use client";

import { useUserStore } from "@/context/UserStore";
import { useEffect } from "react";

export default function UserSetter() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/session`,
          {
            method: "get",
            credentials: "include",
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return <></>;
}

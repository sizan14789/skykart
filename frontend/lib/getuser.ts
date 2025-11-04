import { cookies } from "next/headers";

export const getUser = async () => {
  const cookiesStore = await cookies();
  const sessionid = cookiesStore.get("sessionid")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/session`,
      {
        method: "get",
        headers: {
          cookie: `sessionid=${sessionid}`,
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      return data;
    } 
    return {}
  } catch (error) {
    return {};
  }
};

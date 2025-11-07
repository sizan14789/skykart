import { cookies } from "next/headers";

export const getTheme = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("theme")?.value || "light";
};

export const getSessionid = async ()=>{
  const cookieStore = await cookies();
  return cookieStore.get("sessionid")?.value;
}

export const getUser = async () => {
  const sessionid = await getSessionid();
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/auth/session`, {
      method: "get",
      headers: {
        cookie: `sessionid=${sessionid}`,
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    return null;
  }
};

// export const getCart = async () => {
//   const cookieStore = await cookies();
//   const sessionid = cookieStore.get("sessionid")?.value;

//   if (sessionid) {
//     try {
//       const res = await fetch(`${process.env.BACKEND_URL}/api/cart`, {
//         method: "get",
//         headers: {
//           cookie: `sessionid=${sessionid}`,
//         },
//       });
//       if (res.status === 200) {
//         const data = await res.json();
//         return data;
//       }
//       return null;
//     } catch (error) {
//       return null;
//     }
//   }
// };

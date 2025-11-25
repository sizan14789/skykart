export async function updateCart(updatedCart: Record<string, number>) {
  const res = await fetch(`/api/cart`, {
    method: "POST",
    body: JSON.stringify(updatedCart),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return Number(res.status);
}

interface ParamsTypeForAddToCart {
  amount?: number;
  id: number;
  cart: Record<string, number>;
  setCart: (state: Record<string, number>) => void;
}

interface ParamsTypeForBuyNow extends ParamsTypeForAddToCart {
  router: { push: (address: string) => void };
}

// handle add to cart
export const handleAddToCart = async (params: ParamsTypeForAddToCart) => {
  const { amount, id, cart, setCart } = params;
  const updatedCart = { ...cart };

  if (updatedCart[id.toString()]) updatedCart[id.toString()] += amount || 1;
  else updatedCart[id.toString()] = amount || 1;

  setCart(updatedCart);

  try {
    const res = await updateCart(updatedCart);
    if (!(res === 201)) {
      console.log("error in sync, check cartLib");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
};

// handle buy now
export const handleBuyNow = async (params: ParamsTypeForBuyNow) => {
  const { amount, id, cart, setCart, router } = params;
  const res = await handleAddToCart({ amount, id, cart, setCart });
  if (res) router.push("/cart");
  return res;
};

// handle add to wishlist
export const handleAddToWishlist = async (id: number) => {
  try {
    const res = await fetch(`/api/wishlist/${id}`, {
      method: "post",
      credentials: "include",
    });
    return res;
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

// handle remove from wishlist
export const handleRemoveFromWishlist = async (id: number) => {
  try {
    const res = await fetch(`/api/wishlist/${id}`, {
      method: "delete",
      credentials: "include",
    });
    return res;
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
};

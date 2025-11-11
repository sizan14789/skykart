export const getProductsByCategory = async (category: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/products?category=${category}`
    );
    if (res.status === 200) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

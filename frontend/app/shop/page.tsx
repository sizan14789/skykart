import ProductsSection from "./ProductsSection";

const getShopProducts = async (queryParams: Record<string, string | string[] | undefined>) => {
  const { search, limit } = queryParams;

  let query = "";
  query += "?search=" + (search || "");
  query += "&limit=" + (limit || "");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products${query}`
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

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParams = await searchParams;
  const productsArray = await getShopProducts(queryParams);

  let searchString = ""
  if(typeof(queryParams.search)==="string")
    searchString = queryParams.search;

  return (
    <div className="shell mb-20 grow flex">
      <div className="core grow flex flex-col">
        <ProductsSection productsArray={productsArray} searchString={searchString} />
      </div>
    </div>
  );
}

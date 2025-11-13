import Error from "@/ui/components/Error";
import ProductsSection from "./ProductsSection";

const getShopProducts = async (
  queryParams: Record<string, string | string[] | undefined>
) => {
  const { search, limit, category, min_price, max_price, order_by, order } =
    queryParams;

  let query = "";
  query += "?search=" + (search || "");
  query += limit ? "&limit=" + limit : "";
  query += category ? "&category=" + category : "";
  query += min_price ? "&min_price=" + min_price : "";
  query += max_price ? "&max_price=" + max_price : "";
  query += order_by ? "&order_by=" + order_by : "";
  query += order ? "&order=" + order : "";

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
    console.error(error);
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
  console.log(productsArray)

  let searchString = "";
  if (typeof queryParams.search === "string") searchString = queryParams.search;

  return (
    <div className="shell mb-20 grow flex">
      <div className="core grow flex flex-col">
        {productsArray ? (
          <ProductsSection
            productsArray={productsArray}
            searchString={searchString}
          />
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

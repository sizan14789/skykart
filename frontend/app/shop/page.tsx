
import ProductsSection from "./ProductsSection";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = (await searchParams).search;

  return (
    <div className="shell mb-20 grow flex">
      <div className="core grow flex flex-col">
        <ProductsSection searchString={search} />
      </div>
    </div>
  );
}

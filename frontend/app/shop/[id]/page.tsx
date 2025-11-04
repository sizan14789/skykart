const getProductData = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default async function Shop({ params }: { params: { id: string } }) {
  const id: string = (await params)?.id;
  console.log(id);

  const productData = await getProductData(id);

  return (
    <div className="shell mb-20 grow flex">
      <div className="core grow flex flex-col">
        
      </div>
    </div>
  );
}

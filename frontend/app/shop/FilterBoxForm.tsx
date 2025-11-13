export default function FilterBoxForm({
  handleFilter,
}: {
  handleFilter: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={handleFilter}
      className="h-full flex flex-col overflow-hidden w-full"
    >
      <label htmlFor="price" className="dimmed-text mb-2 px-4 ">
        Price
      </label>
      <div className="flex justify-center items-center gap-4 px-8">
        <input
          type="number"
          name="min_price"
          placeholder="Min"
          className="input h-10 max-w-30"
        />
        <p className="text-xs">to</p>
        <input
          type="number"
          name="max_price"
          placeholder="Max"
          className="input h-10 max-w-30"
        />
      </div>

      <label htmlFor="category" className="dimmed-text mb-2 mt-6 px-4 ">
        Categories
      </label>
      <div className="flex flex-col px-8">
        <label htmlFor="smartphoneCheck">
          <input type="checkbox" name="smartphone" id="smartphoneCheck" />{" "}
          Smartphone
        </label>
        <label htmlFor="laptopCheck">
          <input type="checkbox" name="laptop" id="laptopCheck" /> Laptop
        </label>
        <label htmlFor="accessoriesCheck">
          <input type="checkbox" name="accessories" id="accessoriesCheck" />{" "}
          Accessories
        </label>
      </div>

      <label htmlFor="category" className="dimmed-text mb-2 mt-6 px-4 ">
        Sort by
      </label>

      <select
        name="order"
        id="category"
        className="appearance-none ml-8 text-sm border border-(--border) h-10 w-40 rounded-sm px-4"
      >
        <option value="created_at">Default</option>
        <option value="offer_price;asc">Price: Low to high</option>
        <option value="offer_price;desc">Price: High to Low</option>
      </select>

      <button className="w-full rounded-none! mt-auto button-primary h-20 flex justify-center items-center text-xl!">
        Filter
      </button>
    </form>
  );
}

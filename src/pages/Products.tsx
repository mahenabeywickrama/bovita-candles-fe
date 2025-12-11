import { useEffect, useState } from "react";
import { getProducts } from "../services/product";
import type { ProductType } from "../services/product";

const CATEGORIES = ["ALL", "JAR", "NORMAL", "LUXURY"] as const;

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    loadProducts();
  }, [category, minPrice, maxPrice, sortBy, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts(1, 200);
      let data: ProductType[] = res.data;

      // SEARCH FILTER
      if (search.trim() !== "") {
        data = data.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      // CATEGORY FILTER
      if (category !== "ALL") {
        data = data.filter((p) => p.category === category);
      }

      // PRICE FILTER
      if (minPrice) data = data.filter((p) => p.price >= Number(minPrice));
      if (maxPrice) data = data.filter((p) => p.price <= Number(maxPrice));

      // SORTING
      if (sortBy === "price_low") data.sort((a, b) => a.price - b.price);
      if (sortBy === "price_high") data.sort((a, b) => b.price - a.price);
      if (sortBy === "name_asc")
        data.sort((a, b) => a.title.localeCompare(b.title));
      if (sortBy === "name_desc")
        data.sort((a, b) => b.title.localeCompare(a.title));

      setProducts(data);
      setCurrentPage(1); // reset page

    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {/* ---------------- FILTER BAR ---------------- */}
      <div className="flex flex-wrap gap-4 items-center mb-8">

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CATEGORY FILTER */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full border 
                ${category === cat ? "bg-black text-white" : "bg-white"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRICE FILTER */}
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min Price"
            className="border px-3 py-1 rounded w-28"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="border px-3 py-1 rounded w-28"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* SORT BY */}
        <select
          className="border px-3 py-1 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="name_asc">Name: A → Z</option>
          <option value="name_desc">Name: Z → A</option>
        </select>
      </div>

      {/* ---------------- PRODUCT GRID ---------------- */}
      {loading ? (
        <p>Loading...</p>
      ) : currentItems.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentItems.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg overflow-hidden hover:scale-[1.02] transition"
            >
              <img
                src={product.imageUrls[0]}
                className="h-48 w-full object-cover"
                alt={product.title}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-600 text-sm">{product.category}</p>
                <p className="font-bold mt-2">Rs. {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- PAGINATION ---------------- */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2">

          {/* PREVIOUS */}
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* PAGE NUMBERS */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            className="px-4 py-2 border rounded disabled:opacity-40"
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { getProducts } from "../services/product";
import type { ProductType } from "../services/product";
import { useCart } from "../context/cartContext"


const CATEGORIES = ["ALL", "JAR", "NORMAL", "LUXURY"] as const;

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 MODAL STATE
  const [selectedProduct, setSelectedProduct] =
    useState<ProductType | null>(null);

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
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(0);
      setQuantity(1);
    }
  }, [selectedProduct]);

  const { addToCart } = useCart()

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
              className={`px-4 py-2 rounded-full border ${
                category === cat ? "bg-black text-white" : "bg-white"
              }`}
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
              onClick={() => setSelectedProduct(product)}
              className="bg-white shadow rounded-lg overflow-hidden hover:scale-[1.02] transition cursor-pointer"
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
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* ---------------- PRODUCT DETAILS MODAL ---------------- */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-4xl w-full mx-4 relative"
          >
            {/* CLOSE */}
            <button
              className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* ---------- LEFT : IMAGES ---------- */}
              <div>
                <img
                  src={selectedProduct.imageUrls[activeImage]}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                  alt={selectedProduct.title}
                />

                {/* THUMBNAILS */}
                <div className="flex gap-2">
                  {selectedProduct.imageUrls.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      onClick={() => setActiveImage(i)}
                      className={`h-20 w-20 object-cover rounded cursor-pointer border
                        ${
                          activeImage === i
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* ---------- RIGHT : DETAILS ---------- */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold">
                  {selectedProduct.title}
                </h2>

                {/* CATEGORY */}
                <span className="w-fit px-3 py-1 rounded-full bg-gray-200 text-sm">
                  {selectedProduct.category}
                </span>

                {/* PRICE */}
                <p className="text-2xl font-bold text-green-700">
                  Rs. {selectedProduct.price}
                </p>

                {/* STOCK */}
                <p
                  className={`font-semibold ${
                    selectedProduct.stock > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedProduct.stock > 0
                    ? `In Stock (${selectedProduct.stock})`
                    : "Out of Stock"}
                </p>

                {/* DESCRIPTION */}
                <p className="text-gray-700">
                  {selectedProduct.description}
                </p>

                {/* EXTRA INFO */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <p>
                    <strong>Size:</strong> {selectedProduct.size}
                  </p>
                  <p>
                    <strong>Fragrance:</strong>{" "}
                    {selectedProduct.fragrance}
                  </p>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3">
                  <span className="font-semibold">Qty:</span>
                  <button
                    className="px-3 py-1 border rounded"
                    disabled={quantity === 1}
                    onClick={() => setQuantity((q) => q - 1)}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="px-3 py-1 border rounded"
                    disabled={quantity === selectedProduct.stock}
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                {/* ACTION BUTTON */}
                <button
                  disabled={selectedProduct.stock === 0}
                  onClick={() => {
                    addToCart(selectedProduct, quantity)
                    setSelectedProduct(null)
                  }}
                  className="mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50"
                >
                  Add to Cart
                </button>

                {/* META */}
                <div className="text-xs text-gray-500 mt-2">
                  Product ID: {selectedProduct._id}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

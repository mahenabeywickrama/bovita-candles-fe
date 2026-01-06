import { useEffect, useState } from "react";
import { getProducts } from "../services/product";
import type { ProductType } from "../services/product";
import { useCart } from "../context/cartContext";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

const CATEGORIES = ["ALL", "JAR", "NORMAL", "LUXURY"] as const;

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 MODAL STATE
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Product modal state
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  // ====================== FETCH & FILTER ======================
  useEffect(() => {
    loadProducts();
  }, [category, minPrice, maxPrice, sortBy, search]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts(1, 200);
      let data: ProductType[] = res.data;

      if (search.trim() !== "") {
        data = data.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category !== "ALL") {
        data = data.filter((p) => p.category === category);
      }

      if (minPrice) data = data.filter((p) => p.price >= Number(minPrice));
      if (maxPrice) data = data.filter((p) => p.price <= Number(maxPrice));

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

  useEffect(() => {
    if (selectedProduct) {
      setActiveImage(0);
      setQuantity(1);
    }
  }, [selectedProduct]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // ====================== ANIMATIONS ======================
  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  // ====================== RENDER ======================
  return (
    <div className="overflow-x-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="relative isolate flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100 py-24 mb-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 text-center tracking-tight"
        >
          Explore Our Collection
          <br />
          <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
            Handcrafted Candles
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-gray-600 max-w-2xl text-center text-lg"
        >
          Discover the perfect scent for every mood, ritual, and occasion.
        </motion.p>
      </section>

      <div className="container mx-auto px-6 py-10">

        {/* ================= FILTER BAR ================= */}
        <div className="flex flex-wrap gap-4 items-center mb-12">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded-full px-4 py-2 w-full sm:w-64 bg-white/70 backdrop-blur-sm text-gray-700 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-rose-300 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold shadow ${
                  category === cat
                    ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xl"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-rose-50 transition"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price */}
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              className="border rounded-full px-3 py-1 w-24 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-rose-300"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="border rounded-full px-3 py-1 w-24 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-rose-300"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Sort */}
          <select
            className="border rounded-full px-3 py-1 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-rose-300"
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

        {/* ================= PRODUCT GRID ================= */}
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : currentItems.length === 0 ? (
          <p className="text-gray-600 text-center">No products found.</p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {currentItems.map((product, _i) => (
              <motion.div
                key={product._id}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden cursor-pointer border border-white/50 relative transition-all"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative h-60">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.title}
                    className="h-full w-full object-cover rounded-t-3xl"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-4"
                  >
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full shadow-lg hover:scale-105 transition">
                      Quick View
                    </button>
                  </motion.div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.category}</p>
                  <p className="font-bold text-gray-900 mt-2">Rs. {product.price}</p>
                  <div className="mt-3 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex mt-3 items-center gap-1 text-rose-700 text-xs px-2 py-1 rounded-full bg-rose-100/70">
                    <Sparkles className="w-3 h-3" /> Bestseller
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
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
                  currentPage === i + 1 ? "bg-black text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* ================= PRODUCT MODAL ================= */}
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/90 backdrop-blur-lg rounded-3xl max-w-4xl w-full mx-4 relative p-6 shadow-2xl"
            >
              {/* CLOSE */}
              <button
                className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-900"
                onClick={() => setSelectedProduct(null)}
              >
                ✕
              </button>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Images */}
                <div>
                  <img
                    src={selectedProduct?.imageUrls[activeImage]}
                    alt={selectedProduct?.title}
                    className="w-full h-96 object-cover rounded-2xl mb-4"
                  />
                  <div className="flex gap-2">
                    {selectedProduct?.imageUrls.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() => setActiveImage(i)}
                        className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                          activeImage === i ? "border-rose-600" : "border-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold">{selectedProduct?.title}</h2>
                  <span className="w-fit px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-sm font-semibold">
                    {selectedProduct?.category}
                  </span>
                  <p className="text-2xl font-bold text-green-700">
                    Rs. {selectedProduct?.price}
                  </p>
                  <p className={`font-semibold ${selectedProduct?.stock! > 0 ? "text-green-600" : "text-red-600"}`}>
                    {selectedProduct?.stock! > 0 ? `In Stock (${selectedProduct?.stock})` : "Out of Stock"}
                  </p>
                  <p className="text-gray-700">{selectedProduct?.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <p><strong>Size:</strong> {selectedProduct?.size}</p>
                    <p><strong>Fragrance:</strong> {selectedProduct?.fragrance}</p>
                  </div>

                  {/* Quantity */}
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
                      disabled={quantity === selectedProduct?.stock}
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    disabled={selectedProduct?.stock === 0}
                    onClick={() => { addToCart(selectedProduct!, quantity); setSelectedProduct(null); }}
                    className="mt-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

        <div className="relative z-10 max-w-4xl text-center px-6">
          <p className="uppercase tracking-widest text-sm text-rose-600 mb-4">
            Handcrafted • Eco-Friendly • Elegant
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Light a Candle.
            <br />
            <span className="text-rose-600">Set the Mood.</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            Bovita Candles are hand-poured with care using natural wax and
            premium fragrances to bring calm, warmth, and beauty into your space.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/products")}
              className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full text-lg shadow-lg transition"
            >
              Shop Candles
            </button>

            <button
              onClick={() => navigate("/about")}
              className="px-10 py-4 rounded-full text-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Our Story
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured Collection
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Our most loved candles — crafted to elevate your everyday moments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {/* Image */}
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform" />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Lavender Bliss
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Soft floral aroma for relaxation
                </p>

                <div className="flex justify-between items-center mt-5">
                  <span className="text-lg font-bold text-gray-900">
                    Rs. 2,500
                  </span>

                  <button
                    onClick={() => navigate("/products")}
                    className="text-rose-600 font-medium hover:underline"
                  >
                    View →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= BRAND VALUES ================= */}
      <section className="bg-rose-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Crafted With Intention
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl mb-5">🌿</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Natural Ingredients
              </h3>
              <p className="text-gray-600 mt-3">
                Made using eco-friendly wax and safe, high-quality fragrances.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-5">🕯️</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Hand-Poured
              </h3>
              <p className="text-gray-600 mt-3">
                Every candle is carefully crafted in small batches.
              </p>
            </div>

            <div>
              <div className="text-5xl mb-5">✨</div>
              <h3 className="text-xl font-semibold text-gray-900">
                Long-Lasting Aroma
              </h3>
              <p className="text-gray-600 mt-3">
                Designed to fill your space with warmth for hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            Find Your Signature Scent
          </h2>

          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            Whether it’s calm, romance, or focus — there’s a Bovita candle for you.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-rose-600 hover:bg-rose-700 px-12 py-4 rounded-full text-lg font-semibold shadow-lg transition"
          >
            Explore Collection
          </button>
        </div>
      </section>

    </div>
  )
}

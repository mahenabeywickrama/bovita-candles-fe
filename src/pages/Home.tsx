import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="space-y-20">

      {/* HERO */}
      <section className="bg-gradient-to-r from-amber-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Handcrafted Candles for
            <span className="text-rose-600"> Calm & Comfort</span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Discover eco-friendly, hand-poured candles made to elevate your space
            with warmth, peace, and long-lasting fragrance.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/products")}
              className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-full transition text-lg"
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/about")}
              className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-100 transition text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Featured Candles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="h-56 bg-gray-100" />

              <div className="p-5">
                <h3 className="font-semibold text-gray-800 text-lg">
                  Lavender Bliss
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Relaxing floral aroma
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-gray-800">
                    Rs. 2,500
                  </span>

                  <button
                    onClick={() => navigate("/products")}
                    className="text-rose-600 hover:underline"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BOVITA */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Bovita Candles?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-semibold text-lg">Eco-Friendly</h3>
              <p className="text-gray-600 mt-2">
                Made with natural wax and safe ingredients.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">🕯️</div>
              <h3 className="font-semibold text-lg">Hand-Poured</h3>
              <p className="text-gray-600 mt-2">
                Crafted in small batches with care.
              </p>
            </div>

            <div>
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-lg">Long-Lasting</h3>
              <p className="text-gray-600 mt-2">
                Premium fragrances that fill your space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-rose-600">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center text-white">
          <h2 className="text-3xl font-bold">
            Create Your Perfect Atmosphere
          </h2>
          <p className="mt-4 opacity-90">
            Find the candle that matches your mood.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-white text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Explore Candles
          </button>
        </div>
      </section>

    </div>
  )
}

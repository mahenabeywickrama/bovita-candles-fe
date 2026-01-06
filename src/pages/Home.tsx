import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

export default function Home() {
  const navigate = useNavigate()

  const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }
  const fadeUpDelay = (i: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: i * 0.2 } })

  const particlesInit = async (main: any) => {
    await loadFull(main)
  }

  return (
    <div className="space-y-32 overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100">
        {/* Particles */}
        <Particles
          id="hero-particles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            fpsLimit: 60,
            particles: {
              number: { value: 30 },
              color: { value: ["#fbbf24", "#f43f5e", "#fde68a"] },
              shape: { type: "circle" },
              opacity: { value: 0.3, random: true },
              size: { value: 4, random: { enable: true, minimumValue: 2 } },
              move: { enable: true, speed: 0.8, direction: "top", outModes: "out" },
            },
          }}
          className="absolute inset-0"
        />

        {/* Floating shapes */}
        <div className="absolute top-[-50px] left-[-50px] w-40 h-40 rounded-full bg-rose-200 opacity-30 animate-pulse-slow" />
        <div className="absolute bottom-[-50px] right-[-50px] w-60 h-60 rounded-full bg-amber-200 opacity-20 animate-pulse-slower" />

        <div className="relative min-h-[90vh] flex items-center justify-center px-6 z-10">
          <motion.div className="max-w-4xl text-center space-y-6" {...fadeUp}>
            <p className="uppercase tracking-[0.3em] text-xs text-rose-600 mb-2">
              Handcrafted Luxury Candles
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Light the Moment.<br />
              <span className="text-rose-600">Feel the Calm.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Thoughtfully hand-poured candles designed to elevate your space, mood, and rituals — one flame at a time.
            </p>

            <div className="mt-12 flex justify-center gap-5 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.07, boxShadow: "0 0 25px rgba(220,38,38,0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/products")}
                className="bg-rose-600 hover:bg-rose-700 text-white px-12 py-4 rounded-full text-lg shadow-xl transition"
              >
                Shop Collection
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/about")}
                className="px-12 py-4 rounded-full text-lg border border-gray-300 hover:bg-white transition"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="w-full px-6">
        <div className="text-center mb-16">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900">
            Shop by Mood
          </motion.h2>
          <motion.p {...fadeUp} className="text-gray-600 mt-4">
            Every candle tells a story — choose yours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: "Relax & Unwind", emoji: "🌿" },
            { title: "Romantic Evenings", emoji: "❤️" },
            { title: "Luxury Gifts", emoji: "🎁" },
          ].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06, rotate: 1, boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}
              onClick={() => navigate("/products")}
              className="cursor-pointer bg-white rounded-2xl shadow-md transition p-10 text-center"
            >
              <div className="text-6xl mb-6">{cat.emoji}</div>
              <h3 className="text-xl font-semibold">{cat.title}</h3>
              <p className="text-gray-500 mt-3">
                Discover scents crafted for this mood.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="w-full px-6">
        <div className="text-center mb-16">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900">
            Best Sellers
          </motion.h2>
          <motion.p {...fadeUp} className="text-gray-600 mt-4">
            Loved by customers across the island.
          </motion.p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4 -mx-6 px-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="min-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer"
              onClick={() => navigate("/products")}
            >
              <div className="h-72 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                {/* Optional small floating glow */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-rose-200 opacity-40 animate-pulse-slow"></div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">Lavender Serenity</h3>
                <p className="text-sm text-gray-500 mt-1">Calming floral aroma</p>
                <div className="flex justify-between items-center mt-5">
                  <span className="text-lg font-bold">Rs. 2,500</span>
                  <button className="text-rose-600 font-medium hover:underline">View →</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= SOCIAL PROOF ================= */}
      <section className="w-full bg-rose-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
            Loved by Our Customers
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              "Absolutely calming — my evenings feel different now.",
              "The perfect gift. Packaging and scent are top-tier.",
              "Burns evenly and lasts long. Worth every rupee.",
            ].map((review, i) => (
              <motion.div
                key={i}
                {...fadeUpDelay(i)}
                className="bg-white p-8 rounded-2xl shadow hover:scale-105 transition"
              >
                <p className="text-gray-600 italic">“{review}”</p>
                <p className="mt-5 font-semibold">★★★★★</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="w-full bg-gray-900 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 rounded-full bg-rose-600 opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 rounded-full bg-amber-400 opacity-20 animate-pulse-slower" />

        <div className="max-w-5xl mx-auto text-center text-white space-y-6 relative z-10">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold">
            Create Your Perfect Atmosphere
          </motion.h2>

          <motion.p {...fadeUp} className="text-gray-300 max-w-xl mx-auto">
            Whether it’s calm, warmth, or celebration — Bovita has a candle for it.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.07, boxShadow: "0 0 35px rgba(220,38,38,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/products")}
            className="mt-10 bg-rose-600 hover:bg-rose-700 px-14 py-4 rounded-full text-lg font-semibold transition"
          >
            Explore Candles
          </motion.button>
        </div>
      </section>
    </div>
  )
}

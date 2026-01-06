import { useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { Sparkles, Heart, Gift, Star } from "lucide-react"

export default function Home() {
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])

  const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const particlesInit = async (main: any) => {
    await loadFull(main)
  }

  const categories = [
    { 
      title: "Relax & Unwind", 
      icon: Sparkles, 
      desc: "Soft floral and earthy scents to calm your mind.", 
      badge: "Top Pick", 
      gradient: "from-emerald-400/20 via-teal-400/20 to-cyan-400/20",
      hoverGradient: "group-hover:from-emerald-400/30 group-hover:via-teal-400/30 group-hover:to-cyan-400/30",
      iconColor: "text-emerald-600"
    },
    { 
      title: "Romantic Evenings", 
      icon: Heart, 
      desc: "Warm, romantic aromas to set the perfect mood.", 
      badge: "", 
      gradient: "from-rose-400/20 via-pink-400/20 to-fuchsia-400/20",
      hoverGradient: "group-hover:from-rose-400/30 group-hover:via-pink-400/30 group-hover:to-fuchsia-400/30",
      iconColor: "text-rose-600"
    },
    { 
      title: "Luxury Gifts", 
      icon: Gift, 
      desc: "Elegant fragrances perfect for any occasion.", 
      badge: "", 
      gradient: "from-amber-400/20 via-orange-400/20 to-yellow-400/20",
      hoverGradient: "group-hover:from-amber-400/30 group-hover:via-orange-400/30 group-hover:to-yellow-400/30",
      iconColor: "text-amber-600"
    },
  ]

  const products = [
    { name: "Lavender Serenity", desc: "Calming floral aroma", price: "2,500", color: "from-purple-200 to-indigo-200" },
    { name: "Vanilla Dreams", desc: "Sweet & cozy warmth", price: "2,800", color: "from-amber-200 to-yellow-200" },
    { name: "Ocean Breeze", desc: "Fresh aquatic notes", price: "2,600", color: "from-cyan-200 to-blue-200" },
  ]

  const reviews = [
    { text: "Absolutely calming — my evenings feel different now.", name: "Sarah", initial: "S" },
    { text: "The perfect gift. Packaging and scent are top-tier.", name: "Arjun", initial: "A" },
    { text: "Burns evenly and lasts long. Worth every rupee.", name: "Priya", initial: "P" },
  ]

  return (
    <div className="overflow-x-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="relative isolate flex items-center bg-gradient-to-br from-amber-50 via-rose-50 to-orange-100">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Particle background */}
        <Particles
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 40 },
              color: { value: ["#fbbf24", "#f87171", "#f43f5e"] },
              opacity: { value: 0.4 },
              size: { value: { min: 1, max: 4 } },
              move: { 
                enable: true, 
                speed: 0.8, 
                direction: "top",
                outModes: { default: "out" }
              },
            },
          }}
          className="absolute inset-0 -z-10"
        />

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="mx-auto max-w-7xl px-6 py-24 w-full"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100/80 backdrop-blur-sm text-rose-700 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Handcrafted Luxury Candles
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
            >
              Light the Moment.
              <br />
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent">
                Feel the Calm.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Thoughtfully hand-poured candles designed to elevate your space,
              mood, and rituals — one flame at a time.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 flex justify-center gap-6 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/products")}
                className="group relative bg-gradient-to-r from-rose-600 to-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl overflow-hidden"
              >
                <span className="relative z-10">Shop Collection</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/about")}
                className="px-12 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 bg-white/70 backdrop-blur-sm hover:border-rose-300 transition"
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ x: 8 }}
              className="mt-12 text-rose-600 cursor-pointer font-semibold flex items-center justify-center gap-2 group"
            >
              Discover Scents 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <motion.div {...fadeUp} className="text-center mb-20">
          <span className="inline-block text-rose-600 font-semibold text-sm tracking-widest uppercase mb-4">Collections</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Shop by Mood
          </h2>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            Every candle tells a story — choose yours and transform your space.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {categories.map((cat, i) => {
            const IconComponent = cat.icon
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => navigate("/products")}
                className={`group relative cursor-pointer bg-gradient-to-br ${cat.gradient} ${cat.hoverGradient} backdrop-blur-sm rounded-3xl p-10 text-center shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50`}
              >
                {cat.badge && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2 + 0.5, type: "spring" }}
                    className="absolute top-4 right-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg"
                  >
                    {cat.badge}
                  </motion.span>
                )}
                
                <div className="mb-6 flex justify-center">
                  <div className={`${cat.iconColor} p-6 rounded-full bg-white/80 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <IconComponent className="w-12 h-12" strokeWidth={1.5} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{cat.title}</h3>
                <p className="text-gray-700 leading-relaxed">{cat.desc}</p>
                
                <div className="mt-8 flex justify-center">
                  <motion.div 
                    className="w-16 h-1 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <motion.div {...fadeUp} className="text-center mb-20">
          <span className="inline-block text-rose-600 font-semibold text-sm tracking-widest uppercase mb-4">Featured</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Best Sellers
          </h2>
          <p className="text-gray-600 mt-6 text-lg">
            Loved by customers across the island.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {products.map((product, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              onClick={() => navigate("/products")}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100"
            >
              <div className={`h-80 bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}>
                <motion.div 
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.1 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-gradient-to-br from-white to-transparent"
                />
                <div className="relative z-10 text-6xl font-bold text-gray-400/30">🕯️</div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center pb-6"
                >
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition-transform">
                    Quick View
                  </button>
                </motion.div>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-6">{product.desc}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">Rs. {product.price}</span>
                  <motion.span 
                    whileHover={{ x: 4 }}
                    className="text-rose-600 font-semibold flex items-center gap-1"
                  >
                    View <span>→</span>
                  </motion.span>
                </div>
                
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 text-xs px-3 py-2 rounded-full font-semibold">
                    <Sparkles className="w-3 h-3" />
                    Bestseller
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= SOCIAL PROOF ================= */}
      <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-rose-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-300 rounded-full blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-6xl px-6 text-center relative z-10">
          <motion.div {...fadeUp}>
            <span className="inline-block text-rose-600 font-semibold text-sm tracking-widest uppercase mb-4">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Loved by Our Customers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
              Join thousands of happy customers who've transformed their spaces.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl relative border border-gray-100"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {review.initial}
                </div>
                
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic text-lg leading-relaxed mb-6">
                  "{review.text}"
                </p>
                
                <p className="font-semibold text-gray-900 text-lg">{review.name}</p>
                <p className="text-gray-500 text-sm">Verified Customer</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center text-white relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Create Your Perfect Atmosphere
            </h2>

            <p className="mt-6 text-white/90 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              Whether it's calm, warmth, or celebration — Bovita has a candle for every moment.
            </p>

            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 25px 50px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="group relative bg-white text-rose-600 font-bold px-16 py-5 rounded-full shadow-2xl overflow-hidden text-lg"
            >
              <span className="relative z-10">Explore Candles</span>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
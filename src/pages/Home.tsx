import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* HERO */}
      <div className="bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back{user?.email ? "," : ""}{" "}
          <span className="text-indigo-600">
            {user?.email?.split("@")[0]}
          </span>{" "}
          👋
        </h1>

        <p className="text-gray-600 mt-3 max-w-xl">
          Manage your orders, track deliveries, and explore new handcrafted candles.
        </p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="border border-gray-300 hover:bg-gray-100 px-6 py-2 rounded-lg transition"
          >
            View Orders
          </button>
        </div>
      </div>

      {/* ACTIVITY SNAPSHOT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">—</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <p className="text-2xl font-bold text-yellow-600">—</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Last Order</p>
          <p className="text-2xl font-bold text-gray-800">—</p>
        </div>
      </div>

      {/* BRAND / TRUST */}
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Why Bovita Candles?
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Hand-poured, eco-friendly candles crafted to elevate your space with warmth and calm.
        </p>
      </div>

    </div>
  )
}

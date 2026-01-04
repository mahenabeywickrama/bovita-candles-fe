import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { getMyOrders } from "../services/order"

type Order = {
  _id: string
  totalAmount: number
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "CANCELLED"
  createdAt: string
}

export default function UserDashboard() {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setUser(null)
    navigate("/login")
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders()
        setOrders(res.data)
      } catch (error) {
        console.error("Failed to load orders")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      
      {/* -------- WELCOME / PROFILE -------- */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Email: <span className="font-medium">{user?.email}</span>
        </p>
      </div>

      {/* -------- MY ORDERS -------- */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          My Orders
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">You haven’t placed any orders yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <div
                key={order._id}
                className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    Order #{order._id.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        order.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "SHIPPED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.status}
                  </span>

                  <span className="font-semibold text-gray-800">
                    Rs. {order.totalAmount.toFixed(2)}
                  </span>

                  <button
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* -------- ACCOUNT -------- */}
      <div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Account</h3>
          <p className="text-gray-500 text-sm">
            Manage your session
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

    </div>
  )
}

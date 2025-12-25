import { useEffect, useState } from "react"
import { type DashboardStats, getDashboardStats, type Order } from "../services/order"
import { Link } from "react-router-dom"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts"

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getDashboardStats()
        setStats(res.data)
      } catch (err) {
        console.error("Failed to load dashboard", err)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>
  }

  if (!stats) {
    return <p className="p-6 text-red-600">Failed to load dashboard</p>
  }

  const statusCount = stats.recentOrders.reduce<Record<string, number>>(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1
      return acc
    },
    {}
  )

  const orderStatusData = Object.entries(statusCount).map(
    ([status, count]) => ({
      name: status,
      value: count
    })
  )

  const STATUS_COLORS: Record<string, string> = {
    PENDING: "#FACC15",
    CONFIRMED: "#60A5FA",
    SHIPPED: "#A78BFA",
    CANCELLED: "#F87171"
  }

  const revenueData = stats.recentOrders
    .slice()
    .reverse()
    .map(order => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      revenue: order.totalAmount
    }))

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Orders" value={stats.totalOrders} />
        <DashboardCard title="Pending Orders" value={stats.pendingOrders} />
        <DashboardCard
          title="Revenue"
          value={`LKR ${stats.revenue.toLocaleString()}`}
        />
        <DashboardCard title="Customers" value={stats.customers} />
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Order ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {stats.recentOrders.map(order => (
              <OrderRow key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Order Status Pie */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Order Status Distribution
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={orderStatusData} dataKey="value" nameKey="name" label>
                {orderStatusData.map(entry => (
                  <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Line Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">
            Revenue (Recent Orders)
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard title="Manage Orders" link="/admin/orders" />
        <ActionCard title="Manage Products" link="/admin/products" />
        <ActionCard title="Manage Users" link="/admin/users" />
      </div>
    </div>
  )
}

/* ---------- COMPONENTS ---------- */

function DashboardCard({
  title,
  value
}: {
  title: string
  value: string | number
}) {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )
}

function OrderRow({ order }: { order: Order }) {
  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    SHIPPED: "bg-purple-100 text-purple-700",
    CANCELLED: "bg-red-100 text-red-700"
  }

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-2">#{order._id.slice(-6)}</td>
      <td>{order.user.email}</td>
      <td>
        <span
          className={`px-2 py-1 text-sm rounded ${statusColors[order.status]}`}
        >
          {order.status}
        </span>
      </td>
      <td>LKR {order.totalAmount.toLocaleString()}</td>
      <td>
        <Link
          to={`/admin/orders?orderId=${order._id}`}
          className="text-blue-600 hover:underline"
        >
          View
        </Link>
      </td>
    </tr>
  )
}

function ActionCard({
  title,
  link
}: {
  title: string
  link: string
}) {
  return (
    <Link
      to={link}
      className="bg-black text-white rounded-lg p-6 hover:bg-gray-800 transition"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-2 opacity-80">Go to {title}</p>
    </Link>
  )
}

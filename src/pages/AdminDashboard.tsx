export default function AdminDashboard() {
  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Orders" value="1,248" />
        <DashboardCard title="Pending Orders" value="86" />
        <DashboardCard title="Revenue" value="LKR 2.4M" />
        <DashboardCard title="Customers" value="532" />
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
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">#ORD-1024</td>
              <td>user@gmail.com</td>
              <td>
                <span className="px-2 py-1 text-sm rounded bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>
              <td>LKR 12,500</td>
              <td>
                <button className="text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-50">
              <td className="py-2">#ORD-1023</td>
              <td>john@example.com</td>
              <td>
                <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-700">
                  Completed
                </span>
              </td>
              <td>LKR 8,900</td>
              <td>
                <button className="text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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

/* ---------- Reusable Components ---------- */

function DashboardCard({
  title,
  value
}: {
  title: string
  value: string
}) {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
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
    <a
      href={link}
      className="bg-black text-white rounded-lg p-6 hover:bg-gray-800 transition"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm mt-2 opacity-80">Go to {title}</p>
    </a>
  )
}

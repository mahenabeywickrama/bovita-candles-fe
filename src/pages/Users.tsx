import { useEffect, useState } from "react"
import type { UserType } from "../services/admin"
import {
  getAllUsers,
  toggleUserStatus as toggleUserStatusApi,
  deleteUser as deleteUserApi,
  updateUser as updateUserApi,
} from "../services/admin"

export default function Users() {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [formData, setFormData] = useState<Partial<UserType>>({})

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
      alert("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Toggle user status (enable/disable)
  const toggleUserStatus = async (id: string) => {
    try {
      await toggleUserStatusApi(id)
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  // Delete user
  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return
    try {
      await deleteUserApi(id)
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  // Start editing user
  const handleEdit = (user: UserType) => {
    setEditingUser(user)
    setFormData(user)
  }

  // Update user
  const handleUpdate = async () => {
    if (!editingUser) return
    try {
      await updateUserApi(editingUser._id, formData)
      setEditingUser(null)
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p>Loading users...</p>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-3">{user.firstname} {user.lastname}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  {user.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Disabled</span>
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleUserStatus(user._id)}
                    className={`px-3 py-1 rounded text-white ${
                      user.isActive
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {user.isActive ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>

            <input
              type="text"
              placeholder="First Name"
              className="w-full mb-3 p-2 border rounded"
              value={formData.firstname || ""}
              onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full mb-3 p-2 border rounded"
              value={formData.lastname || ""}
              onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <select
              className="w-full mb-3 p-2 border rounded"
              value={formData.role || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as "USER" | "ADMIN",
                })
              }
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

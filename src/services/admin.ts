import api from "./api"

export interface UserType {
  _id: string
  firstname: string
  lastname: string
  email: string
  role: "USER" | "ADMIN"
  disabled?: boolean
}

// Get all users
export const getAllUsers = async (): Promise<UserType[]> => {
  const res = await api.get("/auth/admin/users")
  return res.data.data
}

// Get single user by ID
export const getUserById = async (id: string): Promise<UserType> => {
  const res = await api.get(`/auth/admin/users/${id}`)
  return res.data.data
}

// Update user
export interface UpdateUserType {
  firstname?: string
  lastname?: string
  email?: string
  role?: "USER" | "ADMIN"
}
export const updateUser = async (id: string, data: UpdateUserType) => {
  const res = await api.put(`/auth/admin/users/${id}`, data)
  return res.data
}

// Disable user
export const toggleUserStatus = async (id: string) => {
  const res = await api.patch(`/auth/admin/users/${id}/toggle`, {})
  return res.data
}

// Delete user
export const deleteUser = async (id: string) => {
  const res = await api.delete(`/auth/admin/users/${id}`)
  return res.data
}

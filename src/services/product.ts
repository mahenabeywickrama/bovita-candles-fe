// services/product.ts
import api from "./api"

export type ProductType = {
  _id: string
  title: string
  description: string
  category: string
  fragrance: string
  size: string
  price: number
  stock: number
  imageUrls: string[]
}

export const createProduct = async (data: FormData) => {
  const res = await api.post("/product/create", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return res.data
}

export const getProducts = async (page = 1, limit = 10) => {
  const res = await api.get(`/product/?page=${page}&limit=${limit}`)
  return res.data
}

export const updateProduct = async (id: string, data: FormData) => {
  const res = await api.put(`/product/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return res.data
}

export const deleteProduct = async (id: string) => {
  const res = await api.delete(`/product/${id}`)
  return res.data
}

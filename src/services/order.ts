import api from "./api"

interface OrderPayload {
  items: {
    productId: string
    quantity: number
  }[]
}

export const createOrder = async (orderPayload: OrderPayload) => {
  return api.post("/orders/create", orderPayload)
}

export const getAllOrders = async (
  status: string,
  page: number
) => {
  return api.get("/orders", {
    params: {
      status,
      page,
      limit: 5
    }
  })
}

export const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  return api.put(`/orders/${orderId}/status`, { status })
}

export const getOrder = async (
  orderId: string
) => {
  return api.get(`/orders/${orderId}`)
}
export type Order = {
  id: string
  orderNumber: string
  senderCity: string
  senderAddress: string
  recipientCity: string
  recipientAddress: string
  weightKg: number
  pickupDate: string
  createdAtUtc: string
}

export type OrderFormValues = {
  senderCity: string
  senderAddress: string
  recipientCity: string
  recipientAddress: string
  weightKg: string
  pickupDate: string
}

export type PagedOrders = {
  items: Order[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

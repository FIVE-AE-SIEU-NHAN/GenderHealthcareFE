export type PayOSResponse = {
  bin: string
  accountNumber: string
  accountName: string
  amount: number
  description: string
  orderCode: number
  currency: string
  paymentLinkId: string
  status: "PENDING" | "PAID" | "FAILED" | string
  checkoutUrl: string
  qrCode: string
}
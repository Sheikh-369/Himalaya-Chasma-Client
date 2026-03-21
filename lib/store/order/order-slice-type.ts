import { Status } from "@/lib/global/type";

/* =========================
   ENUM TYPES (match backend)
========================= */

export type PaymentMethod = "cod" | "qr_scan" | "visit_pay";

export type OrderStatus = "pending" | "confirmed" | "delivered" | "cancelled";

/* =========================
   ORDER ITEM
========================= */

export interface IOrderItemData {
  id?: string;

  orderId?: string;
  productId: string;

  productName: string;
  price: number;
  quantity?: number;

  image?: string | null;
}

/* =========================
   ORDER
========================= */

export interface IOrderData {
  id?: string;

  firstName: string;
  lastName: string;

  whatsappNumber: string;
  email?: string | null;

  deliveryAddress: string;

  paymentMethod: PaymentMethod;

  totalAmount: number;

  orderStatus?: OrderStatus;

  items?: IOrderItemData[];

  createdAt?: string;
  updatedAt?: string;
}

/* =========================
   CREATE ORDER PAYLOAD
========================= */

export interface ICreateOrderPayload {
  firstName: string;
  lastName: string;

  whatsappNumber: string;
  email?: string;

  deliveryAddress: string;

  paymentMethod: PaymentMethod;

  totalAmount: number;

  items: IOrderItemData[];
}

/* =========================
   SLICE STATE
========================= */

export interface IOrderSliceState {
  orders: IOrderData[];
  singleOrder: IOrderData | null;

  status: Status;
}
import { OrderStatus, PaymentMethod, Status } from "@/lib/global/type";

export interface IOrderItem {
  id?: string;
  orderId?: string;
  productId: string;
  productName: string;
  brand?:string;
  price: number;
  quantity: number;
  image?: string | null;
  alt?:string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderData {
  id: string;
  firstName: string;
  lastName: string;
  whatsappNumber: string;
  email?: string | null;
  address: string;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  productName: string;
  totalAmount: number;
  paymentProof?: string | null; // image URL or file path
  createdAt: string; // ISO date string from backend
  OrderItems: IOrderItem[];
}

export interface IOrderSliceState {
  orders: IOrderData[];
  singleOrder: IOrderData | null;
  status: Status;
}
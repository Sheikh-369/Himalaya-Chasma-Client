import { OrderStatus, PaymentMethod, Status } from "@/lib/global/type";

//Order Item(product detauls)
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

//Order details
export interface IOrder {
  id?: string;
  firstName: string;
  lastName: string;
  whatsappNumber: string;
  email?: string | null;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  orderStatus?: OrderStatus;
  items?: IOrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

//Create Order (Frontend → API)
export interface ICheckoutData {
  firstName: string;
  lastName: string;
  whatsappNumber: string;
  email?: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image?: string | null;
  }[];
}

//Redux Slice State
export interface IOrderState {
  items: IOrderItem[];
  status: Status;
}
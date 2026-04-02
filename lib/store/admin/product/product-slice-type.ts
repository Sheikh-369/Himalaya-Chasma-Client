import { Status } from "@/lib/global/type";

export interface IProductData {
  id?: string;
  name: string;
  brand?: string | null;
  category: "Sunglasses" | "Prescription" | "Designer";
  description: string;
  price: number;
  originalPrice?: number | null;
  badge?: string | null;
  image?: File | string | null;
  alt?: string | null;
  rating?: number;
  reviews?: number;
  features?: string[];
  frameDetails?: { label: string; value: string }[];
}

export interface IProductSliceState {
  products: IProductData[];
  singleProduct: IProductData | null;
  featuredProducts: IProductData[];
  status: Status;
  detailStatus: Status;
}
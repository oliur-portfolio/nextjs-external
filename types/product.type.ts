export type TProductStatus = "active" | "inactive";

export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  category: string;
  status: TProductStatus;
  createdAt?: string;
  updatedAt?: string;
}

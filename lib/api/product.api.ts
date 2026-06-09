import { ProductFormOutput } from "@/lib/validators/product.schema";
import { ApiResponse } from "@/types/api.type";
import { IProduct } from "@/types/product.type";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function getProducts(): Promise<ApiResponse<IProduct[]>> {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  const result: ApiResponse<IProduct[]> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch products");
  }

  return result;
}

export async function getProduct(id: string): Promise<ApiResponse<IProduct>> {
  const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  const result: ApiResponse<IProduct> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch product");
  }

  return result;
}

export async function createProduct(
  payload: ProductFormOutput
): Promise<ApiResponse> {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: ApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to create product");
  }

  return result;
}

export async function updateProduct(
  id: string,
  payload: ProductFormOutput
): Promise<ApiResponse> {
  const response = await fetch(`/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: ApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to update product");
  }

  return result;
}

export async function deleteProduct(id: string): Promise<ApiResponse> {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  const result: ApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to delete product");
  }

  return result;
}

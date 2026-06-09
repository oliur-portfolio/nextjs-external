import { RegisterFormOutput } from "@/lib/validators/auth.schema";
import { ApiResponse } from "@/types/api.type";

export async function registerUser(
  payload: RegisterFormOutput
): Promise<ApiResponse> {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: ApiResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to register user");
  }

  return result;
}

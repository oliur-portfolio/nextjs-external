import { auth } from "@/auth";
import { Role } from "./auth-redirect";

interface GuardResult {
  authorized: boolean;
  role?: Role;
  userId?: string;
  response?: Response;
}

export async function requireAuth(): Promise<GuardResult> {
  const session = await auth();

  if (!session?.user) {
    return {
      authorized: false,
      response: Response.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      ),
    };
  }

  return {
    authorized: true,
    role: session.user.role as Role,
    userId: session.user.id,
  };
}

export async function requireAdmin(): Promise<GuardResult> {
  const session = await auth();

  if (!session?.user) {
    return {
      authorized: false,
      response: Response.json(
        { success: false, message: "Unauthorized. Please sign in." },
        { status: 401 }
      ),
    };
  }

  if (session.user.role !== "admin") {
    return {
      authorized: false,
      response: Response.json(
        { success: false, message: "Forbidden. Admin access required." },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true,
    role: session.user.role as Role,
    userId: session.user.id,
  };
}

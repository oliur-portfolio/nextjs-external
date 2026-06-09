export type Role = "admin" | "user";

const ROLE_HOME: Record<Role, string> = {
  admin: "/admin",
  user: "/dashboard",
};

export function getRoleHome(role: Role | undefined): string {
  return ROLE_HOME[role ?? "user"];
}

export function getRedirectUrl(
  role: Role | undefined,
  callbackUrl: string | null
): string {
  if (callbackUrl && isValidCallbackUrl(callbackUrl, role)) {
    return callbackUrl;
  }
  return getRoleHome(role);
}

function isValidCallbackUrl(url: string, role: Role | undefined): boolean {
  if (url.startsWith("http://") || url.startsWith("https://")) return false;
  if (!url.startsWith("/")) return false;
  if (url.startsWith("/admin") && role !== "admin") return false;
  return true;
}

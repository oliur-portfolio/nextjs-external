import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";
import SignOutButton from "./SignOutButton";
import { Package } from "lucide-react";
import { Badge } from "../ui/badge";
import NavItems, { NavRole } from "./NavItems";

export default async function Header() {
  const session = await auth();

  const role = (session?.user.role as NavRole) ?? null;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
            <Package className="h-5 w-5 text-muted-foreground" />
          </div>

          <span className="font-bold tracking-tight">Inventory</span>
        </Link>

        <NavItems role={role} />

        {session?.user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {session.user.role === "admin" && (
                <Badge variant="secondary">Admin</Badge>
              )}

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-gray-50">
                  {!session.user.image ? (
                    <span className="uppercase">
                      {session?.user?.name?.charAt(0)}
                    </span>
                  ) : (
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={session.user.image}
                      alt={session.user.name || "Avatar"}
                    />
                  )}
                </div>

                <h3 className="text-sm font-medium">{session.user.name}</h3>
              </div>
            </div>

            <SignOutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/login">Login</Link>
            </Button>

            <Button asChild size="sm">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

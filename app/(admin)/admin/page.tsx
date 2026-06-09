import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, PackageSearch, Shield, Users } from "lucide-react";

export default async function AdminPage() {
  return (
    <main className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-10">
          <div className="">
            <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage users, products, and system-level settings.
            </p>
          </div>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Admin Role</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Active</p>
              <p className="text-xs text-muted-foreground">
                Role-protected access
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <PackageSearch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">48</p>
              <p className="text-xs text-muted-foreground">
                Products in system
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Security</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Protected</p>
              <p className="text-xs text-muted-foreground">Admin-only route</p>
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Admin Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This page is for admin users only. Later, we will connect real
              user management, product moderation, and role-based permissions
              here.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

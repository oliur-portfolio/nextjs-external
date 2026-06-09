import { auth } from "@/auth";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import ProductList from "@/components/products/ProductList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProductsPage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="flex flex-col gap-4 rounded-2xl bg-background p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-sm text-muted-foreground">
              Manage your inventory products from one place.
            </p>
          </div>

          <Link href="/admin/products/create">
            <Button className="w-full md:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </section>

        <section className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9" />
          </div>

          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </section>

        <ErrorBoundary fallbackMessage="Unable to load user data">
          <Suspense fallback={<p>Loading products...</p>}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </main>
  );
}

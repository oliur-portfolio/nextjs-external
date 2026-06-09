import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductForm from "@/components/products/ProductForm";

export default async function CreateProductPage() {
  return (
    <main className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Create Product
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new product to your inventory.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <ProductForm />
      </div>
    </main>
  );
}

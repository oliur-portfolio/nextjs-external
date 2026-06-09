import ProductForm from "@/components/products/ProductForm";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/api/product.api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const productResult = await getProduct(id);

  const product = productResult.data;

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-muted/30 p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Product</h1>
            <p className="text-sm text-muted-foreground">
              Update this product’s details and inventory information.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        <ProductForm product={product} />
      </div>
    </main>
  );
}

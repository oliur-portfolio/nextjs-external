import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Package, Pencil, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import DeleteProductButton from "./DeleteProductButton";
import Link from "next/link";
import { getProducts } from "@/lib/api/product.api";

export default async function ProductList() {
  const productsResult = await getProducts();

  const products = productsResult.data || [];

  return (
    <>
      {products.length > 0 ? (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product._id}
              className="rounded-2xl transition hover:shadow-md"
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <Badge
                    variant={
                      product.status === "active" ? "default" : "secondary"
                    }
                  >
                    {product.status}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="line-clamp-1 text-lg">
                    {product.name}
                  </CardTitle>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-semibold">${product.price}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Stock</p>
                    <p className="font-semibold">{product.stock}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
              </CardContent>

              <CardFooter className="gap-3">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/admin/products/edit/${product._id}`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>

                <DeleteProductButton productId={product._id} />
              </CardFooter>
            </Card>
          ))}
        </section>
      ) : (
        <h2 className="text-xl font-medium">No products created yet.</h2>
      )}
    </>
  );
}

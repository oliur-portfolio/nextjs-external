import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This product may have been deleted or the link is invalid.
      </p>

      <Button asChild className="mt-4">
        <Link href="/products">Back to products</Link>
      </Button>
    </main>
  );
}

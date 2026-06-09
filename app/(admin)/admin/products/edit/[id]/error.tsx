"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Failed to load product</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>

      <Button className="mt-4" onClick={() => unstable_retry()}>
        Try again
      </Button>
    </main>
  );
}

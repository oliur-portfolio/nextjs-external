"use client";

import { unstable_catchError as catchError, type ErrorInfo } from "next/error";
import { Button } from "../ui/button";

function ErrorFallback(
  props: { fallbackMessage?: string },
  { error, unstable_retry }: ErrorInfo
) {
  return (
    <div className="rounded-xl border p-6">
      <p className="text-sm text-muted-foreground">
        {error instanceof Error
          ? error.message
          : (props.fallbackMessage ?? "Something went wrong")}
      </p>

      <Button className="mt-4" size="sm" onClick={() => unstable_retry()}>
        Try again
      </Button>
    </div>
  );
}

export default catchError(ErrorFallback);

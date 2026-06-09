export default function ForbiddenPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="mb-4 text-5xl">403</p>
      <h1 className="mb-2 text-xl font-semibold">Access denied</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        You are logged in but do not have permission to view this page.
      </p>
      <a
        href="/dashboard"
        className="rounded-md border px-4 py-2 text-sm transition-colors hover:bg-muted"
      >
        Back to dashboard
      </a>
    </div>
  );
}

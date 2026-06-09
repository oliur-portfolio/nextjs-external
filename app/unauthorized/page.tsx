export default function UnauthorizedPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-24 text-center">
      <p className="mb-4 text-5xl">401</p>
      <h1 className="mb-2 text-xl font-semibold">Not signed in</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        You need to be logged in to view this page.
      </p>
      <a
        href="/login"
        className="rounded-md border px-4 py-2 text-sm transition-colors hover:bg-muted"
      >
        Go to login
      </a>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Boxes, ShieldCheck, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <main className="min-h-screen bg-muted/30">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center">
        <div className="text-balck mb-6 rounded-full border bg-white px-4 py-1.5 text-sm">
          Simple inventory management for learning real projects
        </div>

        <h1 className="max-w-3xl text-4xl leading-snug font-bold tracking-tight sm:text-5xl">
          Manage your products with a clean Next.js dashboard
        </h1>

        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
          A simple inventory app built with Next.js App Router, MongoDB,
          Mongoose, Shadcn UI, Zod, React Hook Form, and Auth.js.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/admin/products">
              View Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-6 pb-20 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
              <Boxes className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle>Product CRUD</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create, read, update, and delete products with a clean dashboard
              UI.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Login, register, protected routes, and role-based access with
              Auth.js.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
              <Sparkles className="h-5 w-5 text-muted-foreground" />
            </div>
            <CardTitle>Real Project Pattern</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Structured like a real client project without unnecessary
              complexity.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Eye, EyeOff, Package } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LoginFormInput,
  LoginFormOutput,
  loginFormSchema,
} from "@/lib/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, signIn } from "next-auth/react";
import { getRedirectUrl, Role } from "@/lib/auth-redirect";
import { useEffect, useState } from "react";
import GoogleSignInButton from "../layout/GoogleSignInButton";

const AUTH_ERRORS = {
  OAuthSignInError: "Google sign in failed. Please try again.",
  OAuthAccountNotLinked:
    "This email is already registered with a password. Please sign in with email instead.",
  CredentialsSignin: "Invalid email or password.",
  Default: "Something went wrong. Please try again.",
} as const;

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "12345678Ab",
    },
  });

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (!urlError) return;

    form.setError("root", {
      message:
        AUTH_ERRORS[urlError as keyof typeof AUTH_ERRORS] ??
        AUTH_ERRORS.Default,
    });

    const cleanUrl = new URL(window.location.href);

    cleanUrl.searchParams.delete("error");
    router.replace(cleanUrl.pathname + cleanUrl.search, { scroll: false });
  }, []);

  async function onSubmit(data: LoginFormOutput) {
    form.clearErrors("root");

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      form.setError("root", {
        message: AUTH_ERRORS.CredentialsSignin,
      });

      return;
    }

    const session = await getSession();

    const destination = getRedirectUrl(session?.user.role as Role, callbackUrl);

    router.push(destination);

    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md rounded-2xl shadow-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <Package className="h-6 w-6 text-muted-foreground" />
          </div>

          <div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Login to manage your inventory products.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className="pr-10"
                      />

                      <button
                        type="button"
                        className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Field orientation="vertical" className="mt-6">
              <Button
                type="submit"
                form="form-login"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <GoogleSignInButton callbackUrl={callbackUrl} />
            </Field>
          </form>

          {form.formState.errors.root && (
            <div className="mt-8 rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-base text-red-600">
              {form.formState.errors.root.message}
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="ml-1 font-medium text-primary">
            Register
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginForm;

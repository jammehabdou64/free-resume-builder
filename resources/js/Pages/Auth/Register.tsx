import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { Eye, EyeOff, FileText, Github, UserPlus } from "lucide-react";

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data, setData, processing, errors, post } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setData({ ...data, [target.name]: target.value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/auth/register");
  };

  return (
    <>
      <Head title="Create account — ResumeForge" />
      <div className="bg-background flex min-h-screen flex-col lg:flex-row">
        <aside className="relative hidden w-full flex-col justify-between bg-linear-to-br from-[hsl(222_47%_18%)] to-[hsl(217_58%_30%)] px-10 py-12 text-white lg:flex lg:w-1/2 lg:px-14 lg:py-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 opacity-95 transition-opacity hover:opacity-100"
            >
              <span className="bg-white/15 flex h-9 w-9 items-center justify-center rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-semibold tracking-tight">ResumeForge</span>
            </Link>
          </div>

          <div className="max-w-md space-y-8">
            <blockquote className="text-xl font-medium leading-snug tracking-tight md:text-2xl">
              &ldquo;I built my entire resume in one evening. The editor is intuitive
              and the PDF export looks professional.&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white/25">
                <AvatarFallback className="bg-white/20 text-sm font-semibold text-white">
                  SL
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Sara L.</p>
                <p className="text-sm text-white/70">
                  Product Designer, hired at Notion
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-white/20 pt-10 text-center">
            <div>
              <p className="text-2xl font-bold tracking-tight md:text-3xl">50K+</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/65">
                Resumes built
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight md:text-3xl">5</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/65">
                Templates
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight md:text-3xl">Free</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/65">
                Forever
              </p>
            </div>
          </div>
        </aside>

        <div className="flex w-full flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:w-1/2 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-[400px]">
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="text-foreground inline-flex items-center gap-2.5 font-semibold tracking-tight"
              >
                <span className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                  <FileText className="text-primary h-5 w-5" />
                </span>
                ResumeForge
              </Link>
            </div>
            <div className="mb-10 space-y-2">
              <h1 className="text-foreground text-3xl font-bold tracking-tight">
                Create your account
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Start building a professional resume in minutes — no credit card
                required.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="border-border text-foreground hover:bg-muted/50 h-11 w-full gap-2.5 font-medium shadow-sm"
              >
                <GoogleMark className="h-5 w-5 shrink-0" />
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-border text-foreground hover:bg-muted/50 h-11 w-full gap-2.5 font-medium shadow-sm"
              >
                <Github className="h-5 w-5 shrink-0" />
                Continue with GitHub
              </Button>
            </div>

            <div className="relative my-8">
              <div className="border-border absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="text-muted-foreground bg-background px-3 font-medium">
                  or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground text-sm font-medium">
                  Full name
                </Label>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  value={data.name}
                  name="name"
                  onChange={onChangeHandler}
                  required
                  autoComplete="name"
                  className="h-11"
                />
                {errors?.name && (
                  <p className="text-destructive text-sm">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={data.email}
                  onChange={onChangeHandler}
                  name="email"
                  required
                  autoComplete="email"
                  className="h-11"
                />
                {errors?.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-foreground text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={onChangeHandler}
                    required
                    autoComplete="new-password"
                    className="h-11 pr-11"
                  />
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded p-1.5 transition-colors"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors?.password && (
                  <p className="text-destructive text-sm">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirm-password"
                  className="text-foreground text-sm font-medium"
                >
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={data.confirmPassword}
                    name="confirmPassword"
                    onChange={onChangeHandler}
                    required
                    autoComplete="new-password"
                    className="h-11 pr-11"
                  />
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded p-1.5 transition-colors"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors?.confirmPassword && (
                  <p className="text-destructive text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={processing}
                className="h-11 w-full gap-2 bg-[hsl(217_91%_45%)] text-base font-semibold text-white shadow-md hover:bg-[hsl(217_91%_40%)]"
              >
                <UserPlus className="h-4 w-4" />
                {processing ? "Creating account…" : "Create account"}
              </Button>
            </form>

            <p className="text-muted-foreground mt-10 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

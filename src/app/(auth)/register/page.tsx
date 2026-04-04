"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";

import { registerSchema, RegisterFormValues } from "../../../shared/api/schemas/auth.schema";
import { authService } from "../../../shared/api/services/auth.service";
import { tokenStorage } from "../../../shared/lib/storage";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await authService.register({
        ...values,
        role: "MODERATOR",
      });
      tokenStorage.set(response.access_token, response.refresh_token);
      toast.success("Successfully registered!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900">Sign up</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Create an account to access the Common App admin panel.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="full_name" className="text-sm font-medium text-zinc-700">
            Full Name
          </label>
          <input
            {...register("full_name")}
            id="full_name"
            type="text"
            placeholder="John Doe"
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black disabled:opacity-50"
            disabled={isLoading}
          />
          {errors.full_name && (
            <p className="text-xs text-red-500">{errors.full_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="admin@commonapp.kz"
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black disabled:opacity-50"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-700"
          >
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black disabled:opacity-50"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>

        <div className="mt-4 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black hover:underline text-zinc-900">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

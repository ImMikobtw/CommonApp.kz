"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "../api/login";
import { tokenStorage } from "../../../shared/lib/storage";
import { LoginPayload } from "../types/auth.types";

export function useAuth() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      tokenStorage.set(data.access_token, data.refresh_token);
      toast.success("Successfully signed in");
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  const logout = () => {
    tokenStorage.remove();
    router.push("/login");
  };

  return {
    login: loginMutation.mutate,
    isPending: loginMutation.isPending,
    logout,
  };
}
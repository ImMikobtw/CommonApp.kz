"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "../api/login";
import { authService } from "../../../shared/api/services/auth.service";
import { tokenStorage } from "../../../shared/lib/storage";
import { LoginPayload } from "../types/auth.types";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: session, isLoading: isLoadingSession } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authService.getMe().then(res => res.user),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      tokenStorage.set(data.access_token, data.refresh_token);
      toast.success("Successfully signed in");
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  const logout = () => {
    tokenStorage.remove();
    queryClient.removeQueries({ queryKey: ["auth", "me"] });
    router.push("/login");
  };

  return {
    login: loginMutation.mutate,
    isPending: loginMutation.isPending,
    logout,
    user: session,
    isLoadingSession,
  };
}
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { parseSessionService } from "../../../shared/api/services/parse-session.service";
import { toast } from "sonner";

export const parseSessionKeys = {
  all: ["parse-sessions"] as const,
  list: () => [...parseSessionKeys.all, "list"] as const,
};

export function useParseSessions() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: parseSessionKeys.list(),
    queryFn: () => parseSessionService.getAll(),
    // Poll every 4 seconds to show progress updates in real-time during parsing
    refetchInterval: (query) => {
      const hasRunning = query.state.data?.some(
        (s) => s.status === "RUNNING" || s.status === "PENDING"
      );
      return hasRunning ? 3000 : false;
    }
  });

  const triggerMutation = useMutation({
    mutationFn: (documentId: number) => parseSessionService.trigger(documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: parseSessionKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("AI Document parsing triggered in background!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Failed to trigger AI parsing");
    },
  });

  return {
    parseSessions: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    triggerMutation,
  };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { suggestionService } from "../../../shared/api/services/suggestion.service";
import { toast } from "sonner";

export const suggestionKeys = {
  all: ["suggestions"] as const,
  list: (status?: string) => [...suggestionKeys.all, "list", status || "all"] as const,
};

export function useSuggestions(status?: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: suggestionKeys.list(status),
    queryFn: () => suggestionService.getAll(status),
  });

  const approveMutation = useMutation({
    mutationFn: (id: number) => suggestionService.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: suggestionKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Suggestion applied successfully to database!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Failed to apply suggestion");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => suggestionService.reject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: suggestionKeys.all });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Suggestion rejected");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || "Failed to reject suggestion");
    },
  });

  return {
    suggestions: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    approveMutation,
    rejectMutation,
  };
}

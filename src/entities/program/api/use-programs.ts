import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { programService, CreateProgramParams } from "../../../shared/api/services/program.service";
import { toast } from "sonner";

export const programKeys = {
  all: ["programs"] as const,
  list: () => [...programKeys.all, "list"] as const,
  details: (id: number) => [...programKeys.all, "detail", id] as const,
};

export function usePrograms() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: programKeys.list(),
    queryFn: () => programService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateProgramParams) => programService.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programKeys.list() });
      toast.success("Program created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create program");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, params }: { id: number; params: Partial<CreateProgramParams> }) => 
      programService.update(id, params),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: programKeys.list() });
      queryClient.invalidateQueries({ queryKey: programKeys.details(id) });
      toast.success("Program updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update program");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => programService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: programKeys.list() });
      toast.success("Program deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete program");
    },
  });

  return {
    programs: query.data,
    isLoading: query.isLoading,
    error: query.error,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export function useProgram(id: number) {
  return useQuery({
    queryKey: programKeys.details(id),
    queryFn: () => programService.getById(id),
    enabled: !!id,
  });
}

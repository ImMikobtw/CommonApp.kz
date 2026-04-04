import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { specialtyService, CreateSpecialtyParams } from "../../../shared/api/services/specialty.service";
import { toast } from "sonner";

export const specialtyKeys = {
  all: ["specialties"] as const,
  list: () => [...specialtyKeys.all, "list"] as const,
  details: (id: number) => [...specialtyKeys.all, "detail", id] as const,
};

export function useSpecialties() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: specialtyKeys.list(),
    queryFn: () => specialtyService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateSpecialtyParams) => specialtyService.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: specialtyKeys.list() });
      toast.success("Specialty created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create specialty");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, params }: { id: number; params: Partial<CreateSpecialtyParams> }) => 
      specialtyService.update(id, params),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: specialtyKeys.list() });
      queryClient.invalidateQueries({ queryKey: specialtyKeys.details(id) });
      toast.success("Specialty updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update specialty");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => specialtyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: specialtyKeys.list() });
      toast.success("Specialty deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete specialty");
    },
  });

  return {
    specialties: query.data,
    isLoading: query.isLoading,
    error: query.error,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export function useSpecialtyOptions() {
  return useQuery({
    queryKey: [...specialtyKeys.all, "options"],
    queryFn: () => specialtyService.getOptions(),
  });
}

export function useSpecialty(id: number) {
  return useQuery({
    queryKey: specialtyKeys.details(id),
    queryFn: () => specialtyService.getById(id),
    enabled: !!id,
  });
}

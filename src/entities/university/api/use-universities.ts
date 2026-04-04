import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { universityService, CreateUniversityParams } from "../../../shared/api/services/university.service";
import { toast } from "sonner";

export const universityKeys = {
  all: ["universities"] as const,
  list: () => [...universityKeys.all, "list"] as const,
  details: (id: number) => [...universityKeys.all, "detail", id] as const,
};

export function useUniversities() {
  return useQuery({
    queryKey: universityKeys.list(),
    queryFn: () => universityService.getAll(),
  });
}

export function useUniversityOptions() {
  return useQuery({
    queryKey: [...universityKeys.all, "options"],
    queryFn: () => universityService.getOptions(),
  });
}

export function useUniversity(id: number) {
  return useQuery({
    queryKey: universityKeys.details(id),
    queryFn: () => universityService.getById(id),
    enabled: !!id,
  });
}

export function useCreateUniversity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (params: CreateUniversityParams) => universityService.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: universityKeys.list() });
      toast.success("University created successfully");
    },
    onError: (error: Error | any) => {
      toast.error((error as any).response?.data?.message || "Failed to create university");
    },
  });
}

export function useUpdateUniversity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, params }: { id: number; params: Partial<CreateUniversityParams> }) => 
      universityService.update(id, params),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: universityKeys.list() });
      queryClient.invalidateQueries({ queryKey: universityKeys.details(id) });
      toast.success("University updated successfully");
    },
    onError: (error: Error | any) => {
      toast.error((error as any).response?.data?.message || "Failed to update university");
    },
  });
}

export function useDeleteUniversity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => universityService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: universityKeys.list() });
      toast.success("University deleted successfully");
    },
    onError: (error: Error | any) => {
      toast.error((error as any).response?.data?.message || "Failed to delete university");
    },
  });
}

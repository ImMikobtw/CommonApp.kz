import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService, CreateUserParams } from "../../../shared/api/services/user.service";
import { toast } from "sonner";

export const userKeys = {
  all: ["users"] as const,
  list: () => [...userKeys.all, "list"] as const,
  details: (id: number) => [...userKeys.all, "detail", id] as const,
};

export function useUsers() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: userKeys.list(),
    queryFn: () => userService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (params: CreateUserParams) => userService.create(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
      toast.success("User created successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create user");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, params }: { id: number; params: Partial<CreateUserParams> }) => 
      userService.update(id, params),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
      queryClient.invalidateQueries({ queryKey: userKeys.details(id) });
      toast.success("User updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update user");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
      toast.success("User deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete user");
    },
  });

  return {
    users: query.data,
    isLoading: query.isLoading,
    error: query.error,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.details(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
  });
}

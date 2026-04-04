"use client";

import React, { useState } from "react";
import { useUsers } from "@/entities/user/api/use-users";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { UserForm } from "@/features/user/components/user-form";
import { Plus, Pencil, Trash2, Users, Shield, User as UserIcon } from "lucide-react";
import { User, UserRole, CreateUserParams } from "@/shared/api/services/user.service";
import { clsx } from "clsx";

export default function UsersPage() {
  const { users = [], isLoading, createMutation, updateMutation, deleteMutation } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleCreate = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  const handleUpdate = (values: any) => {
    if (editingUser) {
      updateMutation.mutate(
        { id: editingUser.id, params: values },
        { onSuccess: () => setIsModalOpen(false) }
      );
    }
  };

  const columns = [
    {
      header: "Member Info",
      accessor: (item: User) => (
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200 shadow-sm overflow-hidden text-zinc-400">
            <UserIcon className="h-5 w-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-black text-zinc-900 truncate tracking-tight">{item.name || "Unnamed"}</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest truncate">{item.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Access Role",
      accessor: (item: User) => (
        <span className={clsx(
          "inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ring-1",
          item.role === UserRole.ADMIN 
            ? "bg-red-50 text-red-600 ring-red-100" 
            : item.role === UserRole.MODERATOR 
              ? "bg-indigo-50 text-indigo-600 ring-indigo-100"
              : "bg-zinc-100 text-zinc-600 ring-zinc-200"
        )}>
          {item.role === UserRole.ADMIN ? <Shield className="h-2.5 w-2.5 mr-1" /> : null}
          {item.role}
        </span>
      ),
    },
    {
      header: "Workplace",
      accessor: (item: User) => (
        <div className="flex items-center gap-2">
          {item.university ? (
            <>
              <div className="h-6 w-6 rounded-lg border border-zinc-100 overflow-hidden shadow-sm">
                {item.university.logo && <img src={item.university.logo} alt="" className="h-full w-full object-cover" />}
              </div>
              <span className="text-xs font-bold text-zinc-600 truncate max-w-[150px]">{item.university.nameRu}</span>
            </>
          ) : (
            <span className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">Global Access</span>
          )}
        </div>
      ),
    },
    {
      header: "Joined At",
      accessor: (item: User) => (
        <span className="text-[10px] font-bold text-zinc-400 tabular-nums">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: User) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setEditingUser(item);
              setIsModalOpen(true);
            }}
            className="p-2 hover:bg-zinc-100 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900 shadow-sm"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this user?")) {
                deleteMutation.mutate(item.id);
              }
            }}
            className="p-2 hover:bg-red-50 rounded-xl transition-colors text-zinc-400 hover:text-red-500 shadow-sm"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-600" />
            Team Management
          </h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Manage platform administrators and university moderators</p>
        </div>
        <Button 
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-500/20 transition-transform active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Add Member
        </Button>
      </div>

      <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden p-2">
        <DataTable data={users} columns={columns} isLoading={isLoading} />
      </div>

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Update Profile" : "Create Account"}
        className="max-w-2xl"
      >
        <UserForm
          initialValues={editingUser ? {
            email: editingUser.email,
            name: editingUser.name,
            role: editingUser.role,
            universityId: editingUser.universityId,
          } : undefined}
          onSubmit={editingUser ? handleUpdate : handleCreate}
          isLoading={createMutation.isPending || updateMutation.isPending}
          submitLabel={editingUser ? "Update Profile" : "Create Member"}
          isEditing={!!editingUser}
        />
      </Dialog>
    </div>
  );
}
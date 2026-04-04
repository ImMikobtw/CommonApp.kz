"use client";

import React, { useState } from "react";
import { useSpecialties } from "@/entities/specialty/api/use-specialties";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { SpecialtyForm } from "@/features/specialty/components/specialty-form";
import { Plus, Pencil, Trash2, Search, BookOpen, Hash } from "lucide-react";
import { Specialty } from "@/shared/api/services/specialty.service";

export default function SpecialtiesPage() {
  const { specialties, isLoading, createMutation, updateMutation, deleteMutation } = useSpecialties();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null);

  const handleCreate = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  const handleUpdate = (values: any) => {
    if (editingSpecialty) {
      updateMutation.mutate(
        { id: editingSpecialty.id, params: values },
        { onSuccess: () => setIsModalOpen(false) }
      );
    }
  };

  const columns = [
    {
      header: "Code",
      accessor: (item: Specialty) => (
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center">
            <Hash className="h-4 w-4 text-zinc-500" />
          </div>
          <span className="font-black text-zinc-900 tracking-wider">{item.code}</span>
        </div>
      ),
    },
    {
      header: "Specialty Name",
      accessor: (item: Specialty) => (
        <div className="flex flex-col">
          <span className="font-bold text-zinc-900">{item.nameRu}</span>
          <span className="text-[10px] text-zinc-400 font-medium uppercase tracking-wider">{item.nameKz}</span>
        </div>
      ),
    },
    {
      header: "Programs",
      accessor: (item: Specialty) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-600 ring-1 ring-zinc-200">
          {item._count?.programs || 0} Programs
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (item: Specialty) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setEditingSpecialty(item);
              setIsModalOpen(true);
            }}
            className="p-2 hover:bg-zinc-100 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this specialty?")) {
                deleteMutation.mutate(item.id);
              }
            }}
            className="p-2 hover:bg-red-50 rounded-xl transition-colors text-zinc-400 hover:text-red-500"
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
            <BookOpen className="h-8 w-8 text-indigo-600" />
            Specialties
          </h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Manage educational specialties and their localizations</p>
        </div>
        <Button 
          onClick={() => {
            setEditingSpecialty(null);
            setIsModalOpen(true);
          }}
          className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-500/20"
        >
          <Plus className="h-5 w-5" />
          Add Specialty
        </Button>
      </div>

      <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden p-2">
        <DataTable data={specialties || []} columns={columns} isLoading={isLoading} />
      </div>

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSpecialty ? "Edit Specialty" : "Add Specialty"}
      >
        <SpecialtyForm
          initialValues={editingSpecialty || undefined}
          onSubmit={editingSpecialty ? handleUpdate : handleCreate}
          isLoading={createMutation.isPending || updateMutation.isPending}
          submitLabel={editingSpecialty ? "Update Specialty" : "Create Specialty"}
        />
      </Dialog>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { usePrograms } from "@/entities/program/api/use-programs";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ProgramForm } from "@/features/program/components/program-form";
import { Plus, Pencil, Trash2, GraduationCap, Trophy, Hash, Languages, School, BookOpen } from "lucide-react";
import { Program } from "@/shared/api/services/program.service";

export default function ProgramsPage() {
  const { programs, isLoading, createMutation, updateMutation, deleteMutation } = usePrograms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const handleCreate = (values: any) => {
    createMutation.mutate(values, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  const handleUpdate = (values: any) => {
    if (editingProgram) {
      updateMutation.mutate(
        { id: editingProgram.id, params: values },
        { onSuccess: () => setIsModalOpen(false) }
      );
    }
  };

  const columns = [
    {
      header: "Program & University",
      accessor: (item: Program) => (
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200 shadow-sm overflow-hidden">
            {item.university?.logo ? (
              <img src={item.university.logo} alt="" className="h-full w-full object-cover" />
            ) : (
              <School className="h-5 w-5 text-zinc-400" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-black text-zinc-900 truncate tracking-tight">{item.nameRu}</span>
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest truncate">{item.university?.nameRu}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Specialty",
      accessor: (item: Program) => (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black bg-zinc-900 text-white px-1.5 py-0.5 rounded uppercase tracking-widest">
              {item.specialty?.code}
            </span>
            <span className="font-bold text-zinc-700 text-xs truncate max-w-[150px]">{item.specialty?.nameRu}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Admission Stats",
      accessor: (item: Program) => (
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter flex items-center gap-1">
              <Trophy className="h-2.5 w-2.5 text-yellow-500" /> Grants
            </span>
            <span className="font-black text-zinc-900">{item.grantCount}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter flex items-center gap-1">
              <Hash className="h-2.5 w-2.5 text-indigo-500" /> Min Pts
            </span>
            <span className="font-black text-zinc-900">{item.minPoints}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Degree & Lang",
      accessor: (item: Program) => (
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 w-fit">
            {item.degree}
          </span>
          <div className="flex gap-1">
            {item.languages.map((lang) => (
              <span key={lang} className="text-[8px] font-bold text-zinc-400 uppercase">{lang}</span>
            ))}
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: (item: Program) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setEditingProgram(item);
              setIsModalOpen(true);
            }}
            className="p-2 hover:bg-zinc-100 rounded-xl transition-colors text-zinc-400 hover:text-zinc-900 shadow-sm"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this program?")) {
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
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            Educational Programs
          </h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Manage localized programs, degree levels, and admission statistics</p>
        </div>
        <Button 
          onClick={() => {
            setEditingProgram(null);
            setIsModalOpen(true);
          }}
          className="rounded-2xl px-6 py-6 font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-500/20"
        >
          <Plus className="h-5 w-5" />
          Add Program
        </Button>
      </div>

      <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden p-2">
        <DataTable data={programs || []} columns={columns} isLoading={isLoading} />
      </div>

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProgram ? "Edit Program" : "Add Program"}
        className="max-w-3xl"
      >
        <ProgramForm
          initialValues={editingProgram ? {
            nameRu: editingProgram.nameRu,
            nameKz: editingProgram.nameKz,
            nameEn: editingProgram.nameEn,
            universityId: editingProgram.universityId,
            specialtyId: editingProgram.specialtyId,
            grantCount: editingProgram.grantCount,
            minPoints: editingProgram.minPoints,
            degree: editingProgram.degree,
            languages: editingProgram.languages,
          } : undefined}
          onSubmit={editingProgram ? handleUpdate : handleCreate}
          isLoading={createMutation.isPending || updateMutation.isPending}
          submitLabel={editingProgram ? "Update Program" : "Create Program"}
        />
      </Dialog>
    </div>
  );
}
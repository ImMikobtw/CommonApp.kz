"use client";

import { useState } from "react";
import { 
  useUniversities, 
  useCreateUniversity, 
  useUpdateUniversity, 
  useDeleteUniversity 
} from "../../../entities/university/api/use-universities";
import { DataTable } from "../../../components/ui/data-table";
import { Button } from "../../../components/ui/button";
import { PageHeader } from "../../../components/ui/page-header";
import { Dialog } from "../../../components/ui/dialog";
import { UniversityForm } from "../../../features/university/components/university-form";
import { UniversitySpecialtiesManager } from "../../../features/university/components/university-specialties-manager";
import { University, Edit2, Trash2, Globe, MapPin, GraduationCap } from "lucide-react";
import { University as IUniversity } from "../../../shared/api/services/university.service";

export default function UniversitiesPage() {
  const { data = [], isLoading } = useUniversities();
  const createMutation = useCreateUniversity();
  const updateMutation = useUpdateUniversity();
  const deleteMutation = useDeleteUniversity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState<IUniversity | null>(null);
  const [managingSpecialtiesFor, setManagingSpecialtiesFor] = useState<IUniversity | null>(null);

  const handleCreate = () => {
    setEditingUniversity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (university: IUniversity) => {
    setEditingUniversity(university);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this university? This action cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (values: any) => {
    if (editingUniversity) {
      updateMutation.mutate(
        { id: editingUniversity.id, params: values },
        { onSuccess: () => setIsModalOpen(false) }
      );
    } else {
      createMutation.mutate(values, {
        onSuccess: () => setIsModalOpen(false),
      });
    }
  };

  const columns = [
    {
      header: "University",
      accessor: (item: IUniversity) => (
        <div className="flex items-center gap-4">
          {item.logo ? (
            <img src={item.logo} alt={item.nameRu} className="h-12 w-12 rounded-2xl object-cover shadow-sm ring-1 ring-black/5" />
          ) : (
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center shadow-inner ring-1 ring-indigo-100">
              <University className="h-6 w-6 text-indigo-300" />
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-zinc-900 tracking-tight">{item.nameRu}</span>
              {item.code && (
                <span className="text-[9px] font-black bg-zinc-900 text-white px-1.5 py-0.5 rounded uppercase tracking-widest">
                  #{item.code}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1 text-zinc-400">
              <MapPin className="h-3 w-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest truncate max-w-[200px]">
                {item.address || "No address set"}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Programs",
      accessor: (item: IUniversity) => (
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/50 w-fit">
            {item._count?.programs || 0} Programs
          </span>
          <div className="flex flex-wrap gap-1">
            {item.services?.slice(0, 2).map((s, i) => (
              <span key={i} className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">
                • {s}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      accessor: (item: IUniversity) => (
        <div className="flex items-center justify-end gap-2">
          {item.website && (
            <a 
              href={item.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title="Visit Website"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          <button 
            onClick={() => setManagingSpecialtiesFor(item)}
            className="p-2 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
            title="Manage Specialties"
          >
            <GraduationCap className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleEdit(item)}
            className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDelete(item.id)}
            className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Universities"
        description="Manage institutions, locations, and program catalogs."
        action={
          <Button 
            className="rounded-2xl px-6 py-6 font-bold shadow-lg shadow-black/5" 
            onClick={handleCreate}
          >
            Add university
          </Button>
        }
      />

      <DataTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No universities found. Start by adding a new one."
      />

      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUniversity ? "Edit University" : "Add New University"}
      >
        <UniversityForm
          initialValues={editingUniversity || undefined}
          onSubmit={onSubmit}
          isLoading={createMutation.isPending || updateMutation.isPending}
          submitLabel={editingUniversity ? "Update University" : "Create University"}
        />
      </Dialog>
      
      {managingSpecialtiesFor && (
        <Dialog
          isOpen={true}
          onClose={() => setManagingSpecialtiesFor(null)}
          title={`Specialties for ${managingSpecialtiesFor.abbrRu || managingSpecialtiesFor.nameRu}`}
        >
          <UniversitySpecialtiesManager universityId={managingSpecialtiesFor.id} />
        </Dialog>
      )}
    </div>
  );
}
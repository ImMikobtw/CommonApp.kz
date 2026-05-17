"use client";

import { use } from "react";
import { useUniversity } from "../../../../entities/university/api/use-universities";
import { PageHeader } from "../../../../components/ui/page-header";
import { Button } from "../../../../components/ui/button";
import { UniversitySpecialtiesManager } from "../../../../features/university/components/university-specialties-manager";
import { Dialog } from "../../../../components/ui/dialog";
import { useState } from "react";
import {
  University,
  Globe,
  MapPin,
  Phone,
  ArrowLeft,
  Edit2,
  GraduationCap,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function UniversityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const numericId = Number(id);
  const { data: university, isLoading } = useUniversity(numericId);
  const [showSpecialties, setShowSpecialties] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!university) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <University className="h-16 w-16 text-zinc-200" />
        <p className="text-zinc-500 font-bold">University not found</p>
        <Link href="/universities">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Universities
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={university.nameRu}
        description={university.descriptionRu || "No description provided."}
        action={
          <div className="flex items-center gap-3">
            <Link href="/universities">
              <Button className="rounded-2xl px-5 py-5 font-bold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 shadow-none">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <Button
              className="rounded-2xl px-5 py-5 font-bold shadow-lg shadow-emerald-500/10 bg-emerald-500 hover:bg-emerald-600"
              onClick={() => setShowSpecialties(true)}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Specialties
            </Button>
            <Link href={`/universities/${id}/edit`}>
              <Button className="rounded-2xl px-5 py-5 font-bold shadow-lg shadow-indigo-500/10">
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-zinc-100 p-8 space-y-6">
          <div className="flex items-center gap-6">
            {university.logo ? (
              <img
                src={university.logo}
                alt={university.nameRu}
                className="h-20 w-20 rounded-3xl object-cover shadow-md ring-1 ring-black/5"
              />
            ) : (
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center shadow-inner ring-1 ring-indigo-100">
                <University className="h-10 w-10 text-indigo-300" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-black text-zinc-900 tracking-tight">
                {university.nameRu}
              </h2>
              {university.nameKz && (
                <p className="text-sm text-zinc-400 font-medium mt-1">
                  {university.nameKz}
                </p>
              )}
              {university.code && (
                <span className="inline-block mt-2 text-[9px] font-black bg-zinc-900 text-white px-2 py-0.5 rounded uppercase tracking-widest">
                  #{university.code}
                </span>
              )}
            </div>
          </div>

          {university.descriptionRu && (
            <div>
              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                Description
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                {university.descriptionRu}
              </p>
            </div>
          )}

          {university.services && university.services.length > 0 && (
            <div>
              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">
                Services
              </h3>
              <div className="flex flex-wrap gap-2">
                {university.services.map((service, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200/50"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side Info Card */}
        <div className="bg-white rounded-3xl border border-zinc-100 p-8 space-y-6">
          <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">
            Contact Info
          </h3>

          {university.address && (
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
              <span className="text-sm text-zinc-600 font-medium">
                {university.address}
              </span>
            </div>
          )}

          {university.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-zinc-400 shrink-0" />
              <span className="text-sm text-zinc-600 font-medium">
                {university.phone}
              </span>
            </div>
          )}

          {university.website && (
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-zinc-400 shrink-0" />
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 font-medium hover:underline truncate"
              >
                {university.website}
              </a>
            </div>
          )}

          <div className="pt-4 border-t border-zinc-100">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">
              Stats
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50">
                {university._count?.programs || 0} Programs
              </span>
            </div>
          </div>
        </div>
      </div>

      {showSpecialties && (
        <Dialog
          isOpen={true}
          onClose={() => setShowSpecialties(false)}
          title={`Specialties for ${university.abbrRu || university.nameRu}`}
        >
          <UniversitySpecialtiesManager universityId={university.id} />
        </Dialog>
      )}
    </div>
  );
}

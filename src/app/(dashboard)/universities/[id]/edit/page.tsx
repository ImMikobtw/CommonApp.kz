"use client";

import { use } from "react";
import {
  useUniversity,
  useUpdateUniversity,
} from "../../../../../entities/university/api/use-universities";
import { PageHeader } from "../../../../../components/ui/page-header";
import { Button } from "../../../../../components/ui/button";
import { UniversityForm } from "../../../../../features/university/components/university-form";
import { ArrowLeft, Loader2, University } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UniversityEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const numericId = Number(id);
  const { data: university, isLoading } = useUniversity(numericId);
  const updateMutation = useUpdateUniversity();
  const router = useRouter();

  const onSubmit = (values: any) => {
    updateMutation.mutate(
      { id: numericId, params: values },
      {
        onSuccess: () => {
          router.push(`/universities/${id}`);
        },
      }
    );
  };

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
        title={`Edit — ${university.abbrRu || university.nameRu}`}
        description="Update university details, contacts, and services."
        action={
          <Link href={`/universities/${id}`}>
            <Button className="rounded-2xl px-5 py-5 font-bold bg-zinc-100 text-zinc-700 hover:bg-zinc-200 shadow-none">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </Link>
        }
      />

      <div className="max-w-3xl">
        <div className="bg-white rounded-3xl border border-zinc-100 p-8">
          <UniversityForm
            initialValues={university}
            onSubmit={onSubmit}
            isLoading={updateMutation.isPending}
            submitLabel="Update University"
          />
        </div>
      </div>
    </div>
  );
}

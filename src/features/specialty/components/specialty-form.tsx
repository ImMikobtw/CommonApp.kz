"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { specialtySchema, SpecialtyFormValues } from "../../../entities/specialty/model/specialty.schema";
import { Button } from "../../../components/ui/button";
import { Hash, Languages, Info } from "lucide-react";
import { clsx } from "clsx";

interface SpecialtyFormProps {
  initialValues?: Partial<SpecialtyFormValues>;
  onSubmit: (values: SpecialtyFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

type Tab = "ru" | "kz" | "en";

export function SpecialtyForm({
  initialValues,
  onSubmit,
  isLoading,
  submitLabel = "Save",
}: SpecialtyFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("ru");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpecialtyFormValues>({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      code: initialValues?.code ?? "",
      nameRu: initialValues?.nameRu ?? "",
      nameKz: initialValues?.nameKz ?? "",
      nameEn: initialValues?.nameEn ?? "",
      descriptionRu: initialValues?.descriptionRu ?? "",
      descriptionKz: initialValues?.descriptionKz ?? "",
      descriptionEn: initialValues?.descriptionEn ?? "",
    },
  });

  const tabs: { id: Tab; label: string }[] = [
    { id: "ru", label: "Russian" },
    { id: "kz", label: "Kazakh" },
    { id: "en", label: "English" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8 pr-2">
      {/* General Settings */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-2">
          <Hash className="h-4 w-4 text-indigo-500" />
          General Settings
        </h3>
        
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">
            Specialty Code
          </label>
          <input
            {...register("code")}
            placeholder="e.g. B057"
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
            disabled={isLoading}
          />
          {errors.code && (
            <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.code.message}</p>
          )}
        </div>
      </div>

      <div className="h-px bg-zinc-100" />

      {/* Tab Switcher */}
      <div className="flex p-1.5 bg-zinc-100 rounded-2xl w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300",
              activeTab === tab.id
                ? "bg-white text-zinc-900 shadow-sm ring-1 ring-black/5"
                : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200/50"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <Languages className="h-3.5 w-3.5" />
              {tab.label}
            </div>
          </button>
        ))}
      </div>

      {/* Localized Fields */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {tabs.map((tab) => (
          <div key={tab.id} className={clsx("grid gap-6", activeTab !== tab.id && "hidden")}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">
                Specialty Name ({tab.label})
              </label>
              <input
                {...register(tab.id === "ru" ? "nameRu" : tab.id === "kz" ? "nameKz" : "nameEn")}
                placeholder={`Enter name in ${tab.label}...`}
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
                disabled={isLoading}
              />
              {errors[tab.id === "ru" ? "nameRu" : tab.id === "kz" ? "nameKz" : "nameEn"] && (
                <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                  {errors[tab.id === "ru" ? "nameRu" : tab.id === "kz" ? "nameKz" : "nameEn"]?.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">
                Description ({tab.label})
              </label>
              <textarea
                {...register(tab.id === "ru" ? "descriptionRu" : tab.id === "kz" ? "descriptionKz" : "descriptionEn")}
                placeholder="Provide a detailed description..."
                rows={4}
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 resize-none font-medium h-32"
                disabled={isLoading}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 pt-6 pb-2 bg-white/80 backdrop-blur-md">
        <Button
          type="submit"
          className="w-full py-5 text-base font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 rounded-2xl"
          disabled={isLoading}
        >
          {isLoading ? "Saving Specialty..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

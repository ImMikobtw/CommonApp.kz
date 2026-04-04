"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { programSchema, ProgramFormValues } from "../../../entities/program/model/program.schema";
import { useUniversityOptions } from "../../../entities/university/api/use-universities";
import { useSpecialtyOptions } from "../../../entities/specialty/api/use-specialties";
import { Button } from "../../../components/ui/button";
import { School, Layers, Languages, Trophy, Hash } from "lucide-react";
import { clsx } from "clsx";

interface ProgramFormProps {
  initialValues?: Partial<ProgramFormValues>;
  onSubmit: (values: ProgramFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

type Tab = "ru" | "kz" | "en";

const DEGREE_OPTIONS = [
  { value: "BACHELOR", label: "Bachelor" },
  { value: "MASTER", label: "Master" },
  { value: "PHD", label: "PhD" },
];

const LANGUAGE_OPTIONS = [
  { value: "RU", label: "Russian" },
  { value: "KZ", label: "Kazakh" },
  { value: "EN", label: "English" },
];

export function ProgramForm({
  initialValues,
  onSubmit,
  isLoading,
  submitLabel = "Save",
}: ProgramFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("ru");
  const { data: universities = [] } = useUniversityOptions();
  const { data: specialties = [] } = useSpecialtyOptions();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      nameRu: initialValues?.nameRu ?? "",
      nameKz: initialValues?.nameKz ?? "",
      nameEn: initialValues?.nameEn ?? "",
      universityId: initialValues?.universityId ?? 0,
      specialtyId: initialValues?.specialtyId ?? 0,
      grantCount: initialValues?.grantCount ?? 0,
      minPoints: initialValues?.minPoints ?? 0,
      degree: initialValues?.degree ?? "BACHELOR",
      languages: initialValues?.languages ?? ["RU"],
    },
  });

  const selectedLanguages = watch("languages") || [];

  const handleLanguageToggle = (lang: string) => {
    const newLangs = selectedLanguages.includes(lang)
      ? selectedLanguages.filter((l) => l !== lang)
      : [...selectedLanguages, lang];
    setValue("languages", newLangs);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "ru", label: "Russian" },
    { id: "kz", label: "Kazakh" },
    { id: "en", label: "English" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8 pr-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
      {/* General Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-2">
            <School className="h-4 w-4 text-indigo-500" />
            University & Degree
          </h3>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">
              Select University
            </label>
            <select
              {...register("universityId", { valueAsNumber: true })}
              className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium appearance-none bg-white"
            >
              <option value={0}>Select a university...</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>{u.nameRu}</option>
              ))}
            </select>
            {errors.universityId && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.universityId.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">
              Academic Degree
            </label>
            <div className="flex gap-2">
              {DEGREE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setValue("degree", opt.value)}
                  className={clsx(
                    "flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all",
                    watch("degree") === opt.value
                      ? "bg-black text-white shadow-lg"
                      : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-500" />
            Specialty & Stats
          </h3>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">
              Select Specialty
            </label>
            <select
              {...register("specialtyId", { valueAsNumber: true })}
              className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium appearance-none bg-white"
            >
              <option value={0}>Select a specialty...</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>[{s.code}] {s.nameRu}</option>
              ))}
            </select>
            {errors.specialtyId && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.specialtyId.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
                <Trophy className="h-3 w-3" /> Grants
              </label>
              <input
                type="number"
                {...register("grantCount", { valueAsNumber: true })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
                <Hash className="h-3 w-3" /> Min Pts
              </label>
              <input
                type="number"
                {...register("minPoints", { valueAsNumber: true })}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-zinc-100" />

      {/* Language Selection */}
      <div className="space-y-4">
        <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-2">
          <Languages className="h-4 w-4 text-orange-500" />
          Languages of Instruction
        </h3>
        <div className="flex flex-wrap gap-2">
          {LANGUAGE_OPTIONS.map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => handleLanguageToggle(lang.value)}
              className={clsx(
                "px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                selectedLanguages.includes(lang.value)
                  ? "bg-zinc-900 text-white shadow-xl shadow-black/10 ring-4 ring-black/5"
                  : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
        {errors.languages && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.languages.message}</p>}
      </div>

      <div className="h-px bg-zinc-100" />

      {/* Tab Switcher for Names */}
      <div className="space-y-6">
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
              {tab.label} Name
            </button>
          ))}
        </div>

        {tabs.map((tab) => (
          <div key={tab.id} className={clsx("animate-in fade-in slide-in-from-bottom-2 duration-500", activeTab !== tab.id && "hidden")}>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">
                Program Title ({tab.label})
              </label>
              <input
                {...register(tab.id === "ru" ? "nameRu" : tab.id === "kz" ? "nameKz" : "nameEn")}
                placeholder={`Name this program in ${tab.label}...`}
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 font-medium"
              />
              {errors[tab.id === "ru" ? "nameRu" : tab.id === "kz" ? "nameKz" : "nameEn"] && (
                <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">
                  {errors[tab.id === "ru" ? "nameRu" : tab.id === "kz" ? "nameKz" : "nameEn"]?.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 pt-6 bg-white/80 backdrop-blur-md">
        <Button
          type="submit"
          className="w-full py-6 text-base font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 rounded-2xl"
          disabled={isLoading}
        >
          {isLoading ? "Saving Program..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

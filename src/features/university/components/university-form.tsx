"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { universitySchema, UniversityFormValues } from "../../../entities/university/model/university.schema";
import { Button } from "../../../components/ui/button";
import { Globe, Phone, MapPin, Hash, Plus, Languages } from "lucide-react";
import { clsx } from "clsx";

interface UniversityFormProps {
  initialValues?: Partial<UniversityFormValues>;
  onSubmit: (values: UniversityFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

type Tab = "ru" | "kz" | "en";

export function UniversityForm({
  initialValues,
  onSubmit,
  isLoading,
  submitLabel = "Save",
}: UniversityFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>("ru");
  const [newService, setNewService] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UniversityFormValues>({
    resolver: zodResolver(universitySchema),
    defaultValues: {
      nameRu: initialValues?.nameRu || "",
      nameKz: initialValues?.nameKz || "",
      nameEn: initialValues?.nameEn || "",
      abbrRu: initialValues?.abbrRu || "",
      abbrKz: initialValues?.abbrKz || "",
      abbrEn: initialValues?.abbrEn || "",
      descriptionRu: initialValues?.descriptionRu ?? "",
      descriptionKz: initialValues?.descriptionKz ?? "",
      descriptionEn: initialValues?.descriptionEn ?? "",
      logo: initialValues?.logo ?? "",
      website: initialValues?.website ?? "",
      phone: initialValues?.phone ?? "",
      address: initialValues?.address ?? "",
      code: initialValues?.code ?? "",
      services: initialValues?.services ?? [],
    },
  });

  const services = watch("services") || [];

  const addService = () => {
    const trimmed = newService.trim();
    if (trimmed && !services.includes(trimmed)) {
      setValue("services", [...services, trimmed]);
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    setValue("services", services.filter((_, i) => i !== index));
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "ru", label: "Russian" },
    { id: "kz", label: "Kazakh" },
    { id: "en", label: "English" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-8 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
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
                University Name ({tab.label})
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
                Abbreviation ({tab.label})
              </label>
              <input
                {...register(tab.id === "ru" ? "abbrRu" : tab.id === "kz" ? "abbrKz" : "abbrEn")}
                placeholder="e.g. KazNU"
                className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
                disabled={isLoading}
              />
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

      <div className="h-px bg-zinc-100" />

      {/* General Information */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-2">
          <Globe className="h-4 w-4 text-indigo-500" />
          General Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1.5">
              University Code
            </label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                {...register("code")}
                placeholder="001"
                className="w-full rounded-2xl border border-zinc-200 pl-11 pr-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                {...register("phone")}
                placeholder="+7 (___) ___ __ __"
                className="w-full rounded-2xl border border-zinc-200 pl-11 pr-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1.5">
            Website URL
          </label>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              {...register("website")}
              placeholder="https://..."
              className="w-full rounded-2xl border border-zinc-200 pl-11 pr-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
              disabled={isLoading}
            />
          </div>
          {errors.website && (
            <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.website.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1.5">
            Full Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              {...register("address")}
              placeholder="City, Street, House number"
              className="w-full rounded-2xl border border-zinc-200 pl-11 pr-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1">
            Logo URL
          </label>
          <input
            {...register("logo")}
            placeholder="https://example.com/logo.png"
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
            disabled={isLoading}
          />
          {errors.logo && (
            <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.logo.message}</p>
          )}
        </div>
      </div>

      <div className="h-px bg-zinc-100" />

      {/* Services & Features */}
      <div className="space-y-6 pb-4">
        <h3 className="text-xs font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-2">
          <Plus className="h-4 w-4 text-emerald-500" />
          Services & Features
        </h3>
        
        <div className="flex gap-2">
          <input
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
            placeholder="e.g. Free Wi-Fi, Military Dept"
            className="flex-1 rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-medium"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={addService}
            className="px-6 rounded-2xl bg-zinc-900 text-white font-bold transition hover:bg-black disabled:opacity-50"
            disabled={isLoading || !newService.trim()}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 rounded-xl text-xs font-bold border border-zinc-200 transition-all hover:bg-white hover:shadow-sm"
            >
              {service}
              <button
                type="button"
                onClick={() => removeService(index)}
                className="text-zinc-400 hover:text-red-500 transition-colors"
              >
                <Plus className="h-3.5 w-3.5 rotate-45" />
              </button>
            </div>
          ))}
          {services.length === 0 && (
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest py-2">
              No services added yet
            </p>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 pt-6 pb-2 bg-white/80 backdrop-blur-md">
        <Button
          type="submit"
          className="w-full py-5 text-base font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 rounded-2xl"
          disabled={isLoading}
        >
          {isLoading ? "Saving University..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

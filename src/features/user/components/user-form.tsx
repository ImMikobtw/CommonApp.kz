"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserRole, CreateUserParams } from "../../../shared/api/services/user.service";
import { useUniversityOptions } from "../../../entities/university/api/use-universities";
import { Button } from "../../../components/ui/button";
import { User, Mail, Shield, School, Lock, Fingerprint } from "lucide-react";
import { clsx } from "clsx";

interface UserFormProps {
  initialValues?: Partial<CreateUserParams>;
  onSubmit: (values: CreateUserParams) => void;
  isLoading?: boolean;
  submitLabel?: string;
  isEditing?: boolean;
}

export function UserForm({
  initialValues,
  onSubmit,
  isLoading,
  submitLabel = "Save Account",
  isEditing = false,
}: UserFormProps) {
  const { data: universities = [] } = useUniversityOptions();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateUserParams>({
    defaultValues: {
      email: initialValues?.email ?? "",
      name: initialValues?.name ?? "",
      role: initialValues?.role ?? UserRole.USER,
      universityId: initialValues?.universityId ?? undefined,
      password: "",
    },
  });

  const selectedRole = watch("role");

  // Reset university if role changes from MODERATOR
  useEffect(() => {
    if (selectedRole !== UserRole.MODERATOR) {
      setValue("universityId", undefined);
    }
  }, [selectedRole, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
            <Mail className="h-3 w-3" /> Email Address
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            disabled={isEditing}
            placeholder="admin@commonapp.kz"
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:bg-zinc-50 disabled:text-zinc-400 font-medium"
          />
          {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.email.message}</p>}
        </div>

        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
            <Fingerprint className="h-3 w-3" /> Full Name
          </label>
          <input
            {...register("name")}
            placeholder="John Doe"
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Selection */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
            <Shield className="h-3 w-3" /> System Role
          </label>
          <div className="flex p-1.5 bg-zinc-100 rounded-2xl w-full">
            {Object.values(UserRole).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setValue("role", role)}
                className={clsx(
                  "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300",
                  selectedRole === role
                    ? "bg-white text-zinc-900 shadow-sm ring-1 ring-black/5"
                    : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50"
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Password (Optional for editing) */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
            <Lock className="h-3 w-3" /> {isEditing ? "New Password (Optional)" : "Password"}
          </label>
          <input
            {...register("password", { required: !isEditing })}
            type="password"
            placeholder={isEditing ? "••••••••" : "Min 6 characters"}
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 font-medium"
          />
          {errors.password && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.password.message}</p>}
        </div>
      </div>

      {/* University Link (Only for Moderators) */}
      {selectedRole === UserRole.MODERATOR && (
        <div className="space-y-4 pt-4 border-t border-dashed border-zinc-200 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] ml-1 flex items-center gap-1">
              <School className="h-3 w-3 text-indigo-500" /> Linked University
            </label>
            <select
              {...register("universityId", { valueAsNumber: true })}
              className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 font-medium appearance-none bg-white"
            >
              <option value="">Select university for this moderator...</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>{u.nameRu}</option>
              ))}
            </select>
            {errors.universityId && <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-wider">{errors.universityId.message}</p>}
          </div>
          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider leading-relaxed">
              Note: Moderators can only see and manage data belonging to their assigned university.
            </p>
          </div>
        </div>
      )}

      <div className="pt-6">
        <Button
          type="submit"
          className="w-full py-6 text-base font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 rounded-2xl"
          disabled={isLoading}
        >
          {isLoading ? "Saving Account..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

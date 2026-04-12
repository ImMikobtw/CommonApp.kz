"use client";

import { Bell, Search, LogOut, Loader2, User as UserIcon } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useState, useRef, useEffect } from "react";

export function AppHeader() {
  const { user, isLoadingSession, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-surface-200/60 bg-white/70 px-6 backdrop-blur-xl md:px-10">
      <div className="flex items-center gap-4">
        <div className="hidden md:flex md:items-center md:gap-3 rounded-2xl border border-surface-200 bg-white/50 px-4 py-2.5 transition-all focus-within:ring-2 focus-within:ring-brand-primary/10 focus-within:border-brand-primary/20">
          <Search className="h-4 w-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none outline-none text-sm text-surface-900 placeholder:text-surface-400 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-surface-200 bg-white shadow-sm transition-all hover:bg-surface-50 active:scale-95 group"
        >
          <Bell className="h-5 w-5 text-surface-600 group-hover:text-brand-primary transition-colors" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-brand-primary border-2 border-white" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 rounded-2xl border border-surface-200 bg-white p-1.5 pr-4 shadow-sm transition-all hover:border-brand-primary/20 group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark text-sm font-bold text-white shadow-premium relative overflow-hidden">
              {isLoadingSession ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                user?.full_name?.charAt(0).toUpperCase() || <UserIcon className="h-4 w-4" />
              )}
            </div>

            <div className="hidden sm:inline-flex flex-col items-start">
              {isLoadingSession ? (
                <>
                  <div className="h-3 w-16 bg-surface-200 rounded animate-pulse mb-1"></div>
                  <div className="h-2.5 w-20 bg-surface-100 rounded animate-pulse mt-0.5"></div>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-surface-900 leading-none group-hover:text-brand-primary transition-colors max-w-[120px] truncate">
                    {user?.full_name || "Guest"}
                  </p>
                  <p className="text-[11px] font-medium text-surface-400 leading-none mt-1 uppercase tracking-wider">
                    {user?.role?.replace("_", " ") || "Guest Role"}
                  </p>
                </>
              )}
            </div>
          </button>

          {isDropdownOpen && user && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-surface-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 z-50">
              <div className="px-2 py-1.5 border-b border-surface-100 mb-1">
                <p className="text-sm font-medium text-surface-900 truncate">{user.email}</p>
              </div>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                }}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
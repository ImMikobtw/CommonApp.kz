import React, { useState, useMemo } from "react";
import { useUniversitySpecialties, useLinkSpecialty, useUnlinkSpecialty } from "../../../entities/university/api/use-universities";
import { useSpecialties } from "../../../entities/specialty/api/use-specialties";
import { Button } from "../../../components/ui/button";
import { Check, Search, GraduationCap, Link2, Unlink, Plus } from "lucide-react";
import { clsx } from "clsx";

interface UniversitySpecialtiesManagerProps {
  universityId: number;
}

export function UniversitySpecialtiesManager({ universityId }: UniversitySpecialtiesManagerProps) {
  const { data: linkedSpecialties = [], isLoading: isLoadingLinked } = useUniversitySpecialties(universityId);
  const { specialties: allSpecialties = [], isLoading: isLoadingAll } = useSpecialties();
  const linkMutation = useLinkSpecialty();
  const unlinkMutation = useUnlinkSpecialty();

  const [searchQuery, setSearchQuery] = useState("");

  const linkedIds = useMemo(() => new Set(linkedSpecialties.map(s => s.id)), [linkedSpecialties]);

  const filteredSpecialties = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allSpecialties.filter(sp => 
      sp.nameRu?.toLowerCase().includes(query) || 
      sp.code?.toLowerCase().includes(query)
    );
  }, [allSpecialties, searchQuery]);

  const toggleSpecialty = (specialtyId: number) => {
    if (linkedIds.has(specialtyId)) {
      unlinkMutation.mutate({ universityId, specialtyId });
    } else {
      linkMutation.mutate({ universityId, specialtyId });
    }
  };

  if (isLoadingLinked || isLoadingAll) {
    return <div className="p-8 text-center text-sm font-bold text-zinc-400 animate-pulse">Loading specialties...</div>;
  }

  return (
    <div className="space-y-6 flex flex-col h-[60vh]">
      <div className="relative shrink-0">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
        <input
          type="text"
          placeholder="Search global specialties by name or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-zinc-200 pl-11 pr-5 py-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 font-medium"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
        {filteredSpecialties.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">
            <GraduationCap className="h-12 w-12 mx-auto opacity-20 mb-3" />
            <p className="font-bold">No specialties found.</p>
          </div>
        ) : (
          filteredSpecialties.map((sp) => {
            const isLinked = linkedIds.has(sp.id);
            return (
              <div 
                key={sp.id}
                className={clsx(
                  "flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer group",
                  isLinked 
                    ? "border-indigo-500 bg-indigo-50/50" 
                    : "border-zinc-100 hover:border-zinc-200 bg-white"
                )}
                onClick={() => toggleSpecialty(sp.id)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-zinc-900">{sp.nameRu}</span>
                    {sp.code && (
                      <span className={clsx(
                        "text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest",
                        isLinked ? "bg-indigo-200 text-indigo-800" : "bg-zinc-200 text-zinc-600"
                      )}>
                        {sp.code}
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSpecialty(sp.id);
                  }}
                  disabled={linkMutation.isPending || unlinkMutation.isPending}
                  className={clsx(
                    "h-8 w-8 rounded-xl flex items-center justify-center transition-all",
                    isLinked 
                      ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20" 
                      : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600"
                  )}
                >
                  {isLinked ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

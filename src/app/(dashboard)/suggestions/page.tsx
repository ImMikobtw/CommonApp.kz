"use client";

import React, { useState } from "react";
import { useSuggestions } from "@/entities/suggestion/api/use-suggestions";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Check, 
  X, 
  BookOpen, 
  BrainCircuit, 
  Clock, 
  AlertCircle, 
  FileText, 
  ShieldAlert, 
  Coins 
} from "lucide-react";
import { Suggestion } from "@/shared/api/services/suggestion.service";

type StatusTab = "PENDING_REVIEW" | "APPROVED" | "REJECTED";

export default function SuggestionsPage() {
  const [activeTab, setActiveTab] = useState<StatusTab>("PENDING_REVIEW");
  const { suggestions = [], isLoading, approveMutation, rejectMutation } = useSuggestions();

  // Filter suggestions based on tab
  const filteredSuggestions = suggestions.filter((s) => s.status === activeTab);

  const getEntityIcon = (type: string) => {
    switch (type) {
      case "ADMISSION_REQUIREMENT":
        return <ShieldAlert className="h-5 w-5 text-emerald-500" />;
      case "FAQ":
        return <BrainCircuit className="h-5 w-5 text-amber-500" />;
      case "EDUCATIONAL_PROGRAM":
        return <BookOpen className="h-5 w-5 text-indigo-500" />;
      default:
        return <FileText className="h-5 w-5 text-zinc-500" />;
    }
  };

  const getEntityLabel = (type: string) => {
    switch (type) {
      case "ADMISSION_REQUIREMENT":
        return "Admission Requirement";
      case "FAQ":
        return "Frequently Asked Question";
      case "EDUCATIONAL_PROGRAM":
        return "Educational Program";
      default:
        return type;
    }
  };

  const renderPayload = (suggestion: Suggestion) => {
    const payload = suggestion.payloadJson || {};
    
    return (
      <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 space-y-4 text-xs font-medium text-zinc-600">
        <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
          <BrainCircuit className="h-3.5 w-3.5 text-zinc-400" /> Extracted Payload
        </h4>

        {suggestion.entityType === "ADMISSION_REQUIREMENT" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-400">Year</span>
                <span className="font-bold text-zinc-900">{payload.year || 2026}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-400">Degree Level</span>
                <span className="font-bold text-zinc-900 uppercase">{payload.degree_type || "BACHELOR"}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-400">Min ENT Score</span>
                <span className="font-bold text-zinc-900 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg">{payload.min_score || "N/A"}</span>
              </div>
            </div>

            <div className="space-y-2">
              {payload.required_subjects && (
                <div>
                  <span className="text-zinc-400 block mb-1">Required Subjects</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {Object.values(payload.required_subjects).map((subj: any, i) => (
                      <span key={i} className="bg-zinc-200/60 text-zinc-800 px-2 py-1 rounded-lg text-[10px] font-bold">
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {payload.document_list?.items && (
                <div className="mt-2">
                  <span className="text-zinc-400 block mb-1">Required Documents</span>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-700 font-bold">
                    {payload.document_list.items.map((doc: string, idx: number) => (
                      <li key={idx} className="truncate">{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {payload.notes_ru && (
              <div className="col-span-full border-t border-zinc-100 pt-3">
                <span className="text-zinc-400 block mb-1">Notes (Russian)</span>
                <p className="text-zinc-700 italic font-semibold text-[11px]">{payload.notes_ru}</p>
              </div>
            )}
          </div>
        )}

        {suggestion.entityType === "FAQ" && (
          <div className="space-y-3">
            <div>
              <span className="text-zinc-400 block mb-1">Question</span>
              <p className="text-zinc-900 font-extrabold text-sm">{payload.question_ru}</p>
            </div>
            <div>
              <span className="text-zinc-400 block mb-1">Answer</span>
              <p className="text-zinc-700 font-bold bg-white p-3 rounded-xl border border-zinc-100 shadow-sm leading-relaxed">{payload.answer_ru}</p>
            </div>
            <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              <span>Category: <span className="text-amber-600 font-black">{payload.category || "General"}</span></span>
            </div>
          </div>
        )}

        {suggestion.entityType === "EDUCATIONAL_PROGRAM" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-400">Program Name (RU)</span>
                <span className="font-bold text-zinc-900">{payload.name_ru}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-400">Program Code</span>
                <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{payload.code || "N/A"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-400">Tuition Fee</span>
                <span className="font-bold text-zinc-900 flex items-center gap-1">
                  <Coins className="h-3 w-3 text-amber-500" />
                  {payload.tuition_fee?.toLocaleString() || 0} ₸
                </span>
              </div>
              <div className="flex justify-between border-b border-zinc-100 pb-1.5">
                <span className="text-zinc-400">Grant Minimum Score</span>
                <span className="font-bold text-zinc-900">{payload.min_ent_score || "N/A"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-indigo-600" />
            AI Suggestions
          </h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Review, approve, or reject structured information extracted by AI</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1.5 bg-zinc-100 rounded-2xl w-fit">
        {(["PENDING_REVIEW", "APPROVED", "REJECTED"] as StatusTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
              activeTab === tab
                ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/50"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Loading Suggestions...</span>
        </div>
      ) : filteredSuggestions.length === 0 ? (
        <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm p-16 flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-4">
          <div className="h-16 w-16 rounded-[24px] bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-inner">
            <Clock className="h-8 w-8 text-zinc-300" />
          </div>
          <h3 className="text-lg font-black text-zinc-900 tracking-tight">No suggestions found</h3>
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wide leading-relaxed">
            There are no suggestions in status {activeTab.replace("_", " ")}. Trigger document parsing to generate new suggestions!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {filteredSuggestions.map((suggestion) => {
            const conf = suggestion.confidenceScore || 0;
            const confColor = conf >= 90 ? "bg-emerald-500" : conf >= 70 ? "bg-amber-500" : "bg-red-500";
            const confTextColor = conf >= 90 ? "text-emerald-600" : conf >= 70 ? "text-amber-600" : "text-red-600";

            return (
              <div 
                key={suggestion.id} 
                className="bg-white rounded-[32px] border border-zinc-100 shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col gap-6"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-sm">
                      {getEntityIcon(suggestion.entityType)}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-zinc-900 tracking-tight">
                          {getEntityLabel(suggestion.entityType)}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-widest bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-lg border border-zinc-200">
                          {suggestion.actionType}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                        Extracted {new Date(suggestion.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Confidence meter */}
                  <div className="flex items-center gap-4 bg-zinc-50 border border-zinc-100 px-4 py-2.5 rounded-2xl">
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Confidence</span>
                      <span className={`text-xs font-black ${confTextColor}`}>{conf}%</span>
                    </div>
                    <div className="w-20 h-2 bg-zinc-200 rounded-full overflow-hidden">
                      <div className={`h-full ${confColor}`} style={{ width: `${conf}%` }} />
                    </div>
                  </div>
                </div>

                {/* Payload Render */}
                {renderPayload(suggestion)}

                {/* Footer Controls */}
                {activeTab === "PENDING_REVIEW" && (
                  <div className="flex items-center justify-end gap-3 border-t border-zinc-100 pt-6">
                    <Button
                      variant="outline"
                      onClick={() => rejectMutation.mutate(suggestion.id)}
                      disabled={rejectMutation.isPending || approveMutation.isPending}
                      className="rounded-2xl px-6 border-zinc-200 text-zinc-600 hover:bg-red-50 hover:text-red-600 font-black uppercase tracking-widest text-[10px] flex items-center gap-2"
                    >
                      <X className="h-4 w-4" /> Reject
                    </Button>
                    <Button
                      onClick={() => approveMutation.mutate(suggestion.id)}
                      disabled={rejectMutation.isPending || approveMutation.isPending}
                      className="rounded-2xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Check className="h-4 w-4" /> Approve & Apply
                    </Button>
                  </div>
                )}

                {activeTab === "APPROVED" && (
                  <div className="flex items-center gap-2 text-emerald-600 text-xs font-black uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 w-fit">
                    <Check className="h-4 w-4" /> Approved & Applied to Live DB
                  </div>
                )}

                {activeTab === "REJECTED" && (
                  <div className="flex items-center gap-2 text-red-600 text-xs font-black uppercase tracking-widest bg-red-50 px-4 py-2 rounded-2xl border border-red-100 w-fit">
                    <X className="h-4 w-4" /> Rejected
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
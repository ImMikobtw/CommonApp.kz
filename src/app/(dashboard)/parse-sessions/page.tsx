"use client";

import React, { useState } from "react";
import { useParseSessions } from "@/entities/parse-session/api/use-parse-sessions";
import { useQuery } from "@tanstack/react-query";
import { documentService } from "@/shared/api/services/document.service";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Cpu, 
  Calendar, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Terminal 
} from "lucide-react";
import { ParseSession } from "@/shared/api/services/parse-session.service";

export default function ParseSessionsPage() {
  const { parseSessions = [], isLoading, triggerMutation } = useParseSessions();
  const [selectedDocId, setSelectedDocId] = useState<number | "">("");
  const [expandedSessionId, setExpandedSessionId] = useState<number | null>(null);

  // Fetch uploaded documents
  const { data: documents = [], isLoading: isLoadingDocs } = useQuery({
    queryKey: ["uploaded-documents"],
    queryFn: () => documentService.list(),
  });

  const handleLaunch = () => {
    if (selectedDocId) {
      triggerMutation.mutate(selectedDocId, {
        onSuccess: () => setSelectedDocId(""),
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Pending
          </span>
        );
      case "RUNNING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200 animate-pulse">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Running
          </span>
        );
      case "DONE":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" /> Done
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase bg-red-50 text-red-600 ring-1 ring-red-200">
            <XCircle className="h-3.5 w-3.5" /> Failed
          </span>
        );
      default:
        return <span className="text-zinc-500 font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
            <Cpu className="h-8 w-8 text-indigo-600" />
            AI Parse Sessions
          </h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">Trigger and monitor background AI extraction on university regulation documents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left column: Trigger Panel */}
        <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm p-8 space-y-6">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2">
            <Play className="h-4 w-4 text-emerald-500 fill-emerald-500" />
            Launch Parser
          </h3>
          <p className="text-zinc-500 text-xs font-medium leading-relaxed">
            Select any uploaded university document to run the background AI parser. The AI will extract requirements, programs, and FAQs, placing them into your moderation queue.
          </p>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
              Select Document
            </label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(Number(e.target.value))}
              disabled={isLoadingDocs || triggerMutation.isPending}
              className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none transition focus:border-black focus:ring-4 focus:ring-black/5 disabled:opacity-50 font-bold appearance-none bg-white text-zinc-800"
            >
              <option value="">Choose a document...</option>
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.file_name} ({doc.document_category})
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleLaunch}
            disabled={!selectedDocId || triggerMutation.isPending}
            className="w-full py-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20"
          >
            {triggerMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Launching...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" /> Launch AI Parser
              </>
            )}
          </Button>
        </div>

        {/* Right column: Sessions list */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-500" />
            Session History
          </h3>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white rounded-[32px] border border-zinc-100 shadow-sm">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Loading history...</span>
            </div>
          ) : parseSessions.length === 0 ? (
            <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm p-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 rounded-[24px] bg-zinc-50 border border-zinc-100 flex items-center justify-center shadow-inner">
                <FileText className="h-8 w-8 text-zinc-300" />
              </div>
              <h3 className="text-lg font-black text-zinc-900 tracking-tight">No sessions logged</h3>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wide leading-relaxed">
                Launch your first document parse session to see execution logs here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {parseSessions.map((session) => {
                const isExpanded = expandedSessionId === session.id;
                const dateStr = new Date(session.createdAt).toLocaleString();
                
                return (
                  <div 
                    key={session.id}
                    className="bg-white rounded-[24px] border border-zinc-100 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Collapsible Header */}
                    <div 
                      onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                      className="p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                          <Terminal className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-zinc-900">
                            Session #{session.id} (Doc ID: {session.documentId})
                          </span>
                          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                            Started: {dateStr}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {getStatusBadge(session.status)}
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-zinc-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-zinc-400" />
                        )}
                      </div>
                    </div>

                    {/* Collapsible Body */}
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-zinc-50 pt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
                        {session.summary && (
                          <div className="space-y-1">
                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">AI Extraction Summary</span>
                            <p className="text-xs font-bold text-zinc-700 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 leading-relaxed">
                              {session.summary}
                            </p>
                          </div>
                        )}

                        {session.errorMessage && (
                          <div className="space-y-1">
                            <span className="text-[9px] font-black text-red-400 uppercase tracking-widest">Error Log</span>
                            <pre className="text-[11px] font-mono font-bold text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100 overflow-x-auto">
                              {session.errorMessage}
                            </pre>
                          </div>
                        )}

                        {session.rawExtractedText && (
                          <div className="space-y-1">
                            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Raw Extracted Text Inspector</span>
                            <pre className="text-[10px] font-mono font-bold text-zinc-600 bg-zinc-900 text-zinc-100 p-4 rounded-2xl overflow-x-auto max-h-48 overflow-y-auto custom-scrollbar leading-relaxed">
                              {session.rawExtractedText}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
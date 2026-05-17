"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  BookOpen, 
  Globe,
  Database,
  RefreshCw,
  FileText,
  HelpCircle,
  FolderOpen
} from "lucide-react";
import { PageHeader } from "../../../components/ui/page-header";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Dialog } from "../../../components/ui/dialog";
import { EmptyState } from "../../../components/common/empty-state";
import { 
  knowledgeBaseService, 
  KnowledgeBaseEntry 
} from "../../../shared/api/services/knowledge-base.service";
import { 
  universityService, 
  University 
} from "../../../shared/api/services/university.service";

export default function KnowledgeBasePage() {
  const [entries, setEntries] = useState<KnowledgeBaseEntry[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniv, setSelectedUniv] = useState<number | "">("");
  const [selectedSource, setSelectedSource] = useState<string>("");
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal dialog states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeBaseEntry | null>(null);
  
  // Form State
  const [formUnivId, setFormUnivId] = useState<number | "">("");
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formLang, setFormLang] = useState("ru");
  const [formStatus, setFormStatus] = useState<"DRAFT" | "PUBLISHED">("PUBLISHED");

  // Load initial data
  useEffect(() => {
    async function loadInitialData() {
      try {
        const univs = await universityService.getAll();
        setUniversities(univs);
      } catch (err) {
        console.error("Failed to load universities list", err);
      }
    }
    loadInitialData();
  }, []);

  // Fetch entries when filters or search change
  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const filters: any = {};
      if (selectedUniv) filters.universityId = selectedUniv;
      if (selectedSource) filters.sourceType = selectedSource;
      if (searchQuery) filters.search = searchQuery;

      const data = await knowledgeBaseService.getAll(filters);
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch knowledge base entries", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [selectedUniv, selectedSource, searchQuery]);

  // Open modal for Adding
  const handleOpenAdd = () => {
    setEditingEntry(null);
    setFormUnivId(universities[0]?.id || "");
    setFormTitle("");
    setFormContent("");
    setFormLang("ru");
    setFormStatus("PUBLISHED");
    setIsModalOpen(true);
  };

  // Open modal for Editing
  const handleOpenEdit = (entry: KnowledgeBaseEntry) => {
    setEditingEntry(entry);
    setFormUnivId(entry.universityId);
    setFormTitle(entry.title);
    setFormContent(entry.content);
    setFormLang(entry.language);
    setFormStatus(entry.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT");
    setIsModalOpen(true);
  };

  // Form Submit Handler (Add or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formUnivId || !formTitle.trim() || !formContent.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingEntry) {
        // Edit entry
        await knowledgeBaseService.update(editingEntry.id, {
          title: formTitle,
          content: formContent,
          language: formLang,
          status: formStatus
        });
      } else {
        // Add manual entry
        await knowledgeBaseService.create({
          universityId: Number(formUnivId),
          title: formTitle,
          content: formContent,
          language: formLang,
          status: formStatus
        });
      }
      setIsModalOpen(false);
      fetchEntries();
    } catch (err) {
      console.error("Error submitting knowledge base form", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Entry
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this knowledge fragment?")) return;
    
    try {
      await knowledgeBaseService.delete(id);
      fetchEntries();
    } catch (err) {
      console.error("Failed to delete entry", err);
    }
  };

  // Trigger Embeddings Generation
  const handleTriggerEmbedding = async (id: number) => {
    try {
      // Optimistic locally updated state
      setEntries(prev => prev.map(item => 
        item.id === id ? { ...item, embeddingStatus: "PENDING" } : item
      ));
      
      await knowledgeBaseService.triggerEmbedding(id);
      fetchEntries();
    } catch (err) {
      console.error("Failed to generate embedding vector", err);
    }
  };

  // Helper resolvers for UI display
  const getUnivAbbr = (id: number) => {
    const u = universities.find(item => item.id === id);
    return u ? (u.abbrRu || u.nameRu) : `Univ #${id}`;
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "MANUAL":
        return <BookOpen className="h-3.5 w-3.5 text-zinc-400" />;
      case "DOCUMENT":
        return <FileText className="h-3.5 w-3.5 text-amber-500" />;
      case "FAQ":
        return <HelpCircle className="h-3.5 w-3.5 text-sky-500" />;
      default:
        return <FolderOpen className="h-3.5 w-3.5 text-zinc-400" />;
    }
  };

  const getEmbeddingStatusBadge = (entry: KnowledgeBaseEntry) => {
    switch (entry.embeddingStatus) {
      case "GENERATED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-3 w-3" /> Vector Ready
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 ring-1 ring-amber-200 animate-pulse">
            <Loader2 className="h-3 w-3 animate-spin" /> Pending
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-600 ring-1 ring-red-200">
            <AlertCircle className="h-3 w-3" /> Failed
          </span>
        );
      default:
        return <span className="text-zinc-500 font-bold uppercase text-[9px]">{entry.embeddingStatus}</span>;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Page Title & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
            <Database className="h-8 w-8 text-indigo-600" />
            Knowledge Base Hub
          </h1>
          <p className="text-zinc-500 text-sm font-medium mt-1">
            Manage vector segments, FAQs, and parsed documents used to train the university AI Widget.
          </p>
        </div>
        <Button 
          onClick={handleOpenAdd}
          className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-xs px-6 py-4 flex items-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          <Plus className="h-4 w-4" /> Add Knowledge Entry
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-[24px] border border-zinc-100 shadow-sm p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search entries by title or content keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 pl-11 pr-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-semibold text-sm placeholder:text-zinc-400 bg-zinc-50/50"
          />
        </div>

        {/* University Selector */}
        <div>
          <select
            value={selectedUniv}
            onChange={(e) => setSelectedUniv(e.target.value ? Number(e.target.value) : "")}
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm bg-zinc-50/50 text-zinc-700 appearance-none"
          >
            <option value="">All Universities</option>
            {universities.map(univ => (
              <option key={univ.id} value={univ.id}>
                {univ.nameRu} ({univ.abbrRu})
              </option>
            ))}
          </select>
        </div>

        {/* Source Type Selector */}
        <div>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm bg-zinc-50/50 text-zinc-700 appearance-none"
          >
            <option value="">All Sources</option>
            <option value="MANUAL">Manual Input</option>
            <option value="DOCUMENT">Extracted Document</option>
            <option value="FAQ">FAQ Auto-Seed</option>
          </select>
        </div>
      </div>

      {/* Main List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 bg-white rounded-[32px] border border-zinc-100 shadow-sm">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          <span className="text-sm font-black text-zinc-400 uppercase tracking-widest">Loading knowledge hub...</span>
        </div>
      ) : entries.length === 0 ? (
        <EmptyState
          title="No knowledge entries found"
          description="Try modifying search keywords or create a manual entry using the button above."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map(entry => (
            <Card key={entry.id} className="relative flex flex-col justify-between hover:scale-[1.01] duration-300">
              <div className="space-y-4">
                {/* Header Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-50 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-zinc-50 border border-zinc-100 text-zinc-600">
                      {getUnivAbbr(entry.universityId)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-zinc-50 border border-zinc-100 text-zinc-600">
                      {getSourceIcon(entry.sourceType)} {entry.sourceType}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-zinc-50 border border-zinc-100 text-zinc-600">
                      <Globe className="h-3 w-3 text-zinc-400" /> {entry.language.toUpperCase()}
                    </span>
                  </div>
                  {getEmbeddingStatusBadge(entry)}
                </div>

                {/* Content text */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-black text-zinc-950 tracking-tight leading-snug line-clamp-1">{entry.title}</h3>
                  <p className="text-xs font-bold text-zinc-500 leading-relaxed line-clamp-4 whitespace-pre-line bg-zinc-50/50 p-3.5 rounded-2xl border border-zinc-100/50">{entry.content}</p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-zinc-50">
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">
                  Updated: {new Date(entry.updatedAt).toLocaleDateString()}
                </span>
                
                <div className="flex items-center gap-2">
                  {/* Embed Action */}
                  <button
                    onClick={() => handleTriggerEmbedding(entry.id)}
                    title="Run Vectoization (Embedding) Task"
                    className="p-2 text-indigo-500 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition focus:outline-none"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                  
                  {/* Edit */}
                  <button
                    onClick={() => handleOpenEdit(entry)}
                    title="Edit entry"
                    className="p-2 text-zinc-500 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition focus:outline-none"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(entry.id)}
                    title="Delete entry"
                    className="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition focus:outline-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Manual Entry Dialog (Add/Edit Modal) */}
      <Dialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEntry ? "Edit Knowledge Fragment" : "Add New Knowledge Entry"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* University (only on creation) */}
          {!editingEntry && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
                Select University
              </label>
              <select
                value={formUnivId}
                onChange={(e) => setFormUnivId(Number(e.target.value))}
                required
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm bg-white text-zinc-800 appearance-none"
              >
                {universities.map(univ => (
                  <option key={univ.id} value={univ.id}>
                    {univ.nameRu} ({univ.abbrRu})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
              Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Admission Regulations for International Students 2026"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm bg-white"
            />
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
              Content Text (RAG Context)
            </label>
            <textarea
              required
              rows={6}
              placeholder="Provide clean markdown or raw text. Write rich details about regulations, quotas, dates, fees, dormitory policies, or requirements. The more descriptive, the better the AI answers."
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-semibold text-sm bg-white resize-none leading-relaxed"
            />
          </div>

          {/* Language and Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
                Language
              </label>
              <select
                value={formLang}
                onChange={(e) => setFormLang(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm bg-white"
              >
                <option value="ru">Russian (RU)</option>
                <option value="kz">Kazakh (KZ)</option>
                <option value="en">English (EN)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">
                Publishing Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as any)}
                className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 font-bold text-sm bg-white"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          {/* Submit Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-50 mt-4">
            <Button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-2xl px-6 py-3.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-600 font-black uppercase tracking-widest text-[10px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving...
                </>
              ) : (
                "Save Entry"
              )}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
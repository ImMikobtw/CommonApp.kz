"use client";

import { useRef, useState, useEffect } from "react";
import { EmptyState } from "../../../components/common/empty-state";
import { Button } from "../../../components/ui/button";
import { PageHeader } from "../../../components/ui/page-header";
import { documentService, DocumentResponse } from "../../../shared/api/services/document.service";
import { Card } from "../../../components/ui/card";

export default function DocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [documents, setDocuments] = useState<DocumentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const docs = await documentService.list();
      setDocuments(docs);
    } catch (error) {
      console.error("Failed to load documents", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await documentService.upload(file);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // Refresh list
      await fetchDocuments();
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Upload and manage university documents."
        action={
          <>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button onClick={handleUploadClick} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload document"}
            </Button>
          </>
        }
      />

      {isLoading ? (
        <div className="flex justify-center p-8">Loading documents...</div>
      ) : documents.length === 0 ? (
        <EmptyState
          title="No documents yet"
          description="Uploaded university documents will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <Card key={doc.id}>
              <div className="pb-2">
                <h3 className="font-semibold text-lg truncate" title={doc.file_name}>
                  {doc.file_name}
                </h3>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">
                  Type: {doc.file_type}
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  Uploaded: {new Date(doc.uploaded_at).toLocaleDateString()}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(`http://localhost:8000${doc.file_url}`, "_blank")}
                >
                  View Document
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
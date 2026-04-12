import { apiClient } from "../client";
import { endpoints } from "../endpoints";

export interface DocumentResponse {
  id: number;
  university_id: number;
  uploaded_by_user_id: number;
  file_name: string;
  file_url: string;
  file_type: string;
  document_category: string;
  status: string;
  version: number;
  is_active: boolean;
  uploaded_at: string;
  processed_at: string | null;
  error_message: string | null;
}

export const documentService = {
  async upload(file: File): Promise<DocumentResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await apiClient.post<DocumentResponse>(
      endpoints.documents.upload,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },

  async list(): Promise<DocumentResponse[]> {
    const { data } = await apiClient.get<DocumentResponse[]>(endpoints.documents.list);
    return data;
  },
};

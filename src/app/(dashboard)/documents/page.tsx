import { EmptyState } from "../../../components/common/empty-state";
import { Button } from "../../../components/ui/button";
import { PageHeader } from "../../../components/ui/page-header";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Upload and manage university documents."
        action={<Button>Upload document</Button>}
      />

      <EmptyState
        title="No documents yet"
        description="Uploaded university documents will appear here."
      />
    </div>
  );
}
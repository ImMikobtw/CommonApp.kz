import { EmptyState } from "../../../components/common/empty-state";
import { PageHeader } from "../../../components/ui/page-header";

export default function ParseSessionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Parse Sessions"
        description="Track document parsing jobs and their statuses."
      />

      <EmptyState
        title="No parse sessions yet"
        description="Document parsing sessions will appear here after uploads are processed."
      />
    </div>
  );
}
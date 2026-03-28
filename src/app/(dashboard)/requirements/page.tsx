import { EmptyState } from "../../../components/common/empty-state";
import { Button } from "../../../components/ui/button";
import { PageHeader } from "../../../components/ui/page-header";

export default function RequirementsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Requirements"
        description="Manage admission requirements and conditions."
        action={<Button>Add requirement</Button>}
      />

      <EmptyState
        title="No requirements yet"
        description="Admission requirements will appear here after creation."
      />
    </div>
  );
}
import { EmptyState } from "../../../components/common/empty-state";
import { Button } from "../../../components/ui/button";
import { PageHeader } from "../../../components/ui/page-header";

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Programs"
        description="Manage educational programs for universities."
        action={<Button>Add program</Button>}
      />

      <EmptyState
        title="No programs yet"
        description="Educational programs will appear here after creation."
      />
    </div>
  );
}
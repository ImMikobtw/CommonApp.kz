import { EmptyState } from "../../../components/common/empty-state";
import { Button } from "../../../components/ui/button";
import { PageHeader } from "../../../components/ui/page-header";

export default function UniversitiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Universities"
        description="Manage universities and their base information."
        action={<Button>Add university</Button>}
      />

      <EmptyState
        title="No universities yet"
        description="Universities will appear here after you create the first one."
      />
    </div>
  );
}
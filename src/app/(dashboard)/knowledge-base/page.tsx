import { EmptyState } from "../../../components/common/empty-state";
import { Button } from "../../../components/ui/button";
import { PageHeader } from "../../../components/ui/page-header";

export default function KnowledgeBasePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Base"
        description="Manage internal knowledge entries for university AI support."
        action={<Button>Add entry</Button>}
      />

      <EmptyState
        title="No knowledge base entries yet"
        description="Knowledge base records will appear here after creation."
      />
    </div>
  );
}
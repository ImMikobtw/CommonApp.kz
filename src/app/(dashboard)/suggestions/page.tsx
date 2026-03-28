import { EmptyState } from "../../../components/common/empty-state";
import { PageHeader } from "../../../components/ui/page-header";

export default function SuggestionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Suggestions"
        description="Review AI-generated suggestions before applying changes."
      />

      <EmptyState
        title="No pending suggestions"
        description="AI-generated change suggestions will appear here for review."
      />
    </div>
  );
}
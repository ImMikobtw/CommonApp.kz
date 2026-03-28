import { EmptyState } from "../../../components/common/empty-state";
import { Button } from "../../../components/ui/button";
import { PageHeader } from "../../../components/ui/page-header";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage administrators and university access."
        action={<Button>Add user</Button>}
      />

      <EmptyState
        title="No users yet"
        description="System users and access roles will appear here."
      />
    </div>
  );
}
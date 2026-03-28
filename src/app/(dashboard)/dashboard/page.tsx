import { Card } from "../../../components/ui/card";
import { PageHeader } from "../../../components/ui/page-header";

const stats = [
  { title: "Universities", value: "12" },
  { title: "Documents", value: "84" },
  { title: "Parse Sessions", value: "19" },
  { title: "Pending Suggestions", value: "7" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of Common App admin activity."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => (
          <Card key={card.title}>
            <p className="text-sm text-zinc-500">{card.title}</p>
            <p className="mt-3 text-3xl font-semibold text-zinc-900">
              {card.value}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
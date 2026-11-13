import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, CheckCircle2, XCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Kpi, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { inr, quotations } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/approvals/")({
  head: () => meta("Approvals", "Quotations awaiting internal commercial review."),
  component: () => (
    <>
      <PageHeader crumb="Workspace" title="Approvals" subtitle="Review estimations before they go to customers" />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Awaiting review" value="6" icon={Clock} /><Kpi label="Approved this month" value="18" icon={CheckCircle2} />
        <Kpi label="Changes requested" value="3" icon={MessageSquare} /><Kpi label="Rejected" value="2" icon={XCircle} />
      </div>
      <Panel bodyClass="p-0" title="Review queue">
        <DataTable head={["Quotation ID", "Customer", "Project", "Estimated Amount", "Submitted By", "Submitted", "Status", ""]}>
          {quotations.filter((q) => q.status !== "Draft").map((q) => (
            <tr key={q.id}>
              <td className="font-mono text-xs font-medium text-primary">{q.id}</td><td className="font-medium">{q.company}</td><td className="text-muted-foreground">{q.project}</td>
              <td className="tabular-nums font-medium">{inr(q.amount)}</td><td>{q.by}</td><td>{q.created}</td><td><StatusBadge status={q.status} /></td>
              <td><Button size="sm" variant="outline" asChild><Link to="/approvals/$id" params={{ id: q.id }}>Review</Link></Button></td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </>
  ),
});

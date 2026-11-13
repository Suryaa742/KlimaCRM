import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, Kpi, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { inr, quotations } from "@/lib/data";
import { meta } from "@/lib/meta";
import { FileText, Send, CheckCircle2, Clock } from "lucide-react";

export const Route = createFileRoute("/quotations/")({
  head: () => meta("Quotations", "All KLIMA quotations with approval status and validity."),
  component: () => (
    <>
      <PageHeader crumb="Workspace" title="Quotations" subtitle="Generated from approved estimations" actions={<Button asChild><Link to="/estimation"><Plus />New from estimation</Link></Button>} />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Total quotations" value="48" icon={FileText} /><Kpi label="Sent to customers" value="23" icon={Send} />
        <Kpi label="Pending approval" value="6" icon={Clock} /><Kpi label="Accepted" value="7" delta="₹9.8 Cr won" icon={CheckCircle2} />
      </div>
      <Panel bodyClass="p-0">
        <DataTable head={["Quotation ID", "Lead ID", "Company", "Project", "Amount", "Created", "Approval Status", "Valid Until"]}>
          {quotations.map((q) => (
            <tr key={q.id}>
              <td><Link to="/quotations/$id" params={{ id: q.id }} className="font-mono text-xs font-medium text-primary hover:underline">{q.id}</Link></td>
              <td className="font-mono text-xs">{q.lead}</td><td className="font-medium">{q.company}</td><td className="text-muted-foreground">{q.project}</td>
              <td className="font-medium tabular-nums">{inr(q.amount)}</td><td>{q.created}</td><td><StatusBadge status={q.status} /></td><td>{q.validity}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </>
  ),
});

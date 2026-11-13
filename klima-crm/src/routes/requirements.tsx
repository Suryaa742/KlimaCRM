import { createFileRoute, Link } from "@tanstack/react-router";
import { DataTable, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { leads } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/requirements")({
  head: () => meta("Requirements", "Captured project and technical requirements for every lead."),
  component: () => (
    <>
      <PageHeader crumb="Workspace" title="Requirements" subtitle="Technical requirement sheets captured during lead qualification" />
      <Panel bodyClass="p-0">
        <DataTable head={["Lead ID", "Company", "Project", "Area", "Classification", "HVAC", "Panels", "Validation", "Completeness", "Status"]}>
          {leads.map((l, i) => {
            const pct = [100, 92, 85, 100, 60, 100, 74, 88][i];
            return (
              <tr key={l.id}>
                <td><Link to="/leads/$id" params={{ id: l.id }} className="font-mono text-xs text-primary">{l.id}</Link></td><td className="font-medium">{l.company}</td><td className="text-muted-foreground">{l.project}</td>
                <td>{l.area}</td><td>{l.classification}</td><td>Required</td><td>{i % 3 === 2 ? "Optional" : "Required"}</td><td>{i % 4 === 3 ? "IQ/OQ" : "DQ/IQ/OQ/PQ"}</td>
                <td><div className="flex items-center gap-2"><div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div><span className="text-xs">{pct}%</span></div></td>
                <td><StatusBadge status={pct === 100 ? "Completed" : "In Review"} /></td>
              </tr>
            );
          })}
        </DataTable>
      </Panel>
    </>
  ),
});

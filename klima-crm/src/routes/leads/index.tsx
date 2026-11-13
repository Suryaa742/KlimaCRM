import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { agents, inrL, leads } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/leads/")({
  head: () => meta("Leads", "All cleanroom project leads with status, value and follow-ups."),
  component: Leads,
});

const statuses = ["All", "New", "Contacted", "Qualified", "Estimation", "Quotation Sent", "Negotiation", "Won", "Lost"];

function Leads() {
  const [q, setQ] = useState("");
  const [st, setSt] = useState("All");
  const [agent, setAgent] = useState("All agents");
  const rows = leads.filter((l) =>
    (st === "All" || l.status === st) && (agent === "All agents" || l.agent === agent) &&
    `${l.id} ${l.company} ${l.project} ${l.contact}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHeader crumb="Workspace" title="Leads" subtitle="154 leads · ₹186.4 Cr total pipeline value"
        actions={<><Button variant="outline"><Download />Export</Button><Button asChild><Link to="/leads/new"><Plus />Add Lead</Link></Button></>} />
      <Panel bodyClass="p-0">
        <div className="flex flex-wrap items-center gap-3 border-b p-4">
          <div className="relative w-72"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ID, company, project…" className="h-9 w-full rounded-md border bg-background pl-9 text-sm outline-none focus:border-ring" /></div>
          <select value={agent} onChange={(e) => setAgent(e.target.value)} className="h-9 rounded-md border bg-background px-3 text-sm"><option>All agents</option>{agents.map((a) => <option key={a}>{a}</option>)}</select>
          <select className="h-9 rounded-md border bg-background px-3 text-sm"><option>All industries</option><option>Pharmaceutical</option><option>Biotech</option><option>Semiconductor</option><option>Healthcare</option></select>
          <Button variant="ghost" size="sm"><Filter />More filters</Button>
        </div>
        <div className="flex gap-1 overflow-x-auto border-b px-4">
          {statuses.map((s) => <button key={s} onClick={() => setSt(s)} className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm ${st === s ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{s}</button>)}
        </div>
        <DataTable head={["Lead ID", "Company", "Contact", "Project", "Industry", "Location", "Agent", "Status", "Est. Value", "Created", "Next Follow-up"]}>
          {rows.map((l) => (
            <tr key={l.id}>
              <td><Link to="/leads/$id" params={{ id: l.id }} className="font-mono text-xs font-medium text-primary hover:underline">{l.id}</Link></td>
              <td className="font-medium">{l.company}</td><td>{l.contact}</td><td className="text-muted-foreground">{l.project}</td>
              <td>{l.industry}</td><td>{l.location}</td><td>{l.agent}</td><td><StatusBadge status={l.status} /></td>
              <td className="tabular-nums font-medium">{inrL(l.value)}</td><td className="text-muted-foreground">{l.created}</td><td>{l.followUp}</td>
            </tr>
          ))}
          {rows.length === 0 && <tr><td colSpan={11} className="py-10 text-center text-muted-foreground">No leads match your filters.</td></tr>}
        </DataTable>
        <div className="flex items-center justify-between px-4 py-3 text-xs text-muted-foreground"><span>Showing {rows.length} of 154</span><div className="flex gap-1"><Button variant="outline" size="sm">Previous</Button><Button variant="outline" size="sm">Next</Button></div></div>
      </Panel>
    </>
  );
}

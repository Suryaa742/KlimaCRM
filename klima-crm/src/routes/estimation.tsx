import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Save, Send, FileText, Plus, Trash2, CheckCircle2, History, Sparkles, Database } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel, StatusBadge } from "@/components/kit";
import { inr, leads, lineItems, summarize } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/estimation")({
  head: () => meta("Estimation Engine", "Fetch captured lead requirements and build a detailed cleanroom cost estimate."),
  component: Estimation,
});

const reqs = [
  ["Project", "Pharmaceutical Cleanroom Facility"], ["Area", "5,000 Sq. Ft."], ["Classification", "ISO Class 7"],
  ["HVAC", "Required"], ["Modular Panels", "Required"], ["Validation", "Required"],
  ["Filtration", "HEPA H14"], ["Temp / RH", "21 ± 2 °C / 45 ± 5 %"], ["Pressure", "15 Pa cascade"],
  ["ACPH", "30–40"], ["Compliance", "EU GMP · WHO GMP"], ["Floors", "2"],
];

function Estimation() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(lineItems.map((i) => ({ ...i })));
  const lead = leads[0]!;
  const s = summarize(items);
  const matches = leads.filter((l) => `${l.id} ${l.company} ${l.project}`.toLowerCase().includes(q.toLowerCase())).slice(0, 5);
  const upd = (i: number, k: "qty" | "rate", v: string) => setItems(items.map((it, j) => (j === i ? { ...it, [k]: Number(v.replace(/[^\d.]/g, "")) || 0 } : it)));

  return (
    <>
      <PageHeader crumb="Workspace" title="Estimation Engine" subtitle="Fetch captured lead requirements and generate a costed estimate in minutes."
        actions={<><Button variant="outline" onClick={() => toast.success("Draft saved as v2")}><Save />Save Draft</Button><Button variant="outline" onClick={() => toast.success("Submitted to Neeraj Desai for approval")}><Send />Submit for Approval</Button><Button asChild><Link to="/quotations/$id" params={{ id: "QT-2026-0418" }}><FileText />Generate Quotation</Link></Button></>} />

      <div className="mb-6 rounded-lg border bg-card p-5">
        <div className="mb-2 text-sm font-medium">Find lead</div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search by Lead ID, Company Name or Project Name — e.g. KLIMA-00125"
            className="h-12 w-full rounded-md border-2 bg-background pl-12 pr-32 text-base outline-none focus:border-primary" />
          <Button className="absolute right-1.5 top-1.5" onClick={() => toast.success("Requirements fetched for KLIMA-00125")}><Database />Fetch</Button>
          {open && (
            <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border bg-popover shadow-lg">
              {matches.map((l) => (
                <button key={l.id} onMouseDown={() => { setQ(l.id); toast.success(`Requirements fetched for ${l.id}`); }} className="flex w-full items-center gap-4 px-4 py-2.5 text-left text-sm hover:bg-muted">
                  <span className="font-mono text-xs text-primary">{l.id}</span><span className="font-medium">{l.company}</span><span className="text-muted-foreground">{l.project}</span><span className="ml-auto"><StatusBadge status={l.status} /></span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-2 flex gap-4 text-xs text-muted-foreground"><span>Recent:</span>{leads.slice(0, 3).map((l) => <button key={l.id} onClick={() => setQ(l.id)} className="text-primary hover:underline">{l.id}</button>)}</div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-6">
          <Panel bodyClass="p-0">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b p-5">
              <div>
                <div className="flex items-center gap-2"><span className="font-mono text-xs text-primary">{lead.id}</span><StatusBadge status="Estimation" /></div>
                <h2 className="mt-1 text-lg font-semibold">{lead.company}</h2>
                <p className="text-sm text-muted-foreground">{lead.contact} · {lead.location} · Agent: {lead.agent}</p>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-success-soft px-3 py-1.5 text-xs font-medium text-success"><CheckCircle2 className="size-4" />12 requirements fetched from lead record</div>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4 lg:grid-cols-6">
              {reqs.map(([k, v]) => <div key={k} className="bg-card p-4"><div className="text-[11px] uppercase tracking-wide text-muted-foreground">{k}</div><div className="mt-1 text-sm font-medium">{v}</div></div>)}
            </div>
          </Panel>

          <Panel title="Cost estimation" bodyClass="p-0" action={<div className="flex gap-2"><Button size="sm" variant="ghost" onClick={() => toast("Line items suggested from ISO 7 template")}><Sparkles />Auto-fill from template</Button><Button size="sm" variant="outline" onClick={() => setItems([...items, { cat: "Misc", item: "New item", desc: "Description", qty: 1, unit: "Lot", rate: 0 }])}><Plus />Add line</Button></div>}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">{["#", "Category", "Product / Service", "Description", "Qty", "Unit", "Unit Rate (₹)", "Total (₹)", ""].map((h) => <th key={h} className="whitespace-nowrap px-3 py-2.5 font-medium">{h}</th>)}</tr></thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={i} className="border-b hover:bg-muted/30">
                      <td className="px-3 py-2 text-xs text-muted-foreground">{i + 1}</td>
                      <td className="px-3 py-2"><span className="whitespace-nowrap rounded bg-accent px-2 py-0.5 text-xs text-accent-foreground">{it.cat}</span></td>
                      <td className="whitespace-nowrap px-3 py-2 font-medium">{it.item}</td>
                      <td className="min-w-56 px-3 py-2 text-xs text-muted-foreground">{it.desc}</td>
                      <td className="px-3 py-2"><input value={it.qty.toLocaleString("en-IN")} onChange={(e) => upd(i, "qty", e.target.value)} className="h-8 w-20 rounded border bg-background px-2 text-right tabular-nums outline-none focus:border-ring" /></td>
                      <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{it.unit}</td>
                      <td className="px-3 py-2"><input value={it.rate.toLocaleString("en-IN")} onChange={(e) => upd(i, "rate", e.target.value)} className="h-8 w-28 rounded border bg-background px-2 text-right tabular-nums outline-none focus:border-ring" /></td>
                      <td className="whitespace-nowrap px-3 py-2 text-right font-medium tabular-nums">{(it.qty * it.rate).toLocaleString("en-IN")}</td>
                      <td className="px-2"><button onClick={() => setItems(items.filter((_, j) => j !== i))} className="rounded p-1 text-muted-foreground hover:bg-danger-soft hover:text-destructive" aria-label="Remove"><Trash2 className="size-3.5" /></button></td>
                    </tr>
                  ))}
                  <tr className="bg-muted/40 font-semibold"><td colSpan={7} className="px-3 py-3 text-right">Line items subtotal</td><td className="px-3 py-3 text-right tabular-nums">{items.reduce((a, i) => a + i.qty * i.rate, 0).toLocaleString("en-IN")}</td><td /></tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <Panel title="Cost summary" bodyClass="p-0">
            <dl className="divide-y text-sm">
              {([["Material Cost", s.material], ["Labour Cost (4%)", s.labour], ["Engineering Charges", s.engineering], ["Installation Charges", s.installation], ["Overhead (5%)", s.overhead], ["Profit Margin (12%)", s.profit], ["Discount (3%)", s.discount], ["GST (18%)", s.tax]] as const).map(([k, v]) => (
                <div key={k} className="flex justify-between px-5 py-2.5"><dt className="text-muted-foreground">{k}</dt><dd className={`tabular-nums ${v < 0 ? "text-destructive" : ""}`}>{inr(v)}</dd></div>
              ))}
            </dl>
            <div className="border-t bg-primary px-5 py-4 text-primary-foreground"><div className="text-xs opacity-80">Grand Total</div><div className="text-2xl font-semibold tabular-nums">{inr(s.grand)}</div><div className="text-xs opacity-80">≈ ₹{(s.grand / 5000).toLocaleString("en-IN", { maximumFractionDigits: 0 })} / Sq. Ft.</div></div>
            <div className="space-y-2 p-4">
              <Button className="w-full" asChild><Link to="/quotations/$id" params={{ id: "QT-2026-0418" }}><FileText />Generate Quotation</Link></Button>
              <Button className="w-full" variant="outline" onClick={() => toast.success("Submitted for approval")}><Send />Submit for Approval</Button>
            </div>
          </Panel>
          <Panel title="Version history" action={<History className="size-4 text-muted-foreground" />} bodyClass="space-y-3">
            {[["v2", "Current · Rahul Mehta", "10 Nov 2026", "Pending Approval"], ["v1", "Kavita Shah", "08 Nov 2026", "Draft"]].map(([v, b, d, st]) => (
              <div key={v} className={`rounded-md border p-3 ${v === "v2" ? "border-primary bg-accent/40" : ""}`}><div className="flex items-center justify-between"><span className="font-semibold">Estimation {v}</span><StatusBadge status={st} /></div><div className="mt-1 text-xs text-muted-foreground">{b} · {d}</div></div>
            ))}
          </Panel>
        </aside>
      </div>
    </>
  );
}

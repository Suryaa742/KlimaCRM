import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, MessageSquare } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { inr, lineItems, quotations, summarize } from "@/lib/data";

export const Route = createFileRoute("/approvals/$id")({
  loader: ({ params }) => { const q = quotations.find((x) => x.id === params.id); if (!q) throw notFound(); return q; },
  head: ({ loaderData }) => ({ meta: [
    { title: `Review ${loaderData?.id ?? ""} – KlimaCRM` }, { name: "description", content: "Internal approval review for a quotation." },
    { property: "og:title", content: `Review ${loaderData?.id ?? ""} – KlimaCRM` }, { property: "og:description", content: "Internal approval review for a quotation." },
  ]}),
  component: ApprovalDetail,
});

function ApprovalDetail() {
  const q = Route.useLoaderData();
  const [status, setStatus] = useState(q.status);
  const [comments, setComments] = useState([
    { who: "Rahul Mehta", t: "Customer budget is around ₹2.8 Cr. Kept margin at 12% with a 3% discount to stay competitive.", d: "10 Nov, 4:22 PM" },
    { who: "Kavita Shah", t: "HVAC sized for 40 ACPH in Grade C corridors. AHU count can drop to 3 if the customer accepts phasing.", d: "10 Nov, 5:05 PM" },
  ]);
  const [txt, setTxt] = useState("");
  const s = summarize(lineItems);
  const cats = Object.entries(lineItems.reduce<Record<string, number>>((a, i) => ({ ...a, [i.cat]: (a[i.cat] ?? 0) + (i.qty * i.rate) / 100000 }), {})).map(([cat, v]) => ({ cat, v: Math.round(v) }));
  const act = (st: string, msg: string) => { setStatus(st); toast.success(msg); };
  return (
    <>
      <PageHeader crumb={`Approvals / ${q.id}`} title={q.company} subtitle={q.project}
        actions={<><StatusBadge status={status} /><Button variant="outline" onClick={() => act("Changes Requested", "Changes requested from " + q.by)}><MessageSquare />Request Changes</Button><Button variant="outline" className="text-destructive" onClick={() => act("Rejected", "Quotation rejected")}><X />Reject</Button><Button onClick={() => act("Approved", "Quotation approved – ready to send")}><Check />Approve</Button></>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <Panel title="Quotation summary"><div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            <Field label="Quotation" value={<span className="font-mono">{q.id}</span>} /><Field label="Lead" value={<span className="font-mono">{q.lead}</span>} /><Field label="Submitted by" value={q.by} /><Field label="Submitted" value={q.created} />
            <Field label="Grand total" value={<span className="text-lg">{inr(q.amount)}</span>} /><Field label="Margin" value="12.0%" /><Field label="Discount" value="3.0% (limit 5%)" /><Field label="Validity" value={q.validity} />
          </div></Panel>
          <Panel title="Cost breakdown by category (₹ Lakh)"><div className="h-60"><ResponsiveContainer><BarChart data={cats} layout="vertical"><XAxis type="number" hide /><YAxis dataKey="cat" type="category" width={110} fontSize={12} tickLine={false} axisLine={false} /><Tooltip /><Bar dataKey="v" fill="var(--chart-1)" radius={[0, 4, 4, 0]} barSize={18} /></BarChart></ResponsiveContainer></div></Panel>
          <Panel title="Commercial checks" bodyClass="space-y-2 text-sm">
            {[["Margin above 10% minimum", true], ["Discount within 5% limit", true], ["Rates match current rate card", true], ["Rate per Sq. Ft. within ISO 7 benchmark (₹4,500–6,500)", true], ["Payment terms are standard", false]].map(([t, ok]) => <div key={t as string} className="flex items-center gap-2"><span className={`grid size-5 place-items-center rounded-full ${ok ? "bg-success-soft text-success" : "bg-warning-soft text-warning"}`}>{ok ? <Check className="size-3" /> : "!"}</span>{t as string}</div>)}
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Cost summary" bodyClass="p-0"><dl className="divide-y text-sm">{([["Material", s.material], ["Labour", s.labour], ["Engineering", s.engineering], ["Installation", s.installation], ["Overhead", s.overhead], ["Profit", s.profit], ["Discount", s.discount], ["GST", s.tax]] as const).map(([k, v]) => <div key={k} className="flex justify-between px-5 py-2"><dt className="text-muted-foreground">{k}</dt><dd className="tabular-nums">{inr(v)}</dd></div>)}<div className="flex justify-between px-5 py-3 font-semibold"><dt>Grand total</dt><dd className="tabular-nums">{inr(s.grand)}</dd></div></dl></Panel>
          <Panel title="Internal comments" bodyClass="space-y-4">
            {comments.map((c, i) => <div key={i} className="flex gap-3"><div className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">{c.who.split(" ").map((w) => w[0]).join("")}</div><div className="rounded-md bg-muted p-3 text-sm"><div className="text-xs font-medium">{c.who} <span className="font-normal text-muted-foreground">· {c.d}</span></div><div className="mt-1">{c.t}</div></div></div>)}
            <div className="flex gap-2"><input value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Add a comment…" className="h-9 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:border-ring" /><Button size="sm" onClick={() => { if (txt) { setComments([...comments, { who: "Neeraj Desai", t: txt, d: "Just now" }]); setTxt(""); } }}>Post</Button></div>
          </Panel>
        </div>
      </div>
    </>
  );
}

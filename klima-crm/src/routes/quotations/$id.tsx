import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eye, Download, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader, StatusBadge } from "@/components/kit";
import { inr, leads, lineItems, quotations, summarize } from "@/lib/data";

export const Route = createFileRoute("/quotations/$id")({
  loader: ({ params }) => { const q = quotations.find((x) => x.id === params.id); if (!q) throw notFound(); return q; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.id ?? "Quotation"} – KlimaCRM` },
    { name: "description", content: `Quotation for ${loaderData?.project ?? "a cleanroom project"}.` },
    { property: "og:title", content: `${loaderData?.id ?? "Quotation"} – KlimaCRM` },
    { property: "og:description", content: "KLIMA cleanroom project quotation." },
  ]}),
  component: QuoteDetail,
});

function H({ n, children }: { n: number; children: string }) {
  return <h3 className="mb-3 mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary"><span className="grid size-5 place-items-center rounded bg-primary text-[10px] text-primary-foreground">{n}</span>{children}</h3>;
}

function QuoteDetail() {
  const q = Route.useLoaderData();
  const l = leads.find((x) => x.id === q.lead) ?? leads[0]!;
  const s = summarize(lineItems);
  return (
    <>
      <PageHeader crumb={`Quotations / ${q.id}`} title={q.project} subtitle={`${q.company} · Prepared by ${q.by}`}
        actions={<><StatusBadge status={q.status} /><Button variant="outline" onClick={() => toast("Opening full-screen preview")}><Eye />Preview</Button><Button variant="outline" onClick={() => toast.success(`${q.id}.pdf downloaded`)}><Download />Download PDF</Button><Button asChild><Link to="/emails"><Send />Send Proposal</Link></Button></>} />
      <div className="mx-auto max-w-4xl rounded-lg border bg-card shadow-sm">
        <div className="h-2 rounded-t-lg bg-primary" />
        <div className="p-10 text-sm leading-relaxed">
          <div className="flex items-start justify-between border-b pb-6">
            <div><div className="text-2xl font-bold tracking-tight text-primary">KLIMA</div><div className="text-xs text-muted-foreground">Cleanroom Engineering & Industrial Infrastructure</div><div className="mt-2 text-xs text-muted-foreground">KLIMA Engineering Pvt. Ltd.<br />402, Titanium Square, SG Highway, Ahmedabad 380054<br />GSTIN 24AABCK1234L1Z5</div></div>
            <div className="text-right"><div className="text-xl font-semibold">QUOTATION</div><div className="mt-2 grid grid-cols-[auto_auto] gap-x-4 text-xs"><span className="text-muted-foreground">No.</span><span className="font-mono">{q.id}</span><span className="text-muted-foreground">Date</span><span>{q.created}</span><span className="text-muted-foreground">Valid until</span><span>{q.validity}</span><span className="text-muted-foreground">Lead ref.</span><span className="font-mono">{q.lead}</span></div></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-8">
            <div><div className="text-xs uppercase text-muted-foreground">Prepared for</div><div className="mt-1 font-semibold">{q.company}</div><div className="text-muted-foreground">{l.contact}, {l.designation}<br />{l.location}<br />{l.email}</div></div>
            <div><div className="text-xs uppercase text-muted-foreground">Project</div><div className="mt-1 font-semibold">{q.project}</div><div className="text-muted-foreground">Area: {l.area} · {l.classification}<br />New facility · 2 floors</div></div>
          </div>
          <H n={1}>Scope of work</H>
          <p className="text-muted-foreground">Design, supply, installation, testing and validation of a turnkey {l.classification} cleanroom facility including modular wall & ceiling systems, HVAC with AHUs, terminal HEPA filtration, epoxy flooring, cleanroom electricals and DQ/IQ/OQ/PQ documentation compliant with ISO 14644, EU GMP and WHO GMP.</p>
          <H n={2}>Technical specifications</H>
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded border bg-border text-xs">{[["Classification", l.classification], ["Temperature", "21 ± 2 °C"], ["Humidity", "45 ± 5 % RH"], ["Pressure", "15 Pa cascade"], ["Air changes", "30–40 ACPH"], ["Filtration", "HEPA H14"]].map(([a, b]) => <div key={a} className="bg-card p-3"><div className="text-muted-foreground">{a}</div><div className="font-medium">{b}</div></div>)}</div>
          <H n={3}>Product & service breakdown</H>
          <table className="w-full text-xs"><thead><tr className="border-y bg-muted text-left"><th className="p-2">#</th><th className="p-2">Item</th><th className="p-2 text-right">Qty</th><th className="p-2">Unit</th><th className="p-2 text-right">Rate (₹)</th><th className="p-2 text-right">Amount (₹)</th></tr></thead>
            <tbody>{lineItems.map((i, n) => <tr key={i.item} className="border-b"><td className="p-2 text-muted-foreground">{n + 1}</td><td className="p-2"><div className="font-medium">{i.item}</div><div className="text-muted-foreground">{i.desc}</div></td><td className="p-2 text-right tabular-nums">{i.qty.toLocaleString("en-IN")}</td><td className="p-2">{i.unit}</td><td className="p-2 text-right tabular-nums">{i.rate.toLocaleString("en-IN")}</td><td className="p-2 text-right tabular-nums">{(i.qty * i.rate).toLocaleString("en-IN")}</td></tr>)}</tbody></table>
          <H n={4}>Pricing summary</H>
          <div className="ml-auto w-80 text-sm">
            {([["Material & equipment", s.material], ["Labour", s.labour], ["Engineering", s.engineering], ["Installation", s.installation], ["Overheads", s.overhead], ["Margin", s.profit], ["Discount", s.discount], ["Taxable value", s.taxable], ["GST @ 18%", s.tax]] as const).map(([k, v]) => <div key={k} className="flex justify-between py-1"><span className="text-muted-foreground">{k}</span><span className="tabular-nums">{inr(v)}</span></div>)}
            <div className="mt-2 flex justify-between rounded bg-primary px-3 py-2 font-semibold text-primary-foreground"><span>Grand Total</span><span className="tabular-nums">{inr(s.grand)}</span></div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 text-xs">
            <div><H n={5}>Payment terms</H><p className="text-muted-foreground">40% advance with PO, 50% against material delivery, 10% on handover & validation.</p></div>
            <div><H n={6}>Warranty</H><p className="text-muted-foreground">18 months from supply or 12 months from commissioning, whichever is earlier.</p></div>
            <div><H n={7}>Validity</H><p className="text-muted-foreground">This offer is valid for 30 days, until {q.validity}.</p></div>
          </div>
          <H n={8}>Terms & conditions</H>
          <ol className="list-decimal space-y-1 pl-5 text-xs text-muted-foreground"><li>Civil works, water and power at site are in client scope.</li><li>Delivery: 10–12 weeks from approved drawings and advance.</li><li>Prices are ex-works Ahmedabad; freight and insurance extra at actuals.</li><li>Any change in scope will be quoted separately.</li></ol>
          <div className="mt-10 flex justify-between border-t pt-6 text-xs"><div><div className="font-semibold">For KLIMA Engineering Pvt. Ltd.</div><div className="mt-8 text-muted-foreground">Authorised signatory</div></div><div className="text-right text-muted-foreground">www.klima.in · sales@klima.in<br />+91 79 4000 1234</div></div>
        </div>
      </div>
    </>
  );
}

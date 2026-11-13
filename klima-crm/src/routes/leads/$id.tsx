import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Calculator, FileText, Mail, Phone, Upload, FileSpreadsheet, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, Field, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { inrL, leads, quotations } from "@/lib/data";

export const Route = createFileRoute("/leads/$id")({
  loader: ({ params }) => { const lead = leads.find((l) => l.id === params.id); if (!lead) throw notFound(); return lead; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.company ?? "Lead"} – KlimaCRM` },
    { name: "description", content: `Lead profile for ${loaderData?.project ?? "a cleanroom project"}.` },
    { property: "og:title", content: `${loaderData?.company ?? "Lead"} – KlimaCRM` },
    { property: "og:description", content: "Lead profile, requirements, estimations and activity." },
  ]}),
  component: LeadDetail,
});

const timeline = [
  ["10 Nov 2026, 4:20 PM", "Estimation v2 submitted for approval", "Rahul Mehta", "Estimation"],
  ["08 Nov 2026, 11:05 AM", "Estimation v1 created – ₹2.84 Cr", "Kavita Shah", "Estimation"],
  ["06 Nov 2026, 3:30 PM", "Site visit completed at Changodar GIDC", "Rahul Mehta", "Meeting"],
  ["04 Nov 2026, 10:00 AM", "Technical requirements captured", "Rahul Mehta", "Requirement"],
  ["03 Nov 2026, 2:15 PM", "Discovery call with Dr. Anil Verma", "Rahul Mehta", "Call"],
  ["02 Nov 2026, 9:40 AM", "Lead created from website enquiry", "System", "Lead"],
];

function LeadDetail() {
  const l = Route.useLoaderData();
  const qs = quotations.filter((q) => q.lead === l.id);
  return (
    <>
      <PageHeader crumb={`Leads / ${l.id}`} title={l.company} subtitle={l.project}
        actions={<><Button variant="outline"><Phone />Log call</Button><Button variant="outline" asChild><Link to="/emails"><Mail />Email</Link></Button><Button asChild><Link to="/estimation"><Calculator />Open estimation</Link></Button></>} />
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <Tabs defaultValue="overview">
          <TabsList className="mb-4 h-auto flex-wrap justify-start bg-transparent p-0">
            {["Overview", "Customer Details", "Project Requirements", "Technical Specifications", "Estimations", "Quotations", "Communication", "Activities & Follow-ups", "Documents"].map((t) => (
              <TabsTrigger key={t} value={t === "Overview" ? "overview" : t} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none">{t}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <Panel title="Project snapshot"><div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              <Field label="Area" value={l.area} /><Field label="Classification" value={l.classification} /><Field label="Industry" value={l.industry} /><Field label="Location" value={l.location} />
              <Field label="HVAC" value="Required" /><Field label="Modular Panels" value="Required" /><Field label="Validation" value="DQ/IQ/OQ/PQ" /><Field label="Compliance" value="EU GMP, WHO GMP" />
            </div></Panel>
            <Panel title="Activity timeline"><Timeline /></Panel>
          </TabsContent>
          <TabsContent value="Customer Details"><Panel><div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            <Field label="Contact Person" value={l.contact} /><Field label="Designation" value={l.designation} /><Field label="Email" value={l.email} /><Field label="Phone" value={l.phone} /><Field label="Website" value="www.abcpharma.in" /><Field label="Lead Source" value="Website enquiry" />
          </div></Panel></TabsContent>
          <TabsContent value="Project Requirements"><Panel><div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            <Field label="Project Type" value="Cleanroom" /><Field label="Category" value="New Project" /><Field label="Facility" value="Manufacturing" /><Field label="Floors" value="2" /><Field label="Start" value="Jan 2027" /><Field label="Completion" value="Jul 2027" /><Field label="Budget" value="₹2.5 – 3.0 Cr" /><Field label="Purpose" value="Sterile injectables" />
          </div></Panel></TabsContent>
          <TabsContent value="Technical Specifications"><Panel><div className="grid grid-cols-2 gap-5 md:grid-cols-3">
            {[["Temperature", "21 ± 2 °C"], ["Humidity", "45 ± 5 % RH"], ["Pressure", "15 Pa cascade"], ["ACPH", "30–40"], ["Filtration", "HEPA H14"], ["AHU", "4 × 12,000 CFM"], ["Flooring", "Epoxy, antistatic"], ["Ceiling", "Walkable"], ["BMS", "Required"]].map(([a, b]) => <Field key={a} label={a!} value={b} />)}
          </div></Panel></TabsContent>
          <TabsContent value="Estimations"><Panel bodyClass="p-0"><DataTable head={["Version", "Created by", "Date", "Amount", "Status"]}>
            <tr><td className="font-medium">v2</td><td>Rahul Mehta</td><td>10 Nov 2026</td><td>{inrL(29173525)}</td><td><StatusBadge status="Pending Approval" /></td></tr>
            <tr><td className="font-medium">v1</td><td>Kavita Shah</td><td>08 Nov 2026</td><td>{inrL(28410000)}</td><td><StatusBadge status="Draft" /></td></tr>
          </DataTable></Panel></TabsContent>
          <TabsContent value="Quotations"><Panel bodyClass="p-0"><DataTable head={["Quotation", "Amount", "Created", "Status"]}>
            {qs.map((q) => <tr key={q.id}><td><Link to="/quotations/$id" params={{ id: q.id }} className="font-mono text-xs text-primary">{q.id}</Link></td><td>{inrL(q.amount)}</td><td>{q.created}</td><td><StatusBadge status={q.status} /></td></tr>)}
          </DataTable></Panel></TabsContent>
          <TabsContent value="Communication"><Panel bodyClass="space-y-3">
            {[["Re: Cleanroom requirement – URS attached", "Dr. Anil Verma", "05 Nov"], ["Site visit confirmation", "Rahul Mehta", "04 Nov"], ["Thank you for your enquiry", "Rahul Mehta", "02 Nov"]].map(([s, f, d]) => <div key={s} className="flex items-center gap-3 rounded-md border p-3"><Mail className="size-4 text-muted-foreground" /><div className="flex-1"><div className="text-sm font-medium">{s}</div><div className="text-xs text-muted-foreground">{f}</div></div><span className="text-xs text-muted-foreground">{d}</span></div>)}
          </Panel></TabsContent>
          <TabsContent value="Activities & Follow-ups"><Panel><Timeline /></Panel></TabsContent>
          <TabsContent value="Documents"><Panel action={<Button size="sm" variant="outline"><Upload />Upload</Button>} title="Documents" bodyClass="grid gap-3 md:grid-cols-2">
            {[["URS_ABC_Pharma_v1.pdf", "1.2 MB", File], ["Site_Layout_Rev3.dwg", "4.8 MB", File], ["BOQ_Estimation_v2.xlsx", "320 KB", FileSpreadsheet], ["QT-2026-0418.pdf", "860 KB", FileText]].map(([n, s, I]) => { const Icon = I as typeof File; return <div key={n as string} className="flex items-center gap-3 rounded-md border p-3"><span className="grid size-9 place-items-center rounded bg-accent text-accent-foreground"><Icon className="size-4" /></span><div><div className="text-sm font-medium">{n as string}</div><div className="text-xs text-muted-foreground">{s as string}</div></div></div>; })}
          </Panel></TabsContent>
        </Tabs>
        <aside className="space-y-4">
          <Panel title="Lead summary" bodyClass="space-y-4">
            <Field label="Lead ID" value={<span className="font-mono">{l.id}</span>} />
            <Field label="Status" value={<StatusBadge status={l.status} />} />
            <Field label="Project value" value={<span className="text-lg">{inrL(l.value)}</span>} />
            <Field label="Assigned agent" value={l.agent} />
            <Field label="Next follow-up" value={l.followUp} />
            <Field label="Created" value={l.created} />
          </Panel>
          <Panel title="Journey" bodyClass="space-y-2">
            {["Lead Created", "Requirements", "Estimation", "Approval", "Quotation", "Proposal", "Follow-ups", "Conversion"].map((s, i) => (
              <div key={s} className="flex items-center gap-2 text-sm"><span className={`size-2.5 rounded-full ${i < 3 ? "bg-primary" : i === 3 ? "bg-warning" : "bg-border"}`} /><span className={i > 3 ? "text-muted-foreground" : ""}>{s}</span></div>
            ))}
          </Panel>
        </aside>
      </div>
    </>
  );
}

function Timeline() {
  return (
    <ol className="relative ml-2 border-l">
      {timeline.map(([d, t, who, type]) => (
        <li key={d} className="mb-6 ml-5 last:mb-0">
          <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full border-2 border-card bg-primary" />
          <div className="flex items-center gap-2"><span className="text-sm font-medium">{t}</span><span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">{type}</span></div>
          <div className="text-xs text-muted-foreground">{who} · {d}</div>
        </li>
      ))}
    </ol>
  );
}

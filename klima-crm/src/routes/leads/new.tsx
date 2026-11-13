import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageHeader, Panel } from "@/components/kit";
import { agents } from "@/lib/data";
import { meta } from "@/lib/meta";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/leads/new")({
  head: () => meta("New Lead", "Capture customer, project, technical and commercial details for a new lead."),
  component: NewLead,
});

type F = [label: string, kind?: "select" | "date" | "textarea" | "check" | "radio" | undefined, opts?: string[] | undefined, ph?: string | undefined];
const steps: { title: string; desc: string; fields: F[] }[] = [
  { title: "Customer Details", desc: "Who is the customer?", fields: [
    ["Company Name", undefined, undefined, "ABC Pharmaceuticals Pvt. Ltd."], ["Contact Person", undefined, undefined, "Dr. Anil Verma"], ["Designation", undefined, undefined, "Head – Projects"],
    ["Email", undefined, undefined, "anil.verma@abcpharma.in"], ["Phone", undefined, undefined, "+91 98200 41256"], ["Website", undefined, undefined, "www.abcpharma.in"],
    ["Industry", "select", ["Pharmaceutical", "Biotech", "Semiconductor", "Healthcare", "Food & Beverage"]], ["Country", "select", ["India", "UAE", "Saudi Arabia", "Bangladesh"]],
    ["State / City", undefined, undefined, "Gujarat / Ahmedabad"], ["Lead Source", "select", ["Website", "Referral", "Exhibition", "Cold Call", "Tender"]], ["Assigned Sales Agent", "select", agents] ] },
  { title: "Project Information", desc: "Scope and timeline", fields: [
    ["Project Name", undefined, undefined, "Pharmaceutical Cleanroom Facility"], ["Project Type", "select", ["Cleanroom", "Modular OT", "Laboratory", "Clean Utility"]], ["Project Location", undefined, undefined, "Changodar GIDC, Ahmedabad"],
    ["Project Purpose", undefined, undefined, "Sterile injectable manufacturing"], ["Facility Type", "select", ["Manufacturing", "R&D", "QC Lab", "Hospital"]], ["Project Category", "radio", ["New Project", "Expansion", "Renovation"]],
    ["Total Project Area", undefined, undefined, "5,000"], ["Area Unit", "radio", ["Sq. Ft.", "Sq. M."]], ["Number of Floors", undefined, undefined, "2"],
    ["Expected Start Date", "date"], ["Expected Completion Date", "date"], ["Project Budget", undefined, undefined, "₹ 2.5 – 3.0 Cr"] ] },
  { title: "Technical Requirements", desc: "Cleanroom specifications", fields: [
    ["Cleanroom Classification", "select", ["ISO Class 5", "ISO Class 6", "ISO Class 7", "ISO Class 8"]], ["Cleanroom Area", undefined, undefined, "5,000 Sq. Ft."], ["Temperature Requirements", undefined, undefined, "21 ± 2 °C"],
    ["Humidity Requirements", undefined, undefined, "45 ± 5 % RH"], ["Pressure Differential", undefined, undefined, "15 Pa cascade"], ["Air Changes Per Hour", undefined, undefined, "30–40 ACPH"],
    ["HEPA / ULPA Filtration", "select", ["HEPA H13", "HEPA H14", "ULPA U15"]], ["HVAC Requirements", "select", ["Required", "Not Required", "Existing – Upgrade"]], ["AHU Requirements", undefined, undefined, "4 × 12,000 CFM"],
    ["Modular Panel Requirements", "select", ["Required – 50mm PUF", "Required – 80mm Rockwool", "Not Required"]], ["Flooring Requirements", undefined, undefined, "Epoxy self-levelling, antistatic"], ["Ceiling Requirements", undefined, undefined, "Walkable ceiling"],
    ["Electrical Requirements", undefined, undefined, "Cleanroom LED, DB, earthing"], ["BMS / Automation", "select", ["Required", "Not Required"]], ["Additional Equipment", undefined, undefined, "Pass boxes, air showers, LAF"] ] },
  { title: "Certifications & Compliance", desc: "Regulatory scope", fields: [
    ["ISO 14644", "check"], ["EU GMP", "check"], ["WHO GMP", "check"], ["USFDA-related Requirements", "check"],
    ["Local Regulatory Requirements", undefined, undefined, "CDSCO Schedule M"], ["Validation Requirements", "select", ["DQ / IQ / OQ / PQ", "IQ / OQ only", "Not Required"]], ["Additional Compliance Notes", "textarea"] ] },
  { title: "Commercial Scope", desc: "Deliverables & terms", fields: [
    ["Design & Engineering", "check"], ["Material Supply", "check"], ["Cleanroom Construction", "check"], ["HVAC Installation", "check"], ["Electrical & Mechanical Works", "check"],
    ["Equipment Installation", "check"], ["Testing & Commissioning", "check"], ["Qualification & Validation", "check"], ["Maintenance & Support", "check"],
    ["Payment Terms", "select", ["40% Advance, 50% on Delivery, 10% on Handover", "30 / 60 / 10", "Milestone based"]], ["Warranty Requirements", "select", ["12 months", "18 months", "24 months"]], ["Additional Notes", "textarea"] ] },
];

const input = "h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-ring";

function FieldInput({ f }: { f: F }) {
  const [label, kind, opts, ph] = f;
  if (kind === "check") return <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm hover:bg-muted/50"><input type="checkbox" defaultChecked className="size-4 accent-[var(--primary)]" />{label}</label>;
  return (
    <label className={cn("block", kind === "textarea" && "md:col-span-3")}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {kind === "select" ? <select className={input}>{opts!.map((o) => <option key={o}>{o}</option>)}</select>
        : kind === "radio" ? <div className="flex h-9 gap-1 rounded-md border bg-muted p-1">{opts!.map((o, i) => <label key={o} className="flex flex-1 cursor-pointer items-center justify-center rounded text-xs has-[:checked]:bg-card has-[:checked]:font-medium has-[:checked]:shadow-sm"><input type="radio" name={label} defaultChecked={i === 0} className="sr-only" />{o}</label>)}</div>
        : kind === "textarea" ? <textarea rows={3} className={cn(input, "h-auto py-2")} placeholder="Add notes…" />
        : <input type={kind === "date" ? "date" : "text"} placeholder={ph} className={input} />}
    </label>
  );
}

function NewLead() {
  const [step, setStep] = useState(0);
  const nav = useNavigate();
  const s = steps[step]!;
  return (
    <>
      <PageHeader crumb="Leads / New" title="Create new lead" subtitle="Capture complete requirements once — the estimation team will fetch them automatically." />
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <ol className="space-y-1">
          {steps.map((x, i) => (
            <li key={x.title}><button onClick={() => setStep(i)} className={cn("flex w-full items-center gap-3 rounded-md p-3 text-left", i === step ? "bg-card ring-1 ring-border" : "hover:bg-muted")}>
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold", i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-accent text-accent-foreground ring-2 ring-primary" : "bg-muted text-muted-foreground")}>{i < step ? <Check className="size-3.5" /> : i + 1}</span>
              <span><span className="block text-sm font-medium">{x.title}</span><span className="text-xs text-muted-foreground">{x.desc}</span></span>
            </button></li>
          ))}
        </ol>
        <Panel title={`Step ${step + 1} of ${steps.length} · ${s.title}`} action={<div className="h-1.5 w-40 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>}>
          <div className={cn("grid gap-4", "md:grid-cols-3")}>{s.fields.map((f) => <FieldInput key={f[0]} f={f} />)}</div>
          <div className="mt-8 flex justify-between border-t pt-5">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}><ChevronLeft />Back</Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => toast.success("Draft saved")}>Save draft</Button>
              {step < steps.length - 1 ? <Button onClick={() => setStep(step + 1)}>Continue<ChevronRight /></Button>
                : <Button onClick={() => { toast.success("Lead KLIMA-00126 created"); nav({ to: "/leads/$id", params: { id: "KLIMA-00125" } }); }}>Create lead</Button>}
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}

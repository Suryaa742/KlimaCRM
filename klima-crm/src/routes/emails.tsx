import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Paperclip, Send, Clock, FileText, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/emails")({
  head: () => meta("Email & Follow-ups", "Send proposals, schedule follow-ups and track email sequences."),
  component: Emails,
});

const templates = ["Proposal Submission", "Follow-up – Gentle Reminder", "Follow-up – Final", "Site Visit Confirmation", "Thank You – Order Won"];
const seq = [["Day 0", "Proposal Sent", "10 Nov 2026", "Sent"], ["Day 3", "First Follow-up", "13 Nov 2026", "Scheduled"], ["Day 7", "Second Follow-up", "17 Nov 2026", "Pending"], ["Day 14", "Final Follow-up", "24 Nov 2026", "Pending"]];
const inp = "h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-ring";

function Emails() {
  const [tpl, setTpl] = useState(templates[0]);
  return (
    <>
      <PageHeader crumb="Workspace" title="Email & Follow-ups" subtitle="Proposals, templates and automated follow-up sequences" />
      <div className="grid gap-6 xl:grid-cols-[240px_1fr_340px]">
        <Panel title="Templates" bodyClass="p-2">
          {templates.map((t) => <button key={t} onClick={() => setTpl(t)} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${tpl === t ? "bg-accent font-medium text-accent-foreground" : "hover:bg-muted"}`}><FileText className="size-4 shrink-0" />{t}</button>)}
        </Panel>
        <Panel title={`New email · ${tpl}`} bodyClass="space-y-3">
          <div className="grid grid-cols-[60px_1fr] items-center gap-3 text-sm"><span className="text-muted-foreground">To</span><input className={inp} defaultValue="Dr. Anil Verma <anil.verma@abcpharma.in>" /><span className="text-muted-foreground">CC</span><input className={inp} defaultValue="rahul.mehta@klima.in" /><span className="text-muted-foreground">Subject</span><input className={inp} defaultValue="KLIMA Proposal – Pharmaceutical Cleanroom Facility (QT-2026-0418)" /></div>
          <textarea rows={11} className={`${inp} h-auto py-3 leading-relaxed`} defaultValue={`Dear Dr. Verma,\n\nThank you for the opportunity to propose for your Pharmaceutical Cleanroom Facility at Changodar GIDC.\n\nPlease find attached our techno-commercial offer QT-2026-0418 for a 5,000 Sq. Ft. ISO Class 7 cleanroom, covering modular panels, HVAC with AHUs, HEPA filtration, flooring, electricals and full validation (DQ/IQ/OQ/PQ).\n\nWe would be glad to walk your team through the proposal at your convenience.\n\nWarm regards,\nRahul Mehta\nSales Manager, KLIMA`} />
          <div className="flex items-center gap-3 rounded-md border bg-muted/50 p-3"><span className="grid size-9 place-items-center rounded bg-danger-soft text-destructive"><Paperclip className="size-4" /></span><div className="flex-1"><div className="text-sm font-medium">QT-2026-0418_ABC_Pharmaceuticals.pdf</div><div className="text-xs text-muted-foreground">860 KB · Quotation PDF</div></div><Check className="size-4 text-success" /></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="accent-[var(--primary)]" />Start 14-day follow-up sequence after sending</label>
          <div className="flex justify-end gap-2 border-t pt-4"><Button variant="outline" onClick={() => toast.success("Scheduled for 14 Nov, 10:00 AM")}><Clock />Schedule</Button><Button onClick={() => toast.success("Proposal sent to Dr. Anil Verma")}><Send />Send Now</Button></div>
        </Panel>
        <Panel title="Follow-up sequence · QT-2026-0418">
          <ol className="relative ml-2 border-l">
            {seq.map(([d, t, date, st]) => (
              <li key={d} className="mb-6 ml-5 last:mb-0"><span className={`absolute -left-[7px] mt-1 size-3.5 rounded-full border-2 border-card ${st === "Sent" ? "bg-success" : st === "Scheduled" ? "bg-primary" : "bg-border"}`} />
                <div className="flex items-center justify-between"><span className="text-xs font-semibold text-primary">{d}</span><StatusBadge status={st} /></div><div className="text-sm font-medium">{t}</div><div className="text-xs text-muted-foreground">{date}</div></li>
            ))}
          </ol>
        </Panel>
      </div>
      <Tabs defaultValue="sent" className="mt-6">
        <TabsList><TabsTrigger value="sent">Sent emails</TabsTrigger><TabsTrigger value="scheduled">Scheduled</TabsTrigger><TabsTrigger value="upcoming">Upcoming follow-ups</TabsTrigger><TabsTrigger value="overdue">Overdue <span className="ml-1 rounded-full bg-destructive px-1.5 text-[10px] text-destructive-foreground">2</span></TabsTrigger></TabsList>
        {([["sent", [["NovaBio Sciences Ltd.", "Proposal – Biologics Fill-Finish Suite", "05 Nov 2026", "Sent"], ["Zenith Labs", "Thank you – Order confirmation", "02 Nov 2026", "Completed"], ["Semicon Wafer Tech", "Revised commercial offer", "01 Nov 2026", "Sent"]]],
          ["scheduled", [["ABC Pharmaceuticals", "First follow-up – QT-2026-0418", "13 Nov 2026", "Scheduled"], ["NovaBio Sciences Ltd.", "Second follow-up", "12 Nov 2026", "Scheduled"]]],
          ["upcoming", [["MediCare Hospitals", "Revised OT layout", "13 Nov 2026", "Pending"], ["Semicon Wafer Tech", "Negotiation call recap", "16 Nov 2026", "Pending"]]],
          ["overdue", [["Orion Optics", "Clarify ISO 6 scope", "09 Nov 2026", "Overdue"], ["FreshPack Foods", "Share reference projects", "08 Nov 2026", "Overdue"]]]] as const).map(([k, rows]) => (
          <TabsContent key={k} value={k}><Panel bodyClass="p-0"><DataTable head={["Customer", "Subject", "Date", "Status"]}>{rows.map((r) => <tr key={r[1]}><td className="font-medium">{r[0]}</td><td>{r[1]}</td><td className="text-muted-foreground">{r[2]}</td><td><StatusBadge status={r[3]} /></td></tr>)}</DataTable></Panel></TabsContent>
        ))}
      </Tabs>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, TrendingUp, Target, Timer, Percent } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Kpi, PageHeader, Panel } from "@/components/kit";
import { agents, monthly, pipeline } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/reports")({
  head: () => meta("Reports", "Lead, pipeline, estimation, quotation, approval, conversion and follow-up reports."),
  component: Reports,
});

const reports = ["Lead Performance", "Sales Pipeline", "Estimation Summary", "Quotation Report", "Approval Report", "Conversion Report", "Follow-up Report"];
const agentData = agents.map((a, i) => ({ a: a.split(" ")[0], leads: [38, 31, 29, 33, 23][i], won: [3, 2, 1, 1, 0][i] }));
const conv = monthly.map((m, i) => ({ m: m.m, rate: [22, 24, 26, 25, 29, 31][i], tat: [6.5, 5.8, 5.1, 4.6, 3.9, 3.2][i] }));
const ax = { tickLine: false, axisLine: false, fontSize: 11 };

function Reports() {
  const [r, setR] = useState(reports[0]);
  const [range, setRange] = useState("Last 6 months");
  return (
    <>
      <PageHeader crumb="Workspace" title="Reports" subtitle={r} actions={<>
        <div className="flex rounded-md border bg-card p-0.5">{["Last 30 days", "Last 6 months", "FY 2026–27"].map((x) => <button key={x} onClick={() => setRange(x)} className={`rounded px-3 py-1.5 text-xs ${range === x ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{x}</button>)}</div>
        <Button variant="outline"><Download />Export</Button></>} />
      <div className="mb-6 flex flex-wrap gap-2">{reports.map((x) => <button key={x} onClick={() => setR(x)} className={`rounded-full border px-3 py-1.5 text-sm ${r === x ? "border-primary bg-accent font-medium text-accent-foreground" : "bg-card hover:bg-muted"}`}>{x}</button>)}</div>
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Pipeline value" value="₹186.4 Cr" delta="+18% vs prior period" icon={TrendingUp} />
        <Kpi label="Win rate" value="31%" delta="+6 pts" icon={Target} />
        <Kpi label="Avg. estimation TAT" value="3.2 days" delta="−51% since automation" icon={Timer} />
        <Kpi label="Lead → quote conversion" value="47%" icon={Percent} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Leads & wins by sales agent"><div className="h-64"><ResponsiveContainer><BarChart data={agentData}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="a" {...ax} /><YAxis {...ax} width={30} /><Tooltip /><Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} /><Bar dataKey="leads" name="Leads" fill="var(--chart-1)" radius={[4, 4, 0, 0]} /><Bar dataKey="won" name="Won" fill="var(--chart-3)" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div></Panel>
        <Panel title="Conversion rate & estimation turnaround"><div className="h-64"><ResponsiveContainer><LineChart data={conv}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="m" {...ax} /><YAxis yAxisId="l" {...ax} width={30} unit="%" /><YAxis yAxisId="r" orientation="right" {...ax} width={30} unit="d" /><Tooltip /><Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} /><Line yAxisId="l" dataKey="rate" name="Conversion %" stroke="var(--chart-1)" strokeWidth={2} /><Line yAxisId="r" dataKey="tat" name="TAT (days)" stroke="var(--chart-4)" strokeWidth={2} /></LineChart></ResponsiveContainer></div></Panel>
        <Panel title="Pipeline funnel" className="lg:col-span-2" bodyClass="space-y-2">
          {pipeline.map((p) => <div key={p.stage} className="flex items-center gap-4 text-sm"><span className="w-32 text-muted-foreground">{p.stage}</span><div className="h-7 flex-1 rounded bg-muted"><div className="flex h-full items-center rounded bg-primary px-2 text-xs font-medium text-primary-foreground" style={{ width: `${(p.count / 42) * 100}%` }}>{p.count}</div></div><span className="w-20 text-right tabular-nums">₹{p.value} Cr</span></div>)}
        </Panel>
      </div>
    </>
  );
}

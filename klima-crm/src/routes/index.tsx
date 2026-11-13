import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, UserPlus, Calculator, Clock, Send, Trophy, Plus, Phone, Mail, CalendarClock } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts";
import { Button } from "@/components/ui/button";
import { DataTable, Kpi, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { activities, inrL, leads, monthly, pipeline } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dashboard – KlimaCRM" },
    { name: "description", content: "Sales pipeline, quotations and follow-ups for KLIMA cleanroom projects." },
    { property: "og:title", content: "Dashboard – KlimaCRM" },
    { property: "og:description", content: "Sales pipeline, quotations and follow-ups for KLIMA cleanroom projects." },
  ]}),
  component: Dashboard,
});

const statusData = [
  { name: "New", value: 42, c: "var(--chart-5)" }, { name: "Qualified", value: 63, c: "var(--chart-2)" },
  { name: "Estimation", value: 19, c: "var(--chart-4)" }, { name: "Proposal", value: 23, c: "var(--chart-1)" }, { name: "Won", value: 7, c: "var(--chart-3)" },
];
const approval = [
  { name: "Approved", value: 18, c: "var(--chart-3)" }, { name: "Pending", value: 6, c: "var(--chart-4)" },
  { name: "Changes", value: 3, c: "var(--chart-2)" }, { name: "Rejected", value: 2, c: "var(--destructive)" },
];
const tt = { contentStyle: { borderRadius: 6, border: "1px solid var(--border)", fontSize: 12 } };

function Donut({ data }: { data: { name: string; value: number; c: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <div className="flex items-center gap-6">
      <div className="relative size-40 shrink-0">
        <ResponsiveContainer><PieChart><Pie data={data} dataKey="value" innerRadius={52} outerRadius={72} paddingAngle={2} stroke="none">{data.map((d) => <Cell key={d.name} fill={d.c} />)}</Pie><Tooltip {...tt} /></PieChart></ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center text-center"><div><div className="text-xl font-semibold">{total}</div><div className="text-[10px] uppercase text-muted-foreground">Total</div></div></div>
      </div>
      <ul className="flex-1 space-y-2 text-sm">
        {data.map((d) => <li key={d.name} className="flex items-center gap-2"><span className="size-2.5 rounded-sm" style={{ background: d.c }} /><span className="flex-1 text-muted-foreground">{d.name}</span><span className="font-medium tabular-nums">{d.value}</span></li>)}
      </ul>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <PageHeader title="Good morning, Rahul" subtitle="Here's what's happening across your cleanroom sales pipeline today."
        actions={<><Button variant="outline">This quarter</Button><Button asChild><Link to="/leads/new"><Plus />New Lead</Link></Button></>} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Kpi label="Total Leads" value="154" delta="+12% vs last month" icon={Users} />
        <Kpi label="New Leads" value="42" delta="+8 this week" icon={UserPlus} />
        <Kpi label="Pending Estimations" value="19" icon={Calculator} />
        <Kpi label="Pending Approvals" value="6" icon={Clock} />
        <Kpi label="Quotations Sent" value="23" delta="₹14.8 Cr in value" icon={Send} />
        <Kpi label="Won Opportunities" value="7" delta="Win rate 31%" icon={Trophy} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Sales pipeline overview" className="xl:col-span-2" action={<span className="text-xs text-muted-foreground">Value in ₹ Cr</span>}>
          <div className="mb-4 grid grid-cols-7 gap-1">
            {pipeline.map((p, i) => (
              <div key={p.stage} className="rounded-md border p-2.5" style={{ background: `color-mix(in oklab, var(--primary) ${6 + i * 5}%, var(--card))` }}>
                <div className="truncate text-[11px] text-muted-foreground">{p.stage}</div>
                <div className="text-lg font-semibold">{p.count}</div>
                <div className="text-[11px] text-muted-foreground">₹{p.value} Cr</div>
              </div>
            ))}
          </div>
          <div className="h-48"><ResponsiveContainer><BarChart data={pipeline}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="stage" tickLine={false} axisLine={false} fontSize={11} /><YAxis tickLine={false} axisLine={false} fontSize={11} width={30} /><Tooltip {...tt} cursor={{ fill: "var(--muted)" }} /><Bar dataKey="value" fill="var(--chart-1)" radius={[4, 4, 0, 0]} barSize={28} /></BarChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Leads by status"><Donut data={statusData} /></Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Monthly quotation value" className="xl:col-span-2" action={<div className="flex gap-4 text-xs"><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-1" />Quoted</span><span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-chart-3" />Won</span></div>}>
          <div className="h-60"><ResponsiveContainer><AreaChart data={monthly}><CartesianGrid vertical={false} stroke="var(--border)" /><XAxis dataKey="m" tickLine={false} axisLine={false} fontSize={11} /><YAxis tickLine={false} axisLine={false} fontSize={11} width={30} unit="Cr" /><Tooltip {...tt} /><Area dataKey="value" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.12} strokeWidth={2} /><Area dataKey="won" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.12} strokeWidth={2} /></AreaChart></ResponsiveContainer></div>
        </Panel>
        <Panel title="Quotation approval status"><Donut data={approval} /></Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Recent leads" className="xl:col-span-2" bodyClass="p-0" action={<Link to="/leads" className="text-xs font-medium text-primary">View all</Link>}>
          <DataTable head={["Lead", "Company", "Project", "Status", "Value"]}>
            {leads.slice(0, 5).map((l) => (
              <tr key={l.id}><td><Link to="/leads/$id" params={{ id: l.id }} className="font-mono text-xs font-medium text-primary">{l.id}</Link></td><td className="font-medium">{l.company}</td><td className="text-muted-foreground">{l.project}</td><td><StatusBadge status={l.status} /></td><td className="tabular-nums">{inrL(l.value)}</td></tr>
            ))}
          </DataTable>
        </Panel>
        <div className="space-y-6">
          <Panel title="Upcoming follow-ups" bodyClass="space-y-3">
            {[["Orion Optics", "Call – clarify ISO 6 scope", "Today, 3:00 PM", Phone], ["MediCare Hospitals", "Send revised OT layout", "13 Nov", Mail], ["NovaBio Sciences", "Proposal follow-up #2", "14 Nov", Mail], ["ABC Pharmaceuticals", "Estimation review meeting", "15 Nov", CalendarClock]].map(([c, t, d, I]) => {
              const Icon = I as typeof Phone;
              return <div key={c as string} className="flex items-start gap-3"><span className="mt-0.5 grid size-8 place-items-center rounded-md bg-accent text-accent-foreground"><Icon className="size-4" /></span><div className="flex-1"><div className="text-sm font-medium">{c as string}</div><div className="text-xs text-muted-foreground">{t as string}</div></div><span className="text-xs text-muted-foreground">{d as string}</span></div>;
            })}
          </Panel>
          <Panel title="Recent activities" bodyClass="space-y-3">
            {activities.map((a, i) => <div key={i} className="flex gap-3 text-sm"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-highlight" /><div><span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.what}</span> <span className="font-medium text-primary">{a.target}</span><div className="text-xs text-muted-foreground">{a.time}</div></div></div>)}
          </Panel>
        </div>
      </div>
    </>
  );
}

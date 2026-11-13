import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function PageHeader({ title, subtitle, actions, crumb }: { title: string; subtitle?: string | undefined; actions?: ReactNode; crumb?: string | undefined }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {crumb && <div className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{crumb}</div>}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

const tones: Record<string, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-primary",
  danger: "bg-danger-soft text-destructive",
  muted: "bg-muted text-muted-foreground",
};
const statusTone: Record<string, keyof typeof tones> = {
  New: "info", Contacted: "muted", Qualified: "info", Estimation: "warning", "Quotation Sent": "info",
  Negotiation: "warning", Won: "success", Lost: "danger", Approved: "success", Accepted: "success",
  "Pending Approval": "warning", Pending: "warning", Sent: "info", Draft: "muted", Rejected: "danger",
  "Changes Requested": "danger", Scheduled: "info", Completed: "success", Overdue: "danger",
  Active: "success", Inactive: "muted", Invited: "warning", "In Review": "warning",
};

export function StatusBadge({ status = "" }: { status?: string | undefined }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium", tones[statusTone[status] ?? "muted"])}>
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function Panel({ title, action, children, className, bodyClass }: { title?: string; action?: ReactNode; children: ReactNode; className?: string; bodyClass?: string }) {
  return (
    <section className={cn("rounded-lg border bg-card", className)}>
      {title && (
        <header className="flex items-center justify-between border-b px-5 py-3">
          <h2 className="text-sm font-semibold">{title}</h2>
          {action}
        </header>
      )}
      <div className={cn("p-5", bodyClass)}>{children}</div>
    </section>
  );
}

export function Kpi({ label, value, delta, icon: Icon }: { label: string; value: string; delta?: string; icon: LucideIcon }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="grid size-8 place-items-center rounded-md bg-accent text-accent-foreground"><Icon className="size-4" /></span>
      </div>
      <div className="mt-3 text-2xl font-semibold tabular-nums">{value}</div>
      {delta && <div className="mt-1 text-xs text-success">{delta}</div>}
    </div>
  );
}

export function DataTable({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/60 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {head.map((h) => <th key={h} className="whitespace-nowrap px-4 py-2.5 font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody className="[&_td]:whitespace-nowrap [&_td]:px-4 [&_td]:py-3 [&_tr]:border-b [&_tr:last-child]:border-0 [&_tr:hover]:bg-muted/40">{children}</tbody>
      </table>
    </div>
  );
}

export function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-medium">{value}</div>
    </div>
  );
}

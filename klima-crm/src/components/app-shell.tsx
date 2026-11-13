import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, ClipboardList, Calculator, FileText, CheckCircle2, Mail, BarChart3,
  Package, IndianRupee, SlidersHorizontal, UserCog, Settings, Search, Bell, PanelLeft, HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const nav = [
  { group: "Workspace", items: [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/leads", label: "Leads", icon: Users },
    { to: "/requirements", label: "Requirements", icon: ClipboardList },
    { to: "/estimation", label: "Estimation Engine", icon: Calculator },
    { to: "/quotations", label: "Quotations", icon: FileText },
    { to: "/approvals", label: "Approvals", icon: CheckCircle2, badge: "3" },
    { to: "/emails", label: "Email & Follow-ups", icon: Mail },
    { to: "/reports", label: "Reports", icon: BarChart3 },
  ]},
  { group: "Administration", items: [
    { to: "/admin/products", label: "Product & Service Master", icon: Package },
    { to: "/admin/rates", label: "Rate Configuration", icon: IndianRupee },
    { to: "/admin/pricing", label: "Pricing Rules", icon: SlidersHorizontal },
    { to: "/admin/users", label: "User Management", icon: UserCog },
    { to: "/settings", label: "Settings", icon: Settings },
  ]},
] as const;

export function Logo({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-8 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">K</div>
      {!compact && <div className="leading-tight"><div className="text-[15px] font-semibold tracking-tight">Klima<span className="text-highlight">CRM</span></div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cleanroom Solutions</div></div>}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className={cn("sticky top-0 flex h-screen shrink-0 flex-col border-r bg-sidebar transition-all", collapsed ? "w-16" : "w-64")}>
        <div className="flex h-14 items-center border-b px-4"><Logo compact={collapsed} /></div>
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {nav.map((g) => (
            <div key={g.group} className="mb-5">
              {!collapsed && <div className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{g.group}</div>}
              {g.items.map((it) => (
                <Link key={it.to} to={it.to} title={it.label}
                  className={cn("mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active(it.to) ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-muted")}>
                  <it.icon className="size-4 shrink-0" />
                  {!collapsed && <span className="flex-1 truncate">{it.label}</span>}
                  {!collapsed && "badge" in it && <span className="rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">{it.badge}</span>}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        {!collapsed && (
          <div className="m-3 rounded-md border bg-muted/50 p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 font-medium text-foreground"><HelpCircle className="size-3.5" />Need help?</div>
            <div className="mt-1">Sales playbook & estimation guides</div>
          </div>
        )}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-card/95 px-4 backdrop-blur">
          <button onClick={() => setCollapsed(!collapsed)} className="rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="Toggle sidebar"><PanelLeft className="size-4" /></button>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search leads, quotations, companies…" className="h-9 w-full rounded-md border bg-background pl-9 pr-14 text-sm outline-none focus:border-ring" />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 text-[10px] text-muted-foreground">⌘K</kbd>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => toast("3 quotations awaiting your approval")} className="relative rounded-md p-2 text-muted-foreground hover:bg-muted" aria-label="Notifications">
              <Bell className="size-4" /><span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
            </button>
            <div className="ml-2 flex items-center gap-2.5 border-l pl-4">
              <div className="grid size-8 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">RM</div>
              <div className="hidden leading-tight md:block"><div className="text-sm font-medium">Rahul Mehta</div><div className="text-xs text-muted-foreground">Sales Manager</div></div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

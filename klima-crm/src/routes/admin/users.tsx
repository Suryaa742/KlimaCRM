import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { users } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/admin/users")({
  head: () => meta("User Management", "Manage KlimaCRM users, roles and departments."),
  component: () => (
    <>
      <PageHeader crumb="Administration" title="User Management" subtitle={`${users.length} users · 5 roles`} actions={<Button><UserPlus />Invite user</Button>} />
      <Panel bodyClass="p-0"><DataTable head={["User", "Email", "Role", "Department", "Status"]}>
        {users.map(([n, e, r, d, s]) => <tr key={e}><td><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">{n.split(" ").map((w) => w[0]).join("")}</span><span className="font-medium">{n}</span></div></td><td className="text-muted-foreground">{e}</td><td>{r}</td><td>{d}</td><td><StatusBadge status={s} /></td></tr>)}
      </DataTable></Panel>
    </>
  ),
});

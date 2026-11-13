import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, PageHeader, Panel, StatusBadge } from "@/components/kit";
import { inr, products } from "@/lib/data";
import { meta } from "@/lib/meta";

export const Route = createFileRoute("/admin/products")({
  head: () => meta("Product & Service Master", "Catalogue of cleanroom products and services used in estimations."),
  component: () => (
    <>
      <PageHeader crumb="Administration" title="Product & Service Master" subtitle={`${products.length} items used by the Estimation Engine`} actions={<Button><Plus />Add product</Button>} />
      <Panel bodyClass="p-0"><DataTable head={["Product Name", "Category", "Unit", "Default Rate", "Status", ""]}>
        {products.map(([n, c, u, r, s]) => <tr key={n}><td className="font-medium">{n}</td><td><span className="rounded bg-accent px-2 py-0.5 text-xs text-accent-foreground">{c}</span></td><td>{u}</td><td className="tabular-nums">{inr(r)}</td><td><StatusBadge status={s} /></td><td><Button size="icon" variant="ghost" aria-label="Edit"><Pencil /></Button></td></tr>)}
      </DataTable></Panel>
    </>
  ),
});

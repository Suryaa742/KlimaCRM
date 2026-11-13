import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DataTable, PageHeader, Panel } from "@/components/kit";
import { products } from "@/lib/data";
import { meta } from "@/lib/meta";

const dates = ["01 Nov 2026", "01 Nov 2026", "18 Oct 2026", "18 Oct 2026", "05 Oct 2026", "01 Nov 2026", "22 Sep 2026", "01 Nov 2026", "12 Aug 2026", "05 Oct 2026", "01 Nov 2026"];
export const Route = createFileRoute("/admin/rates")({
  head: () => meta("Rate Configuration", "Current unit rates applied in KLIMA estimations."),
  component: () => (
    <>
      <PageHeader crumb="Administration" title="Rate Configuration" subtitle="Rate card effective from 01 Nov 2026" actions={<Button onClick={() => toast.success("Rate card published")}>Publish rate card</Button>} />
      <Panel bodyClass="p-0"><DataTable head={["Product / Service", "Unit", "Current Rate", "Currency", "Last Updated"]}>
        {products.map(([n, , u, r], i) => <tr key={n}><td className="font-medium">{n}</td><td>{u}</td><td><input defaultValue={r.toLocaleString("en-IN")} className="h-8 w-32 rounded border bg-background px-2 text-right tabular-nums outline-none focus:border-ring" /></td><td>INR</td><td className="text-muted-foreground">{dates[i]}</td></tr>)}
      </DataTable></Panel>
    </>
  ),
});

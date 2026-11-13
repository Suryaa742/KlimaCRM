import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Panel } from "@/components/kit";
import { meta } from "@/lib/meta";

const rules = [
  ["Area-based Pricing", "ISO 7: ₹4,500–6,500 / Sq. Ft. benchmark; ISO 5: ₹9,000–12,000 / Sq. Ft.", "Per Sq. Ft."],
  ["Quantity-based Pricing", "3% off HEPA filters above 50 Nos; 5% above 100 Nos", "Tiered"],
  ["Fixed Charges", "Mobilisation ₹1,50,000 · Documentation ₹75,000", "₹2,25,000"],
  ["Labour Charges", "Applied on material cost", "4%"],
  ["Overhead", "Applied on material + labour + services", "5%"],
  ["Profit Margin", "Default margin; minimum 10% requires no approval", "12%"],
  ["Tax", "GST on taxable value", "18%"],
  ["Discount Limits", "Sales: up to 3% · Manager: up to 5% · Director: above 5%", "Max 5%"],
];
export const Route = createFileRoute("/admin/pricing")({
  head: () => meta("Pricing Rules", "Margins, overheads, taxes and discount limits for estimations."),
  component: () => (
    <>
      <PageHeader crumb="Administration" title="Pricing Rules" subtitle="Rules applied automatically by the Estimation Engine" actions={<Button onClick={() => toast.success("Pricing rules saved")}>Save changes</Button>} />
      <div className="grid gap-4 md:grid-cols-2">
        {rules.map(([t, d, v]) => (
          <Panel key={t} bodyClass="flex items-start gap-4">
            <div className="flex-1"><div className="font-semibold">{t}</div><div className="mt-1 text-sm text-muted-foreground">{d}</div></div>
            <div className="flex flex-col items-end gap-3"><input defaultValue={v} className="h-9 w-28 rounded-md border bg-background px-2 text-right text-sm font-medium outline-none focus:border-ring" /><Switch defaultChecked /></div>
          </Panel>
        ))}
      </div>
    </>
  ),
});

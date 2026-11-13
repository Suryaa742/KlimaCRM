import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageHeader, Panel } from "@/components/kit";
import { meta } from "@/lib/meta";

const inp = "h-9 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-ring";
export const Route = createFileRoute("/settings")({
  head: () => meta("Settings", "Company profile, numbering and notification settings."),
  component: () => (
    <>
      <PageHeader crumb="Administration" title="Settings" actions={<Button onClick={() => toast.success("Settings saved")}>Save</Button>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Company profile" bodyClass="grid gap-4 md:grid-cols-2">
          {[["Company name", "KLIMA Engineering Pvt. Ltd."], ["GSTIN", "24AABCK1234L1Z5"], ["Email", "sales@klima.in"], ["Phone", "+91 79 4000 1234"]].map(([l, v]) => <label key={l}><span className="mb-1.5 block text-xs text-muted-foreground">{l}</span><input className={inp} defaultValue={v} /></label>)}
        </Panel>
        <Panel title="Numbering" bodyClass="grid gap-4 md:grid-cols-2">
          {[["Lead prefix", "KLIMA-"], ["Quotation prefix", "QT-2026-"], ["Default validity (days)", "30"], ["Default currency", "INR"]].map(([l, v]) => <label key={l}><span className="mb-1.5 block text-xs text-muted-foreground">{l}</span><input className={inp} defaultValue={v} /></label>)}
        </Panel>
        <Panel title="Notifications" className="lg:col-span-2" bodyClass="divide-y">
          {["Email me when a quotation needs my approval", "Daily digest of overdue follow-ups", "Notify agent when estimation is approved", "Alert when a discount exceeds the limit"].map((t) => <div key={t} className="flex items-center justify-between py-3 text-sm">{t}<Switch defaultChecked /></div>)}
        </Panel>
      </div>
    </>
  ),
});

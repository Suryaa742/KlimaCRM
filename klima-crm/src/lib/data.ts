export const agents = ["Rahul Mehta", "Priya Nair", "Arjun Kapoor", "Sneha Iyer", "Vikram Shah"];

export type Lead = {
  id: string; company: string; contact: string; designation: string; email: string; phone: string;
  project: string; industry: string; location: string; agent: string; status: string;
  value: number; created: string; followUp: string; area: string; classification: string;
};

export const leads: Lead[] = [
  { id: "KLIMA-00125", company: "ABC Pharmaceuticals Pvt. Ltd.", contact: "Dr. Anil Verma", designation: "Head – Projects", email: "anil.verma@abcpharma.in", phone: "+91 98200 41256", project: "Pharmaceutical Cleanroom Facility", industry: "Pharmaceutical", location: "Ahmedabad, GJ", agent: "Rahul Mehta", status: "Estimation", value: 29173525, created: "02 Nov 2026", followUp: "15 Nov 2026", area: "5,000 Sq. Ft.", classification: "ISO Class 7" },
  { id: "KLIMA-00124", company: "NovaBio Sciences Ltd.", contact: "Meera Joshi", designation: "Plant Director", email: "meera@novabio.com", phone: "+91 99870 11223", project: "Biologics Fill-Finish Suite", industry: "Biotech", location: "Hyderabad, TS", agent: "Priya Nair", status: "Quotation Sent", value: 32400000, created: "28 Oct 2026", followUp: "14 Nov 2026", area: "8,200 Sq. Ft.", classification: "ISO Class 5" },
  { id: "KLIMA-00123", company: "Semicon Wafer Tech", contact: "Karan Malhotra", designation: "VP Operations", email: "karan@semiconwt.com", phone: "+91 98111 55667", project: "Wafer Fab Expansion – Phase II", industry: "Semiconductor", location: "Dholera, GJ", agent: "Arjun Kapoor", status: "Negotiation", value: 84500000, created: "21 Oct 2026", followUp: "16 Nov 2026", area: "22,000 Sq. Ft.", classification: "ISO Class 4" },
  { id: "KLIMA-00122", company: "MediCare Hospitals", contact: "Dr. Sunita Rao", designation: "Facility Head", email: "sunita.rao@medicare.org", phone: "+91 90040 77889", project: "Modular OT Complex", industry: "Healthcare", location: "Pune, MH", agent: "Sneha Iyer", status: "Qualified", value: 12800000, created: "18 Oct 2026", followUp: "13 Nov 2026", area: "3,600 Sq. Ft.", classification: "ISO Class 7" },
  { id: "KLIMA-00121", company: "FreshPack Foods", contact: "Rohit Bansal", designation: "Plant Manager", email: "rohit@freshpack.in", phone: "+91 98765 43210", project: "Aseptic Packaging Line", industry: "Food & Beverage", location: "Indore, MP", agent: "Vikram Shah", status: "New", value: 6400000, created: "15 Oct 2026", followUp: "17 Nov 2026", area: "2,400 Sq. Ft.", classification: "ISO Class 8" },
  { id: "KLIMA-00120", company: "Zenith Labs", contact: "Ashok Pillai", designation: "QA Director", email: "ashok@zenithlabs.com", phone: "+91 97000 12345", project: "QC Microbiology Lab", industry: "Pharmaceutical", location: "Baddi, HP", agent: "Rahul Mehta", status: "Won", value: 9750000, created: "09 Oct 2026", followUp: "—", area: "1,800 Sq. Ft.", classification: "ISO Class 6" },
  { id: "KLIMA-00119", company: "Orion Optics", contact: "Neha Gupta", designation: "Engineering Manager", email: "neha@orionoptics.com", phone: "+91 98450 66778", project: "Lens Coating Cleanroom", industry: "Electronics", location: "Bengaluru, KA", agent: "Priya Nair", status: "Contacted", value: 7200000, created: "04 Oct 2026", followUp: "12 Nov 2026", area: "2,900 Sq. Ft.", classification: "ISO Class 6" },
  { id: "KLIMA-00118", company: "Vita Nutraceuticals", contact: "Sameer Khan", designation: "Director", email: "sameer@vitanutra.com", phone: "+91 99300 88990", project: "Oral Solid Dosage Block", industry: "Nutraceutical", location: "Vapi, GJ", agent: "Arjun Kapoor", status: "Lost", value: 14300000, created: "29 Sep 2026", followUp: "—", area: "6,100 Sq. Ft.", classification: "ISO Class 8" },
];

export const quotations = [
  { id: "QT-2026-0418", lead: "KLIMA-00125", company: "ABC Pharmaceuticals Pvt. Ltd.", project: "Pharmaceutical Cleanroom Facility", amount: 29173525, created: "10 Nov 2026", status: "Pending Approval", validity: "10 Dec 2026", by: "Rahul Mehta" },
  { id: "QT-2026-0417", lead: "KLIMA-00124", company: "NovaBio Sciences Ltd.", project: "Biologics Fill-Finish Suite", amount: 32400000, created: "05 Nov 2026", status: "Sent", validity: "05 Dec 2026", by: "Priya Nair" },
  { id: "QT-2026-0416", lead: "KLIMA-00123", company: "Semicon Wafer Tech", project: "Wafer Fab Expansion – Phase II", amount: 84500000, created: "01 Nov 2026", status: "Approved", validity: "01 Dec 2026", by: "Arjun Kapoor" },
  { id: "QT-2026-0415", lead: "KLIMA-00122", company: "MediCare Hospitals", project: "Modular OT Complex", amount: 12800000, created: "29 Oct 2026", status: "Changes Requested", validity: "28 Nov 2026", by: "Sneha Iyer" },
  { id: "QT-2026-0414", lead: "KLIMA-00120", company: "Zenith Labs", project: "QC Microbiology Lab", amount: 9750000, created: "20 Oct 2026", status: "Accepted", validity: "19 Nov 2026", by: "Rahul Mehta" },
  { id: "QT-2026-0413", lead: "KLIMA-00118", company: "Vita Nutraceuticals", project: "Oral Solid Dosage Block", amount: 14300000, created: "12 Oct 2026", status: "Rejected", validity: "11 Nov 2026", by: "Arjun Kapoor" },
  { id: "QT-2026-0412", lead: "KLIMA-00119", company: "Orion Optics", project: "Lens Coating Cleanroom", amount: 7200000, created: "08 Oct 2026", status: "Draft", validity: "—", by: "Priya Nair" },
];

export const lineItems = [
  { cat: "Modular Systems", item: "Cleanroom Wall Panels", desc: "50mm PUF insulated GI panels, powder coated", qty: 9200, unit: "Sq. Ft.", rate: 520 },
  { cat: "Filtration", item: "HEPA Filters H14", desc: "Terminal HEPA modules with DOP port, 2'x2'", qty: 96, unit: "Nos", rate: 18500 },
  { cat: "HVAC", item: "HVAC System", desc: "Chilled water based system with ducting", qty: 1, unit: "Lot", rate: 3850000 },
  { cat: "HVAC", item: "Air Handling Units", desc: "Double-skin AHU, 12,000 CFM with VFD", qty: 4, unit: "Nos", rate: 685000 },
  { cat: "Modular Systems", item: "Cleanroom Doors", desc: "Flush-type GI doors with vision panel & interlock", qty: 18, unit: "Nos", rate: 42000 },
  { cat: "Civil Finishes", item: "Epoxy Flooring", desc: "3mm self-levelling antistatic epoxy with coving", qty: 5000, unit: "Sq. Ft.", rate: 185 },
  { cat: "Modular Systems", item: "Walkable Ceiling", desc: "Walkable ceiling panels with flush light fixtures", qty: 5000, unit: "Sq. Ft.", rate: 460 },
  { cat: "Electrical", item: "Electrical Works", desc: "Cleanroom LED lights, DBs, cabling, earthing", qty: 1, unit: "Lot", rate: 1450000 },
  { cat: "Services", item: "Installation", desc: "Erection of panels, HVAC & accessories", qty: 1, unit: "Lot", rate: 1200000 },
  { cat: "Services", item: "Engineering & Design", desc: "Layouts, P&ID, HVAC zoning, GMP design review", qty: 1, unit: "Lot", rate: 650000 },
  { cat: "Validation", item: "Testing & Validation", desc: "DQ/IQ/OQ/PQ, particle count, airflow tests", qty: 1, unit: "Lot", rate: 480000 },
];

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
export const inrL = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(2)} Cr` : `₹${(n / 100000).toFixed(1)} L`;

export const pipeline = [
  { stage: "New", count: 42, value: 21 }, { stage: "Contacted", count: 35, value: 26 },
  { stage: "Qualified", count: 28, value: 38 }, { stage: "Estimation", count: 19, value: 44 },
  { stage: "Quotation Sent", count: 14, value: 52 }, { stage: "Negotiation", count: 9, value: 61 },
  { stage: "Won", count: 7, value: 29 },
];

export const monthly = [
  { m: "Jun", value: 4.2, won: 1.8 }, { m: "Jul", value: 5.1, won: 2.2 }, { m: "Aug", value: 4.8, won: 2.6 },
  { m: "Sep", value: 6.4, won: 3.1 }, { m: "Oct", value: 7.9, won: 3.8 }, { m: "Nov", value: 8.6, won: 4.4 },
];

export const activities = [
  { who: "Rahul Mehta", what: "created estimation v2 for", target: "KLIMA-00125", time: "12 min ago" },
  { who: "Neeraj Desai", what: "requested changes on", target: "QT-2026-0415", time: "1 hr ago" },
  { who: "Priya Nair", what: "sent proposal to", target: "NovaBio Sciences", time: "3 hrs ago" },
  { who: "Arjun Kapoor", what: "moved to Negotiation", target: "KLIMA-00123", time: "Yesterday" },
  { who: "Sneha Iyer", what: "logged site visit for", target: "MediCare Hospitals", time: "Yesterday" },
];

export const products = [
  ["Cleanroom Wall Panels", "Modular Systems", "Sq. Ft.", 520, "Active"],
  ["Walkable Ceiling Panels", "Modular Systems", "Sq. Ft.", 460, "Active"],
  ["HEPA Filter H14 (2'x2')", "Filtration", "Nos", 18500, "Active"],
  ["ULPA Filter U15", "Filtration", "Nos", 32000, "Active"],
  ["Air Handling Unit 12k CFM", "HVAC", "Nos", 685000, "Active"],
  ["Cleanroom Door – Single", "Modular Systems", "Nos", 42000, "Active"],
  ["Pass Box – Dynamic", "Equipment", "Nos", 145000, "Active"],
  ["Epoxy Flooring 3mm", "Civil Finishes", "Sq. Ft.", 185, "Active"],
  ["Vinyl Flooring Conductive", "Civil Finishes", "Sq. Ft.", 240, "Inactive"],
  ["BMS / EMS Integration", "Automation", "Lot", 850000, "Active"],
  ["Testing & Validation", "Validation", "Lot", 480000, "Active"],
] as const;

export const users = [
  ["Rahul Mehta", "rahul.mehta@klima.in", "Sales Manager", "Sales", "Active"],
  ["Priya Nair", "priya.nair@klima.in", "Sales Executive", "Sales", "Active"],
  ["Arjun Kapoor", "arjun.kapoor@klima.in", "Key Account Manager", "Sales", "Active"],
  ["Kavita Shah", "kavita.shah@klima.in", "Estimation Engineer", "Estimation", "Active"],
  ["Neeraj Desai", "neeraj.desai@klima.in", "Approver – Commercial", "Management", "Active"],
  ["Sneha Iyer", "sneha.iyer@klima.in", "Sales Executive", "Sales", "Active"],
  ["Imran Sheikh", "imran.sheikh@klima.in", "HVAC Design Lead", "Engineering", "Invited"],
  ["Admin KLIMA", "admin@klima.in", "Administrator", "IT", "Active"],
] as const;

export type LineItem = (typeof lineItems)[number];
export function summarize(items: { item: string; cat: string; qty: number; rate: number }[]) {
  const amt = (i: { qty: number; rate: number }) => i.qty * i.rate;
  const engineering = items.filter((i) => i.item === "Engineering & Design").reduce((a, i) => a + amt(i), 0);
  const installation = items.filter((i) => i.item === "Installation").reduce((a, i) => a + amt(i), 0);
  const material = items.filter((i) => i.cat !== "Services").reduce((a, i) => a + amt(i), 0);
  const labour = Math.round(material * 0.04);
  const base = material + labour + engineering + installation;
  const overhead = Math.round(base * 0.05);
  const profit = Math.round((base + overhead) * 0.12);
  const discount = -Math.round((base + overhead + profit) * 0.03);
  const taxable = base + overhead + profit + discount;
  const tax = Math.round(taxable * 0.18);
  return { material, labour, engineering, installation, overhead, profit, discount, taxable, tax, grand: taxable + tax };
}

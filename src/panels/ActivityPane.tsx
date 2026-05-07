import { HatchBar } from "@/components/HatchBar";

const ACTIVITY_ROWS: { label: string; value: number }[] = [
  { label: "snaily-js", value: 73 },
  { label: "ruio", value: 41 },
  { label: "meme-genie", value: 28 },
];

export function ActivityPane() {
  return (
    <section className="p-3 border-b md:border-b-0 md:border-r border-border bg-surface-1">
      <div className="text-accent text-xs tracking-widest mb-3 border-b border-accent inline-block pb-1">
        ★ ACTIVITY
      </div>
      <div className="space-y-2">
        {ACTIVITY_ROWS.map((row) => (
          <HatchBar key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
    </section>
  );
}

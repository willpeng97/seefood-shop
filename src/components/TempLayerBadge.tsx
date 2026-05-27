import type { TempLayer } from "@/types/product";

const LABELS: Record<TempLayer, string> = {
  frozen: "冷凍",
  ambient: "常溫",
};

const STYLES: Record<TempLayer, string> = {
  frozen: "bg-sky-100 text-sky-900 border-sky-300",
  ambient: "bg-amber-100 text-amber-900 border-amber-300",
};

interface TempLayerBadgeProps {
  layer: TempLayer;
  className?: string;
}

export function TempLayerBadge({ layer, className = "" }: TempLayerBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-medium ${STYLES[layer]} ${className}`}
      aria-label={`溫層：${LABELS[layer]}`}
    >
      {LABELS[layer]}
    </span>
  );
}

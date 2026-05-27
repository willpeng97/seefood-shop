"use client";

import { useState } from "react";
import type { Traceability } from "@/types/product";

interface TraceabilityCardProps {
  traceability: Traceability;
  productName: string;
}

export function TraceabilityCard({
  traceability,
  productName,
}: TraceabilityCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="rounded-xl border border-ocean-200 bg-white shadow-sm"
      aria-labelledby="traceability-heading"
    >
      <button
        type="button"
        id="traceability-heading"
        className="flex w-full min-h-[48px] items-center justify-between px-4 py-3 text-left text-lg font-semibold text-ocean-900"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="traceability-panel"
      >
        <span>數位溯源資訊</span>
        <span aria-hidden="true" className="text-ocean-600">
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div
          id="traceability-panel"
          className="border-t border-ocean-100 px-4 py-4 text-base text-ocean-800"
        >
          <dl className="space-y-3">
            <div>
              <dt className="font-medium text-ocean-600">產地</dt>
              <dd>{traceability.origin}</dd>
            </div>
            {traceability.harvest_date && (
              <div>
                <dt className="font-medium text-ocean-600">捕撈／加工日期</dt>
                <dd>{traceability.harvest_date}</dd>
              </div>
            )}
            <div>
              <dt className="font-medium text-ocean-600">檢驗報告</dt>
              <dd>
                <a
                  href={traceability.certification_url}
                  className="text-celadon-700 underline underline-offset-2 hover:text-celadon-900 focus:outline-none focus:ring-2 focus:ring-celadon-500 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看 {productName} 檢驗報告（PDF）
                </a>
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-ocean-500">
            第二階段將串接區塊鏈或政府溯源 API，即時更新產地與檢驗狀態。
          </p>
        </div>
      )}
    </section>
  );
}

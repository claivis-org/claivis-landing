"use client";

import { useEffect, useState } from "react";
import { getInitials } from "@/app/utils/getInitials";

const defaultInitials = ["PA", "MO", "AK", "IG"];

export function SocialProof() {
  const [initials, setInitials] = useState<string[]>(defaultInitials);
  const [totalCount, setTotalCount] = useState<number>(22);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/waitlist");
        if (!res.ok) return;

        const data = (await res.json()) as {
          count?: number;
          recentNames?: string[];
        };

        if (Array.isArray(data.recentNames) && data.recentNames.length > 0) {
          const formatted = data.recentNames.slice(0, 4).map(getInitials);
          setInitials(formatted);
        }

        if (typeof data.count === "number" && data.count > 0) {
          setTotalCount(data.count);
        }
      } catch {
        // Silently use defaults if fetch fails
      }
    }

    fetchStats();
  }, []);

  const extraCount = Math.max(totalCount - initials.length, 0);

  return (
    <div className="mt-2 flex items-center gap-2 text-white/90 drop-shadow sm:mt-4 sm:gap-2.5">
      <div className="flex -space-x-2">
        {initials.map((initial, index) => (
          <span
            key={`${initial}-${index}`}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/80 text-[8px] font-bold text-white shadow-sm sm:h-7 sm:w-7 sm:border-2 sm:text-[9px]"
            style={{
              background: `hsl(${210 + index * 18} 75% 40%)`,
            }}
          >
            {initial}
          </span>
        ))}

        <span
          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/80 text-[8px] font-bold text-white shadow-sm sm:h-7 sm:w-7 sm:border-2 sm:text-[9px]"
          style={{
            background: "hsl(215 65% 25%)",
          }}
        >
          +{extraCount}
        </span>
      </div>

      <p className="text-[11px] font-semibold text-white/90 sm:text-xs">
        Principals already on the waitlist
      </p>
    </div>
  );
}

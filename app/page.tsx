import type { Metadata } from "next";
import { WaitlistSignupForm } from "@/components/WaitlistSignupForm";

export const metadata: Metadata = {
  title: "Join the Claivis Pilot Waitlist",
  description:
    "Join the first schools testing Claivis for live AI teaching, classroom Q&A, curriculum upload, and lesson reports.",
};

const waitlistPrincipals = ["PA", "MO", "AO", "IG", "+18"];

export default function Home() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full scale-110 object-cover object-center opacity-75 blur-2xl"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/claivis-join-waitlist.mp4" type="video/mp4" />
      </video>

      <video
        className="absolute inset-0 h-full w-full object-contain object-center sm:object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/videos/claivis-join-waitlist.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"
        aria-hidden="true"
      />

      <section className="relative z-10 min-h-[100svh] px-4 py-4 sm:px-6 md:px-10">
        <div className="absolute left-4 right-4 top-4 max-w-[22rem] text-left sm:left-8 sm:right-auto sm:top-8 md:max-w-[28rem] lg:left-10 lg:top-10 xl:left-14">
          <div className="mb-2 w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/80 shadow-lg backdrop-blur-md sm:text-[10px]">
            Pilot waitlist
          </div>

          <h1 className="max-w-md font-display text-[1.85rem] font-bold leading-[0.95] tracking-tight text-white drop-shadow-2xl sm:text-5xl lg:text-5xl xl:text-6xl">
            Keep lessons moving when teachers are unavailable.
          </h1>

          <p className="mt-2 max-w-sm text-xs font-medium leading-relaxed text-white/80 drop-shadow sm:mt-4 sm:text-base">
            Early access for schools testing live AI teaching, classroom Q&A, and lesson reports.
          </p>
        </div>

        <div className="absolute inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[min(26rem,calc(100vw-3rem))] lg:bottom-10 lg:right-10">
          <div className="rounded-[1.45rem] border border-white/16 bg-white/[0.055] p-4 shadow-2xl shadow-black/25 backdrop-blur-md sm:rounded-[1.65rem] sm:p-5">
            <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              Join the waitlist
            </h2>

            <div className="mt-4">
              <WaitlistSignupForm />
            </div>
          </div>

          <div className="mt-3 hidden items-center gap-3 rounded-full border border-white/14 bg-white/[0.06] px-4 py-3 text-white/82 shadow-xl backdrop-blur-md sm:flex">
            <div className="flex -space-x-3">
              {waitlistPrincipals.map((principal, index) => (
                <span
                  key={principal}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/75 text-[10px] font-bold text-white shadow-sm"
                  style={{
                    background:
                      index === waitlistPrincipals.length - 1
                        ? "rgba(255,255,255,0.16)"
                        : `hsl(${210 + index * 17} 72% 38%)`,
                  }}
                >
                  {principal}
                </span>
              ))}
            </div>
            <p className="text-xs font-semibold sm:text-sm">
              Principals already on the waitlist
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

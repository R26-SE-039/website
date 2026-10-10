import { Search } from "lucide-react";
import { asset } from "@/lib/asset";
import { site } from "@/data/site";

/**
 * Browser-style frame under the hero. When `site.heroVideo.enabled` is true it
 * plays the dashboard recording (muted, looping, inline). Until then it shows a
 * lightweight CSS placeholder that mimics the dashboard chrome, so the layout
 * is final before the video exists. Nothing here is fetched until the frame is
 * near the viewport (preload="metadata", poster image).
 */
export default function HeroMockup() {
  const video = site.heroVideo;
  return (
    <div className="parallax-up mx-auto mt-12 w-full md:mt-14">
      <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_30px_80px_-40px_rgba(14,24,42,0.35)]">
        <div className="flex items-center gap-2 border-b border-line bg-surface px-5 py-3">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 hidden rounded-full border border-line bg-white px-3 py-1 font-mono text-[11px] text-muted sm:inline">
            {video.caption}
          </span>
        </div>
        {video.enabled ? (
          <video
            className="block aspect-[16/8.2] max-h-[860px] w-full bg-[#0a1626] object-cover"
            src={asset(video.src)}
            poster={video.poster ? asset(video.poster) : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={video.caption}
          />
        ) : (
          <div className="relative aspect-[16/8.2] max-h-[860px] w-full bg-white" aria-label="Dashboard preview placeholder">
            <div className="absolute inset-x-0 top-0 flex items-center gap-4 px-6 py-5 md:px-10">
              <div className="flex flex-1 items-center gap-3 rounded-full border border-line bg-white px-5 py-3 shadow-sm">
                <Search size={18} className="text-muted" aria-hidden="true" />
                <span className="text-base text-muted md:text-lg">Search stories, suites, runs</span>
              </div>
            </div>
            <div className="absolute left-6 top-24 right-6 md:left-10 md:right-10 md:top-28">
              <p className="text-2xl font-bold tracking-tight text-ink md:text-4xl">Test Generation Dashboard</p>
              <p className="mt-2 text-sm text-muted md:text-base">
                Story → Gherkin → validated code → execution, in one screen.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {["Stories", "Gherkin", "Validation", "Executions"].map((label, i) => (
                  <div key={label} className="rounded-2xl border border-line bg-surface p-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</p>
                    <div className="mt-3 h-2 rounded-full bg-line">
                      <div className="h-2 rounded-full bg-brand" style={{ width: `${[72, 100, 58, 85][i]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

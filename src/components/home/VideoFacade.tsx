"use client";

import { Play } from "lucide-react";
import { useState } from "react";

type Props = { youtubeId: string; title: string };

/** Click-to-play YouTube embed: a poster and a button until the viewer clicks; no third-party script before that. */
export default function VideoFacade({ youtubeId, title }: Props) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="aspect-video w-full rounded-[24px] border border-line bg-black"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-[24px] border border-line bg-navy"
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external poster, not optimisable */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-ink shadow-lg transition-transform group-hover:scale-105">
          <Play size={26} aria-hidden="true" className="ml-1" />
        </span>
      </span>
    </button>
  );
}

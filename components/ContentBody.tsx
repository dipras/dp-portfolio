import Image from "next/image";
import type { ContentBlock } from "@/lib/content";

export default function ContentBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <figure key={`${block.src}-${index}`} className="my-10">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-lg shadow-slate-200/50">
                <Image src={block.src} alt={block.alt} fill className="object-cover" />
              </div>
              {block.caption && (
                <figcaption className="mt-3 text-center text-sm text-text-muted">{block.caption}</figcaption>
              )}
            </figure>
          );
        }

        return (
          <p key={index} className="mb-6">
            {block.text}
          </p>
        );
      })}
    </>
  );
}

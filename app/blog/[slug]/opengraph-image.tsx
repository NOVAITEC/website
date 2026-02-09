import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export const runtime = "nodejs";
export const alt = "NOVAITEC Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title || "NOVAITEC Blog";
  const tags = post?.tags || [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B1C2E",
          padding: "60px",
        }}
      >
        {/* Top: Tags */}
        <div style={{ display: "flex", gap: "12px" }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                backgroundColor: "rgba(6, 182, 212, 0.15)",
                color: "#06B6D4",
                padding: "6px 16px",
                borderRadius: "6px",
                fontSize: "18px",
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Center: Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#F8F4E8",
              lineHeight: 1.2,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#F8F4E8",
              }}
            >
              NOVAITEC
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#06B6D4",
              }}
            >
              .
            </div>
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#94A3B8",
            }}
          >
            novaitec.nl/blog
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

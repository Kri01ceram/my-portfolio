import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "#f8fafc",
          background:
            "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.28), transparent 28%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.22), transparent 24%), linear-gradient(135deg, #020617 0%, #0f172a 48%, #111827 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 26, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.72 }}>
            Portfolio
          </div>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.08em" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "rgba(226,232,240,0.88)", maxWidth: 820 }}>
            {site.description}
          </div>
        </div>

        <div style={{ fontSize: 22, color: "rgba(226,232,240,0.82)" }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size
  );
}

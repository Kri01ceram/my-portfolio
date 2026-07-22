import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "42px",
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.22), transparent 40%), linear-gradient(135deg, #111827 0%, #0f172a 55%, #1f2937 100%)",
          color: "#f8fafc",
          fontWeight: 700,
          fontSize: 76,
          letterSpacing: "-0.08em",
          border: "4px solid rgba(255,255,255,0.14)",
        }}
      >
        KS
      </div>
    ),
    size
  );
}

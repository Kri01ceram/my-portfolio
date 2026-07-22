import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.24), transparent 40%), linear-gradient(135deg, #111827 0%, #0f172a 55%, #1f2937 100%)",
          color: "#f8fafc",
          fontWeight: 700,
          fontSize: 16,
          letterSpacing: "-0.08em",
          border: "1px solid rgba(255,255,255,0.16)",
        }}
      >
        KS
      </div>
    ),
    size
  );
}

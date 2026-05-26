import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "CetusPro - Technologia, która napędza Twój biznes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = readFileSync(
    join(process.cwd(), "public", "og-image.png"),
  );
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        position: "relative",
      }}>
      <div
        style={{
          position: "absolute",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(59, 130, 246, 0) 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "6px",
          background:
            "linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #3b82f6 100%)",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
          padding: "60px",
          position: "relative",
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          alt="CetusPro"
          width={780}
          height={244}
          style={{ objectFit: "contain" }}
        />
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#475569",
            letterSpacing: "0.02em",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}>
          <span style={{ display: "flex" }}>Technologia, która napędza</span>
          <span style={{ color: "#2563eb", display: "flex" }}>Twój biznes</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}

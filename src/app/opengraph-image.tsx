import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * The card that appears whenever the site is pasted into WhatsApp, Slack,
 * LinkedIn or a group chat — which, for a studio that gets work by
 * recommendation, is a large share of the first impressions it ever makes.
 *
 * The site previously declared `twitter:card = summary_large_image` and then
 * shipped no image at all, so every share rendered as a bare grey link.
 *
 * Typeset with the runtime's own sans rather than fetching Geist at build
 * time: a social image should never be the reason a deploy can fail. The card
 * carries the identity through colour, rule weight and scale instead.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#ffffff";
const INK = "#08090a";
const SIGNAL = "#0071e3";
const LINE = "#d6d6d2";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* The instrument, cropped by the right edge the way the hero's is. */}
        <div
          style={{
            position: "absolute",
            right: -180,
            top: 96,
            width: 560,
            height: 560,
            display: "flex",
            borderRadius: 560,
            border: `1px solid ${LINE}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -100,
            top: 176,
            width: 400,
            height: 400,
            display: "flex",
            borderRadius: 400,
            border: `1px solid ${LINE}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 92,
            top: 368,
            width: 16,
            height: 16,
            display: "flex",
            borderRadius: 16,
            background: SIGNAL,
          }}
        />

        {/* Top rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              background: SIGNAL,
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              color: "#797d84",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Velhoura — Agencia digital
          </div>
        </div>

        {/* The claim */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div
            style={{
              fontSize: 104,
              lineHeight: 1,
              letterSpacing: -4,
              color: INK,
              fontWeight: 600,
              display: "flex",
            }}
          >
            Creamos tu marca. Construimos tu web.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: "#3d4045",
              display: "flex",
            }}
          >
            Marca, web y captación de clientes para negocios de toda España.
          </div>
        </div>

        {/* Baseline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#797d84", display: "flex" }}>
            IDEA · DESIGN · BUILD · LAUNCH · GROW
          </div>
          <div style={{ fontSize: 22, color: INK, display: "flex" }}>
            {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

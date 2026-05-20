/**
 * La Fonda — Business Card Generator
 * Run: node scripts/generate-card.js
 * Output: public/brand/card-front.svg, card-back.svg, business-card.html
 */

import QRCode from 'qrcode'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'public', 'brand')

// ── Brand tokens (mirrors tailwind.config.js) ─────────────────────────────
const c = {
  navy:      '#1B3564',
  amber:     '#C4880B',
  scarlet:   '#BC2B2B',
  parchment: '#FEF3D0',
  paper:     '#EDD089',
  brown:     '#2E1A0E',
}

// Star mark path (matches src/components/Logo.jsx)
const MARK = 'M50,2 L58,42 L98,50 L58,58 L50,98 L42,58 L2,50 L42,42 Z'

// Google Fonts import for standalone SVGs
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Dancing+Script:wght@700&family=Lato:wght@300;400&display=swap');`

// ── QR Code generation ────────────────────────────────────────────────────
const qrRaw = await QRCode.toString('https://www.lafonda.co.nz', {
  type: 'svg',
  margin: 1,
  color: { dark: c.navy, light: c.parchment },
})

// Extract viewBox dimension and inner elements
const qrDimMatch = qrRaw.match(/viewBox="0 0 (\d+)/)
const qrDim = qrDimMatch ? parseInt(qrDimMatch[1]) : 37

// Strip outer SVG wrapper — keep only inner elements
const qrInner = qrRaw
  .replace(/<\?xml[^>]*\?>/g, '')
  .replace(/<!DOCTYPE[^>]*>/g, '')
  .replace(/<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .trim()

// ── FRONT SVG ─────────────────────────────────────────────────────────────
// viewBox 1050×600 → physical 90mm × 51.4mm at 300dpi
// Design: Navy background · Amber star mark · Mixed-font wordmark · Grain texture

function buildFront() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 600">
  <defs>
    <style><![CDATA[${FONT_IMPORT}]]></style>
    <filter id="grain-f" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="n"/>
      <feColorMatrix type="saturate" values="0" in="n" result="g"/>
      <feBlend in="SourceGraphic" in2="g" mode="overlay"/>
    </filter>
  </defs>

  <!-- Navy background -->
  <rect width="1050" height="600" fill="${c.navy}"/>

  <!-- Grain overlay -->
  <rect width="1050" height="600" fill="${c.navy}" filter="url(#grain-f)" opacity="0.055"/>

  <!-- Amber top rule -->
  <rect x="0" y="0" width="1050" height="4" fill="${c.amber}"/>
  <!-- Amber bottom rule -->
  <rect x="0" y="596" width="1050" height="4" fill="${c.amber}"/>
  <!-- Side hairlines -->
  <rect x="0"    y="4" width="2"  height="592" fill="${c.amber}" opacity="0.35"/>
  <rect x="1048" y="4" width="2"  height="592" fill="${c.amber}" opacity="0.35"/>

  <!-- Inner border frame (double) -->
  <rect x="26" y="26" width="998" height="548" fill="none" stroke="${c.amber}" stroke-width="1"   opacity="0.30"/>
  <rect x="33" y="33" width="984" height="534" fill="none" stroke="${c.amber}" stroke-width="0.4" opacity="0.18"/>

  <!-- Star mark: 100×100 scaled 1.72× → 172px, centred at (525, 218) -->
  <g transform="translate(439,132) scale(1.72)">
    <path d="${MARK}" fill="${c.amber}"/>
  </g>

  <!-- Flanking ornament rules -->
  <line x1="148" y1="298" x2="368" y2="298" stroke="${c.amber}" stroke-width="0.8" opacity="0.28"/>
  <line x1="682" y1="298" x2="902" y2="298" stroke="${c.amber}" stroke-width="0.8" opacity="0.28"/>
  <text x="525" y="306" text-anchor="middle"
    font-family="Georgia,serif" font-size="16" fill="${c.amber}" opacity="0.42">✦</text>

  <!-- Wordmark: "La FONDA" — Dancing Script + Alfa Slab One -->
  <!-- text-anchor middle centres the combined tspan block at x=525 -->
  <text x="525" y="390" text-anchor="middle" fill="${c.parchment}">
    <tspan font-family="'Dancing Script',cursive" font-size="82" font-weight="700" font-style="italic">La </tspan>
    <tspan font-family="'Alfa Slab One',serif" font-size="78">FONDA</tspan>
  </text>

  <!-- Tagline -->
  <text x="525" y="448" text-anchor="middle"
    font-family="Lato,sans-serif" font-size="21" font-weight="300"
    letter-spacing="6.5" fill="${c.parchment}" fill-opacity="0.50">
    COLOMBIAN RESTAURANT  ·  WELLINGTON
  </text>

  <!-- Bottom brand mantra -->
  <text x="525" y="524" text-anchor="middle"
    font-family="Lato,sans-serif" font-size="16" font-weight="300"
    letter-spacing="5" fill="${c.amber}" fill-opacity="0.42">
    ✦   NATURAL  ·  AUTHENTIC  ·  DELICIOUS   ✦
  </text>
</svg>`
}

// ── BACK SVG ──────────────────────────────────────────────────────────────
// Design: Parchment background · Contact info · QR code · Mini logo

function buildBack() {
  const qrBoxSize = 234
  const qrX = 724
  const qrY = 196

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1050 600">
  <defs>
    <style><![CDATA[${FONT_IMPORT}]]></style>
  </defs>

  <!-- Parchment background -->
  <rect width="1050" height="600" fill="${c.parchment}"/>

  <!-- Navy top/bottom rules -->
  <rect x="0" y="0"   width="1050" height="3" fill="${c.navy}"/>
  <rect x="0" y="597" width="1050" height="3" fill="${c.navy}"/>

  <!-- Amber border frame (outer + inner hairline) -->
  <rect x="26" y="26" width="998" height="548" fill="none" stroke="${c.amber}" stroke-width="1.25"/>
  <rect x="32" y="32" width="986" height="536" fill="none" stroke="${c.amber}" stroke-width="0.4" opacity="0.38"/>

  <!-- Mini mark: top-left -->
  <g transform="translate(48,44) scale(0.30)">
    <path d="${MARK}" fill="${c.amber}"/>
  </g>

  <!-- Vertical divider right of mark -->
  <line x1="84" y1="46" x2="84" y2="124" stroke="${c.amber}" stroke-width="0.8" opacity="0.38"/>

  <!-- Mini wordmark -->
  <text y="80" fill="${c.navy}">
    <tspan x="96" font-family="'Dancing Script',cursive" font-size="24" font-weight="700" font-style="italic">La </tspan>
    <tspan font-family="'Alfa Slab One',serif" font-size="23">FONDA</tspan>
  </text>
  <text x="96" y="100"
    font-family="Lato,sans-serif" font-size="10.5" font-weight="300"
    letter-spacing="2.5" fill="${c.navy}" fill-opacity="0.42">
    COLOMBIAN RESTAURANT
  </text>

  <!-- Horizontal rule below header -->
  <line x1="46" y1="146" x2="672" y2="146" stroke="${c.amber}" stroke-width="0.8" opacity="0.38"/>

  <!-- ── Contact Details (left column) ── -->

  <!-- ADDRESS -->
  <text x="56" y="187"
    font-family="Lato,sans-serif" font-size="15" font-weight="300"
    letter-spacing="2.5" fill="${c.navy}" fill-opacity="0.42">ADDRESS</text>
  <text x="56" y="213" font-family="Lato,sans-serif" font-size="25" fill="${c.navy}">101 Vivian Street, Te Aro</text>
  <text x="56" y="240" font-family="Lato,sans-serif" font-size="25" fill="${c.navy}">Wellington 6011</text>

  <!-- PHONE -->
  <text x="56" y="282"
    font-family="Lato,sans-serif" font-size="15" font-weight="300"
    letter-spacing="2.5" fill="${c.navy}" fill-opacity="0.42">PHONE</text>
  <text x="56" y="308" font-family="Lato,sans-serif" font-size="25" fill="${c.navy}">04 381 0229</text>

  <!-- WEB -->
  <text x="56" y="350"
    font-family="Lato,sans-serif" font-size="15" font-weight="300"
    letter-spacing="2.5" fill="${c.navy}" fill-opacity="0.42">WEB</text>
  <text x="56" y="376" font-family="Lato,sans-serif" font-size="25" fill="${c.amber}">www.lafonda.co.nz</text>

  <!-- EMAIL -->
  <text x="56" y="418"
    font-family="Lato,sans-serif" font-size="15" font-weight="300"
    letter-spacing="2.5" fill="${c.navy}" fill-opacity="0.42">EMAIL</text>
  <text x="56" y="444" font-family="Lato,sans-serif" font-size="25" fill="${c.navy}">Hola@lafonda.co.nz</text>

  <!-- INSTAGRAM -->
  <text x="56" y="486"
    font-family="Lato,sans-serif" font-size="15" font-weight="300"
    letter-spacing="2.5" fill="${c.navy}" fill-opacity="0.42">INSTAGRAM</text>
  <text x="56" y="512" font-family="Lato,sans-serif" font-size="25" fill="${c.navy}">@lafonda.2026</text>

  <!-- ── Vertical divider ── -->
  <line x1="700" y1="146" x2="700" y2="554" stroke="${c.amber}" stroke-width="0.8" opacity="0.38"/>

  <!-- ── QR Code (right column) ── -->
  <text x="841" y="174"
    text-anchor="middle"
    font-family="Lato,sans-serif" font-size="13" font-weight="300"
    letter-spacing="3" fill="${c.navy}" fill-opacity="0.40">SCAN TO VISIT</text>

  <!-- QR border -->
  <rect x="${qrX}" y="${qrY}" width="${qrBoxSize}" height="${qrBoxSize}"
    fill="${c.parchment}" stroke="${c.navy}" stroke-width="1" opacity="0.18"/>

  <!-- QR code as nested SVG — viewBox matches qrcode output dimension -->
  <svg x="${qrX + 2}" y="${qrY + 2}" width="${qrBoxSize - 4}" height="${qrBoxSize - 4}" viewBox="0 0 ${qrDim} ${qrDim}">
    <rect width="${qrDim}" height="${qrDim}" fill="${c.parchment}"/>
    ${qrInner}
  </svg>

  <!-- QR caption -->
  <text x="841" y="${qrY + qrBoxSize + 26}"
    text-anchor="middle"
    font-family="Lato,sans-serif" font-size="12" font-weight="300"
    letter-spacing="2" fill="${c.navy}" fill-opacity="0.36">lafonda.co.nz</text>

  <!-- Bottom ornament -->
  <text x="841" y="563"
    text-anchor="middle"
    font-family="Georgia,serif" font-size="18" fill="${c.amber}" opacity="0.40">✦</text>
</svg>`
}

// ── COMBINED HTML ──────────────────────────────────────────────────────────
function buildHtml(front, back) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>La Fonda — Business Card</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Dancing+Script:wght@700&family=Lato:wght@300;400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #ddd5c4;
      font-family: Lato, sans-serif;
      padding: 52px 24px 64px;
      min-height: 100vh;
    }

    .page-title {
      font-family: 'Alfa Slab One', serif;
      color: #1B3564;
      text-align: center;
      font-size: 16px;
      letter-spacing: 0.20em;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .page-sub {
      text-align: center;
      color: #1B3564;
      opacity: 0.42;
      font-size: 10px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      margin-bottom: 56px;
    }

    .cards {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 52px;
    }

    .card-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .label {
      font-size: 9.5px;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: #1B3564;
      opacity: 0.38;
    }

    /* Physical card size — set width/height in mm for print accuracy */
    .card {
      width: 90mm;
      height: 54mm;
      border-radius: 1.5mm;
      overflow: hidden;
      box-shadow:
        0 16px 48px rgba(27, 53, 100, 0.22),
        0 4px 12px  rgba(27, 53, 100, 0.12);
    }

    .card svg { width: 100%; height: 100%; display: block; }

    .note {
      margin-top: 60px;
      padding-top: 24px;
      border-top: 1px solid rgba(27, 53, 100, 0.14);
      text-align: center;
      max-width: 540px;
      margin-left: auto;
      margin-right: auto;
    }
    .note p {
      font-size: 10.5px;
      line-height: 1.9;
      color: #1B3564;
      opacity: 0.46;
      letter-spacing: 0.04em;
    }

    /* ── Print ── */
    @media print {
      body { background: white; padding: 0; }
      .page-title, .page-sub, .label, .note { display: none; }

      .cards {
        flex-direction: column;
        gap: 0;
        align-items: flex-start;
      }

      .card-wrap { gap: 0; }

      .card {
        width: 90mm;
        height: 54mm;
        border-radius: 0;
        box-shadow: none;
        page-break-inside: avoid;
        break-inside: avoid;
      }

      /* Each side on its own page */
      .card-wrap:first-child {
        page-break-after: always;
        break-after: page;
      }
    }
  </style>
</head>
<body>
  <h1 class="page-title">La Fonda &mdash; Business Card</h1>
  <p class="page-sub">Print-Ready &middot; 90 &times; 54 mm &middot; 300 DPI</p>

  <div class="cards">
    <div class="card-wrap">
      <span class="label">Front</span>
      <div class="card">${front}</div>
    </div>
    <div class="card-wrap">
      <span class="label">Back</span>
      <div class="card">${back}</div>
    </div>
  </div>

  <div class="note">
    <p>
      Print at 90 &times; 54 mm &middot; 350&ndash;400 gsm card stock<br>
      Soft-touch matte lamination recommended for the navy front<br>
      For professional output, open the SVG files in Illustrator or Inkscape and convert all text to outlines before sending to print<br>
      QR code links to www.lafonda.co.nz
    </p>
  </div>
</body>
</html>`
}

// ── Write files ────────────────────────────────────────────────────────────
const front = buildFront()
const back  = buildBack()
const html  = buildHtml(front, back)

fs.writeFileSync(path.join(outDir, 'card-front.svg'),    front)
fs.writeFileSync(path.join(outDir, 'card-back.svg'),     back)
fs.writeFileSync(path.join(outDir, 'business-card.html'), html)

console.log('✓ public/brand/card-front.svg')
console.log('✓ public/brand/card-back.svg')
console.log('✓ public/brand/business-card.html')

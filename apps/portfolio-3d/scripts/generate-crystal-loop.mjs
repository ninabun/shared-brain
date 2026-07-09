import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SIZE = 2048;
const FPS = 60;
const DURATION = 5;
const FRAMES = FPS * DURATION;
const OUT_DIR = path.resolve("public/animations/healthcare-crystal-loop/frames");
const MANIFEST = path.resolve("public/animations/healthcare-crystal-loop/manifest.json");

const cx = SIZE / 2;
const cy = SIZE / 2;
const radius = 680;

const nodes = [
  [-0.72, -0.28, 0.18],
  [-0.48, -0.55, -0.12],
  [-0.18, -0.32, 0.42],
  [0.2, -0.5, 0.08],
  [0.52, -0.18, -0.28],
  [0.72, -0.42, 0.18],
  [-0.62, 0.06, -0.38],
  [-0.34, 0.26, 0.28],
  [0.02, 0.02, -0.08],
  [0.34, 0.22, 0.32],
  [0.64, 0.08, -0.18],
  [-0.42, 0.58, -0.02],
  [-0.02, 0.52, 0.22],
  [0.42, 0.58, -0.28],
];

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [11, 12],
  [12, 13],
  [0, 6],
  [2, 8],
  [4, 10],
  [7, 11],
  [9, 13],
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function project([x, y, z], theta, floatOffset, scale) {
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const rx = x * cos + z * sin;
  const rz = -x * sin + z * cos;
  const perspective = 1 / (1 + rz * 0.18);
  return {
    x: cx + rx * radius * 0.82 * perspective * scale,
    y: cy + floatOffset + y * radius * 0.72 * perspective * scale,
    z: rz,
    perspective,
  };
}

function textTransform(theta, floatOffset, scale) {
  const cos = Math.cos(theta);
  const sx = clamp(cos, -1, 1);
  const compressed = Math.abs(sx) < 0.035 ? 0.035 * Math.sign(sx || 1) : sx;
  return `translate(${cx} ${cy + floatOffset}) scale(${compressed * scale} ${scale}) translate(${-cx} ${-cy})`;
}

function frameSvg(frame) {
  const progress = frame / FRAMES;
  const theta = progress * Math.PI * 2;
  const floatOffset = Math.sin(progress * Math.PI * 2) * 9;
  const breath = 0.995 + (1 - Math.cos(progress * Math.PI * 2)) * 0.0025;
  const camera = 1 + Math.sin(progress * Math.PI * 2 + Math.PI / 5) * 0.02;
  const scale = breath * camera;
  const nodeColor = "rgb(190,230,255)";
  const rimTint = "rgb(142,206,255)";
  const projected = nodes.map((node) => project(node, theta, floatOffset, scale));

  const lines = edges
    .map(([a, b], index) => {
      const p1 = projected[a];
      const p2 = projected[b];
      const depth = clamp((p1.z + p2.z) / 2, -1, 1);
      const shimmer = 0.32 + Math.sin(progress * Math.PI * 2 * 3 + index * 0.9) * 0.1;
      const opacity = clamp(0.2 + depth * 0.08 + shimmer, 0.18, 0.52);
      return `<line x1="${p1.x.toFixed(2)}" y1="${p1.y.toFixed(2)}" x2="${p2.x.toFixed(2)}" y2="${p2.y.toFixed(2)}" stroke="rgba(150,205,235,${opacity.toFixed(3)})" stroke-width="2.1" stroke-linecap="round"/>`;
    })
    .join("");

  const dots = projected
    .map((p, index) => {
      const pulse = 0.72 + Math.sin(progress * Math.PI * 2 * 2.7 + index * 1.4) * 0.28;
      const core = (5.2 + pulse * 2.6) * p.perspective;
      const glow = core * 5.4;
      const opacity = clamp(0.62 + p.z * 0.1, 0.46, 0.84);
      return `
        <circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${glow.toFixed(2)}" fill="rgba(128,205,255,${(0.08 + pulse * 0.08).toFixed(3)})"/>
        <circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="${core.toFixed(2)}" fill="rgba(240,252,255,${opacity.toFixed(3)})"/>
        <circle cx="${(p.x - core * 0.25).toFixed(2)}" cy="${(p.y - core * 0.3).toFixed(2)}" r="${(core * 0.27).toFixed(2)}" fill="rgba(255,255,255,0.92)"/>
      `;
    })
    .join("");

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <radialGradient id="glass" cx="37%" cy="27%" r="72%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.55)"/>
      <stop offset="18%" stop-color="rgba(235,250,255,0.17)"/>
      <stop offset="54%" stop-color="rgba(225,246,255,0.045)"/>
      <stop offset="80%" stop-color="rgba(147,199,225,0.14)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.42)"/>
    </radialGradient>
    <radialGradient id="inner" cx="50%" cy="50%" r="58%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.03)"/>
      <stop offset="62%" stop-color="rgba(165,225,255,0.04)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <linearGradient id="rim" x1="420" y1="300" x2="1600" y2="1710" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="rgba(255,255,255,0.98)"/>
      <stop offset="30%" stop-color="rgba(205,240,255,0.56)"/>
      <stop offset="56%" stop-color="rgba(120,175,215,0.26)"/>
      <stop offset="77%" stop-color="rgba(255,255,255,0.74)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.96)"/>
    </linearGradient>
    <clipPath id="sphereClip">
      <circle cx="${cx}" cy="${cy + floatOffset}" r="${(radius * scale).toFixed(2)}"/>
    </clipPath>
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="18" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.5 0 0 0 0 0.76 0 0 0 0 0.98 0 0 0 0.28 0"/>
      <feBlend in="SourceGraphic"/>
    </filter>
  </defs>

  <g transform="translate(${cx} ${cy + floatOffset}) scale(${scale}) translate(${-cx} ${-cy})">
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#glass)" stroke="url(#rim)" stroke-width="9" filter="url(#softGlow)"/>
    <circle cx="${cx}" cy="${cy}" r="${radius * 0.86}" fill="url(#inner)"/>
    <path d="M${cx - 505} ${cy - 55} C ${cx - 360} ${cy - 545}, ${cx + 260} ${cy - 620}, ${cx + 520} ${cy - 255}" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="22" stroke-linecap="round"/>
    <path d="M${cx - 410} ${cy + 430} C ${cx - 160} ${cy + 650}, ${cx + 390} ${cy + 630}, ${cx + 545} ${cy + 230}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="10" stroke-linecap="round"/>
    <path d="M${cx + 440} ${cy - 380} C ${cx + 640} ${cy - 150}, ${cx + 655} ${cy + 210}, ${cx + 470} ${cy + 485}" fill="none" stroke="rgba(170,225,255,0.32)" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="${cx - 280}" cy="${cy - 405}" rx="230" ry="48" fill="rgba(255,255,255,0.38)" transform="rotate(-24 ${cx - 280} ${cy - 405})"/>
    <ellipse cx="${cx + 345}" cy="${cy - 350}" rx="118" ry="30" fill="rgba(255,255,255,0.44)" transform="rotate(28 ${cx + 345} ${cy - 350})"/>
  </g>

  <g clip-path="url(#sphereClip)">
    ${lines}
    ${dots}
  </g>

  <g transform="${textTransform(theta, floatOffset, scale)}" opacity="${(0.72 + Math.abs(Math.cos(theta)) * 0.16).toFixed(3)}">
    <text x="${cx}" y="${cy - 36}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="78" letter-spacing="24" fill="rgba(24,39,55,0.82)">HEALTHCARE</text>
    <text x="${cx}" y="${cy + 70}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="78" letter-spacing="24" fill="rgba(24,39,55,0.82)">REIMAGINED</text>
  </g>
</svg>`;
}

await fs.mkdir(OUT_DIR, { recursive: true });
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

for (let frame = 0; frame < FRAMES; frame += 1) {
  const svg = frameSvg(frame);
  const file = path.join(OUT_DIR, `frame-${String(frame + 1).padStart(3, "0")}.png`);
  try {
    await fs.access(file);
    if ((frame + 1) % 30 === 0) {
      console.log(`existing ${frame + 1}/${FRAMES}`);
    }
    continue;
  } catch {
    // Continue and render the missing frame.
  }
  await sharp(Buffer.from(svg)).png({ compressionLevel: 6, adaptiveFiltering: true }).toFile(file);
  if ((frame + 1) % 30 === 0) {
    console.log(`generated ${frame + 1}/${FRAMES}`);
  }
}

await fs.writeFile(
  MANIFEST,
  JSON.stringify(
    {
      name: "Healthcare Reimagined Crystal Sphere Loop",
      width: SIZE,
      height: SIZE,
      fps: FPS,
      durationSeconds: DURATION,
      frameCount: FRAMES,
      alpha: true,
      transparentBackground: true,
      frames: "frames/frame-001.png ... frames/frame-300.png",
    },
    null,
    2
  )
);

console.log(`done: ${OUT_DIR}`);

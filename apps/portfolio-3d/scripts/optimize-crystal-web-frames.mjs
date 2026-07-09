import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("public/animations/healthcare-crystal-loop/frames");
const OUT_DIR = path.resolve("public/animations/healthcare-crystal-loop/webp");
const MANIFEST = path.resolve("public/animations/healthcare-crystal-loop/webp-manifest.json");
const FRAME_COUNT = 300;
const WIDTH = 720;

await fs.mkdir(OUT_DIR, { recursive: true });

for (let frame = 1; frame <= FRAME_COUNT; frame += 1) {
  const name = `frame-${String(frame).padStart(3, "0")}`;
  const source = path.join(SOURCE_DIR, `${name}.png`);
  const output = path.join(OUT_DIR, `${name}.webp`);

  try {
    await sharp(source)
      .resize({ width: WIDTH, height: WIDTH, fit: "contain" })
      .webp({ quality: 76, alphaQuality: 86, effort: 5 })
      .toFile(output);
  } catch (error) {
    console.error(`failed ${name}: ${error.message}`);
    throw error;
  }

  if (frame % 30 === 0) {
    console.log(`optimized ${frame}/${FRAME_COUNT}`);
  }
}

await fs.writeFile(
  MANIFEST,
  JSON.stringify(
    {
      name: "Healthcare Reimagined Crystal Sphere Loop - Web Optimized",
      width: WIDTH,
      height: WIDTH,
      sourceFrameCount: FRAME_COUNT,
      alpha: true,
      frames: "webp/frame-001.webp ... webp/frame-300.webp",
    },
    null,
    2
  )
);

console.log(`done: ${OUT_DIR}`);

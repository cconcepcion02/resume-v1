import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const outputPath = resolve("public/chino-concepcion-resume.pdf");
const lines = [
  ["CHINO CONCEPCION", 22, 72, 748],
  ["FULL STACK DEVELOPER / AI ENGINEER", 11, 72, 718],
  ["", 12, 72, 690],
  ["PLACEHOLDER RESUME", 15, 72, 658],
  ["Replace this PDF while keeping the same filename:", 10, 72, 632],
  ["public/chino-concepcion-resume.pdf", 10, 72, 616],
  ["", 12, 72, 592],
  ["PROFILE", 12, 72, 562],
  ["Software developer with 5+ years of experience building business", 10, 72, 540],
  ["applications across frontend, backend, databases, and cloud infrastructure.", 10, 72, 524],
  ["", 12, 72, 494],
  ["CORE FOCUS", 12, 72, 466],
  ["Backend Development / Full Stack Development / AI Engineering", 10, 72, 444],
  ["Cloud Infrastructure / Microservices / DevOps", 10, 72, 428],
  ["", 12, 72, 398],
  ["TECHNOLOGIES", 12, 72, 370],
  ["TypeScript, JavaScript, Python, Java, PHP, SQL", 10, 72, 348],
  ["Angular, FastAPI, Flask, Spring Boot, Docker, Kubernetes", 10, 72, 332],
  ["PostgreSQL, MySQL, MariaDB, Ollama, vLLM, MCP, RAG", 10, 72, 316],
  ["", 12, 72, 270],
  ["Update your contact details, work history, education, and achievements", 9, 72, 242],
  ["before sharing this resume with employers.", 9, 72, 228],
];

const escapePdf = (value) =>
  value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");

const content = [
  "BT",
  ...lines.flatMap(([text, size, x, y]) =>
    text
      ? [`/F1 ${size} Tf`, `1 0 0 1 ${x} ${y} Tm`, `(${escapePdf(text)}) Tj`]
      : [],
  ),
  "ET",
].join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
pdf += offsets
  .slice(1)
  .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
  .join("");
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, pdf, "binary");
console.log(`Created ${outputPath}`);

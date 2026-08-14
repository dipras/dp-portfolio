import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { BULLET, MIDDOT, PdfDocument, measure, wrap } from "./pdf-writer.mjs";

const root = process.cwd();
const source = path.join(root, "content", "about.json");
const target = path.join(root, "public", "resume.pdf");

const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = { top: 54, right: 52, bottom: 54, left: 52 };
const COLUMN = PAGE.width - MARGIN.left - MARGIN.right;

const INK = "#0f172a";
const BODY = "#475569";
const SOFT = "#64748b";
const ACCENT = "#0369a1";
const RULE = "#dbe3ec";

const about = JSON.parse(await readFile(source, "utf8"));
const doc = new PdfDocument(PAGE);
let y = MARGIN.top;

function plain(text) {
  return text.replaceAll("**", "").replaceAll("`", "");
}

/** Starts a new page when `needed` points below the bottom margin. */
function reserve(needed) {
  if (y + needed <= PAGE.height - MARGIN.bottom) return;
  doc.newPage();
  y = MARGIN.top;
}

function paragraph(text, { x = MARGIN.left, width = COLUMN, size = 9, leading = 12.4, color = BODY, bold = false }) {
  for (const line of wrap(text, width, { size, bold })) {
    reserve(leading);
    doc.text(line, x, y + size, { size, bold, color });
    y += leading;
  }
}

function section(title) {
  reserve(58);
  y += 12;
  doc.text(title.toUpperCase(), MARGIN.left, y + 9, { size: 9, bold: true, spacing: 1.6, color: ACCENT });
  y += 14;
  doc.rule(MARGIN.left, y, COLUMN, { thickness: 0.8, color: RULE });
  y += 13;
}

function headingRow(left, right, { leftSize = 11, rightSize = 8.5 }) {
  doc.text(left, MARGIN.left, y + leftSize, { size: leftSize, bold: true, color: INK });
  const rightWidth = measure(right, { size: rightSize });
  doc.text(right, MARGIN.left + COLUMN - rightWidth, y + leftSize, { size: rightSize, color: SOFT });
  y += leftSize + 4;
}

function bullets(items) {
  const indent = 11;
  for (const item of items) {
    const lines = wrap(item, COLUMN - indent, { size: 9 });
    for (const [index, line] of lines.entries()) {
      reserve(12.2);
      if (index === 0) doc.text(BULLET, MARGIN.left + 1.5, y + 9, { size: 9, color: ACCENT });
      doc.text(line, MARGIN.left + indent, y + 9, { size: 9, color: BODY });
      y += 12.2;
    }
    y += 2;
  }
}

/* Header ------------------------------------------------------------------ */
doc.text(about.name, MARGIN.left, y + 23, { size: 23, bold: true, color: INK });
y += 30;
doc.text(about.title.toUpperCase(), MARGIN.left, y + 10, { size: 9.5, bold: true, spacing: 1.5, color: ACCENT });
y += 20;

const contacts = [
  { label: about.email, url: `mailto:${about.email}` },
  { label: about.website, url: `https://${about.website}` },
  { label: about.github, url: `https://${about.github}` },
];

let contactX = MARGIN.left;
for (const [index, contact] of contacts.entries()) {
  if (index > 0) {
    const separator = `  ${MIDDOT}  `;
    doc.text(separator, contactX, y + 9, { size: 9, color: "#94a3b8" });
    contactX += measure(separator, { size: 9 });
  }
  const width = measure(contact.label, { size: 9 });
  doc.text(contact.label, contactX, y + 9, { size: 9, color: BODY });
  doc.link(contact.url, contactX, y, width, 11);
  contactX += width;
}
y += 16;
doc.rule(MARGIN.left, y, COLUMN, { thickness: 1.2, color: ACCENT });
y += 14;

paragraph(plain(about.intro), { size: 9.5, leading: 13, color: BODY });

/* Skills ------------------------------------------------------------------ */
section("Skills");
const labelWidth = 96;
for (const group of about.resumeSkills) {
  const lines = wrap(group.items.join(`  ${MIDDOT}  `), COLUMN - labelWidth, { size: 9 });
  for (const [index, line] of lines.entries()) {
    reserve(12.4);
    if (index === 0) doc.text(group.group, MARGIN.left, y + 9, { size: 9, bold: true, color: INK });
    doc.text(line, MARGIN.left + labelWidth, y + 9, { size: 9, color: BODY });
    y += 12.4;
  }
  y += 3;
}

/* Experience -------------------------------------------------------------- */
section("Experience");
for (const [index, job] of about.experience.entries()) {
  reserve(62);
  headingRow(job.role, job.period, {});
  doc.text(job.company, MARGIN.left, y + 9.5, { size: 9.5, bold: true, color: ACCENT });
  y += 14;
  paragraph(job.summary, { size: 9, leading: 12.2, color: BODY });
  if (job.highlights.length > 0) {
    y += 2;
    bullets(job.highlights);
  }
  if (index < about.experience.length - 1) y += 10;
}

/* Education --------------------------------------------------------------- */
section("Education");
for (const [index, school] of about.education.entries()) {
  reserve(56);
  headingRow(school.program, school.status, { leftSize: 10.5 });
  doc.text(school.school, MARGIN.left, y + 9.5, { size: 9.5, bold: true, color: ACCENT });
  y += 14;
  paragraph(school.description, { size: 9, leading: 12.2, color: BODY });
  if (index < about.education.length - 1) y += 10;
}

await writeFile(target, doc.toBuffer());
console.log(`Resume generated at ${path.relative(root, target)}`);

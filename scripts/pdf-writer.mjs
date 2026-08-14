/**
 * Minimal PDF writer: single-column text layout on the Helvetica core fonts.
 * No dependencies, so the resume can be generated inside the static build.
 */

const HELVETICA_WIDTHS = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556,
  1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556,
  333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556,
  556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];

const HELVETICA_BOLD_WIDTHS = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278,
  556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611,
  975, 722, 722, 722, 722, 667, 611, 778, 722, 278, 556, 722, 611, 833, 722, 778,
  667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 333, 278, 333, 584, 556,
  333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556, 278, 889, 611, 611,
  611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

/** WinAnsi codes for punctuation that shows up in hand-written content. */
const EXTRA_WIDTHS = {
  0x91: { regular: 191, bold: 238 }, // ‘
  0x92: { regular: 191, bold: 238 }, // ’
  0x93: { regular: 333, bold: 500 }, // “
  0x94: { regular: 333, bold: 500 }, // ”
  0x95: { regular: 350, bold: 350 }, // •
  0x96: { regular: 556, bold: 556 }, // –
  0x97: { regular: 1000, bold: 1000 }, // —
  0xb7: { regular: 278, bold: 278 }, // ·
};

const UNICODE_TO_WINANSI = new Map(
  Object.entries({
    "‘": "\x91",
    "’": "\x92",
    "“": "\x93",
    "”": "\x94",
    "•": "\x95",
    "–": "\x96",
    "—": "\x97",
    "·": "\xb7",
    "…": "...",
    " ": " ",
  }),
);

export const BULLET = "•";
export const MIDDOT = "·";

function toWinAnsi(text) {
  let out = "";
  for (const character of text) {
    const replacement = UNICODE_TO_WINANSI.get(character);
    if (replacement !== undefined) {
      out += replacement;
      continue;
    }
    out += character.codePointAt(0) <= 0xff ? character : "?";
  }
  return out;
}

function glyphWidth(code, bold) {
  if (code >= 32 && code <= 126) {
    return (bold ? HELVETICA_BOLD_WIDTHS : HELVETICA_WIDTHS)[code - 32];
  }
  const extra = EXTRA_WIDTHS[code];
  if (extra) return bold ? extra.bold : extra.regular;
  return bold ? 611 : 556;
}

export function measure(text, { size, bold = false, spacing = 0 }) {
  const encoded = toWinAnsi(text);
  let width = 0;
  for (let index = 0; index < encoded.length; index += 1) {
    width += (glyphWidth(encoded.charCodeAt(index), bold) / 1000) * size + spacing;
  }
  return width;
}

export function wrap(text, maxWidth, { size, bold = false, spacing = 0 }) {
  const lines = [];
  let line = "";

  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measure(candidate, { size, bold, spacing }) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines.length > 0 ? lines : [""];
}

function escapeText(text) {
  return toWinAnsi(text).replace(/([\\()])/g, "\\$1");
}

function hexToRgb(hex) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((channel) =>
    (channel / 255).toFixed(3),
  );
}

export class PdfDocument {
  constructor({ width, height }) {
    this.width = width;
    this.height = height;
    this.pages = [];
    this.newPage();
  }

  newPage() {
    this.page = { operators: [], links: [] };
    this.pages.push(this.page);
    return this.page;
  }

  fill(hex) {
    const [r, g, b] = hexToRgb(hex);
    this.page.operators.push(`${r} ${g} ${b} rg`);
  }

  /** Draws one line of text with its baseline at `y`, measured from the page top. */
  text(value, x, y, { size, bold = false, spacing = 0, color = "#000000" }) {
    this.fill(color);
    this.page.operators.push(
      "BT",
      `/${bold ? "F2" : "F1"} ${size} Tf`,
      `${spacing} Tc`,
      `1 0 0 1 ${x.toFixed(2)} ${(this.height - y).toFixed(2)} Tm`,
      `(${escapeText(value)}) Tj`,
      "ET",
      "0 Tc",
    );
  }

  rule(x, y, width, { thickness = 0.6, color = "#e2e8f0" }) {
    const [r, g, b] = hexToRgb(color);
    this.page.operators.push(
      `${r} ${g} ${b} RG`,
      `${thickness} w`,
      `${x.toFixed(2)} ${(this.height - y).toFixed(2)} m`,
      `${(x + width).toFixed(2)} ${(this.height - y).toFixed(2)} l`,
      "S",
    );
  }

  link(url, x, y, width, height) {
    this.page.links.push({
      url,
      rect: [x, this.height - y - height, x + width, this.height - y],
    });
  }

  toBuffer() {
    const objects = [];
    const add = (body) => {
      objects.push(body);
      return objects.length;
    };

    const catalogId = add(null);
    const pagesId = add(null);
    const regularFontId = add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    );
    const boldFontId = add(
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    );

    const pageIds = [];
    for (const page of this.pages) {
      const stream = page.operators.join("\n");
      const contentId = add(
        `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
      );

      const annotIds = page.links.map((link) =>
        add(
          `<< /Type /Annot /Subtype /Link /Border [0 0 0] /Rect [${link.rect
            .map((value) => value.toFixed(2))
            .join(" ")}] /A << /Type /Action /S /URI /URI (${escapeText(link.url)}) >> >>`,
        ),
      );

      const annots = annotIds.length > 0 ? ` /Annots [${annotIds.map((id) => `${id} 0 R`).join(" ")}]` : "";
      pageIds.push(
        add(
          `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${this.width} ${this.height}] ` +
            `/Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> ` +
            `/Contents ${contentId} 0 R${annots} >>`,
        ),
      );
    }

    objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objects[pagesId - 1] =
      `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;

    let output = "%PDF-1.4\n";
    const offsets = [];
    for (const [index, body] of objects.entries()) {
      offsets.push(Buffer.byteLength(output, "latin1"));
      output += `${index + 1} 0 obj\n${body}\nendobj\n`;
    }

    const xrefOffset = Buffer.byteLength(output, "latin1");
    output += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const offset of offsets) {
      output += `${String(offset).padStart(10, "0")} 00000 n \n`;
    }
    output +=
      `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n` +
      `startxref\n${xrefOffset}\n%%EOF\n`;

    return Buffer.from(output, "latin1");
  }
}

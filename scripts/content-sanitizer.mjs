import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "h2",
  "h3",
  "p",
  "strong",
  "em",
  "u",
  "s",
  "a",
  "ul",
  "ol",
  "li",
  "blockquote",
  "pre",
  "code",
  "figure",
  "img",
  "figcaption",
  "br",
  "span",
];

export function sanitizeContentHtml(html) {
  return sanitizeHtml(typeof html === "string" ? html : "", {
    allowedTags,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      figure: ["class"],
      li: ["data-list"],
      pre: ["data-language"],
      span: ["class", "contenteditable"],
    },
    allowedClasses: {
      figure: ["studio-figure"],
      span: ["ql-ui"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
    transformTags: {
      a: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          ...(attributes.href?.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {}),
        },
      }),
      img: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          alt: attributes.alt?.trim() || "Content image",
          loading: "lazy",
        },
      }),
    },
  }).trim();
}

export function contentHasMeaningfulValue(html) {
  return /<img\b/i.test(html) || sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).trim().length > 0;
}

export function extractImageSources(html) {
  return [...html.matchAll(/<img\b[^>]*\bsrc=(?:"([^"]+)"|'([^']+)')/gi)].map(
    (match) => match[1] ?? match[2],
  );
}

import { Fragment } from "react";

const TOKEN = /\*\*([^*]+)\*\*|`([^`]+)`/g;

/**
 * Renders the tiny inline syntax used by content JSON: `**bold**` and `` `code` ``.
 * Everything else is plain text.
 */
export default function InlineMarkup({ text }: { text: string }) {
  const nodes = [];
  let cursor = 0;

  for (const match of text.matchAll(TOKEN)) {
    const [raw, bold, code] = match;
    if (match.index > cursor) {
      nodes.push(<Fragment key={cursor}>{text.slice(cursor, match.index)}</Fragment>);
    }

    nodes.push(
      bold ? (
        <strong key={match.index} className="text-text-main">
          {bold}
        </strong>
      ) : (
        <span key={match.index} className="font-mono text-primary bg-primary-soft/50 px-1 rounded">
          {code}
        </span>
      ),
    );
    cursor = match.index + raw.length;
  }

  if (cursor < text.length) {
    nodes.push(<Fragment key={cursor}>{text.slice(cursor)}</Fragment>);
  }

  return <>{nodes}</>;
}

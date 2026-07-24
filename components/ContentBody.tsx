export default function ContentBody({ html }: { html: string }) {
  return <div className="rich-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

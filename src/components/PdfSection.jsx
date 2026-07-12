export default function PdfSection({ url, label, variant, id }) {
  if (!url) return null;

  return (
    <section id={id} className={`pdf-section ${variant ? `pdf-section--${variant}` : ""}`}>
      <div className="pdf-head">
        <h2 className="section-label">{label}</h2>
        <a className="pdf-open" href={url} target="_blank" rel="noopener noreferrer">
          Open / download 
        </a>
      </div>
      <object data={url} type="application/pdf" className="pdf-frame" aria-label={label}>
        <div className="pdf-fallback">
          <p>This PDF can't be shown inline on your device.</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open / download the PDF 
          </a>
        </div>
      </object>
    </section>
  );
}

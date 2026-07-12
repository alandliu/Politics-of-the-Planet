"use client";

import { useState } from "react";

function ReferenceRow({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={`ref-row ${open ? "is-open" : ""}`}>
      <button
        type="button"
        className="ref-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="ref-caret" aria-hidden="true">▸</span>
        <span className="ref-label">{item.label}</span>
        {item.citation && <span className="ref-citation">{item.citation}</span>}
      </button>

      {open && (
        <div className="ref-body">
          <a className="pdf-open" href={item.file} target="_blank" rel="noopener noreferrer">
            Open / download
          </a>
          <object
            data={item.file}
            type="application/pdf"
            className="pdf-frame ref-frame"
            aria-label={item.label}
          >
            <div className="pdf-fallback">
              <p>This PDF can&rsquo;t be shown inline on your device.</p>
              <a href={item.file} target="_blank" rel="noopener noreferrer">
                Open / download the PDF
              </a>
            </div>
          </object>
        </div>
      )}
    </li>
  );
}

export default function ReferenceSection({ id, references }) {
  if (!references || references.length === 0) return null;

  return (
    <section id={id} className="pdf-section pdf-section--refs">
      <div className="pdf-head">
        <h2 className="section-label">References</h2>
        <span className="ref-count">{references.length}</span>
      </div>
      <ul className="ref-list">
        {references.map((r, i) => (
          <ReferenceRow key={`${r.file}-${i}`} item={r} />
        ))}
      </ul>
    </section>
  );
}
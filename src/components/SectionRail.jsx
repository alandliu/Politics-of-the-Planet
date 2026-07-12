"use client";

import { useEffect, useState, useCallback } from "react";

export default function SectionRail({ sections }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(sections?.[0]?.id || "");

  // Open when the pointer nears the right edge; retract when it pulls away.
  useEffect(() => {
    if (!sections?.length) return;
    const OPEN_ZONE = 110;   // px from the right edge
    const CLOSE_ZONE = 300;

    const onMove = (e) => {
      const fromRight = window.innerWidth - e.clientX;
      if (fromRight < OPEN_ZONE) setOpen(true);
      else if (fromRight > CLOSE_ZONE) setOpen(false);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [sections]);

  // Highlight whichever section is currently on screen.
  useEffect(() => {
    if (!sections?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const go = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }, []);

  if (!sections?.length) return null;

  return (
    <nav
      className={`rail ${open ? "is-open" : ""}`}
      aria-label="Sections"
      onMouseEnter={() => setOpen(true)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <ul className="rail-list">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`rail-link ${active === s.id ? "is-active" : ""}`}
              onClick={(e) => go(e, s.id)}
            >
              <span className="rail-dash" aria-hidden="true" />
              <span className="rail-text">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
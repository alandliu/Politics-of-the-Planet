import { getAbout } from "@/lib/content";

export const metadata = { title: "About" };

export default function AboutPage() {
  const about = getAbout();

  return (
    <article className="entry about">
      {about.portrait && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="about-portrait" src={about.portrait} alt="" />
      )}

      <h1 className="entry-title">{about.title}</h1>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: about.bodyHtml }}
      />

      {about.links.length > 0 && (
        <ul className="about-links">
          {about.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
import Link from "next/link";
import { getAllWritings, formatDate } from "@/lib/content";

export default function Home() {
  const writings = getAllWritings();

  return (
    <div className="index">
      <h1>Writing</h1>

      {writings.length === 0 ? (
        <p>No entries yet. Add one in the CMS (or in content/writings).</p>
      ) : (
        <ul className="index-list">
          {writings.map((w) => (
            <li key={w.slug}>
              <Link href={`/writing/${w.slug}`}>
                <span className="index-date">{formatDate(w.date)}</span>
                <span className="index-title">{w.title}</span>
                {w.summary && <span className="index-summary">{w.summary}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

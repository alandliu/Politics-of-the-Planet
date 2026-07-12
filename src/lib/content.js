import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const WRITINGS_DIR = path.join(process.cwd(), "content", "writings");
const ABOUT_FILE = path.join(process.cwd(), "content", "about.md");

function toHtml(text) {
  if (!text) return "";
  return marked.parse(text);
}

export function getAllWritings() {
  if (!fs.existsSync(WRITINGS_DIR)) return [];

  const files = fs.readdirSync(WRITINGS_DIR).filter((f) => f.endsWith(".md"));

  const items = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(WRITINGS_DIR, file), "utf8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title || slug,
      date: data.date ? String(data.date) : "",
      summary: data.summary || "",
      explainerPdf: data.explainerPdf || "",
      briefPdf: data.briefPdf || "",
      slidesPdf: data.slidesPdf || "",
      references: Array.isArray(data.references)
        ? data.references.filter((r) => r && r.file)
        : [],
      surveyUrl: data.surveyUrl || "",
      surveyLabel: data.surveyLabel || "Share what you think",
    };
  });

  items.sort((a, b) => new Date(b.date) - new Date(a.date));
  return items;
}

export function getWriting(slug) {
  return getAllWritings().find((w) => w.slug === slug) || null;
}

export function getAbout() {
  if (!fs.existsSync(ABOUT_FILE))
    return { title: "About", portrait: "", links: [], bodyHtml: "" };
  const raw = fs.readFileSync(ABOUT_FILE, "utf8");
  const { data, content } = matter(raw);
  return {
    title: data.title || "About",
    portrait: data.portrait || "",
    links: Array.isArray(data.links) ? data.links : [],
    bodyHtml: toHtml(content || ""),
  };
}

export function formatDate(d) {
  if (!d) return "";
  const date = new Date(d);
  if (isNaN(date.getTime())) return String(d);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

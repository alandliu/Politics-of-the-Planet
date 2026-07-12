import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllWritings, getWriting, formatDate } from "@/lib/content";
import PdfSection from "@/components/PdfSection";
import SurveyBlock from "@/components/SurveyBlock";
import ReferenceSection from "@/components/ReferenceSection";
import SectionRail from "@/components/SectionRail";

export function generateStaticParams() {
  const params = getAllWritings().map((w) => ({ slug: w.slug }));
  return params.length > 0 ? params : [{ slug: "__none" }];
}

export function generateMetadata({ params }) {
  const w = getWriting(params.slug);
  return { title: w ? w.title : "Not found" };
}

export default function WritingPage({ params }) {
  const w = getWriting(params.slug);
  if (!w) return notFound();

  // The rail lists only the sections this entry actually has.
  const sections = [
    w.explainerPdf && { id: "explainer", label: "Explainer" },
    w.briefPdf && { id: "brief", label: "Policy brief" },
    w.slidesPdf && { id: "slides", label: "Slides" },
    w.references.length > 0 && { id: "references", label: "References" },
    w.surveyUrl && { id: "respond", label: "Respond" },
  ].filter(Boolean);

  return (
    <article className="entry">
      <SectionRail sections={sections} />
      <header className="entry-head">
        <p className="entry-date">{formatDate(w.date)}</p>
        <h1 className="entry-title">{w.title}</h1>
        {w.summary && <p className="entry-summary">{w.summary}</p>}
      </header>

      <PdfSection id="explainer" url={w.explainerPdf} label="Student explainer" variant="explainer" />
      <PdfSection id="brief" url={w.briefPdf} label="Policy brief" variant="brief" />
      <PdfSection id="slides" url={w.slidesPdf} label="Slides" variant="slides" />

      <ReferenceSection id="references" references={w.references} />

      <SurveyBlock id="respond" url={w.surveyUrl} label={w.surveyLabel} />

      <nav className="entry-foot">
        <Link href="/">&larr; All writing</Link>
      </nav>
    </article>
  );
}

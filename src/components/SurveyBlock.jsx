export default function SurveyBlock({ url, label, id }) {
  if (!url) return null;

  return (
    <aside id={id} className="survey">
      <h2 className="section-label">Respond</h2>
      <p>Your response opens in a new tab.</p>
      <a
        className="survey-button"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label || "Share what you think"}
      </a>
    </aside>
  );
}

# Writing site — prototype (PDF entries)

Next.js (React) static site + Decap CMS. Each entry holds an optional one-line
summary, up to three PDFs (student explainer, policy brief / research paper,
slides), and an optional survey link. PDFs render inline via the browser's own
PDF viewer, and your brother adds entries through a simple upload-and-publish form.

**This is a functional prototype — styling is intentionally minimal for now.**

## 1. Run it locally

Requires [Node.js](https://nodejs.org) 18.17+ .

```bash
npm install
npm run dev
```

Open http://localhost:3000 and click an entry. Three sample PDFs are included so
you can see the inline viewer immediately.

## 2. Try the editing form locally (no login, no deploy)

In a **second terminal**:

```bash
npm run cms        # starts the local CMS proxy
```

Keep `npm run dev` running, then open http://localhost:3000/admin/ . Each PDF
field is a "Choose file" button — pick a PDF, fill the text fields, Publish.

## 3. How PDFs are shown

Each PDF is embedded with a native `<object>` tag, so the **browser's own PDF
viewer** displays it (zoom, scroll, download all built in). There are no PDF
libraries, no workers, and nothing extra to bundle — which is why there's no
build/runtime error to hit. On the rare device that can't show a PDF inline
(some older mobile browsers), an **Open / download** link is always present.

For **slides**, export the deck to PDF first: **File → Download → PDF document**,
then upload that PDF.

## 4. The content model

Every entry is one small Markdown file — just fields, no body:

```
content/writings/your-entry.md
---
title: "..."            # Title
date: 2025-03-01        # Date
summary: "..."          # One-line summary (home page)
explainerPdf: "/uploads/entries/xxx.pdf"   # uploaded via the form
briefPdf: "/uploads/entries/yyy.pdf"
slidesPdf: "/uploads/entries/zzz.pdf"
surveyUrl: "..."        # optional
surveyLabel: "..."
---
```

Any field left blank hides that section. The About page is `content/about.md`.

## 5. Where the PDFs live

All uploaded PDFs land in `public/uploads/entries/` and are served from
`/uploads/entries/...`. Two honest notes on organizing this:

- **It does not affect the live site.** Every entry stores the exact path to its
  own PDFs, so however the folder is arranged, the site works identically. Folder
  tidiness is purely for *you* browsing the repo — not for readers or performance.
- **Per-entry subfolders aren't worth chasing here.** Decap uploads into one
  configured folder; it can't neatly create a separate folder per entry. So the
  clean, reliable choice is the single namespaced `entries/` folder used here. If
  this ever grows to hundreds of large PDFs and the flat folder feels unwieldy,
  the real fix is moving the CMS to **Sanity**, which manages assets for you (no
  folders to think about). Not needed at this scale.

Keep PDFs reasonably small (the form caps uploads at ~20 MB; GitHub blocks files
over 100 MB). Slides exported to PDF are usually tiny.

## 6. Deploy + turn on the login (one-time, done by you)

1. Push this project to a **GitHub** repo.
2. Free **Netlify** account → "Add new site → Import from GitHub" → pick the repo.
   Netlify reads `netlify.toml` (build `npm run build`, publish `out`).
3. In the Netlify site: enable **Identity**, then enable **Git Gateway**
   (Identity → Services) — this lets your brother log in without a GitHub account.
4. Set Identity registration to **Invite only**, then **invite his email**.
5. He visits `https://your-site.netlify.app/admin/`, accepts, sets a password, and
   from then on logs in, uploads PDFs, clicks Publish. Each publish commits to the
   repo and Netlify rebuilds automatically.

(If you'd rather not use Netlify Identity, DecapBridge is a free drop-in for login.)

## Project map

```
content/
  writings/            entries (one .md each — fields only)
  about.md             about page
public/
  admin/               CMS: index.html + config.yml (the form)
  uploads/entries/     uploaded PDFs (sample PDFs included)
src/
  app/                 home, writing/[slug], about, globals.css
  components/
    PdfSection.jsx     labeled PDF block (native embed + open/download link)
    SiteHeader, SurveyBlock
  lib/content.js       reads + parses the entries
```

## Next step

Styling. It's plain on purpose right now. Once the structure feels right, we theme it.

import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: {
    default: "Politics of the Planet",
    template: "%s — Politics of the Planet",
  },
  description: "Research, policy briefs, and plain-language explainers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteHeader />
        <main className="container">{children}</main>
        <footer className="site-footer container">
          <span>&copy; {new Date().getFullYear()}</span>
        </footer>
      </body>
    </html>
  );
}

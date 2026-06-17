import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cetuspro Admin",
  description: "",
};

// Globalny niebieski scrollbar z globals.css ustawia scrollbar-width/scrollbar-color
// na <html>, a te właściwości są dziedziczone – przez co kolorują wszystkie panele
// Sanity Studio. Ten styl (renderowany tylko dla /studio) przywraca domyślny scrollbar.
const resetStudioScrollbar = `
  html, body {
    scrollbar-width: auto !important;
    scrollbar-color: auto !important;
  }
  html::-webkit-scrollbar { width: initial; height: initial; }
  html::-webkit-scrollbar-track { background: initial; }
  html::-webkit-scrollbar-thumb { background: initial; border-radius: initial; }
`;

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <style dangerouslySetInnerHTML={{ __html: resetStudioScrollbar }} />
        {children}
      </body>
    </html>
  );
}

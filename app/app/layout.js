export const metadata = { title: "Hackathon GO! Uai Tech" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{fontFamily:"system-ui, Segoe UI, Roboto, Arial", margin:"24px"}}>
        <header style={{marginBottom:16}}>
          <h1 style={{margin:0}}>Hackathon GO! Uai Tech</h1>
          <nav style={{display:"flex", gap:12}}>
            <a href="/">Home</a>
            <a href="/ranking">Ranking</a>
            <a href="/team">Team (uploads)</a>
            <a href="/judge">Judge (notas)</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}

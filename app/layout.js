// app/layout.js
import "./globals.css";

export const metadata = { title: "Hackathon GO! Uai Tech" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="container">
          <header style={{marginBottom:18}}>
            <h1 className="hero" style={{margin:0, fontSize:28}}>
              Hackathon GO! Uai Tech
            </h1>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/ranking">Ranking</a>
              <a href="/team">Enviar Entregáveis</a>
              <a href="/judge">Painel do Juiz</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

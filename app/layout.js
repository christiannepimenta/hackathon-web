// app/layout.js
import "./globals.css";
import NavClient from "./components/NavClient";

export const metadata = { title: "Hackathon GO! Uai Tech" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="container">
          <header style={{marginBottom:18}}>
            <h1 className="hero" style={{margin:0, fontSize:28}}>Hackathon GO! Uai Tech</h1>
            <NavClient />
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

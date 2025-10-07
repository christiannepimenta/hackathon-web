// app/page.js
export default function Home() {
  return (
    <main className="grid grid-2">
      <section className="card">
        <h2 style={{marginTop:0}}>Bem-vindo 👋</h2>
        <p className="note">
          Este site mostra o ranking em tempo real e telas simples para as equipes enviarem
          seus entregáveis e para a banca lançar as notas.
        </p>
        <ul>
          <li><a href="/ranking">Tabela de Ranking</a></li>
          <li><a href="/team">Envio de Canvas/MVP/Pitch</a></li>
          <li><a href="/judge">Lançamento de notas (juízes)</a></li>
        </ul>
      </section>

      <section className="card">
        <h3 style={{marginTop:0}}>Como funciona</h3>
        <ul className="note">
          <li>Canvas (até 20), MVP (até 30), Pitch (até 50 via critérios)</li>
          <li>Regras de desempate: Pitch &gt; MVP &gt; Canvas</li>
          <li>Janelas de submissão controladas pela organização</li>
        </ul>
        <span className="badge">Frontend: Vercel</span>{" "}
        <span className="badge">API: Render</span>{" "}
        <span className="badge">DB: Neon</span>
      </section>
    </main>
  );
}

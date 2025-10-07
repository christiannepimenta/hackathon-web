export default function Home() {
  return (
    <main className="grid grid-2">
      <section className="card">
        <h2 style={{marginTop:0}}>Bem-vindo 👋</h2>
        <p className="note">Site no Vercel consumindo a sua API no Render.</p>
        <ul>
          <li><a href="/ranking">Tabela de Ranking</a></li>
          <li><a href="/team">Envio de Canvas/MVP/Pitch</a></li>
          <li><a href="/judge">Lançamento de notas (juízes)</a></li>
        </ul>
      </section>
      <section className="card">
        <h3 style={{marginTop:0}}>Stack</h3>
        <span className="badge">Frontend: Vercel</span>{' '}
        <span className="badge">API: Render</span>{' '}
        <span className="badge">DB: Neon</span>
      </section>
    </main>
  );
}

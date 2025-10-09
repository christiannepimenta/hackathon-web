// app/forbidden/page.js
export default function Forbidden() {
  return (
    <main className="grid">
      <section className="card">
        <h2 style={{marginTop:0}}>Acesso negado</h2>
        <p className="note">Você não tem permissão para acessar esta página.</p>
        <p><a href="/">Voltar para a home</a></p>
      </section>
    </main>
  );
}

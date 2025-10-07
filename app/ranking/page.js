// app/ranking/page.js
export const revalidate = 20;

async function getData() {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  const r = await fetch(`${base}/ranking`, { next: { revalidate } });
  if (!r.ok) throw new Error("Falha ao carregar ranking");
  return r.json();
}

export default async function Ranking() {
  const rows = await getData();
  return (
    <main className="grid">
      <section className="card">
        <div className="kv" style={{justifyContent:"space-between"}}>
          <h2 style={{margin:0}}>Ranking</h2>
          <span className="badge">atualiza a cada {revalidate}s</span>
        </div>
        <div className="table-wrap" style={{marginTop:12}}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Equipe</th>
                <th>Canvas</th>
                <th>MVP</th>
                <th>Pitch</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.posicao}>
                  <td>{r.posicao}</td>
                  <td>{r.team_numero} — {r.team_nome}</td>
                  <td>{Number(r.canvas||0).toFixed(2)}</td>
                  <td>{Number(r.mvp||0).toFixed(2)}</td>
                  <td>{Number(r.pitch||0).toFixed(2)}</td>
                  <td className="b">{Number(r.total||0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note" style={{marginTop:10}}>
          Empate: maior Pitch → depois maior MVP → depois maior Canvas.
        </p>
      </section>
    </main>
  );
}

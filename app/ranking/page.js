export const revalidate = 30; // revalida a cada 30s

async function getData() {
  const base = process.env.NEXT_PUBLIC_API_BASE;
  const r = await fetch(`${base}/ranking`, { next: { revalidate } });
  if (!r.ok) throw new Error("Falha ao carregar ranking");
  return r.json();
}

export default async function Ranking() {
  const rows = await getData();
  return (
    <main>
      <h2>Ranking</h2>
      <table style={{borderCollapse:"collapse", minWidth:600}}>
        <thead>
          <tr>
            <th style={{textAlign:"left"}}>#</th>
            <th style={{textAlign:"left"}}>Equipe</th>
            <th>Canvas</th><th>MVP</th><th>Pitch</th><th>Total</th>
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
              <td><b>{Number(r.total||0).toFixed(2)}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

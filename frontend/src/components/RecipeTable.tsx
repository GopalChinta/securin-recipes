import { useEffect, useState } from 'react';
import { getRecipes, searchRecipes } from '../api/recipes';

export default function RecipeTable({ onRowClick }: { onRowClick: (r:any)=>void }) {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ title:'', cuisine:'', rating:'', total_time:'', calories:'' });

  const load = async () => {
    if (filters.title || filters.cuisine || filters.rating || filters.total_time || filters.calories) {
      const { data } = await searchRecipes(filters);
      setRows(data.data); setTotal(data.data.length);
    } else {
      const { data } = await getRecipes(page, limit);
      setRows(data.data); setTotal(data.total);
    }
  };

  useEffect(() => { load(); }, [page, limit]);

  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:8, marginBottom:8 }}>
        <input placeholder="Title" onChange={e=>setFilters(f=>({...f, title:e.target.value}))}/>
        <input placeholder="Cuisine" onChange={e=>setFilters(f=>({...f, cuisine:e.target.value}))}/>
        <input placeholder="Rating e.g. >=4.5" onChange={e=>setFilters(f=>({...f, rating:e.target.value}))}/>
        <input placeholder="Total time e.g. <=30" onChange={e=>setFilters(f=>({...f, total_time:e.target.value}))}/>
        <input placeholder="Calories e.g. <=400" onChange={e=>setFilters(f=>({...f, calories:e.target.value}))}/>
      </div>
      <button onClick={load}>Search</button>

      <table width="100%" cellPadding={8}>
        <thead><tr>
          <th>Title</th><th>Cuisine</th><th>Rating</th><th>Total Time</th><th>Serves</th>
        </tr></thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={5} style={{textAlign:'center'}}>No results</td></tr>}
          {rows.map(r=>(
            <tr key={r.id} onClick={()=>onRowClick(r)} style={{ cursor:'pointer' }}>
              <td title={r.title}>{r.title.length>40? r.title.slice(0,40)+'…': r.title}</td>
              <td>{r.cuisine ?? '-'}</td>
              <td>{r.rating ?? '-'}</td>
              <td>{r.total_time ?? '-'}</td>
              <td>{r.serves ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display:'flex', gap:8, marginTop:8, alignItems:'center' }}>
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span>Page {page}</span>
        <button disabled={(page*limit)>=total} onClick={()=>setPage(p=>p+1)}>Next</button>
        <select value={limit} onChange={e=>setLimit(Number(e.target.value))}>
          {[15,20,30,40,50].map(n=><option key={n}>{n}</option>)}
        </select>
      </div>
    </div>
  );
}

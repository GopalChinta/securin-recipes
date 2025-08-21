import { useState } from 'react';
import RecipeTable from './components/RecipeTable';
import RecipeDrawer from './components/RecipeDrawer';

export default function App() {
  const [selected, setSelected] = useState<any|null>(null);
  return (
    <div style={{ padding:16 }}>
      <h1>Recipes</h1>
      <RecipeTable onRowClick={setSelected} />
      <RecipeDrawer recipe={selected} onClose={()=>setSelected(null)} />
    </div>
  );
}

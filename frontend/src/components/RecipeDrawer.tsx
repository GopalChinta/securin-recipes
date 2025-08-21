export default function RecipeDrawer({ recipe, onClose }:{recipe:any,onClose:()=>void}) {
  if (!recipe) return null;
  const n = recipe.nutrients || {};
  return (
    <aside style={{ position:'fixed', top:0, right:0, width:420, height:'100%', background:'#fff',
      boxShadow:'-2px 0 8px rgba(0,0,0,.1)', padding:16, overflow:'auto' }}>
      <button onClick={onClose}>Close</button>
      <h2>{recipe.title}</h2>
      <h4>{recipe.cuisine}</h4>

      <p><b>Description:</b> {recipe.description ?? '-'}</p>

      <details>
        <summary><b>Total Time:</b> {recipe.total_time ?? '-'}</summary>
        <div>Prep: {recipe.prep_time ?? '-'}</div>
        <div>Cook: {recipe.cook_time ?? '-'}</div>
      </details>

      <h3>Nutrition</h3>
      <table cellPadding={6}>
        <tbody>
          {['calories','carbohydrateContent','cholesterolContent','fiberContent','proteinContent',
            'saturatedFatContent','sodiumContent','sugarContent','fatContent']
            .map(k=>(
              <tr key={k}><td>{k}</td><td>{n[k] ?? '-'}</td></tr>
            ))}
        </tbody>
      </table>
    </aside>
  );
}

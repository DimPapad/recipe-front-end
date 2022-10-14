import './Recipes.css';
import { Link } from 'react-router-dom';


const Recipes = ({ recipe, showOneRecipe }) => {
  return (
    <div className="col-3">
      <Link className='link-recipes' to={`/recipe/${recipe.id}`} onClick={() => { showOneRecipe(recipe) }}>
        <div className="card">
          <div className="card-header">
          {recipe.name}
          </div>
          <div className="card-body">
            <p className="card-text">{recipe.description.substring(0, 10)}..</p>
            <p className="card-text text-muted">{recipe.type}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Recipes
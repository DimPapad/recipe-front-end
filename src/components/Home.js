import { useState, useEffect } from 'react';
import Recipes from './Recipes'
import Pagination from './Pagination';
import axios from 'axios';


const Home = ({changeDocTitle, showOneRecipe,jwtToken}) => {
  changeDocTitle('Home');
  const [recipes, setRecipes] = useState([])
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Breakfast')

  const apirecipes = axios.create({
    baseURL: "http://localhost:8080/recipe",
    headers:{Authorization : `Bearer ${jwtToken}`}
  })



  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page   
  const [recordsPerPage] = useState(8);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  const currentRecords = recipes.slice(indexOfFirstRecord,
    indexOfLastRecord);
  //calc the Number of Pages
  const nPages = Math.ceil(recipes.length / recordsPerPage)

  useEffect(() => {
    apirecipes.get(`search/${type}/${title}`).then(res => {
      // console.log(res.data)
      setRecipes(res.data);
    }).catch(err => {
      console.log(err)
    })
  }, [title, type])

  return (
    <div>
      <div className="row">
        <div className="row">
          <p className="h4 text-center">Browse Recipes</p>
        </div>
        <div className="col">

          <select defaultValue={type} name="option-recipe" id="option-recipe" onChange={(e) => setType(e.target.value)} className="form-select" aria-label="Default select example">
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <div className="col">
          <input className="form-control" id="title" type="text" placeholder="Search by Title" onInput={(e) => setTitle(e.target.value)} value={title} />
        </div>
      </div>
      <div className="row mt-3">
        {currentRecords.map(recipe => (
          <Recipes
            key={recipe.id}
            recipe={recipe}
            showOneRecipe={showOneRecipe}
          />
        ))}
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default Home
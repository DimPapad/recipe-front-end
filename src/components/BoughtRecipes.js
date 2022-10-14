// State
import { useState, useEffect } from 'react';

// Services
import RecipeService from '../services/RecipeService'

//Components
import BoughtRecipeItem from "./BoughtRecipeItem.js";


//
//
//
// MAIN
const BoughtRecipes = (props) => {

  // Data Manipulation
  const [boughtrec, setBoughtrec] = useState([])

  useEffect(() => {
    RecipeService.getBoughtRecipesByUserId(props.profileid)
      .then((response) => setBoughtrec(response.data))
      .catch((error) => console.log(error))
      .then()
  }
    , [boughtrec])

  
  return (
    <div>
      <h2>Bought Recipes</h2>
      {boughtrec.map((brec) => (<BoughtRecipeItem key={brec.id} brec={brec} />))}
    </div>
  );
};

export default BoughtRecipes;
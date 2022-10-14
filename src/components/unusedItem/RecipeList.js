import axios from "axios";
import { Fragment, useEffect, useState } from "react"
import RecipeItemRead from "./RecipeItemRead";
import RecipeItemEdit from "./RecipeItemEdit";
import CustomForm from "./CustomForm";

// import RecipeService from "../services/RecipeService"

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState(
        {
            description: null,
            id: null,
            ingredients: null,
            instructions: null,
            name: null,
            paid: null,
            photo: null,
            type: null,
            utensils: null,
            video: null
        }
    )
    const [isEdidedId, setisEdidedId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        description: null,
        id: null,
        ingredients: null,
        instructions: null,
        name: null,
        paid: null,
        photo: null,
        type: null,
        utensils: null,
        video: null
    })

    const [editRecipe, setEditRecipe] = useState({
        description: null,
        id: null,
        ingredients: null,
        instructions: null,
        name: null,
        paid: null,
        photo: null,
        type: null,
        utensils: null,
        video: null
    })
    const api = axios.create({
        baseURL: "http://localhost:8080/recipe"
    })

    useEffect(() => {
        api.get('/all').then(res => {
            setRecipes(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, [recipes])

    const handleAddFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;

        const newRecipe = { ...recipe }
        newRecipe[fieldName] = fieldValue;
        setRecipe(newRecipe);
    }
    const handleAddFormSubmit = (e) => {
        e.preventDefault();
        const newRecipe = { ...recipe };
        api.post('/', newRecipe)
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
            }).finnaly(
                setRecipe({
                    description: "",
                    id: null,
                    ingredients: "",
                    instructions: "",
                    name: "",
                    paid: "",
                    photo: null,
                    type: "",
                    utensils: "",
                    video: null
                }))

    }


    const handleEditButton = (e, recipe) => {
        e.preventDefault();
        setisEdidedId(recipe.id)
        const formValues = {
            description: recipe.description,
            id: recipe.id,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            name: recipe.name,
            paid: recipe.paid,
            photo: recipe.photo,
            type: recipe.type,
            utensils: recipe.utensils,
            video: recipe.video
        };
        setEditFormData(formValues)
        // api.get(`/${id}`).then(res => {
        //     setEditRecipe({ ...res.data })
        // }).catch(err => { console.log(err) })
        // setisEdidedId(true)

    }
    const handleDeleteButton = (id) => {
        api.delete(`/${id}`)
    }
    const handleEditSumbitButton = (e, id) => {
        e.preventDefault();

        api.put(`/${id}`, editFormData).then(res => { console.log("updated") }).catch(err => { console.log(err) })
        setisEdidedId(null)
    }
    const handleCancelButton = () => {
        setisEdidedId(null)
    }
    const handleEditFormChange = (e) => {
        e.preventDefault();

        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }



    return (
        <div>
            {/* <RecipeListNavBar/> */}
            <header>
                <h1>
                    RecipeList
                </h1>
            </header>
            <CustomForm
                recipe={recipe}
                api={api}
                handleAddFormChange={handleAddFormChange}
                handleAddFormSubmit={handleAddFormSubmit}
            />
            <table>
                <thead>
                    <th>Recipe id</th>
                    <th>Recipe Name</th>
                    <th>Recipe Description</th>
                    <th>Actions</th>
                </thead>

                <tbody>

                    {recipes.sort((a, b) => b.id - a.id).map(recipe => (
                        <Fragment>
                            {isEdidedId === recipe.id ? <RecipeItemEdit
                                key={recipe.id}
                                editFormData={editFormData}
                                handleEditSumbitButton={handleEditSumbitButton}
                                handleCancelButton={handleCancelButton}
                                handleEditFormChange={handleEditFormChange}
                            />
                                :
                                <RecipeItemRead
                                    key={recipe.id}
                                    recipe={recipe}
                                    handleEditButton={handleEditButton}
                                    handleDeleteButton={handleDeleteButton} />}


                        </Fragment>



                        // <RecipeItem
                        //     key={recipe.id}
                        //     recipe={recipe}
                        //     api={api}
                        // />
                    ))}



                </tbody>
            </table>
            {/* <RecipeListPaginator /> */}
        </div>

    )
}

export default RecipeList
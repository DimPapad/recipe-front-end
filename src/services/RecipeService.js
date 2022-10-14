import http from "../http-common"


const getBoughtRecipesByUserId = (id) => {
    return http.get(`recipe/bought/${id}`)
}

const RecipeService = {
    getBoughtRecipesByUserId
}

export default RecipeService




// const getFirst = () => {
//     http.get("recipe/showrecipe1").then(res => {
//         return res;
//     })
// }


// const RecipeService = {
//     getFirst
// };
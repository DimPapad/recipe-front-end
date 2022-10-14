import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

const RecipeItemRead = ({ recipe,handleEditButton,handleDeleteButton }) => {
    return (

        <tr>
            <td>
                {recipe.id}
            </td>
            <td>
                {recipe.name}
            </td>
            <td>
                {recipe.description}
            </td>
            <td>
                <button
                    id='edit'
                    className='btn'
                    onClick={(e) => handleEditButton(e,recipe)}
                ><PencilSquareIcon height={24}
                    width={24} /></button>
                <button
                    className='btn'
                    onClick={() => handleDeleteButton(recipe.id)}
                ><TrashIcon height={24}
                    width={24} /></button>
            </td>

        </tr>
    )
}

export default RecipeItemRead
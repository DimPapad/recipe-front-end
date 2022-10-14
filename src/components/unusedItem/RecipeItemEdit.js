import { XCircleIcon, CheckIcon } from '@heroicons/react/24/solid'

const RecipeItemEdit = ({editFormData,handleEditSumbitButton,handleCancelButton,handleEditFormChange}) => {
    return (
        <tr>
            <td>{editFormData.id}</td>
            <td>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    required
                />
            </td>
            <td>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    required
                    placeholder="Enter Recipe Description"
                />
            </td>
            <td>
                <button
                    id='edit'
                    className='btn'
                    onClick={(e) => handleEditSumbitButton(e,editFormData.id)}
                ><CheckIcon height={24}
                    width={24} /></button>
                <button
                    id='edit'
                    className='btn'
                    onClick={() => handleCancelButton()}
                ><XCircleIcon height={24}
                    width={24} /></button>
            </td>
        </tr>
    )
}

export default RecipeItemEdit
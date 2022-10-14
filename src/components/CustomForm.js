import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'

const CustomForm = ({ recipe,handleAddFormChange,handleAddFormSubmit }) => {
    
    

    return (
        <form
            onSubmit={handleAddFormSubmit}
        >
            <div>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={recipe.name}
                    onChange={handleAddFormChange}
                    required
                    autoFocus
                    maxLength={60}
                    placeholder="Enter Recipe Name"
                />
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={recipe.description}
                    onChange={handleAddFormChange}
                    required
                    maxLength={60}
                    placeholder="Enter Recipe Description"
                />
            </div>
            <button
                className='btn'
                aria-label="Add Recipe"
                type="submit">
                <PlusIcon height={24}
                    width={24} />

            </button>
        </form >
    )
}

export default CustomForm
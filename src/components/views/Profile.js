import { React } from 'react'

// Routing
import { useParams } from 'react-router-dom'

// Components
import BoughtRecipes from '../BoughtRecipes'


function Profile(props) {
    const { profileid } = useParams();



    return (
        <div>
            {props.changeDocTitle(`${profileid}`)}
            <h1>Profile - {profileid}</h1>
            <BoughtRecipes profileid={profileid}/>
        </div>
    )
}

export default Profile
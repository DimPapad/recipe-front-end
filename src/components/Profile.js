import './Recipes.css';
import { useState, useEffect } from 'react';
import Recipes from './Recipes'
import Pagination from './Pagination';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useParams } from 'react-router-dom';





const Profile = ({ changeDocTitle, jwtToken, showOneRecipe, profileUser, setProfileUser, loggedInUser }) => {
    changeDocTitle(`${profileUser.name}`)
    const location = useLocation();
    useEffect(() => {
        if (location.state !== null) {
            setProfileUser({ ...location.state.loggedInUser })
        }
    }, [])
    // States for the Component
    const [recipes, setRecipes] = useState([])
    const [title, setTitle] = useState('')
    const [type, setType] = useState(profileUser.name)
    const [friend, setFriend] = useState(false)
    //Axios created with JwtToken
    const api = axios.create({
        baseURL: "http://localhost:8080/",
        headers: { Authorization: `Bearer ${jwtToken}` }
    })

    const friendship = () => {
        api.get(`friendship/friend/${loggedInUser.id}/${profileUser.id}`)
            .then((res) => {
                setFriend(res.data)
            })
            .catch((err) => { console.log(err) })
    }

    const addFriend = () => {
        api.post(`/friendship/addFriend/${loggedInUser.id}/${profileUser.id}`)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }


    // Get Recipes when the Title and Type? are Checked
    useEffect(() => {
        if (type === `${profileUser.name}`) {
            api.get(`recipe/owned/${profileUser.id}/${title}`).then(res => {
                setRecipes(res.data);
            }).catch(err => {
                console.log(err)
            })
            // }
        } else {
            api.get(`savedRecipes/show/${type}/${profileUser.id}/${title}`).then(res => {
                setRecipes(res.data);
            }).catch(err => {
                console.log(err)
            })
        }

    }, [title, type])


    // Paginator
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

    return (
        <div className="container">
            <div className="row">
                <div className="profile-user-deteils">
                    <div className="col-2 text-danger fs-4">AVATAR TODO:</div>
                    <div className="col-10 text-center fw-bold fs-1">{profileUser.name}</div>
                </div>
                <div className="col mb-6">
                    {friendship()}
                    {(profileUser.id != loggedInUser.id && friend == false)
                        && <Button variant='warning' ><Link className='link-recipes' onClick={addFriend}>Friend Request</Link></Button>
                    }
                </div>
                {/* <div className="row">
                    {loggedInUser.id === profileUser.id &&
                        <div className="col">
                            <button>Change Email</button>
                        </div>}
                </div> */}
                <div className="row">
                    <div className="row">
                        <p className="h4 text-center">Browse Recipes</p>
                    </div>
                    <div className="col">

                        <select defaultValue={profileUser.name} name="option-recipe" id="option-recipe" onChange={(e) => setType(e.target.value)} className="form-select" aria-label="Default select example">
                            <option value="true">Paid Recipes</option>
                            <option value="false">Saved Recipes</option>
                            <option value={profileUser.name}>{profileUser.name} Recipes</option>
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
        </div>
    )
}

export default Profile
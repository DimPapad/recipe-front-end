import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CollapsibleExample({ loggedInUser, setProfileUser, setLoggedInUser, setJwtToken, setRecipe }) {
    const handleLoggout = () => {
        setLoggedInUser({
            name: null,
            email: null,
            id: null
        });
        setJwtToken(null)
        setProfileUser({
            name: null,
            email: null,
            id: null
        })
        setRecipe(null)

    }
    return (
        <div className="row">
            <div className="col">
                <Navbar collapseOnSelect expand="md" bg="light" >
                    <Navbar.Brand>Menu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link className='nav-link' to="/">Home</Link>
                            {loggedInUser.id !== null
                                ? <><Link className='nav-link' to={`/profile/${loggedInUser.name}`} onClick={() => { setProfileUser({ ...loggedInUser }) }}>My Profile</Link>
                                    <Link className='nav-link' to="/createrecipe">Create Recipe</Link>
                                    <Link className='nav-link' to="/" style={{ position: "absolute", right: "30px" }} onClick={() => handleLoggout()}>Logout</Link>
                                </>
                                : <>
                                    < Link className='nav-link' to="/login" style={{ position: "absolute", right: "120px" }}>Login</Link>
                                    <Link className='nav-link' to="/register" style={{ position: "absolute", right: "30px" }}>Register</Link>
                                </>}


                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div >
    );
}

export default CollapsibleExample;
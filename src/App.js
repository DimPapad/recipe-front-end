import { React, useEffect, useState } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// Routing
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';

// custom hooks
import useLocalStorage from './hooks/useLocalStorage'

// CSS
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'

// Components
// import Home from './components/views/Home';
// import Login from './components/views/Login';
import Register from './components/views/Register/Register';
import Profile from './components/Profile';
import Home from './components/Home';
import RecipeItem from './components/RecipeItem';
import LoginPageA from './components/LoginPageA';
import Chat from './components/chat/Chat';

// import Recipe from './components/views/Recipe';
import CreateRecipe from './components/views/CreateRecipe';
import EditRecipe from './components/views/EditRecipe';
// import NoPage from './components/views/NoPage';
import OurNavBar from './components/OurNavBar'



function App() {
  const [jwtToken, setJwtToken] = useLocalStorage('front-end.jwtToken', null);
  // loggedIn User details
  const [loggedInUser, setLoggedInUser] = useLocalStorage('front-end.loggedInUser', {
    name: null,
    email: null,
    id: null
  });
  // SHowing / Editing recipe details
  const [recipe, setRecipe] = useLocalStorage('front-end.recipe',null);
  // Showing profile User Details
  const [profileUser, setProfileUser] =useLocalStorage('front-end.profileUser',{
    name: null,
    email: null,
    id: null
  })
   const showOneRecipe = (recipe) => {
    setRecipe(recipe);
  }
  const changeDocTitle = (doctitle) => {
    document.title = doctitle;
  }


  return (
    <PayPalScriptProvider>
      <BrowserRouter>
        <div className='container'>
          {/* ΜΕΡΟΣ ΣΕΛΙΔΑΣ ΠΟΥ ΔΕΝ ΑΛΛΑΖΕΙ */}
          {/* ΚΑΠΟΙΟΥ ΕΙΔΟΥΣ NAVBAR ΜΠΟΡΕΙ ΝΑ ΜΠΕΙ ΕΔΩ ΑΝ ΕΙΝΑΙ ΙΔΙΟ ΣΕ ΟΛΕΣ ΤΙΣ ΣΕΛΙΔΕΣ */}
          <OurNavBar
            loggedInUser={loggedInUser}
            setProfileUser={setProfileUser}
            setLoggedInUser={setLoggedInUser}
            setRecipe={setRecipe} 
            setJwtToken={setJwtToken}
            loggedinuser={loggedInUser}
            />

          {/* ΜΕΡΗ ΣΕΛΙΔΑΣ ΠΟΥ ΑΛΛΑΖΟΥΝ */}
          <Routes>
            <Route path='/' element={<Home
              changeDocTitle={changeDocTitle}
              showOneRecipe={showOneRecipe}
              jwtToken={jwtToken}
            />} />
            <Route path='login' element={<LoginPageA
              setJwtToken={setJwtToken}
              setLoggedInUser={setLoggedInUser}
              changeDocTitle={changeDocTitle}
            />}
            />
            {<Route path='register' element={<Register changeDocTitle={changeDocTitle} />} />}
            <Route path='profile/:profileName' element={<Profile
              showOneRecipe={showOneRecipe}
              profileUser={profileUser}
              setProfileUser={setProfileUser}
              loggedInUser={loggedInUser}
              jwtToken={jwtToken}
              changeDocTitle={changeDocTitle}
              recipe={recipe}
            />} />
            <Route path='recipe/:recipeid' element={<RecipeItem
              recipe={recipe}
              setProfileUser={setProfileUser}
              profileUser={profileUser}
              loggedInUser={loggedInUser}
              changeDocTitle={changeDocTitle}
              jwtToken={jwtToken}
            />} />
            <Route path='edit/:recipeid' element={<EditRecipe
              oldrecipe={recipe}
              setProfileUser={setProfileUser}
              profileUser={profileUser}
              loggedinuser={loggedInUser}
              changeDocTitle={changeDocTitle}
              jwtToken={jwtToken}
            />} />
            <Route path='createrecipe' element={<CreateRecipe
              changeDocTitle={changeDocTitle}
              loggedinuser={loggedInUser}
              jwtToken={jwtToken}
            />} />
            {/* <Route path='*' element={<NoPage changeDocTitle={changeDocTitle} />} /> */}
          </Routes>

          {loggedInUser.id !== null ? <div className="row">
            <div className="col justify-content-end">
              <Chat
                loggedInUser={loggedInUser}
                jwtToken={jwtToken} />
            </div>
          </div> :
            <div className="row"></div>
          }
        </div>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
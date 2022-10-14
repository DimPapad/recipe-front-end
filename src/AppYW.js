import { React } from 'react';
import { Fragment } from 'react';

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// CSS
import './App.css';

// Components
import Register from './components/views/Register/Register';




function App() {

  const changeDocTitle = (doctitle) => {
    document.title = doctitle;
  }

  return (
    <BrowserRouter>
      <div className='container'>
        {/* ΜΕΡΟΣ ΣΕΛΙΔΑΣ ΠΟΥ ΔΕΝ ΑΛΛΑΖΕΙ */}
        {/* ΚΑΠΟΙΟΥ ΕΙΔΟΥΣ NAVBAR ΜΠΟΡΕΙ ΝΑ ΜΠΕΙ ΕΔΩ ΑΝ ΕΙΝΑΙ ΙΔΙΟ ΣΕ ΟΛΕΣ ΤΙΣ ΣΕΛΙΔΕΣ */}
        <Register />
      </div>
    </BrowserRouter>
  );
}

export default App;
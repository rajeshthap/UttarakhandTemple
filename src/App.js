import React from 'react';
import './App.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import 'react-bootstrap/esm/Navbar.js';
import 'react-bootstrap/esm/Nav.js';
import 'react-bootstrap/esm/NavDropdown.js';
import 'react-bootstrap/esm/Form.js';
import 'react-bootstrap/esm/Button.js';
import 'react-bootstrap/esm/Container.js';
import 'react-bootstrap/esm/Offcanvas.js';
import 'react-bootstrap/esm/Dropdown.js';
import 'react-bootstrap/esm/DropdownButton.js';
import "./CustomCss/custom.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';



// Importing necessary components and pages


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <div>Home </div>
    },
    {
      path: '/Aboutus',
      element: <div>Aboutus</div>
    },
    {
      path: '/Specialannouncements',
      element: <div>Specialannouncements</div>

    },
  ]
);
function App() {
  return (
    <div className="App">

      <Home />
      <RouterProvider router={router} />
      <h1>Welcome to My App</h1>
    </div>
  );
}

export default App;

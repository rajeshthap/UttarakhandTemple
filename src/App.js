import React from "react";
import "./App.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-bootstrap/esm/Form.js";
import "react-bootstrap/esm/Button.js";
import "react-bootstrap/esm/Container.js";
import "react-bootstrap/esm/Offcanvas.js";
import "react-bootstrap/esm/Dropdown.js";
import "react-bootstrap/esm/DropdownButton.js";
import "./CustomCss/custom.css";
import "@fontsource/poppins"; 
import TempleAuthority from "./Component/userregistration/TempleAuthority";
import {
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Pages/Home";
import InfoBar from "./Component/Navigation/InfoBar";
import TopNavBar from "./Component/Navigation/TopNavBar";
import AuthorityLogin from "./Component/userregistration/AuthorityLogin";
import PanditRegistration from "./Component/userregistration/PanditRegistration";
import DevoteeRegistration from "./Component/userregistration/DevoteeRegistration";
import NotFound from "./Component/notfound/NotFound";
import { BASE_URLL } from "./Component/BaseURL";


// Importing necessary components and pages

function App() {
  return (
    <div className="App">
      <InfoBar />
      <TopNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TempleAuthority" element={<TempleAuthority />} />
        <Route path="/AuthorityLogin" element={<AuthorityLogin />} />
        <Route path="/PanditRegistration" element={<PanditRegistration />} />
        <Route path="/DevoteeRegistration" element={<DevoteeRegistration />} />
        <Route path="/BaseURL" element={<BASE_URLL />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import "./CustomCss/custom.css"
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
import PanditLogin from "./Component/userregistration/PanditLogin";
import DevoteeLogin from "./Component/userregistration/DevoteeLogin";
import TempleFooter from "./Component/temple_footer/TempleFooter";
import DonateTemples from "./Component/DonateToTemples/DonateTemples";
import ExtendYourDivine from "./Component/DonateToTemples/ExtendYourDivine"
import { BASE_URLL } from "./Component/BaseURL";
import OTPModel from "./Component/OTPModel/OTPModel";
import PaymentConfirmation from "./Component/DonateToTemples/PaymentConfirmation"
import LocationState from "./Component/userregistration/LocationState";
import MandirBooking from "./Component/Mandir_booking/MandirBooking";
import DarshanBooking from "./Component/Mandir_booking/DarshanBooking";
import TempleFacilityBooking from "./Component/userregistration/TempleFacilityBooking";
import PoojaBooking from "./Component/Mandir_booking/PoojaBooking/PoojaBooking";
import SevaRegistration from "./Component/Mandir_booking/SevaRegistration/SevaRegistration";
import EventParticipation from "./Component/Mandir_booking/EventParticipation/EventParticipation";
import OnlineHirePandit from "./Component/Mandir_booking/OnlineHirePandit";
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
        <Route path="/PanditLogin" element={<PanditLogin />} />
        <Route path="/DevoteeLogin" element={<DevoteeLogin />} />
        <Route path="/DonateTemples" element={<DonateTemples />} />
        <Route path="/ExtendYourDivine" element={<ExtendYourDivine />} />
        <Route path="/PaymentConfirmation" element={<PaymentConfirmation />} />
        <Route path="/DarshanBooking" element={<DarshanBooking />} />
        <Route path="/MandirBooking" element={<MandirBooking />} />
        <Route path="/PoojaBooking" element={<PoojaBooking/>} />
        <Route path="/LocationState" element={<LocationState />} />
        <Route path="/TempleFacilityBooking" element={<TempleFacilityBooking />} />
        <Route path="/SevaRegistration" element={<SevaRegistration/>} />
        <Route path="/EventParticipation" element={<EventParticipation/>} />
        <Route path="/OnlineHirePandit" element={<OnlineHirePandit />} />
        
        <Route path="/BaseURL" element={<BASE_URLL />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <TempleFooter />
    </div>
  );
}

export default App;

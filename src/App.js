import React from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CustomCss/custom.css"
import "./CustomCss/style.css"
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
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import InfoBar from "./Component/Navigation/InfoBar";
import TopNavBar from "./Component/Navigation/TopNavBar";

import PanditRegistration from "./Component/userregistration/PanditRegistration";
import DevoteeRegistration from "./Component/userregistration/DevoteeRegistration";
import NotFound from "./Component/notfound/NotFound";

import TempleFooter from "./Component/temple_footer/TempleFooter";
import DonateTemples from "./Component/DonateToTemples/DonateTemples";
import ExtendYourDivine from "./Component/DonateToTemples/ExtendYourDivine"
import Login from "./Component/AllLogin/Login";
import { BASE_URLL } from "./Component/BaseURL";
// import OTPModel from "./Component/OTPModel/OTPModel";
import PaymentConfirmation from "./Component/DonateToTemples/PaymentConfirmation"
import LocationState from "./Component/userregistration/LocationState";
import MandirBooking from "./Component/Mandir_booking/MandirBooking";
import DarshanBooking from "./Component/Mandir_booking/DarshanBooking";
import TempleFacilityBooking from "./Component/userregistration/TempleFacilityBooking";
import PoojaBooking from "./Component/Mandir_booking/PoojaBooking/PoojaBooking";
import SevaRegistration from "./Component/Mandir_booking/SevaRegistration/SevaRegistration";
import EventParticipation from "./Component/Mandir_booking/EventParticipation/EventParticipation";
import OnlineHirePandit from "./Component/Mandir_booking/OnlineHirePandit";
import PanditBooking from "./Component/PanditBooking";
import UserVerifyOtp from "./Component/userregistration/UserVerifyOtp";
import ForgetPassword from "./Component/userregistration/ForgetPassword";
import ForgotPassword from "./Component/SendOtp/ForgotPassword";
import MandirMahadevaya from "./Component/Home/MandirMahadevaya";
import ContactUs from "./Component/Home/ContactUs";
import SpecialAnnouncements from "./Component/Home/SpecialAnnouncements";
import MissionVision from "./Component/Home/MissionVision";
import AboutUs from "./Component/Home/AboutUs";
import PlatFormInfo from "./Component/Home/PlatFormInfo";
import DashBoard from "./Component/dashboard/DashBoard";
import LeftNav from "./Component/dashboard/LeftNav";
import TempleBookingInfo from "./Component/TempleBookingInfo";
import MainDashBoard from "./Component/dashboard/innerpage_dashboard/MainDashBoard";
import DonateDashBoard from "./Component/dashboard/innerpage_dashboard/DonateDashBoard";
import PanditDashBoard from "./Component/dashboard/innerpage_dashboard/PanditDashBoard";
import PoojaBookingDashBoard from "./Component/dashboard/innerpage_dashboard/PoojaBookingDashBoard";
import DarshanBookingDashBoard from "./Component/dashboard/innerpage_dashboard/DarshanBookingDashBoard";
import MandirBookingDashBoard from "./Component/dashboard/innerpage_dashboard/MandirBookingDashBoard";
import SevaRegistrationDashBoard from "./Component/dashboard/innerpage_dashboard/SevaRegistrationDashBoard";
import ChangePassword from "./Component/dashboard/innerpage_dashboard/ChangePassword";
import TempleLeftNav from "./Component/temp_dashboard/TempleLeftNav";
import TempleDashBoard from "./Component/temp_dashboard/TempleDashBoard";
import Pandit_DashBoard from "./Component/pandit_dashboard/Pandit_DashBoard";
import PanditLeftNav from "./Component/pandit_dashboard/PanditLeftNav";
import PanditDonateDashBoard from "./Component/pandit_dashboard/pandit_innerdashborad/PanditDonateDashBoard";
import PanditBookDashBoard from "./Component/pandit_dashboard/pandit_innerdashborad/PanditBookDashBoard";
import PanditPoojaBooking from "./Component/pandit_dashboard/pandit_innerdashborad/PanditPoojaBooking";
import PanditBookingDashBoard from "./Component/pandit_dashboard/pandit_innerdashborad/PanditBookingDashBoard";
import PanditDarshanBooking from "./Component/pandit_dashboard/pandit_innerdashborad/PanditDarshanBooking";
import PanditChangePassword from "./Component/pandit_dashboard/pandit_innerdashborad/PanditChangePassword";
import PanditSevaRegis from "./Component/pandit_dashboard/pandit_innerdashborad/PanditSevaRegis";
import TempDonateDashBoard from "./Component/temp_dashboard/temp_innerdashboard/TempDonateDashBoard";
import TempPanditBooking from "./Component/temp_dashboard/temp_innerdashboard/TempPanditBooking";
import TempPoojaBooking from "./Component/temp_dashboard/temp_innerdashboard/TempPoojaBooking";
import TempChangePassword from "./Component/temp_dashboard/temp_innerdashboard/TempChangePassword";
import TempSevaRegis from "./Component/temp_dashboard/temp_innerdashboard/TempSevaRegis";
import TempDarshnBooking from "./Component/temp_dashboard/temp_innerdashboard/TempDarshnBooking";
import TempBookingDashBoard from "./Component/temp_dashboard/temp_innerdashboard/TempBookingDashBoard";

import SendOtpModal from "./Component/OTPModel/SendOtpModal";
// import DashBoard from "./Component/dashboard/DashBoard";
// import LeftNav from "./Component/dashboard/LeftNav";

// Importing necessary components and pages

function App() {

  const location = useLocation
    ();
  const hiddenPaths = new Set(["/DashBoard", "/MainDashBoard", "/DonateDashboard", "/PanditDashBoard", "/LeftNav", "/PoojaBookingDashBoard", "/MandirBookingDashBoard", "/DarshanBookingDashBoard", "/SevaRegistrationDashBoard",
     "/ChangePassword","/TempleDashBoard", "/TempleLeftNav","/PanditDarshanBooking","/PanditChangePassword","/PanditLeftNav","/Pandit_DashBoard","/PanditDonateDashBoard","/PanditBookDashBoard","/PanditPoojaBooking","/PanditBookingDashBoard","/PanditSevaRegis","/TempDonateDashBoard","/TempPanditBooking","/TempPoojaBooking","/TempChangePassword","/TempSevaRegis","/TempDarshnBooking","/TempBookingDashBoard"]);
  const shouldHideBars = hiddenPaths.has(location.pathname);
  const hideFooter = location.pathname === "/";
  return (
    <div className="App">
      {!shouldHideBars && <InfoBar />}
      {!shouldHideBars && <TopNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/TempleAuthority" element={<TempleAuthority />} />

        <Route path="/PanditRegistration" element={<PanditRegistration />} />
        <Route path="/DevoteeRegistration" element={<DevoteeRegistration />} />
        <Route path="/Login" element={<Login />} />
       
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/DonateTemples" element={<DonateTemples />} />
        <Route path="/ExtendYourDivine" element={<ExtendYourDivine />} />
        <Route path="/PaymentConfirmation" element={<PaymentConfirmation />} />
        <Route path="/DarshanBooking" element={<DarshanBooking />} />
        <Route path="/MandirBooking" element={<MandirBooking />} />
        <Route path="/PoojaBooking" element={<PoojaBooking />} />
        <Route path="/LocationState" element={<LocationState />} />
        <Route path="/TempleFacilityBooking" element={<TempleFacilityBooking />} />
        <Route path="/SevaRegistration" element={<SevaRegistration />} />
        <Route path="/EventParticipation" element={<EventParticipation />} />
        <Route path="/OnlineHirePandit" element={<OnlineHirePandit />} />
         <Route path="/PanditBooking" element={<PanditBooking />} />
        <Route path="/UserVerifyOtp" element={<UserVerifyOtp />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/MandirMahadevaya" element={<MandirMahadevaya />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/SpecialAnnouncements" element={<SpecialAnnouncements />} />
        <Route path="/MissionVision" element={<MissionVision />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/PlatFormInfo" element={<PlatFormInfo />} />
        <Route path="/MandirBookingDashBoard" element={<MandirBookingDashBoard />} />
        <Route path="/TempDarshnBooking" element={<TempDarshnBooking />} />

        <Route path="/BaseURL" element={<BASE_URLL />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/MainDashBoard" element={<MainDashBoard />} />
        <Route path="/DonateDashBoard" element={<DonateDashBoard />} />
        <Route path="/PanditDashBoard" element={<PanditDashBoard />} />
        <Route path="/PoojaBookingDashBoard" element={<PoojaBookingDashBoard />} />
        <Route path="/DarshanBookingDashBoard" element={<DarshanBookingDashBoard />} />
        <Route path="/SevaRegistrationDashBoard" element={<SevaRegistrationDashBoard />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/TempleBookingInfo" element={<TempleBookingInfo />} />

        <Route path="/TempleDashBoard" element={<TempleDashBoard />} />
        <Route path="/TempleLeftNav" element={<TempleLeftNav />} />
        <Route path="/Pandit_DashBoard" element={<Pandit_DashBoard />} />
        <Route path="/PanditLeftNav" element={<PanditLeftNav />} />
        <Route path="/PanditDonateDashBoard" element={<PanditDonateDashBoard />} />
        <Route path="/PanditBookDashBoard" element={<PanditBookDashBoard />} />
        <Route path="/PanditPoojaBooking" element={<PanditPoojaBooking />} />
        <Route path="/PanditBookingDashBoard" element={<PanditBookingDashBoard />} />
        <Route path="/PanditDarshanBooking" element={<PanditDarshanBooking />} />
        <Route path="/PanditDarshanBooking" element={<PanditDarshanBooking />} />
        <Route path="/PanditChangePassword" element={<PanditChangePassword />} />
        <Route path="/PanditSevaRegis" element={<PanditSevaRegis />} />
        <Route path="/TempDonateDashBoard" element={<TempDonateDashBoard />} />
        <Route path="/TempPanditBooking" element={<TempPanditBooking />} />
        <Route path="/TempPoojaBooking" element={<TempPoojaBooking />} />
        <Route path="/TempChangePassword" element={<TempChangePassword />} />
        <Route path="/TempSevaRegis" element={<TempSevaRegis />} />
        <Route path="/TempBookingDashBoard" element={<TempBookingDashBoard />} />
        
        <Route path="/LeftNav" element={<LeftNav />} />
        <Route path="/SendOtpModal" element={<SendOtpModal />} />
      </Routes>
      {!hideFooter && <TempleFooter />}
    </div>
  );
}

export default App;

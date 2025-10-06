import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import {
  MdLibraryBooks,
} from "react-icons/md";
import { FaAlignLeft } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import CompanyLogo from "../../assets/images/company-logo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import "../../assets/CSS/LeftNav.css";
import ModifyAlert from "../Alert/ModifyAlert";
import { BiDonateHeart } from "react-icons/bi";
import { GiByzantinTemple } from "react-icons/gi";
import { LiaCalendarCheck } from "react-icons/lia";
import { FaRegFileLines } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import { IoCalendarClear } from "react-icons/io5";
import { Dropdown } from "react-bootstrap";


function TempleLeftNav() {
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [userName, setUserName] = useState("Loading...");
  const [activePath, setActivePath] = useState("");
  const location = useLocation();
  // alert state
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  useEffect(() => {
    // Get initial user name
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.name) {
      setUserName(storedUser.name);
    }

    setActivePath(location.pathname);

    // Poll for updates
    const interval = setInterval(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = JSON.parse(localStorage.getItem("updatedPhase1Data"));
      const newName =
        updatedUser?.kanya_name || storedUser?.name || "Unknown User";

      setUserName((prevName) => (prevName !== newName ? newName : prevName));
      setActivePath(location.pathname);
    }, 1000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const toggleNav = () => {
    setIsNavClosed(!isNavClosed);
  };

  const handleDownload = (fileUrl, fileName) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

 const logout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.clear();
    setAlertMessage("Logout successfully!");
    setShowModifyAlert(true);
    // Clear alert after 3 seconds
    setTimeout(() => {
      setAlertMessage("");
      setShowModifyAlert(false);
    }, 2000);

    window.location.href = "/"; // Redirect after logout
  }
};

  const navigationOptions = [
    { icon: <RiDashboard3Line />, label: "Dashboard", path: "/TempleDashBoard" },
    { icon: <BiDonateHeart />, label: "Donate", path: "/TempDonateDashBoard" },
    { icon: <LiaCalendarCheck />, label: "Pandit Booking", path: "/TempPanditBooking" },
    { icon: <IoCalendarClear />, label: "Pooja Booking", path: "/TempPoojaBooking" },
    {
      icon: <GiByzantinTemple />,
      label: "Mandir Booking",
      path: "/TempBookingDashBoard",
  
    },
    {
      icon: <MdLibraryBooks />,
      label: "Darshan Booking",

      path: "/TempDarshnBooking",
     
    },
    {
      path: "/TempSevaRegis",

      icon: <FaRegFileLines />,
      label: "Seva Registration",
     
    },
    { icon: <TbPasswordUser />, label: "Change Password", path: "/TempChangePassword" },
  ];

  return (
    <>
      {/* Header */}
      <header className="user-nd-header">
        <div className="logosec">
          <img
            src={MenuIcon}
            className="icn menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />
          <Link to="#" className="logo-page">
            <img src={CompanyLogo} alt="Manadavaaya" title="MAHADAVAAYA" className="logo" />
          </Link>


          {/* <div className="nd-title">
            <span className="nd-subtitle">उत्तराखंड सरकार | Gov.t of Uttarakhand</span>
            <span className="subtitle">
              महिला सशक्तिकरण एवं बाल विकास विभाग उत्तराखंड
            </span>
          </div> */}
        </div>

        <div className="message">
 <ModifyAlert
        message={alertMessage}
        show={showModifyAlert}
        setShow={setShowModifyAlert}
      />
          <div className="nd-msg">User: {userName}</div>
          <Dropdown align="end" className="temp-dp">
     
      <Dropdown.Toggle
        variant=""
        id="user-dropdown"
        className=" border-0 bg-transparent"
        title="Account Menu"
      >
        <div className="nd-log-icon-pandit">
          <LuLogOut />
        </div>
      </Dropdown.Toggle>

      {/* Dropdown menu */}
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/Profile">
          My Profile
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/Dashboard">
          Dashboard
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={logout} className="text-danger">
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

          {/* <div className="temp-dp" title="Click to logout" onClick={logout}>
            <div className="nd-log-icon">
              <LuLogOut />
            </div>
          </div> */}
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
        <nav className="temp-nav">
          <div className="nav-upper-options">

            <div className="nd-menu">
              <FaAlignLeft className="icn menuicn" onClick={toggleNav} />
              <div className="nd-user">User: {userName}</div>

                        <Dropdown align="end" className="temp-dp">
                   
                    <Dropdown.Toggle
                      variant=""
                      id="user-dropdown"
                      className=" border-0 bg-transparent"
                      title="Account Menu"
                    >
                      <div className="nd-log-icon-pandit">
                        <LuLogOut />
                      </div>
                    </Dropdown.Toggle>
              
                    {/* Dropdown menu */}
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/Profile">
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/Dashboard">
                        Dashboard
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logout} className="text-danger">
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
              {/* <div className="nd-log-icon-mob-data" title="Logout" onClick={logout}>
                <LuLogOut />
              </div> */}
            </div>

            {navigationOptions.map((option, index) => (
              <React.Fragment key={index}>
                {option.download ? (
                  <div
                    className={`temp-nav-option option${index + 1} ${activePath === option.fileUrl ? "active-nav-option" : ""
                      }`}
                    onClick={() => {
                      setActivePath(option.fileUrl);
                      handleDownload(option.fileUrl, option.fileName);
                    }}
                  >
                    <div className="nav-item d-flex">
                      <span className="nav-icon">{option.icon}</span>
                      <span className="nav-label">{option.label}</span>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={option.path}
                    className={`temp-nav-option option${index + 1} ${activePath === option.path ? "active-nav-option" : ""
                      }`}
                    onClick={() => setActivePath(option.path)}
                  >
                    <div className="nav-item d-flex">
                      <span className="nav-icon">{option.icon}</span>
                      <span className="nav-label">{option.label}</span>
                    </div>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}

export default TempleLeftNav;

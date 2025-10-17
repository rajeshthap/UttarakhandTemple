import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import {
  MdLibraryBooks,
} from "react-icons/md";
import { FaAlignLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import CompanyLogo from "../../assets/images/company-logo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import "../../assets/CSS/LeftNav.css";
import ModifyAlert from "../Alert/ModifyAlert";
import { BiDonateHeart } from "react-icons/bi";
import { GiByzantinTemple } from "react-icons/gi";
import { LiaCalendarCheck } from "react-icons/lia";
import Navbar from "react-bootstrap/Navbar";
import { FaRegFileLines } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import { IoCalendarClear } from "react-icons/io5";
import { Dropdown, Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../GlobleAuth/AuthContext";
import "../../assets/CSS/TopInfo.css";
function LeftNav() {
  const { clearAuth } = useAuth();

  const [isNavClosed, setIsNavClosed] = useState(false);
  const [userName, setUserName] = useState("Loading...");
  const [activePath, setActivePath] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState(null); // Track which submenu is open
  const [hoveredMenu, setHoveredMenu] = useState(null); // Track which menu is hovered
  const location = useLocation();
  // alert state
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  const toggleSubMenu = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleMenuHover = (index) => {
    setHoveredMenu(index);
  };

  const handleMenuLeave = () => {
    setHoveredMenu(null);
  };

 const logout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.clear();      
    clearAuth();               
    setAlertMessage("Logout successfully!");
    setShowModifyAlert(true);

    setTimeout(() => {
      setAlertMessage("");
      setShowModifyAlert(false);
      window.location.href = "/"; 
    }, 2000);
  }
};


  const navigationOptions = [
    { icon: <RiDashboard3Line />, label: "Dashboard", path: "/MainDashBoard" },
    // { icon: <BiDonateHeart />, label: "Online", path: "#" },
    {
      icon: <LiaCalendarCheck />,
      label: "Online Booking",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
           icon: <LiaCalendarCheck />,
           label: "Darshnam Booking", 
          path: "/DarshanBookingDashBoard" },

          {
           icon: <LiaCalendarCheck />,
           label: "Donation", 
          path: "/DonateDashBoard" },
        
           {
           icon: <LiaCalendarCheck />,
           label: "Pandit Booking", 
          path: "/PanditDashBoard" },
       
       {
           icon: <LiaCalendarCheck />,
           label: "Seva Booking", 
          path: "/SevaRegistrationDashBoard" },
          {
           icon: <LiaCalendarCheck />,
           label: "Event Participation", 
          path: "/EventDashBoard" },
       {
           icon: <LiaCalendarCheck />,
           label: "Pooja Booking", 
          path: "/PoojaBookingDashBoard" },
      ]
      
      
    },
  {
      icon: <GiByzantinTemple />,
      label: "Booking History",
      path: "/BookingHistory",
    
    },
    {
      icon: <LiaCalendarCheck />,
      label: "My Account",
      path: "#",
      hasSubmenu: true,
      subItems: [
         {
           icon: <LiaCalendarCheck />,
           label: "My Profile", 
          path: "/MyProfile" },
        {
           icon: <LiaCalendarCheck />,
           label: "Change Password", 
          path: "/ChangePassword" },

       
      
      ]
    },
   
  
    {
      path: "/Support",
      icon: <FaRegFileLines />,
      label: "Support",
    
    },
    {
    icon: <TbPasswordUser />,
    label: "Logout",
    path: "#", // will trigger logout
    isLogout: true, // custom flag to detect logout
  },
  ];

  return (
    <>
      {/* Header */}
      <Navbar className="user-nd-header" expand="lg">
        <Nav  className="me-auto my-2 my-lg-0 px-2" navbarScroll>
          <img
            src={MenuIcon}
            className="icn menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />
          <Link to="#" className="logo-page">
            <img src={CompanyLogo} alt="Manadavaaya" title="MAHADAVAAYA" className="logo" />
          </Link>
         
         <NavDropdown title="Home" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="/AboutUs">
                      About Us
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/PlatFormInfo">
                      Platform info
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/MissionVision">
                      Mission & Vision
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item href="/ContactUs">
                      Contact Info
                    </NavDropdown.Item> */}
                    <NavDropdown.Item href="/MandirMahadevaya">
                      Mandir & Mahadevaya Platform Overview{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/SpecialAnnouncements">
                      Special announcements / Upcoming Events
                    </NavDropdown.Item>
                  </NavDropdown>
                   <Nav.Link href="/DonateTemples">Donate</Nav.Link>
                  <Nav.Link href="/TempleBookingInfo">Darshan & Pooja Booking</Nav.Link>
                    <NavDropdown
                    title="Pooja & Seva"
                    id="navbarScrollingDropdown"
                  >
                    <NavDropdown.Item href="/PoojaBooking">
                      Pooja Booking{" "}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/SevaRegistration">
                      Seva Registration
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/EventParticipation">
                      Event Participation
                    </NavDropdown.Item>
                  </NavDropdown>
<Nav.Link href="/PanditBooking">Pandit Booking</Nav.Link>
 <NavDropdown title="Events" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">
                      Upcoming Mandir Events
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item href="#action4">
                      Past Event Gallery
                    </NavDropdown.Item> */}
                  </NavDropdown>
        </Nav>
        
                 
        <div className="message">
          <ModifyAlert
            message={alertMessage}
            show={showModifyAlert}
            setShow={setShowModifyAlert}
          />

          <div className="nd-msg">User: {userName}</div>
          <Dropdown align="end" className="user-dp">
            <Dropdown.Toggle
              variant=""
              id="user-dropdown"
              className="border-0 bg-transparent"
              title="Account Menu"
            >
              <div className="nd-log-icon-pandit">
                <LuLogOut />
              </div>
            </Dropdown.Toggle>

            {/* Dropdown menu */}
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/UserProfile">
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

        </div>
      </Navbar>

      {/* Sidebar Navigation */}
      <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
        <nav className="nav">
          <div className="nav-upper-options">
            <div className="nd-menu">
              <FaAlignLeft className="icn menuicn" onClick={toggleNav} />
              <div className="nd-user">User: {userName}</div>
              <Dropdown align="end" className="user-dp">
                <Dropdown.Toggle
                  variant=""
                  id="user-dropdown"
                  className="border-0 bg-transparent"
                  title="Account Menu"
                >
                  <div className="nd-log-icon-pandit">
                    <LuLogOut />
                  </div>
                </Dropdown.Toggle>

                {/* Dropdown menu */}
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/UserProfile">
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/DashBoard">
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout} className="text-danger">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {navigationOptions.map((option, index) => (
              <React.Fragment key={index}>
                {option.download ? (
                  <div
                    className={`nav-option option${index + 1} ${activePath === option.fileUrl ? "active-nav" : ""
                      } ${hoveredMenu === index ? "hovered-nav" : ""}`}
                    onClick={() => {
                      setActivePath(option.fileUrl);
                      handleDownload(option.fileUrl, option.fileName);
                    }}
                    onMouseEnter={() => handleMenuHover(index)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <div className="nav-item d-flex">
                      <span className="nav-icon">{option.icon}</span>
                      <span className="nav-label">{option.label}</span>
                    </div>
                  </div>
                ) : option.hasSubmenu ? (
                  <>
                    <div
                      className={`nav-option option${index + 1} ${activePath === option.path || openSubMenu === index ? "active-nav" : ""
                        } ${hoveredMenu === index ? "hovered-nav" : ""}`}
                      onClick={() => toggleSubMenu(index)}
                      onMouseEnter={() => handleMenuHover(index)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="nav-item d-flex justify-content-between">
                        <div className="d-flex">
                          <span className="nav-icon">{option.icon}</span>
                          <span className="nav-label">{option.label}</span>
                        </div>
                        <span className="nav-arrow">
                          {openSubMenu === index ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      </div>
                    </div>
                    <div className={`sub-menu ${openSubMenu === index ? 'open' : ''}`}>
                      {option.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`nav-option sub-nav-option ${activePath === subItem.path ? "active-nav" : ""
                            }`}
                          onClick={() => setActivePath(subItem.path)}
                        >
                          <div className="sub-item d-flex">
                             <span className="nav-icon">
                                      {subItem.icon}
                                    </span>
                            <span className="sub-label">{subItem.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                <Link
  to={option.path}
  className={`nav-option option${index + 1} ${activePath === option.path ? "active-nav" : ""}
    ${hoveredMenu === index ? "hovered-nav" : ""}`}
  onClick={() => {
    if (option.isLogout) {
      logout(); // use the new logout handler
    } else {
      setActivePath(option.path);
    }
  }}
  onMouseEnter={() => handleMenuHover(index)}
  onMouseLeave={handleMenuLeave}
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

export default LeftNav;
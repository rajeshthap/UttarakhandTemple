import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import axios from "axios";
import { FaAlignLeft, FaChevronDown, FaChevronUp, FaRegCheckCircle } from "react-icons/fa";
import { LuCalendarClock, LuCircleCheck, LuLogOut } from "react-icons/lu";
import CompanyLogo from "../../assets/images/company-logo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import "../../assets/CSS/AdminLeftNav.css";
import ModifyAlert from "../Alert/ModifyAlert";
import { GiByzantinTemple } from "react-icons/gi";
import { LiaCalendarCheck } from "react-icons/lia";
import { IoCalendarSharp, IoCloseCircleOutline } from "react-icons/io5";
import { Dropdown, Nav } from "react-bootstrap";
import { ImProfile } from "react-icons/im";
import { useAuth } from "../GlobleAuth/AuthContext";
import Support from "../../assets/images/support.png"
import { MdAccountCircle, MdEventAvailable, MdPendingActions, MdReviews} from "react-icons/md";

import Transactions from "../../assets/images/Transactions.png"
import "../../assets/CSS/TopInfo.css";
function AdminLeftnav() {
  const { clearAuth } = useAuth();
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [userName,] = useState("Loading...");
  const [activePath, setActivePath] = useState("");

  const [openSubMenu, setOpenSubMenu] = useState(null); // Track which submenu is open
  const [hoveredMenu, setHoveredMenu] = useState(null); // Track which menu is hovered
  const location = useLocation();
  // alert state
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavClosed(!isNavClosed);
  };
  const [profile, setProfile] = useState({
    displayName: "",
    pandit_image: "",
  });
  const [, setLoading] = useState(false);

  const { uniqueId } = useAuth(); // if you have AuthContext
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = uniqueId
        const response = await axios.get(
          `https://mahadevaaya.com/backend/api/get-pandit/?pandit_id=${userId}`
        );

        if (response.data) {
          const user = response.data;
          setProfile({
            displayName: user.first_name || "",
            pandit_image: user.pandit_image || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [uniqueId]);


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
    { icon: <RiDashboard3Line />, label: "Dashboard", path: "/AdminDashBoard" },

    // { icon: <BiDonateHeart />, label: "Online", path: "#" },

   

 { icon: <RiDashboard3Line />, label: "All Temple Booking", path: "/AllTempleBooking" },
 { icon: <RiDashboard3Line />, label: "All Pandit Booking", path: "/AllPanditBooking" },
 { icon: <RiDashboard3Line />, label: "All Devotee Booking", path: "/AllDevoteeBooking" },
  { icon: <RiDashboard3Line />, label: "All Darshan Booking", path: "/AllDarshanBooking" },



 {
        icon: <MdAccountCircle />,
       label: "Requests",
       path: "#",
       hasSubmenu: true,
       subItems: [
         {
           icon: <MdAccountCircle />,
           label: "Pending Request", 
           path: "/PendingRequest"
         },
         {
            icon: <MdAccountCircle />,
           label: "Accepted Request",
           path: "/AcceptedRequest"
         },
         {
           icon: <MdAccountCircle />,
           label: "Rejected Request",
           path: "/RejectedRequest"
         },
        
 
       ]
     },

    {
      icon: <LuCalendarClock />,
      label: "All Event",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
          icon: <MdPendingActions />,
          label: "UpComing Event ",
          path: "#"
        },
        {
          icon: <LuCircleCheck />,
          label: "Past Event",
          path: "#"
        },

      ]
    },

    {
      icon: <IoCalendarSharp />,
      label: "Donate Amount",
      path: "#",

    },
    {
      icon: <img src={Transactions} alt="Support" className="left-nav-icon" />,
      label: "Crowdfunding",
      path: "#",

    },

    

    
    {
      icon: <LuLogOut />,
      label: "Logout",
      path: "#", // will trigger logout
      isLogout: true, // custom flag to detect logout
    },
  ];

  return (
    <>
      {/* Header */}
      <header className="user-nd-header" expand="lg">
        <div className="me-auto my-2 my-lg-0 px-2" navbarScroll>
          <img
            src={MenuIcon}
            className="icn menuicn"
            alt="menu-icon"
            onClick={toggleNav}
          />
          <Link to="#" className="logo-page">
            <img src={CompanyLogo} alt="Manadavaaya" title="MAHADAVAAYA" className="logo" />
          </Link>


        </div>


        <div className="message">
          <ModifyAlert
            message={alertMessage}
            show={showModifyAlert}
            setShow={setShowModifyAlert}
          />

          <div className=" d-flex align-items-center gap-2">
            <div className="nd-msg">{profile.displayName || "Admin"}</div>
            <Dropdown align="end" className="user-dp">
              <Dropdown.Toggle
                variant=""
                id="user-dropdown"
                className="border-0 bg-transparent"
                title="Account Menu"
              >
                <img
                  src={
                    profile.pandit_image
                      ? `https://mahadevaaya.com/backend/media/pandit_images/${profile.pandit_image.split("/").pop()}`
                      : "https://mahadevaaya.com/backend/media/pandit_images/default.png"
                  }
                  alt={profile.displayName || ""}
                  className="nav-profile-photo"
                />
              </Dropdown.Toggle>

              {/* Dropdown menu */}
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="#">
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="#">
                  Change Password
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>


        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
        <nav className="admin-nav">
          <div className="temp-upper-options">
            <div className="nd-menu">
              <FaAlignLeft className="icn menuicn" onClick={toggleNav} />
              <div className="nd-user">Admin: {profile.displayName }</div>
                <img
                  src={
                    profile.pandit_image
                      ? `https://mahadevaaya.com/backend/media/pandit_images/${profile.pandit_image.split("/").pop()}`
                      : "https://mahadevaaya.com/backend/media/pandit_images/default.png"
                  }
                  alt={profile.displayName || ""}
                  className="nav-profile-photo"
                />
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
                  <Dropdown.Item as={Link} to="/PanditProfile">
                    My Profile
                  </Dropdown.Item>
                   <Dropdown.Item as={Link} to="/PanditChangePassword">
                    My Profile
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
                    className={`admin-option option${index + 1} ${activePath === option.fileUrl ? "active-nav-admin" : ""
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
                      className={`admin-option option${index + 1} ${activePath === option.path || openSubMenu === index ? "active-nav-admin" : ""
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
                    <div className={`admin-sub-menu ${openSubMenu === index ? 'open' : ''}`}>
                      {option.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`admin-option sub-admin-option ${activePath === subItem.path ? "active-nav-admin" : ""
                            }`}
                          onClick={() => setActivePath(subItem.path)}
                        >
                          <div className="sub-item-label d-flex">
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
                    className={`admin-option option${index + 1} ${activePath === option.path ? "active-nav-admin" : ""}
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

export default AdminLeftnav;
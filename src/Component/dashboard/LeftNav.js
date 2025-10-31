import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiCalendarEventLine, RiDashboard3Line } from "react-icons/ri";
import axios from "axios";
import { FaAlignLeft, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import CompanyLogo from "../../assets/images/company-logo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import "../../assets/CSS/LeftNav.css";
import ModifyAlert from "../Alert/ModifyAlert";
import { GiByzantinTemple } from "react-icons/gi";
import { LiaCalendarCheck } from "react-icons/lia";
import { FaRegFileLines } from "react-icons/fa6";

import { Dropdown, Nav } from "react-bootstrap";
import { useAuth } from "../GlobleAuth/AuthContext";
import "../../assets/CSS/TopInfo.css";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdAccountCircle, MdEventAvailable, MdOutlineWorkHistory } from "react-icons/md";
 
function LeftNav() {
  const { clearAuth } = useAuth();

  const [isNavClosed, setIsNavClosed] = useState(false);
  const [userName,] = useState("Loading...");
  const [activePath, setActivePath] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState(null); 
  const [hoveredMenu, setHoveredMenu] = useState(null); 
  
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
    devotee_photo: "",
  });
  const [, setLoading] = useState(false);

  const { uniqueId } = useAuth(); // if you have AuthContext
 useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userId = uniqueId;
      const response = await axios.get(
        `https://mahadevaaya.com/backend/api/get-user/?user_id=${userId}`
      );
      if (response.data) {
        const user = response.data;
        setProfile({
          displayName: user.devotee_name || "",
          devotee_photo: user.devotee_photo || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();

  // Listen for live updates from MyProfile
  const handleProfileUpdate = (event) => {
    const updated = event.detail;
    if (updated) {
      setProfile((prev) => ({
        ...prev,
        displayName: updated.displayName || prev.displayName,
        devotee_photo: updated.devotee_photo || prev.devotee_photo,
      }));
    }
  };

  window.addEventListener("profileUpdated", handleProfileUpdate);

  return () => {
    window.removeEventListener("profileUpdated", handleProfileUpdate);
  };
}, [uniqueId]);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userId = uniqueId;
      const response = await axios.get(
        `https://mahadevaaya.com/backend/api/get-user/?user_id=${userId}`
      );

      if (response.data) {
        const user = response.data;
        setProfile({
          displayName: user.devotee_name || "",
          devotee_photo: user.devotee_photo
            ? `https://mahadevaaya.com/backend/media/devotee_photos/${user.devotee_photo
                .split("/")
                .pop()}?v=${Date.now()}`
            : "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();

  //  Listen for live updates from MyProfile
  const handleProfileUpdate = (event) => {
    const updated = event.detail;
    if (updated) {
      setProfile((prev) => ({
        ...prev,
        displayName: updated.displayName || prev.displayName,
        devotee_photo: updated.devotee_photo
          ? `https://mahadevaaya.com/backend/media/devotee_photos/${updated.devotee_photo
              .split("/")
              .pop()}?v=${Date.now()}` // 👈 forces new image fetch immediately
          : prev.devotee_photo,
      }));
    }
  };

  window.addEventListener("profileUpdated", handleProfileUpdate);
  return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
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
    { icon: <RiDashboard3Line />, label: "Dashboard", path: "/MainDashBoard" },
    // { icon: <BiDonateHeart />, label: "Online", path: "#" },

    {
      icon: <MdOutlineWorkHistory />,
      label: "Booking History",
      path: "/BookingHistory",

    },
    {
      icon: <BiSolidDonateBlood />,
      label: "Donate",
      path: "/DonateDashBoard",

    },
    {
      icon: <GiByzantinTemple />,
      label: "Darshan & Puja Booking",
      path: "/MandirBookingInfoDashBoard",

    },

    {
      icon: <LiaCalendarCheck />,
      label: "Puja & Seva",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
          icon: <LiaCalendarCheck />,
          label: "Seva Registration",
          path: "/SevaRegistrationDashBoard"
        },
        {
          icon: <LiaCalendarCheck />,
          label: "Event Participation",
          path: "/EventDashBoard"
        },

      ]
    },
    {
      icon: <GiByzantinTemple />,
      label: "Pandit Booking",
      path: "/PoojaBookingDashBoard",

    },
    {
      icon: <MdEventAvailable />,
      label: "Event",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
          icon: <RiCalendarEventLine />,
          label: "Upcoming Event",
          path: "/UserUpcomingEvent"
        },

      ]
    },
    {
      icon: <MdAccountCircle />,
      label: "My Account",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
          icon: <LiaCalendarCheck />,
          label: "My Profile",
          path: "/MyProfile"
        },

      ]
    },

    {
      path: "/UserSupport",
      icon: <FaRegFileLines />,
      label: "Support",

    },

    // {
    //   icon: <LiaCalendarCheck />,
    //   label: "Overview",
    //   path: "#",
    //   hasSubmenu: true,
    //   subItems: [
    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "About Us",
    //       path: "/AboutDashBoard"
    //     },

    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "Platform Info",
    //       path: "/PlatformInfoDashBoard"
    //     },

    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "Mission & Vision",
    //       path: "/MissionDashBoard"
    //     },

    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "Mandir Platform",
    //       path: "/MandirPlatformDashBoard"
    //     },
    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "Special announcement",
    //       path: "/SpecialAnnouncementDashBoard"
    //     },

    //   ]
    // },
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
            <div className="nd-msg">{profile.displayName || "User"}</div>
            <Dropdown align="end" className="user-dp">
              <Dropdown.Toggle
                variant=""
                id="user-dropdown"
                className="border-0 bg-transparent"
                title="Account Menu"
              >
                <img
  key={profile.devotee_photo} // 👈 ensures React re-renders image
  src={
    profile.devotee_photo
      ? profile.devotee_photo
      : "https://mahadevaaya.com/backend/media/devotee_photos/default.png"
  }
  
  className="nav-profile-photo"
/>

              </Dropdown.Toggle>

              {/* Dropdown menu */}
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/MyProfile">
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/ChangePassword">
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
        <nav className="nav">
          <div className="nav-upper-options">
            <div className="nd-menu">
              <FaAlignLeft className="icn menuicn" onClick={toggleNav} />
              <div className="nd-user">{profile.displayName || "User"}</div>
              
              <Dropdown align="end" className="user-dp">
                <Dropdown.Toggle
                  variant=""
                  id="user-dropdown"
                  className="border-0 bg-transparent"
                  title="Account Menu"
                >
                <img
  src={
    profile.devotee_photo
      ? profile.devotee_photo.includes("http")
        ? profile.devotee_photo
        : `https://mahadevaaya.com/backend/media/devotee_photos/${profile.devotee_photo
            .split("/")
            .pop()}?t=${Date.now()}`
      : "https://mahadevaaya.com/backend/media/devotee_photos/default.png"
  }
  alt={profile.displayName || "Devotee"}
  className="nav-profile-photo"
/>
                </Dropdown.Toggle>

                {/* Dropdown menu */}
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/MyProfile">
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
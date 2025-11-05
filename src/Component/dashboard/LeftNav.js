import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiCalendarEventLine, RiDashboard3Line } from "react-icons/ri";
import axios from "axios";
import { FaAlignLeft, FaChevronDown, FaChevronUp, FaRegCalendarCheck } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import CompanyLogo from "../../assets/images/company-logo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import "../../assets/CSS/LeftNav.css";
import ModifyAlert from "../Alert/ModifyAlert";
import PoojaSeva from "../../../src/assets/images/Puja-Seva.png"
import PanditBooking from ".././../assets/images/pandit.png"
import { LiaCalendarCheck } from "react-icons/lia";
import Support from "../../assets/images/support.png"
import { GrDocumentTime } from "react-icons/gr";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "../GlobleAuth/AuthContext";
import "../../assets/CSS/TopInfo.css";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdAccountCircle, MdEventAvailable } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa6";

function LeftNav() {
  const { clearAuth } = useAuth();
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [userName,] = useState("Loading...");
  const [activePath, setActivePath] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    displayName: "",
    devotee_photo: "",
  });
  const [, setLoading] = useState(false);
  const { uniqueId } = useAuth();
  const [imageVersion, setImageVersion] = useState(Date.now());

  // Combined useEffect for profile fetching and event listening
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
                .pop()}?v=${imageVersion}`
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

    const handleProfileUpdate = (event) => {
      const updated = event.detail;
      if (updated) {
        setImageVersion(Date.now()); // Force image refresh
        setProfile((prev) => ({
          ...prev,
          displayName: updated.displayName || prev.displayName,
          devotee_photo: updated.devotee_photo || prev.devotee_photo,
        }));
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, [uniqueId, imageVersion]);

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
    {
      icon: <GrDocumentTime />,
      label: "Booking History",
      path: "/BookingHistory",
    },
    {
      icon: <BiSolidDonateBlood />,
      label: "Donate",
      path: "/DonateDashBoard",
    },
    {
      icon: <FaRegCalendarCheck />,
      label: "Darshan & Puja Booking",
      path: "/MandirBookingInfoDashBoard",
    },
    {
      icon: <img src={PoojaSeva} alt="Puja & Seva" className="left-nav-icon" />,
      label: "Puja & Seva",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
          icon: <IoDocumentTextOutline />,
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
      icon: <img src={PanditBooking} alt="Pandit booking" className="left-nav-icon" />,
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
          icon: <FaUserLock />,
          label: "My Profile",
          path: "/MyProfile"
        },
        {
          icon: <FaUserLock />,
          label: "Change Password",
          path: "/ChangePassword"
        },
 
      ]
    },
    {
      path: "/UserSupport",
      icon: <img src={Support} alt="Support" className="left-nav-icon" />,
      label: "Support",
    },
    {
      icon: <LuLogOut />,
      label: "Logout",
      path: "#",
      isLogout: true,
    },
  ];

  return (
    <>
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
                  key={`${profile.devotee_photo}-${imageVersion}`} // Force re-render
                  src={
                    profile.devotee_photo
                      ? profile.devotee_photo
                      : "https://mahadevaaya.com/backend/media/devotee_photos/default.png"
                  }
                  className="nav-profile-photo"
                />
              </Dropdown.Toggle>

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
                    key={`${profile.devotee_photo}-${imageVersion}`} // Force re-render
                    src={
                      profile.devotee_photo
                        ? profile.devotee_photo
                        : "https://mahadevaaya.com/backend/media/devotee_photos/default.png"
                    }
                    alt={profile.displayName || ""}
                    className="nav-profile-photo"
                  />
                </Dropdown.Toggle>

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
                        logout();
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
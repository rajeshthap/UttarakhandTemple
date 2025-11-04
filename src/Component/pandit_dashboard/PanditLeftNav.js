import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import axios from "axios";
import {
  FaAlignLeft,
  FaChevronDown,
  FaChevronUp,
  FaRegCheckCircle,
} from "react-icons/fa";
import { LuCalendarClock, LuCircleCheck, LuLogOut } from "react-icons/lu";
import CompanyLogo from "../../assets/images/company-logo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import "../../assets/CSS/PanditLeftNav.css";
import ModifyAlert from "../Alert/ModifyAlert";
import { GiByzantinTemple } from "react-icons/gi";
import { LiaCalendarCheck } from "react-icons/lia";
import { IoCalendarSharp, IoCloseCircleOutline } from "react-icons/io5";
import { Dropdown, Nav } from "react-bootstrap";
import { ImProfile } from "react-icons/im";
import { useAuth } from "../GlobleAuth/AuthContext";
import Support from "../../assets/images/support.png";
import {
  MdAccountCircle,
  MdEventAvailable,
  MdPendingActions,
  MdReviews,
} from "react-icons/md";
import { FaRegFileLines, FaUserLock } from "react-icons/fa6";
import ManagePuja from "../../assets/images/Manage-Pujas.png";
import Completed from "../../assets/images/completed-puja.png";
import AddPuja from "../../assets/images/add-puja.png";
import Transactions from "../../assets/images/Transactions.png";
import "../../assets/CSS/TopInfo.css";
function PanditLeftNav() {
  const { clearAuth } = useAuth();
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [userName] = useState("Loading...");
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

  // Helper to safely compute the pandit image URL from different shapes
  const getNavImageUrl = (img) => {
    const defaultUrl =
      "https://mahadevaaya.com/backend/media/pandit_images/default.png";
    if (!img) return defaultUrl;
    if (typeof img === "string") {
      try {
        const filename = img.split("/").pop();
        return `https://mahadevaaya.com/backend/media/pandit_images/${filename}`;
      } catch (e) {
        return defaultUrl;
      }
    }
    if (typeof img === "object") {
      if (img.url && typeof img.url === "string") return img.url;
      if (img.path && typeof img.path === "string") {
        const filename = img.path.split("/").pop();
        return `https://mahadevaaya.com/backend/media/pandit_images/${filename}`;
      }
      if (img.name && typeof img.name === "string")
        return `https://mahadevaaya.com/backend/media/pandit_images/${img.name}`;
    }
    return defaultUrl;
  };

  const { uniqueId } = useAuth(); // if you have AuthContext
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = uniqueId;
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

  // Listen to profile updates dispatched from PanditProfile so nav updates immediately
  useEffect(() => {
    const handler = (e) => {
      const data = (e && e.detail) || {};
      setProfile((p) => ({
        displayName: data.displayName || data.first_name || p.displayName,
        // PanditProfile sends back various keys; check common ones
        pandit_image:
          data.pandit_image ||
          data.pandit_photo ||
          data.devotee_photo ||
          p.pandit_image,
      }));
    };
    window.addEventListener("profileUpdated", handler);
    return () => window.removeEventListener("profileUpdated", handler);
  }, []);

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
    {
      icon: <RiDashboard3Line />,
      label: "Dashboard",
      path: "/Pandit_DashBoard",
    },

    // { icon: <BiDonateHeart />, label: "Online", path: "#" },

    {
      icon: <img src={ManagePuja} alt="Support" className="left-nav-icon" />,
      label: "Manage Pujas",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
          icon: <img src={AddPuja} alt="Support" className="left-nav-icon" />,
          label: "Add New Puja ",
          path: "/AddPuja",
        },
        {
          icon: (
            <img
              src={Completed}
              alt="Completed Pujas"
              className="left-nav-icon"
            />
          ),
          label: "Completed Pujas",
          path: "/CompletedPuja",
        },
      ],
    },

    {
      icon: <LuCalendarClock />,
      label: "Booking Requests",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
          icon: <MdPendingActions />,
          label: "Pending ",
          path: "/PendingRequests",
        },
        {
          icon: <LuCircleCheck />,
          label: "Confirmed",
          path: "/ConfirmedRequests",
        },
        {
          icon: <IoCloseCircleOutline />,
          label: "Cancelled",
          path: "/CancelledRequests",
        },
      ],
    },

    {
      icon: <IoCalendarSharp />,
      label: "Puja Calendar",
      path: "/PujaCalendar",
    },
    {
      icon: <img src={Transactions} alt="Support" className="left-nav-icon" />,
      label: "Earnings & Transactions",
      path: "/EarnAndTrans",
    },

    {
      icon: <FaRegFileLines />,
      label: "Reports & Analytics",
      path: "/ReportAnalytics",
    },
    {
      icon: <MdReviews />,
      label: "Reviews & Feedback",
      path: "/ReviewsFeedback",
    },

    {
      icon: <MdAccountCircle />,
      label: "My Account",
      path: "#",
      hasSubmenu: true,
      subItems: [
        {
          icon: <ImProfile />,
          label: "My Profile",
          path: "/PanditProfile",
        },
        {
          icon: <FaUserLock />,
          label: "Change Password",
          path: "/PanditChangePassword",
        },
      ],
    },

    {
      path: "/PanditSupport",
      icon: <img src={Support} alt="Support" className="left-nav-icon" />,
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
    //       path: "/PanditAboutUs"
    //     },

    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "Platform Info",
    //       path: "/PanditPlatformInfo"
    //     },

    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "Mission & Vision",
    //       path: "/PanditMissionVision"
    //     },
    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "Mandir Platform",
    //       path: "/PanditMandirMahadevaya"
    //     },
    //     {
    //       icon: <LiaCalendarCheck />,
    //       label: "Special announcement",
    //       path: "/PanditPlatformInfo"
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
            <img
              src={CompanyLogo}
              alt="Manadavaaya"
              title="MAHADAVAAYA"
              className="logo"
            />
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
                className="border-0 bg-transparent logout-toggle"
                title="Account Menu"
              >
                <img
                  src={getNavImageUrl(profile.pandit_image)}
                  alt={profile.displayName || ""}
                  className="nav-profile-photo"
                />
              </Dropdown.Toggle>

              {/* Dropdown menu */}
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/PanditProfile">
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/PanditChangePassword">
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
        <nav className="pandit-nav">
          <div className="nav-upper-options">
            <div className="nd-menu">
              <FaAlignLeft className="icn menuicn" onClick={toggleNav} />
              <div className="nd-user">User: {profile.displayName}</div>
              <img
                src={getNavImageUrl(profile.pandit_image)}
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
                  <LuLogOut />
                </Dropdown.Toggle>

                {/* Dropdown menu */}
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/PanditProfile">
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/PanditChangePassword">
                    Change Password
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
                    className={`pandit-option option${index + 1} ${
                      activePath === option.fileUrl ? "active-nav" : ""
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
                      className={`pandit-option option${index + 1} ${
                        activePath === option.path || openSubMenu === index
                          ? "active-nav"
                          : ""
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
                          {openSubMenu === index ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`pandit-sub-menu ${
                        openSubMenu === index ? "open" : ""
                      }`}
                    >
                      {option.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`pandit-option sub-pandit-option ${
                            activePath === subItem.path ? "active-nav" : ""
                          }`}
                          onClick={() => setActivePath(subItem.path)}
                        >
                          <div className="sub-item-label d-flex">
                            <span className="nav-icon">{subItem.icon}</span>
                            <span className="sub-label">{subItem.label}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={option.path}
                    className={`pandit-option option${index + 1} ${
                      activePath === option.path ? "active-nav" : ""
                    }
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

export default PanditLeftNav;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineFormatAlignRight,
  MdLibraryBooks,
} from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import { FaRegFileAlt, FaChalkboardTeacher, FaAlignLeft } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import UKLogon from "../../assets/images/UKLogo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import "../../assets/CSS/LeftNav.css";

function LeftNav() {
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [userName, setUserName] = useState("Loading...");
  const [activePath, setActivePath] = useState("");
  const location = useLocation();

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
      alert(`Logout successful!`);
      window.location.href = "/UserLogin"; // Redirect after logout
    }
  };

  const navigationOptions = [
    { icon: <RiDashboard3Line />, label: "Dashboard", path: "/UserDashboard" },
    { icon: <MdOutlinePublishedWithChanges />, label: "Change Password", path: "/Change" },
    { icon: <FaRegFileAlt />, label: "Request Query", path: "/SubmitRequest" },
    { icon: <MdOutlineFormatAlignRight />, label: "Form Status", path: "/FormStatus" },
    {
      icon: <ImFilePdf />,
      label: "नंदा गौरा योजना शासनादेश",
      download: true,
      fileUrl: "/praroop1_tutorial.pdf",
      fileName: "praroop1_tutorial.pdf",
    },
    {
      icon: <MdLibraryBooks />,
      label: "Girl Child Form Tutorial",
      download: true,
      fileUrl: "/shashandesh_new.pdf",
      fileName: "shashandesh_new.pdf",
    },
    {
      icon: <FaChalkboardTeacher />,
      label: "12th Form Tutorial",
      download: true,
      fileUrl: "/praroop2_tutorial.pdf",
      fileName: "praroop2_tutorial.pdf",
    },
    { icon: <FaRegFileAlt />, label: "Contact Us", path: "/DepartmentContact" },
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
            <img src={UKLogon} alt="logo" className="logo" />
          </Link>
          <div className="nd-title">
            <span className="nd-subtitle">उत्तराखंड सरकार | Gov.t of Uttarakhand</span>
            <span className="subtitle">
              महिला सशक्तिकरण एवं बाल विकास विभाग उत्तराखंड
            </span>
          </div>
        </div>

        <div className="message">
          <div className="nd-msg">User: {userName}</div>
          <div className="dp" title="Click to logout" onClick={logout}>
            <div className="nd-log-icon">
              <LuLogOut />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className={`navcontainer ${isNavClosed ? "navclose" : ""}`}>
        <nav className="nav">
          <div className="nav-upper-options">
            <div className="nd-menu">
              <FaAlignLeft className="icn menuicn" onClick={toggleNav} />
              <div className="nd-user">User: {userName}</div>
              <div className="nd-log-icon-mob" title="Logout" onClick={logout}>
                <LuLogOut />
              </div>
            </div>

            {navigationOptions.map((option, index) => (
              <React.Fragment key={index}>
                {option.download ? (
                  <div
                    className={`nav-option option${index + 1} ${
                      activePath === option.fileUrl ? "active-nav" : ""
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
                    className={`nav-option option${index + 1} ${
                      activePath === option.path ? "active-nav" : ""
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

export default LeftNav;

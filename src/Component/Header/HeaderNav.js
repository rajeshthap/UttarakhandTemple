import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Image, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserAlt, FaEdit } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import CompanyLogo from "../../assets/images/company-logo.png";
import MenuIcon from "../../assets/images/menu_icon.png";
import ModifyAlert from "../Alert/ModifyAlert";
import "../../assets/CSS/PanditProfile.css";
import "../../assets/CSS/PanditLeftNav.css";

const HeaderNav = ({ userName, logout, alertMessage, showModifyAlert, setShowModifyAlert }) => {
  return (
    <header className="user-nd-header d-flex justify-content-between align-items-center px-3">
      {/* Left: Logo */}
      <div className="logosec d-flex align-items-center">
        <Link to="/" className="logo-page">
          <img
            src={CompanyLogo}
            alt="Mandavaaya"
            title="MAHADAVAAYA"
            className="logo"
          />
        </Link>
      </div>

      {/* Right: User section */}
      <div className="message d-flex align-items-center">
        {/* Alert component */}
        <ModifyAlert
          message={alertMessage}
          show={showModifyAlert}
          setShow={setShowModifyAlert}
        />

        {/* Display Username */}
        <div className="nd-msg me-3">
          User: <strong>{userName || "Guest"}</strong>
        </div>

        {/* Dropdown menu */}
        <Dropdown align="end" className="pandit-dp">
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

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/PanditProfile">
              My Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/TempleDashBoard">
              Dashboard
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout} className="text-danger">
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default HeaderNav;

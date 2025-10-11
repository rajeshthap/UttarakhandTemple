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

const TempleProfile = () => {
 
  const [navOpen, setNavOpen] = useState(false);
  const [showModifyAlert, setShowModifyAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userName] = useState("Pandit Rajesh");

  const logout = () => {
    localStorage.clear();
    setAlertMessage("You have been logged out successfully.");
    setShowModifyAlert(true);
    setTimeout(() => {
      window.location.href = "/Login";
    }, 1200);
  };

  return (
    <>
       <header className="user-nd-header d-flex justify-content-between align-items-center px-3">
        <div className="logosec d-flex align-items-center">
         
          <Link to="#" className="logo-page">
            <img
              src={CompanyLogo}
              alt="Mandavaaya"
              title="MAHADAVAAYA"
              className="logo"
            />
          </Link>
        </div>
        <div className="message d-flex align-items-center">
          <ModifyAlert
            message={alertMessage}
            show={showModifyAlert}
            setShow={setShowModifyAlert}
          />

          <div className="nd-msg me-3">User: {userName}</div>

          {/* Dropdown */}
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
              <Dropdown.Item as={Link} to="/Pandit_DashBoard">
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
      
    <div className="pandit-profile-page py-5">
      {/* Header Section */}
   

      {/* Profile Section */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={12} md={12} sm={12}>
            <Card className="shadow pandit-profile-card">
              <Card.Body>
                <Row>
                  {/* Left: Profile Image */}
                  <Col md={4} className="text-center border-end">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/4128/4128349.png"
                      roundedCircle
                      className="profile-avatar mb-3"
                    />
                    <h4 className="pandit-name">Pandit Ram Sharma</h4>
                    <p className="pandit-role">Temple Priest</p>
                    <Button variant="warning" className="mt-2 edit-btn">
                      <FaEdit className="me-2" /> Edit Profile
                    </Button>
                  </Col>

                  {/* Right: Info Section */}
                  <Col md={8}>
                    <h5 className="mb-3 text-center text-md-start">
                      Personal Information
                    </h5>
                    <hr />
                    <Row>
                      <Col sm={6} className="mb-3">
                        <p className="info-label">
                          <FaUserAlt className="me-2 text-warning" /> Full Name
                        </p>
                        <p className="info-value">Rajesh Sharma</p>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <p className="info-label">
                          <FaPhoneAlt className="me-2 text-warning" /> Phone
                        </p>
                        <p className="info-value">+91 9876543210</p>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <p className="info-label">
                          <FaEnvelope className="me-2 text-warning" /> Email
                        </p>
                        <p className="info-value">rajesh.pandit@example.com</p>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <p className="info-label">
                          <FaMapMarkerAlt className="me-2 text-warning" /> Location
                        </p>
                        <p className="info-value">Varanasi, Uttar Pradesh</p>
                      </Col>
                    </Row>

                    <h5 className="mt-4 mb-3 text-center text-md-start">
                      Experience & Bio
                    </h5>
                    <hr />
                    <p className="bio-text">
                      Experienced temple priest with over 15 years of expertise in
                      conducting traditional Hindu rituals, havans, and pujas. Known
                      for dedication, spiritual guidance, and deep Vedic knowledge.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
};

export default TempleProfile;

import React from "react";
import { Col, Row } from "react-bootstrap";
import "../../assets/CSS/TopInfo.css"; // Importing the CSS file for styling
import Dropdown from "react-bootstrap/Dropdown";
import { IoKeySharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

const InfoBar = () => {
  return (
    <>
      <div className="header-top container-fluid">
        <Row className="align-items-center">
          {/* Left Side */}
          <Col
            xs={12}
            md={6}
            lg={6}
            className="text-center info-mob text-md-start d-flex flex-wrap align-items-center"
          >
            <div className="px-3">
              <i className="bi bi-telephone-fill infoicon"></i> +91 8193991148
            </div>
            <div className="px-3">
              <i className="bi bi-envelope-fill infoicon"></i> admin@mahadevaaya.com
            </div>
          </Col>

          {/* Right Side */}
          <Col xs={12} md={6} lg={6} className="text-center text-md-end">
            <div className="d-inline-flex align-items-center flex-wrap justify-content-center">
              <Dropdown className="px-2">
                <Dropdown.Toggle
                  variant=""
                  className="login-btn"
                  id="login-dropdown"
                >
                  <span className="top-icon">
                    <IoKeySharp />
                  </span>{" "}
                  Login
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                  <Dropdown.Item href="/AuthorityLogin">
                    Temple Authority
                  </Dropdown.Item>
                  <Dropdown.Item href="/PanditLogin">Pandit ji </Dropdown.Item>
                  <Dropdown.Item href="/DevoteeLogin">Devotee</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="px-2">
                <Dropdown.Toggle
                  variant=""
                  className="register-btn"
                  id="register-dropdown"
                >
                  <span className="top-icon">
                    <FaUserGroup />
                  </span>{" "}
                  Register
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/TempleAuthority">
                    Temple Authority
                  </Dropdown.Item>
                  <Dropdown.Item href="/PanditRegistration">Pandit ji </Dropdown.Item>
                  <Dropdown.Item href="/DevoteeRegistration">Devotee</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div className="px-3 d-flex gap-2 social-icon">
                <i className="bi bi-facebook infoicon"></i>
                <i className="bi bi-twitter infoicon"></i>
                <i className="bi bi-instagram infoicon"></i>
                <i className="bi bi-linkedin infoicon"></i>
                <i className="bi bi-youtube infoicon"></i>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default InfoBar;

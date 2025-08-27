import React from 'react'
import { Col, Row } from 'react-bootstrap'
import "../../assets/CSS/TopInfo.css"; // Importing the CSS file for styling
import Dropdown from 'react-bootstrap/Dropdown';
import { IoKeySharp } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";

const InfoBar = () => {
    return (
        <>
            <div className="header-top container-fluid">
                <Row className="align-items-center">
                    {/* Left Side */}
                    <Col xs={12} md={6} lg={6} className="text-center info-mob text-md-start d-flex flex-wrap align-items-center">
                        <div className="px-3">
                            <i className="bi bi-telephone-fill infoicon"></i> +91 1234567890
                        </div>
                        <div className="px-3">
                            <i className="bi bi-envelope-fill infoicon"></i> info@gmail.com
                        </div>
                    </Col>

                    {/* Right Side */}
                    <Col xs={12} md={6} lg={6} className="text-center text-md-end">
                        <div className="d-inline-flex align-items-center flex-wrap justify-content-center">
                            <Dropdown className="px-2">
                                <Dropdown.Toggle variant="" className="login-btn" id="login-dropdown">
                                    <span className="top-icon"><IoKeySharp /></span> Login
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown className="px-2">
                                <Dropdown.Toggle variant="" className="register-btn" id="register-dropdown">
                                    <span className="top-icon"><FaUserGroup /></span> Register
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
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
    )
}

export default InfoBar

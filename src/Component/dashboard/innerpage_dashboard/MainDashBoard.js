import React from "react";
import "../../../assets/CSS/LeftNav.css";
import "../../../assets/CSS/DashBoard.css";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import LeftNav from "../LeftNav";
import { FaHandsPraying } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MainDashBoard = () => {
    return (
        <>
            {/* Main Wrapper */}
            <div className="dashboard-wrapper">
                {/* Sidebar */}
                <aside className="sidebar">
                    <LeftNav />
                </aside>

                {/* Right-hand Main Container */}
                <main className="main-container">
                    <div className="content-box">

                        <h1>Dashboard Content</h1>
                        <Row>
                            <h2>Online Services</h2>
                            <Col lg={3} md={3} sm={12}>

                                <Card className="shadow-sm mb-3 bg-body rounded temp-card-bg">
                                    <Card.Body>
                                        <Card.Title className="temp-dash-icon"><FaHandsPraying /></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Book Puja</Card.Subtitle>
                                        {/* <Card.Text>

                                        </Card.Text> */}

                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col lg={3} md={3} sm={12}>

                                <Card className="shadow-sm mb-3 bg-body rounded temp-card-bg">
                                    <Card.Body>
                                        <Card.Title className="temp-dash-icon"><FaHandsPraying /></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Book Puja</Card.Subtitle>
                                        {/* <Card.Text>

                                        </Card.Text> */}

                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col lg={3} md={3} sm={12}>

                                <Card className="shadow-sm mb-3 bg-body rounded temp-card-bg">
                                    <Card.Body>
                                        <Card.Title className="temp-dash-icon"><FaHandsPraying /></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Book Puja</Card.Subtitle>
                                        {/* <Card.Text>

                                        </Card.Text> */}

                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col lg={3} md={3} sm={12}>

                                <Card className="shadow-sm mb-3 bg-body rounded temp-card-bg">
                                    <Card.Body>
                                        <Card.Title className="temp-dash-icon"><FaHandsPraying /></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Book Puja</Card.Subtitle>
                                        {/* <Card.Text>

                                        </Card.Text> */}

                                    </Card.Body>
                                </Card>

                            </Col>


                        </Row>

                    </div>
                </main>
            </div>
        </>
    );
};

export default MainDashBoard;

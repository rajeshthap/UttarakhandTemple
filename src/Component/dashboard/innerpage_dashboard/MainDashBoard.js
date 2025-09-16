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
                                        <Card.Subtitle className="mb-2 text-muted">Donate to Temples</Card.Subtitle>
                                        {/* <Card.Text>

                                        </Card.Text> */}

                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col lg={3} md={3} sm={12}>

                                <Card className="shadow-sm mb-3 bg-body rounded temp-card-bg">
                                    <Card.Body>
                                        <Card.Title className="temp-dash-icon"><FaHandsPraying /></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Darshan Booking</Card.Subtitle>
                                        {/* <Card.Text>

                                        </Card.Text> */}

                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col lg={3} md={3} sm={12}>

                                <Card className="shadow-sm mb-3 bg-body rounded temp-card-bg">
                                    <Card.Body>
                                        <Card.Title className="temp-dash-icon"><FaHandsPraying /></Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Pooja Booking</Card.Subtitle>
                                        {/* <Card.Text>

                                        </Card.Text> */}

                                    </Card.Body>
                                </Card>

                            </Col>


                        </Row>
                        <Row>

                            <div class="row">
                                <div class="col-md-12">
                                    <table class="table">
                                        <tr class="table-header">
                                            <th class="cell">S.no</th>
                                            <th class="cell">Name</th>
                                            <th class="cell">Username</th>
                                            <th class="cell">Address</th>
                                            <th class="cell">Email Id</th>
                                            <th class="cell">Phone No.</th>
                                        </tr>
                                        <tr class="active">
                                            <td>1</td>
                                            <td>Smith</td>
                                            <td>Smith Mark</td>
                                            <td>#67/B Maxico Usa</td>
                                            <td>mark@gmail.com</td>
                                            <td>+3755438764</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Smith Mark</td>
                                            <td>Smith</td>
                                            <td>#67/A England</td>
                                            <td>marksmith@gmail.com</td>
                                            <td>+376768764</td>
                                        </tr>
                                        <tr class="active">
                                            <td>3</td>
                                            <td>Willson</td>
                                            <td>Will</td>
                                            <td>#3657/34 India New Delhi</td>
                                            <td>will34@gmail.com</td>
                                            <td>+372385694</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Jacob</td>
                                            <td>Jacob Thornton</td>
                                            <td>#67/B Maxico Usa</td>
                                            <td>Jacob@gmail.com</td>
                                            <td>+3755438764</td>
                                        </tr>
                                        <tr class="active">
                                            <td>5</td>
                                            <td>Larry</td>
                                            <td>Larry  Bird</td>
                                            <td>#67/B  USA</td>
                                            <td>BirdLarry@gmail.com</td>
                                            <td>+6675438764</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </Row>
                    </div>
                </main>
            </div>
        </>
    );
};

export default MainDashBoard;

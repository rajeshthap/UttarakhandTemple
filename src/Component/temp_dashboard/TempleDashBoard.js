import React, { useEffect } from "react";
import "../../assets/CSS/TempleLeftNav.css";
import "../../assets/CSS/DashBoard.css";
import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';



import PanditImg from "../../assets/images/pandit-img.png"

import { FaHandsPraying } from "react-icons/fa6";
import { Link, } from "react-router-dom";
import TempleLeftNav from "./TempleLeftNav";
import "../../assets/CSS/Temple_DashBoard.css"
import { FaOm } from "react-icons/fa";
import { GiByzantinTemple } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi";
import { MdEventAvailable } from "react-icons/md";
import { RiFilePaper2Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import NewsUpdates from "../dashboard/AboutUsDashBoard/NewsUpdate";
import { useNavigate } from "react-router-dom";



const TempleDashBoard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Push the current page into history so user can't go back
        window.history.pushState(null, "", window.location.href);

        const handlePopState = () => {
            window.history.pushState(null, "", window.location.href);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);
    return (
        <>
            {/* Main Wrapper */}
            <div className="dashboard-wrapper">
                {/* Sidebar */}
                <aside className="temp-sidebar">
                    <TempleLeftNav />
                </aside>

                {/* Right-hand Main Container */}
                <main className="main-container">
                    <div className="content-box">

                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 "> <h1 className=" fw500">
                            <span class="fw700h1">Temple </span> Dashboard
                        </h1>  <div >
                                <div className="d-flex justify-content-center h-100">
                                    <div className="search">

                                        <input
                                            className="search_input"
                                            type="text"
                                            value=""

                                            placeholder="Search here..."
                                        />
                                        <button type="submit" className="search_icon">
                                            <i className="fa fa-search"></i>
                                        </button>

                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* <div>
              <h1>Main Dashboard</h1>
              <p>Unique ID: {uniqueId}</p>{" "}
            </div> */}
                        <Row>
                            <Col lg={3} md={3} sm={12}>
                                <Card className="shadow-sm  rounded  dbcard-box-1 flex-fill mb-2" onClick={() => navigate("/NewBooking")}>
                                    <Card.Body>

                                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                                            <div>
                                                <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">  New Darshan Booking</span> <h4 className="fw-medium mb-0">01</h4>
                                                <div><span className="user-span">View Details</span></div>
                                            </div>




                                            <div className="lh-1">
                                                <div className=" avatar-md avatar-rounded save-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                                                    <FaOm className=" " /> </div>
                                            </div></div>









                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={3} md={3} sm={12}>
                                <Card className="shadow-sm dbcard-box-2 flex-fill" onClick={() => navigate("/AcceptedBooking")}>
                                    <Card.Body>
                                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                                            <div>
                                                <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">    Accepted Darshan Booking</span> <h4 className="fw-medium mb-0">02</h4>
                                                <div><span className="user-span">View Details</span></div>
                                            </div>
                                            <div className="lh-1">
                                                <div className=" avatar-md avatar-rounded Darshan-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                                                    <GiByzantinTemple /> </div>
                                            </div></div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={3} md={3} sm={12}>
                                <Card className="shadow-sm rounded  flex-fill dbcard-box-4" onClick={() => navigate("/RejectedBooking")}>
                                    <Card.Body>
                                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                                            <div>
                                                <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">      Reject Darshan Booking</span> <h4 className="fw-medium mb-0">03</h4>
                                                <div><span className="user-span">View Details</span></div>
                                            </div>
                                            <div className="lh-1">
                                                <div className=" avatar-md avatar-rounded pandit-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                                                    <img
                                                        src={PanditImg}
                                                        alt="Pandit"
                                                        className=" img-fluid"
                                                    /> </div>
                                            </div></div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={3} md={3} sm={12}>
                                <Card className="shadow-sm rounded  flex-fill dbcard-box-3" onClick={() => navigate("/Donations")}>
                                    <Card.Body>
                                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                                            <div>
                                                <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">      Total Donation</span> <h4 className="fw-medium mb-0">05</h4>
                                                <div><span className="user-span">View Details</span></div>
                                            </div>

                                            <div className="lh-1">
                                                <div className=" avatar-md avatar-rounded Donations-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                                                    <BiSolidDonateBlood /> </div>
                                            </div></div>

                                    </Card.Body>
                                </Card>
                            </Col>




                            <Col lg={3} md={3} sm={12}>
                                <Card className="shadow-sm rounded  flex-fill dbcard-box-5" onClick={() => navigate("/ManageTemple")}>
                                    <Card.Body>
                                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                                            <div>
                                                <span className="text-muted d-block mb-1 text-nowrap  user-sub-title"> Total Temple</span> <h4 className="fw-medium mb-0">06</h4>
                                                <div><span className="user-span">View Details</span></div>
                                            </div>

                                            <div className="lh-1">
                                                <div className=" avatar-md avatar-rounded totaltemp-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                                                    <BiSolidDonateBlood /> </div>
                                            </div></div>

                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col lg={3} md={3} sm={12}>
                                <Card className="shadow-sm rounded  flex-fill dbcard-box-6" onClick={() => navigate("/ManageFestival")}>
                                    <Card.Body>
                                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap  ">
                                            <div>
                                                <span className="text-muted d-block mb-1 text-nowrap  user-sub-title">Total Festival</span> <h4 className="fw-medium mb-0">04</h4>
                                                <div><span className="user-span">View Details</span></div>
                                            </div>

                                            <div className="lh-1">
                                                <div className=" avatar-md avatar-rounded totalfev-bg flex-shrink-0 d-flex align-items-center justify-content-center ">
                                                    <BiSolidDonateBlood /> </div>
                                            </div></div>

                                    </Card.Body>
                                </Card>
                            </Col>

                           



                        </Row>

                        <Row>
                            <Col lg={8} md={8} sm={12} className=" mt-3">



                            </Col>
                            <Col lg={4} md={4} sm={12} className="">

                            </Col>
                        </Row>

                       
                    </div>
                </main>
            </div>
        </>
    );
};

export default TempleDashBoard;

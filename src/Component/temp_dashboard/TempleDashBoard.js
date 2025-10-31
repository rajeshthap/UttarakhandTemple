import React, { useEffect, useState } from "react";
import "../../assets/CSS/TempleLeftNav.css";
import "../../assets/CSS/DashBoard.css";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import PanditImg from "../../assets/images/pandit-img.png";
import { FaOm } from "react-icons/fa";
import { GiByzantinTemple } from "react-icons/gi";
import { BiSolidDonateBlood } from "react-icons/bi";
import TempleLeftNav from "./TempleLeftNav";
import "../../assets/CSS/Temple_DashBoard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../GlobleAuth/AuthContext"; // adjust import if needed

const TempleDashBoard = () => {
    const navigate = useNavigate();
    const { uniqueId } = useAuth(); // used for donation API
    const [dashboardData, setDashboardData] = useState({
        newBooking: 0,
        acceptedBooking: 0,
    });
    const [counts, setCounts] = useState({
        newBookings: 0,
        acceptedBookings: 0,
        rejectedBookings: 0,
        donations: 0,
        temples: 0,
        festivals: 0,
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (!uniqueId) {
                    console.error("❌ uniqueId not found in context!");
                    return;
                }

                console.log("🔹 Fetching data for creator_id:", uniqueId);

                // Get pending bookings
                const newBookingsRes = await axios.get(
                    "https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/",
                    { params: { creator_id: uniqueId, status: "pending" } }
                );

                // Get accepted bookings
                const acceptedBookingsRes = await axios.get(
                    "https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/",
                    { params: { creator_id: uniqueId, status: "accepted" } }
                );

                // Get rejected bookings
                const rejectedBookingsRes = await axios.get(
                    "https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/",
                    { params: { creator_id: uniqueId, status: "rejected" } }
                );

                // Get total temples
                const templesRes = await axios.get(
                    "https://mahadevaaya.com/backend/api/temple-names-list/"
                );

                // Get total festivals
                const festivalsRes = await axios.get(
                    "https://mahadevaaya.com/backend/api/reg-festival/"
                );

                // Get total donations
                const donationsRes = await axios.get(
                    `https://mahadevaaya.com/backend/api/get-donation-booking/?creator_id=${uniqueId}`
                );

                // Debugging logs to verify responses
                console.log("📦 Pending Bookings:", newBookingsRes.data);
                console.log("📦 Accepted Bookings:", acceptedBookingsRes.data);
                console.log("📦 Rejected Bookings:", rejectedBookingsRes.data);
                console.log("📦 Temples:", templesRes.data);
                console.log("📦 Festivals:", festivalsRes.data);
                console.log("📦 Donations:", donationsRes.data);

                // Update state safely
                setDashboardData({
                    newBooking: Array.isArray(newBookingsRes.data)
                        ? newBookingsRes.data.length
                        : 0,
                    acceptedBooking: Array.isArray(acceptedBookingsRes.data)
                        ? acceptedBookingsRes.data.length
                        : 0,
                    rejectedBooking: Array.isArray(rejectedBookingsRes.data)
                        ? rejectedBookingsRes.data.length
                        : 0,
                    totalTemple: Array.isArray(templesRes.data)
                        ? templesRes.data.length
                        : 0,
                    totalFestival: Array.isArray(festivalsRes.data)
                        ? festivalsRes.data.length
                        : 0,
                    totalDonation: Array.isArray(donationsRes.data)
                        ? donationsRes.data.length
                        : 0,
                });
            } catch (err) {
                console.error("❌ Error fetching dashboard data:", err);
            }
        };

        fetchDashboardData();
    }, [uniqueId]);

    return (
        <div className="dashboard-wrapper">
            {/* Sidebar */}
            <aside className="temp-sidebar">
                <TempleLeftNav />
            </aside>

            {/* Right-hand Main Container */}
            <main className="main-container">
                <div className="content-box">
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3">
                        <h1 className="fw500">
                            <span className="fw700h1">Temple </span> Dashboard
                        </h1>
                    </div>

                    <Row>
                        {/* New Bookings */}
                        <Col lg={3} md={3} sm={12}>
                            <Card
                                className="shadow-sm rounded dbcard-box-1 flex-fill mb-2"
                                onClick={() => navigate("/NewBooking")}
                            >
                                <Card.Body>
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div>
                                            <span className="text-muted d-block mb-1">New Darshan Booking</span>
                                            <h4 className="fw-medium mb-0">{counts.newBookings}</h4>
                                            <div><span className="user-span">View Details</span></div>
                                        </div>
                                        <div className="avatar-md avatar-rounded save-bg d-flex align-items-center justify-content-center">
                                            <FaOm />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Accepted Bookings */}
                        <Col lg={3} md={3} sm={12}>
                            <Card
                                className="shadow-sm rounded dbcard-box-2 flex-fill mb-2"
                                onClick={() => navigate("/AcceptedBooking")}
                            >
                                <Card.Body>
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div>
                                            <span className="text-muted d-block mb-1">Accepted Darshan Booking</span>
                                            <h4 className="fw-medium mb-0">{counts.acceptedBookings}</h4>
                                            <div><span className="user-span">View Details</span></div>
                                        </div>
                                        <div className="avatar-md avatar-rounded Darshan-bg d-flex align-items-center justify-content-center">
                                            <GiByzantinTemple />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Rejected Bookings */}
                        <Col lg={3} md={3} sm={12}>
                            <Card
                                className="shadow-sm rounded dbcard-box-4 flex-fill mb-2"
                                onClick={() => navigate("/RejectedBooking")}
                            >
                                <Card.Body>
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div>
                                            <span className="text-muted d-block mb-1">Rejected Darshan Booking</span>
                                            <h4 className="fw-medium mb-0">{counts.rejectedBookings}</h4>
                                            <div><span className="user-span">View Details</span></div>
                                        </div>
                                        <div className="avatar-md avatar-rounded pandit-bg d-flex align-items-center justify-content-center">
                                            <img src={PanditImg} alt="Pandit" className="img-fluid" />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Donations */}
                        <Col lg={3} md={3} sm={12}>
                            <Card
                                className="shadow-sm rounded dbcard-box-3 flex-fill mb-2"
                                onClick={() => navigate("/Donations")}
                            >
                                <Card.Body>
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div>
                                            <span className="text-muted d-block mb-1">Total Donation</span>
                                            <h4 className="fw-medium mb-0">{counts.donations}</h4>
                                            <div><span className="user-span">View Details</span></div>
                                        </div>
                                        <div className="avatar-md avatar-rounded Donations-bg d-flex align-items-center justify-content-center">
                                            <BiSolidDonateBlood />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Temples */}
                        <Col lg={3} md={3} sm={12}>
                            <Card
                                className="shadow-sm rounded dbcard-box-5 flex-fill mb-2"
                                onClick={() => navigate("/ManageTemple")}
                            >
                                <Card.Body>
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div>
                                            <span className="text-muted d-block mb-1">Total Temple</span>
                                            <h4 className="fw-medium mb-0">{counts.temples}</h4>
                                            <div><span className="user-span">View Details</span></div>
                                        </div>
                                        <div className="avatar-md avatar-rounded totaltemp-bg d-flex align-items-center justify-content-center">
                                            <GiByzantinTemple />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Festivals */}
                        <Col lg={3} md={3} sm={12}>
                            <Card
                                className="shadow-sm rounded dbcard-box-6 flex-fill mb-2"
                                onClick={() => navigate("/ManageFestival")}
                            >
                                <Card.Body>
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div>
                                            <span className="text-muted d-block mb-1">Total Festival</span>
                                            <h4 className="fw-medium mb-0">{counts.festivals}</h4>
                                            <div><span className="user-span">View Details</span></div>
                                        </div>
                                        <div className="avatar-md avatar-rounded totalfev-bg d-flex align-items-center justify-content-center">
                                            <BiSolidDonateBlood />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </main>
        </div>
    );
};

export default TempleDashBoard;

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
import { useAuth } from "../GlobleAuth/AuthContext";

const TempleDashBoard = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth();

  const [newBookingCount, setNewBookingCount] = useState(0);
  const [acceptedBookingCount, setAcceptedBookingCount] = useState(0);
  const [rejectedBookingCount, setRejectedBookingCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);
  const [templeCount, setTempleCount] = useState(0);
  const [festivalCount, setFestivalCount] = useState(0);

  //  Redirect if not logged in
  useEffect(() => {
    if (!uniqueId) navigate("/Login");
  }, [uniqueId, navigate]);

  //  Fetch New Bookings
  useEffect(() => {
    if (!uniqueId) return;
    const fetchNewBookings = async () => {
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/?creator_id=${uniqueId}&status=pending`
        );
        if (Array.isArray(res.data)) {
          setNewBookingCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setNewBookingCount(res.data.results.length);
        } else {
          setNewBookingCount(0);
        }
      } catch (error) {
        console.error("Error fetching new bookings:", error);
        setNewBookingCount(0);
      }
    };
    fetchNewBookings();
  }, [uniqueId]);

  //  Accepted Bookings
  useEffect(() => {
    if (!uniqueId) return;
    const fetchAcceptedBookings = async () => {
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/?creator_id=${uniqueId}&status=accepted`
        );
        if (Array.isArray(res.data)) {
          setAcceptedBookingCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setAcceptedBookingCount(res.data.results.length);
        } else {
          setAcceptedBookingCount(0);
        }
      } catch (error) {
        console.error("Error fetching accepted bookings:", error);
        setAcceptedBookingCount(0);
      }
    };
    fetchAcceptedBookings();
  }, [uniqueId]);

  //  Rejected Bookings
  useEffect(() => {
    if (!uniqueId) return;
    const fetchRejectedBookings = async () => {
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/get-darshan-pooja-booking/?creator_id=${uniqueId}&status=rejected`
        );
        if (Array.isArray(res.data)) {
          setRejectedBookingCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setRejectedBookingCount(res.data.results.length);
        } else {
          setRejectedBookingCount(0);
        }
      } catch (error) {
        console.error("Error fetching rejected bookings:", error);
        setRejectedBookingCount(0);
      }
    };
    fetchRejectedBookings();
  }, [uniqueId]);

  //  Donations
  useEffect(() => {
    if (!uniqueId) return;
    const fetchDonations = async () => {
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/get-donation-booking/?creator_id=${uniqueId}`
        );
        if (Array.isArray(res.data)) {
          setDonationCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setDonationCount(res.data.results.length);
        } else {
          setDonationCount(0);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
        setDonationCount(0);
      }
    };
    fetchDonations();
  }, [uniqueId]);

 // Temple count
useEffect(() => {
  const fetchTemples = async () => {
    try {
      const res = await axios.get(
        "https://mahadevaaya.com/backend/api/temple-names-list/"
      );
 
      //  API returns { temples: [ ... ] }
      if (res.data && Array.isArray(res.data.temples)) {
        setTempleCount(res.data.temples.length);
      } else {
        setTempleCount(0);
      }
    } catch (error) {
      console.error("Error fetching temples:", error);
      setTempleCount(0);
    }
  };
 
  fetchTemples();
}, []);

  // Festival count
  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const res = await axios.get(
          "https://mahadevaaya.com/backend/api/reg-festival/"
        );
        if (Array.isArray(res.data)) {
          setFestivalCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.results)) {
          setFestivalCount(res.data.results.length);
        } else {
          setFestivalCount(0);
        }
      } catch (error) {
        console.error("Error fetching festivals:", error);
        setFestivalCount(0);
      }
    };
    fetchFestivals();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="temp-sidebar">
        <TempleLeftNav />
      </aside>

      {/* Main Content */}
      <main className="main-container">
        <div className="content-box">
          <h1 className="fw500 mb-4">
            <span className="fw700h1">Temple</span> Dashboard
          </h1>

          <Row>
            {/* New Bookings */}
            <Col lg={3} md={3} sm={12}>
              <Card
                className="shadow-sm rounded dbcard-box-1 flex-fill mb-2"
                onClick={() => navigate("/NewBooking")}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">
                        New Darshan Booking
                      </span>
                      <h4 className="fw-medium mb-0">{newBookingCount}</h4>
                      <div>
                        <span className="user-span">View Details</span>
                      </div>
                    </div>
                    <div className="avatar-md avatar-rounded save-bg d-flex align-items-center justify-content-center">
                      <FaOm />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Accepted */}
            <Col lg={3} md={3} sm={12}>
              <Card
                className="shadow-sm rounded dbcard-box-2 flex-fill mb-2"
                onClick={() => navigate("/AcceptedBooking")}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">
                        Accepted Darshan Booking
                      </span>
                      <h4 className="fw-medium mb-0">{acceptedBookingCount}</h4>
                      <div>
                        <span className="user-span">View Details</span>
                      </div>
                    </div>
                    <div className="avatar-md avatar-rounded Darshan-bg d-flex align-items-center justify-content-center">
                      <GiByzantinTemple />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Rejected */}
            <Col lg={3} md={3} sm={12}>
              <Card
                className="shadow-sm rounded dbcard-box-4 flex-fill mb-2"
                onClick={() => navigate("/RejectedBooking")}
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">
                        Rejected Darshan Booking
                      </span>
                      <h4 className="fw-medium mb-0">{rejectedBookingCount}</h4>
                      <div>
                        <span className="user-span">View Details</span>
                      </div>
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
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">
                        Total Donations
                      </span>
                      <h4 className="fw-medium mb-0">{donationCount}</h4>
                      <div>
                        <span className="user-span">View Details</span>
                      </div>
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
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">
                        Total Temples
                      </span>
                      <h4 className="fw-medium mb-0">{templeCount}</h4>
                      <div>
                        <span className="user-span">View Details</span>
                      </div>
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
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div>
                      <span className="text-muted d-block mb-1">
                        Total Festivals
                      </span>
                      <h4 className="fw-medium mb-0">{festivalCount}</h4>
                      <div>
                        <span className="user-span">View Details</span>
                      </div>
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

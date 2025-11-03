import React, { useEffect, useState } from "react";
import "../../assets/CSS/TempleLeftNav.css";
import "../../assets/CSS/DashBoard.css";
import { Col, Row, Card, Spinner } from "react-bootstrap";
import PanditImg from "../../assets/images/pandit-img.png";
import { FaHandsPraying, FaOm } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";
import { GiByzantinTemple } from "react-icons/gi";
import "../../assets/CSS/Pandit_DashBoard.css";
import PanditLeftNav from "./PanditLeftNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserSeva from "../../assets/images/user-seva.png";
import { useAuth } from "../GlobleAuth/AuthContext";

const Pandit_DashBoard = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth();
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
    upcoming: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  // Prevent back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
  const fetchBookings = async () => {
    if (!uniqueId) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://mahadevaaya.com/backend/api/get-hire-pandit/?pandit_id=${uniqueId}`
      );

      const bookings = response.data || [];
      const now = new Date();

      let pendingCount = 0;  // New Puja Booking (within 7 days after pooja date)
      let acceptedCount = 0;
      let rejectedCount = 0;
      let upcomingCount = 0; // Upcoming (after 7 days from pooja date)

      bookings.forEach((booking) => {
        booking.number_of_pandits.forEach((p) => {
          if (p.pandit_id === uniqueId) {
            const status = p.status?.toLowerCase();
            const bookingDate = new Date(booking.date_and_time);
            const sevenDaysAfter = new Date(
              bookingDate.getTime() + 7 * 24 * 60 * 60 * 1000
            );

            if (status === "pending") {
              if (now >= bookingDate && now <= sevenDaysAfter) {
                pendingCount++;
              }
              else if (now > sevenDaysAfter) {
                upcomingCount++;
              }
              else if (now < bookingDate) {
                upcomingCount++;
              }
            } else if (status === "accepted") {
              acceptedCount++;
            } else if (status === "rejected") {
              rejectedCount++;
            }
          }
        });
      });

      setStatusCounts({
        pending: pendingCount,
        accepted: acceptedCount,
        rejected: rejectedCount,
        upcoming: upcomingCount,
        total: pendingCount + acceptedCount + rejectedCount + upcomingCount,
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchBookings();
}, [uniqueId]);



  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="pandit-sidebar">
          <PanditLeftNav />
        </aside>

        <main className="main-container">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
              <h1 className="fw500">
                <span className="fw700h1">Pandit</span> Dashboard
              </h1>
              <div>
                <div className="d-flex justify-content-center h-100">
                  <div className="search">
                    <input
                      className="search_input"
                      type="text"
                      placeholder="Search here..."
                    />
                    <button type="submit" className="search_icon">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <>
                <Row>
                  <Col lg={3} md={3} sm={12}>
                    <Card
                      className="shadow-sm rounded dbcard-pditnew-puja-box-1 flex-fill mb-2"
                      onClick={() => navigate("/NewPujaBooking")}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Body>
                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                          <div>
                            <span className="text-muted d-block mb-1 text-nowrap user-sub-title">
                              New Puja Booking
                            </span>
                            <h4 className="fw-medium mb-0">
                              {statusCounts.pending}
                            </h4>
                            <div>
                              <span className="user-span">View Details</span>
                            </div>
                          </div>

                          <div className="lh-1">
                            <div className="avatar-md avatar-rounded save-bg flex-shrink-0 d-flex align-items-center justify-content-center">
                              <img
                            src={UserSeva}
                            alt="Pandit"
                            className=" img-fluid img-user-card-icon"
                          />{" "}
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col lg={3} md={3} sm={12}>
                    <Card
                      className="shadow-sm dbcard-pdit-accept-box-2 flex-fill mb-2  mob-view-bt"
                      onClick={() => navigate("/ConfirmedRequests")}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Body>
                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                          <div>
                            <span className="text-muted d-block mb-1 text-nowrap user-sub-title">
                              Accepted Puja Booking
                            </span>
                            <h4 className="fw-medium mb-0">
                              {statusCounts.accepted}
                            </h4>
                            <div>
                              <span className="user-span">View Details</span>
                            </div>
                          </div>
                          <div className="lh-1">
                            <div className="avatar-md avatar-rounded Darshan-bg flex-shrink-0 d-flex align-items-center justify-content-center">
                              <GiByzantinTemple />
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col lg={3} md={3} sm={12}>
                    <Card
                      className="shadow-sm rounded flex-fill dbcard-box-4 mb-2"
                      onClick={() => navigate("/CancelledRequests")}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Body>
                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                          <div>
                            <span className="text-muted d-block mb-1 text-nowrap user-sub-title">
                              Rejected Puja Booking
                            </span>
                            <h4 className="fw-medium mb-0">
                              {statusCounts.rejected}
                            </h4>
                            <div>
                              <span className="user-span">View Details</span>
                            </div>
                          </div>
                          <div className="lh-1">
                            <div className="avatar-md avatar-rounded pandit-bg flex-shrink-0 d-flex align-items-center justify-content-center">
                              <img
                                src={PanditImg}
                                alt="Pandit"
                                className="img-fluid"
                              />
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col lg={3} md={3} sm={12}>
                    <Card
                      className="shadow-sm rounded flex-fill pandit-box-3  "
                      onClick={() => navigate("/UpcomingPuja")}
                      style={{ cursor: "pointer" }} 
                    >
                      <Card.Body>
                        <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                          <div>
                            <span className="text-muted d-block mb-1 text-nowrap user-sub-title">
                              Upcoming Pujas
                            </span>
                            <h4 className="fw-medium mb-0">
                              {statusCounts.upcoming}
                            </h4>
                            <div>
                              <span className="user-span">View Details</span>
                            </div>
                          </div>

                          <div className="lh-1">
                            <div className="avatar-md avatar-rounded Donations-bg flex-shrink-0 d-flex align-items-center justify-content-center">
                              <BiSolidDonateBlood />
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Pandit_DashBoard;

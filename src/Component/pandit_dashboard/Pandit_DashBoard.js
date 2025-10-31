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

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://mahadevaaya.com/backend/api/get-hire-pandit/?pandit_id=${uniqueId}`
      );

      const bookings = response.data || [];

      let pending = 0;
      let accepted = 0;
      let rejected = 0;
      let upcoming = 0;

      bookings.forEach((booking) => {
        booking.number_of_pandits.forEach((p) => {
          if (p.pandit_id === uniqueId) {
            switch (p.status?.toLowerCase()) {
              case "pending":
                pending++;
                break;
              case "accepted":
                accepted++;
                break;
              case "rejected":
                rejected++;
                break;
              case "upcoming":
                upcoming++;
                break;
              default:
                break;
            }
          }
        });
      });

      setStatusCounts({
        pending,
        accepted,
        rejected,
        upcoming,
        total: pending + accepted + rejected + upcoming,
      });
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  if (uniqueId) fetchBookings();
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
                              <FaOm />
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col lg={3} md={3} sm={12}>
                    <Card
                      className="shadow-sm dbcard-pdit-accept-box-2 flex-fill"
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
                      className="shadow-sm rounded flex-fill dbcard-box-4"
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
                      className="shadow-sm rounded flex-fill pandit-box-3"
                      onClick={() => navigate("/UpcomingRequests")}
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

                <Row className="mt-3">
                  <h2>Transaction History</h2>
                  <div className="col-md-12">
                    <table className="pandit-rwd-table">
                      <tbody>
                        <tr>
                          <th>Supplier Code</th>
                          <th>Supplier Name</th>
                          <th>Invoice Number</th>
                          <th>Invoice Date</th>
                          <th>Due Date</th>
                          <th>Net Amount</th>
                        </tr>
                        <tr>
                          <td>UPS5005</td>
                          <td>UPS</td>
                          <td>ASDF19218</td>
                          <td>06/25/2016</td>
                          <td>12/25/2016</td>
                          <td>$8,322.12</td>
                        </tr>
                        <tr>
                          <td>UPS3449</td>
                          <td>UPS South Inc.</td>
                          <td>ASDF29301</td>
                          <td>6/24/2016</td>
                          <td>12/25/2016</td>
                          <td>$3,255.49</td>
                        </tr>
                        <tr>
                          <td>BOX5599</td>
                          <td>BOX Pro West</td>
                          <td>ASDF43000</td>
                          <td>6/27/2016</td>
                          <td>12/25/2016</td>
                          <td>$45,255.49</td>
                        </tr>
                        <tr>
                          <td>PAN9999</td>
                          <td>Pan Providers and Co.</td>
                          <td>ASDF33433</td>
                          <td>6/29/2016</td>
                          <td>12/25/2016</td>
                          <td>$12,335.69</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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

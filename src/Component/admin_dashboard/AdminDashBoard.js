import React, { useEffect, useState } from "react";
import "../../assets/CSS/AdminLeftNav.css";
import { Col, Row, Card } from "react-bootstrap";
import PanditImg from "../../assets/images/pandit-img.png";
import { GiByzantinTemple } from "react-icons/gi";
import "../../assets/CSS/AdminDashBoard.css";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import AdminLeftnav from "./AdminLeftnav";
import axios from "axios";
import { BASE_URLL } from "../../Component/BaseURL";
import { useAuth } from "../GlobleAuth/AuthContext";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth();

  // State for counts
  const [templeCounts, setTempleCounts] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(false);

  // ===================== FETCH TEMPLE DATA =====================
  const fetchTempleCounts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URLL}api/get-all-registered/?role=temple`);
      const templeList = res.data?.results || [];

      const total = templeList.filter((t) => t.temple_status === "accepted").length;
      const pending = templeList.filter((t) => t.temple_status === "pending").length;
      const accepted = templeList.filter((t) => t.temple_status === "accepted").length;
      const rejected = templeList.filter((t) => t.temple_status === "rejected").length;

      setTempleCounts({ total, pending, accepted, rejected });
    } catch (err) {
      console.error("Error fetching temple data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTempleCounts();
  }, []);

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="admin-sidebar">
          <AdminLeftnav />
        </aside>

        <main className="main-container">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 admin-heading">
              <h1 className="fw500">
                <span className="">Admin</span> Dashboard
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

            {/* ================= DASHBOARD CARDS ================= */}
            <Row>
              {/* Temple Card */}
              <Col lg={4} md={4} sm={12}>
                <Card
                  className="shadow-sm dbcard-admin-accept-box-2 flex-fill"
                  onClick={() => navigate("/AllTempleBooking")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between flex-wrap">
                      <div>
                        <span className="d-block mb-1 text-nowrap user-sub-title">
                          Total Temples
                        </span>
                        <h4 className="fw-medium mb-0">
                          {loading ? "..." : templeCounts.total}
                        </h4>
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

              {/* Pandit Card (Static for now) */}
              <Col lg={4} md={4} sm={12}>
                <Card
                  className="shadow-sm rounded flex-fill dbcard-admin-4"
                  onClick={() => navigate("/AllPanditBooking")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between flex-wrap">
                      <div>
                        <span className="d-block mb-1 text-nowrap user-sub-title">
                          Pandit
                        </span>
                        <h4 className="fw-medium mb-0">0</h4>
                        <span className="user-span">View Details</span>
                      </div>
                      <div className="avatar-md avatar-rounded pandit-bg d-flex align-items-center justify-content-center">
                        <img src={PanditImg} alt="Pandit" className="img-fluid" />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Devotee Card (Static for now) */}
              <Col lg={4} md={4} sm={12}>
                <Card
                  className="shadow-sm rounded dbcard-adminnew-puja-box-1 flex-fill mb-2"
                  onClick={() => navigate("/AllDevoteeBooking")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between flex-wrap">
                      <div>
                        <span className="d-block mb-1 text-nowrap user-sub-title">
                          Devotee
                        </span>
                        <h4 className="fw-medium mb-0">0</h4>
                        <span className="user-span">View Details</span>
                      </div>
                      <div className="avatar-md avatar-rounded ad-save-bg d-flex align-items-center justify-content-center">
                        <FaRegUserCircle />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

              <Row>
              

              <Col lg={4} md={4} sm={12}>
                <Card 
                className="shadow-sm dbcard-admin-accept-box-2 flex-fill"
                 onClick={() => navigate("/CrowdFunding")}
                style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                      <div>
                        <span className=" d-block mb-1 text-nowrap user-sub-title">
                          Crowd Funding
                        </span>
                        <h4 className="fw-medium mb-0">0</h4>
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

              <Col lg={4} md={4} sm={12}>
                <Card 
                className="shadow-sm rounded flex-fill dbcard-admin-4"
                 onClick={() => navigate("/AllDarshanBooking")}
                style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                      <div>
                        <span className=" d-block mb-1 text-nowrap user-sub-title">
                         Darshan Booking
                        </span>
                        <h4 className="fw-medium mb-0">0</h4>
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

              <Col lg={4} md={4} sm={12}>
                <Card 
                className="shadow-sm rounded dbcard-adminnew-puja-box-1 flex-fill mb-2"
                 onClick={() => navigate("/Events")}
                style={{ cursor: "pointer" }}>
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                      <div>
                        <span className=" d-block mb-1 text-nowrap user-sub-title">
                          Events
                        </span>
                        <h4 className="fw-medium mb-0">0</h4>
                        <div>
                          <span className="user-span">View Details</span>
                        </div>
                      </div>
                      <div className="lh-1">
                        <div className="avatar-md avatar-rounded ad-save-bg flex-shrink-0 d-flex align-items-center justify-content-center">
                         <FaRegUserCircle/>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

             
            </Row>

            {/* ================= STATUS CARDS ================= */}
            <Row>
              <Col lg={4} md={4} sm={12}>
                <Card
                  className="shadow-sm dbcard-admin-accept-box-2 flex-fill"
                  onClick={() => navigate("/PendingRequest")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between flex-wrap">
                      <div>
                        <span className="d-block mb-1 user-sub-title">Pending</span>
                        <h4 className="fw-medium mb-0">
                          {loading ? "..." : templeCounts.pending}
                        </h4>
                        <span className="user-span">View Details</span>
                      </div>
                      <div className="avatar-md avatar-rounded Darshan-bg d-flex align-items-center justify-content-center">
                        <GiByzantinTemple />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={4} sm={12}>
                <Card
                  className="shadow-sm rounded flex-fill dbcard-admin-4"
                  onClick={() => navigate("/AcceptedRequest")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between flex-wrap">
                      <div>
                        <span className="d-block mb-1 user-sub-title">Accepted</span>
                        <h4 className="fw-medium mb-0">
                          {loading ? "..." : templeCounts.accepted}
                        </h4>
                        <span className="user-span">View Details</span>
                      </div>
                      <div className="avatar-md avatar-rounded pandit-bg d-flex align-items-center justify-content-center">
                        <img src={PanditImg} alt="Pandit" className="img-fluid" />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={4} sm={12}>
                <Card
                  className="shadow-sm rounded dbcard-adminnew-puja-box-1 flex-fill mb-2"
                  onClick={() => navigate("/RejectedRequest")}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between flex-wrap">
                      <div>
                        <span className="d-block mb-1 user-sub-title">Rejected</span>
                        <h4 className="fw-medium mb-0">
                          {loading ? "..." : templeCounts.rejected}
                        </h4>
                        <span className="user-span">View Details</span>
                      </div>
                      <div className="avatar-md avatar-rounded ad-save-bg d-flex align-items-center justify-content-center">
                        <FaRegUserCircle />
                      </div>
                    </div>
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

export default AdminDashBoard;

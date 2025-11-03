import React from "react";
import "../../assets/CSS/AdminLeftNav.css";
import { Col, Row, Card } from "react-bootstrap";
import PanditImg from "../../assets/images/pandit-img.png";
import { BiSolidDonateBlood } from "react-icons/bi";
import { GiByzantinTemple } from "react-icons/gi";
import "../../assets/CSS/AdminDashBoard.css";
import { useNavigate } from "react-router-dom";
import UserSeva from "../../assets/images/user-seva.png";
import { useAuth } from "../GlobleAuth/AuthContext";
import AdminLeftnav from "./AdminLeftnav";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const { uniqueId } = useAuth();

  return (
    <>
      <div className="dashboard-wrapper">
        <aside className="pandit-sidebar">
          <AdminLeftnav />
        </aside>

        <main className="main-container">
          <div className="content-box">
            <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
              <h1 className="fw500">
                <span className="fw700h1">Admin</span> Dashboard
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

            {/* Dashboard Cards */}
            <Row>
              <Col lg={4} md={4} sm={12}>
                <Card className="shadow-sm rounded dbcard-pditnew-puja-box-1 flex-fill mb-2">
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap user-sub-title">
                          User
                        </span>
                        <h4 className="fw-medium mb-0">0</h4>
                        <div>
                          <span className="user-span">View Details</span>
                        </div>
                      </div>
                      <div className="lh-1">
                        <div className="avatar-md avatar-rounded save-bg flex-shrink-0 d-flex align-items-center justify-content-center">
                          <img
                            src={UserSeva}
                            alt="Pandit"
                            className="img-fluid img-user-card-icon"
                          />
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4} md={4} sm={12}>
                <Card className="shadow-sm dbcard-pdit-accept-box-2 flex-fill">
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap user-sub-title">
                          Pandit
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
                <Card className="shadow-sm rounded flex-fill dbcard-box-4">
                  <Card.Body>
                    <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap">
                      <div>
                        <span className="text-muted d-block mb-1 text-nowrap user-sub-title">
                         Temple
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

             
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashBoard;

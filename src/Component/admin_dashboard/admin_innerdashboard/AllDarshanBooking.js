import React from "react";
import "../../../assets/CSS/AdminLeftNav.css";
import { Col, Row, Card } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import AdminLeftnav from "../AdminLeftnav";
import { useAuth } from "../../GlobleAuth/AuthContext";


const AllDarshanBooking = () => {
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

          Details
          </div>
        </main>
      </div>
    </>
  );
};

export default AllDarshanBooking;

import React, { useState, useEffect } from "react";
import "../../../assets/CSS/LeftNav.css";
import LeftNav from "../LeftNav";
import { Breadcrumb, Row } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../GlobleAuth/AuthContext";

const DonationsDetails = () => {
  const { uniqueId } = useAuth();
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!uniqueId) return;

    const fetchDonations = async () => {
      try {
        const res = await axios.get(
          `https://mahadevaaya.com/backend/api/donation/?creator_id=${uniqueId}`
        );

        if (Array.isArray(res.data)) {
          setDonations(res.data);
          setFilteredDonations(res.data);
        } else if (res.data && Array.isArray(res.data.results)) {
          setDonations(res.data.results);
          setFilteredDonations(res.data.results);
        } else {
          setDonations([]);
          setFilteredDonations([]);
        }
      } catch (error) {
        console.error("Error fetching donation data:", error);
        setDonations([]);
        setFilteredDonations([]);
      }
    };

    fetchDonations();
  }, [uniqueId]);

  useEffect(() => {
    const filtered = donations.filter(
      (item) =>
        item.donatiom_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.pilgrim_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile_number?.includes(searchTerm) ||
        item.amount?.toString().includes(searchTerm)
    );
    setFilteredDonations(filtered);
  }, [searchTerm, donations]);

  return (
    <>
      {/* Main Wrapper */}
      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <aside className="sidebar">
          <LeftNav />
        </aside>

        {/* Right-hand Main Container */}
        <main className="main-container-box">
          <div className="content-box">
            <Row className="">
              <div className="d-flex align-items-start justify-content-between gap-1 flex-xxl-nowrap flex-wrap mb-3 ">
                <h1 className="fw500">
                  <Breadcrumb>
                    <Breadcrumb.Item href="/MainDashBoard">
                      <span className="fw700h1">DashBoard </span>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                      Donation Details
                    </Breadcrumb.Item>
                  </Breadcrumb>
                </h1>

                <div>
                  <div className="d-flex justify-content-center h-100">
                    <div className="search">
                      <input
                        className="search_input"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search here..."
                      />
                      <button type="button" className="search_icon">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Section */}
              <div className="col-md-12">
                <table className="rwd-table">
                  <tbody>
                    <tr>
                      <th>Donation ID</th>
                      <th>Pilgrim Name</th>
                      <th>Mobile Number</th>
                      <th>Amount (₹)</th>
                    </tr>

                    {filteredDonations.length > 0 ? (
                      filteredDonations.map((item, index) => (
                        <tr key={index}>
                          <td data-th="Donation ID">{item.donatiom_id}</td>
                          <td data-th="Pilgrim Name">{item.pilgrim_name}</td>
                          <td data-th="Mobile Number">{item.mobile_number}</td>
                          <td data-th="Amount">{item.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted fw-bold">
                          No donation records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </>
  );
};

export default DonationsDetails;
